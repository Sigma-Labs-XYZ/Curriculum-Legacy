---
title: 'Governing AI Agents'
objectives:
  - 'Explain what makes a governance clause auditable rather than aspirational'
  - 'Design human-in-the-loop gates specifying triggers, handoff formats, and resumption contracts'
  - 'Evaluate a governance clause against a "prove it" standard and identify what is missing'
  - 'Explain how external API failures must be handled distinctly from external verification failures'
module: Technical-Business-Analyst
week: 4
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from '@theme/LockedContent'

<LearningObjectiveComponent />

## Pre-work

### Research

:::info Task

- What is the difference between a policy and a procedure? Write a one-sentence definition of each.
- Think of a rule from everyday life that sounds clear but breaks down in edge cases -- for example "drive at a safe speed". What does it fail to specify? What would a more implementable version look like? Write two sentences.

:::

## Workshop

<LockedContent password="governing-ai-agents-lexcorp">

### Part 1: The Audit Attack

**Introduce** the "prove it" standard:

> When a compliance auditor reviews a governance document, they do not read it and say "that sounds reasonable". They read each clause and ask: can you prove this happened? If you cannot point to a log entry, a timestamp, a named reviewer, or a decision record that demonstrates the clause was followed, the clause is not governance -- it is aspiration.

**Show** this governance clause on screen:

> _"The vendor screening agent operates under human oversight. HIGH-risk findings are escalated to the compliance team for review. The agent does not approve or decline vendors autonomously."_

**Ask** trainees to "audit attack" this clause: for each sentence, what question would a regulator ask to test whether it is actually true?

**Allow** 3--4 minutes, then gather responses:

> - "operates under human oversight" -- what does this mean in practice? Is there a log of every run reviewed by a human? Or does it mean a human designed the system once and is now assumed to be overseeing it?
> - "escalated to the compliance team" -- how? By email? By ticket? Within what timeframe? To which named person or role?
> - "does not approve or decline vendors autonomously" -- can you show a log of every vendor decision and the human who approved it? Or does the system write "APPROVE" and a human simply reads it afterwards?

**Explain** the principle:

> Every governance clause must be implementable by a developer and verifiable by an auditor. If a developer cannot translate the clause into code or configuration, it is not precise enough. If an auditor cannot find evidence the clause was followed, it is not verifiable.

**Ask**: what is the minimum a developer would need in order to implement "HIGH-risk findings are escalated to the compliance team"?

> Expected: a definition of HIGH-risk (so the system knows when to trigger); a named system or channel for escalation; a clear statement of what the workflow does while waiting (does it halt? does it send a recommendation anyway?); a way to record that escalation happened.

**Instruct** trainees to work in pairs for 15 minutes:

:::info Task

Rewrite the governance clause from Part 1 so that it meets the "prove it" standard. Your rewrite must answer all the questions raised in the audit attack:

- What specific condition triggers human review? (Specify using risk tier and/or finding type)
- What mechanism delivers the escalation? (Name the system)
- What does the workflow do while waiting for human review -- does it halt?
- What actions can the reviewer take, and within what timeframe?
- What log entry is created to record the human decision?

Write 3--5 sentences. You may use the LexCorp context (Melody Harris's governance team, SRA requirements).

:::

**Gather** the rewrites. Place two or three on screen. Score each one against:

- Does it specify the trigger condition precisely?
- Does it name the escalation mechanism?
- Does it state that the workflow halts while waiting?
- Does it require a named human action to resume (not just review)?
- Does it require a log entry with reviewer identity, decision, and timestamp?

**Show** a model answer:

> _"When the risk_tier_calculator tool returns a risk tier of HIGH, or when the external_verifier tool returns an error for any external API call, the workflow halts and creates a review ticket containing: the vendor name, run timestamp, risk tier, full findings list, and raw API response. The workflow does not produce an approval or decline recommendation while the ticket is open. A named compliance reviewer from the governance team must review the ticket and record a disposition -- APPROVE, DECLINE, or REQUEST_MORE_INFORMATION -- within two working days. The reviewer's name, disposition, and timestamp are written to the audit log before the workflow resumes or closes."_

**Ask**: what changed between the vague version and this version? Ask trainees to list as many differences as they can find.

### Part 2: External Failures

**Introduce** the scenario:

> Melody Harris has asked the following question during an SRA compliance review: "If Companies House was down when you processed the Sigma Labs XYZ submission, does that mean the external verification check was not performed?"

**Ask** trainees: how should the governance framework answer this question? What should the agent have done? What should the audit log show?

**Gather** responses. Build towards:

> - An API failure is not the same as a passed check or a failed check. It is a third state: the check was not completed.
> - The governance framework must state explicitly that an API failure triggers the HITL gate.
> - The audit log must record the failure: the API endpoint called, the HTTP response code, the timestamp, and that the check was not completed.
> - The human reviewer decides whether to wait and retry (short outage) or verify manually.

**Explain** the three states that must appear in the governance framework:

> 1. **External verification passed** -- the API returned a 200 response and the registration was found. The registered name, status, and address are in the audit log.
> 2. **External verification finding** -- the API returned a 404 (not found). This is a HIGH-risk finding. The fact that the check ran and returned a definitive negative is in the audit log.
> 3. **External verification not completed** -- the API was unreachable (5xx, timeout, or network error). The check did not run. The HITL gate fires. This is distinct from a failure -- it is an absence of evidence.

**Ask**: why does the distinction between state 2 and state 3 matter to Melody?

> Expected: state 2 gives Melody a finding she can act on -- the registration number does not exist, so the vendor cannot proceed. State 3 gives Melody nothing -- she cannot make a decision based on a check that did not run. She needs the governance framework to ensure the check is completed before a recommendation is issued.

### Conclusion

**Summarise** the key points:

> - A governance clause is only as good as its "prove it" answer: if you cannot demonstrate it was followed with a log entry, it did not happen
> - External API failures are a distinct outcome from external verification findings -- governance must address all three states: passed, finding (404), not completed (API unavailable)
> - The goal of an AI governance framework is not to restrict the agent -- it is to make the agent's decisions trustworthy enough to be used as compliance evidence

**Signpost**: in Phase 4 of the challenge, you will write the LexCorp AI Governance Framework for the vendor screening agent. This workshop has given you the standard your clauses will be held to: not "does this sound reasonable" but "can you prove it happened".

</LockedContent>
