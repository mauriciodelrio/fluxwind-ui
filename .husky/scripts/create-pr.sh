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

# Check if Copilot CLI is available
USE_COPILOT=false
if command -v copilot &> /dev/null; then
  USE_COPILOT=true
  print_success "GitHub Copilot CLI detected - using AI generation"
else
  print_info "Copilot CLI not found - using template generator"
fi

# Get file stats
SHORTSTAT=$(git diff --shortstat "$BASE_BRANCH..HEAD" 2>/dev/null || echo "")
ADDITIONS=$(echo "$SHORTSTAT" | sed -n 's/.* \([0-9]*\) insertion.*/\1/p')
DELETIONS=$(echo "$SHORTSTAT" | sed -n 's/.* \([0-9]*\) deletion.*/\1/p')
[ -z "$ADDITIONS" ] && ADDITIONS="0"
[ -z "$DELETIONS" ] && DELETIONS="0"

CHANGED_FILES=$(git diff --name-only "$BASE_BRANCH..HEAD" 2>/dev/null)
FILES_COUNT=$(echo "$CHANGED_FILES" | grep -c '^' 2>/dev/null || echo "0")

if [ "$USE_COPILOT" = true ]; then
  # Use Copilot CLI in programmatic mode
  print_info "Generating description with Copilot AI..."
  
  # Get commit details
  COMMITS_SUMMARY=$(git log --no-merges --pretty=format:"- %s" "$BASE_BRANCH..HEAD" 2>/dev/null | head -20)
  
  # Detect changed packages
  PACKAGES=$(echo "$CHANGED_FILES" | grep -E "^packages/" | sed 's|packages/\([^/]*\)/.*|\1|' | sort -u | tr '\n' ', ' | sed 's/,$//')
  
  # Create comprehensive prompt for Copilot
  COPILOT_PROMPT="Generate a GitHub Pull Request description in Markdown format.

Context:
- Branch: $BRANCH_NAME → $BASE_BRANCH  
- Commits: $COMMIT_COUNT
- Files changed: $FILES_COUNT
- Changes: +$ADDITIONS/-$DELETIONS lines
- Packages affected: ${PACKAGES:-none}

Recent commits:
$COMMITS_SUMMARY

Requirements:
1. Start with ## 📋 Overview - brief summary
2. Add ### 🎯 What's Included - key highlights
3. If packages are affected, add ### 📦 Packages section highlighting each package
4. Add ## 📝 Commits section with collapsible <details> showing commit list
5. Add ## 📊 Impact table with files/additions/deletions
6. Add ## ✅ Checklist with standard items
7. End with branch info footer
8. Use emojis appropriately
9. Be professional and concise

Generate only the Markdown description, no explanations."
  
  # Try to generate with Copilot (allow shell tool for git commands)
  print_info "Using Copilot CLI to generate description..."
  
  COPILOT_OUTPUT=$(copilot -p "$COPILOT_PROMPT" --allow-all-tools 2>/dev/null || echo "")
  
  if [ -n "$COPILOT_OUTPUT" ] && echo "$COPILOT_OUTPUT" | grep -q "## "; then
    # Filter out usage statistics and keep only the Markdown content
    echo "$COPILOT_OUTPUT" | sed '/^Total usage est:/,/^Usage by model:/d' | sed '/^[[:space:]]*claude-sonnet/d' | sed '/^Total duration/d' | sed '/^Total code changes/d' | sed '/^[[:space:]]*$/N;/^\n$/d' > "$TEMP_FILE"
    print_success "Copilot description generated"
  else
    print_warning "Copilot failed, falling back to template generator"
    USE_COPILOT=false
  fi
fi

if [ "$USE_COPILOT" = false ]; then
  # Fall back to our AI-style template generator
  print_info "Using template generator..."
  
  AI_SCRIPT=".husky/scripts/generate-ai-pr-description.sh"
  if [ -f "$AI_SCRIPT" ] && [ -x "$AI_SCRIPT" ]; then
    "$AI_SCRIPT" "$BASE_BRANCH" "$BRANCH_NAME" "$COMMIT_COUNT" "$FILES_COUNT" "$ADDITIONS" "$DELETIONS" > "$TEMP_FILE"
    print_success "Description generated"
  else
    print_warning "Generator script not found, using minimal template..."
    
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
      echo "_**Base:** \`$BASE_BRANCH\` | **Head:** \`$BRANCH_NAME\`_"
    } > "$TEMP_FILE"
  fi
fi

print_success "Description generated"

# Show preview
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
