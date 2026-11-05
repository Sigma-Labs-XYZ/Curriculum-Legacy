---
objectives:
  [
    'Describe what MCP is and how it can be used to integrate AI into applications',
    'Identify the key components of MCP and their roles in AI integration',
    'Describe Structured Output and how it can be used to control AI responses',
    'Describe Retrieval Augmented Generation and how it can be used to enhance AI responses with external data',
    'Describe Vector DBs and Embeddings and how they can be used to store and retrieve information for AI applications (in the context of RAG)'
  ]
module: AI-Enabled-Technologist
week: 1
workshop: true
title: Using AI in Applications
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent';
import LockedContent from "@theme/LockedContent";
import EmbeddedYoutubeVideo from "@theme/EmbeddedYoutubeVideo"

<LearningObjectiveComponent />

## Pre-work

## Workshop

<LockedContent password="ownership">

### Reflect

**Explain** that one final time, we'll be reflecting on our experiences with using AI in the past week before we dive into the content for today's workshop.

**Gather** reflections from trainees on their experiences with using AI over the past week.

### Introduction

**Ask** trainees whether they have used any AI-powered features inside applications (e.g. autocomplete in email, smart search, chatbots on websites).

**Gather** a few examples and write them on the board.

**Explain** that today's session looks at three key technologies that developers use to integrate AI into real applications.

> 1. **MCP (Model Context Protocol)** - a standard way to connect AI models to external tools and data sources.
> 2. **Structured Output** - controlling the format of AI responses so applications can reliably use them.
> 3. **RAG (Retrieval Augmented Generation) with Vector DBs and Embeddings** - giving AI access to specific, up-to-date information it was not trained on.

**Highlight** that none of these require trainees to build or train their own AI model. They are all about making existing AI models more useful inside real software.

**Ask** whether anyone has questions about what these three areas are before getting started.

**Wait** for questions.

### Group research task

**Explain** that trainees will split into three groups. Each group will be assigned one of the three technology areas to research.

**Group** the trainees into groups of 3-4 people. Try to mix backgrounds and experience levels if possible.

**Assign** each group one of the following topics:

| Group   | Topic                              | Key learning objectives                                                                                                                                               |
| ------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Group 1 | **MCP (Model Context Protocol)**   | Describe what MCP is and how it can be used to integrate AI into applications. Identify the key components of MCP and their roles.                                    |
| Group 2 | **Structured Output**              | Describe Structured Output and how it can be used to control AI responses.                                                                                            |
| Group 3 | **RAG, Vector DBs and Embeddings** | Describe RAG and how it enhances AI responses with external data. Describe Vector DBs and Embeddings and how they store and retrieve information for AI applications. |

**Instruct** each group to spend 10 minutes researching their topic

**Explain** that they will be presenting what they found to the rest of the trainees, so they should focus on understanding the key concepts and being able to explain them clearly.

**Suggest** that each group should try to answer the following questions:

> - What is this technology and what problem does it solve?
> - How does it work at a high level?
> - What is a real-world example of it being used?
> - What are the benefits and limitations?

**Grant** trainees 10 minutes to research in their groups.

### Group presentations and discussion

**Gather** trainees back together.

**Explain** that each group will now present what they found. After each presentation, the coach will fill in any gaps and ask follow-up questions to make sure the key concepts are covered.

#### Group 1 - MCP (Model Context Protocol)

**Ask** Group 1 to present what they found about MCP.

**Wait** for the group to finish presenting.

**Ensure** the following key points are covered. If the group missed any, fill in the gaps:

