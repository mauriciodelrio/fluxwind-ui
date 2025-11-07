#!/bin/bash

# Fluxwind UI - PR Description Generator
# Generates comprehensive PR descriptions based on branch info and changes

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Function to print section headers
print_header() {
  echo -e "\n${BOLD}${BLUE}## $1${NC}"
}

# Function to print info
print_info() {
  echo -e "${CYAN}$1${NC}"
}

# Function to print success
print_success() {
  echo -e "${GREEN}✓${NC} $1"
}

# Function to print warning
print_warning() {
  echo -e "${YELLOW}⚠${NC} $1"
}

# Function to print error
print_error() {
  echo -e "${RED}✗${NC} $1"
}

# Get current branch name
BRANCH_NAME=$(git symbolic-ref --short HEAD 2>/dev/null)

if [ -z "$BRANCH_NAME" ]; then
  print_error "Not on a valid git branch"
  exit 1
fi

# Get the base branch
# Special case: if we're on develop, PR goes to main
# Otherwise: feature/fix/etc branches PR to develop (or provided base)
if [ "$BRANCH_NAME" = "develop" ]; then
  BASE_BRANCH="main"
  print_info "Detected develop branch - PR will target main"
else
  BASE_BRANCH=${1:-develop}
fi

# Check if base branch exists
if ! git rev-parse --verify "$BASE_BRANCH" >/dev/null 2>&1; then
  if [ "$BASE_BRANCH" = "develop" ]; then
    print_warning "Branch 'develop' not found, trying 'main'"
    BASE_BRANCH="main"
  fi
  
  if ! git rev-parse --verify "$BASE_BRANCH" >/dev/null 2>&1; then
    print_warning "Base branch '$BASE_BRANCH' not found, using parent commit"
    # Get the merge base or first commit on this branch
    BASE_BRANCH=$(git rev-parse HEAD~1 2>/dev/null || git rev-list --max-parents=0 HEAD)
    
    if [ -z "$BASE_BRANCH" ]; then
      print_error "Could not determine base for comparison"
      exit 1
    fi
  fi
fi

# Parse branch name
if [[ $BRANCH_NAME =~ ^(feature|fix|docs|refactor|test|chore|perf|ci|revert)\/(.+)$ ]]; then
  BRANCH_TYPE="${BASH_REMATCH[1]}"
  BRANCH_DESC="${BASH_REMATCH[2]}"
  
  # Check if branch has scope (scope-description format)
  if [[ $BRANCH_DESC =~ ^([a-z0-9]+)-(.+)$ ]]; then
    BRANCH_SCOPE="${BASH_REMATCH[1]}"
    BRANCH_NAME_ONLY="${BASH_REMATCH[2]}"
  else
    BRANCH_SCOPE=""
    BRANCH_NAME_ONLY="$BRANCH_DESC"
  fi
else
  # Not a standard branch, just use branch name
  BRANCH_TYPE=""
  BRANCH_SCOPE=""
  BRANCH_DESC="$BRANCH_NAME"
  BRANCH_NAME_ONLY="$BRANCH_NAME"
fi

# Convert branch name to title
TITLE=$(echo "$BRANCH_NAME_ONLY" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')

# Determine PR type based on branch prefix
case "$BRANCH_TYPE" in
  feature)
    PR_TYPE="✨ New feature"
    TYPE_CHECKBOX="- [x] ✨ New feature (non-breaking change which adds functionality)"
    ;;
  fix)
    PR_TYPE="🐛 Bug fix"
    TYPE_CHECKBOX="- [x] 🐛 Bug fix (non-breaking change which fixes an issue)"
    ;;
  docs)
    PR_TYPE="📚 Documentation"
    TYPE_CHECKBOX="- [x] 📚 Documentation update"
    ;;
  refactor)
    PR_TYPE="♻️ Refactor"
    TYPE_CHECKBOX="- [x] ♻️ Code refactor (no functional changes)"
    ;;
  perf)
    PR_TYPE="⚡️ Performance"
    TYPE_CHECKBOX="- [x] ⚡️ Performance improvement"
    ;;
  test)
    PR_TYPE="✅ Test"
    TYPE_CHECKBOX="- [x] ✅ Test update"
    ;;
  chore)
    PR_TYPE="🔧 Chore"
    TYPE_CHECKBOX="- [x] 🔧 Build/CI configuration change"
    ;;
  ci)
    PR_TYPE="🔧 CI/CD"
    TYPE_CHECKBOX="- [x] 🔧 Build/CI configuration change"
    ;;
  revert)
    PR_TYPE="⏪ Revert"
    TYPE_CHECKBOX="- [x] ⏪ Revert of previous changes"
    ;;
  *)
    PR_TYPE="Changes"
    TYPE_CHECKBOX="- [ ] Other changes"
    ;;
