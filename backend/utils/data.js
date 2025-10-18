export const interviewQuestions = {
  "Data Structures": [
    {
      question: "What is the difference between an array and a linked list?",
      answer:
        "An array is a collection of elements stored in contiguous memory locations, allowing O(1) random access but having a fixed size. A linked list consists of nodes with data and pointers, stored non-contiguously, allowing dynamic memory allocation but O(n) access time."
    },
    {
      question: "What are the main types of linked lists?",
      answer:
        "The main types are: Singly Linked List (each node points to the next), Doubly Linked List (nodes point to both previous and next), and Circular Linked List (last node connects back to the first)."
    },
    {
      question: "What are the use cases of a stack?",
      answer:
        "Stacks are used for function call management in recursion, undo/redo operations in editors, expression evaluation, and depth-first search in graphs."
    },
    {
      question: "How does a queue differ from a deque?",
      answer:
        "A queue follows FIFO, allowing insertion at the rear and deletion from the front. A deque (double-ended queue) allows insertion and deletion from both ends, making it more flexible."
    },
    {
      question: "Explain the concept of hashing.",
      answer:
        "Hashing is a technique of mapping data to fixed-size values (hash codes) using a hash function. It’s widely used in hash tables for constant-time search, insert, and delete operations, provided collisions are handled properly."
    }
  ],

  "Algorithms": [
    {
      question: "What is the difference between greedy algorithms and dynamic programming?",
      answer:
        "Greedy algorithms make the locally optimal choice at each step, hoping for a global optimum. Dynamic programming breaks down problems into overlapping subproblems and uses memoization to build the optimal solution."
    },
    {
      question: "What is the time complexity of binary search?",
      answer:
        "Binary search works on sorted arrays and repeatedly halves the search space, resulting in a time complexity of O(log n)."
    },
    {
      question: "What is the difference between BFS and DFS in graphs?",
      answer:
        "BFS explores nodes level by level using a queue, ideal for finding shortest paths in unweighted graphs. DFS explores as deep as possible using a stack or recursion, ideal for topological sorting or cycle detection."
    },
    {
      question: "What is the difference between stable and unstable sorting algorithms?",
      answer:
        "A stable sorting algorithm preserves the relative order of equal elements (e.g., Merge Sort). An unstable algorithm may not (e.g., Quick Sort). Stability matters in scenarios where original order carries significance."
    },
    {
      question: "What are common techniques for solving optimization problems?",
      answer:
        "Techniques include Greedy Method, Dynamic Programming, Divide and Conquer, Backtracking, and Branch and Bound, depending on whether the problem has overlapping subproblems, optimal substructure, or requires exhaustive search."
    }
  ],

  "System Design": [
    {
      question: "What are the key components of a scalable system?",
      answer:
        "Key components include load balancers, caching layers, databases (SQL/NoSQL), microservices, and monitoring/logging tools. Scalability often requires horizontal scaling and distributed architecture."
    },
    {
      question: "What is the difference between horizontal and vertical scaling?",
      answer:
        "Vertical scaling increases resources of a single server (CPU, RAM), while horizontal scaling adds more servers to distribute load. Horizontal scaling is generally more fault-tolerant."
    },
    {
      question: "What is the CAP theorem?",
      answer:
        "The CAP theorem states that in a distributed system, you can only achieve two out of three: Consistency, Availability, and Partition Tolerance. For example, Cassandra favors availability and partition tolerance, while MongoDB favors consistency and partition tolerance."
    },
    {
      question: "What is the role of caching in system design?",
      answer:
        "Caching stores frequently accessed data in memory to reduce database load and improve response time. Common tools include Redis and Memcached, used for session storage, query results, and content delivery."
    },
    {
      question: "What is the difference between a monolithic and microservices architecture?",
      answer:
        "Monolithic architecture is a single unified codebase where all services are tightly coupled. Microservices split functionality into independent services communicating via APIs. Microservices allow better scalability and fault isolation but add complexity in deployment and monitoring."
    }
  ],

  "Databases": [
    {
      question: "What is the difference between SQL and NoSQL databases?",
      answer:
        "SQL databases are relational, schema-based, and use structured query language (e.g., MySQL, PostgreSQL). NoSQL databases are non-relational, schema-less, and optimized for flexibility and scalability (e.g., MongoDB, Cassandra)."
    },
    {
      question: "What are ACID properties in databases?",
      answer:
        "ACID stands for Atomicity (all-or-nothing transactions), Consistency (data integrity), Isolation (transactions don’t interfere), and Durability (results are permanent). These properties ensure reliable transactions."
    },
    {
      question: "What are indexes and why are they used?",
      answer:
        "Indexes are data structures (like B-trees or hash tables) that improve query performance by reducing the number of rows scanned. However, they increase write overhead and consume extra storage."
    },
    {
      question: "What is database normalization?",
      answer:
        "Normalization is the process of organizing data to reduce redundancy and improve integrity. Forms include 1NF (atomic values), 2NF (no partial dependencies), and 3NF (no transitive dependencies)."
    },
    {
      question: "What is the difference between OLTP and OLAP systems?",
      answer:
        "OLTP (Online Transaction Processing) systems are optimized for frequent, small transactions (e.g., banking apps). OLAP (Online Analytical Processing) systems are optimized for large-scale queries and analysis (e.g., data warehouses)."
    }
  ],

  "Operating Systems": [
    {
      question: "What is the difference between a process and a thread?",
      answer:
        "A process is an independent program with its own memory space. A thread is a lightweight unit of execution within a process, sharing memory with other threads. Threads enable faster context switching but require synchronization."
    },
    {
      question: "What is deadlock and how can it be prevented?",
      answer:
        "Deadlock is a state where processes wait indefinitely for resources held by each other. Prevention techniques include resource ordering, avoiding circular wait, and using a Banker’s algorithm for safe allocation."
    },
    {
      question: "What are the different CPU scheduling algorithms?",
      answer:
        "Common scheduling algorithms include FCFS (First Come First Serve), SJF (Shortest Job First), Priority Scheduling, and Round Robin. Each optimizes for different goals like throughput, fairness, or response time."
    },
    {
      question: "What is virtual memory and why is it used?",
      answer:
        "Virtual memory abstracts physical memory by using disk space as an extension of RAM. It enables larger programs to run, provides isolation between processes, and increases system stability."
    },
    {
      question: "What is the difference between paging and segmentation?",
      answer:
        "Paging divides memory into fixed-size blocks (pages) while segmentation divides memory into variable-size blocks based on logical divisions like functions or data structures. Paging avoids external fragmentation; segmentation improves logical organization."
    }
    ],
  
  "Web & Software Development": [
    {
      question: "What are the key differences between HTML, CSS, and JavaScript?",
      answer:
        "HTML defines the structure and content of a webpage, CSS controls the layout and styling, and JavaScript adds interactivity and logic. Together, they form the core technologies for frontend development."
    },
    {
      question: "What is the difference between React, Angular, and Vue?",
      answer:
        "React is a library focused on building UI components, Angular is a full-fledged MVC framework by Google, and Vue is a progressive framework known for its simplicity. React uses JSX, Angular uses TypeScript, and Vue uses templates with reactive bindings."
    },
    {
      question: "What is the difference between REST and GraphQL APIs?",
      answer:
        "REST uses fixed endpoints for resources and returns entire datasets, while GraphQL allows clients to specify exactly what data they need using a single endpoint. GraphQL reduces over-fetching and under-fetching of data."
    },
    {
      question: "How does JWT authentication work?",
      answer:
        "JWT (JSON Web Token) authentication involves sending a signed token after login. The token is included in request headers for authorization. The server verifies it without storing session data, making it stateless and scalable."
    },
    {
      question: "Why is version control using Git and GitHub important?",
      answer:
        "Version control allows developers to track changes, collaborate, and revert code safely. Git is the underlying system, while GitHub provides a cloud-based platform for remote repositories, collaboration, and pull requests."
    }
    ],
  "Frontend: HTML, CSS, JavaScript, React/Angular/Vue basics": [
    {
      question: "What is the difference between HTML and semantic HTML?",
      answer:
        "Semantic HTML uses meaningful tags like <header>, <article>, <section>, and <footer> to define structure and improve accessibility, SEO, and code readability. Regular HTML may use non-semantic tags like <div> or <span> without meaning."
    },
    {
      question: "How does the CSS box model work?",
      answer:
        "The CSS box model defines how elements are sized and spaced using content, padding, border, and margin. The total element size is calculated as width + padding + border + margin."
    },
    {
      question: "What are closures in JavaScript?",
      answer:
        "A closure is formed when a function remembers variables from its outer scope even after that scope has closed. This allows data privacy and function factories in JavaScript."
    },
    {
      question: "What is the Virtual DOM in React?",
      answer:
        "The Virtual DOM is a lightweight JavaScript representation of the actual DOM. React updates the virtual DOM first and then efficiently updates only the changed parts of the real DOM using a diffing algorithm."
    },
    {
      question: "What are key differences between React, Angular, and Vue?",
      answer:
        "React is a component library focusing on UI rendering, Angular is a full-fledged framework with built-in tools for routing and state, and Vue is lightweight and easy to integrate with existing projects."
    }
  ],

  "Backend: Node.js, Express, Django, Spring Boot": [
    {
      question: "What is the difference between synchronous and asynchronous programming in Node.js?",
      answer:
        "Synchronous programming executes one task at a time, blocking others, while asynchronous programming in Node.js uses callbacks, promises, or async/await to handle multiple operations concurrently without blocking the event loop."
    },
    {
      question: "What role does Express play in a Node.js application?",
      answer:
        "Express is a minimal and flexible web framework for Node.js that simplifies building APIs and web servers by handling routes, middleware, and HTTP requests efficiently."
    },
    {
      question: "What are the key features of Django?",
      answer:
        "Django is a Python framework emphasizing rapid development and clean design. It includes an ORM, admin panel, built-in authentication, and strong security features out of the box."
    },
    {
      question: "What is dependency injection in Spring Boot?",
      answer:
        "Dependency Injection (DI) is a design pattern where objects receive their dependencies from an external source rather than creating them. Spring Boot manages DI automatically using annotations like @Autowired."
    },
    {
      question: "How does middleware work in backend frameworks?",
      answer:
        "Middleware functions intercept requests and responses, allowing tasks like logging, authentication, and data parsing before reaching the final route handler."
    }
  ],

  "APIs: REST, GraphQL, authentication (JWT, OAuth)": [
    {
      question: "What is the difference between REST and GraphQL?",
      answer:
        "REST uses multiple endpoints representing resources, while GraphQL uses a single endpoint allowing clients to query only the data they need. GraphQL reduces over-fetching and under-fetching issues."
    },
    {
      question: "What are HTTP methods and their purposes in REST APIs?",
      answer:
        "Common HTTP methods include GET (read), POST (create), PUT/PATCH (update), and DELETE (remove). They define CRUD operations for API endpoints."
    },
    {
      question: "How does JWT authentication work?",
      answer:
        "JWT (JSON Web Token) authentication issues a signed token upon login. This token is sent in headers with subsequent requests and verified by the server without needing session storage."
    },
    {
      question: "What is OAuth and how does it differ from JWT?",
      answer:
        "OAuth is an authorization framework that allows third-party apps to access user data without sharing passwords. JWT is a token format often used inside OAuth flows for secure data exchange."
    },
    {
      question: "How can you secure an API?",
      answer:
        "APIs can be secured using authentication (JWT/OAuth), HTTPS, rate limiting, input validation, CORS control, and proper error handling to prevent data leaks or attacks."
    }
  ],

  "Databases: MongoDB, MySQL, PostgreSQL basics": [
    {
      question: "What is the difference between SQL and NoSQL databases?",
      answer:
        "SQL databases (MySQL, PostgreSQL) are relational and use structured schemas, while NoSQL databases (MongoDB) are non-relational and store data as flexible JSON-like documents."
    },
    {
      question: "What is an ORM and why is it used?",
      answer:
        "ORM (Object Relational Mapper) tools like Sequelize, Prisma, or Django ORM allow developers to interact with databases using code objects instead of raw SQL queries, improving productivity and reducing errors."
    },
    {
      question: "What are indexes and why are they important?",
      answer:
        "Indexes speed up data retrieval by maintaining a separate data structure (like a B-tree). However, they increase write overhead and consume extra storage."
    },
    {
      question: "What are primary and foreign keys in relational databases?",
      answer:
        "A primary key uniquely identifies a record, while a foreign key links one table to another, maintaining referential integrity between related data."
    },
    {
      question: "What are transactions in databases?",
      answer:
        "Transactions ensure that a set of database operations execute as a single unit — either all succeed or all fail. They follow ACID properties for consistency and reliability."
    }
  ],

  "Version Control: Git & GitHub basics": [
    {
      question: "What is the difference between Git and GitHub?",
      answer:
        "Git is a distributed version control system for tracking changes in code. GitHub is a cloud-based hosting service for Git repositories that enables collaboration and code sharing."
    },
    {
      question: "What are the most common Git commands?",
      answer:
        "Common commands include `git init` (initialize repo), `git clone` (copy repo), `git add` (stage changes), `git commit` (save changes), `git push` (upload to remote), and `git pull` (download updates)."
    },
    {
      question: "What is the purpose of branching in Git?",
      answer:
        "Branching allows multiple developers to work on different features or bug fixes independently. It enables parallel development without affecting the main branch."
    },
    {
      question: "What is a pull request and why is it important?",
      answer:
        "A pull request lets contributors propose changes to a repository. It allows code review, discussion, and controlled merging, improving collaboration and code quality."
    },
    {
      question: "How can merge conflicts occur and how are they resolved?",
      answer:
        "Merge conflicts occur when two branches modify the same lines of code. They’re resolved by manually editing conflicting files and committing the final version after review."
    }
  ]
};
export const topics = [
    "Data Structures",
    "Algorithms",
    "System Design",
    "Databases",
    "Operating Systems",
    "Web & Software Development",
    "Frontend: HTML, CSS, JavaScript, React/Angular/Vue basics",
    "Backend: Node.js, Express, Django, Spring Boot",
    "APIs: REST, GraphQL, authentication (JWT, OAuth)",
    "Databases: MongoDB, MySQL, PostgreSQL basics",
    "Version Control: Git & GitHub basics"
];