> **What MCP is:**
>
> - MCP stands for Model Context Protocol. It is an open standard (created by Anthropic) that defines how AI models connect to external tools, data sources, and services.
> - Think of it as a universal adapter, like USB-C for AI. Instead of building a custom integration for every tool, MCP provides a single, consistent interface.
>
> **The problem it solves:**
>
> - Without MCP, every AI integration is bespoke. If you want your AI assistant to read your calendar, search your documents, and query a database, you would need to build three separate integrations with different formats and protocols.
> - MCP standardises this so that tool providers build one MCP server and any MCP-compatible AI client can use it.
>
> **Key components:**
>
> - **MCP Host** - the AI application that wants to use external tools (e.g. Claude Desktop, VS Code with Copilot, a custom chatbot).
> - **MCP Client** - the part of the host that manages the connection to MCP servers. Each client maintains a 1:1 connection with a server.
> - **MCP Server** - a lightweight program that exposes specific capabilities (tools, resources, prompts) over the MCP protocol. For example, a GitHub MCP server exposes tools like "create issue" or "list pull requests."
> - **Tools** - functions that the AI can call via the server (e.g. "search database", "send email").
> - **Resources** - data the AI can read via the server (e.g. file contents, database records).
>
> **Real-world example:**
>
> - In VS Code, GitHub Copilot uses MCP servers to interact with databases, APIs, and cloud services directly from the chat interface.
> - Claude Desktop can connect to local MCP servers that read files on your computer or query a company wiki.
>
> **Benefits and limitations:**
>
> - Benefit: one standard means tools are reusable across different AI clients.
> - Benefit: tool developers only need to build one integration, not one per AI platform.
> - Limitation: MCP is still relatively new, so not all tools have MCP servers yet.
> - Limitation: security is important; MCP servers can access sensitive data, so they need to be configured carefully.

**Ask** trainees whether they can think of a tool at work that could be exposed as an MCP server.

**Discuss** a couple of examples briefly.

#### Group 2 - Structured Output

**Ask** Group 2 to present what they found about Structured Output.

**Wait** for the group to finish presenting.

**Ensure** the following key points are covered. If the group missed any, fill in the gaps:

> **What Structured Output is:**
>
> - Structured Output is a feature offered by AI model providers (like OpenAI) that forces the model to return its response in a specific, predefined format, typically JSON that matches a schema you provide.
> - Instead of getting free-form text that you have to parse, you get reliable, machine-readable data every time.
>
> **The problem it solves:**
>
> - AI models normally return natural language text. That is great for conversations but terrible for software.
> - If your application asks an AI to extract data from an email and you need the result as `{ "name": "...", "date": "...", "amount": "..." }`, a normal AI response might give you a paragraph of text, or JSON with unexpected field names, or sometimes valid JSON and sometimes not.
> - Structured Output guarantees the response will always match your schema.
>
> **How it works:**
>
> - You define a JSON Schema describing the shape of the response you want.
> - You send this schema along with your prompt to the AI model.
> - The model is constrained to only produce output that conforms to your schema.
> - This is not the same as just asking the model nicely to return JSON; it is enforced at the model level.
>
> **Real-world example:**
>
> - An expense reporting tool asks an AI to extract receipt data. The schema requires fields for `merchant`, `date`, `amount`, and `currency`. The response is guaranteed to contain exactly those fields.
> - A customer support system uses structured output to classify incoming tickets into categories, urgency levels, and suggested actions, all as reliable JSON the system can route automatically.
>
> **Benefits and limitations:**
>
> - Benefit: your application code can rely on the response shape; no fragile parsing or error handling for unexpected formats.
> - Benefit: makes AI usable in automated pipelines where unreliable output would break downstream systems.
> - Limitation: not all models support it; you need to use a provider that offers this feature.
> - Limitation: the AI can still produce incorrect _values_ even if the _structure_ is correct (e.g. extracting the wrong date from a receipt).

**Ask** trainees to think of a situation where an AI returns free-form text and it would be more useful as structured data.

**Discuss** why format reliability matters when AI is part of a larger software system rather than a standalone chatbot.

#### Group 3 - RAG, Vector DBs and Embeddings

**Ask** Group 3 to present what they found about RAG, Vector DBs, and Embeddings.

**Wait** for the group to finish presenting.

**Ensure** the following key points are covered. If the group missed any, fill in the gaps:

