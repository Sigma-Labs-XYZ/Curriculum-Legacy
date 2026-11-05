
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent';
import LockedContent from "@theme/LockedContent";

<LearningObjectiveComponent />

## Pre-work

### Setup

If nobody has done so already, copy and paste this command into Slack.

```
/prework Spec-Driven Development
```

### Research

:::info Task

Before the session, think about how you currently approach starting a new piece of software or a coding project.

- What is the first thing you do when you start a new project?
- When do you start writing code relative to when you start planning?
- What problems arise when a team jumps straight into writing code without agreeing on what they are building first?

:::

:::info Task

Read the section headings and brief descriptions in this article: [Spec-driven development](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)

:::

### Reflect

Before this workshop, consider how you've been using AI in the past week, what's worked well, what hasn't, and any surprises or frustrations you've encountered.

You'll be sharing these reflections at the start of the workshop, so come prepared to discuss your experiences.

## Workshop

<LockedContent password="ownership">

### Reflect

**Recall** the previous weeks where we have had the trainees reflect on their own experiences and instincts.

**Explain** that we will be doing the same again today

**Ask** the trainees to share what they've used AI for in the past week that was helpful or surprising.

### Recall

**Ask** trainees to explain, in their own understanding, what spec-driven development is and why it might be useful.

**Gather** responses on a shared board for why it might be a good idea to write specifications before writing code.

**Highlight** that many developers open a code editor long before knowing what they are building. Spec-driven development flips this instinct.

### Context

**Introduce** the core problem that spec-driven development addresses:

> When we write code without a clear specification, we are making dozens of small decisions every few minutes - what to name things, how data should flow, what edge cases to handle. Each of those decisions is invisible to everyone else on the team, and to our future selves. The result is a codebase that drifts away from the original intention.

**Explain** that spec-driven development is not about writing long requirements documents. It is about separating three things that are normally tangled together:

> - **What** you are building - the functional requirements and user intent
> - **How** you will build it - the technical architecture and tech stack
> - **Why** certain decisions were made - the principles and quality standards that guide the project

**Ask** trainees: why does it help to keep these three things separate?

> - Changing "what" you build does not necessarily change "how" you build it
> - Changing "how" you build it does not mean the requirements have changed
> - Principles can stay constant even as both the what and the how evolve
> - AI tools can be given focused context rather than a wall of mixed concerns

### The .spec/ Folder

**Explain** that the practical toolkit for this is three Markdown files in a `.spec/` folder:

```
.spec/
  constitution.md    # project principles and quality standards
  specification.md   # what you are building (user stories, requirements)
  plan.md            # tech stack, architecture, component breakdown
```

**Note** that these files are not generated once and forgotten. They are living documents - when requirements change, you update the spec before changing the code.

**Ask** trainees: what are the benefits of keeping these files in the same version-controlled repository as the code?

> - Diffs show intent changes, not just code drift
> - New team members can read the spec to understand decisions
> - Pull requests can be evaluated against the original specification
> - The AI always has access to the latest context

### Live Coding

**Open** a new empty folder and demonstrate creating a `.spec/` folder with three files.

**Explain** that you are specifying the Liverpool Museum of Natural History kiosk data pipeline - a project the group will already recognise from their Advanced Data work. The museum has visitor kiosks collecting satisfaction ratings and emergency/assistance events, and needs a pipeline to extract that data from S3, validate and store it in a database, and make it queryable by museum staff. Because the domain is already familiar, the group can focus entirely on the process rather than on understanding the problem.

**Create** `constitution.md` and talk through each section as you type it:

```md
# Project Constitution

## Security

- Never store AWS credentials, database passwords, or API keys in source code or version control
- All sensitive configuration must be loaded from environment variables
- Database connections must use the minimum required permissions for each operation

## Data Quality

- Every record must be validated before it is inserted into the database
- Invalid records must be logged with the reason they were rejected - not silently dropped
- The pipeline must be idempotent: running it multiple times against the same source data must not create duplicate records

## Code Quality

- Each script has a single, clearly stated responsibility
- Every data transformation has a corresponding unit test
- No hardcoded values - use named constants for things like rating descriptions and valid value ranges

## Collaboration

- No code is merged to the main branch without at least one review from another team member
- Commits describe what changed and why, not just how
- The specification is updated before the code changes - never after
```

