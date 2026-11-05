
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent';
import LockedContent from "@theme/LockedContent";
import EmbeddedYoutubeVideo from "@theme/EmbeddedYoutubeVideo"

<LearningObjectiveComponent />

## Pre-work

### Install

In order to code with AI, you'll need some extensions installed.

:::info Task

Check that you have the `GitHub Copilot` and `GitHub Copilot Chat` VSCode extensions installed and enabled.

Enable Chat Completions in VSCode.

:::

### Consider

:::info Task

Think through how you've used AI in the past week

- What did you do that worked well?
- What did you do that didn't work well?
- What have you found frustrating about using AI tools?
- What has saved you the most time?

:::

## Workshop

<LockedContent password="ownership">

### Review

**Ask** trainees to share their experience with AI code writing so far. What tools have they used? What have they used them for? How did it go?

**Gather** answers to the pre-work questions on a shared board, and look for common themes.

### Setup

**Create** a new project in an empty folder with a virtual environment activated.

**Check** that you have Copilot suggestions and chat enabled in VSCode.

**Instruct** trainees to get same setup: Copilot enabled, a new folder, a new `.venv`.

### Code completion

**Explain** that one criticism/dismissal of AI is that it's a fancy autocomplete

**Highlight** that this is at best an oversimplification, but that autocompletion is one thing that can be done with AI.

**Note** that 'a fancy autocomplete' can still be useful.

**Explain** that we want to write a function that converts a list of names into a list of email addresses. We want to use code completion to help us write it.

**Demonstrate** the power of code completion by slowly typing the below signature, showing how the suggestions improve as more context/detail is provided.

```py
def convert_names_to_emails(names: list[str]) -> list[str]:
```

**Accept** all suggestions after this (including the docstring) until the function is complete.

**Ask** trainees: is this the code we wanted to write? Are there inputs it would not work for?

**Discuss** the completed code. Does it meet our initial aim? Has the AI understood our intention well enough?

**Edit** the docstring and regenerate the function to show how the context changes the completion, resulting in functions with different behaviour.

### Quality in is quality out

**Warn** that AI code completion is only as good as the information you pass it.

**Demonstrate** by writing a function with no clear meaning:

```py
def func(x, f, p1, p2, seq):
```

**Highlight** that the AI's suggestions are absent or unhelpful; if you're not clear on what you're writing, and you don't communicate that clearly, it won't be able to help you.

**State** that good code is good code whether you use AI or not. If you want the AI to be useful, you should be giving it a high-quality starting point.

**Remind** trainees of the Capabilities versus Token Burn discussion from the first week: completion tools typically run on cheaper models, which is why context quality matters here. A cheap model given poor context produces poor suggestions, and every wasted suggestion is tokens you burned for nothing.

**Ask** the trainees what this means in practice. What should they be doing to get the best out of AI code completion?

> - Small functions
> - Precise names
> - Useful type hints
> - Clear docstrings
> - Clear comments where necessary
> - Clear structure to the codebase
> - etc

### Challenge

**Challenge** trainees to use code completions to write the below code using AI. They should avoid writing anything in the function body, focusing only on signature and docstrings. Everything else should be code completions.

- A function that returns `True` if a given URL is valid.
- A function that finds all the outliers in a given list of numbers.
- A class that represents a social event that users can sign up to and get notifications.

**Grant** trainees ~5 minutes to complete this work.

**Gather** trainees back together and discuss the experience. How did they find it? What pitfalls/tricks did they find?

### PAA

**Target** a random trainee and ask them to explain, line-by-line, the code they wrote for the first task in the above challenge ("A function that returns `True` if a given URL is valid."). Do they understand it? Do they know how it works?

**Point** out that "AI wrote it" is not a convincing excuse to a future manager who wants to know why you pushed broken/unhelpful code.

**Introduce** the Prompt--Assess--Apply (PAA) workflow:

- **Prompt** the AI completion with starting information (e.g. a function signature)
- **Assess** the suggestions. Are they appropriate? Do you need to tweak the prompt?
- Once you are satisfied with your understanding, and if the code does what you need, **Apply** the suggestion

**Remind** trainees that using AI code completion is still you writing code; you shouldn't accept the suggestions blindly just as you shouldn't blindly paste in code you found online.

**Stress** that, while AI can speed up the time taken to write code, trainees will still need to spend time evaluating and improving it.

### Chat

**Demo**, briefly, the Copilot chat, showing that it's aware of the code.

**Suggest** that trainees use the chat to help with PAA; the AI can make suggestions or explain syntax as required.

**Note** that the AI does have suggestions; the code completion hasn't resulted in perfect/well-styled code.

**Reinforce** the idea that these tools are powerful when used well, but they're an enhancement to, not a replacement for, developer skills.

### Enforcing Style

**Ask** the trainees how the AI knows what kind of style to write in. How does it know whether to use snake_case or camelCase? How does it know how to format docstrings?

> It doesn't. It makes guesses based on the context you give it. If you write a function in snake_case, it's more likely to continue writing in snake_case. If you write a docstring in a certain style, it's more likely to continue in that style.

**Explain** that we can be more explicit for the style and boundaries of our by writing a `copilot-instructions.md` file in the `.github` folder.

**Create** a `.github/copilot-instructions.md` file with the following content:

```md
# GitHub Copilot Instructions

## Style

- Use snake_case for function and variable names.
- Use 4 spaces for indentation.
- Write docstrings in the Google style.
- Use deliberately verbose names for variables, e.g. `this_is_a_variable_name_that_could_be_longer_but_is_still_reasonable` to make their purpose obvious
```

**Show** how this changes the code that is generated by the AI.

**Task** the trainees with writing their own `copilot-instructions.md` file to enforce their preferred style. Give them 3-5 minutes to do this.

### Challenge

**Challenge** trainees to build a program to meet the following use case:

> A simple Python script that, when run, displays 5 historical events that happened on this day of the year. Only events from more than 200 years ago should be displayed. The script should be simple and easy to maintain, with no unneeded complexity.

**Instruct** trainees to use the AI completions and chat to do the majority of the work, rather than trying to code it all themselves. The best way to get comfortable with a tool is to practice.

**Remind** trainees that this challenge should, of course, result in high-quality code that they fully understand.

### Conclusion

**State** that AI tools can increase the speed of development; a developer using AI well can move much faster than one who isn't.

**Warn** that using AI isn't automatically effective; if you don't take the time to understand what the code does, you'll slow down over time and struggle to extend your work.

**Encourage** trainees to explore these tools further, to work out the quirks, and to use them to accelerate.

### Reviewing Code with AI

**Note** that AI can also be used to review code, either by asking it to review your code and give feedback, or by asking it to review a pull request.

**Demonstrate** this by selecting some code, hovering on it and selecting `Review`

**Watch** as the AI gives feedback on the code, and suggests improvements.

</LockedContent>
