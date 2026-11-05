---
title: 'MCP'
objectives:
  - 'Explain the core problem MCP solves for LLM agents'
  - 'Compare MCP to traditional API-based tool integration for LLM agents'
  - 'Describe what MCP is and how it enables tool use in local LLM environments'
module: Technical-Business-Analyst
week: 4
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from '@theme/LockedContent'
import EmbeddedYoutubeVideo from '@theme/EmbeddedYoutubeVideo'

<LearningObjectiveComponent />

## Pre-work

### Setup

If nobody has done so already, copy and paste this command into Slack.

```
/prework MCP
```

### Research

:::info Task

Before the session, research the following:

- What is the Model Context Protocol (MCP)?
- Who created MCP and when?
- Find one real MCP server and note what it does.

Be prepared to explain MCP in your own words.

:::

### Watch

<EmbeddedYoutubeVideo id="kn6dxL53NkM" />

## Workshop

<LockedContent password="tool-interface-design-system-prompts">

### Part 1: The Problem MCP Solves

#### Teaching a Model to Use an API Is Hard

**Ask** trainees: if you wanted an LLM to call your company's CRM API, what would you need to tell it?

**Gather** responses. Build towards:

> You would need to explain the API in the system prompt - what endpoints exist, what parameters each one takes, what the response looks like, how authentication works, and what to do when things go wrong. Every API is different, so every integration requires a bespoke set of instructions. If the model changes, you write it again. If the API changes, you update it. If you add a second API, you write another block of instructions.

**Explain** the core problem:

> APIs were designed for code, not for language models. Code can be told exactly what to call and when. A language model reasons from descriptions - it needs to understand the purpose and shape of a tool in natural language before it can decide to use it. There is no standard for writing those descriptions, so every integration is custom work.

**Ask**: what happens to the quality of an agent as the number of custom API integrations grows?

> Expected: it gets harder to maintain. The system prompt grows unwieldy. The model may confuse similar-sounding tools. Updating one integration risks breaking another.

### Part 2: What MCP Is

**Introduce** MCP:

> The Model Context Protocol (MCP) is an open standard published by Anthropic in 2024. Its purpose is simple: give every tool a standard way to describe itself to a language model, so the model can discover and use tools without needing bespoke instructions written for each one.

**Explain** how it works:

> An MCP server is a small process that wraps a tool - a database, a file system, a calendar, an API. The server exposes a list of tools in a standard format: each tool has a name, a plain-English description, and a schema for its inputs. When an LLM connects to the server, it reads that list. It now knows what tools are available and what they do - without anyone writing a custom system prompt section for each one.

**Draw** a simple before-and-after on the whiteboard:

> **Before MCP:** Developer writes bespoke instructions in the system prompt for every API the agent needs. Change the model, rewrite the instructions. Add an API, add more instructions.
>
> **After MCP:** Each tool wraps itself in an MCP server. The agent connects and asks "what tools do you have?" The server replies with a standardised list. The agent reads the descriptions and gets to work.

**Ask**: what does this remind you of from other areas of software or technology?

> Expected: USB (any device, any port), app stores (any app, standard distribution), SQL (any database, same query language). MCP applies the same idea - a shared standard eliminates custom wiring between every pair of things.

### Part 3: What It Looks Like in Practice

**Show** a concrete example (display on screen or share):

> Imagine an agent that needs to look up a vendor's compliance status. Without MCP, the developer writes something like this in the system prompt:
>
> _"To look up a vendor, call GET /api/v2/vendors/&#123;id&#125;/compliance with an Authorization header containing the bearer token. The response will be a JSON object with fields: status (string), last_checked (ISO date), flags (array of strings)..."_
>
> With MCP, the compliance tool server advertises itself like this:
>
> ```json
> {
>   "name": "get_vendor_compliance",
>   "description": "Looks up the current compliance status for a vendor. Returns their status, the date of the last check, and any outstanding flags. Use this when you need to verify whether a vendor is approved before proceeding.",
>   "inputSchema": {
>     "type": "object",
>     "properties": {
>       "vendor_id": {
>         "type": "string",
>         "description": "The vendor's unique ID"
>       }
>     },
>     "required": ["vendor_id"]
>   }
> }
> ```
>
> The agent reads this at runtime. No one wrote a bespoke explanation of the endpoint in the system prompt. If the underlying API changes, the MCP server is updated once - not every system prompt that references it.