**Explain** that a constitution is not a style guide. It captures the _why_ behind decisions and the non-negotiables every contributor must respect. Notice that Data Quality has its own section here - this is a data engineering project, and data quality failures are silent by nature. If an invalid record is dropped without logging, nobody will ever know.

**Create** `specification.md` and copy this in from the notes, talking through the concept of user stories and pointing out how these capture the *functional* requirements.

```md
# LMNH Kiosk Pipeline Specification

## User Stories

### As an exhibitions manager, I want to query visitor satisfaction ratings by exhibition

- I can see the average rating for each exhibition over a chosen time period
- I can compare exhibitions against each other
- Ratings are shown with their labels (Terrible, Bad, Neutral, Good, Amazing), not just numbers

### As a head of security, I want to query assistance and emergency events by location

- I can see the total number of assistance and emergency events for each exhibition
- I can filter events by date range
- I can identify which exhibitions have the highest rate of emergency events

### As a data engineer, I want a reliable pipeline that keeps the database current

- The pipeline can be re-run safely against the same source data without creating duplicate records
- Records that fail validation are logged with a reason, not silently discarded
- The pipeline completes in a reasonable time on the full dataset
```

**Ask** trainees: what you've purposely left out from this specification?

> - No mention of the database schema or how the tables are structured
> - No mention of how the pipeline is scheduled or triggered
> - No mention of what "reasonable time" means in seconds
> - No mention of where the validation logs are written
>   These are all "how" questions, not "what" questions.

**Create** `plan.md`, copying from here in the interests of time:

```md
# Implementation Plan

## Tech Stack

- Python with boto3 for S3 extraction
- PostgreSQL on AWS RDS as the database
- Terraform to provision all cloud infrastructure
- pytest for testing data transformation logic

## Architecture

- Key tables: exhibition (id, name, department, floor, start_date), rating (id, label, value), interaction (id, exhibition_id, rating_id, event_type, recorded_at)
- Extraction script: connects to S3, identifies relevant files by naming convention, downloads them
- Pipeline script: reads extracted files, validates each row, inserts valid records using upsert logic
- Analysis notebook: connects to RDS and queries the populated tables
```

**Show** trainees how you would now prompt an AI:

> "Here are three files: constitution.md, specification.md, and plan.md. Break this plan into 8-10 small ordered tasks. Each task should state which file to create or modify, what to implement, and which prior tasks it depends on. Mark tasks that can run in parallel with [P]."

**Paste** the prompt into a chat AI and show the output. Point out how the task list is structured and ordered.

**Highlight** that the AI has now done the thinking about sequencing and dependencies - work that developers often do badly because it is cognitively expensive.

**Connect** this to Capabilities versus Token Burn from week one. This workflow is the model-choice judgement in action: the hard part of this job is the thinking - writing the spec, breaking it into ordered, dependency-aware tasks - and that is where a capable model earns its price. Once the plan is signed off, the remaining work is mechanical implementation, and a cheaper model tier can execute each small, well-specified task just as well for a fraction of the tokens.

**Ask** trainees which parts of the spec-to-code workflow they would run on a frontier model and which parts they would switch down to a cheaper model, and why.

### Exercise

**Set the scenario**:

> Build a file deduplication service. Users upload files. You detect duplicates by checksum, prevent storing the same file twice, and track which users have which files. Handle: partial uploads that can resume mid-stream, same content with different names (deduplicate anyway), and deletion (remove file only if no users reference it).

**Task** trainees to write a `specification.md` for this service. They should:

- Write at least three user stories (from the perspective of different users: uploader, storage admin, etc.)
- Keep each story in plain language, no technical terms
- Not mention any technology, framework, or database

**Grant** trainees 10 minutes.

**Gather** the group back and ask one or two volunteers to share their screen and talk through their specification.

