---
title: "Using AI on the Course"
objectives: 
    - "Identify a wide range of tasks on the course that AI can help with"
    - "Distinguish between acceptable and unacceptable uses of AI during Software Fundamentals"
    - "Use AI to support learning and day-to-day work"
module: Fundamentals
week: 1
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent';
import LockedContent from "@theme/LockedContent";

<LearningObjectiveComponent />

## Workshop

<LockedContent password="ownership">

(Coach Note): this is a short, informal 30-minute session. Trainees have already been given the AI rules for Software Fundamentals; this session makes those rules concrete and then pushes them to use AI **more widely within them**. The goal is for trainees to leave feeling confident and encouraged, not warned off.

This workshop should be delivered towards the end of the week, remotely. Holding it here gives trainees a few days of hands-on coding first, ensuring they build initial confidence in their core problem-solving skills before introducing AI assistance, and giving them real moments of friction to reflect on. Running it remotely mirrors how they will actually use AI day-to-day at their desks.

### Think (2 mins)

:::info Task

Look back over your first few days on the course. Jot down:

- How you've used AI in the past
- Every time you used AI for something on the course
- At least three times you *could* have used AI to help you learn or get feedback, but didn't

Don't share these yet.

:::

### Where are we now? (4 mins)

**Draw** a line (on a whiteboard, or as an emoji scale in a Slack thread) from "never used AI" to "use it constantly".

**Ask** trainees to place themselves on it.

**Ask** a few people at each end what they've used it for, or what has held them back.

**Probe** their past experiences with AI. Many trainees carry baggage from university or school where AI was strictly banned or treated as academic misconduct.

**Note** down common blockers.

> - "It feels like cheating"
> - "I'm worried about accidentally plagiarising"
> - "At uni/school we were told never to touch it"
> - "I'm worried I won't learn properly or will become reliant on it"
> - "Real engineers should write everything from scratch"
> - "I didn't know what I was allowed to use it for"
> - "I forget it's an option"

### The tools site (4 mins)

**Introduce** the [tools site](https://tools.sigmalabs.co.uk/). Acknowledge that the full list of tools can look intimidating at first glance, but in Week 1 we only focus on two.

**Demonstrate** how to use **Learning Mode** and the **Code reviewer** specifically.

**Give** trainees 2 minutes to navigate to the site, bookmark it, open both tools, and ask any immediate questions.

### The rules (5 mins)

**State** clearly: we **want** trainees to use AI. Our clients expect people who are comfortable working with it, and that only comes from daily practice. The rules are there to protect learning, not to discourage it.

**Recap** the rules for Software Fundamentals:

> **Good uses**
> - Rephrasing complex concepts
> - Suggesting possible options
> - Getting feedback
> - Generating dummy data
>
> **Bad uses**
> - Generating code for you
> - Completing curriculum tasks
> - Writing emails/assessments
> - Identifying issues/bugs in your code

**Explain** the reasoning in one line: right now trainees are building the skills you'll need to judge whether AI output is any good. Using AI to *do* the work (which we treat as plagiarism) skips that step; using it to *help think* speeds it up.

**Run** a quickfire round. Read each scenario out and get trainees to vote ✅ (good use) or ❌ (bad use). Briefly discuss any that split the room.

| Scenario | Answer |
| -------- | ------ |
| Asking Learning Mode to explain list comprehensions using a cooking analogy | ✅ Rephrasing a concept |
| Pasting in your failing function and asking what's wrong with it | ❌ Identifying bugs |
| Asking what a `KeyError` means in general, without sharing your code | ✅ Rephrasing a concept |
| Asking for three different ways you could represent a deck of cards, then picking one and coding it yourself | ✅ Suggesting options |
| Asking AI to write `calculate_score()` "just to compare with mine" | ❌ Generating code |
| Generating 20 realistic Blackjack hands to test your game with | ✅ Dummy data |
| Asking AI to write your weekly update message to a coach | ❌ Writing emails |
| Writing that message yourself, then asking AI for feedback on tone and clarity | ✅ Getting feedback |
| Running your finished, working code through the Code Reviewer for feedback on readability and naming | ✅ Getting feedback |
| Using AI during the Friday quiz | ❌ Assessments |

**Highlight** the pattern: if **you** did the thinking and the work, and AI helped you understand it or improve it, you're fine.

**Offer** a simple check: *"Would I be happy showing this conversation to a coach?"* If yes, go for it.

**Revisit** the blockers from the start. "It feels like cheating" and "I'm worried about plagiarising" should now have clear answers.

**Reassure** trainees that if they're unsure about something, they should just ask a coach. Nobody will be in trouble for asking.

### Possible uses (10 mins)

**Split** trainees into pairs.

**Challenge** each pair to list as many **good** uses for AI on the course as they can in 5 minutes, using their pre-work notes. Encourage them to think well beyond code.

**Gather** ideas onto a shared Excalidraw board.

**Fill in** any gaps so that the following are covered:

> **Learning** (Rephrasing concepts, Learning Mode)
> - Explaining a concept a different way, at a different level, or with an analogy
> - Quizzing you on a topic before an assessment
> - Turning workshop notes into flashcards or a summary
> - Explaining confusing documentation, or what a type of error means
> - Explaining what a git or terminal command does before you run it
>
> **Thinking** (Suggesting options)
> - Brainstorming different ways to approach a problem, before you choose and code one yourself
> - Suggesting the *kinds* of situations a function should handle, so you can write your own tests
> - Breaking a big challenge or your week into smaller steps
>
> **Feedback** (Getting feedback)
> - Code Reviewer on finished, working code: readability, naming, structure
> - Feedback on a Slack message or email you've written
> - Feedback on your presentation plan or slides
> - Feedback on your interview answers
> - Practising stakeholder conversations with the Stakeholder Communication tool (used later in SF)
>
> **Data** (Generating dummy data)
> - Realistic test data: player names, card hands, CSVs, JSON

**Demonstrate** one or two of the less obvious ones live (2 mins max). Good options:

- Learning Mode explaining a concept from this week in three different ways
- Presenting two ways you're thinking of modeling a Blackjack hand (e.g. list of tuples vs list of dicts) and asking the model to critique the trade-offs of each

**Point** out that most of these have nothing to do with writing code, and that's where most of the untapped value is right now.

### Commit (5 mins)

**Challenge** each trainee to post a short message in their career channel saying what two new uses of AI they'll experiment with over the next week.

**Tell** them we'll come back to this at the end of the next week: who tried what, and what worked?

**Stress** that being savvy with AI is essential preparation for joining the industry. Many of our clients will expect engineers to use AI best practices and cutting-edge tools to save time effectively, and we want to help trainees build that capability from day one. The habits built now (checking output, asking good questions, using it daily) are what make that possible.

**Close** by reiterating that AI use is expected and encouraged, as long as it's helping you learn rather than doing the work for you.

(Coach Note): at the end of the week (e.g. in retro), ask for one "AI win" per person. Repeat this regularly through SF to keep the habit going.

</LockedContent>