**Ask**: what is the agent actually reading when it connects to an MCP server? Is it reading code?

> Expected: no - it is reading plain-English descriptions in a format it already understands. The schema tells it what inputs to provide. The description tells it when and why to call the tool.

**Highlight** the local execution benefit:

> MCP servers run as local processes on the same machine as the agent. No data has to leave the building to reach a cloud API gateway. For a legal firm, a hospital, or a bank - where data residency is a hard requirement - this matters.

### Part 4: Demonstration - MCP in Claude

**Explain** what trainees are about to see:

> Claude Desktop supports MCP natively. When you configure an MCP server in Claude's settings, Claude reads its tool list at startup and those tools are available in every conversation - with no system prompt, no API docs copy-pasted in, nothing. You just describe what you want.

**Start** a new Claude conversation with the gmail plugin enabled. Ask: _"What is my most recent email from N8n"_ - Claude calls the Gmail API plugin and returns the result.

**Click** on the thinking parts of the claude output to show the tool call happening

### Part 5: Demonstration - Building MCP Triggered Tools in N8n

**Explain** what trainees are about to see:

> N8n can act as an MCP server. Any N8n workflow can be exposed as a tool that an LLM can call - without writing any code. The workflow becomes the tool. The LLM calls it by name, passes inputs, and receives the output.

**Live code** the following demonstration (facilitator):

1. In N8n, create a new workflow. Add an **MCP Server Trigger** node as the entry point. Give the tool a name (`get_trainee_progress`) and a plain-English description (_"Returns the progress summary for a trainee by their email address. Use this when asked about a specific trainee's completion status."_). Add an email parameter to the input schema.

2. Connect a **Respond to Webhook** node (or a mock response node) that returns a hardcoded JSON object:

```json
{
  "email": "{{ $json.email }}",
  "modules_completed": 4,
  "current_module": "Cloud Engineering",
  "last_active": "2026-05-13"
}
```

3. Activate the workflow and copy the MCP server URL that N8n generates.

4. Paste that URL into Claude Desktop's `claude_desktop_config.json` as a new MCP server entry:

```json
{
  "mcpServers": {
    "trainee-tracker": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://your-n8n-instance/mcp/your-server-id"
      ]
    }
  }
}
```

5. Restart Claude Desktop. Ask: _"What is the progress for alex@example.com?"_ - Claude calls the N8n workflow as a tool and returns the result.

**Ask** trainees: what would you need to change to make this tool query a real database instead of returning hardcoded data?

> Expected: replace the mock response node with a database query node or an HTTP request node. The MCP layer does not change - only the workflow internals change. Claude continues calling the same tool with the same description.

**Instruct** trainees to build their own version in pairs for 15 minutes:

:::info Task

In N8n, create a workflow with an MCP Server Trigger that represents a tool relevant to a business context you know - a support ticket lookup, a stock level check, an employee directory query, or anything else.

Your tool must have:

- A clear name in snake_case
- A plain-English description that tells an LLM when to call it
- At least one input parameter
- A mock response that returns realistic-looking data

You do not need to connect it to Claude. Focus on the tool definition and the response shape.

Be prepared to share your tool name and description with the group.

:::

**Gather** two or three examples. For each, ask the group: if an LLM had only this tool's name and description to go on, would it know when to call it and what to pass?

### Conclusion

**Summarise** the key points:

> - MCP exists because teaching a language model to use every API individually is hard, brittle, and does not scale
> - MCP gives every tool a standard way to describe itself - the model reads the description and decides when to call it, with no bespoke prompt engineering per tool
> - Any N8n workflow can become an MCP tool in minutes using the MCP Server Trigger node - no code required
> - The quality of the tool description determines the quality of the agent's behaviour; the implementation behind the tool can change without touching the LLM

**Signpost**: the tool descriptions you wrote in Workshop 02 are exactly what MCP tool definitions contain. The craft of writing precise, unambiguous descriptions for an agent is the same skill - MCP just gives it a standard home.

</LockedContent>