> **What RAG is:**
>
> - RAG stands for Retrieval Augmented Generation. It is a technique where you first _retrieve_ relevant information from an external source, then _augment_ the AI's prompt with that information before it _generates_ a response.
> - Think of it as giving the AI a cheat sheet of relevant facts before asking it to answer a question.
>
> **The problem it solves:**
>
> - AI models are trained on data up to a cutoff date. They do not know about your company's internal documents, your latest product updates, or anything that happened after training.
> - Fine-tuning a model on your data is expensive, slow, and needs to be repeated whenever data changes.
> - RAG lets you give the model access to current, specific information without retraining it.
>
> **How it works at a high level:**
>
> 1. Your documents are split into chunks and converted into **embeddings** (numerical representations that capture meaning).
> 2. These embeddings are stored in a **vector database**.
> 3. When a user asks a question, the question is also converted into an embedding.
> 4. The vector database finds the document chunks whose embeddings are most similar to the question embedding.
> 5. Those relevant chunks are added to the AI's prompt as context.
> 6. The AI generates a response using both its training knowledge and the retrieved context.
>
> **What embeddings are:**
>
> - An embedding is a list of numbers (a vector) that represents the meaning of a piece of text.
> - Texts with similar meanings have similar embeddings; they are close together in vector space.
> - For example, "How do I reset my password?" and "I forgot my login credentials" would have very similar embeddings even though they use different words.
>
> **What a vector database is:**
>
> - A vector database is a specialised database designed to store and search embeddings efficiently.
> - Unlike a traditional database that searches by exact matches or keywords, a vector database finds results by _similarity_; it answers "what stored items are most similar to this query?"
> - Examples: Pinecone, Weaviate, ChromaDB, pgvector (a PostgreSQL extension).
>
> **Real-world example:**
>
> - A company builds an internal help desk chatbot. All company policy documents are embedded and stored in a vector database. When an employee asks "What is the parental leave policy?", the system retrieves the relevant policy chunks and the AI answers using that specific information, not a generic guess.
>
> **Benefits and limitations:**
>
> - Benefit: the AI can answer questions about your specific data without retraining.
> - Benefit: information can be updated by re-embedding new documents; no model changes needed.
> - Benefit: reduces hallucination because the AI has real source material to reference.
> - Limitation: the quality of answers depends on the quality of retrieval; if the wrong chunks are retrieved, the answer will be wrong.
> - Limitation: embedding and storing large document collections takes effort and ongoing maintenance.
> - Limitation: there is a context window limit; you can only pass so many retrieved chunks to the model at once.

**Ask** trainees what kind of company data might be useful to make available to an AI via RAG.

**Discuss** the difference between RAG (retrieve and inject context) and fine-tuning (retrain the model). Emphasise that RAG is usually the better starting point because it is cheaper, faster, and easier to update.

**Remind** trainees of Capabilities versus Token Burn from week one: the same judgement applies inside your applications. Inference cost per query depends on the model tier you call, so a well-designed RAG pipeline feeding a small model often answers retrieval questions better, and at a lower cost, than a frontier model guessing without context. When you build AI features, the model tier you call per request is a cost decision you own.

### Connecting the technologies

**Explain** that these three technologies are not alternatives; they are often used together in real AI applications.

**Show** a simple example of how they might connect:

> Imagine a customer service chatbot:
>
> 1. A customer asks "What is your returns policy for electronics purchased in the last 30 days?"
> 2. **RAG** retrieves the relevant returns policy document chunks from a vector database.
> 3. The policy chunks are added to the AI's prompt as context.
> 4. **Structured Output** ensures the AI responds with a JSON object containing `{ "eligible": true, "return_window_days": 30, "conditions": [...], "summary": "..." }` so the frontend can display it clearly.
> 5. The chatbot is connected via **MCP** so the AI can also call a "check order status" tool to verify the customer's purchase date.

**Ask** trainees whether this combined example makes sense and if they can think of another scenario where all three would be useful.

### Conclusion

**Reinforce** the three key takeaways:

> - **MCP** standardises how AI connects to external tools and data, like a universal plug.
> - **Structured Output** makes AI responses reliable and machine-readable, which is essential for production software.
> - **RAG with Vector DBs** gives AI access to your specific, current data without retraining, and is the most common way to make AI "know" about your business.

**Remind** trainees that none of these require building an AI model from scratch. They are all techniques for making existing models more useful in real applications.

**Ask** whether there are any final questions.

</LockedContent>
