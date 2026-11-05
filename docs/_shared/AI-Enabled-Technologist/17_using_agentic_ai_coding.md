
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent';
import LockedContent from "@theme/LockedContent";
import EmbeddedYoutubeVideo from "@theme/EmbeddedYoutubeVideo"

<LearningObjectiveComponent />

## Pre-work

## Workshop

<LockedContent password="agentic!">

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

### Live Example - Assistant vs Agent

**Demonstrate** two approaches to: "Organize project files by feature area and add missing README stubs."

**Show** assistant pattern: repeated Q&A, manual steering.

**Show** agent pattern: scans structure, proposes taxonomy, outlines plan, requests approval, drafts README templates.

**Highlight** that agents propose, plan, and (within limits) act; assistants mostly react.

### Prompt Design - Small prompts

**Explain** that small, specific prompts guide AI behavior for limited tasks and reduce ambiguity.

**Explain** that working with AI is like working with an eager, talented 15-year-old intern: all of the ability but none of the judgment; clear, focused instructions yield best results

**Live code** the example below to show how short, specific instructions get the best results from an AI model.

> - Add Feature 1: Add prices to items
> - Add Feature 2: Calculate total cost
> - Add Feature 3: Generate shopping basket summary

```py
def shopping_basket(items):
    """
    Create a shopping basket summary.

    Parameters:
    items (list of str): List of item names to include in the basket.

    Returns:
    dict: A dictionary with item names as keys and quantities as values.
    """
    basket = {}
    for item in items:
        if item in basket:
            basket[item] += 1
        else:
            basket[item] = 1
    return basket

shopping_basket(['apple', 'banana', 'apple', 'orange', 'banana', 'apple'])
```

### Prompt Design

**Highlight** that, as always, context is key when working with LLMs.

**Show** how in the agent view you can pull in all of the context you need to be able to do the role.

**Show** how you will get poor results when you don't give enough context

**Present** a weak instruction: "Improve code quality."

**Refine** it live into a structured agent directive:

> - GOAL: Raise maintainability of Python services (no functional changes).
> - BOUNDARIES: No external API calls; no deletion of files; propose changes via patch diff.
> - CHECK-INS: After inventory + after first refactor suggestion.
> - SUCCESS: Reduced cyclomatic complexity (≤10 per function) & added missing docstrings.
> - ESCALATE: Any uncertainty about intent.

**Explain** that explicit boundaries + checkpoints prevent silent scope drift.

**Remind** trainees of the Capabilities versus Token Burn discussion from week one. An agent loop re-sends its context with every turn, so token burn compounds: a conversation that touches many files can consume far more tokens than the same task done in a single chat. This is another reason to keep prompts small and boundaries tight, and to consider whether the whole job needs a frontier model or whether a cheaper tier will do.

### Guided Exercise - Designing a Code Quality Agent

**Form** small groups (3-4).

**Provide** scenario: Large codebase suffering from style inconsistency and duplicated utility functions.

**Instruct** groups to draft an agent spec (10-12 min): scope, forbidden actions, required data, human review triggers.

> #### Agent Design Acceptance Criteria
>
> Acceptance criteria
>
> - Single clear mission statement
> - Explicit forbidden actions list
> - At least 2 human approval checkpoints
> - Logging/audit plan (diff summary + rationale)
> - Escalation rule for uncertainty / ambiguity

**Collect** specs and briefly compare boundary clarity.

### Copilot Instructions

**Highlight** that the `.copilot-instructions.md` is key for working with Copilot Agents, as it allows you to set clear boundaries and instructions for the agent to follow.

**Task** the trainees with using AI to generate their own `.copilot-instructions.md` file for this week's coursework

**Ask** the trainees about the instructions they generated, and how they think it will affect the behavior of the agent.

**Ask** the trainees about how important it would be to keep this file up to date, and what the risks would be of it being out of date.

### Human Ownership & Responsibility

**Emphasize** three principles:

> - Human final decision
> - Clear constraints
> - Accountability never delegated

**Discuss** examples: security scan false positives, risky refactors, dependency upgrades, architectural rewrites.

**Warn** that silent agent changes without review create integrity & trust risks.

**Explain** that we'll be looking at that next week

### Conclusion

**Reinforce** that Agentic AI pays off only when ownership, constraints, and review loops are explicit.

**Remind** trainees they remain answerable for outcomes produced by agents.

**Encourage** trainees to plan their prompts carefully before enabling autonomy.

</LockedContent>
