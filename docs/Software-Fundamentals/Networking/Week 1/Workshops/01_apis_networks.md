---
objectives: ["Describe the relationship between a client and a server", "Define what an API is", "List potential uses for an API", "Use the Network Tab to inspect a network call in Chrome", "List the common HTTP response codes and recall what they mean", "List the common HTTP methods and describe an example of when they would be used"]
module: Networking
week: 1
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent"
import EmbeddedYoutubeVideo from "@theme/EmbeddedYoutubeVideo"

# APIs & Networking

<LearningObjectiveComponent />

## Pre-work

Copy and paste the command below into Slack

```
/prework APIs & Networking
```

### Research

:::info Task

Research the following questions:

1. What is a client?
2. What is a server?
3. What is an API?
4. What is the HTTP(S) protocol? 

:::

### Research

:::info Task

Research common HTTP status codes. What do 403, 404, 500, and 201 signify?

:::

### Explore

GitHub provides an [API](https://docs.github.com/en/rest?apiVersion=2026-03-10) that allows programmatic access to their systems.

:::info Task

Using the [GitHub API documentation](https://docs.github.com/en/rest?apiVersion=2026-03-10), find the URL and HTTP method required to:

1. List all repositories for a named organisation
2. Delete a named repository for a named user

:::

### Answer

:::info Task

Write your response for each task in the prework thread on Slack.

:::

## Workshop

<LockedContent password="ownership">

### Intro (15 mins)

**Elicit** questions from the trainees about client/servers, APIs and HTTP

**Explain** that the internet we use is made up of networks, on top of which we have protocols (HTTP), on top of which we have programs (APIs)

**Ask** specific trainees to answer the following questions:

- What’s a client in the context of computing?
- What’s a server in the context of computing?

- What is an API?

  - What role does it play? Why is it important?
  - What might be some examples of an API?
  - What is an endpoint?

- What is HTTP?
  - What is a HTTP status code?
  - What is a HTTP method?

**Draw** out a diagram that shows the client/server nature of the internet

**Explain** what a HTTP request is

**Use** the Network Tab to inspect a network call in Chrome

**Ask** the trainees to find and explain the status codes for the request

**Talk** through some of the most common status codes

- `1XX` is just informational
- `2XX` is a success
- `3XX` is a redirection
- `4XX` is a client error
- `5XX` is a server error

**Explore** the [GitHub API](https://docs.github.com/en/rest).

**Show** the API reference and how to navigate it.

**Request** different attributes from this API using:

1. Chrome with the JSON Viewer add-on to pretty print the JSON response
2. curl with `curl -v` to view the headers

**Consider** also using `curl` to request a website (google.com) to show how the request is the same but it will return the `html` of the page.

**Read** the following as a group and complete the exercises

:::tip Endpoint Examples

For each HTTP method, URL and response code, you should provide a reasonable guess at the _semantic meaning_ of the request and response from the server. You should write out this meaning in plain English. Remember, everything is built on convention, so there's no reason why:

> POST www.example.com/cakes 201

Couldn't return a picture of a cat or launch a rocket. However, by convention, `POST` creates a resource, and 201 indicates a resource was successfully created. So we can infer:

> "We're trying to add a new cake to example.com. The cake seems to have been successfully added."

Similarly, for:

> GET www.example.com/students 404

> "We're trying to get a list of students from example.com, but the resource that we're looking for could not be found. This could be because it's been deleted or because we're trying to request something that doesn't exist."

:::

**Ask** the trainees to infer the meaning of these endpoints

1. `POST www.example.com/students 400`
2. `GET www.example.com/students 200`
3. `GET www.example.com/students/alice 401`
4. `GET www.example.com/students 500`
5. `PUT www.example.com/students/alice 408`
6. `DELETE www.example.com/students/alice 429`
7. `GET www.example.com/learners 301`
8. `GET www.example.com/coaches 503`
9. `POST www.example.com/coaches 413`
10. `POST www.example.com/lessons 418`

**Finally**, in pairs, ask the trainees to research the following information from the Github API

1. The username of the fifth-ever GitHub user
2. The number of followers for user `kozyrkov`
3. The location of the `github` organisation

</LockedContent>
