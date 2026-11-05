# Office Hour Topics

## Python Fundamentals  

- Best practices for input validation in Python (avoiding long chains of if statements)  
- What are packages in Python and the role of __init__.py  
- How to import files from different directories in Python  
- How .encode() and .decode() work in Python (and when to use encodings beyond UTF-8)  
- Example directory structures and encapsulation for projects  
- Best practices for project planning and prototyping larger projects  

## Testing & Mocking  

- Context managers for patch testing  
- Mocking and patching (including loggers, caplog, and when to mock logging)  
- Functions worth unit testing in pipelines  

## Logging  

- How and when to use logging handlers  

## Databases & SQL  

- Best practices for uploading consumer output to a database (insert vs batch executemany)  
- Bulk inserting into a database  
- Linking to reference tables in databases  
- Null values in databases  
- Complex JOINs and subqueries  
- Creating tables with constraints and performance in mind  
- Relational algebra - theory vs practical use in industry  

## Kafka & Streaming  

- Kafka topics and consumer groups  
- Kafka producer batches  
- Difference between consumer.poll() and consumer.consume()  
- Kafka AdminClient (list_topics, list_groups, etc.)  
- Bootstrap servers in Kafka and how to load-test consumers  
- Difference between Confluent Kafka and Apache Kafka  
- What is the callback parameter in producer.produce  

## Infrastructure & Cloud  

- Why RDSs need a subnet group while an EC2 needs only a single subnet  
- Docker - how it ensures consistent environments across machines  
- Terraform basics (terraforming an EC2 instance, state locks, rollbacks)  
- Debugging Terraform (lock flags, avoiding state issues)  
- Amazon Nova and Bedrock (using AI models in the cloud and their use cases)  

## Concurrency  

- Threads and concurrency (overview and use cases)  
