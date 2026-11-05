---
title: 'Prioritisation Frameworks'
objectives:
  - 'Decide when to use a framework and which framework to use'
  - 'Apply the RICE scoring framework to prioritise automation opportunities'
  - 'Justify prioritisation decisions with clear, evidence-based reasoning'
  - 'Structure and open a client meeting using the WANA framework (Who, Agenda, Notes, Actions)'
  - 'Practise handling stakeholder pushback live before running a real validation meeting'
  - 'Use a 2x2 Matrix to prioritise (Impact/Effort, Risk/Value)'
  - 'Apply WSJF (Weighted Shortest Job First) to prioritise tasks'
module: Technical-Business-Analyst
week: 3
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent"

<LearningObjectiveComponent />

## Workshop

<LockedContent password="ownership">

### Introduction (5 minutes)

**Introduce** the session: today is about deciding what to do first when everything feels urgent.

**Explain** that by the end of the session, trainees will have applied three different prioritisation frameworks to the same problem - and will be able to say when each one is the right tool.

**Set expectations**: this is a hands-on session. Most of the time will be spent in one group challenge, not listening.

---

### Discussion: When Do Frameworks Help? (10 minutes)
  
**Reinforce** that the map now shows something the workbook does not: exactly where the process is fragile. This is the information Kelvin needs, and it took five minutes.

**Ask** trainees: what kinds of problems can be solved by applying a framework, and what kinds can't?

**Cold-call** two or three trainees for answers before opening it up.

