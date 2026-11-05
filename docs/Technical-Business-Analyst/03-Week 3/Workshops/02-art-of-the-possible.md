---
title: 'Art of the Possible'
objectives:
  - 'Understand what N8n and the class of tools it falls under'
  - 'Identify the main categories of N8n node and give a concrete example of each'
  - 'Describe the categories of task that large language models perform well and those they perform poorly'
  - 'Build a simple N8n automation that solves a problem'
module: Technical-Business-Analyst
week: 3
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent"
import EmbeddedYoutubeVideo from '@theme/EmbeddedYoutubeVideo'

<LearningObjectiveComponent />

## Pre-work

### Setup

If nobody has done so already, copy and paste this command into Slack.

```
/prework Art Of The Possible
```

### Watch

Watch this introduction to N8n to get a feel for the canvas, nodes, and how data flows through a workflow.

<EmbeddedYoutubeVideo id="4BVTkqbn_tY" />

Then watch this walkthrough of someone building a real automation from scratch -- pay attention to how they pick a trigger, add nodes one at a time, and test as they go.

<EmbeddedYoutubeVideo id="Fy1UCBcgF2o" />

### Read

Read the following short pages from the N8n docs:

- [What is N8n?](https://docs.n8n.io/courses/level-one/chapter-1/) -- the opening chapter of N8n's own beginner course
- [Workflow concepts](https://docs.n8n.io/workflows/) -- what a workflow, node, and connection are
- [AI in N8n](https://docs.n8n.io/advanced-ai/) -- skim this to see the kinds of AI-powered workflow N8n supports

### Explore

Log in to N8n and spend 15-20 minutes clicking around. There is nothing you can break -- the goal is to get comfortable with the dashboard before the session.

:::info Task

- Open a **new blank workflow** and click the **+** button to open the node panel. Give it a [clear descriptive name](../06-aside-managing-n8n-resources.md#naming-conventions) before you go any further. Scroll through the categories. Find three nodes that interest you and write down what you think each one does.
- Browse the **Templates** section. Find one template that looks useful or surprising and note its name -- you will be asked about this in the workshop.
- Find the **Executions** view. What do you think it shows? Why might it matter when a workflow goes wrong?
- Look for any **AI features** in the editor (e.g. the assistant chat window, AI nodes). Where do they live? What do you think you could ask them?

:::

### Task

:::info Task

While watching, reading, and exploring, write down:

- Your own one-sentence definition of what a workflow automation tool like N8n is for
- The three nodes you found while clicking around, and what you think each one does
- One thing an AI node or AI feature can do in N8n that you did not expect
- One example of a repetitive manual process (from any job, study, or daily life) that you think a tool like N8n could handle -- two or three sentences describing it

:::

### Submission

:::info Submission

Please share your answers in the Slack thread.

:::

## Workshop

<LockedContent password="art-of-the-possible-n8n">

### Part 1: Introduction to N8n (5 mins)

**Ask** trainees to share the repetitive manual processes they found in the pre-work. Take three or four examples and write them on a whiteboard.

**Explain** what N8n is:

> N8n is a workflow automation tool. It sits in a class of tools sometimes called "integration platforms" or "low-code automation platforms" -- tools like Zapier, Make, and Power Automate do a similar job. The core idea is the same across all of them: instead of writing code from scratch to connect systems together, you connect pre-built visual blocks (called nodes) on a canvas. Each node does one job -- read an email, transform some data, send a message -- and data flows from one node to the next.
>
> N8n is open source, which means it can be self-hosted and extended. It is popular for AI-powered automations because it has strong built-in support for large language models.

**Highlight** why this matters for a Technical Business Analyst:

> As a TBA, but you will often be the person who decides whether a process *can* be automated, what the workflow should look like, and whether the result is worth the effort. Understanding the building blocks means you can have a credible conversation with developers and stakeholders about what is possible and then deliver on the promise of automation.

#### The Shape of an N8n Workflow

**Explain** that before evaluating which processes to automate, it helps to understand the building blocks N8n provides. Every workflow has the same basic shape:

> 1. A **trigger** -- something that starts the workflow (a schedule, a form submission, an incoming email, a webhook from another system)
> 2. One or more **processing steps** -- nodes that read, transform, classify, or enrich data
> 3. An **output** -- an action that produces a result (sending a message, writing a row to a spreadsheet, calling an API, creating a ticket)

**Show** a simple finished workflow on a shared screen. **Point** at the trigger node, trace the line through each processing step, and end at the output node.

**Ask** the group to describe the workflow's shape back to you in the three-part language (trigger, processing, output).

#### A Tour of the Node Panel

**Open** a blank workflow and click the + button to open the node panel on the right-hand side. **Show** the main categories and give one concrete example of each as you scroll through them:

> | Category | What it does | Concrete example |
> | --- | --- | --- |
> | **Triggers** | Starts a workflow when something happens | Gmail Trigger -- fires when a new email arrives |
> | **Core / Data manipulation** | Reshapes, filters, or merges data | Edit Fields (Set) -- pulls out just the fields you need |
> | **Files** | Reads and writes documents | PDF Extract -- reads the text out of a PDF |
> | **Communication** | Sends messages to people | Slack -- posts a message to a channel |
> | **Databases & Spreadsheets** | Reads and writes structured data | Google Sheets -- appends a row to a spreadsheet |
> | **HTTP / APIs** | Talks to any external system | HTTP Request -- calls an external job board's API |
> | **AI** | Uses large language models inside a workflow | Text Classifier -- labels an email as "Strong" or "Not suitable" |
> | **Agents** | Lets an LLM decide which tools to use, in a loop | AI Agent -- reads a request and chooses whether to look something up, write a reply, or escalate |
> | **Flow** | Controls the logic of the workflow | Switch -- sends data down different paths depending on its content |

**Gather** two or three responses from trainees about which categories surprise them. The goal is to shift the mental model from "automation = coding" to "automation = connecting nodes".

**Note** that the AI and Agents categories are where most of the recent growth in these tools has happened -- the next section digs into what those actually do well.

#### N8n's Built-in AI Help

**Highlight** a feature trainees should use constantly while building:

> N8n has an AI assistant built into the editor (the chat window, usually accessible from the bottom or side of the canvas). You can ask it questions in plain English: "why is my HTTP Request node failing?", "how do I filter this list to only emails from today?", "what does this error mean?". It knows the N8n documentation and can often point you straight at the fix.
>
> **Stress** that this is the first place to go when stuck -- before raising a hand or searching the web. Learning to debug with an AI assistant is itself a core skill.

**Demonstrate** asking the assistant a simple question (e.g. "how do I schedule a workflow to run every morning?") and show the answer it returns.

**Wait** for questions before moving on.

### Part 2: What is the AI Node Actually Good At? (10 mins)

**Ask** trainees to define, in one sentence, what a large language model is. Take three or four answers without correcting yet.

**Ask** the group: based on your daily experience using LLMs, what have you found them good at? What has gone wrong?

> - Good at: summarising, drafting, extracting structured data from text, classifying, translating tone, identifying patterns in language
> - Bad at: precise counting, reliable rule-following over long documents, anything requiring real-time data, knowing when it does not know something

**Compare** this with a `Code` node on N8n:

> - Good at: precise calculations, deterministic transformations, data manipulation, anything with a clear algorithmic solution
> - Bad at: anything involving unstructured text, anything requiring judgement or interpretation, anything where the rules are hard to write or change frequently, anything involving generating bespoke text

**Explain** the mental model:

> LLMs are probabilistic pattern-matchers. They do not "understand" in the way a human does -- they predict what a plausible response looks like based on training data. This makes them powerful for language tasks and unreliable for anything that requires strict correctness.

**Connect** this to the node table they just saw. Point at the AI row:

> The AI Agent, Text Classifier, and Summarise nodes are powerful precisely where the other node categories are weak: when the input is unstructured, variable, or requires reading intent rather than parsing a fixed format. A Code node cannot tell you whether a CV is a strong match for a job description -- but an AI node can make a reasonable attempt at it every time.

**Ask**: for which of the other rows in the node library table would you _not_ use an AI node? Why?

> Expected: Triggers, Data manipulation, Databases, HTTP/APIs -- these are all deterministic operations where a fixed instruction always produces the same result. Using an AI node for a task like "write a row to Google Sheets" would add cost, latency, and unpredictability for no benefit.

**Wait** for questions before moving on.

**Introduce** the two automation modes:

> - **Scripted automation** -- deterministic, rule-based, follows a fixed path. Every node does exactly the same thing on every run. If the inputs change unexpectedly, it fails loudly. Best for: structured data, consistent formats, rules that can be written precisely.
> - **AI-assisted automation** -- flexible, handles variation. An AI node reads instructions and decides how to respond. Can handle unusual inputs. But: it can be confidently wrong, and it does not produce the same output every time. Best for: unstructured text, variable document formats, tasks where human-like judgement is needed.

**Ask**: for each example in the table above, is the use case scripted, AI-assisted, or hybrid? Take the "Read a CV PDF uploaded to Google Drive" example -- what part is scripted and what part might benefit from AI?

> Expected: extracting the text from the PDF is scripted (the PDF Extract node always does the same thing). Deciding whether that CV is a strong match for a job description requires AI -- the judgement varies depending on the role, the candidate's wording, and the hiring manager's priorities.

### Part 3: Automatable or Not? (10 mins)

:::info Note

Do as many or as few of these as you like, ensure there is 30 mins left when you start the next section.

:::

**Explain** the activity:

> You will see a series of real business processes. For each one, decide in pairs: is this automatable in N8n **today, with no custom code**? Vote yes, no, or "yes, but with a catch". Be ready to defend your vote using the node categories from Part 1 and the scripted vs. AI-assisted model from Part 2.

**Instruct** pairs to write down, for each scenario: their vote, which node categories they would need, and whether the tricky parts are scripted or AI-assisted. **Allow** two minutes per scenario, then take a show of hands and **cold-call** one pair to justify their vote before revealing the verdict.

---

**Scenario 1: The application inbox**

> A recruitment agency receives around 50 job applications by email every day, each with a CV attached as a PDF. A recruiter spends two hours every morning reading each CV and sorting it into "Strong", "Possible", or "Not suitable".

**Take** votes and one justification.

**Reveal** the verdict:

> **Yes -- hybrid.** Email Trigger fires on arrival, PDF Extract reads the CV (scripted), an AI Text Classifier compares the CV against the job description criteria (AI-assisted -- this is judgement, not parsing), and a Switch routes it to the right Google Drive folder while a Google Sheets node logs the result. Around 6 nodes, no code.
>
> The surprise for most pairs: classification and comparison happen in a *single* AI node call. What looks like two cognitive tasks to a human is one node.

---

**Scenario 2: The daily report**

> Every morning at 8am, an ops manager downloads a CSV of yesterday's sales from the company database, calculates totals per region in Excel, and emails a summary to the leadership team.

**Take** votes and one justification.

**Reveal** the verdict:

> **Yes -- almost entirely scripted.** Schedule Trigger at 8am, a database node (or HTTP Request) fetches the data, data manipulation nodes aggregate totals per region (deterministic maths -- never give this to an AI node), and Send Email delivers it. Optionally an AI Summarise node can turn the numbers into a plain-English paragraph for the email -- that is the one place AI adds value.
>
> **Stress** the pattern: calculation is scripted, narration is AI-assisted. Reversing those is how you get confident, wrong numbers in a leadership email.

---

**Scenario 3: Interview scheduling**

> When a recruiter marks a candidate "Shortlisted" in a Google Sheet, the candidate should receive an email with three time slots. Once they reply confirming a slot, a calendar invite goes to both parties.

**Take** votes and one justification. **Ask** specifically: how does the workflow know the candidate has replied?

**Reveal** the verdict:

> **Yes, but with a catch.** Google Sheets trigger fires on the status change, Send Email goes out -- but then the workflow must *pause and wait for a human*. N8n's Wait node holds execution until the reply arrives, then Google Calendar creates the invite. Around 7 nodes.
>
> The catch: any workflow that depends on a human action needs an explicit answer to "what if they never reply?" -- a timeout, an escalation, or a nudge. Automation does not handle edge cases gracefully unless you specify what graceful means.

---

**Scenario 4: Reading the room**

> A manager wants a workflow that watches the team Slack channel and alerts her whenever team morale is dropping, so she can intervene early.

**Take** votes and one justification.

**Reveal** the verdict:

> **No -- or at least, not responsibly.** The technology *can* do a version of this (Slack trigger plus an AI sentiment node), and it is worth letting trainees say so. But this is where "can we?" and "should we?" separate. Morale inference from chat messages is unreliable, employees have not consented to being monitored this way, and a false reading could damage trust badly. The automation would work technically and fail organisationally.
>
> **Emphasise** that part of the TBA's job is recognising when the honest answer to "is this automatable?" is "yes, but you shouldn't". Scope is not just technical -- it includes risk, consent, and what happens when the tool is wrong.

---

**Scenario 5: The offer acceptance**

> When a candidate accepts an offer in the applicant tracking system: send them a welcome email with first-day instructions, raise an IT setup request, add them to the HR system via its API, and send the hiring manager a preparation checklist.

**Take** votes and one justification. **Ask**: four outputs -- do you need four workflows?

**Reveal** the verdict:

> **Yes -- one workflow, around 6 nodes.** A Webhook trigger receives the status change from the ATS, a Set node extracts the details, and the four actions run *in sequence*: Send Email, HTTP Request to the HR API, Send Email to IT, Send Email to the manager.
>
> Common misconception: parallel outputs need parallel branches. In N8n, sequential execution is the default -- each node passes its output to the next. Separate branches are only needed when outputs have different conditions or must fail independently.

---

**Ask** the group to zoom out:

> - Which scenarios did you get wrong, and what fooled you?
> - What do the "yes" scenarios have in common? (Expected: a clear trigger, data that moves between systems, steps that are either deterministic or language-based judgement.)
> - What made Scenario 4 different from the others? (Expected: the limitation was not technical.)

### Part 4: Explore the Template Library

**Explain** that one of the fastest ways to learn what a tool can do is to look at what other people have already built with it.

**Instruct** trainees to open the N8n template library (the "Templates" link inside N8n, or n8n.io/workflows) and spend 10 minutes browsing. Their task:

:::info Task

- Find one template that solves a problem similar to something you wrote about in the pre-work. What nodes does it use?
- Find one template that uses an AI or Agent node. What is the AI doing -- classifying, summarising, deciding, generating?
- Find one template that surprises you -- something you would not have guessed was automatable. Be ready to show it to the group.

:::

**Gather** the group and **ask** three or four trainees to screen-share their surprising template. For each one, **ask** the group to name the node categories involved and whether it is scripted, AI-assisted, or hybrid.

**Highlight** any templates that combine mundane plumbing (a spreadsheet, an email) with one AI step -- this hybrid shape is the most common real-world pattern and the one they will build next.

### Part 5: Build Your First Workflow (30 mins)

**Introduce** the hands-on task. Trainees will now build a small working automation themselves -- not just design one on paper.

**Stress** one constraint up front: **no AI nodes**. Today is about mastering the plumbing -- triggers, data manipulation, and outputs. AI nodes and agents come in tomorrow's workshop, and they will land much more easily once this foundation is solid.

**Instruct** trainees to pick one small, real problem to automate using only scripted nodes. Offer starter ideas for anyone stuck:

> - A scheduled workflow that posts a daily "stand-up prompt" message into a test Slack channel each morning
> - A workflow that fetches a news headline from an RSS feed, reformats it with an Edit Fields node, and posts it to Slack
> - A workflow that watches a Google Sheet for new rows and sends you an email notification with the row's contents
> - A workflow that takes a hard-coded list of names, uses a Switch to route them by team, and writes each team to a different Google Sheet tab

**Walk** the room while trainees build. *

*Point** trainees who get stuck at the N8n AI assistant chat window first -- encourage them to paste the error message in and ask what it means. Only step in directly if the assistant cannot unblock them.

**Ensure** everyone connects at least three nodes and runs the workflow manually to see real output. Check that each person can explain, in trigger / processing / output language, what their workflow does.

**Grant** roughly 30 minutes for this exercise depending on pace.

**Gather** the group back together. 

**Ask** two or three trainees to screen-share their workflows and talk through:

> - What problem does it solve?
> - Which node categories did you use?
> - What went wrong while building, and how did you debug it?

</LockedContent>
