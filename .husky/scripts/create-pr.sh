#!/bin/bash

# Fluxwind UI - Automated PR Creator
# Generates intelligent PR descriptions and creates PRs automatically

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

print_header() { echo -e "\n${BOLD}${BLUE}$1${NC}"; }
print_info() { echo -e "${CYAN}ℹ${NC} $1"; }
print_success() { echo -e "${GREEN}✓${NC} $1"; }
print_warning() { echo -e "${YELLOW}⚠${NC} $1"; }
print_error() { echo -e "${RED}✗${NC} $1"; }

print_header "🚀 Fluxwind PR Creator"

# Get current branch
BRANCH_NAME=$(git symbolic-ref --short HEAD 2>/dev/null)
[ -z "$BRANCH_NAME" ] && print_error "Not on a valid git branch" && exit 1
print_info "Current branch: $BRANCH_NAME"

# Determine base branch
if [ "$BRANCH_NAME" = "develop" ]; then
  BASE_BRANCH="main"
  print_info "Detected develop branch - PR will target main"
elif [ "$BRANCH_NAME" = "main" ]; then
  print_error "Cannot create PR from main branch"
  exit 1
else
  BASE_BRANCH=${1:-develop}
  print_info "PR will target $BASE_BRANCH"
fi

# Validate base branch exists
! git rev-parse --verify "$BASE_BRANCH" >/dev/null 2>&1 && print_error "Base branch '$BASE_BRANCH' does not exist" && exit 1

# Check for commits
COMMIT_COUNT=$(git rev-list --count --no-merges "$BASE_BRANCH..HEAD" 2>/dev/null || echo "0")
[ "$COMMIT_COUNT" = "0" ] && print_error "No commits found between $BASE_BRANCH and $BRANCH_NAME" && exit 1
print_success "Found $COMMIT_COUNT commit(s) to include in PR"

