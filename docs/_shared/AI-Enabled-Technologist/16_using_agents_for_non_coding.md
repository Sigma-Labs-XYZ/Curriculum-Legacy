---
objectives:
  [
    'Create a GitHub Copilot Skill (SKILL.md) to automate a repeating task',
    'Prompt an LLM to intelligently use the tools it has access to',
    'Use an LLM to review your work and suggest improvements',
    'Write custom instructions for GitHub Copilot and observe how they change its behaviour'
  ]
module: AI-Enabled-Technologist
week: 1
workshop: true
title: Using AI Agents for Non-Coding Tasks
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent';
import LockedContent from "@theme/LockedContent";
import EmbeddedYoutubeVideo from "@theme/EmbeddedYoutubeVideo"

<LearningObjectiveComponent />

## Pre-work

### Research

- What is an AI agent vs an AI assistant?
- What is a 'Skill' in the context of AI agents?

### Create

:::info Task

In Gemini, create a simple Skill (called Gems in Gemini parlance) that can perform a task you commonly do. For example, if you often need to extract data from a specific type of document, create a Skill that can do this.

:::

## Workshop

<LockedContent password="ownership">

### Reflect

**Ask** trainees to reflect on their experience with AI so far

> - How have they used it well?
> - What have they found frustrating?
> - What have they found surprising?
> - What have they found disappointing?

### Discuss - Understanding Agentic AI

**Ask** trainees to share their definitions of Agentic AI.

**Collect** core traits on a shared board:

> - Autonomous decision-making
> - Goal / state orientation
> - Multi-step planning
> - Context persistence
> - Self-monitoring & adjustment

**Differentiate** an agent from a passive assistant: initiative, planning, action sequencing, boundary negotiation.

### Live Example - Intro to Copilot Agent

**Demonstrate** the difference between using Copilot in standard mode (passive assistant) vs agent mode, where it can autonomously decide to use tools and execute multi-step plans.

### Live Example - GitHub Copilot Skills

**Ask** two or three trainees to briefly share the Gem they created in pre-work. What task does it perform? How did they structure the instructions?

**Bridge** from Gemini Gems to GitHub Copilot Skills: both are reusable, named instruction sets that an AI can load when relevant - but Copilot Skills live directly in your repository as version-controlled files.

**Explain** the structure of a Copilot Skill:

> - Skills live in `.github/skills/` (project-scoped) or `~/.copilot/skills/` (personal, shared across all projects)
> - Each skill is a subdirectory named in lowercase with hyphens (e.g. `write-adr`)
> - The subdirectory contains a `SKILL.md` file - this is where the instructions live
> - Optionally, scripts and other resources can be added to the same directory and referenced in `SKILL.md`

**Live create** a skill together. Create `.github/skills/check-writing/SKILL.md`:

```markdown
---
name: check-writing
description: Checks written content for spelling, punctuation, grammar, and clarity. Use this when asked to proofread, check writing, or review a document.
---

Review the content provided by the user and check for:

- Spelling errors
- Punctuation mistakes (missing commas, incorrect apostrophes, etc.)
- Grammar issues (subject-verb agreement, tense consistency, etc.)
- Unclear or awkward phrasing that could be simplified

For each issue found, output:

- The original text
- The suggested correction
- A one-sentence explanation of why the change improves the writing

If no issues are found, say so clearly. Do not rewrite the entire document - only flag specific problems.
```

**Switch** Copilot Chat to agent mode and ask: "Check the writing in this README" (point it at any markdown file in the project).

**Observe** that Copilot picks up the skill automatically based on the description - no `/command` needed. It injects the `SKILL.md` instructions into its context and follows them.

**Highlight** the key elements that make a skill effective:

> - A `description` that is specific enough for Copilot to know _when_ to invoke it
> - A single, well-scoped purpose
> - Clear output instructions in the body, including where to save results
> - The skill directory name is lowercase and uses hyphens

**Note** the difference between skills and custom instructions: custom instructions are always-on rules applied to every interaction; skills are only loaded when Copilot decides they are relevant to the current task.

### Tool Use - How Copilot Agent Mode Works

**Explain** that a standard LLM can only work with the text it was trained on and the text you give it. Tools extend what it can do:

> - **File system**: read and write files across the whole workspace
> - **Terminal**: run commands and observe their output
> - **GitHub MCP Server** (when connected): interact with pull requests, issues, workflow runs, and more
> - **Extensions**: third-party tools registered as Copilot Extensions (e.g. Azure, Jira)

**Show** that a skill can also pre-approve tools using `allowed-tools` in its frontmatter, so Copilot can act without prompting for confirmation each time:

```markdown
---
name: project-setup
description: Sets up a new project environment. Use when asked to initialise, scaffold, or set up a new project.
allowed-tools: shell
---

Set up a new project environment by running the following steps in order:

1. Create a Python virtual environment: `python -m venv .venv`
2. Activate it and install dependencies if a `requirements.txt` exists
3. Create a `.gitignore` file suitable for Python if one does not already exist
4. Create an empty `README.md` if one does not already exist
5. Report what was created, what already existed and was skipped, and any errors encountered

Do not delete or overwrite any files that already exist.
```

**Warn** trainees that `allowed-tools: shell` removes the confirmation step for terminal commands - only add it to skills whose scripts you have personally reviewed and trust.

