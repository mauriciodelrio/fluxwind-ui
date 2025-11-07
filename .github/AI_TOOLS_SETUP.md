# AI-Powered PR Tools Setup

This repository uses AI tools to assist with pull request descriptions and code reviews.

## Available Tools

### 1. PR Agent (OpenAI) - Manual Only

Commands that require OpenAI API credits:

- `/describe` - Generate comprehensive PR description
- `/review` - Get detailed code review with suggestions
- `/improve` - Get specific code improvement suggestions
- `/ask <question>` - Ask questions about the PR

**Trigger**: Manual comment only (no auto-execution to save credits)

### 2. GitHub Copilot - Manual Only

Command for Copilot Pro subscribers:

- `/copilot-review` - Request review using GitHub Copilot

**Trigger**: Manual comment only (no auto-execution to save quota)

## Setup Instructions

### PR Agent (OpenAI)

1. **Get OpenAI API Key**
   - Go to https://platform.openai.com/api-keys
   - Create a new API key
   - Add billing method at https://platform.openai.com/account/billing
   - **Note**: Requires active billing, typical cost ~$0.01-0.05 per PR review

2. **Add Secret to Repository**
   - Go to repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `OPENAI_KEY`
   - Value: Your OpenAI API key
   - Click "Add secret"

3. **Usage**
   ```
   Comment on any PR:
   /describe    - Generate PR description
   /review      - Get code review
   /improve     - Get improvement suggestions
   /ask <Q>     - Ask specific questions
   ```

### GitHub Copilot

1. **Requirements**
   - GitHub Copilot Pro subscription ($10/month)
   - Enable Copilot in repository settings (if needed)

2. **Usage**

   ```
   Comment on any PR:
   /copilot-review - Request Copilot review
   ```

3. **Alternative**
   - Use Copilot in your IDE during manual review
   - Provides inline suggestions as you review code

## Configuration

### PR Agent Config (`.github/pr_agent.toml`)

- Model: GPT-4o
- Focus: Accessibility, Performance, TypeScript, Testing
- Auto-execution: **Disabled** to save credits
- Manual commands: **Enabled**

### Copilot Config (`.github/workflows/copilot-review.yml`)

- Trigger: Manual `/copilot-review` comment only
- Reviews: Code quality, best practices, a11y

## Cost Comparison

| Tool           | Cost Model           | Typical PR Cost |
| -------------- | -------------------- | --------------- |
| PR Agent       | Pay-per-use (OpenAI) | $0.01 - $0.05   |
| GitHub Copilot | Flat subscription    | $10/month       |

## Best Practices

1. **Use sparingly** - Both tools consume credits/quota
2. **Manual triggers only** - We disabled auto-execution to control costs
3. **Human review first** - AI is a supplement, not replacement
4. **Complex PRs** - Best suited for large feature PRs
5. **Security** - Never commit API keys to repository

## When to Use Each Tool

### Use PR Agent (`/describe`, `/review`)

- Need comprehensive PR description
- Want detailed code review with specific suggestions
- Have complex logic that needs explanation
- Need to ask specific questions about implementation

### Use Copilot (`/copilot-review`)

- Already have Copilot Pro subscription
- Want general code quality review
- Prefer integration with GitHub ecosystem
- No OpenAI credits available

### Use Both

- Critical PRs that need thorough review
- Large refactors or new features
- When introducing new patterns

## Troubleshooting

### PR Agent not responding

**Check:**

1. `OPENAI_KEY` secret is set correctly
2. OpenAI account has billing enabled and credits
3. Command syntax is correct (e.g., `/describe`)
4. GitHub Actions are enabled

**Common Issues:**

- "Quota exceeded" → Add credits to OpenAI account
- No response → Check Actions tab for workflow errors

### Copilot Review not working

**Check:**

1. Active GitHub Copilot Pro subscription
2. Copilot enabled in repository settings
3. Command syntax: `/copilot-review`

## Resources

- [PR Agent Documentation](https://github.com/Codium-ai/pr-agent)
- [OpenAI API Pricing](https://openai.com/pricing)
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [Our Contributing Guide](../CONTRIBUTING.md)
