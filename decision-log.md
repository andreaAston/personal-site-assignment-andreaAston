# Architectural Decision Log

## Decision 1: Multi-Page HTML Architecture vs. Single Page Application (SPA)
* **Date:** 6 September 2026
* **Decision Made:** Adopted a standard multi-page static HTML structure (`index.html`, `about.html`, `projects.html`, etc.) styled with vanilla CSS.
* **Alternatives Considered:** 
  1. Vanilla JS Single-Page Application (SPA) using URL hash routing or History API.
  2. Single file layout using smooth scroll sections.
* **Why Chosen:** Multi-page layout provides native, accessible browser navigation and simplifies deep linking for distinct project write-ups,  integrates cleanly with static hosting on Netlify without complex redirect rules. It also preserves true semantic structure per page (`<h1 >` hierarchy and document titles).
* **Trade-off / What was sacrificed:** Shared components (Header, Navigation, Footer) must be manually maintained across multiple HTML files without a templating engine or build tool which some how tiresome ofcourse.


## Decision 2: Skills Section Placement (Integrated vs. Standalone Page)
* **Date:** 6 September 2026
* **Decision Made:** Integrated the primary Skills Matrix into `about.html` with a concise teaser grid on `index.html`, rather than creating a standalone `skills.html`.
* **Alternatives Considered:** Dedicated `/skills.html` top-level page.
* **Why Chosen:** Maintains a streamlined 5-item main navigation structure and prevents light-content pages. It couples technical capabilities directly with personal bio and project evidence.
* **Trade-off / What was sacrificed:** Skills are not accessible via a single top-level URL path; users must view the Home or About page to see the full breakdown.