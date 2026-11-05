---
title: 'Advanced N8n'
objectives:
  - 'Implement error handling in an N8n workflow so that failures are detected and reported rather than silent'
  - 'Use sub-workflows to separate reusable logic from orchestration logic'
  - 'Apply retry and fallback patterns to make a workflow resilient to transient failures'
  - 'Use Evals to ensure that a workflow is working'
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
/prework Advanced N8n
```

Make sure you can open your N8n instance.

Import the starter workflow below into N8n. You can either:

1. Copy the JSON below and paste it directly onto your N8n canvas (**Ctrl/Cmd + V**), or
2. Save it as a `.json` file and use the **...** menu in the top right of the canvas, then **Import from File**

<details>
  <summary>News Digest - Starter workflow JSON</summary>

```json
{
  "name": "News Digest - Starter",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "hours",
              "triggerAtHour": 7
            }
          ]
        }
      },
      "id": "a1b2c3d4-0001-4000-8000-000000000001",
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [-800, 300]
    },
    {
      "parameters": {
        "url": "https://feeds.bbci.co.uk/news/technology/rss.xml"
      },
      "id": "a1b2c3d4-0002-4000-8000-000000000002",
      "name": "Fetch RSS Feed",
      "type": "n8n-nodes-base.rssFeedRead",
      "typeVersion": 1,
      "position": [-580, 300],
      "notes": "Main news feed. Part 2 of the workshop adds a retry and a backup feed here."
    },
    {
      "parameters": {
        "jsCode": "// Keep the 5 most recent articles and normalise the fields\nreturn $input.all().slice(0, 5).map(item => ({\n  json: {\n    title: item.json.title,\n    link: item.json.link,\n    summary: item.json.contentSnippet || item.json.content || '',\n    published: item.json.isoDate || item.json.pubDate\n  }\n}));"
      },
      "id": "a1b2c3d4-0003-4000-8000-000000000003",
      "name": "Prepare Articles",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [-360, 300]
    },
    {
      "parameters": {
        "resource": "chat",
        "model": "gpt-4o-mini",
        "messages": {
          "values": [
            {
              "content": "=Classify the following news article into exactly one topic: TECHNOLOGY, BUSINESS, SCIENCE, or OTHER. Reply with only the topic name.\n\nTitle: {{ $json.title }}\nSummary: {{ $json.summary }}"
            }
          ]
        }
      },
      "id": "a1b2c3d4-0004-4000-8000-000000000004",
      "name": "Classify Article",
      "type": "n8n-nodes-base.openAi",
      "typeVersion": 1,
      "position": [-140, 300],
      "credentials": {
        "openAiApi": {
          "id": "",
          "name": "OpenAI account"
        }
      },
      "notes": "Requires an OpenAI credential. This is the step you will extract into a sub-workflow in Part 3."
    },
    {
      "parameters": {
        "conditions": {
          "string": [
            {
              "value1": "={{ $json.message.content }}",
              "value2": "OTHER",
              "operation": "notEqual"
            }
          ]
        }
      },
      "id": "a1b2c3d4-0005-4000-8000-000000000005",
      "name": "Filter Relevant Articles",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [80, 300]
    },
    {
      "parameters": {
        "aggregate": "aggregateAllItemData",
        "destinationFieldName": "articles"
      },
      "id": "a1b2c3d4-0006-4000-8000-000000000006",
      "name": "Combine Articles",
      "type": "n8n-nodes-base.aggregate",
      "typeVersion": 1,
      "position": [300, 240]
    },
    {
      "parameters": {
        "jsCode": "// Build the digest email body from the filtered articles\nconst articles = $input.first().json.articles || [];\nconst lines = articles.map(a => `- ${a.json ? a.json.title : a.title}: ${a.json ? a.json.link : a.link}`);\nreturn [{ json: {\n  subject: `Morning News Digest - ${new Date().toLocaleDateString('en-GB')}`,\n  body: `Good morning,\\n\\nHere are today's top stories:\\n\\n${lines.join('\\n')}\\n\\nHave a great day.`\n}}];"
      },
      "id": "a1b2c3d4-0007-4000-8000-000000000007",
      "name": "Build Digest Email",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [520, 240]
    },
    {
      "parameters": {
        "resource": "message",
        "operation": "send",
        "subject": "={{ $json.subject }}",
        "emailType": "text",
        "message": "={{ $json.body }}",
        "options": {}
      },
      "id": "a1b2c3d4-0008-4000-8000-000000000008",
      "name": "Send Digest Email",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 2.1,
      "position": [740, 240],
      "credentials": {
        "gmailOAuth2": {
          "id": "",
          "name": "Gmail account"
        }
      },
      "notes": "Requires a Gmail credential. Set the recipient address before running."
    },
    {
      "parameters": {
        "content": "## News Digest - Starter Workflow\n\nImport this workflow, add your OpenAI and Gmail credentials, and set the recipient address on the Send Digest Email node.\n\nIn this workshop you will:\n1. Add error detection and alerting\n2. Add retry and fallback to the RSS fetch\n3. Extract classification into a sub-workflow\n4. Build an Eval for the classification step",
        "height": 260,
        "width": 420
      },
      "id": "a1b2c3d4-0009-4000-8000-000000000009",
      "name": "Sticky Note",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [-820, 0]
    }
  ],
  "connections": {
    "Schedule Trigger": {
      "main": [
        [
          {
            "node": "Fetch RSS Feed",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Fetch RSS Feed": {
      "main": [
        [
          {
            "node": "Prepare Articles",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Prepare Articles": {
      "main": [
        [
          {
            "node": "Classify Article",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Classify Article": {
      "main": [
        [
          {
            "node": "Filter Relevant Articles",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Filter Relevant Articles": {
      "main": [
        [
          {
            "node": "Combine Articles",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Combine Articles": {
      "main": [
        [
          {
            "node": "Build Digest Email",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Build Digest Email": {
      "main": [
        [
          {
            "node": "Send Digest Email",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1"
  },
  "pinData": {}
}
```

</details>

Once imported:

1. Rename the workflow [following the convention](../06-aside-managing-n8n-resources.md#naming-conventions), e.g. `c12-alex-news-digest`
2. Add your OpenAI credential to the **Classify Article** node
3. Add your Gmail credential to the **Send Digest Email** node and set a recipient address (use your own email for testing)
4. Run the workflow once manually to confirm it works end to end before the session

If you already have a working news digest workflow from the previous session, you can use that instead - but make sure it has at least a feed fetch, an LLM classification step, and an email send step.

### Read

Read the [N8n error handling documentation](https://docs.n8n.io/flow-logic/error-handling/) before attending. Come prepared to explain in one sentence what an Error Trigger node does.

### Research

:::info Task

Dangerous in automated systems?

- Find one real-world example of a silent failure in an automated system and describe it in two sentences.
- What is the difference between a "retry" and a "fallback" when something goes wrong? Give one everyday example of each.

:::

:::info Submission

Post your answers

Post your silent failure example and your "how would you eventually find out" answer in the Slack thread before the session.

:::

## Workshop

<LockedContent password="advanced-n8n-production">

### Introduction

**Ask** a trainee to explain, in one sentence, what an Error Trigger node does.

**Ask** a trainee to share their silent failure example from the pre-work.

**Describe** the scenario for today's session:

> Your news digest workflow has been running every morning at 7am for six weeks. Last Tuesday it stopped sending digests. Nobody noticed until Friday.

**Ask**: walk me through every point between Tuesday and Friday where someone could have been told this had failed.

**Allow** responses. The list will be short or empty. That is the point.

**Explain** the plan for today: we will make this workflow production-ready in four steps - detect errors, retry and fall back, split into sub-workflows, and test with Evals.

### Part 1: Error Detection and Alerting

**Explain** what happened on Tuesday:

> Three things went wrong. The RSS feed returned an empty response (input failure). The LLM step hit its token limit on a long article (processing failure). The email credential had expired (output failure). None of these produced an alert. The workflow even reported "success" because nobody had told N8n what success means for this workflow.

**Live code** an error handler:

1. Create a new workflow, [named following the convention](../06-aside-managing-n8n-resources.md#naming-conventions), e.g. `c12-alex-news-digest-error-handler`.
2. Add an **Error Trigger** node as the start node.
3. Connect it to a Slack (or email) node.
4. In the main workflow's settings, set the error workflow to the new handler.

**Show** the fields available from the Error Trigger output: workflow name, failed node name, error message, timestamp, execution ID.

**Show** the difference between two alerts:

> **Useless:** "News digest workflow failed."
>
> **Useful:** "News digest failed at the Classification step. Error: token limit exceeded. Time: 07:03. Execution ID: 4821."

**Ask**: what makes the second one useful?

> It tells the operator what broke, where it broke, and when - so they can reproduce and fix it.

**Instruct** trainees to build the error handler for their own workflow. The alert must include the failed node name, the error message, and the execution ID.

**Grant** 10 minutes.

**Check** that each trainee can force a failure (for example, by temporarily breaking a credential) and see the alert arrive.

### Part 2: Retry and Fallback

**Explain** the difference:

> - A **retry** tries the same thing again, because many failures are temporary (a slow network, a rate limit, a service restarting).
> - A **fallback** does something different when the retry still fails (use a backup service, skip the item, or hand over to a human).

**Show** where retries live in N8n: open any node's **Settings** tab and point out the **Retry On Fail** option (max tries and wait between tries).

**Live code** a retry and fallback on the RSS fetch step:

1. Turn on **Retry On Fail** for the RSS feed node: 3 tries, 5 seconds apart.
2. Add a second, backup RSS source.
3. On the main feed node, set **On Error** to "Continue (using error output)".
4. Wire the error output to the backup feed node.

**Explain** the result: if the main feed fails three times, the workflow automatically switches to the backup instead of dying silently.

**Ask**: for the LLM classification step, what would a sensible fallback be if retries keep failing?

> Skip that article and log it, or route it to a "needs human review" list - rather than failing the whole digest.

**Instruct** trainees to add one retry and one fallback to their own workflow.

**Grant** 10 minutes.

**Wait** for questions before moving on.

### Part 3: Sub-workflows

**Ask**: how many distinct logical steps does the news digest workflow have?

> 1. Fetch and validate articles from the feeds.
> 2. Classify and filter articles by topic.
> 3. Summarise and send the digest email.

**Explain** the problem with one big workflow:

> When something fails you hunt through 15 nodes. When the classification prompt needs updating, you have to find it buried in the middle. And if another team wants the same classification logic, they copy and paste it - now two copies need maintaining.

**Live code** extracting "classify and filter" into a sub-workflow:

1. Create a new workflow, named following the same convention, e.g. `c12-alex-classify-and-filter-articles`.
2. Move the classification and filter nodes into it.
3. Give it a clear contract: it receives a list of articles and returns a filtered list.
4. In the main workflow, replace the moved nodes with an **Execute Workflow** node pointing at the sub-workflow.

**Ask**: if the classification prompt changes next month, how many places do you edit now?

> One. Before: everywhere the logic was copied. After: one sub-workflow.

**Explain** the principle in one line:

> The main workflow should read like a summary of the process. The detail lives in sub-workflows.

**Instruct** trainees to extract one reusable step from their own workflow into a sub-workflow.

**Grant** 10 minutes.

### Part 4: Evals - Proving the Workflow Works

**Ask**: how do you currently know your workflow produces good output, rather than just runs without crashing?

**Allow** responses. Most trainees will say "I look at the output" - which does not scale.

**Introduce** Evals:

> An Eval (evaluation) is a repeatable check that the workflow's output is actually correct, not just present. In N8n you use the **Evaluation** feature: you build a small set of example inputs with known-good outputs, run the workflow against them, and score how close it gets.

**Live code** a simple Eval for the classification sub-workflow:

1. Create a small test dataset: 5-10 articles where you already know the correct topic for each (store them in a Google Sheet or as pinned data).
2. In the sub-workflow, add an **Evaluation** trigger and run it against the test dataset.
3. Add a check that compares the workflow's predicted topic with the known topic.
4. Run the Eval and read the score - for example, "8 out of 10 articles classified correctly".

**Explain** why this matters:

> Without an Eval, a prompt change can silently make classification worse and you would only find out from angry users. With an Eval, you change the prompt, re-run the test set, and see the score move before you ship.

**Instruct** trainees to build a small Eval for one part of their own workflow: at least 5 test cases with known-good outputs, and one check comparing actual to expected.

**Grant** 15 minutes.

**Gather** the group and ask each trainee for their Eval score. Low scores are a finding, not a failure - they show exactly what to fix.

### Production Readiness Checklist

**Share** the checklist and explain this is the minimum bar for a workflow running on real matters:

| Check           | Question to ask                                                          |
| :-------------- | :----------------------------------------------------------------------- |
| Error detection | Does every failure produce a visible alert?                              |
| Error detail    | Does the alert say which node and which input failed?                    |
| Retry           | Do transient failures get retried automatically?                         |
| Fallback        | Is there a backup path (or human handover) when retries fail?            |
| Sub-workflows   | Is reusable logic separated from orchestration?                          |
| Evals           | Is there a test set proving the output is correct, and a passing score?  |
| Audit log       | Is every run logged with input, output, and timestamp?                   |

**Instruct** trainees to score their own build against the checklist: Yes, No, or Partial for each row.

**Grant** 5 minutes.

**Ask** each trainee to complete one sentence out loud:

> "The one thing my build most needs before going to production is ___."

### Conclusion

**Reinforce** the four patterns from today:

> 1. **Error handling** - every failure produces an alert with enough detail to act on. Silent failures are worse than loud ones because they accumulate unnoticed.
> 2. **Retry and fallback** - retry temporary failures; fall back to a backup or a human when retries are exhausted.
> 3. **Sub-workflows** - the main workflow summarises; sub-workflows do the work. Reusable logic lives in one place.
> 4. **Evals** - a test set with known-good outputs proves the workflow is correct, and catches regressions when you change it.

**Signpost** that the next session is the stakeholder briefing - this build is about to go in front of the people who decide whether it goes live. The checklist is the minimum bar for that room.

</LockedContent>
