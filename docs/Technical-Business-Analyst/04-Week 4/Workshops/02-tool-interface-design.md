---
title: 'Tool Interface Design and System Prompts'
objectives:
  - 'Explain what a tool interface specification is and why precision matters for agent behaviour'
  - 'Write tool interface specifications defining inputs, outputs, and failure modes'
  - 'Identify the elements a system prompt must contain for a compliance-sensitive agent'
  - 'Compare a vague system prompt with a precise one and predict the difference in agent behaviour'
  - 'Write a system prompt that specifies tool sequencing, output format, and escalation conditions'
module: Technical-Business-Analyst
week: 4
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from '@theme/LockedContent'

<LearningObjectiveComponent />

## Pre-work

No Pre-work, as this is an afternoon workshop.

## Workshop

<LockedContent password="tool-interface-design-system-prompts">

### Part 1: Why Tool Descriptions Matter

#### The Agent Reads Your Tool Names

**Explain** how an agent decides which tool to use:

> When an AI agent needs to take an action, it reads the names and descriptions of all available tools and reasons about which one to call. The agent does not see the code inside the tool -- it only sees the description you wrote. If the description is wrong, incomplete, or ambiguous, the agent will make the wrong choice.

**Show** these two tool descriptions side by side (display on screen):

> **Version A:**
>
> Tool name: `checker`
>
> Description: `Checks the vendor document.`
>
> ---
>
> **Version B:**
>
> Tool name: `document_reader`
>
> Description: `Extracts the declared values from a specific vendor document. Use this tool to read the vendor questionnaire, certificate of incorporation, certificate of insurance, bank details form, or risk data handling questionnaire. Returns the key fields from the document in structured JSON. Do not use this tool to look up policy rules or check against prior engagements -- use the other tools for those tasks.`

**Ask**: if the agent has five tools available and needs to read the vendor questionnaire, which description tells it unambiguously to call this tool? Which description tells it when NOT to call this tool?

**Gather** responses. The key point:

> A good tool description tells the agent:
>
> 1. What the tool does
> 2. When to use it
> 3. When not to use it (disambiguation from similar tools)

**Ask**: why does disambiguation matter in a multi-tool agent?

> Expected: with five tools, several might seem superficially relevant to any given step. Without clear boundaries, the agent may call the wrong tool -- or call multiple tools for the same purpose, increasing cost and producing contradictory results.

### Part 2: Anatomy of a Tool Interface Specification

**Introduce** the five components of a complete tool interface specification:

> 1. **Name** -- short, snake_case, verb-noun format. The agent uses this to call the tool.
> 2. **Description** -- what it does, when to use it, when not to use it.
> 3. **Input schema** -- the parameters the tool accepts. For each: name, type, description, whether required.
> 4. **Output schema** -- the structure of the data the tool returns. For each field: name, type, description, possible values.
> 5. **Failure modes** -- what the tool returns if it cannot complete successfully, and what the agent should do.

**Show** the External Verifier specification as a complete example:

> **Name:** `external_verifier`
>
> **Description:** Verifies the vendor's registration status with Companies House and their data protection registration with the ICO. Use this tool after engagement history lookup and document reading, to cross-check declared registration numbers against authoritative external sources. Do not use this tool for checking internal LexCorp policy rules or prior engagement history.
>
> **Input schema:**
>
> - `registration_number` (string, required): the Companies House registration number to verify, as declared in the vendor questionnaire
> - `ico_registration_number` (string, required): the ICO registration number declared in the risk data handling questionnaire
>
> **Output schema:**
>
> - `companies_house.found` (boolean): whether the registration number was found
> - `companies_house.registered_name` (string): the legal name on the Companies House record
> - `companies_house.status` (string): "Active", "Dissolved", or other status
> - `companies_house.address` (string): registered address
> - `companies_house.directors` (array): names of current directors
> - `ico.found` (boolean): whether the ICO registration was found
> - `ico.registered_name` (string): the name on the ICO record
> - `ico.status` (string): "Active" or "Lapsed"
>
> **Failure modes:**
>
> - API unreachable (network error or 5xx): return `{"error": "API_UNAVAILABLE", "message": "Companies House API did not respond"}`. Agent must escalate to HITL -- do not proceed without external verification.
> - Registration not found (404): return `{"found": false}`. This is a meaningful finding, not a failure. Agent should treat this as a HIGH-risk result.

**Ask**: what is the difference between an API failure and a 404 response? Why does the specification treat them differently?

> Expected: an API failure means the check was not performed -- we do not know if the registration is valid or not. A 404 means the check was performed and returned a definitive result -- the registration number does not exist. One is uncertainty; the other is a finding.

### Part 3: Rewrite Exercise

**Instruct** trainees to work in pairs for 15 minutes:

:::info Task

Below is a poorly written tool interface specification for the `cross_reference_checker` tool. Rewrite it to the standard demonstrated above. Your rewrite must include: name, description (with disambiguation), input schema (at least two parameters), output schema (at least four fields), and at least one failure mode.

**Poorly written specification:**

Tool name: `checker2`

Description: `Checks the documents against the rules.`

Input: vendor name

Output: pass/fail

:::

**Gather** the rewrites. Common improvements to highlight:

- Renaming to `cross_reference_checker` (descriptive, not positional)
- Description clarifies it compares extracted document values against retrieved policy rules -- not against all 17 rules at once
- Input should include the extracted findings AND the relevant policy rules retrieved from the knowledge base, not just the vendor name
- Output should return a list of findings, not a binary pass/fail (a compliance check cannot be binary)
- Failure mode: what if the policy knowledge base retrieval returns no rules?