# Parse branch name for PR title
if [[ $BRANCH_NAME =~ ^(feature|fix|docs|refactor|test|chore|perf|ci|revert)\/(.+)$ ]]; then
  BRANCH_TYPE="${BASH_REMATCH[1]}"
  BRANCH_DESC="${BASH_REMATCH[2]}"
  
  if [[ $BRANCH_DESC =~ ^([a-z0-9]+)-(.+)$ ]]; then
    BRANCH_SCOPE="${BASH_REMATCH[1]}"
    BRANCH_NAME_ONLY="${BASH_REMATCH[2]}"
    TITLE=$(echo "$BRANCH_NAME_ONLY" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')
    PR_TITLE="$BRANCH_TYPE($BRANCH_SCOPE): $TITLE"
  else
    TITLE=$(echo "$BRANCH_DESC" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')
    PR_TITLE="$BRANCH_TYPE: $TITLE"
  fi
else
  PR_TITLE="$BRANCH_NAME"
  BRANCH_TYPE=""
fi

print_info "PR Title: $PR_TITLE"

# Create temp file for description
TEMP_FILE=$(mktemp)

print_header "📝 Generating PR description..."

# Check if GitHub Copilot CLI is available
USE_COPILOT=false
if command -v gh &> /dev/null; then
  if gh copilot --version &> /dev/null 2>&1; then
    USE_COPILOT=true
    print_success "GitHub Copilot CLI detected - using AI-powered description generation"
  else
    print_warning "GitHub Copilot CLI not available - using template-based generation"
    print_info "Install with: gh extension install github/gh-copilot"
  fi
fi

if [ "$USE_COPILOT" = true ]; then
  # Use GitHub Copilot to generate intelligent PR description
  print_info "Analyzing commits and changes with AI..."
  
  # Prepare context for Copilot
  COMMIT_MESSAGES=$(git log --no-merges --pretty=format:"%s%n%b" "$BASE_BRANCH..HEAD" 2>/dev/null)
  DIFF_STAT=$(git diff --stat "$BASE_BRANCH..HEAD" 2>/dev/null)
  
  # Create prompt for Copilot
  COPILOT_PROMPT="Generate a comprehensive GitHub Pull Request description for the following changes.

Branch: $BRANCH_NAME -> $BASE_BRANCH
Type: $PR_TITLE

Commits ($COMMIT_COUNT total):
$COMMIT_MESSAGES

File Changes:
$DIFF_STAT

Requirements:
1. Start with ## 📋 Overview section explaining what this PR does
2. Add ### 🎯 What's Included section with key highlights
3. If this is a package (i18n, a11y, etc), add a ### Highlighted section with:
   - Package name and purpose
   - Key features (5-8 bullet points with emojis)
   - Test coverage percentage if mentioned in commits
4. Add ## 📝 Commits section with a collapsible details block
5. Add ## 📊 Impact section with a table showing files changed, additions, deletions
6. Add ## ✅ Checklist section with standard checkboxes
7. Keep the tone professional but friendly
8. Use emojis appropriately
9. Format in GitHub Flavored Markdown

Generate the description:"

  # Generate with Copilot
  COPILOT_RESULT=$(echo "$COPILOT_PROMPT" | gh copilot suggest -t shell 2>/dev/null || echo "")
  
  if [ -n "$COPILOT_RESULT" ] && [ "$COPILOT_RESULT" != "Error"* ]; then
    echo "$COPILOT_RESULT" > "$TEMP_FILE"
    print_success "AI-generated description created"
  else
    print_warning "Copilot generation failed, falling back to template"
    USE_COPILOT=false
  fi
fi

if [ "$USE_COPILOT" = false ]; then
  # Fall back to AI-powered description generator
  print_info "Using AI-powered description generator..."
  
  # Get file stats for the generator
  SHORTSTAT=$(git diff --shortstat "$BASE_BRANCH..HEAD" 2>/dev/null || echo "")
  ADDITIONS=$(echo "$SHORTSTAT" | sed -n 's/.* \([0-9]*\) insertion.*/\1/p')
  DELETIONS=$(echo "$SHORTSTAT" | sed -n 's/.* \([0-9]*\) deletion.*/\1/p')
  [ -z "$ADDITIONS" ] && ADDITIONS="0"
  [ -z "$DELETIONS" ] && DELETIONS="0"
  
  CHANGED_FILES=$(git diff --name-only "$BASE_BRANCH..HEAD" 2>/dev/null)
  FILES_COUNT=$(echo "$CHANGED_FILES" | grep -c '^' 2>/dev/null || echo "0")
  
  # Call the AI generator script
  AI_SCRIPT=".husky/scripts/generate-ai-pr-description.sh"
  if [ -f "$AI_SCRIPT" ] && [ -x "$AI_SCRIPT" ]; then
    "$AI_SCRIPT" "$BASE_BRANCH" "$BRANCH_NAME" "$COMMIT_COUNT" "$FILES_COUNT" "$ADDITIONS" "$DELETIONS" > "$TEMP_FILE"
    print_success "AI description generated"
  else
    print_warning "AI generator script not found or not executable, using basic template..."
    
    # Minimal fallback if AI script is missing
    {
      echo "## 📋 Overview"
      echo ""
      echo "This PR contains changes from \`$BRANCH_NAME\` to \`$BASE_BRANCH\`."
      echo ""
      echo "### 🎯 Summary"
      echo ""
      echo "- **$COMMIT_COUNT** commit(s)"
      echo "- **$FILES_COUNT** file(s) changed"
      echo "- **+$ADDITIONS/-$DELETIONS** lines"
      echo ""
      echo "## 📝 Commits"
      echo ""
      echo "<details>"
      echo "<summary>View all commits</summary>"
      echo ""
      echo '```'
      git log --no-merges --pretty=format:"%s" "$BASE_BRANCH..HEAD" 2>/dev/null
      echo ""
      echo '```'
      echo "</details>"
      echo ""
      echo "## ✅ Checklist"
      echo ""
      echo "- [ ] Tests pass"
      echo "- [ ] Documentation updated"
      echo "- [ ] Changeset created"
      echo ""
      echo "---"
    } > "$TEMP_FILE"
  fi
fi

print_success "Description generated"# Show preview
print_header "📄 PR Description Preview"
cat "$TEMP_FILE"

# Confirm
echo ""
read -p "Create PR with this description? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  print_warning "PR creation cancelled"
  rm "$TEMP_FILE"
  exit 0
fi

print_header "🚀 Creating PR..."

# Check for gh CLI
if ! command -v gh &> /dev/null; then
  print_error "GitHub CLI (gh) is not installed"
  print_info "Install it with: brew install gh"
  rm "$TEMP_FILE"
  exit 1
fi

# Create PR
PR_URL=$(gh pr create \
  --base "$BASE_BRANCH" \
  --head "$BRANCH_NAME" \
  --title "$PR_TITLE" \
  --body-file "$TEMP_FILE" \
  2>&1)

if [ $? -eq 0 ]; then
  print_success "PR created successfully!"
  echo ""
  print_info "$PR_URL"
  echo ""
  
  read -p "Open PR in browser? (Y/n): " -n 1 -r
  echo ""
  
  [[ ! $REPLY =~ ^[Nn]$ ]] && gh pr view --web
else
  print_error "Failed to create PR"
  echo "$PR_URL"
  print_info "Description saved to: $TEMP_FILE"
  exit 1
fi

# Cleanup
rm "$TEMP_FILE"
print_success "Done!"