**Ask** the group: are there any hidden technical assumptions in these stories? Did any "what" statements sneak in "how" language?

> Common slips: "stored in a database", "sends an API request", "hashed for comparison", "tracks ownership"

**Reinforce** that this is hard to do cleanly at first. The discipline of keeping what and how separate is a skill that improves with practice.

### Test-Driven Development with Generated Code

**Ask** trainees:

> How confident are you in code the AI generated? How would you know if it works?

**Listen** for responses, then ask:

> When you write code yourself, how do you know it works? What steps do you take?

**Accept** answers such as:

> - Run the code and see if it works
> - Debug until it works
> - Ask a teammate to review it
> - Write tests and run them

**Explain** the four-phase workflow:

> When you work with AI to generate code, you still use tests - but differently. You tell the AI what done looks like (tests), and the AI writes code to pass them. You don't write or debug. You verify.

**Introduce** Phase 1: Design & Sign Off.

**Explain** that you ask the AI to propose tests before writing code:

> "Show me the function signatures and test cases before you write code. Organize tests by: specification, edge cases, security, performance. Then wait for my approval."

**Describe** what happens next:

> The AI responds with test structure and signatures. You review. You might ask it to add tests or revise. When it looks right, you say: "Write the code."

**Introduce** Phase 2: Code Generation (AI works alone).

**Explain** the single command you give:

> "Write the code. Run linter. Run pytest. If tests fail, fix the code and rerun. Iterate until all pass."

**Point out** what the AI does:

> It writes code → lints → runs tests → sees failures → fixes code → retests. You only see the final result when all tests are green. No debugging loops. No back-and-forth.

**Introduce** Phase 3: Integration Testing.

**Explain** the next step:

> Now the AI runs the real program, not just unit tests.

> "Generate test data. Run the actual pipeline. If it breaks, fix and retry. Iterate until end-to-end works."

**Describe** the outcome:

> The AI creates test data → loads it → runs your program → verifies results. It iterates until the real system works.

**Introduce** Phase 4: Done.

**Summarise**:

> You have working code. You didn't write or debug it. You defined the contract (tests). AI delivered working code.

### Exercise

**Set the scenario**:

> Build a file deduplication service. Users upload files. You detect duplicates by checksum, prevent storing the same file twice, and track which users have which files. Handle: partial uploads that can resume mid-stream, same content with different names (deduplicate anyway), and deletion (remove file only if no users reference it).

> The constitution requires: no files deleted without an audit log, and all access must be logged.

**Task** trainees to write a Phase 1 prompt for the core deduplication function:

> What would you ask the AI before it writes code? Include:
> - What you want built (the core deduplication logic)
> - Test categories (specification, edge cases, security)
> - Reference the constitution sections about logging
> - Ask for function signatures + test structure only (no code yet)

> Write the full Phase 1 prompt.

**Give** trainees 5-7 minutes.

**Gather** 2-3 volunteers to read their prompts aloud.

**Point out**:

> - Did you ask for function signatures?
> - Did you list test categories clearly?
> - Did you reference the constitution requirements?
> - Is the prompt clear enough the AI can execute it without asking clarifying questions?

**Debrief**:

> "This Phase 1 prompt is your contract. The AI uses it to understand what done means. If the tests pass, the code works. No guessing, no debugging."

### Conclusion

**Summarise** the key ideas from today:

> - Spec-driven development separates intent from implementation
> - The constitution, specification, and plan give the AI focused, layered context
> - Asking the AI to generate tasks rather than code is often more valuable than asking it to generate code directly
> - The discipline of writing down "what" before "how" leads to better conversations with both AI tools and human teammates

**Note** that the `.spec/` folder is just Markdown. It works with any AI tool, any language, and any team. The habit matters more than the tooling.

**Explore** (if you have time) and discuss the generated codebase from your example spec with the trainees.

**Encourage** trainees to try the approach on their next project or challenge, even if they only write the specification.md. Starting with user stories forces a clarity that jumping straight into code does not.

</LockedContent>
