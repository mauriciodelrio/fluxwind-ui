#!/bin/bash

# Fluxwind UI - Branch Name Validation Script
# Ensures all branches follow our naming convention

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get current branch name
BRANCH_NAME=$(git symbolic-ref --short HEAD 2>/dev/null)

# Branches that are always allowed (permanent branches)
PROTECTED_BRANCHES=("main" "develop")

# Check if current branch is protected
for protected in "${PROTECTED_BRANCHES[@]}"; do
  if [ "$BRANCH_NAME" = "$protected" ]; then
    echo -e "${GREEN}✓${NC} Branch '${BLUE}$BRANCH_NAME${NC}' is a protected branch"
    exit 0
  fi
done

# Valid branch prefixes and their descriptions
declare -A VALID_PREFIXES=(
  ["feature"]="New features and enhancements"
  ["fix"]="Bug fixes"
  ["docs"]="Documentation changes"
  ["refactor"]="Code refactoring"
  ["test"]="Adding or updating tests"
  ["chore"]="Maintenance tasks"
  ["perf"]="Performance improvements"
  ["ci"]="CI/CD configuration"
  ["revert"]="Reverting previous changes"
)

# Valid scopes (aligned with commitlint scopes)
VALID_SCOPES="(core|themes|utils|icons|button|input|dropdown|modal|card|select|checkbox|radio|switch|slider|tabs|accordion|toast|tooltip|dialog|popover|badge|avatar|skeleton|spinner|progress|divider|a11y|animation|tokens|signals|hooks|forms|layout|navigation|feedback|data-display|overlays|deps|ci|config|dx|testing|build|release|docs|storybook|readme|contributing|changelog|license|monorepo|workspace)"

# Regex patterns
# Pattern 1: prefix/descriptive-name (original format)
BRANCH_REGEX_SIMPLE="^(feature|fix|docs|refactor|test|chore|perf|ci|revert)\/[a-z0-9][a-z0-9-]*[a-z0-9]$"
# Pattern 2: prefix/scope-descriptive-name (with scope)
BRANCH_REGEX_SCOPED="^(feature|fix|docs|refactor|test|chore|perf|ci|revert)\/${VALID_SCOPES}-[a-z0-9][a-z0-9-]*[a-z0-9]$"

# Validate branch name (accept either format)
if [[ ! $BRANCH_NAME =~ $BRANCH_REGEX_SIMPLE ]] && [[ ! $BRANCH_NAME =~ $BRANCH_REGEX_SCOPED ]]; then
  echo -e "${RED}✗ Invalid branch name:${NC} ${YELLOW}$BRANCH_NAME${NC}\n"
  echo -e "${BLUE}Branch names must follow one of these patterns:${NC}"
  echo -e "  ${GREEN}prefix/descriptive-name${NC}"
  echo -e "  ${GREEN}prefix/scope-descriptive-name${NC} (with scope)\n"
  
  echo -e "${BLUE}Valid prefixes:${NC}"
  for prefix in "${!VALID_PREFIXES[@]}"; do
    echo -e "  ${GREEN}$prefix/${NC} - ${VALID_PREFIXES[$prefix]}"
  done | sort
  
  echo -e "\n${BLUE}Valid scopes (optional):${NC}"
  echo -e "  Packages: ${GREEN}core, themes, utils, icons${NC}"
  echo -e "  Components: ${GREEN}button, input, dropdown, modal, card, select${NC}, etc."
  echo -e "  Features: ${GREEN}a11y, animation, tokens, signals, hooks${NC}, etc."
  echo -e "  Infrastructure: ${GREEN}deps, ci, config, dx, testing${NC}, etc."
  
  echo -e "\n${BLUE}Naming rules:${NC}"
  echo -e "  • Use lowercase letters, numbers, and hyphens"
  echo -e "  • Start and end with alphanumeric characters"
  echo -e "  • Use descriptive names (e.g., ${GREEN}feature/button-component${NC})"
  echo -e "  • Avoid generic names (e.g., ${RED}feature/new-stuff${NC})\n"
  
  echo -e "${BLUE}Examples:${NC}"
  echo -e "  ${GREEN}✓${NC} feature/button-component"
  echo -e "  ${GREEN}✓${NC} feature/icons-universal-wrapper"
  echo -e "  ${GREEN}✓${NC} fix/dropdown-keyboard-nav"
  echo -e "  ${GREEN}✓${NC} fix/modal-focus-trap"
  echo -e "  ${GREEN}✓${NC} docs/contributing-guide"
  echo -e "  ${GREEN}✓${NC} refactor/signal-performance"
  echo -e "  ${GREEN}✓${NC} test/button-accessibility"
  echo -e "  ${GREEN}✓${NC} chore/upgrade-deps\n"
  
  echo -e "${BLUE}Examples with scope:${NC}"
  echo -e "  ${GREEN}✓${NC} feature/icons-lucide-integration"
  echo -e "  ${GREEN}✓${NC} feature/button-loading-state"
  echo -e "  ${GREEN}✓${NC} fix/dropdown-positioning-bug"
  echo -e "  ${GREEN}✓${NC} test/a11y-keyboard-navigation"
  echo -e "  ${GREEN}✓${NC} chore/deps-update-react-19\n"
  
  echo -e "${YELLOW}To rename your branch:${NC}"
  echo -e "  git branch -m $BRANCH_NAME ${GREEN}prefix/new-name${NC}\n"
  
  exit 1
fi

# Success message
PREFIX=$(echo "$BRANCH_NAME" | cut -d'/' -f1)
NAME=$(echo "$BRANCH_NAME" | cut -d'/' -f2-)

# Check if branch has scope format (scope-name)
if [[ $NAME =~ ^([a-z0-9]+)-(.+)$ ]]; then
  SCOPE="${BASH_REMATCH[1]}"
  DESC="${BASH_REMATCH[2]}"
  echo -e "${GREEN}✓${NC} Valid branch name: ${BLUE}$BRANCH_NAME${NC}"
  echo -e "  Type: ${GREEN}$PREFIX${NC} - ${VALID_PREFIXES[$PREFIX]}"
  echo -e "  Scope: ${GREEN}$SCOPE${NC}"
  echo -e "  Description: ${GREEN}$DESC${NC}"
else
  echo -e "${GREEN}✓${NC} Valid branch name: ${BLUE}$BRANCH_NAME${NC}"
  echo -e "  Type: ${GREEN}$PREFIX${NC} - ${VALID_PREFIXES[$PREFIX]}"
fi

exit 0
