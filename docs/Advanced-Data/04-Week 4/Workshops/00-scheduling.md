---
title: Scheduling
objectives:
  [
    'Describe what `cron` is and how it is used',
    'Read and interpret `cron` expressions',
    'Write `cron` expressions to schedule tasks',
    'Describe AWS EventBridge and list the benefits of using it',
    'Schedule tasks using EventBridge'
  ]
module: Advanced-Data
week: 4
workshop: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

<LearningObjectiveComponent />

## Pre work

### Set up

If nobody has done so already, copy and paste this command into Slack.

```
/prework Scheduling
```

### Case study

:::info Task

Read this week's [case study](../01-case-study.md).

What questions do you have? What issues do you anticipate?

:::

### Research

:::info Task

Before the workshop, research these questions and share your answers on Slack

- What is `cron`?
- What is `cron` used for?
- What are the rules to form a `cron` expression?

:::

### Practice

:::info Task

Using [crontab.guru](https://crontab.guru/) as a guide, write `cron` expressions for the following situations:

- Every Friday at 9am
- 6:30pm on Wednesdays in June
- Every half hour from 3pm to 6pm on weekdays

:::

### Submission

:::info Submission
Please share your answers in the Slack thread.
:::

## Workshop

<LockedContent password="ownership">

### Introduction

### Case study

**Ask** if trainees have any questions about the week's work/case study.

**Answer** questions as appropriate.

### Cron

**Ask** trainees to explain what `cron` is.

**Confirm** that it is a [command-line utility for scheduling things](https://en.wikipedia.org/wiki/Cron).

**Remind** trainees of a [daemon](<https://en.wikipedia.org/wiki/Daemon_(computing)>) - a background service - and explain that `cron` is a daemon (like docker) used specifically to run scheduled tasks.

**State** that the `cron` syntax is larger than the tool itself, and will appear in more places than the command line.

**Motivate** trainees by pointing out how tedious it is to do everything manually, and how this isn't practical with long-running (or late-night) tasks. Identify `cron` -- and related technologies as the solution.

### Cron syntax

**Direct** trainees to [crontab.guru](https://crontab.guru/).

**Talk** through the syntax, showing how just these five values can provide quite fine-grained control.

**Warn** that there are varieties of `cron` syntax, and not every trick will work everywhere.

**Challenge** trainees to identify the syntax for the following:

- Every 20 minutes each Tuesday (`*/20 * * * 2`)
- At 2am on the fifth day of each month for the first half of the year (`0 2 5 1-6 *`)
- Every 15 minutes past each hour from midnight to 6am (`*/15 0-6 * * *`)

### Crontab

**Introduce** `crontab` as a tool for passing instructions to `cron`.

**Explain** the basic structure of a command: `[cron expression] [task to do]`.

**Demonstrate** the power of `cron` with a small example:

- `crontab -e` to open the jobs list for editing.
- Add `* * * * * echo "I am repeating" >> log.txt` to the file.
- Wait for one minute, and then demonstrate the contents of `~/log.txt`

**Stress** that `echo` is just a small example here; this could be replaced by any shell command.

**Challenge** trainees to set up their own `cron` task: a Python script that runs every 5 minutes, logging the current time to a file.

**Explain** that `cron` jobs run from the user's home directory by default, so it's important to use absolute paths for both the script and any files it creates or accesses.

**Show** trainees essential `crontab` commands:
- `crontab -l` to list all currently scheduled cron jobs
- `crontab -e` to edit the jobs list
- `crontab -r` to remove all cron jobs for the current user (use with caution!)

**Demonstrate** how to unschedule specific `cron` tasks: `crontab -e` and then delete the unwanted line.

```py script.py
"""Simple cron script that logs the current time."""

from datetime import datetime

if __name__ == "__main__":
    # Use absolute path to ensure cron can find the file
    log_file = "/home/ubuntu/cron_log.txt"
    
    with open(log_file, 'a') as f:
        f.write(f"{datetime.now()}\n")
```

```sh crontab
# Note: Use absolute paths for both the Python interpreter and script
# Cron jobs run from the home directory, not from where the script is located
*/5 * * * * /usr/bin/python3 /home/ubuntu/script.py

# To find the full path to python3, run: which python3
# To find the full path to your script, run: realpath script.py
```

### AWS EventBridge

**Ask** trainees if `cron` is a good way to run a critical service.

**Expect** the answer 'no'; it's very dependent on a specific computer always being on.

**Introduce** [AWS EventBridge](https://eu-west-2.console.aws.amazon.com/events/home?region=eu-west-2#/) as a tool for scheduling cloud-based tasks.

**Demonstrate** the process of setting up a [schedule](https://eu-west-2.console.aws.amazon.com/scheduler/home?region=eu-west-2#create-schedule), and how similar it is to `cron`.

**Highlight** the following details:

- The similar-to-`cron` (but [not identical](https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html?icmpid=docs_console_unmapped#cron-based)) syntax used for setting up a recurring schedule.
- The way that almost any AWS service can be triggered by an EventBridge schedule (most relevantly including, but not limited to, ECS tasks and Lambda functions).

### Practical EventBridge Example

**Explain** that to see EventBridge in action, we'll create a task that creates an S3 bucket on a schedule.

**Guide** trainees through creating the example:


#### Create EventBridge Schedule to create an S3 bucket

**Navigate** to EventBridge Scheduler in the AWS Console.

**Create** a new schedule with:
- **Schedule type**: Recurring schedule
- **Cron expression**: `* * * * ? *` (every minute)
- **Target**: S3 bucket
  - Set the name of the bucket to be something like `C##-bucket` or something funnier / more exciting.

**Wait** 1 minute and then check the S3 console to see the newly created bucket.

**Point out** that this demonstrates:
- How EventBridge can trigger AWS services on a schedule
- How scheduled tasks can perform real infrastructure changes
- How the cron-like syntax translates to actual scheduled execution

**Remind** trainees to clean up resources afterwards:
- Delete the created S3 buckets
- Delete the EventBridge schedule

### Conclusion

**Ask** if trainees have any lingering questions.

**Answer** them.

**Quiz** the trainees on general topics surrounding these schedules to gauge their understanding more deeply.

**Stress** that scheduling tasks so they happen without manual input will be important for most pipelines somewhere; the more comfortable trainees are with `cron` and related tech, the better.

</LockedContent>
