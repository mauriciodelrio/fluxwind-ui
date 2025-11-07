# PR Agent Setup Guide

This guide explains how to configure PR Agent for automated PR descriptions and code reviews.

## Prerequisites

- GitHub repository with Actions enabled
- OpenAI API key

## Setup Steps

### 1. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Navigate to API Keys section
3. Create a new secret key
4. Copy the key (starts with `sk-...`)

### 2. Add Secret to GitHub

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `OPENAI_KEY`
5. Value: Paste your OpenAI API key
6. Click **Add secret**

### 3. Verify Installation

The PR Agent workflow (`.github/workflows/pr-agent.yml`) is already configured.

To test:

1. Create a test branch: `git checkout -b test/pr-agent`
2. Make a small change
3. Push and create a PR
4. Comment `/describe` on the PR
5. PR Agent should respond with a description

## Available Commands

Comment these on any pull request:

| Command             | Description                           |
| ------------------- | ------------------------------------- |
| `/describe`         | Generate comprehensive PR description |
| `/review`           | Get AI code review with suggestions   |
| `/improve`          | Get code improvement suggestions      |
| `/ask <question>`   | Ask questions about the code          |
| `/update_changelog` | Update changelog                      |

## Configuration

PR Agent configuration is in `.github/pr_agent.toml`.

### Key Settings

- **Model**: GPT-4 (fallback to GPT-4 Turbo)
- **Auto-describe**: Enabled for non-draft PRs
- **Auto-review**: Enabled when ready for review
- **Security checks**: Enabled
- **Accessibility focus**: Enabled

### Custom Instructions

PR Agent is configured to focus on:

- ✅ Accessibility (ARIA, keyboard nav, screen readers)
- ✅ Performance (bundle size, re-renders)
- ✅ TypeScript best practices
- ✅ Design token usage
- ✅ Component API design
- ✅ Test coverage

## Usage Tips

### For Feature PRs

1. Open PR as **draft** to prevent auto-review
2. Push all commits
3. Use `/describe` to generate description
4. Mark as **ready for review**
5. Auto-review will run automatically

### For Quick Fixes

1. Open PR normally (not draft)
2. Auto-describe and auto-review will run
3. Review suggestions and apply if needed

### For Complex Changes

1. Use `/ask` to clarify implementation
2. Example: `/ask what's the performance impact?`
3. Example: `/ask how does this affect accessibility?`

## Cost Management

OpenAI API usage is billed based on tokens:

- **GPT-4**: ~$0.03 per 1K tokens
- **Average PR**: ~$0.10 - $0.50 per review

**Tips to reduce costs:**

- Open PRs as drafts initially
- Use `/review` only when needed (not every commit)
- Keep PRs small and focused

## Troubleshooting

### PR Agent not responding

1. Check that `OPENAI_KEY` secret is set correctly
2. Verify GitHub Actions are enabled for the repo
3. Check workflow runs in **Actions** tab
4. Ensure PR is not a draft (if expecting auto-review)

### Rate limits

If you hit OpenAI rate limits:

1. Wait a few minutes
2. Consider upgrading your OpenAI tier
3. Disable auto-review and use manual `/review`

### Custom configuration

Edit `.github/pr_agent.toml` to customize:

- Response format
- Review focus areas
- Auto-enable features
- Label suggestions

## Resources

- [PR Agent Documentation](https://github.com/Codium-ai/pr-agent)
- [OpenAI API Pricing](https://openai.com/pricing)
- [Our PR Templates](./.PULL_REQUEST_TEMPLATE/)

## Questions?

Open an issue or ask in discussions!
