---
title: 'Aside: Managing N8n Resources'
module: Technical-Business-Analyst
week: 3
---

The Sigma Labs N8n instance is shared by everyone on your cohort, and by trainees on future cohorts once yours has finished. Every workflow, sub-workflow, and credential you create lives in that same shared space alongside everyone else's. Without a bit of discipline, it quickly becomes hard to tell whose workflow is whose, or whether a workflow can be safely deleted.

## Naming conventions

Use the same naming convention here as you did for cloud resources: `[cohort]-[your name]-[meaningful resource name]`.

All names should be entirely lowercase, using hyphens (`-`) to separate words. Apply this to workflows, sub-workflows, and credentials alike.

For example, if you were in cohort 12 and named Alex, a workflow that sends a daily news digest would be named `c12-alex-news-digest`, and its error handler sub-workflow would be `c12-alex-news-digest-error-handler`.

:::tip Key Takeaway

Always use consistent naming of resources in N8n, the same as you would in AWS.

:::

## Cleanup

At the end of each cohort, the shared N8n workspace is cleared out so the next cohort starts with a clean slate. Any workflow, sub-workflow, or credential you no longer need should be deleted as you go, rather than left for someone else to clean up later.

:::tip Key Takeaway

Delete workflows and credentials once you're done with them to keep the shared N8n workspace tidy.

:::
