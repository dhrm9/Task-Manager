import React, { useState } from 'react';
import './App.css';
import { ToDoInput } from './components/ToDoInput';
import { ToDoList } from './components/ToDoList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Logo from './asessts/logo.png'; // Fixed typo in 'assets'

function App() {
  const [isSearch, setIsSearch] = useState(false);
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState('');
  const [currentEditedItem, setCurrentEditedItem] = useState('');


  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      dueDate: dueDate,
      priority: priority,
      isComplete: false,
      id: Date.now()
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
    console.log(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    console.log(filteredItem);
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  const handleEdit = (ind, item) => {
    console.log(ind);
    // setCurrentEdit(ind);
    setCurrentEdit(item.id)
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value };
    });
  };

  const handleUpdateDueDate = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, dueDate: value };
    });
  };

  const handleUpdatePriority = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, priority: value };
    });
  };

  const handleUpdateToDo = () => {
    let newToDo = [...allTodos];
    // newToDo[currentEdit] = currentEditedItem;
    let x = newToDo.length
    for (let i = 0; i < x; i++) {
      if (newToDo[i].id === currentEdit) {
        newToDo[i] = currentEditedItem
      }
    }
    setTodos(newToDo);
    setCurrentEdit('');

    localStorage.setItem('todolist', JSON.stringify(newToDo));
  };

  return (
    <div className="App">
      <div className='todo-header toast'>
        <div className='todo-header-logo '>
          <img src={Logo} alt="Logo" />
          <h1>Task Manager</h1>
        </div>

        {isSearch ? <>
          <div className="todo-search-item">
            <input
              type="text"
              value={searchItem}
              onChange={e => setSearchItem(e.target.value)}
              placeholder="Search task"
            />
          </div>

          <button className="icon-btn close-btn" onClick={() => setIsSearch(!isSearch)} >
            <FontAwesomeIcon icon={faTimes} />
          </button>

        </> : <>
          <button className="icon-btn search-btn" onClick={() => setIsSearch(!isSearch)}>
            <FontAwesomeIcon icon={faSearch} />

          </button>
        </>}




      </div>

      {isSearch ? (
        <div className="todo-sections toast">
          <ToDoList
            title={"Searched Tasks"}
            isCompleteScreen={isCompleteScreen}
            allTodos={allTodos}
            currentEdit={currentEdit}
            searchItem={searchItem}
            handleUpdateTitle={handleUpdateTitle}
            handleUpdateToDo={handleUpdateToDo}
            currentEditedItem={currentEditedItem}
            handleUpdateDescription={handleUpdateDescription}
            handleUpdateDueDate={handleUpdateDueDate}
            handleUpdatePriority={handleUpdatePriority}
            handleDeleteTodo={handleDeleteTodo}
            handleDeleteCompletedTodo={handleDeleteCompletedTodo}
            completedTodos={completedTodos}
            handleComplete={handleComplete}
            handleEdit={handleEdit}
            setTodo={setTodos}
            setCompletedTodo={setCompletedTodos}
          />
        </div>

      ) : (
        <>
          <div className="todo-wrapper fade-in">
            <ToDoInput
              newTitle={newTitle}
              newDescription={newDescription}
              dueDate={dueDate}
              priority={priority}
              setNewTitle={setNewTitle}
              setNewDescription={setNewDescription}
              setDueDate={setDueDate}
              setPriority={setPriority}
              handleAddTodo={handleAddTodo}
            />
          </div>

          <div className='todo-sections toast'>
            <ToDoList
              title={"Completed Tasks"}
              isCompleteScreen={true}
              allTodos={allTodos}
              currentEdit={currentEdit}
              handleUpdateTitle={handleUpdateTitle}
              handleUpdateToDo={handleUpdateToDo}
              currentEditedItem={currentEditedItem}
              handleUpdateDescription={handleUpdateDescription}
              handleUpdateDueDate={handleUpdateDueDate}
              handleUpdatePriority={handleUpdatePriority}
              handleDeleteTodo={handleDeleteTodo}
              handleDeleteCompletedTodo={handleDeleteCompletedTodo}
              completedTodos={completedTodos}
              handleComplete={handleComplete}
              handleEdit={handleEdit}
              setTodo={setTodos}
              setCompletedTodo={setCompletedTodos}
            />

            <ToDoList
              title={"Upcoming Tasks"}
              isCompleteScreen={false}
              allTodos={allTodos}
              currentEdit={currentEdit}
              searchItem={searchItem}
              handleUpdateTitle={handleUpdateTitle}
              handleUpdateToDo={handleUpdateToDo}
              currentEditedItem={currentEditedItem}
              handleUpdateDescription={handleUpdateDescription}
              handleUpdateDueDate={handleUpdateDueDate}
              handleUpdatePriority={handleUpdatePriority}
              handleDeleteTodo={handleDeleteTodo}
              handleDeleteCompletedTodo={handleDeleteCompletedTodo}
              completedTodos={completedTodos}
              handleComplete={handleComplete}
              handleEdit={handleEdit}
              setTodo={setTodos}
              setCompletedTodo={setCompletedTodos}
            />

            <ToDoList
              title={"Expired Tasks"}
              isCompleteScreen={false}
              allTodos={allTodos}
              currentEdit={currentEdit}
              handleUpdateTitle={handleUpdateTitle}
              handleUpdateToDo={handleUpdateToDo}
              currentEditedItem={currentEditedItem}
              handleUpdateDescription={handleUpdateDescription}
              handleUpdateDueDate={handleUpdateDueDate}
              handleUpdatePriority={handleUpdatePriority}
              handleDeleteTodo={handleDeleteTodo}
              handleDeleteCompletedTodo={handleDeleteCompletedTodo}
              completedTodos={completedTodos}
              handleComplete={handleComplete}
              handleEdit={handleEdit}
              setTodo={setTodos}
              setCompletedTodo={setCompletedTodos}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
