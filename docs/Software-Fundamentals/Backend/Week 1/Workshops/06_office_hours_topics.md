# Office Hours Topics

## **APIs & HTTP Basics**  

- Testing APIs (test client and Postman)  
- When to use each HTTP method (GET, POST, PUT, PATCH, DELETE)  
- Path parameters vs query parameters  
- Making a POST request with curl  
- Reading and writing files in an API (when to do this, how to test it)  
- Return types of Flask routes (dicts, lists of dicts, status codes, jsonify)  
- Differences between flask.make_response() and returning dicts/errors directly  
- When and why to use jsonify  
- Hosting Flask APIs locally (e.g. for models)  
- Running scheduled code in an API (e.g. wordle at midnight)  
- When you would not want to use a RESTful API and alternatives (GraphQL, gRPC, etc.)  

## **API Security & Authentication**  

- API authentication and OAuth  
- How to generate and use API keys securely  
- Protecting an API from unauthorized access  
- Global state vs reloading data (trade-offs in APIs)  

## **Testing in Python (Flask, pytest, mocks)**  

- Testing Flask (test_client, fixtures, parameterised tests)  
- More on pytest fixtures  
- How to order decorators in pytest (parameterise, fixtures, patch)  
- Unit tests vs functional tests  
- Other types of testing (integration tests, performance tests, caching tests)  
- Testing for file writes without writing to files (patching)  
- MagicMock, patch, and mocking best practices  
- Why mocked functions return mocks by default  
- Can mocked functions respond differently to different inputs?  
- Common mistakes when importing and patching (“foot guns”)  
- Debugging test failures and tricky bugs  
- Difference between unittest and pytest  
- How to make tests idempotent when working with files or APIs  

## **Core Python & CS Concepts**  

- Regex and its limitations for solving coding problems  
- Stacks (when to use them, examples from challenges)  
- Sorting lists of dictionaries  
- Recursion (is it good practice, where to use)  
- Python memory management  
- Space complexity and runtime complexity (examples, when it matters)  
- How to reduce time complexity and find alternatives  
- Variable scopes (local, global, UnboundLocalError issues)  
- Sorting and searching efficiency in large datasets (lists of dicts vs database structures)  
- Working with datetimes in APIs and tests  
- File handling (reading, writing, saving to specific paths)  

## **Databases & Data Management**  

- Databases vs data warehouses vs data lakes (differences and use cases)  

## **Performance & Optimization**  

- How websites display live updates without refreshing  
- How to measure performance of code (when and how to care)  
- Examples of useful decorators in APIs  

## **Tools & Workflow**  

- Web scraping with requests and BeautifulSoup  
- Git ignore files  
