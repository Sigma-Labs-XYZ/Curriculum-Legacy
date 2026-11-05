---
title: 'Agents in Regulated Environments'
objectives:
  - 'Explain why a fixed automation pipeline is insufficient for compliance-sensitive vendor screening'
  - 'Explain what a human-in-the-loop gate is and when it is required in a regulated context'
  - 'Trace and interpret agent reasoning to identify successes, failures, and auditable steps'
  - 'Explain agent reasoning to a non-technical stakeholder in a live meeting, without resorting to jargon'
module: Technical-Business-Analyst
week: 4
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from '@theme/LockedContent'

<LearningObjectiveComponent />

## Pre-work

### Read

:::info

Read the case study and begin to consider the current flow of the process.

We'll discuss this in the session

:::

## Workshop

<LockedContent password="agents-in-regulated-environments">

**Explain** that, like the previous week, this week is completed in pairs -- trainees will design, build, and govern the agent together, and run this week's client meetings (the validation meeting and Melody's governance walkthrough) as a pair.

### Part 1: The Compliance Problem

#### Two Ways to Screen a Vendor

**Describe** the scenario to the group:

> LexCorp Partners, a London law firm, receives vendor applications from suppliers who want to work on their technology projects. Before paying any supplier, they must verify registration, check insurance, confirm bank details, review data handling practices, and check for prior issues. Their procurement policy has 17 rules. A new vendor application has arrived: Sigma Labs XYZ Ltd.

**Ask** trainees: if you were going to automate this screening process with an N8n workflow, what would that workflow look like? How many nodes would it have? What would each node do?

**Allow** 3--4 minutes for trainees to sketch a workflow on a whiteboard or paper. Do not suggest a structure yet.

**Gather** responses. Most will describe a linear sequence: read document 1, check rule, read document 2, check rule, flag result. That is the natural instinct.

**Explain** the problem with that design:

> This pipeline has to read every document every time, in the same order, regardless of what it finds. But in a real compliance check, what you find shapes what you need to check next. If document 1 claims a registration number that looks suspicious, you want to check the Companies House API before you spend time reading four more documents. A pipeline cannot do that -- it has to follow its script.

#### The Agent Alternative

**Introduce** the difference:

> A pipeline follows a fixed sequence. An agent uses a model to reason about which action to take next, based on what it knows so far. The sequence is not decided when you build it -- it is decided at runtime.

**Show** this reasoning trace from a vendor screening agent (display on screen):

> _Agent reasoning trace -- Sigma Labs XYZ Ltd application:_
>
> _Step 1: I will start by checking engagement history. This tells me whether this vendor has applied before and what happened._
>
> _[calls engagement\_history\_lookup with query: "Sigma Labs XYZ Ltd registration 13174442"]_
>
> _Result: One prior record found. Previous registration 13174424. Name at time of application: "Sigma Labs Ltd". Application declined October 2022: expired insurance._
>
> _Step 2: There is a name discrepancy (Sigma Labs Ltd vs Sigma Labs XYZ Ltd) and a potential registration discrepancy (13174424 vs 13174442 on this application). I should verify the current registration with Companies House before proceeding._
>
> _[calls external\_verifier with registration\_number: "13174442"]_
>
> _Result: 404 Not Found. No company registered at 13174442._

**Ask**: what did the agent do that the pipeline could not? Why does the result of Step 1 change what happens in Step 2?

**Gather** responses. The key point: the agent used an intermediate result -- the name and registration discrepancy -- to decide what to check next. A pipeline would have moved on to document 2 regardless.

### Part 2: Why Regulated Environments Are Different

**Explain** that in a compliance context, the agent's reasoning is as important as its output:

> A procurement decision at a regulated law firm is not just "approved" or "declined". It is a decision that may be audited by the SRA, challenged by the vendor, or used as evidence in a regulatory review. The system must be able to show not just what it decided, but how: which documents it read, which rules it applied, which external checks it ran, and what each check found.

