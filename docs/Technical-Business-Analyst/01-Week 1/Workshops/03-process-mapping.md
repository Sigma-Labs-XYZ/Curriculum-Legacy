---
title: Process Mapping
objectives:
  [
    'Create an As-Is process map showing actors, systems, hand-offs, and decisions',
    'Identify pain points directly on a workflow diagram',
    'Evaluate which steps are suitable for self-service'
  ]
module: Technical-Business-Analyst
week: 1
workshop: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

<LearningObjectiveComponent />

## Pre work

### Set up

If nobody has done so already, copy and paste this command into Slack.

```
/prework Process Mapping
```

### Research

:::info Task

Research online for the following terms:

- What does [BPMN](https://camunda.com/bpmn/) stand for in a business context?
- What is an As-Is process map?
- What is a swimlane diagram?
- Why do analysts mark pain points directly on a process map instead of in a separate list?

:::

### Experiment

:::info Task

Open Camunda Modeller and create a very small process with 5-6 boxes for a daily activity, such as ordering food or booking travel.

Try to include:

- one decision point
- two actors
- one obvious pain point

Be ready to describe what was easy and what felt messy.

:::

### Submission

:::info Submission

Please share your answers in the Slack thread.

:::

## Workshop

<LockedContent password="ownership">

### Introduction

**Ask** trainees what the current PVC process looks like from memory.

**Gather** quick answers, then point out how fast important details disappear when a process lives only in conversation.

**Explain** that process mapping is useful because it makes work, delay, rework, and hand-offs visible.

**Remind** trainees that the goal is not to draw something pretty; the goal is to expose where the operating model fails.

### Business Process Model & Notation (BPMN)

**Introduce** [BPMN](https://camunda.com/bpmn/) as an approach for representing business processes.

**Demonstrate** the basic operation of Camunda Modeller, showing the key elements and how they can be connected.

**Stress** that, like any set of conventions, trainees should not cling too strictly to them; they're learning a way to communicate that they should adapt in context, rather than a rigid set of rules.

### As-Is process mapping

**Introduce** the core parts of a useful As-Is map:

- actors
- systems or tools
- steps
- decisions
- loops or rework
- pain points

**Demonstrate** a simple swimlane setup in Camunda Modeller with lanes for Customer, CR, Vet, Spreadsheet / Email, and Legacy System.

**Talk** through why those lanes matter in this case.

> The problem is not just what the representative does. It is also where information sits, how hand-offs happen, and where managers lose visibility.

### Demonstration: map the current recovery flow

**Build** a rough flow live, step by step and intentionally miss out bits of the process for trainees to fill in:

1. Customer contacts PVC
2. CR takes initial details down on paper
3. CR calls each site to ask for vet availability
5. CR contacts customer with potential options
6. Outcome is recorded manually (spreadsheet/on paper)
7. Appointment takes place
8. Follow-up is scheduled by reception staff on-site
9. Payment is handled by reception staff on-site
10. CR contacts each site daily for updates on billing/scheduling

**Ask** trainees what is missing after each addition.

**Question** for potential complications:

- What if they don't pay initially?
- What if no appointment is available?
- What if they want to reschedule?

### Pain-point overlay

**Explain** that a process diagram becomes useful when pain is shown where it actually occurs.

**Ask** trainees to add callout notes to these steps:

- duplicate status checks
- spreadsheet version conflict
- missed next action due to manual follow-up tracking
- repeated customer contact attempts
- manager reporting based on reconciliation rather than live visibility

**Ask** trainees why putting pain points beside the step is better than keeping them in a separate bullet list.

> It preserves context and makes root causes easier to discuss.

### Suitability for self-service

**State** that not every broken step should become a feature.

**Introduce** a practical test for self-service suitability:

- high-volume
- repeatable
- rules-driven
- low to medium risk
- understandable for customers

**Ask** trainees to test several process steps using that lens.

> Account summary view: likely yes.
>
> Promise-to-pay capture: likely yes.
>
> Hardship negotiation: likely no for Phase 1.
>
> Legal escalation: no.

**Warn** trainees against the common mistake of equating repetitive work with safe automation.

### Group challenge

**Challenge** trainees in groups of three to produce a mini As-Is process map with at least five pain-point annotations.

**Direct** them to include one note explaining why a particular step should remain representative-led.

**Grant** trainees 15 minutes.

**Circulate** and look for maps that are too tidy or omit manager work.

**Gather** the room and ask one group to explain a pain point tied to follow-up failure and another to explain a pain point tied to visibility.

### Live critique

**Show** two common weak patterns and discuss them openly:

- a clean map with no friction shown
- a map that only follows the customer and ignores internal work

**Encourage** trainees to treat "messy" as a sign of realism at this stage.

### Conclusion

**Ask** trainees to name one process step they now believe belongs in Phase 1 and one that should stay out.

**Confirm** that their reasons should refer to volume, value, and risk rather than personal preference.

**Stress** that a credible ROI model depends on a credible diagnosis of where the workflow is actually broken.

</LockedContent>
