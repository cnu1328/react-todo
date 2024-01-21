import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import React, { useState, useEffect, useRef } from "react";
import {nanoid} from "nanoid";

const FILTER_MAP = {
  All : () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
 

  function addTask(name) {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    // console.log(tasks[0]);

    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task

      if(id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted

        return {...task, completed: !task.completed};
      }

      return task;
    });
    
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remaining = tasks.filter((task) => task.id !== id);
    setTasks(remaining);
  }

  function editTask(id, newName) {
    const editTasks = tasks.map((task) => {

      if(task.id === id) {
        return {...task, name : newName};
      }

      return task;
    });

    setTasks(editTasks);
  }

  // console.log(props.tasks);
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo 
      id={task.id}
      name = {task.name} 
      completed = {task.completed} 
      key = {task.id}
      toggleTaskCompleted = {toggleTaskCompleted}
      deleteTask = {deleteTask}
      editTask = {editTask}
    />
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name = {name}
      isPressed = {name === filter}
      setFilter = {setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1?"tasks":"task";
  const headingText = `${taskList.length} ${tasksNoun} remaining!`;

  const listheadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if(tasks.length - prevTaskLength === -1) {
      listheadingRef.current.focus();
    }  
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>Listify</h1>

      <Form addTask={addTask}/>
      
      {/* <form>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>

        <input 
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          placeholder="Enter Your Task and Submit"
        />

        <button type="submit" className="btn btn__primary btn__lg">Add</button>
      </form> */}

      <div className="filters btn-group stack-exeption">
        {filterList}
        {/* <FilterButton />
        <FilterButton />
        <FilterButton /> */}
        {/* <button type="button" className="btn toggle-btn" aria-pressed="true">
          <span className="visually-hidden">Show </span>
          <span>all</span>
          <span className="visually-hidden"> tasks</span>
        </button>

        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Active</span>
          <span className="visually-hidden"> tasks</span>
        </button>


        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Completed</span>
          <span className="visually-hidden"> tasks</span>
        </button> */}
      </div>

      <h2 id="list-heading" tagindex="-1" ref={listheadingRef}>{headingText}</h2>

      <ul 
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
          {taskList}
        {/* <Todo name="Eat" completed={true} id="todo-0"/>
        <Todo name="Sleep" completed={false} id="todo-1"/>
        <Todo name="Repeat" completed={false} id="todo-2"/> */}
        {/* <li className="todo stack-small">
          <div className="c-cb">
            <input type="checkbox" id="todo-0" defaultChecked={true} />
            <label htmlFor="todo-0" className="todo-label">
              Eat
            </label>
          </div>

          <div className="btn-group">
            <button className="btn" type="button">
              Edit <span className="visually-hidden">Eat</span>
            </button>

            <button type="button" className="btn btn__danger">
              Delete <span className="visually-hidden">Eat</span>
            </button>
          </div>
        </li>

        <li className="todo stack-small">
          <div className="c-cb">
            <input id="todo-1" type="checkbox" />
            <label className="todo-label" htmlFor="todo-1">
              Sleep
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn">
              Edit <span className="visually-hidden">Sleep</span>
            </button>
            <button type="button" className="btn btn__danger">
              Delete <span className="visually-hidden">Sleep</span>
            </button>
          </div>
        </li>

        <li className="todo stack-small">
          <div className="c-cb">
            <input id="todo-2" type="checkbox" />
            <label className="todo-label" htmlFor="todo-2">
              Repeat
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn">
              Edit <span className="visually-hidden">Repeat</span>
            </button>
            <button type="button" className="btn btn__danger">
              Delete <span className="visually-hidden">Repeat</span>
            </button>
          </div>
        </li> */}
      </ul>

    </div>
  );
}

export default App;
