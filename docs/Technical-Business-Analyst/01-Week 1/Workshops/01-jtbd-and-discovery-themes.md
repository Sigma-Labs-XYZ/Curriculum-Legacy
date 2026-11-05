---
title: JTBD and Discovery Themes
objectives:
  [
    'Group stakeholder observations into meaningful discovery themes with clear business impact',
    'Write Jobs-to-be-Done statements from raw stakeholder evidence',
    'Distinguish between a JTBD statement, a feature request, and a user story'
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

No pre-work as this is an afternoon workshop

## Workshop

<LockedContent password="ownership">

### Introduction

**State** that discovery evidence usually arrives as complaints, anecdotes, and half-formed requests rather than neat requirements.

**Direct** trainees to the [stakeholder comments](https://sigma-resources-public.s3.eu-west-2.amazonaws.com/tba-datasets/pvc/current_system_comments.tsv) file.

**Grant** them five minutes to explore the file and extract key themes.

**Ask** trainees to share one stakeholder comment from the case that sounded important but still needed interpretation.

**State** that the goal of this workshop is to translate messy comments into structured needs without accidentally jumping to solutions.

### Discovery themes

**Introduce** the idea of theme clustering.

**Explain** that repeated comments often point to a deeper issue than the words alone suggest.

**Demonstrate** a simple clustering approach in using three colours:

- pain points
- needs
- risks

**Show** example raw observations on sticky notes:

- "We keep checking whether someone else already contacted them."
- "I can't defend a transformation case on good intentions."
- "If the portal fails, representatives will end up cleaning it up."
- "Customers should not need to call just to understand what they owe."

**Ask** trainees what themes these might belong to.

> Duplicate work, low visibility, financial credibility, change resistance, customer friction.

**Highlight** that themes are not the final output; they are the bridge between raw evidence and clearer analysis.

### JTBD explained

**Ask** trainees what Jobs-to-be-Done is trying to uncover.

> The underlying job or outcome the person is trying to achieve.

**Explain** that JTBD is about the need behind the request, not the requested feature itself.

**Compare** three different statements live:

> Feature request: "I need a dashboard."
>
> User story: "As a team leader, I want to see customer outcomes so that I can manage workload."
>
> JTBD: "When I review case performance, I want reliable visibility of self-serve and representative-routed cases so that I can understand workload and intervene quickly."

**Highlight** that JTBD sits earlier in the thinking process than a user story.

### Demonstration: converting notes into JTBD

**Demonstrate** the conversion of stakeholder evidence into JTBD statements.

<Tabs>
  <TabItem label="Raw note" value="raw-note">

```text
Mitzi: My team spends hours checking schedules and calling round vets to see who is free when & where.
```

  </TabItem>
  <TabItem label="Theme" value="theme">

```text
Duplicated work and poor status visibility
```

  </TabItem>
  <TabItem label="JTBD" value="jtbd">

```text
When a customer wants to book an appointment, I want immediate, up-to-date visibility of vet and site availability so that I do not repeat work or delay the next step.
```

  </TabItem>
</Tabs>

**Demonstrate** a second example from Delphine's perspective.

> When I review customer feedback, I want to be able to tie comments to a particular area of the business.

**Warn** trainees that if the sentence names a particular screen or tool, it is probably drifting toward solution mode.

### Group exercise

**Challenge** trainees in pairs to turn four stakeholder observations into JTBD statements.

**Grant** trainees 10 minutes and encourage them to use the "When..., I want to..., so that..." structure.

**Circulate** and coach where trainees write things like, "I want a portal" or "I want Jira stories."

**Gather** the room and review examples aloud.

**Confirm** good answers by asking, "Would this job still exist if the interface looked completely different?"

### Prioritising unmet jobs

**State** that not every job has equal importance for Phase 1.

**Introduce** a lightweight prioritisation lens:

- frequency of evidence
- business impact
- relevance to the portal

**Ask** trainees to score example JTBDs as High, Medium, or Low.

**Highlight** that strong priority JTBDs usually shape both workflow design and backlog content later.

### Mini challenge

**Challenge** trainees to create a top-3 JTBD shortlist for PVC and justify each choice in one sentence.

**Grant** them ~10 minutes to work on this.

**Gather** responses and ask the room whether each shortlisted job feels tied to measurable business value.

**Note** where a trainee has chosen something interesting but too broad, then help them narrow it.

### Conclusion

**Ask** trainees to explain the difference between these three things without notes: a pain point, a JTBD statement, and a user story.

**Confirm** that this distinction will matter heavily in Week 2 when they begin backlog work.

**Note** that better requirements often come from better discovery language.

</LockedContent>
