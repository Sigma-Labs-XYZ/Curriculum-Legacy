---
title: 'Assessment'
module: Advanced-Data
---

Your project will be assessed across a number of different areas based on a number of different aspects of the project. Although there is a final submission deadline, you're actually assessed throughout the project, as _how_ you develop your pipeline is important, not just the end result.

## Submission

When assessing your project, the assessors will look at the following artefacts:

- Your GitHub repository
- Your GitHub project board
- The live outputs of your pipeline (e.g. dashboards)
- Your final presentation and tech pack

At **12:00** on the final Friday of the project, you will submit all relevant links in your team Slack channel. You will deliver your presentation in the afternoon.

### Final Presentation

Your final presentation will last for **5 minutes** with 15 minutes for questions from the audience.

Your presentation should outline the key elements of your project and involve a _short_ demo of the pipeline outputs. More specifically the presentation should include:

- An overall business case for your project
- User stories
- An overview of your solution and its impact
- Next steps that you'll take
- Full architecture diagram (draw.io)
- A demonstration of your product

Every member of the team should take an equal share in the preparation and delivery of the presentation.

:::info

During the project weeks, you will be provided with further guidance/support on the content/structure/delivery of your presentation.

:::

### Tech Pack

#### Purpose

Your tech pack documents your project at a level that allows coaches and demo day clients to understand **what** you've built and **how** it works - without needing to ask basic questions.

Submit this an appendix to your presentation google slides (i.e. in the same slide pack at the end). Use it alongside your 5-minute presentation (which will explain the **why** of your project) to tell the full story of your project.

#### What to include

##### Architecture & Design

Information surrounding your Architecture and Design processes. Including but not limited to:
- Design decisions and trade-offs you made
- Any ERDs (on drawsql.app)

##### Features

Clear descriptions of each feature of your project, for example:
- If API: what are the endpoints?
- If RAG: how did you implement it?
- If CI/CD: what does that look like?

##### Technical Notes

Notes on the technology that you used. Including but not limited to:
- Estimated costs to run the project monthly
- How you used AI in development and in the product itself
- More specific technical next steps - how and why you would implement them

##### Project Details

- A list of team members, detailing who built what in the project

#### How we'll use it

Tech Coaches will review your tech pack before your presentation to ask informed questions about your projects.

Client who attend Demo Day will use it to understand your project ahead of the call.

### Results and Feedback

You will receive the results for your project at the end of your presentation.


## Assessment Criteria
 
Each of the below assessment areas will be rated out of ten.
 
- **<span style={{color:"red"}}>2/10</span>** - Unacceptable
- **<span style={{color:"orange"}}>4/10</span>** - Needs Improvement
- **<span style={{color:"yellowgreen"}}>6/10</span>** - Meets Expectations
- **<span style={{color:"green"}}>8/10</span>** - Exceeds Expectations
- **<span style={{color:"forestgreen"}}>10/10</span>** - Outstanding
An average score 6/10 or higher is to be expected.
 
### 1. Presentation
 
Some questions that we will ask for this area will be:
 
- How clearly did you present your solution?
- How well-structured is your presentation?
- Are your presentation slides of high quality?
- etc.

*Note, the 'Presentation' aspect of your Group Project & Presentations will be marked by members of the PHP team. So, if you have any questions on this section please refer to your PHP Coaches Katie McCarthy or Rory Heaven-Leadbetter.*

<details>
<summary><strong>Presentation Quality</strong></summary>
- **0-5/10** - Slides are not at a standard where they can be shown to clients. Consultation with the PHP Coaches will be required to determine next steps prior to Demo Day.
- **6-7/10** - Slides were acceptable but inconsistent; some parts were hard to follow or lacked polish. Several team members struggled to present clearly or concisely. Questions were partially answered, with some uncertainty.
- **8-9/10** - Impressive slides (however with room for improvement). Most of the group presented clearly and concisely, but some individuals could improve. Slide structure was clear and questions were handled effectively.
- **10/10** – Immaculate slides that could be presented to a client tomorrow. Everyone presented clearly, compellingly, and concisely, with a clear slide structure, and exceptionally good fielding of questions.
</details>

### 2. Project Completeness
 