**Ask**: if the SRA asked Melody Harris "how did you verify this vendor's registration?", what would Melody need to be able to show?

**Gather** responses. Build towards:

> - Which source was checked (Companies House API)
> - When the check was run (timestamp)
> - What registration number was submitted (from the vendor questionnaire)
> - What the API returned
> - Which rule was applied to that result

**Explain** that this creates a requirement a pipeline makes difficult and an agent makes natural: the agent's reasoning trace is part of the compliance evidence, if the output format is specified correctly.

#### The HITL Requirement

**Introduce** human-in-the-loop (HITL) as a compliance concept, not just a safety feature:

> For many SRA-regulated processes, a human must review and approve AI-assisted decisions before they take effect. This is not because the agent is unreliable -- it is because the SRA holds a person accountable for the decision, not the system. The agent can prepare the recommendation; the human signs it off.

**Ask**: at what point in the vendor screening process should a human be required? What should trigger the HITL gate?

**Allow** responses. Lead towards:

> - Any HIGH-risk finding automatically triggers human review
> - External API failures (Companies House unreachable) should also trigger human review -- the agent cannot decide it is safe to proceed without the check
> - Conflicts between documents (such as three different name variants) require human judgement

### Part 3: Audit Trail Design

**Instruct** trainees to work in pairs for 10 minutes on this task:

:::info Task

You are designing the audit log for the LexCorp vendor screening agent. For each agent run, the audit log must capture enough information that a compliance auditor can reconstruct exactly what happened.

Design a table with column headings for the audit log. You must include at least eight columns. Be specific -- "result" is not specific enough; "companies_house_result" is.

:::

**Gather** the designs. Place them side-by-side if possible. Look for common gaps:

- Missing: timestamp
- Missing: which human reviewer approved (if applicable)
- Missing: which version of the policy document was in the knowledge base
- Missing: the raw API response (not just the interpreted finding)

**Explain** that completeness is not enough -- the log must be tamper-evident and immutable. You write to it; you do not edit it.

### Client Meetings: Explaining Agent Reasoning Live

**Recap** the WANA meeting structure (Who, Agenda, Notes, Actions) -- trainees will use it again this week, including for a validation meeting in Phase 1 and a governance walkthrough with Melody in Phase 5.

**Explain** that explaining an agent's reasoning live is harder than explaining a fixed workflow, because the answer to "why did it do that?" is different for every case, not a fixed script. The **Notes** section becomes crucial: you must capture what the agent found at each step so Melody can later audit the reasoning.

**Demonstrate** translating the Sigma Labs reasoning trace shown earlier into something a non-technical stakeholder could follow out loud, while taking notes:

> "The agent checked our own records first and found this vendor had applied before under a slightly different name and registration number. Rather than assume that was a typo, it went straight to Companies House to check the number it had just been given -- and that number doesn't exist. That's why it stopped and flagged the case, instead of carrying on through the rest of the checklist."
>
> **Notes: (1) Prior application found under "Sigma Labs Ltd" vs current "Sigma Labs XYZ Ltd"; (2) Companies House lookup found registration 13174442 - does not exist; (3) Case flagged for review.)**

**Ask** trainees to practise the same translation in pairs, using a different step from the reasoning trace. After they explain the step, ask them to write out what should go in the **Notes** section. Then swap and critique each other's explanation for jargon and the completeness of the notes.

### Conclusion

**Summarise** the key points:

> - A compliance agent is not just a faster pipeline -- it reasons about what to check next based on what it has already found
> - In a regulated environment, the reasoning trace is part of the compliance evidence, not a debugging detail
> - HITL gates are required by regulation, not just by caution -- they represent the accountability boundary between the system and the responsible human
> - Audit logs must be specific, timestamped, and immutable

**Signpost**: this week, you will design and build a vendor screening agent for LexCorp. The challenge phases will take you from understanding the existing workflow, through designing and building the agent, to writing the governance framework and presenting the system to stakeholders.

</LockedContent>
