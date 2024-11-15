import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

export const ToDoList = ({
    title,
    isCompleteScreen,
    searchItem,
    setSearchItem,
    allTodos,
    currentEdit,
    handleUpdateTitle,
    handleUpdateToDo,
    currentEditedItem,
    handleUpdateDescription,
    handleUpdateDueDate,
    handleUpdatePriority,
    handleDeleteTodo,
    handleDeleteCompletedTodo,
    completedTodos,
    handleComplete,
    handleEdit,
    setTodo,
    setCompletedTodo
}) => {

    const [filteredTodos, setFilteredTodos] = useState([]);
    const [priorityFilter, setPriorityFilter] = useState(""); // Added state for priority filter
    const [showCompleted, setShowCompleted] = useState(false); // Added state for completed checkbox

    useEffect(() => {
        const savedTodo = JSON.parse(localStorage.getItem('todolist'));
        const savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));

        if (savedTodo) {
            setTodo(savedTodo);
        }

        if (savedCompletedTodo) {
            setCompletedTodo(savedCompletedTodo);
        }
    }, [setTodo, setCompletedTodo]);

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        let filtered = allTodos;
        

        if (title === "Upcoming Tasks") {
            filtered = filtered.filter(item => item.dueDate >= today);
        } else if (title === "Expired Tasks") {
            filtered = filtered.filter(item => item.dueDate < today);
        } else if (title === "Searched Tasks") {
            filtered = filtered.filter(item => 
                item.title.toLowerCase().includes(searchItem.toLowerCase()) ||
                item.description.toLowerCase().includes(searchItem.toLowerCase())
            );

            if (priorityFilter) {
                filtered = filtered.filter(item => item.priority === priorityFilter);
            }

            if (showCompleted) {
                filtered = completedTodos.filter(item => 
                    item.title.toLowerCase().includes(searchItem.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchItem.toLowerCase())
                );
            }
        }

        setFilteredTodos(filtered);
    }, [title, allTodos, today, searchItem, priorityFilter, showCompleted]); 

    return (
        <div className="todo-list">
            <div className='todo-list-header'>
                <h4>{title}</h4>

                {title === "Searched Tasks" && (
                    <div className="filter-container">
                        <select 
                            value={priorityFilter} 
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="priority-filter"
                        >
                            <option value="">All Priorities</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>

                        <label className='checkbox-label'>
                            <input 
                                type="checkbox" 
                                checked={showCompleted} 
                                onChange={(e) => setShowCompleted(e.target.checked)} 
                            />
                            Show Completed Tasks
                        </label>
                    </div>
                )}
            </div>


            <div className='todo-list-result'>
            {!isCompleteScreen && filteredTodos.length > 0 ? (
                filteredTodos.map((item, index) => (
                    currentEdit === item.id && title!=="Searched Tasks" ? (
                        <div className='edit__wrapper' key={item.id}>
                            <input
                                placeholder='Updated Title'
                                onChange={(e) => handleUpdateTitle(e.target.value)}
                                value={currentEditedItem.title}
                            />
                            <textarea
                                placeholder='Updated Description'
                                rows={4}
                                onChange={(e) => handleUpdateDescription(e.target.value)}
                                value={currentEditedItem.description}
                            />
                            <input
                                type='date'
                                value={currentEditedItem.dueDate}
                                onChange={(e) => handleUpdateDueDate(e.target.value)}
                            />  
                            <select
                                value={currentEditedItem.priority}
                                onChange={(e) => handleUpdatePriority(e.target.value)}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>     
                            <button
                                type="button"
                                onClick={handleUpdateToDo}
                                className="primaryBtn"
                            >
                                Update
                            </button>
                        </div>
                    ) : (
                        <div className="todo-list-item" key={item.id}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p><small>Due Date: {item.dueDate}</small></p>
                            </div>
                            <div>

                                {
                                    title!=="Searched Tasks"?
                                    <>
                                     <BsCheckLg
                                        className="check-icon"
                                        onClick={() => handleComplete(index)}
                                        title="Complete?"
                                    />
                                        <AiOutlineDelete
                                            className="icon"
                                            onClick={() => handleDeleteTodo(index)}
                                            title="Delete?"
                                        />
                                        <AiOutlineEdit
                                            className="check-icon"
                                            onClick={() => handleEdit(index, item)}
                                            title="Edit?"
                                        />
                                    </>:<>
                                    </>
                                }
                            
                            </div>
                        </div>
                    )
                ))
            ) : (
                <></> 
            )}

            {isCompleteScreen && completedTodos.map((item, index) => (
                <div className="todo-list-item" key={index}>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p><small>Completed on: {item.completedOn}</small></p>
                    </div>
                    <div>
                        <AiOutlineDelete
                            className="icon"
                            onClick={() => handleDeleteCompletedTodo(index)}
                            title="Delete?"
                        />
                    </div>
                </div>
            ))}

            </div>

            
        </div>
    );
};
