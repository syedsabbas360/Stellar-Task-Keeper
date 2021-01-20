
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  // filter button values
  const [filter, setFilter] = useState('All');
  
  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  };

  //collect an array of FILTER_NAMES
  const FILTER_NAMES = Object.keys(FILTER_MAP);  
  
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
        saveTask={saveTask}
      />
    ));

  const filterList = FILTER_NAMES.map( name => {
    return(
      <FilterButton
        key={name} 
        name={name} 
        isPressed={name === filter}
        setFilter={setFilter}
      />
    )
    
  })

  function addTask(name){
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };

    /* setTasks takes the newTask that's created 
    and adds it to the end of tasks array of objects */
    setTasks([...tasks, newTask]); 

  };

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function saveTask(id, str) {
    const editExistingTaskVal = tasks.map(task => {
      if(id===task.id) {
        task.name = str
        return task
      }
      return task
    });
    setTasks(editExistingTaskVal); 

  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map( task => {
      if( id === task.id){
        return { ...task, newName }
      }
      return task;
    })
    setTasks(editedTaskList);
  }

  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map(task => {
      if( id === task.id){
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks)
  }  

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>Stellar Task Keeper</h1>
        <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        { filterList }
      </div>
      <h2 id="list-heading">{headingText}</h2>
        {taskList}
    </div>
  );
}

export default App;
