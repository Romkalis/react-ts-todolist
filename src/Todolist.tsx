import {FilterValueType} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export interface TaskType {
  id: string;
  title: string;
  isDone: boolean;
}

export interface TodolistProps {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: string, todolistId: string) => void;
  addTask: (str: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValueType;
  removeTodolist: (taskId: string) => void;
}

export function Todolist({todolistId, title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter, removeTodolist}: TodolistProps) {

  const [taskText, setTaskText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const statusHandler = (evt) => {
    changeFilter((evt.target.textContent).toLowerCase(), todolistId)
  }
  const onInputTaskHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setTaskText(evt.target.value)
    setError('')
  }
  const onKeydownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      addTaskHandler()
    }
  }
  const addTaskHandler = () => {
    if (taskText.trim() === '') {
      setError('Field is required')
      return
    }
    addTask(taskText.trim(), todolistId)
    setTaskText('')
  }

  const onTodolistRemove = () => {
    removeTodolist(todolistId)
  }

  return (
    <div>

      <h3>{title} <button onClick={onTodolistRemove}>❌</button></h3>
      <div>
        <input onChange={onInputTaskHandler}
               onKeyDown={onKeydownHandler}
               className={error ? 'error' : ''}
               type="text"
               value={taskText}/>
        <button onClick={addTaskHandler}>+</button>
        {error && <span className="error-message">{error}</span>}
      </div>
      <ul>
        {
          tasks.map(task => {
            const onRemoveHandler = () => removeTask(task.id, todolistId)
            const onChangeTaskStatus = (evt: ChangeEvent<HTMLInputElement>) => {
              changeTaskStatus(task.id, evt.target.checked, todolistId)
            }
            return (
              <li className={task.isDone ? 'is-done' : '' } key={task.id}>
                <input onChange={onChangeTaskStatus} type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onRemoveHandler}>✖</button>
              </li>)
          })
        }
      </ul>

      <div>
        <button className={filter === 'all' ? 'active-filter' : ''}
                onClick={statusHandler}
        >All
        </button>
        <button className={filter === 'active' ? 'active-filter' : ''}
                onClick={statusHandler}>Active
        </button>
        <button className={filter === 'completed' ? 'active-filter' : ''}
                onClick={statusHandler}>Completed
        </button>
      </div>
    </div>
  )
}
