# Changes from the live curriculum

Base: [Sigma-Labs-XYZ/Curriculum](https://github.com/Sigma-Labs-XYZ/Curriculum) `main` at `536d824f4` (2026-11-04).

This repo starts with a fresh git history, so other modules and their history are not public.

## 1. Workshops restored to their pre-AI versions

These workshops became CoachBot workshops on `main`. We restored each one to its last version on `main` before that conversion. To find the conversion point, we walked `main`'s first-parent history for the file, following renames. We counted a version as converted if it contained `CoachBotButton` or CoachBot-style `##` step headings (`## Explain`, `## Live Code`, `## Coach Setup`, `## Challenge`).

| File (path in this repo) | Restored from commit |
| --- | --- |
| `Software-Fundamentals/Fundamentals/Week 1/Workshops/91_great_121s.md` | `73d82820b^1` (see note 1) |
| `Software-Fundamentals/Fundamentals/Week 2/Workshops/00_intro_oop.md` | `2bad6d6bb` |
| `Software-Fundamentals/Fundamentals/Week 2/Workshops/02_handling_exceptions.md` | `bb8e15992` (was `01_handling_exceptions.md`) |
| `Software-Fundamentals/Fundamentals/Week 2/Workshops/03_inheritance.md` | `bb8e15992` (was `02_inheritance.md`) |
| `Software-Fundamentals/Fundamentals/Week 2/Workshops/04_polymorphism.md` | `e49672cc3` (was `03_polymorphism.md`) |
| `Software-Fundamentals/Fundamentals/Week 2/Workshops/05_encapsulation.md` | `e49672cc3` (was `04_encapsulation.md`) |
| `Software-Fundamentals/Networking/Week 1/Workshops/01_apis_networks.md` | `9cad3d113` |
| `Software-Fundamentals/Networking/Week 1/Workshops/02_get_requests.md` | `e3ff423a4` |
| `Software-Fundamentals/Networking/Week 1/Workshops/03_post_requests.md` | `540734da9` |
| `Software-Fundamentals/Networking/Week 1/Workshops/04_command_line_programs.md` | `e1944639e^1` (see note 2) |
| `Software-Fundamentals/Networking/Week 1/Workshops/05_how_the_internet_works.md` | `d6abc0e31` |
| `Software-Fundamentals/Backend/Week 2/Workshops/01_modelling_databases.md` | `e6c760390` |
| `Software-Fundamentals/Backend/Week 2/Workshops/02_sql_introduction.md` | `3574828bb` |
| `Software-Fundamentals/Backend/Week 2/Workshops/03_joins_deep_dive.md` | `4046e7483` |
| `Software-Fundamentals/Backend/Week 2/Workshops/04_databases_and_apis.md` | `e6c760390` |
| `Software-Fundamentals/Backend/Week 2/Workshops/05_complex_queries.md` | `e6c760390` |

We kept the current filenames, so the workshop order matches `main`.

Notes:

1. On `main`, "Running Great 1:1s" moved from `Week 1/91_great_121s.md` to `Week 2/01_great_11s.md` in the same change that made it a CoachBot workshop. We put the original file back in Week 1 and removed `Week 2/01_great_11s.md`.
2. The original human-written `04_command_line_programs.md` uses a `## Challenge` heading, so the automatic check flagged it too early. We restored it by hand from the parent of the merge that converted the Networking workshops (PR #2004).

## 2. Content scope

- We include only the `Workshops/` folders from the three modules.
- We also include these pages because workshops link to them: `Advanced-Data/01-Week 1/01-case-study.md`, `Advanced-Data/04-Week 4/01-case-study.md`, `Advanced-Data/05-Week 5/00-brief.md`, `Advanced-Data/Group Project/03-assessment.md`, `Advanced-Data/Group Project/Roles/*.md`, `Software-Fundamentals/Fundamentals/Week 1/01-Getting-Setup.md`, `Technical-Business-Analyst/03-Week 3/01-case-study.md`, `Technical-Business-Analyst/03-Week 3/02-handbook.md`, `Technical-Business-Analyst/03-Week 3/06-aside-managing-n8n-resources.md`, plus the images they use.
- Several TBA and Advanced Data workshops embed lessons from the AI-Enabled Technologist module. We copied those 7 lessons into `docs/_shared/AI-Enabled-Technologist/` as partials and pointed the host workshops' `import` lines there instead of `/docs/AI-Enabled-Technologist/`.
- Links to the AI-Enabled Technologist overview page now go to the live site: `https://curriculum.sigmalabs.co.uk/AI-Enabled-Technologist/overview`.
- We left out unpublished drafts with a leading `.`, such as `.96_intro_to_blackjack.md`.
- `docs/index.md` is new and acts as the homepage.

## 3. Site code

- `src/theme/` keeps only the components the content uses. `Admonition`, `EmbeddedYoutubeVideo`, `StakeholderBio` and `StakeholderComment` match `main`. `LockedContent`, `LearningObjectiveComponent` and `LearningSliders` are new read-only versions.
- We removed Auth0, Airtable, Sentry, CoachBot, the git hooks, the learning objectives build script and their dependencies.
- We rewrote `docusaurus.config.js` for GitHub Pages, added a "frozen copy" announcement bar and `noIndex: true`, and removed the cohort-to-Airtable base ID mapping.
