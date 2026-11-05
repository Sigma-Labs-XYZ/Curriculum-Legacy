---
title: 'RAG and Vector Stores in N8n'
objectives:
  - 'Explain what retrieval-augmented generation (RAG) is and why it is used instead of pasting documents into a prompt'
  - 'Describe how text embeddings enable similarity-based retrieval'
  - 'Build a vector store in N8n and load it with a small email corpus'
  - 'Evaluate retrieval quality by testing queries and analysing which chunks are returned'
  - 'Explain why an email assistant may use two separate vector stores rather than one'
module: Technical-Business-Analyst
week: 4
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from '@theme/LockedContent'

<LearningObjectiveComponent />

## Pre-work

### Research

:::info Task

Before the session, research the following concepts:

- What is a context window
- Context window limits in large language models
- The issues that arise when working with large context windows

:::

### Consider

:::info Task

Consider the following question:

> Imagine you are building an email assistant that helps a team search a shared inbox with hundreds of past messages. You could paste the entire email archive into the system prompt every time someone asks a question. What problems does this cause?

:::

## Workshop

<LockedContent password="rag-and-vector-stores-n8n">

### Part 1: Why RAG?

#### The Context Window Problem

**Ask** trainees: from the prework, what problems arise when you paste a large document into the system prompt?

**Gather** responses. Build towards:

> - Cost: every token in the system prompt costs money on every call. Pasting dozens of long email threads into every run multiplies the cost quickly.
> - Context window limits: large models have long context windows, but they still perform worse when a single relevant sentence is buried inside many irrelevant emails.
> - Maintenance: as the inbox changes, you update the vector store with new emails rather than rewriting a giant prompt.
> - Precision: an assistant that receives only the two or three relevant emails for a query reasons better than one that receives an entire mailbox dump.

**Explain** the RAG approach:

> Instead of pasting the whole archive, you embed each email or email chunk into a vector store. When the assistant needs to answer a question, it queries the store with that question. The store returns the two or three most relevant emails. The assistant reasons against those -- not against the whole mailbox at once.

#### What is an Embedding?

**Explain** embeddings without maths:

> An embedding model converts a piece of text into a list of numbers -- a vector. Similar text produces similar vectors. "Can you resend the invoice for March?" and "I cannot find last month's invoice attachment" are about related subjects, so their vectors will be closer together than either is to "the team lunch is on Friday".

**Show** a simplified visualisation (or draw on a whiteboard):

> Imagine a 2D map. In reality, embeddings are vectors with hundreds of dimensions -- but the principle is the same. On this map:
>
> - "Subject: Missing invoice for March" sits near the top-left
> - "Subject: Please resend invoice INV-2041" sits nearby
> - "Subject: Reminder about Friday social" sits in a different cluster
>
> When the assistant queries with "invoice email", the vector store finds the closest neighbours. The invoice messages are returned. The Friday social email is not.

**Ask**: why is this more reliable than a keyword search? What would a keyword search miss?

> Expected: keyword search might miss "billing statement" if the query says "invoice", or miss "leave request" if the search asks for "annual leave". Embedding-based search is semantic -- it finds meaning, not just exact words.

**Wait** for questions before moving to the build exercise.

### Part 2: Build a Vector Store in N8n

**Instruct** learners to open N8n. They will build a simple RAG retrieval pipeline to answer questions about a shared email inbox.

#### Step 1: Plan the Structure

**Walk through** what they are building:

> 1. A Chat Trigger node (to accept queries)
> 2. A Vector Store node (to store and retrieve email chunks)
> 3. A response node to display the retrieved emails

The goal for this exercise is not yet to connect the vector store to an AI Agent node -- the goal is to test retrieval quality in isolation before trusting it inside an agent.

#### Step 2: Set Up the Vector Store

**Demonstrate** adding an in-memory Simple Vector Store node. If Pinecone credentials are available, use those instead -- but the in-memory store works identically for this exercise.

**Explain** chunking:

> Before embedding, the document must be split into chunks. Each chunk is embedded separately. The size of the chunk matters: too small and you lose context; too large and you reduce retrieval precision. For short emails, one email per chunk is often a natural strategy.

**Provide** learners with six emails to use as their documents (so they do not have to import a full mailbox manually):

```
E01: Subject: Missing invoice for March
From: jamie@northstar-design.co.uk
Body: Hi team, I cannot find the March invoice in the thread below. Could you resend invoice INV-2041 when you get a chance?

E02: Subject: Laptop delivery address
From: priya@company.io
Body: My new starter begins on Monday. Please send the laptop to 19 Park Lane, Bristol, BS1 4DJ.

E03: Subject: Annual leave request
From: luca@company.io
Body: I would like to book annual leave from 12 August to 16 August. Please confirm whether this overlaps with the release week.

E04: Subject: Password reset not working
From: aisha@company.io
Body: I reset my password this morning but I am still locked out of the CRM. The error says my account is disabled.

E05: Subject: Friday social reminder
From: people-team@company.io
Body: Reminder that the Friday social starts at 4pm in the kitchen. There will be pizza and soft drinks.

E06: Subject: Updated bank details
From: finance@riverstone-labs.com
Body: Please update our bank details before the next payment run. The new account name is Riverstone Labs Operations Ltd.
```

**Instruct** learners to add each email as a separate document in the vector store using a Document Loader set to raw text input, or a Code node that returns an array of document objects.

#### Step 3: Test Retrieval

**Instruct** learners to run the retrieval stage with the following test queries. For each query, they should record which emails are returned:

| Query                                                 | Expected emails |
| :---------------------------------------------------- | :-------------- |
| "I need the March invoice resent"                     | E01             |
| "Where should the new starter laptop be delivered?"   | E02             |
| "Who asked for time off in August?"                   | E03             |
| "Who is locked out after a password reset?"           | E04             |
| "What time does the Friday social start?"             | E05             |
| "Which email mentions changing bank account details?" | E06             |

**Grant** learners 15 minutes to configure and run the retrieval tests.

**Circulate** and watch for:

- Learners who get no results because the vector store has no data loaded (common: they added the node but did not run the population step first)
- Queries that return the wrong email because the chunk text was too generic
- Learners confused by the difference between the vector store population step and the retrieval query step

**Gather** the class back. **Ask**: did every query return the expected email? Where did retrieval fail and why?

### Conclusion

**Summarise** the key points:

> - RAG allows an assistant to work with a large email archive without paying the cost of full-mailbox context on every run
> - Embedding quality and chunking strategy directly affect retrieval quality -- the assistant can only reason about what the vector store returns
> - Two vector stores with distinct purposes are better than one mixed store because email evidence and guidance material serve different jobs
> - Retrieval quality must be tested before connecting the store to an agent -- a silent retrieval failure produces wrong answers with no error message

**Signpost**: in Phase 3 of this week's challenge, you will build vector stores that support an agent's retrieval behaviour. The quality of your retrieval setup directly determines the quality of the agent's answers.

</LockedContent>
