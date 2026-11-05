---
title: 'From Simple Workflows to AI Agents'
objectives:
  - 'Build a workflow with LLM classification and explain why classification alone is not enough to answer enquiries'
  - 'Describe the role of tools, memory, and planning in an agentic system'
  - 'Configure an N8n AI Agent node with at least two connected tools for handling property enquiries'
  - 'Produce a basic reasoning trace from an agent run and explain what it shows'
module: Technical-Business-Analyst
week: 3
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent"

<LearningObjectiveComponent />

## Pre-work

### Setup

If nobody has done so already, copy and paste this command into Slack.

```
/prework Simple Workflows to AI Agents
```

Create two Google Sheets in your Google Drive before the session. You will connect these to N8n as the data source for the agent's tools.

**Sheet 1 - Properties**

| Property ID | Available | Pets Allowed | Alternative Property              |
| :---------- | :-------- | :----------- | :-------------------------------- |
| A           | FALSE     | FALSE        | Property D under £1,450 per month |
| B           | TRUE      | TRUE         |                                   |
| C           | TRUE      | FALSE        |                                   |

**Sheet 2 - Viewing Slots**

| Property ID | Slot            |
| :---------- | :-------------- |
| C           | Monday 10:00    |
| C           | Monday 14:00    |
| C           | Wednesday 18:00 |
| A           | Tuesday 11:00   |
| B           | Thursday 15:00  |

Connect your Google account to N8n via **Credentials** before the session starts. You will need a Google Sheets credential with read access.

### Research

:::info Task

A real estate agent receives these emails every day:

> 1. "Hi, is Property A still available?"
> 2. "Can I book a viewing for Property C on Monday at 2pm?"
> 3. "Are pets allowed at Property B?"
> 4. "Is Property A available, and if not can you suggest something similar under £1,500 per month?"

- Write down a simple rule for each email that would sort it into a category (Availability, Viewing, or Policy). Note any emails your rules struggle with.
- What is the difference between *classifying* an email and *answering* it? Write one sentence.
- What is an AI agent? Write one sentence.

:::

:::info Submission

Post your rules and your two one-sentence answers in the Slack thread before the session.

:::

## Workshop

<LockedContent password="building-ai-agents-n8n">

### Part 1: Why Keywords and Classification Are Not Enough

**Explain** the scenario: the real estate agent receives 50+ enquiry emails a day and answers them all by hand. We want to automate this.

**Ask** trainees to share the keyword rules they wrote in pre-work. Collect a few on the whiteboard.

**Ask**: which email breaks your rules?

> Email 4. It asks two things at once, and the answer depends on looking up real data. A keyword rule can label it, but it cannot answer it.

**Explain** that even if we replace keywords with an LLM that classifies each email perfectly, we hit the same wall:

> Classification tells you *what the email is about*. It does not tell you *the answer*. To answer "Is Property A available?", something has to actually look up Property A.

**Live code** a quick demonstration in N8n to make this concrete:

1. Manual trigger with an `emailBody` text field
2. An LLM node with this prompt:

> _Read the following email from a prospective tenant. Classify it into exactly one of these categories: AVAILABILITY, VIEWING, POLICY, COMPLEX. Return only the category name._
>
> _Email: \{\{ $json.emailBody \}\}_

3. Run it against emails 1 to 4 and show the classification output for each.

**Ask**: the LLM classified every email correctly. Can it tell the customer whether Property A is available?

> No. It has no access to the property data. Classification is not enough - we need the workflow to *do* something with the classification.

**Wait** for questions before moving on.

---

### Part 2: What Makes Something an Agent

**Introduce** the three building blocks of an agent:

> - **Tools** - functions the agent can call to look things up or take action (for example, read a Google Sheet).
> - **Memory** - what the agent can see while it works: the original email plus the results of any tools it has already called.
> - **Planning** - the agent decides for itself which tools to call and in what order, based on what the email is asking. There is no fixed path.

**Ask**: for the email "Are pets allowed at Property B?", which tools should the agent call?

> Only the property lookup. There is no reason to check viewing slots - the agent plans its steps based on the question.

**Highlight** the key difference from a normal workflow: in a workflow *you* decide the sequence when you build it. With an agent, the *LLM* decides the sequence at runtime.

---

### Part 3: Build the Agent

**Instruct** trainees to create a new N8n workflow, [named following the convention](../06-aside-managing-n8n-resources.md#naming-conventions), with:

1. A Manual trigger
2. An AI Agent node
3. Two Google Sheets tools connected to the agent (configuration below)

**Give** trainees this system prompt for the AI Agent node:

> _You are an assistant for a busy real estate agent. Read the incoming email. Use the property lookup tool to check availability or pet policy. Use the viewing slot checker when the email asks about a viewing. Then write a draft reply to the customer. State which facts you confirmed and whether a human should review the reply before sending._

**Walk through** the property lookup tool:

1. Add a Google Sheets node, operation **Get Many Rows**
2. Select your Google credential and the `Properties` sheet
3. Add a filter: column `Property ID` equals `{{ $fromAI('propertyId', 'The property ID to look up, e.g. A, B or C') }}`
4. Tool description: "Check whether a property is available, whether pets are allowed, and any alternative property recommendation."

**Walk through** the viewing slot checker tool:

1. Add a second Google Sheets node, operation **Get Many Rows**
2. Select your Google credential and the `Viewing Slots` sheet
3. Add a filter: column `Property ID` equals `{{ $fromAI('propertyId', 'The property ID to look up viewing slots for') }}`
4. Tool description: "Get viewing times for a property when a customer asks to book or change a viewing."

**Explain** that `$fromAI` lets the agent fill in the filter value itself at runtime - this is what turns a normal node into a tool the agent can call.

**Grant** trainees 20 minutes to finish the configuration.

**Circulate** and watch for:

- Empty tool descriptions - the agent uses the description to decide when to call a tool
- Tools connected but no model selected on the AI Agent node

---

### Part 4: Run the Agent and Read the Trace

**Instruct** trainees to run the agent against at least three of the four emails and record, for each run: which tools were called, in what order, and what the draft reply said.

**Provide** the expected outcomes for coach reference:

| Email                                   | Expected outcome                                                        |
| :-------------------------------------- | :---------------------------------------------------------------------- |
| 1 - Is Property A available?            | Property lookup only; confirms unavailable, suggests alternative        |
| 2 - Viewing for Property C Monday 2pm?  | Viewing slot lookup only; confirms Monday 14:00 is free                 |
| 3 - Pets at Property B?                 | Property lookup only; confirms pets allowed                             |
| 4 - Property A or similar under £1,500? | Property lookup; recommends Property D, flags for human review          |

**Ask** each trainee to open the execution log for Email 4 and find the reasoning trace - the step-by-step record of what the agent decided and why.

**Ask**:

> - What did the agent do first?
> - Did it use the result of the lookup to shape its reply?
> - Did it call any tools it did not need?

**Explain** why the trace matters:

> If this agent answers 500 emails overnight and starts giving out wrong information, the trace is how you find out what went wrong. Without it, you cannot explain the agent's behaviour to anyone - including the stakeholder who approved it.

### Conclusion

**Reinforce** the key takeaways:

> 1. Classification tells you what an email is about - it cannot answer it. Answering needs tools.
> 2. An agent combines tools, memory, and planning to decide its own steps at runtime.
> 3. The reasoning trace is your evidence of what the agent did - always check it.

**Signpost** the next workshop: what happens when agents fail, and how to design human review and error handling.

</LockedContent>
