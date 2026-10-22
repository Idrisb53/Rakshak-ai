# Architecture Notes

## Current application layers

- **Presentation:** React + TypeScript components in `src/components/` and route pages in `src/routes/`.
- **Routing / server runtime:** TanStack Start and TanStack Router (`src/router.tsx`, `src/start.ts`, `src/server.ts`).
- **Identity integration:** Supabase client and auth helpers under `src/integrations/supabase/`.
- **Database changes:** SQL migrations under `supabase/migrations/`.

## Current limitations

The ZIP includes interface pages for URL, QR, website, APK and message analysis, but the scan form controls do not currently demonstrate a complete end-to-end analysis request. Treat analysis services, live threat feeds, and real scan persistence as future integration work unless independently implemented and tested.

## Suggested next engineering steps

1. Define an input schema and API contract for each scan type.
2. Implement server-side analysis adapters with strict timeouts, size limits, and safe handling of untrusted input.
3. Add SSRF protections before fetching user-submitted URLs: block loopback, private, link-local, and reserved IP ranges; re-check redirects and DNS resolution.
4. Add authenticated persistence with RLS policies that enforce user ownership.
5. Store evidence, confidence, rule versions, timestamps, and recommendations for every result.
6. Add unit/integration tests and CI before advertising the service as operational.
