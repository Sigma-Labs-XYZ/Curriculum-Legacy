---
objectives: ["Use the debugging framework to understand why a bug is happening", "Examine broken code and identify why it isn't working", "Predict the outcome of non-working code", "Describe the constituent parts of an error message"]
module: Fundamentals
week: 1
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

# Debugging Skills

<LearningObjectiveComponent />

## Pre-work

### Setup

If nobody has done so already, copy and paste this command into Slack.

```
/prework Debugging Skills
```

### Task

:::caution

**Read through the entire task and exercise before starting!**

:::

Here's some buggy code:

```py
def ask_user_for_phone_number() -> str:
    user_input = input("What is the phone number to validate?")
    return user_input


def main():
    phone_no = ask_user_for_phone_number()
    block_no = phone_no.contains(" ", "")
    formatted_number = convert_phone_to_UK_Format(phone_no)
    if len(formatted_number) > 0:
        print(formatted_number)
    else:
        print_invalid_input_error()


def is_number_valid_length(phoneNo: str) -> bool:
    return phoneNo.length is 11


def is_UK_number(phone_no: str) -> bool:
    return phone_no.slice(0, 1) is "07"


def has_country_code(phone_no: str) -> bool:
    return phone_no.contains("+44")


def convert_phone_to_UK_Format(input: str) -> list:
    phone_list = []
    if has_country_code(input):
        input.replace("+44", "07")

    if is_number_valid_length(input) and is_UK_number(input):
        phone_list = convert_string_to_phone_format(input)

    return phone_list


def convert_string_to_phone_format(phone_str: str) -> list:
    phoneA = phone_str[0:5]
    phoneB = phone_str[6]
    return [phoneA, phoneB]


def print_invalid_input_error():
    print("This is an invalid UK number. Please try again.")


main()

```

:::tip Task

1. Write a short description of what you think the code is doing.
2. Make a note of the first "bug" or thing wrong with the code. _Do not change the code._
3. If the code was corrected, what should be happening?
4. How is the bug changing the expected outcome? What will happen without changing the code?
5. Repeat the above for another bug.

:::

:::info Submission

Please share your answers in the Slack thread. You should have at least two bugs described with expected behaviour and current behaviour.

:::

## Workshop

<LockedContent password="ownership">

### Lecture

**Explain** that we come up against two types of errors when programming:

> 1. **Crashes** - these are errors that occur when the code is not written correctly. This could be a syntax error, a variable that is not defined, or a function that is not called correctly.
> 2. **Logical errors** - these are errors that occur when the code is written correctly but the logic is incorrect. This could be a function that is not returning the correct value, or a loop that is not iterating correctly.

**Highlight** that the first is easier to debug as the error message will tell you what is wrong. The second is harder as the code will run but the output will be incorrect.

**Talk** through the debugging framework for Crashes

> 1. Read all of your error messages
> 2. Now, for the first error, find the line number/s associated with it
> 3. Think about what those lines of code are supposed to do and compare them to what is actually happening
>    - This can be using a `print()` or walking through the function.
> 4. Come up with a theory for why that crash is happening
> 5. Attempt a fix for the problem
> 6. If the fix works, move on to the next error. If it doesn't, **undo your change** go back to step 3.

**Live debug** the code from the pre work following the above steps.

**Explain** that for logical errors, we use a very similar process but we need to focus on two questions

> 1. What is the code supposed to do?
> 2. What is the code actually doing?

**Highlight** that the first question is the most important. If you don't know what the code is supposed to do, you won't be able to fix it.

**Explain** that the process for logical errors is the same as for crashes but we need to focus on the output of the code and the expected output.

**Live debug** the code from the pre work following the above steps.

**Write** some unit tests for the code now that it is working perfectly

**Ensure** the quality of the code is high by using pylint

</LockedContent>
