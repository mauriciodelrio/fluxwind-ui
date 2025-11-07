# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 0.x.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to [security contact email]. You should receive a response within 48 hours.

Please include the following information:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Dependency Management

We use the following tools to manage dependencies securely:

1. **Renovate Bot** - Automated dependency updates with security checks
2. **pnpm audit** - Regular security audits of dependencies
3. **Snyk** - Continuous security monitoring
4. **Exact versions** - We pin exact versions to avoid supply chain attacks

## Security Updates

Security updates are released as soon as possible after a vulnerability is confirmed. We follow this process:

1. Vulnerability is reported or discovered
2. Issue is confirmed and assessed
3. Fix is developed and tested
4. Security advisory is published
5. Patch is released

## Best Practices for Contributors

- Never commit secrets, API keys, or credentials
- Always run `pnpm audit` before submitting PRs
- Keep dependencies up to date
- Use exact versions for production dependencies
- Review dependency licenses for compliance

## Questions?

If you have questions about this policy, please open an issue or contact the maintainers.
