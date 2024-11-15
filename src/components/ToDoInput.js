import React, { useState } from 'react';

export const ToDoInput = ({
  newTitle, setNewTitle,
  newDescription, setNewDescription,
  handleAddTodo, priority, setPriority,
  dueDate, setDueDate
}) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!newTitle.trim()) newErrors.title = "Title is required.";
    if (!newDescription.trim()) newErrors.description = "Description is required.";
    if (!priority) newErrors.priority = "Priority must be selected.";
    if (!dueDate) {
      newErrors.dueDate = "Due date is required.";
    } 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleAddTodo();
      // Clear form and errors after successful submission if needed
      setNewTitle("");
      setNewDescription("");
      setPriority("low");
      setDueDate("");
      setErrors({});
    }
  };

  return (
    <div className="todo-input">
      <div className="todo-input-item">
        <label>Title</label>
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="What's the task title?"
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="todo-input-item">
        <label>Description</label>
        <input
          type="text"
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
          placeholder="What's the task description?"
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      <div className="todo-input-item">
        <label>Priority</label>
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && <span className="error">{errors.priority}</span>}
      </div>

      <div className="todo-input-item">
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        {errors.dueDate && <span className="error">{errors.dueDate}</span>}
      </div>

      <div className="todo-input-item">
        <button
          type="button"
          onClick={handleSubmit}
          className="primaryBtn hover"
        >
          Add
        </button>
      </div>
    </div>
  );
};