esac

# Get commit messages
COMMITS=$(git log --no-merges --pretty=format:"- %s" "$BASE_BRANCH..HEAD" 2>/dev/null)
COMMIT_COUNT=$(git rev-list --count --no-merges "$BASE_BRANCH..HEAD" 2>/dev/null || echo "0")

# Get changed files
CHANGED_FILES=$(git diff --name-only "$BASE_BRANCH..HEAD" 2>/dev/null)
FILES_COUNT=$(echo "$CHANGED_FILES" | grep -c '^' 2>/dev/null || echo "0")

# Categorize changed files (simplified for compatibility)
CORE_FILES=""
THEMES_FILES=""
UTILS_FILES=""
I18N_FILES=""
DOCS_FILES=""
PLAYGROUND_FILES=""
TEST_FILES=""
CICD_FILES=""
OTHER_FILES=""

while IFS= read -r file; do
  [ -z "$file" ] && continue
  case "$file" in
    packages/core/*)
      CORE_FILES="${CORE_FILES}- \`$file\`\n"
      ;;
    packages/themes/*)
      THEMES_FILES="${THEMES_FILES}- \`$file\`\n"
      ;;
    packages/utils/*)
      UTILS_FILES="${UTILS_FILES}- \`$file\`\n"
      ;;
    packages/i18n/*)
      I18N_FILES="${I18N_FILES}- \`$file\`\n"
      ;;
    apps/docs/*)
      DOCS_FILES="${DOCS_FILES}- \`$file\`\n"
      ;;
    apps/playground/*)
      PLAYGROUND_FILES="${PLAYGROUND_FILES}- \`$file\`\n"
      ;;
    *.test.ts|*.test.tsx|*.spec.ts|*.spec.tsx)
      TEST_FILES="${TEST_FILES}- \`$file\`\n"
      ;;
    .github/*|.husky/*)
      CICD_FILES="${CICD_FILES}- \`$file\`\n"
      ;;
    *.md)
      DOCS_FILES="${DOCS_FILES}- \`$file\`\n"
      ;;
    *)
      OTHER_FILES="${OTHER_FILES}- \`$file\`\n"
      ;;
  esac
done <<< "$CHANGED_FILES"

# Get file statistics (macOS compatible)
SHORTSTAT=$(git diff --shortstat "$BASE_BRANCH..HEAD" 2>/dev/null || echo "")
ADDITIONS=$(echo "$SHORTSTAT" | sed -n 's/.* \([0-9]*\) insertion.*/\1/p')
DELETIONS=$(echo "$SHORTSTAT" | sed -n 's/.* \([0-9]*\) deletion.*/\1/p')
[ -z "$ADDITIONS" ] && ADDITIONS="0"
[ -z "$DELETIONS" ] && DELETIONS="0"

# Generate PR description
echo "# PR Description Generated"
echo ""
echo "Copy and paste the content below into your PR description:"
echo ""
echo "---"
echo ""
echo "## Description"
echo ""

if [ -n "$BRANCH_SCOPE" ]; then
  echo "This PR introduces $PR_TYPE in the **$BRANCH_SCOPE** scope: **$TITLE**"
else
  echo "This PR introduces $PR_TYPE: **$TITLE**"
fi

echo ""
echo "### Summary"
echo ""
echo "_Please provide a brief overview of what this PR accomplishes and why it's needed._"
echo ""

if [ "$COMMIT_COUNT" -gt 0 ]; then
  echo "### Commits Overview"
  echo ""
  echo "This PR includes **$COMMIT_COUNT commit(s)**:"
  echo ""
  echo "$COMMITS"
  echo ""
fi

echo "## Type of Change"
echo ""
echo "$TYPE_CHECKBOX"
echo "- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)"
echo "- [ ] ✨ New feature (non-breaking change which adds functionality)"
echo "- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)"
echo "- [ ] 📚 Documentation update"
echo "- [ ] 🎨 Style/UI update (formatting, styling, visual changes)"
echo "- [ ] ♻️ Code refactor (no functional changes)"
echo "- [ ] ⚡️ Performance improvement"
echo "- [ ] ✅ Test update"
echo "- [ ] 🔧 Build/CI configuration change"
echo "- [ ] 🔒 Security fix"

