---
title: User Stories & Backlogs
objectives:
  [
    'Explain the features and benefits of Agile Development',
    'Write precise user stories with acceptance criteria',
    'Create acceptance criteria that make stories testable and unambiguous',
    'Prioritise backlog items using scope, dependency, and ROI evidence',
    'Organise scope into a sequence that a delivery team can plan'
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

## Pre work

### Set up

If nobody has done so already, copy and paste this command into Slack.

```
/prework Technical User Stories and Acceptance Criteria
```

### Research

:::info Task

Research the terms "waterfall" and "agile" in a development context.

What are the benefits & drawbacks of each approach?

:::

### Research

:::info Task

Research online for the following terms:

- What is a user story?
- What makes acceptance criteria testable?
- What is the difference between a requirement, a task, and a user story?

:::

### Experiment

:::info Task

Draft at least two user stories for the PVC project and add three acceptance criteria for each.

:::

### Submission

:::info Submission

Please share your answers in the Slack thread.

:::

## Workshop

<LockedContent password="ownership">

### Introduction

**Remind** trainees that a Phase 1 recommendation must be buildable; broad ideas don't get built.

**Introduce** task decomposition: breaking larger work into small, measurable pieces so both developers and stakeholders understand what's being delivered.

### Agile development

**Ask** trainees to explain the difference between waterfall and agile development.

**Share** the [Agile Manifesto](https://agilemanifesto.org/) and highlight the benefits of efficient, adaptable feedback loops.

**Explain** that various more complex frameworks have been built on top of Agile principles.

### Scrum for delivery thinking

**Introduce** Scrum as a framework that encourages incremental delivery through a prioritised backlog.

**Explain** that even if the organisation uses a hybrid model, Scrum thinking helps analysts ask better questions:

- What is the smallest valuable increment?
- Which stories are ready for refinement?
- Which capabilities depend on earlier ones?

**Warn** trainees not to treat Scrum as jargon to drop into presentations without changing their thinking.

### Kanban for flow thinking

**Introduce** Kanban as a way to visualise work moving through stages and to spot bottlenecks.

**Demonstrate** a simple board structure:

```text
To Do | In Progress | Review
```

**Explain** that each ticket will move through the system in a predictable way, allowing careful tracking of work.

**Discuss** how overly large stories or hidden dependencies quickly create blockage.

**Introduce** Jira as a way to run a Scrum/Kanban process.

**Explain** that each trainee works on their own board in their own free Jira workspace, so nobody needs admin rights from the coaches.

**Walk** through signing up for a Jira workspace, creating a board, inviting a coach to the workspace, and making some simple epics for the PVC case.

### User Stories

**Ask** trainees to define the difference between Jobs-to-be-Done and user stories: user stories are a later stage that focus on specific implementations, rather than overall capabilities.

**Introduce** a practical story template:

> As a [user], I want [need], so that [business outcome].

**Demonstrate** a good example:

> As a customer, I want to view vet availability so that I can schedule an appointment without waiting for a representative.

**Contrast** it with a weak example:

> Build account page.

**Highlight** that strong stories sit between broad requirements and implementation tasks.

### Technical stories in this course

**Explain** that the stories here need to be slightly more precise than generic agile examples because they bridge business analysis and delivery readiness.

**Show** a recommended set of fields:

- Title
- Story
- Business value
- Acceptance criteria
- Dependencies
- Priority
- Notes or assumptions

**State** that this structure works well in Jira and also forces better thinking before Jira.

### Acceptance criteria

**Ask** trainees what acceptance criteria are for.

> To define what must be true for the story to be considered working.

**Demonstrate** the difference between poor and better criteria.

<Tabs>
  <TabItem label="Weak" value="weak">

```text
- Build verification page
- Connect to API
- Add button
```

  </TabItem>
  <TabItem label="Better" value="better">

```text
- Account details are not shown before successful verification.
- Failed verification displays a clear support path.
- Verification outcome is recorded for operational visibility.
```

  </TabItem>
</Tabs>

**Highlight** that tasks belong in implementation planning; acceptance criteria belong in quality definition.

### Group challenge

**Challenge** trainees in pairs to write three stories for one PVC epic.

**Direct** them to include at least three acceptance criteria per story.

**Grant** trainees 15 minutes.

**Circulate** and help anyone whose criteria are still implementation tasks.

**Gather** the trainees and review one story from each pair.

**Ask** the group how they would test each story.

### Conclusion

**Ask** trainees to explain how Scrum and Kanban help an analyst, not just a delivery manager.

**Confirm** that the strongest answers refer to incremental thinking, dependency visibility, and flow awareness.

**Stress** that the next workshop will convert this scoped structure into actual Jira stories and acceptance criteria.

</LockedContent>
