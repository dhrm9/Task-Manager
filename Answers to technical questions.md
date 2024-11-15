# Questions and Answers

## How long did you spend on the coding test?

I spent around 12-15 hours on the coding test, focusing on building the core functionality and ensuring the user interface was intuitive. The task management features were prioritized, and I worked to ensure that all interactions were smooth, particularly the task creation, editing, and deletion functionalities.

## What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

In the latest version of React, **React hooks** have been incredibly useful for managing state and side effects in functional components. Specifically, useState and useEffect have allowed me to handle the dynamic task data and implement task updates in a clean and efficient way.

Here’s an example of how I’ve used useState and useEffect in the task management app:

  ```jsx
       import React, { useState, useEffect } from 'react';
        
        const [filteredTodos, setFilteredTodos] = useState([]);
        const [priorityFilter, setPriorityFilter] = useState(""); // State for priority filter
        const [showCompleted, setShowCompleted] = useState(false); // State for showing completed tasks
        
        useEffect(() => {
            // Retrieve saved todos and completed todos from localStorage
            const savedTodo = JSON.parse(localStorage.getItem('todolist'));
            const savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
        
            if (savedTodo) setTodo(savedTodo);
            if (savedCompletedTodo) setCompletedTodo(savedCompletedTodo);
        }, [setTodo, setCompletedTodo]);
        
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        
        useEffect(() => {
            let filtered = allTodos; // Initialize with all todos
        
            // Filter based on title (Upcoming, Expired, or Searched tasks)
            if (title === "Upcoming Tasks") {
                filtered = filtered.filter(item => item.dueDate >= today);
            } else if (title === "Expired Tasks") {
                filtered = filtered.filter(item => item.dueDate < today);
            } else if (title === "Searched Tasks") {
                filtered = filtered.filter(item =>
                    item.title.toLowerCase().includes(searchItem.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchItem.toLowerCase())
                );
        
                // Apply priority filter if selected
                if (priorityFilter) {
                    filtered = filtered.filter(item => item.priority === priorityFilter);
                }
        
                // Show completed tasks if the checkbox is checked
                if (showCompleted) {
                    filtered = filtered.concat(completedTodos.filter(item =>
                        item.title.toLowerCase().includes(searchItem.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchItem.toLowerCase())
                    ));
                }
            }
        
            setFilteredTodos(filtered); // Update the filteredTodos state
        }, [title, allTodos, today, searchItem, priorityFilter, showCompleted]); // Dependencies that trigger re-filtering
        
  ```        
## How would you track down a performance issue in production? Have you ever had to do this?

To track down a performance issue in production, I would follow these steps:

1. **Use Browser Developer Tools**:
- Inspect the network, console, and performance tabs to identify slow API calls, large resources being loaded, or JavaScript execution bottlenecks.
- Check for any errors or warnings in the console that could be impacting performance.

2. **Profile with React Developer Tools**:
- Use React Developer Tools to profile components and identify unnecessary re-renders.
- Optimize the component tree by ensuring components only re-render when necessary.

3. **Log and Monitor**:
- Set up logging with tools like **LogRocket**, **Sentry**, or **Datadog** to track runtime issues, user interactions, and performance drops in production.
- Monitor the application in real-time to spot any slowdowns or bugs that users may encounter.

4. **Analyze Performance Metrics**:
- Use tools like **Google Lighthouse** to get insights into performance bottlenecks, such as large bundle sizes or long loading times.
- Look for opportunities to optimize assets and code splitting.

5. **Optimize Code**:
- Once the issue is identified, refactor inefficient code (e.g., optimize loops, reduce unnecessary API calls, or use memoization where appropriate).
- Improve server response times and caching strategies if necessary.


## If you had more time, what additional features or improvements would you consider adding to the task management application?
If I had more time, I would consider adding the following features to the task management application:

1. **Task Due Reminders**:
- Implement a notification or reminder system to alert users when a task is due soon.
  
2. **Task Sorting**:
- Allow users to sort tasks by due date, priority, or completion status.

3. **User Authentication**:
- Add user authentication with Firebase or another service to enable personalized task lists.

4. **Mobile Responsiveness**:
- Improve the design for better mobile compatibility.

5. **Drag-and-Drop Task Management**:
- Implement drag-and-drop functionality to reorder tasks in the dashboard for better user experience.