**Show** a model answer:

> **Name:** `cross_reference_checker`
>
> **Description:** Compares extracted values from vendor documents against the relevant procurement policy rules retrieved from the knowledge base. Use this tool after document reading and external verification, once you have both the extracted document values and the relevant policy rules. Do not use this tool to retrieve policy rules (use the policy knowledge base for that) or to look up prior engagement history.
>
> **Input schema:**
>
> - `extracted_values` (object, required): the structured values extracted from vendor documents -- registration number, insurance status, bank account name, ICO number, etc.
> - `policy_rules` (array, required): the relevant policy rules retrieved from the knowledge base for the findings identified so far
>
> **Output schema:**
>
> - `findings` (array): list of identified discrepancies. Each finding has:
>   - `rule_id` (string): e.g. "R01"
>   - `description` (string): plain-English description of the discrepancy
>   - `severity` (string): "HIGH", "MEDIUM", or "LOW"
>   - `evidence` (string): the specific document values that triggered the finding
> - `finding_count` (integer): total number of findings
>
> **Failure modes:**
>
> - No policy rules provided: return `{"error": "NO_RULES_PROVIDED"}`. Agent must re-query the policy knowledge base before calling this tool.

### Part 4: System Prompt Engineering

#### The Components of a Compliance System Prompt

**Explain** that the system prompt is the contract between you and the agent:

> A system prompt for a compliance agent must specify: the agent's role and identity, the sequence in which tools should be called, the output format the agent must produce, and the escalation conditions under which human review is required. If any of these are missing, the agent's behaviour in edge cases is unpredictable.

**Show** a vague system prompt:

> _"You are a vendor screening agent. Review the vendor documents and identify any issues. Use the available tools to help you."_

**Ask**: what is missing from this prompt? List as many gaps as you can find.

**Gather** responses. The list should include:

> - No tool sequence specified -- the agent decides the order, which will vary between runs
> - No output format -- findings may be returned as prose, as a table, as JSON -- inconsistently across runs
> - No escalation conditions -- when should the agent stop and ask for human review?
> - No definition of "issues" -- what counts as a finding? What severity levels exist?
> - No instruction about what to do with API failures

**Show** a precise system prompt:

> _"You are a vendor compliance screening agent for LexCorp Partners. You screen vendor applications against the LexCorp Vendor Procurement Policy (LCP-PROC-004 v2.1). You must use tools in the following sequence for each application:_
>
> _1. engagement_history_lookup -- check for any prior applications from this vendor_ > _2. document_reader -- extract values from each vendor document in turn_ > _3. external_verifier -- verify Companies House and ICO registration_ > _4. cross_reference_checker -- compare extracted values against retrieved policy rules_ > _5. risk_tier_calculator -- calculate the overall risk tier_
>
> _You must produce your final output as a JSON object with the following fields: vendor_name, risk_tier (LOW / MEDIUM / HIGH), findings (array of objects with rule_id, description, severity, evidence), external_verification (companies_house_result, ico_result), recommendation (APPROVE / DECLINE / ESCALATE), and escalation_required (boolean)._
>
> _You must set escalation_required to true if: the risk tier is HIGH, any external API returns an error, or you identify conflicting information that requires human judgement. Do not produce a recommendation if escalation_required is true -- stop and return the findings to date."_

**Ask**: which version would produce consistent output across 500 vendor applications? Which version would you be comfortable showing to the SRA as evidence of a controlled process?

**Ask** trainees: if you ran the vague prompt on 10 applications and the precise prompt on the same 10, what differences would you expect to see?

> Expected: vague prompt -- varying output formats, different tool call sequences each run, inconsistent severity labels, some runs produce no JSON. Precise prompt -- structured JSON every run, same tool sequence, escalation flags appear consistently.

### Part 5: Pop Quiz

**Ask** trainees (cold-call or random selection):

> 1. A tool description says "Use this tool to check things". What is wrong with this?
>
>    _Expected: it gives the agent no information about when to use the tool vs the other available tools. "Things" is undefined. The agent cannot make a sensible call decision._
>
> 2. Your system prompt does not specify output format. The agent runs 50 times. What do you expect to see?
>
>    _Expected: inconsistent output -- some JSON, some prose, some tables. Fields named differently across runs. The agent picks whatever format seems natural for each run based on the prompt._
>
> 3. When should `escalation_required` be set to true in the LexCorp agent?
>
>    _Expected: when risk tier is HIGH; when any external API returns an error (not just 404); when there are conflicting signals the agent cannot resolve._

### Conclusion

**Summarise** the key points:

> - A tool description is not documentation for a human -- it is an instruction for the LLM. Vague descriptions lead to wrong tool calls.
> - A complete tool interface specification includes name, description (with disambiguation), input schema, output schema, and failure modes.
> - A compliance system prompt must specify tool sequence, output format, and escalation conditions -- not just the agent's role.
> - Precise system prompts produce consistent enough behaviour to be used as compliance evidence. Vague prompts do not.

**Signpost**: in Phase 2 of the challenge, you will write tool interface specifications for all five LexCorp vendor screening tools. In Phase 3, you will write the system prompt that connects them. The quality of that work directly determines whether the agent produces auditable, compliant output.

</LockedContent>
