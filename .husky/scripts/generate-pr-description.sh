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

# Get the base branch (default to develop, fallback to main, then to parent commit)
BASE_BRANCH=${1:-develop}

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

# Categorize changed files
declare -A FILE_CATEGORIES
while IFS= read -r file; do
  case "$file" in
    packages/core/*)
      FILE_CATEGORIES["Core Components"]+="- \`$file\`\n"
      ;;
    packages/themes/*)
      FILE_CATEGORIES["Themes & Tokens"]+="- \`$file\`\n"
      ;;
    packages/utils/*)
      FILE_CATEGORIES["Utilities"]+="- \`$file\`\n"
      ;;
    apps/docs/*)
      FILE_CATEGORIES["Documentation"]+="- \`$file\`\n"
      ;;
    apps/playground/*)
      FILE_CATEGORIES["Playground"]+="- \`$file\`\n"
      ;;
    *.test.ts|*.test.tsx|*.spec.ts|*.spec.tsx)
      FILE_CATEGORIES["Tests"]+="- \`$file\`\n"
      ;;
    .github/*)
      FILE_CATEGORIES["CI/CD"]+="- \`$file\`\n"
      ;;
    *.md)
      FILE_CATEGORIES["Documentation"]+="- \`$file\`\n"
      ;;
    *)
      FILE_CATEGORIES["Other"]+="- \`$file\`\n"
      ;;
  esac
done <<< "$CHANGED_FILES"

# Get file statistics
ADDITIONS=$(git diff --shortstat "$BASE_BRANCH..HEAD" 2>/dev/null | grep -oP '\d+ insertion' | grep -oP '\d+' || echo "0")
DELETIONS=$(git diff --shortstat "$BASE_BRANCH..HEAD" 2>/dev/null | grep -oP '\d+ deletion' | grep -oP '\d+' || echo "0")

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

# Remove the selected checkbox from the list
echo "" | grep -v "$TYPE_CHECKBOX" >/dev/null 2>&1

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

if [ ${#FILE_CATEGORIES[@]} -gt 0 ]; then
  echo "This PR modifies **$FILES_COUNT file(s)** with **+$ADDITIONS/-$DELETIONS** lines changed:"
  echo ""
  
  for category in "${!FILE_CATEGORIES[@]}"; do
    echo "### $category"
    echo ""
    echo -e "${FILE_CATEGORIES[$category]}"
  done
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
