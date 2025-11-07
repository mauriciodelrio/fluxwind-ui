#!/bin/bash

# Fluxwind UI - AI-Powered PR Description Generator
# Uses GitHub Copilot CLI to generate intelligent PR descriptions

# This script is called by create-pr.sh when Copilot is available

BASE_BRANCH="$1"
CURRENT_BRANCH="$2"
COMMIT_COUNT="$3"
FILES_COUNT="$4"
ADDITIONS="$5"
DELETIONS="$6"

# Get commit messages with full context
COMMITS=$(git log --no-merges --pretty=format:"- %s" "$BASE_BRANCH..HEAD" 2>/dev/null)
COMMIT_DETAILS=$(git log --no-merges --pretty=format:"%h - %s%n%b" "$BASE_BRANCH..HEAD" 2>/dev/null | head -100)

# Get changed files by category
CHANGED_FILES=$(git diff --name-only "$BASE_BRANCH..HEAD" 2>/dev/null)

# Build a list of changed packages under packages/* dynamically
PACKAGES=()
while IFS= read -r f; do
  case "$f" in
    packages/*/|packages/*/*)
      pkg=$(echo "$f" | sed -n 's|packages/\([^/]*\)/.*|\1|p')
      if [ -n "$pkg" ]; then
        PACKAGES+=("$pkg")
      fi
      ;;
  esac
done <<< "$CHANGED_FILES"

# Deduplicate packages
UNIQUE_PACKAGES=()
for p in "${PACKAGES[@]}"; do
  skip=0
  for q in "${UNIQUE_PACKAGES[@]}"; do
    [ "$p" = "$q" ] && skip=1 && break
  done
  [ $skip -eq 0 ] && UNIQUE_PACKAGES+=("$p")
done

# Compose a helpful description file (fallback AI-style generator)
OUT_FILE=$(mktemp)

{
  echo "## 📋 Overview"
  echo ""
  echo "Branch: $CURRENT_BRANCH → $BASE_BRANCH"
  echo ""
  echo "### Summary"
  echo ""
  echo "This PR contains changes between \`$BASE_BRANCH\` and \`$CURRENT_BRANCH\`."
  echo ""
  echo "### 🎯 What's Included"
  echo ""
  if [ "$COMMIT_COUNT" -gt 0 ]; then
    echo "This PR includes **$COMMIT_COUNT commit(s)** and modifies **$FILES_COUNT file(s)** (+$ADDITIONS/-$DELETIONS lines)."
  else
    echo "No commits detected between branches."
  fi
  echo ""

  # Highlight changed packages dynamically
  if [ ${#UNIQUE_PACKAGES[@]} -gt 0 ]; then
    echo "### 📦 Packages Affected"
    echo ""
    for pkg in "${UNIQUE_PACKAGES[@]}"; do
      # Count files and commits for this package
      files_count=$(echo "$CHANGED_FILES" | grep -E "^packages/$pkg/" | wc -l | tr -d ' ')
      commits_count=$(git log --no-merges --pretty=format:%s "$BASE_BRANCH..HEAD" 2>/dev/null | grep -i "$pkg" | wc -l | tr -d ' ')
      echo "#### $pkg"
      echo "- Files changed: $files_count"
      echo "- Commits referencing package: $commits_count"
      echo "- Suggested highlights:"
      echo "  - TypeScript types & exports updated"
      echo "  - Tests added/updated"
      echo "  - Build/export improvements (ESM/CJS/Types)"
      echo ""
    done
  else
    echo "No package-specific changes detected. This appears to be general repo-level work."
    echo ""
  fi

  echo "## 📝 Commits"
  echo ""
  echo "<details>"
  echo "<summary>📋 View all $COMMIT_COUNT commit(s)</summary>"
  echo ""
  echo '```'
  git log --no-merges --pretty=format:"%s" "$BASE_BRANCH..HEAD" 2>/dev/null
  echo ""
  echo '```'
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

  echo "## ✅ Checklist"
  echo ""
  echo "- [ ] Unit tests pass (\`pnpm test\`)"
  echo "- [ ] Type checking passes (\`pnpm type-check\`)"
  echo "- [ ] Linting passes (\`pnpm lint\`)"
  echo "- [ ] Build successful (\`pnpm build\`)"
  echo "- [ ] Documentation updated"
  echo "- [ ] Changeset created (if applicable)"
  echo ""
  echo "---"
  echo "_**Base:** \`$BASE_BRANCH\` | **Head:** \`$CURRENT_BRANCH\`_"

} > "$OUT_FILE"

cat "$OUT_FILE"
rm "$OUT_FILE"
