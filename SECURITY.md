# Security Policy

## Supported scope

This repository is a portfolio/development project. Do not submit real credentials, private user information, live malware samples, or sensitive scan targets in issues or pull requests.

## Reporting a vulnerability

Please do not publish exploitable details or credentials in a public issue. Contact the repository owner privately through a contact method listed on their GitHub profile. Include a concise description, impact, reproduction steps in a safe test environment, and suggested mitigation.

## Secrets

- Never commit `.env`, access tokens, passwords, private keys, or Supabase service-role/secret keys.
- If a credential is exposed, revoke or rotate it immediately. Removing it from the latest commit does not make it safe.
- Browser-exposed Supabase publishable keys must be paired with appropriate Row Level Security policies.

## Safe use

Only test systems, domains, files, and messages you own or are explicitly authorized to assess. Current scan screens may be UI scaffolding and must not be relied upon as a production security verdict.
