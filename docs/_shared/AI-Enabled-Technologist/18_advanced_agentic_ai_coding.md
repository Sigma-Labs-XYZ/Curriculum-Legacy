---
objectives:
  [
    'Give an agent Skills to include tools, APIs, and code execution',
    'Set Instructions for agents to define boundaries and guidelines for behaviour'
  ]
module: AI-Enabled-Technologist
week: 1
workshop: true
title: Advanced Agentic AI Coding
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent';
import LockedContent from "@theme/LockedContent";
import EmbeddedYoutubeVideo from "@theme/EmbeddedYoutubeVideo"

<LearningObjectiveComponent />

## Pre-work

## Workshop

<LockedContent password="agentic!!!">

### Reflect (20 mins)

**Ask** trainees to reflect on their experience with working with agentic AI so far

> - How have they used it well?
> - What have they found frustrating?
> - What have they done that saved them time?
> - What have they done that wasted them time?

**Draw** a line and get trainees to place themselves on it based on how much they've used agentic AI tools so far, from all the time to not at all

**Prompt** a discussion around the different experiences people have had, and the different ways people have used agentic AI tools.

### Skills (10 mins)

**Explain** that by adding content to `.copilot-instructions` they can teach the LLM to do lots of different things, including using tools, design well or write code in a certain style.

**Ask** the trainees

> "What might be the issue with this"

**Guide** the trainee to the answer that

> A large context window results in poorer performance, and the agent may not be able to use a tool effectively if it doesn't have enough information about how to use it, or if the instructions are too long and complex for the agent to understand.

**Demonstrate** that we can solve this by teaching the agent Skills using the commands

> - `/find-skill`
> - `/create-skill` > `create a skill that allows the agent to use a calculator`

**Show** how we can write a skill that allows the agent to use a tool, such as a calculator or a search engine, and then call that skill from the instructions.

**Share** with the trainees the Awesome Copilot Agents repo, and show them some examples of skills that other people have created.

> https://github.com/github/awesome-copilot

### Instructions (10 mins)

**Explain** that instructions are also important for setting boundaries and guidelines for the agent's behavior, such as what it should and shouldn't do, how it should prioritise tasks, and how it should communicate with the user.

**Highlight** again that these could go into the `.copilot-instructions` file, but that it's often better to keep them separate for clarity and organization.

**Demonstrate** how to create instructions for writing great Python code using the command

> `/create-instructions` > `create instructions for writing great Python code`

**Show** the result and how it will only be triggered when it wants to edit a python file, and how it will guide the agent to write better code.

**Point** the trainees at the Awesome Copilot Agents repo again for examples of instructions that other people have created.

> https://github.com/github/awesome-copilot

### Sub-Agents (10 mins)

Finally, **explain** that we can also create sub-agents that are specialized for certain tasks, and that these can be called from the main agent to help with specific tasks.

**Demonstrate** how to create a sub-agent that is specialized for writing code, and how to call that sub-agent from the main agent when it needs to write code.

> `/create-agent` > `create a sub-agent that is specialized for writing code`

**Ask** the trainees why they might want to create a sub-agent instead of giving the main agent more skills and instructions.

> - It can help to keep the main agent focused and organized
> - It can allow for more specialized and effective behaviour for certain tasks
> - It can make it easier to manage and update the agent's behaviour for specific tasks without affecting the overall behaviour of the main agent.
> - It can also help to reduce the complexity of the main agent's instructions and skills, making it easier to understand and maintain.

### Reinforce

**Highlight** strongly that building good AI infrastructure means setting clear instructions and boundaries for how the AI uses its skills, not only giving it more of them.

**State** that

> Limiting the context window is the single most effective way to get better results from an LLM

**Connect** this back to Capabilities versus Token Burn from week one: a smaller context window is not just better for results, it is cheaper. Every token in the context is re-sent and re-billed on every turn of an agent loop, so trimming context trims the bill as well as sharpening the model's focus.

</LockedContent>