<details>
<summary><strong>MVP Fulfilment</strong></summary>
- **2/10** - Fundamental requirements unmet; the software does not deliver the outputs described in the brief.
- **4/10** - Several core requirements missing or only partially working; delivers limited value against the brief.
- **6/10** - Brief requirements met; the software delivers the key outputs described. A solid implementation of what was asked for.
- **8/10** - Brief fully met and thoughtfully extended; additional features or refinements that go beyond the original scope.
- **10/10** - Brief met and meaningfully extended with well-justified additions that significantly enhance the product's value.
</details>
<details>
<summary><strong>Software Quality</strong></summary>
- **2/10** - Software does not run or produces incorrect/no outputs. Pervasive bugs; outputs untrustworthy.
- **4/10** - Partially functional; requires significant manual intervention. Multiple bugs affecting reliability.
- **6/10** - Software works and does what it's trying to do. A few non-critical bugs; may need occasional manual fixes.
- **8/10** - Software works well end-to-end with minimal issues. Edge cases considered; most error scenarios handled.
- **10/10** - High-quality software that runs reliably with no manual intervention. Edge cases handled gracefully; logging and monitoring in place.
</details>
<details>
<summary><strong>Cloud Deployment & Automation</strong></summary>
- **2/10** - Not deployed to the cloud; runs entirely locally.
- **4/10** - Partially deployed; significant components still local; little automation.
- **6/10** - Deployed to cloud but some components local or manually triggered; partial Terraform.
- **8/10** - Fully deployed on AWS; most infra via Terraform; some CI/CD or scheduling.
- **10/10** - Fully deployed with Terraform; CI/CD via GitHub Actions; scheduling automated; costs documented.
</details>
<details>
<summary><strong>Usefulness & Impact</strong></summary>
- **2/10** - Outputs not useful or unrelated to the problem statement.
- **4/10** - Limited practical value; unclear how they solve the stated problem.
- **6/10** - Functional outputs but could be more tailored to user needs.
- **8/10** - Useful and relevant; connection to problem statement is clear.
- **10/10** - Immediately valuable to target users; solution clearly addresses the stated problem.
</details>

### 3. Code Quality 

<details>
<summary><strong>Readability</strong></summary>
- **2/10** - Code is difficult to understand; poor naming; no consistent style. No docstrings or type hints.
- **4/10** - Hard to follow in places; variable/function names unclear; inconsistent formatting. Few or no docstrings/type hints.
- **6/10** - Generally readable; naming is reasonable but not always self-explanatory; style mostly consistent. Some docstrings and type hints present but inconsistent.
- **8/10** - Readable with clear, descriptive naming; consistent style; easy to follow the logic of most modules. Docstrings on key functions; type hints in most places.
- **10/10** - Self-documenting code with excellent naming conventions; consistent style throughout; a new developer could understand the codebase quickly. Comprehensive docstrings and type hints throughout.
</details>
<details>
<summary><strong>Code Structure & Componentisation</strong></summary>
- **2/10** - Single monolithic scripts; no meaningful organisation.
- **4/10** - Disorganised; logic mixed across files with no clear pattern.
- **6/10** - Recognisable structure but some files too large or responsibilities blurred.
- **8/10** - Good structure with logical module boundaries; occasional repetition.
- **10/10** - Clear separation of concerns; well-named modules; DRY; config externalised.
</details>
<details>
<summary><strong>Architecture Quality</strong></summary>
- **2/10** - No evidence of architectural thinking; no separation of concerns; technology choices unexplained.
- **4/10** - Some structure evident but key decisions are poorly justified; components tightly coupled; data modelling weak or absent.
- **6/10** - Reasonable architecture with identifiable stages/components; technology choices are sensible if not always justified; data model exists and works.
- **8/10** - Well-thought-out architecture with clear separation of concerns; technology choices justified; data model is appropriate for the problem (SQL or NoSQL); some consideration of scalability.
- **10/10** - Excellent architectural decisions with clear rationale; components loosely coupled; data model well-designed for the use case; scalability and cost considered; trade-offs documented.
</details>
<details>
<summary><strong>Efficiency</strong></summary>
- **2/10** - Severely inefficient; pipeline impractical at any scale.
- **4/10** - Noticeably inefficient in several areas; costly or slow at scale.
- **6/10** - Functional but some inefficiencies (repeated scans, redundant API calls).
- **8/10** - Generally efficient; one or two areas to optimise but nothing wasteful.
- **10/10** - Queries and scripts optimised; no unnecessary API calls or redundant processing.
</details>

### 4. Documentation
 
<details>
<summary><strong>README Quality</strong></summary>
- **2/10** - No README; no documentation of any kind.
- **4/10** - README sparse or outdated.
- **6/10** - README with setup steps; a newcomer would still have questions.
- **8/10** - Clear README covering setup, dependencies, and architecture.
- **10/10** - Comprehensive README with setup, architecture overview, env vars, and contribution guide.
</details>

<details>
<summary><strong>Diagram Quality</strong></summary>
- **2/10** - No diagrams; no visual documentation.
- **4/10** - Diagrams absent or significantly inaccurate.
- **6/10** - Diagrams exist but have gaps.
- **8/10** - Architecture and data model diagrams present and accurate.
- **10/10** - Diagrams are clear, well-labelled, and presentation-ready.
</details>

### 5. Pull Requests & Code Review
 
