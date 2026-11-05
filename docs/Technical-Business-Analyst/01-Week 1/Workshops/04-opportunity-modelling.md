---
title: Opportunity Modelling
objectives:
  [
    'Build baseline metrics and transparent assumptions',
    'Calculate and compare 12-month ROI for automation opportunities',
    'Separate hard savings, revenue uplift, and softer benefits in a value case',
    'Assess change and adoption risks using ADKAR',
    'Prioritise automation opportunities using value, effort, and confidence',
    'Explain why change risk should influence recommendations'
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
/prework Opportunity Modelling
```

### Research

:::info Task

Research online for the following terms:

- the ADKAR model
- ROI
- Revenue uplift

:::

### Consider

:::info Task

Choose one stakeholder from the PVC case and write one likely risk for each of these headings:

- Awareness
- Desire
- Knowledge
- Ability
- Reinforcement

Then list one automation opportunity you think is attractive but might still fail because of adoption issues.

:::

### Model

:::info Task

Open a spreadsheet tool and create a simple table with three columns:

- Opportunity
- Cost
- Annual Benefit

Add a formula to calculate net benefit for two sample rows.

Be ready to explain what your formula did and where a finance stakeholder might challenge your numbers.

:::

### Submission

:::info Submission

Please share your answers in the Slack thread.

:::

## Workshop

<LockedContent password="ownership">

### Introduction

**Ask** trainees why discovery alone is unlikely to win organisational support.

> Because stakeholders need the value case to be quantified and defendable, not just plausible.

**Explain** that the purpose of today's modelling is not to predict the future perfectly; it is to compare options transparently.

**State** that a weaker but transparent model is more useful than a complicated model nobody can challenge or follow.

**State** that a model is always an approximation, but it should be an approximation that can be explained and defended. Metrics are created by us to imperfectly measure signals from things that we create to indicate magnitude of success or failure

### Workbook structure

**Demonstrate** a simple workbook structure.

<Tabs>
  <TabItem label="Suggested tabs" value="tabs">

```text
Assumptions
Baseline Metrics
Opportunities
Calculations
ROI Summary
```

  </TabItem>
  <TabItem label="Key fields" value="fields">

```text
assumption_name | value | unit | source | confidence_level | notes
opportunity_name | implementation_cost | annual_hours_saved | annual_recovery_uplift
benefit_type | annual_benefit | net_benefit | roi_percent | payback_months
```

  </TabItem>
</Tabs>

**Highlight** that good spreadsheet structure reduces confusion later when leadership challenges a figure.

**Stress** that there is no one right way to organise such a model; it's about fit for the current context more than any arbitrary 'perfect' standard.

### Baseline metrics

**Ask** trainees what baseline metrics matter most for Legacy-Trust.
Legacy Trust
**Gather** examples and steer them toward:

- Time to appointment
- Average CR time per case
- Case volume
- Admin hours lost to reconciliation
- Missed follow-up rate
- Customer satisfaction

**Demonstrate** how to keep observed data separate from assumptions.

**Show** a small example table:

```text
Metric                          Value   Source              Confidence
Straightforward cases / month   12000   activity tracker    Medium
Representative hourly cost      22      finance workbook    High
Handling time saved / case      6 mins  estimate            Low
```

**Stress** that source and confidence labels are not optional decoration; they are part of the argument.

### Opportunity modelling

**Introduce** three likely opportunities to model:

- Appointment booking
- Payment collection
- Emergency appointment booking
- Feedback collation

**Demonstrate** how to calculate a simple annual benefit.

> Annual hours saved = monthly case volume x minutes saved per case x 12 / 60
>
> Annual cost saved = annual hours saved x cost per hour

**Demonstrate** how revenue uplift might be modelled separately.

> Recovery uplift value = baseline recoveries x expected uplift %

**Warn** trainees not to count the same effect twice as both a cost saving and a revenue gain.

### Example formulas

**Show** formulas in plain spreadsheet language rather than making the session feel like advanced finance.

```text
Net Benefit = Annual Total Benefit - Implementation Cost
ROI % = Net Benefit / Implementation Cost
Payback Months = Implementation Cost / Monthly Benefit
```

**Ask** trainees where these formulas could still go wrong even if the maths is correct.

> Bad assumptions, unrealistic uplift, hidden dependencies, or treating efficiency gains as cashable savings.

### P&L impact

**Explain** the difference between three benefit types:

> Hard savings: clear and likely reducible cost.
>
> Revenue uplift: more money recovered because action improves.
>
> Softer benefit: visibility, consistency, reduced frustration, better control.

**Highlight** that softer benefits still matter, but they should not be disguised as precise financial returns.

### Sensitivity testing

**Introduce** conservative and optimistic scenarios.

**Ask** trainees why showing uncertainty can make a recommendation stronger rather than weaker.

> It shows honesty and helps leadership see the shape of risk.

**Demonstrate** how a single assumption change affects ranking.

**Show** that a flashy opportunity can fall if its benefit depends on low-confidence assumptions.

### Risk estimation

**Ask** trainees why Mitzi's concerns matter even if the numbers look strong.

> Because value depends on adoption, trust, and operational fit, not just projected savings.

**State** that today's workshop helps trainees make a realistic recommendation rather than a purely theoretical one.

### ADKAR basics

**Introduce** ADKAR as a simple change lens:

- Awareness: do people understand why the new system is needed?
- Desire: do staff and managers want it to succeed?
- Knowledge: do they know how the new process works?
- Ability: can the users effectively work with the new system?
- Reinforcement: will the organisation keep supporting the change after launch?

**Ask** trainees which of these looks weakest for Mitzi's team today.

> Often Desire, Ability, and Reinforcement.

### Demonstration: stakeholder ADKAR assessment

**Show** a simple table and populate it live.

| Stakeholder        | Awareness | Desire     | Knowledge | Ability | Reinforcement | Key risk                                              |
| ------------------ | --------- | ---------- | --------- | ------- | ------------- | ----------------------------------------------------- |
| Representatives    | Medium    | Low-Medium | Low       | Low     | Low           | Fear of replacement and poor trust in system outcomes |
| Team leaders       | Medium    | Medium     | Medium    | Low     | Low           | Hidden workload shift                                 |
| Operations leaders | High      | High       | Medium    | Medium  | Medium        | Need proof of workload reduction                      |
| Finance            | High      | Medium     | High      | Medium  | Medium        | Skepticism of weak assumptions                        |

**Highlight** that this is not separate from product scope; it should influence what gets prioritised.

### From ROI ranking to recommendation ranking

**State** that we now have various different metrics (e.g. ROI, risk, confidence) which can help us prioritise plans.

**Explain** that the top financial opportunity might still be a poor Phase 1 choice if it depends on low-confidence assumptions or high adoption risk.

**Introduce** a simple prioritisation matrix with four lenses:

- business value
- implementation effort
- confidence in assumptions
- change and adoption risk

**Demonstrate** how a candidate like simple payment-plan selection might score.

**Compare** it with a candidate like full hardship assessment and show why the second should be deferred.

### Group challenge

**Challenge** trainees in pairs to compare three opportunities and produce a ranked shortlist.

**Direct** them to include:

- one cost assumption
- one time-saving assumption
- one revenue assumption
- one confidence rating

**Grant** trainees 15 minutes.

**Circulate** and look especially for double-counting or impossible savings claims.

**Gather** the room and ask each pair to defend their top-ranked choice.

### Conclusion

**Ask** trainees to complete the sentence, "A credible model is one where..."

**Confirm** strong answers that mention traceable assumptions, separate benefit types, and visible uncertainty.

**Stress** that scope decisions should come from this modelling work rather than from enthusiasm alone.

</LockedContent>
