---
title: Rapid Prototyping with AI
objectives:
  [
    'Rapidly prototype a user journey using GitHub Copilot',
    'Annotate prototypes with story links, rules, and branch points',
    'Use rapid prototyping to reveal gaps in backlog and workflow logic'
  ]
module: Technical-Business-Analyst
week: 2
workshop: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

<LearningObjectiveComponent />

## Pre-work

### Setup

If nobody has done so already, copy and paste this command into Slack.

```
/prework Rapid Prototyping with AI
```

### Research

:::info Task

Research online for the following terms:

- What is rapid prototyping?
- Why is it faster to prototype with an AI coding agent than to design a full wireframe first?
- Why are exception paths important in service or product design?

:::

### Experiment

:::info Task

Read the brief below:

> Pritzki Veterinary Clinic (PVC) wants a simple client check-in kiosk for arriving appointments. Clients should be able to look themselves up by phone number and confirm the pet and appointment time, before seeing simple pre-appointment instructions. Clients with no appointment booked for today should be routed to a "speak to reception" screen instead.

Using VS Code and GitHub Copilot, prompt the agent to build a simple, clickable HTML/CSS prototype based on this brief.

You should **not** write any of the code yourself - direct Copilot with prompts, review its output, and ask it to fix anything that's wrong.

Be prepared to explain your choices in the workshop.

:::

### Submission

:::info Submission

Please share your answers in the Slack thread.

:::

## Workshop

<LockedContent password="ownership">

### Introduction

**Ask** trainees why we build prototypes: to let stakeholders see how the product will work without the cost of a full build.

**State** that a useful prototype is a conversation starter, not a final product. It clarifies flow and decisions, not visual polish.

**Ask** trainees what stakeholders might notice in a prototype that they would miss in a backlog spreadsheet.

> Missing screens, confusing branching, unclear messages, unsupported cases, or data gaps.

### Prototypes

**Ask** trainees to share their check-in prototypes and talk through the prompts they used to build them.

**Get** trainees to constructively critique each other's designs.

**Call** out

- Overly-detailed or over-engineered designs
- Missing elements
- Inconsistencies

### Demonstration

**Live code** a simple PVC account homepage screen for logged in users, using GitHub Copilot to build it.

**Ensure** that it keeps the design simple and structured.

- simple brand colours
- clear labels
- minimal text
- notes for rules and next steps

**Warn** trainees that heavy visual polish can distract stakeholders from the more important question: does the journey make sense? Simple brand colours and a clear structure are enough - there's no need to chase a pixel-perfect design.

### Challenge

**Grant** trainees ~10 minutes to extend/improve their login prototypes, ensuring they cover all required behaviour.

### Exception paths

**Ask** trainees what happens if a customer fails to login successfully.

**Explain** that many weak prototypes hide the hardest part of the process by showing only the happy path.

### Rapid prototyping as analysis

**State** that a prototype is also a requirements-checking tool.

**Ask** trainees what kinds of gaps it can reveal.

> Missing decision points, unclear rules, forgotten reporting needs, or unsupported outcomes.

**Show** how a prototype review might expose a missing backlog item such as recording routing reasons or showing next-step messaging after failure.

### Challenge

**Agree** with trainees a minimum set of screens for the overall PVC application:

- Landing page
- Register
- Login
- Forgot password
- Account homepage
- Appointment Booking page

**Challenge** trainees to build out their PVC prototype with Copilot, with as much clarity as possible.

**Grant** trainees 15 minutes.

**Circulate** and coach any group that starts writing code by hand, or lets Copilot over-build the design.

**Gather** the room and ask each group to walk through one branch in under a minute.

### Review checklist

**Introduce** a fast review checklist coaches can reuse:

- Does each screen map to backlog scope?
- Is the branch logic visible?
- Are unsupported cases handled clearly?
- Is the prototype simple enough to invite critique?
- Did the trainee direct Copilot, rather than writing the code themselves?

**Encourage** trainees to treat prototype revisions as a sign of good analysis rather than failure.

### Conclusion

**Ask** trainees to name one gap that a prototype is especially good at revealing.

**Confirm** strong answers around branching, messaging, and hidden assumptions.

</LockedContent>
