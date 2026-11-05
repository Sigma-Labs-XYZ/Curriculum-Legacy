---
title: 'Case Study & Defining Good Automation'
objectives:
  - 'Describe the role of a Technical Business Analyst in an AI and automation engagement'
  - 'Analyse a fictional organisational case study to identify stakeholders, roles, and tensions'
  - 'Distinguish between processes that are good candidates for automation and those that are not'
  - 'Apply a framework to separate genuine pain points from organisational noise'
  - 'Articulate why "automatable" and "worth automating" are different questions'
  - 'Describe the basic structure of an effective stakeholder meeting: purpose, agenda, discussion, and agreed actions'
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
/prework Intro Case Study and Defining Good Automation
```

### Read

- Read the [LexCorp Partners Case Study](../01-case-study.md) in full before attending.
- Skim the [LexCorp Employee Workbook](../02-handbook.md) -- you do not need to memorise it, but come familiar with what is in it.

### Research

:::info Task

Think of a manual process you have personally experienced -- at work, at university, or in daily life -- that felt like it should have been automated. What made it feel that way? What would have needed to be true for automation to actually work?

:::

## Workshop

<LockedContent password="lexcorp-intro-session">

**Explain** that this week is completed in pairs: trainees will work through the case study, build the automations, and run every client meeting together with their partner. Assign or confirm pairs now if this hasn't already been done.

### Setting the Scene

**Ask** trainees to describe LexCorp Partners in a single sentence. Take three or four answers without comment.

**Ask** which stakeholder they think will be the hardest to work with, and why. Again, take answers without leading.

> The goal here is not to get correct answers -- it is to find out what learners noticed when they read the case study. Their initial instincts about Melody and Kelvin will shape how they approach the rest of the week.

**Explain** that LexCorp is a deliberately difficult client: risk-averse, operationally stuck, and carrying a political shadow (the August Incident) that nobody will name directly. The TBA's job is not just to find automation opportunities -- it is to navigate the firm without breaking its trust.

**Discuss** each of the stakeholders, one by one

> - **Melody:** Protect revenue, defend reputation, demonstrate ROI within 12 months, ensure governance compliance and rigorous audit controls
> - **Kelvin:** Relieve his team's daily drudgery, earn trust through accuracy

**Task** the trainees with considers the Why of why the stakeholders feel the way they do. What are their underlying concerns? What are they trying to achieve?

> - **Melody**'s goals are driven by the need to justify the investment to the board, ensure governance compliance and security posture integrity, and that she personally gets paid more when the company does well. She is likely to be most concerned with high-visibility wins that can be easily measured and that meet strict compliance standards.
> - **Kelvin**'s goals are driven by the desire to make his team's lives better, and to prove that he can deliver value to the business. He gets a promotion when his team does well, so he is likely to be most concerned with quick wins that build trust and momentum.

**Point out** that these two goals are not always aligned. Part of the TBA's role is managing that tension.

### What Makes a Good Automation Candidate?

**Ask** trainees to share their examples of manual processes that felt like they should have been automated. Take answers and build a list on a shared screen or whiteboard.

**Ask** trainees: what do all of these tasks have in common

> - Repetitive
> - Rule-based
> - High volume
> - Clear inputs and outputs
> - Doesn't require judgement

**Explain** that those criteria are a good starting point -- but they are not enough on their own. A process can meet every item on that list and still be the wrong thing to automate.

**Introduce** the complicating factors:

> - **Data sensitivity** -- who can see this data, and what happens if it leaks?
> - **Political risk** -- does automating this process threaten someone's role, status, or sense of control?
> - **Failure consequences** -- what happens when the automation makes a mistake? Is the mistake recoverable?
> - **Workforce attachment** -- does the team have a deep emotional or professional connection to doing this process manually?
> - **Volume and frequency** -- is the pain actually high enough to justify the investment?
> - **Fear** -- are people scared that automation will take over their jobs, and is this process a symbol of that fear?

**Explain** the core distinction: _automatable_ and _worth automating_ are different questions. A TBA earns their value by knowing the difference.

### The Signal or Noise Exercise

**Instruct** trainees to open the Employee Workbook and work in pairs. Give them a blank Signal/Noise table with five columns:

> - Section: the section number in the workbook (e.g. 3.1, 4, 6.2)
> - Process name: a brief description of the process (e.g. "Contract Clause Extraction")
> - Why it might be a good idea: notes on why this process could be a good candidate for automation
> - Why it might be a bad idea: notes on why this process might not be a good candidate for automation
> - Your call: a final judgement of Good or Bad

**Grant** pairs the rest of the workshop to work through the entire workbook. They should make a call on every section -- even the ones that feel obviously irrelevant.

**Wait** -- do not circulate with answers. Let pairs make their own judgements.

**Gather** the group back and go around the room. Highlight a few examples of Good and Bad areas to automate, and ask pairs to explain their reasoning.

**Explain** that any disagreements are not errors -- they are the actual analytical work. A TBA who can explain _why_ they drew the line where they did, and defend it to a sceptical stakeholder, is doing the job correctly.

### Client Meetings: A First Look

**Explain** that from this point on, stakeholder communication is not just written -- this week, trainees will run real, live meetings with Melody and Kelvin (played by their coach), starting with a validation meeting in tomorrow's session.

**Introduce** the WANA framework for structuring any client meeting:

> - **W**ho -- define the participants upfront so the stakeholder knows who is involved
> - **A**genda -- share what you'll cover and roughly how long it will take, so the stakeholder isn't guessing and they can prepare if necessary
> - **N**otes -- take visible notes during the meeting so everyone can see what you're recording, and confirm them before closing
> - **A**ctions -- end with a clear statement of what was agreed, who owns each next step, and when it will be done

**Explain** why WANA matters:

> Stakeholders engage better when they know who's in the room, what to expect, and that you're paying attention. Visible note-taking shows you're listening and gives everyone a chance to correct misunderstandings before they become problems. Clear actions prevent the "I thought we agreed to X" problem that kills projects after the meeting ends.

**Explain** that WANA is deliberately lightweight -- it's a checklist, not a script. Trainees will get to practise it properly tomorrow, before their first validation meeting with Kelvin.

**Signpost** that meetings run this week will be assessed as seriously as written outputs: a stakeholder who leaves a meeting confused or unheard is exactly the failure mode this course is trying to train out of trainees.

### Pushback

**Highlight** that stakeholders will always push for what they want, but it's the job of analyst to constraint project scope to realistic goals and to balance competing stakeholder needs.

**Stress** to trainees that saying 'yes' to every stakeholder request will lead to missed deadlines and project failure. They are expected to say 'no' when appropriate.

**Mention** that saying 'no' to a stakeholder should always come with detailed and evidenced reasoning behind it.

### Conclusion

**Reinforce** the two key takeaways from today:

> 1. Stakeholders have competing goals. A TBA must understand all of them before proposing anything.
> 2. The question is not "can we automate this?" -- it is "should we, and can we defend that decision to three different stakeholders with three different concerns?"

**Signpost** that in the next workshop, learners will explore what AI is actually capable of -- so that when they return to this list, they can match the right tool to each opportunity.

### Next Steps

**Reinforce** that the trainees should be spending ~20% of their time this week on Phases 1,2 and 3, with most of their time spent on Phase 4 - actually building automations.

</LockedContent>