<details>
<summary><strong>PR Coverage</strong></summary>
- **2/10** - No PRs used; all code pushed directly to main.
- **4/10** - PRs sporadic; large amounts of code pushed directly.
- **6/10** - Most significant work through PRs but some code pushed directly to main.
- **8/10** - Almost all code via PRs; very few direct pushes; branch protection in place.
- **10/10** - All code enters main via reviewed PRs; no direct pushes; branch protection enforced.
</details>
<details>
<summary><strong>PR Quality</strong></summary>
- **2/10** - PRs exist but have no title, no description, and no clear purpose — opened for the sake of process rather than genuine review.
- **4/10** - PR titles vague; little or no description provided.
- **6/10** - PRs have titles; descriptions are brief or boilerplate.
- **8/10** - Most PRs well-described with titles and descriptions; occasional gaps in detail.
- **10/10** - Every PR has clear title, description, ticket link, and relevant screenshots/context.
</details>
<details>
<summary><strong>Review Quality</strong></summary>
- **2/10** - No code reviews conducted.
- **4/10** - Very few reviews; those that exist are perfunctory.
- **6/10** - Reviews exist but mostly rubber-stamp approvals (LGTM). Fewer than 2-3 substantive comments per PR on average.
- **8/10** - Reviews include useful comments and catch issues; averaging 2-3+ substantive comments per PR. Some surface-level approvals mixed in.
- **10/10** - Specific, constructive comments on logic, style, and potential issues; evidence of back-and-forth discussion. Consistently 3+ substantive comments per PR.
</details>
<details>
<summary><strong>Team Distribution</strong></summary>
- **2/10** - Only one person uses PRs; rest of team absent.
- **4/10** - PRs and reviews dominated by one or two people.
- **6/10** - PRs and reviews from at least half the team; some members less visible.
- **8/10** - Most team members contributing PRs and reviews; slight imbalance.
- **10/10** - All team members opening and reviewing PRs roughly equally.
</details>

### 6. Project Board
 
<details>
<summary><strong>Ticket Quality</strong></summary>
- **2/10** - Tickets are absent or meaningless — no one could pick one up and understand what to do.
- **4/10** - Tickets vaguely titled; you'd need a conversation to understand what's required. User stories rare.
- **6/10** - Tickets convey the general intent; some additional context needed. User stories on some tickets.
- **8/10** - Most tickets are clear enough that someone could pick them up and start working with minimal questions. User stories on most feature tickets.
- **10/10** - Every ticket is self-contained — clear intent, acceptance criteria, and user story. Anyone could pick the project up and contribute immediately.
</details>
<details>
<summary><strong>Assignment & Ownership</strong></summary>
- **2/10** - No assignments; board provides no visibility on workload.
- **4/10** - Few tickets assigned; no clear picture of who is doing what.
- **6/10** - Some tickets assigned but many unassigned; ownership sometimes unclear.
- **8/10** - Most tickets assigned; ownership clear for majority of work.
- **10/10** - Every ticket assigned; easy to see who is working on what at any time.
</details>
<details>
<summary><strong>Board Usage & Coverage</strong></summary>
- **2/10** - Board does not meaningfully represent the project's work. Fewer than 10 tickets total.
- **4/10** - Board only captures a fraction of actual work. Fewer than 15 tickets; many not moved to completion.
- **6/10** - Covers coding tasks but non-code work (design, research, presentation) largely absent. 15–25 tickets; most moved to Done by project end.
- **8/10** - Covers most work including some non-code tasks. 25+ tickets; board clearly used throughout; all tickets in Done at project end.
- **10/10** - Captures all work: code, planning, design, diagrams, presentation prep, research. 30+ well-scoped tickets; all moved to Done; board tells the full story of the project.
</details>

### 7. Automated Testing
 
<details>
<summary><strong>Test Coverage</strong></summary>
- **2/10** - No tests or only trivial/placeholder tests.
- **4/10** - A small number of tests; large portions of codebase untested.
- **6/10** - Tests for the main happy paths; coverage partial but present.
- **8/10** - Good coverage of core functionality; most stages tested; some edge cases.
- **10/10** - High coverage across all key components of the system; edge cases and error paths tested.
</details>
<details>
<summary><strong>Test Quality</strong></summary>
- **2/10** - No meaningful tests.
- **4/10** - Tests poorly written, unclear, or test trivial things.
- **6/10** - Tests work but basic; mostly testing simple returns rather than behaviour.
- **8/10** - Clear tests of real behaviour; some use of fixtures/mocks.
- **10/10** - Well-named, focused tests of meaningful behaviour; fixtures, mocks, parametrisation.
</details>
<details>
<summary><strong>Continuous Integration</strong></summary>
- **2/10** - No CI; tests only run locally (if at all).
- **4/10** - CI set up but tests don't run reliably or aren't connected to PRs.
- **6/10** - CI workflow exists but not consistently triggered or monitored.
- **8/10** - Tests run in CI on PRs; not necessarily blocking but visible.
- **10/10** - Tests run automatically on every PR via GitHub Actions; PRs blocked if tests fail.
</details>