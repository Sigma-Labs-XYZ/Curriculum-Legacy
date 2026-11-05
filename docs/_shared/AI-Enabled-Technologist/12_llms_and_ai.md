
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent';
import LockedContent from "@theme/LockedContent";
import EmbeddedYoutubeVideo from "@theme/EmbeddedYoutubeVideo"

<LearningObjectiveComponent />

## Pre-work

### Setup

If nobody has done so already, copy and paste this command into Slack.

```
/prework Background and Learning with AI
```

### Research - Model Pricing

:::info Task

Go to the pricing page of one AI provider that publishes API prices (e.g. Anthropic, OpenAI, or Google). These pages list every model with a price per million tokens, input and output.

On that page, find:

- The cheapest model listed, and what the provider says it is good at
- The most expensive model listed, and what the provider says it is good at

Then estimate the token cost of this task on each of those two models:

- You are asking an AI to plan a refactor of a 2,000-line Python file. The prompt includes the file (roughly 25,000 tokens) plus 500 tokens of instructions, and you expect a 2,000-token response.
- Compute the cost of running this task once on each model.
- Now imagine an agentic tool runs this task 20 times in a loop. Compute the total cost on each model.

Bring your numbers to the session. Prices change often, so treat the exact numbers as a snapshot; the ratio between the models is the point.

Note: not every AI tool exposes per-token prices. Subscription tools like GitHub Copilot or the Gemini app charge per month, not per token - but the underlying models still have per-token costs that the provider pays. If you can't find a price for a tool, that itself is worth noting.

:::

## Workshop

<LockedContent password="ownership">

### Preamble

**Explain** that throughout this course, you will be encouraged to use AI tools and techniques to assist with your learning and project work. This may include using AI to generate code snippets, assist with data analysis, or provide insights into complex topics.

**Explain** We'll be introducing you to the tools in this order

> - Week 1: Sigma Labs _Learning Mode_ & Chat-based LLMs (e.g. Claude, ChatGPT, Gemini, etc)
> - Week 2: Code-based LLMs (e.g. GitHub Copilot, etc)
> - Week 3 + 4: Agentic Coding Assistants (e.g. Devin, GitHub Copilot X, Claude Code, etc)
> - Week 5: Security and Privacy Tools (e.g. tools to detect and prevent PII leakage, prompt injection, etc)
> - Week 6: Spec-Driven Development with AI (e.g. using LLMs to generate code from code specifications, and to generate tests from specifications, etc)
> - Week 7: AI-in-Applications: (e.g. MCP, RAG, etc)

**Tell** the trainees they are welcome and encouraged to bring in other AI tools that you find useful, but please discuss these with your coaches first to ensure they are appropriate for the course.

### Preparation