> Frameworks help when:
>
> - There are too many options and not enough time to do them all
> - Decisions keep getting revisited because there is no shared criteria
> - Stakeholders disagree and you need a defensible, transparent answer
> - The decision is repeatable - you will face the same choice again next week
>
> Frameworks don't help when:
>
> - The answer is obvious (don't score whether to fix a fire alarm)
> - The decision is one-off and irreversible (a framework won't tell you whether to accept a job offer)
> - The inputs are unknowable - scoring guesses produces confident-looking nonsense
> - The framework becomes an excuse to avoid making a judgement call

**Stress** the last point: a framework supports a decision, it doesn't make one. The output still needs a human to sense-check it.

---

### Brainstorm: Frameworks You Already Use (5 minutes)

**Ask** trainees to shout out frameworks they already use in daily life, without calling them frameworks.

**Gather** answers on a whiteboard or shared screen. Prompt if needed:

> - Pros and cons lists
> - Stack-ranked to-do lists (most important first)
> - "Eat the frog" - doing the worst task first
> - Shopping lists ordered by supermarket aisle
> - Comparing options on price vs. reviews when buying something online
> - Deciding what to cook based on what's about to expire

**Highlight** that everyone in the room already prioritises constantly - frameworks just make the criteria explicit and shareable

**Explain** that a prioritisation framework is simply: a set of criteria, a way to score each option against them, and a rule for turning scores into an order.

---

### Challenge: A Shift at Selco Supermarket (45 minutes)

**Introduce** the scenario:

> You are the duty manager at Selco, a busy supermarket. It's 7am and the store opens at 8am. Your overnight team has left you a list of jobs, but you only have three staff members until midday. You cannot do everything - you have to decide what gets done, in what order.
>
> The job list:
>
> | # | Job | Notes |
> |---|-----|-------|
> | 1 | Restock the milk and bread shelves | Emptied by yesterday's evening rush; highest-selling items in the store |
> | 2 | Clean up a broken jar of pasta sauce in aisle 6 | Slip hazard; aisle partially blocked |
> | 3 | Process the online delivery orders due for 10am pickup | 40 orders; late orders trigger refund penalties |
> | 4 | Reorganise the stockroom | Delivery arrives at 1pm; currently no space to put it |
> | 5 | Update the promotional displays for this week's offers | Head office checks compliance weekly; worth bonus points on store audit |
> | 6 | Fix the squeaky trolley wheel collection | Customers complain; no safety risk |
> | 7 | Count last night's till discrepancies | £35 unaccounted for; finance needs it by end of day |
> | 8 | Deep clean the staff break room | Hasn't been done in weeks; team morale is suffering |

#### Round 1: RICE Scoring (15 minutes)

**Explain** the four RICE dimensions using the supermarket context:

> - **Reach** - how many people does this affect today? (customers, staff)
> - **Impact** - how much does it matter to each of them? (0.25 = minimal, 0.5 = low, 1 = medium, 2 = high, 3 = massive)
> - **Confidence** - how sure are you of your Reach and Impact numbers? (a percentage)
> - **Effort** - how many staff-hours will it take?
>
> $$\text{RICE} = \frac{\text{Reach} \times \text{Impact} \times \text{Confidence}}{\text{Effort}}$$

**Work through** one job together as a group (job 2, the pasta sauce, is a good example - low reach but high impact and near-certain confidence).

**Instruct** pairs to score the remaining jobs. Keep it fast - rough numbers are fine, the reasoning matters more than the arithmetic.

**Grant** pairs 10 minutes, then gather the top three jobs from each pair.

**Ask** pairs where their rankings disagreed. Almost always the disagreement is a different Confidence or Effort estimate - use this to show that the framework's real value is surfacing *why* people disagree.

#### Round 2: The 2x2 Matrix (10 minutes)

**Explain** the Impact/Effort matrix: plot each job on a grid, Impact on one axis, Effort on the other.

> - **High impact, low effort** - do these first (quick wins)
> - **High impact, high effort** - plan these properly (big projects)
> - **Low impact, low effort** - fill in gaps (thankless tasks)
> - **Low impact, high effort** - question why they're on the list at all (time sinks)

**Instruct** pairs to draw the grid and place all eight jobs on it. No numbers this time - just relative position.

**Ask** each pair: which jobs moved position compared to your RICE ranking? Why?

> Expected observation: RICE rewards high-reach jobs (restocking, online orders); the 2x2 makes the quick wins visually obvious (pasta sauce, promotional displays) and exposes time sinks (stockroom reorganisation lands in "high impact, high effort" for some pairs and "low impact, high effort" for others - a great discussion point).

**Highlight** that the 2x2 is faster than RICE but coarser. It's the right tool for a quick conversation; RICE is the right tool when you need to defend numbers to a sceptical stakeholder.

#### Round 3: WSJF (15 minutes)

**Explain** Weighted Shortest Job First with one sentence: do the job where *delaying it costs the most per unit of effort* first.

> $$\text{WSJF} = \frac{\text{Cost of Delay}}{\text{Job Duration}}$$
>
> Cost of Delay = how much it costs you (money, penalties, risk, unhappiness) for every hour this job isn't done.

**Instruct** pairs to estimate a Cost of Delay per hour and a Duration for each job, then compute WSJF and re-rank the list.

**Grant** pairs 10 minutes, then gather results.

**Ask** pairs which job jumped to the top under WSJF.

> Expected: job 3 (online orders) usually rockets up - the 10am deadline and refund penalties give it a huge, concrete cost of delay. Job 7 (till discrepancies) also climbs because "end of day" is a hard deadline. WSJF is deadline-sensitive in a way RICE is not.

---

### Conclusion (5 minutes)

**Gather** the group and ask the closing question: which framework would you actually use on shift at Selco, and why?

> There is no single right answer, but listen for:
>
> - **2x2** for speed and team alignment - it's a conversation, not a spreadsheet
> - **RICE** when comparing bigger investments and defending the decision upwards
> - **WSJF** when deadlines and penalties dominate - it answers "what hurts most if we wait?"

**Reinforce** the session's core message: the framework is a way to make your reasoning visible and challengeable. A rough score with honest assumptions beats a gut feel every time - and beats a precise score built on invented numbers.

**Wait** for any final questions. End there.

</LockedContent>
