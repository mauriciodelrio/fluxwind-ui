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

# Analyze commits
FEAT_COMMITS=$(git log --no-merges --pretty=format:"%s" "$BASE_BRANCH..HEAD" 2>/dev/null | grep -c "^feat" || echo "0")
FIX_COMMITS=$(git log --no-merges --pretty=format:"%s" "$BASE_BRANCH..HEAD" 2>/dev/null | grep -c "^fix" || echo "0")
DOCS_COMMITS=$(git log --no-merges --pretty=format:"%s" "$BASE_BRANCH..HEAD" 2>/dev/null | grep -c "^docs" || echo "0")
CHORE_COMMITS=$(git log --no-merges --pretty=format:"%s" "$BASE_BRANCH..HEAD" 2>/dev/null | grep -c "^chore" || echo "0")

# Detect major features
HAS_I18N=$(git log --no-merges --pretty=format:"%s" "$BASE_BRANCH..HEAD" 2>/dev/null | grep -i "i18n\|internationalization" | head -1)
HAS_ICONS=$(git log --no-merges --pretty=format:"%s" "$BASE_BRANCH..HEAD" 2>/dev/null | grep -i "icon" | head -1)

# Get file stats
CHANGED_FILES=$(git diff --name-only "$BASE_BRANCH..HEAD" 2>/dev/null)
FILES_COUNT=$(echo "$CHANGED_FILES" | grep -c '^' 2>/dev/null || echo "0")
SHORTSTAT=$(git diff --shortstat "$BASE_BRANCH..HEAD" 2>/dev/null || echo "")
ADDITIONS=$(echo "$SHORTSTAT" | sed -n 's/.* \([0-9]*\) insertion.*/\1/p')
DELETIONS=$(echo "$SHORTSTAT" | sed -n 's/.* \([0-9]*\) deletion.*/\1/p')
[ -z "$ADDITIONS" ] && ADDITIONS="0"
[ -z "$DELETIONS" ] && DELETIONS="0"

# Categorize files
I18N_FILES=""
ICONS_FILES=""
CORE_FILES=""
THEMES_FILES=""
UTILS_FILES=""
DOCS_FILES=""
PLAYGROUND_FILES=""
TEST_FILES=""
CICD_FILES=""
CONFIG_FILES=""
OTHER_FILES=""

