---
title: 'Architect'
module: Advanced-Data
---

This role is designed to give a high level overview of the project and to make sure that all of the part fit together. It is this roles responsibility to not only ensure that high level design decisions are made (e.g. database design, API design) but that all of the engineers in the team understand how they work.

## RACI (Responsible, Accountable, Consulted, Informed)

Below is a list of activities that the this role is accountable for being completed. It is worth noting, that this doesn't mean this role **has** to do all of these things themselves, but they are accountable for ensuring that they are done.

- Make architecture design decisions such as designing how pipelines are orchestrated
- Communicating with [Engineers](./engineer.md) to ensure that design decisions are respected
- Making sure tickets written by [Project Managers](./project_manager.md) are up to date with decisions made
- Setting up version control for the team (i.e. Git & Github)
- Choosing a code style for the project (e.g. https://devguide.python.org/documentation/style-guide/) and making sure everyone follows it
- Making [CI/CD pipleines](https://www.geeksforgeeks.org/devops/what-is-ci-cd/) so that code is automatically deployed on every commit

## Tips

- You should be the final decision maker - that **doesn't** mean you alone should make decisions. Work as a team.
- Try to take a high level view of the project. How will everything fit together?
- Try to setup "Automated Deployment" linked to the Github repository. This means your team will never have to deploy and changes can be seen online immediately.

## Common Pitfalls

Lots of people run into the same issue with this role, for example

- Not communicating architecture design decisions to the whole team
- Not working with other team members to help them make decisions
- Not considering how the frontend and backend will communicate

## Useful Resources

- 🔗 [What does a data architect do and why do you need one?](https://www.cloverdx.com/blog/what-does-a-data-architect-do)
- 🔗 [What is deployment automation?](https://www.redhat.com/en/topics/automation/what-is-deployment-automation)
