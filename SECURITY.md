# Security Policy

## Supported Versions

The latest version on the `main` branch is supported for security updates.

## Reporting a Vulnerability

Please report vulnerabilities responsibly by opening a private security advisory
on GitHub (preferred). If that is not available, open an issue with minimal
details and request private contact.

When reporting, include:
- Affected file(s) or endpoint(s)
- Reproduction steps
- Impact assessment
- Suggested fix (optional)

## Security Baseline

- Do not commit secrets (`.env`, API keys, tokens, credentials).
- Keep dependencies updated regularly.
- Validate and sanitize all network payloads server-side.
- Prefer server-authoritative checks for combat and movement events.