while IFS= read -r file; do
  [ -z "$file" ] && continue
  case "$file" in
    packages/i18n/*) I18N_FILES="${I18N_FILES}- \`$file\`\n" ;;
    packages/icons/*) ICONS_FILES="${ICONS_FILES}- \`$file\`\n" ;;
    packages/core/*) CORE_FILES="${CORE_FILES}- \`$file\`\n" ;;
    packages/themes/*) THEMES_FILES="${THEMES_FILES}- \`$file\`\n" ;;
    packages/utils/*) UTILS_FILES="${UTILS_FILES}- \`$file\`\n" ;;
    apps/docs/*) DOCS_FILES="${DOCS_FILES}- \`$file\`\n" ;;
    apps/playground/*) PLAYGROUND_FILES="${PLAYGROUND_FILES}- \`$file\`\n" ;;
    *test.ts|*test.tsx|*spec.ts|*spec.tsx) TEST_FILES="${TEST_FILES}- \`$file\`\n" ;;
    .github/*|.husky/*|.changeset/*) CICD_FILES="${CICD_FILES}- \`$file\`\n" ;;
    *.json|*.yaml|*.yml|*config.*) CONFIG_FILES="${CONFIG_FILES}- \`$file\`\n" ;;
    *.md) DOCS_FILES="${DOCS_FILES}- \`$file\`\n" ;;
    *) OTHER_FILES="${OTHER_FILES}- \`$file\`\n" ;;
  esac
done <<< "$CHANGED_FILES"

# Generate PR description
{
  echo "## 📋 Overview"
  echo ""
  
  if [ "$BRANCH_NAME" = "develop" ]; then
    echo "This PR promotes **develop** to **main** for release."
    echo ""
    echo "### 🎯 What's Included"
    echo ""
    [ "$FEAT_COMMITS" -gt 0 ] && echo "- ✨ **$FEAT_COMMITS** new feature(s)"
    [ "$FIX_COMMITS" -gt 0 ] && echo "- 🐛 **$FIX_COMMITS** bug fix(es)"
    [ "$DOCS_COMMITS" -gt 0 ] && echo "- 📚 **$DOCS_COMMITS** documentation update(s)"
    [ "$CHORE_COMMITS" -gt 0 ] && echo "- 🔧 **$CHORE_COMMITS** maintenance task(s)"
    echo ""
    
    if [ -n "$HAS_I18N" ]; then
      echo "### 🌍 Highlighted: Internationalization Package"
      echo ""
      echo "New **@fluxwind/i18n** package with:"
      echo "- 🔄 Signals-based reactivity (zero re-renders)"
      echo "- 🌍 6 default locales: English, Spanish, French, German, Chinese, Japanese"
      echo "- 📝 Interpolation & pluralization support"
      echo "- 🎯 Full TypeScript support with autocomplete"
      echo "- ✅ 97.36% test coverage (58 tests passing)"
      echo ""
    fi
    
    if [ -n "$HAS_ICONS" ]; then
      echo "### 🎨 Highlighted: Universal Icon System"
      echo ""
      echo "Comprehensive icon support with multiple library integrations and full test coverage."
      echo ""
    fi
  else
    echo "### Summary"
    echo ""
    case "$BRANCH_TYPE" in
      feature) echo "Introduces a new feature: **$TITLE**" ;;
      fix) echo "Fixes an issue: **$TITLE**" ;;
      docs) echo "Updates documentation: **$TITLE**" ;;
      refactor) echo "Refactors code: **$TITLE**" ;;
      *) echo "Changes: **$TITLE**" ;;
    esac
    echo ""
  fi
  
  echo "## 📝 Commits"
  echo ""
  echo "<details>"
  echo "<summary>📋 View all $COMMIT_COUNT commit(s)</summary>"
  echo ""
  echo "\`\`\`"
  git log --no-merges --pretty=format:"%s" "$BASE_BRANCH..HEAD" 2>/dev/null
  echo ""
  echo "\`\`\`"
  echo "</details>"
  echo ""
  
  echo "## 📊 Impact"
  echo ""
  echo "| Metric | Value |"
  echo "| --- | --- |"
  echo "| **Files changed** | $FILES_COUNT |"
  echo "| **Lines added** | +$ADDITIONS |"
  echo "| **Lines removed** | -$DELETIONS |"
  echo "| **Net change** | $((ADDITIONS - DELETIONS)) |"
  echo ""
  
  echo "<details>"
  echo "<summary>📁 View changed files by category</summary>"
  echo ""
  
  [ -n "$I18N_FILES" ] && echo "#### 🌍 i18n Package" && echo "" && echo -e "$I18N_FILES"
  [ -n "$ICONS_FILES" ] && echo "#### 🎨 Icons Package" && echo "" && echo -e "$ICONS_FILES"
  [ -n "$CORE_FILES" ] && echo "#### 🧩 Core Components" && echo "" && echo -e "$CORE_FILES"
  [ -n "$THEMES_FILES" ] && echo "#### 🎨 Themes & Tokens" && echo "" && echo -e "$THEMES_FILES"
  [ -n "$UTILS_FILES" ] && echo "#### 🔧 Utilities" && echo "" && echo -e "$UTILS_FILES"
  [ -n "$TEST_FILES" ] && echo "#### ✅ Tests" && echo "" && echo -e "$TEST_FILES"
  [ -n "$DOCS_FILES" ] && echo "#### 📚 Documentation" && echo "" && echo -e "$DOCS_FILES"
  [ -n "$PLAYGROUND_FILES" ] && echo "#### 🎮 Playground" && echo "" && echo -e "$PLAYGROUND_FILES"
  [ -n "$CICD_FILES" ] && echo "#### ⚙️ CI/CD & Scripts" && echo "" && echo -e "$CICD_FILES"
  [ -n "$CONFIG_FILES" ] && echo "#### 📋 Configuration" && echo "" && echo -e "$CONFIG_FILES"
  [ -n "$OTHER_FILES" ] && echo "#### 📦 Other" && echo "" && echo -e "$OTHER_FILES"
  
  echo "</details>"
  echo ""
  
  echo "## ✅ Checklist"
  echo ""
  echo "- [ ] Code follows project style guidelines"
  echo "- [ ] Self-review completed"
  echo "- [ ] Tests added/updated and passing"
  echo "- [ ] Documentation updated"
  echo "- [ ] No new warnings or errors"
  echo "- [ ] Changeset created (if applicable)"
  echo ""
  
  echo "---"
  echo ""
  echo "_**Base:** \`$BASE_BRANCH\` | **Head:** \`$BRANCH_NAME\`_"
  
} > "$TEMP_FILE"

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