echo ""
echo "## Related Issues"
echo ""
echo "<!-- Link any related issues using #issue_number -->"
echo ""
echo "Closes #"
echo "Relates to #"
echo ""

echo "## Changes Made"
echo ""

if [ "$FILES_COUNT" -gt 0 ]; then
  echo "This PR modifies **$FILES_COUNT file(s)** with **+$ADDITIONS/-$DELETIONS** lines changed:"
  echo ""
  
  # Print categories that have files
  if [ -n "$I18N_FILES" ]; then
    echo "### i18n Package"
    echo ""
    echo -e "$I18N_FILES"
  fi
  
  if [ -n "$CORE_FILES" ]; then
    echo "### Core Components"
    echo ""
    echo -e "$CORE_FILES"
  fi
  
  if [ -n "$THEMES_FILES" ]; then
    echo "### Themes & Tokens"
    echo ""
    echo -e "$THEMES_FILES"
  fi
  
  if [ -n "$UTILS_FILES" ]; then
    echo "### Utilities"
    echo ""
    echo -e "$UTILS_FILES"
  fi
  
  if [ -n "$DOCS_FILES" ]; then
    echo "### Documentation"
    echo ""
    echo -e "$DOCS_FILES"
  fi
  
  if [ -n "$PLAYGROUND_FILES" ]; then
    echo "### Playground"
    echo ""
    echo -e "$PLAYGROUND_FILES"
  fi
  
  if [ -n "$TEST_FILES" ]; then
    echo "### Tests"
    echo ""
    echo -e "$TEST_FILES"
  fi
  
  if [ -n "$CICD_FILES" ]; then
    echo "### CI/CD & Scripts"
    echo ""
    echo -e "$CICD_FILES"
  fi
  
  if [ -n "$OTHER_FILES" ]; then
    echo "### Other"
    echo ""
    echo -e "$OTHER_FILES"
  fi
else
  echo "- _No changes detected or changes are in comparison to $BASE_BRANCH_"
fi

echo ""
echo "## Screenshots/Videos"
echo ""
echo "<!-- If applicable, add screenshots or videos to demonstrate the changes -->"
echo ""
echo "_No visual changes / Add screenshots here_"
echo ""

echo "## Testing"
echo ""
echo "- [ ] Unit tests pass (\`pnpm test\`)"
echo "- [ ] Type checking passes (\`pnpm type-check\`)"
echo "- [ ] Linting passes (\`pnpm lint\`)"
echo "- [ ] Build successful (\`pnpm build\`)"
echo "- [ ] Manual testing completed"
echo ""
echo "### Test Instructions"
echo ""
echo "1. Checkout this branch: \`git checkout $BRANCH_NAME\`"
echo "2. Install dependencies: \`pnpm install\`"
echo "3. Run tests: \`pnpm test\`"
echo "4. Build: \`pnpm build\`"
echo ""

echo "## Checklist"
echo ""
echo "- [ ] My code follows the project's code style and conventions"
echo "- [ ] I have performed a self-review of my code"
echo "- [ ] I have commented my code, particularly in hard-to-understand areas"
echo "- [ ] I have made corresponding changes to the documentation"
echo "- [ ] My changes generate no new warnings or errors"
echo "- [ ] I have added tests that prove my fix is effective or that my feature works"
echo "- [ ] New and existing unit tests pass locally with my changes"
echo "- [ ] I have checked my code and corrected any misspellings"
echo "- [ ] I have updated the CHANGELOG (if applicable)"
echo ""

echo "## Breaking Changes"
echo ""
echo "<!-- If this PR introduces breaking changes, describe them here and provide migration instructions -->"
echo ""
echo "N/A"
echo ""

echo "## Additional Notes"
echo ""
echo "<!-- Add any additional notes, context, or concerns about this PR -->"
echo ""
echo "_Base branch: $BASE_BRANCH_"
echo ""

echo "---"
echo ""
print_success "PR description generated successfully!"
print_info "Branch: $BRANCH_NAME"
print_info "Type: $PR_TYPE"
if [ -n "$BRANCH_SCOPE" ]; then
  print_info "Scope: $BRANCH_SCOPE"
fi
print_info "Base: $BASE_BRANCH"
print_info "Commits: $COMMIT_COUNT"
print_info "Files changed: $FILES_COUNT (+$ADDITIONS/-$DELETIONS)"