**Ensure** all trainees can access our [Learning Mode tool](https://tools.sigmalabs.co.uk/tools/learning-mode?new=I%27m%20new%20to%20large%20language%20models%20and%20AI.%20Help%20me%20understand%20the%20fundamentals%20of%20how%20LLMs%20work%2C%20their%20capabilities%20and%20limitations%2C%20and%20how%20I%20can%20apply%20them%20effectively%20in%20real-world%20projects.)

**Ensure** all trainees can access [Google Gemini](https://gemini.google.com/)

### Questions

**Leave** lots of time at the start to answer questions from trainees

**Ensure** that all trainees can define the following terms before proceeding:

> - Large Language Model (LLM)
> - Transformers (i.e. the architecture LLMs are based on)
> - Training Data (i.e. the data LLMs are trained on)
> - Context Window (i.e. how much text the model can consider at once)
> - Token (i.e. pieces of words or characters that LLMs use to process text)
> - Hallucination (i.e. when an LLM generates incorrect or fabricated information)
> - Prompt (i.e. the input text given to an LLM to generate a response)
> - Guardrails (i.e. AI's are trained to avoid certain types of content and how this works)

**Recap** that LLMs don't know anything; they are very good at predicting what text comes next based on patterns in their training data.

### Discuss - Capabilities versus Token Burn

**Introduce** the idea that not all models are equal, and that using AI costs real money.

**Explain** that providers typically offer models in three broad classes:

> - **Small models**: fast and very cheap per token (e.g. Claude Haiku, or the "mini" class of models from other vendors)
> - **Mid-tier models**: a balance of capability and cost (e.g. Claude Sonnet, or the standard models from other vendors)
> - **Frontier models**: the most capable, and the most expensive per token, often by a factor of 10-60x compared to small models (e.g. Claude Opus, or the reasoning models from other vendors)

**Explain** the economics: every prompt and every response is measured in tokens, and providers charge per token. More capable models cost far more per token, and agentic tools multiply this effect because they send many requests in a loop.

**Introduce** the core judgement we want trainees to develop throughout this course:

> Match the model's capability to the difficulty of the task. Use a capable model for critical, complicated work like planning a tricky change. Once the plan is settled and only mechanical implementation remains, switch down to a cheaper model. Burning frontier-model tokens on work a small model could do is waste; asking a small model to do tricky planning is a false economy when the plan turns out to be wrong.

**Stress** that this judgement matters in professional settings: teams and clients pay for the tokens you burn, and being able to justify your model choice is part of being a responsible AI user.

**Collect** a few answers from the pre-work pricing exercise and draw out the takeaway: the same task can cost pennies on the cheapest model and pounds on the most capable one, and the gap multiplies when tools loop. Name the classes for them now: providers typically call these small, mid-tier, and frontier models.

**Tell** trainees that this theme will come up again throughout the course, whenever we face a decision about which model to use for which job.

### Introduction

**Explain** that this session is about using the LLMs as a learning partner, not a replacement for thinking.

**Highlight** that the goal is to practice asking good questions, checking answers, and reflecting on how it feels to learn with an AI.

### The Five-Step Prompting Framework

**Introduce** the fundamental framework for crafting effective prompts. This framework is the foundation for everything else in prompt engineering.

**Present** the five-step framework: **Task, Context, References, Evaluate, Iterate**

**Explain** that prompting is rarely one-and-done. It's a circular process where you start simple and gradually add more detail.

**Demonstrate** with a database design example, building up the prompt one step at a time and highlighting what trainees should notice:

**Iteration 1 (Task only):**

```
"How should I design my database for a movie app?"
```

Output: Too vague. Claude doesn't know what the app does.

**Iteration 2 (add Context - what the app does):**

```
"I'm building a movie review app.
Users can write reviews of movies they've watched.
How should I design my database?"
```

Output: Better. Claude knows it needs movies and reviews, but doesn't know what data you're tracking.

**Iteration 3 (add References - what data you need to store):**

```
"I'm building a movie review app.
Users can write reviews of movies they've watched.
I need to store:
- Movie information (title, release year, genre)
- User reviews (rating, review text, date posted)

How should I design my database?"
```

Output: Claude can suggest tables now, but doesn't know a key relationship.

**Iteration 4 (add a relationship that changes things):**

```
"I'm building a movie review app.
Users can write reviews of movies they've watched.
I need to store:
- Movie information (title, release year, genre)
- User reviews (rating, review text, date posted)
- Users can write MULTIPLE reviews on the same movie

How should I structure my tables?"
```

Output: Claude now understands the relationships and can give you a proper schema.

**Iteration 5 (Evaluate + Iterate - add what you want to verify):**

```
"I'm building a movie review app.
Users can write reviews of movies they've watched.
I need to store:
- Movie information (title, release year, genre)
- User reviews (rating, review text, date posted)
- Users can write MULTIPLE reviews on the same movie
- I want to see all reviews for a specific movie, sorted by rating (highest first)

How should I structure my tables and what columns do I need?"
```

Output: Now Claude can give you a complete schema optimized for your use case.

**Emphasize** the key teaching point: each iteration didn't change the core question. It changed the information available to Claude. By iteration 5, Claude has enough context to give a useful answer instead of generic advice.

### Warm-up with Gemini

**Guide** trainees through a hands-on prompt iteration exercise:

:::info Task

1. Ask Gemini: "What's a good side project I could build?" (simple task)
2. Refine the prompt by adding context: "I know Python and JavaScript. I have 5 hours per week. I want to learn about databases."
3. Iterate again by adding a persona: "Act as a tech mentor and suggest..."
4. Try a constraint: "Suggest something that can be completed in 2 weeks"

Notice how the suggestions become progressively more useful.
:::

**Ask** trainees to share one result that surprised them or seemed helpful.

### Multimodal Prompting

**Explain** that you can interact with modern LLMs using different types of input and output: text, images, audio, video, and code. This is made possible by separate neural networks which will firstly process the media that has been input (audio, video, etc.) into tokens, which the LLM can then work with as normal.

**Highlight** that the same prompting principles apply: specifying the modality and format of your required output matters just as much here as with text prompts. 

**Encourage** the trainees to investigate this functionality in their own time.

### Issues with LLMs

**Introduce** the idea that LLMs can make mistakes (hallucinations) and inherit biases from training data.

**Explain** key concepts:

> - **Hallucinations**: When an AI generates incorrect information while sounding confident. Example: miscounting letters in a word.
> - **Biases**: AI systems trained on human content can reflect human biases around gender, race, and other characteristics
> - **Human-in-the-Loop**: The solution is to always verify outputs and take responsibility for accuracy

**Emphasise** that it is the user's responsibility to check AI outputs for accuracy.

**Provide** a checklist of considerations when using AI responsibly:

> - Is the information factually accurate? (double-check important facts)
> - Does the output reflect any obvious biases?
> - Is the content appropriate for my use case?
> - Have I verified this with a human or authoritative source?
> - Am I violating any privacy policies by using this data?

### Learning Mode

**Posit** that this could be made even better if the AI was told to act in a certain way by default

**Introduce** [Sigma Lab's _Learning Mode_ tool](https://tools.sigmalabs.co.uk/tools/learning-mode)

(Coach Note): if this is down for any reason, run this part using _Gemini "Guided Learning" mode_

**Explain** that

- This is still using an LLM like Gemini, but enhanced for learning in multiple ways:
  - Ahead of your message to the AI, there is a _very_ long prompt built by us to make it a good teacher
  - It has a built in code editor to show and change live python examples
  - It can sketch out diagrams to help explain concepts
  - It has a _memory_ of your learning sessions and which concepts you've ticked that you're comfortable with

**Mention** that it will ask them to complete an onboarding the first time they use it

**Show** an example usage, going through the back-and-forth learning about a topic

- Suggestion: "I want to understand the fundamentals of EC2s and Security Groups"

### Advanced Prompting Techniques

**Introduce** that there are powerful techniques for tackling complex problems with AI.

#### 1. Prompt Chaining

**Explain** that prompt chaining is breaking a complex task into a series of connected prompts, where each output informs the next input.

**Demonstrate** with an example - imagine exploring a movie reviews dataset:

**Step 1: Explore what questions you can answer from your data**

```
"I have a movie reviews dataset with these columns:
- movies: id, title, release_year, genre
- users: id, username, email
- reviews: id, user_id, movie_id, rating (1-10), review_text, date_posted

What interesting business or analytical questions could I answer from this data?"
```

**Step 2: Write SQL queries to answer those questions (using Step 1 output)**

```
"Based on these questions:
[paste Claude's questions from Step 1]

Write me SQL queries to answer the top 5 most interesting ones.
Make sure they're efficient and will give me useful insights."
```

**Step 3: Interpret the results and explore deeper (using Steps 1 & 2)**

```
"I ran the queries from Step 2. Here are my results:

[paste your actual query results]

What patterns or insights do these numbers show?
What follow-up questions should I ask next?"
```

**Highlight** that each step builds on the previous one, allowing for more complex outcomes.

#### 2. Chain of Thought Prompting

**Explain** that Chain of Thought prompting asks the AI to explain its reasoning step-by-step, similar to how a math teacher asks students to "show your work."

**Demonstrate** with a simple addition to any prompt: add the instruction "Explain your thought process step by step"

```
"I want to find users who wrote more than 5 reviews.

My query:
SELECT user_id, COUNT(*) as review_count
FROM reviews
GROUP BY user_id
HAVING COUNT(*) > 5;

Will this work? Explain your thought process step by step."
```

**Show** how this helps because:

- You can see the AI's reasoning
- You can identify where it went wrong (if it did)
- You can provide better feedback for iteration

#### 3. Tree of Thought Prompting

**Explain** that Tree of Thought allows you to explore multiple reasoning paths simultaneously, like branches on a tree.

**Describe** the use case: when you need to evaluate different options or solve abstract problems (brainstorming plot ideas, designing landing pages, etc.)

**Demonstrate** with an example prompt using the movie reviews dataset:

**Step 1: Generate three directions**

```
"I have a movie reviews dataset with movies, users, and reviews.
Generate three completely different analytical questions I could explore:
- Direction A: [one angle on the data]
- Direction B: [different angle]
- Direction C: [third angle]"
```

Claude gives you three options, like:

- Direction A: Which genres get the highest ratings?
- Direction B: Who are the most active reviewers and what do they like?
- Direction C: How do ratings change over time?

**Guide** trainees to pick their favourite option to explore further.

**Step 2: Pick the one you like**

```
"I'm most interested in Direction [A/B/C].
What SQL would I write for this option?
What patterns should I look for? What would this tell me about user behavior?"
```
**Guide** trainees to notice that the other directions weren't wasted work - they could always go back and explore Direction A or C the same way.

### Conclusion

**Recap** the key takeaways:

> - Prompting is a skill that improves with practice and iteration
> - The prompting framework is your foundation
> - Advanced techniques (prompt chaining, Chain of Thought, Tree of Thought) solve complex problems
> - Always verify important information and take responsibility for accuracy
> - Multimodal input/output expands what you can do with AI

**Reinforce** that throughout this course, trainees will use AI as a thinking partner and learning tool, and that their own judgement remains theirs.

**Prompt** for questions and encourage trainees to experiment with these techniques on real tasks they encounter.

</LockedContent>