**Observe** the agent deciding which tools to use, showing its plan before acting.

**Point** out that this decision-making loop - decide whether a tool is needed, which one, what to pass it, and how to use the result - is what separates an _agent_ from a simple chatbot. The agent proposes its plan; you should review it before approving.

### Prompting for Skill Invocation

**Explain** that Copilot decides which skill to use based on two things: your prompt and the skill's `description` field. This means the description is critical - it acts as the trigger.

**Demonstrate** the difference between a vague and a precise description by showing two versions side by side:

| Vague                             | Precise                                                                                                                                  |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `description: Helps with writing` | `description: Checks written content for spelling, punctuation, grammar, and clarity. Use when asked to proofread or review a document.` |

**Ask** trainees: which description would Copilot be more likely to invoke for the prompt "proofread my proposal document"? Why?

**Reinforce** that the description should answer: _what does this skill do, and in what situation should it be used?_

**Note** that if you want to install a skill someone else has already written, you can use the GitHub CLI:

```zsh
gh skill install github/awesome-copilot documentation-writer
```

**Ask** trainees: why might it be valuable to share skills across a team via a shared repository rather than each person writing their own?

### LLM as Reviewer

**Explain** that AI can also critique and improve existing work, not just generate content.

**Demonstrate** pasting a piece of written work (e.g. a short report, email, or proposal) into the AI and asking:

```
Review the following text and suggest improvements. Focus on:
- Clarity and conciseness
- Logical structure and flow
- Tone (professional, appropriate for a business audience)
- Any factual or logical gaps

Provide specific, actionable suggestions, referencing the exact sentences where changes are needed.
```

**Ask** trainees to paste some of their own recent written work - a Slack message, a short summary, or their pre-work notes - and run a similar review prompt.

**Gather** a few examples of the feedback the AI gave. Was it useful? Was it accurate? Did it miss anything?

**Stress** that AI reviews are a starting point, not a final verdict. You must evaluate whether the suggestions are appropriate before acting on them.

### Custom Instructions in VS Code

**Explain** that GitHub Copilot has two main ways to set persistent instructions that shape every response:

> 1. **`.github/copilot-instructions.md`** - repo-level instructions applied to every Copilot interaction in this workspace
> 2. **VS Code user settings** (`github.copilot.chat.codeGeneration.instructions`) - personal instructions applied across all workspaces

**Note** that these are not prompt files you invoke manually - they are always-on context that Copilot reads automatically.

**Live create** `.github/copilot-instructions.md` together, starting with a template:

```markdown
# Copilot Instructions

## Role

You are an assistant helping a junior professional working on written documentation, meeting notes, and project planning tasks.

## Tone

- Be concise. Prefer bullet points over long paragraphs.
- Use plain English. Avoid jargon and technical terms unless the user introduces them first.
- If you are unsure about something, say so rather than guessing.

## Writing style

- British English spelling throughout (e.g. "organise" not "organize", "colour" not "color").
- Use sentence case for headings, not title case.
- Keep sentences short. If a sentence runs over two lines, consider splitting it.

## Constraints

- Do not rewrite an entire document unless explicitly asked - suggest targeted improvements only.
- Do not invent facts, statistics, or names. If you need an example, make it clearly hypothetical.
```

**Ask** trainees: how would Copilot behave differently with these instructions vs. without them? Which rules matter most for a non-coding task?

**Demonstrate** the difference by asking Copilot the same question (e.g. "Summarise what this project does") before and after saving the file.

**Task** trainees to write their own `copilot-instructions.md` for their current project:

:::info Task

Create a `.github/copilot-instructions.md` file in your project that:

- Defines a clear role for Copilot relevant to your work this week
- States at least two tone or style preferences
- Includes at least one explicit constraint (something Copilot should NOT do)

If nobody has done so already, copy and paste this command into Slack in the `#workshops` channel:

```
/prework Using AI Agents for Non-Coding Tasks
```

Share your `copilot-instructions.md` content as a reply in the thread.

:::

**Review** a few examples from trainees. What makes some more effective than others? Which constraints are hardest to write well?

> #### Write effective custom instructions for Copilot
>
> Acceptance criteria
>
> - `.github/copilot-instructions.md` exists in the project
> - A clear role is defined
> - At least two tone or style rules are present
> - At least one explicit constraint is included
> - Copilot's responses are noticeably shaped by the instructions

### Pop Quiz

**Give** trainees 2 minutes to answer the following individually, then discuss as a group:

> 1. What's the difference between a Copilot Skill and custom instructions?
> 2. What are the key elements of an effective Skill description?
> 3. How does a Copilot Skill decide when to be invoked?
> 4. What are some examples of tools an agent can use?
> 5. Why is it important to review an AI's suggestions before acting on them?

**Correct** any misconceptions before moving on.

### Conclusion

**Reinforce** that Copilot Skills and custom instructions are two complementary tools: custom instructions set always-on context, while skills give Copilot detailed, task-specific guidance that it loads only when relevant.

**Remind** trainees that the quality of a skill's `description` directly determines whether Copilot invokes it at the right time - a vague description leads to missed or incorrect invocations.

**Encourage** trainees to identify one repeating task from this week - writing a commit message, summarising a document, reviewing a piece of work - and build a Skill for it in their project repository.

</LockedContent>
