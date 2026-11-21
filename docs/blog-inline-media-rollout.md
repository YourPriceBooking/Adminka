# Inline photos in new blog articles

The Adminka composer previews a local photo immediately, then submits the file
on publication. Images split ordinary paragraphs at the cursor, but go before
formatted blocks so headings, quotes and list numbering stay intact. The cover is a separate image; the current API/public page
treats the first upload as the cover, so a cover is required only when adding
inline photos. No draft upload is performed. Refreshing the page cannot restore
local photos or the unsaved article.

## Staging smoke before deployment

**Do not submit using a stock local build.** The client configuration in
`src/features/api/api.ts` targets the production Blog API. Point the test build
to a verified isolated Blog API first.

1. In a new draft, write three paragraphs and select a cover. Insert photo A
   after paragraph 2, then photo B after paragraph 1. Give each photo a distinct
   alt and caption.
2. Publish to the staging Blog API through the existing add-post request
   and reload the published staging article. Confirm cover / photo B /
   photo A, exact paragraph placement, correct alt/caption, and that no local
   blob URL is relied on by the reader page.
3. Repeat with delete/undo and a canceled selection. Confirm text-only
   publication still works without a cover. Separately fail the network request
   before the server receives it, then retry without reselecting photos.
   Do not treat a lost response after a committed insert as safe to retry unless
   the API has idempotency.
4. Verify published-post text edits still work and do not modify existing
   media. New photo uploads on that screen remain unavailable in this change.

## When the Blog-Api repository is available

- Inspect add-post's upload/markup mapping and update-post's accepted data and
  authorization. Use staging and existing synthetic files for validation.
- Add durable asset identifiers linked to the authenticated editor and draft.
  Validate MIME, bytes, count, access, and links on the server. Model optional
  cover and inline media independently; associate alt and caption with each
  asset. Final document order must not dictate asset identity.
- Support drafts that survive refresh and editing published articles.
  Resolve referenced assets and persist the body and cover together. Do not
  change the publication date or article URL; update the editorial change date
  only on a successful substantive edit. Reclaim abandoned temporary assets.
- Make the public renderer prefer stable references while keeping the legacy
  positional format readable. Deploy backward-compatibly and test coverless
  inline photos, failed/retried updates, reloads and existing posts before
  enabling the new flow.
