import {FilterValueType} from "../App.tsx";
import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Button, ButtonGroup, IconButton, Checkbox} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolist-reducer.ts";
import {
  addNewTaskActionCreator,
  changeTaskStatusActionCreator, changeTaskTitleActionCreator,
  deleteTaskActionCreator
} from "../state/tasks-reducer.ts";

export interface TaskType {
  id: string;
  title: string;
  isDone: boolean;
}

export type TodolistProps = {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  // changeFilter: (value: string, todolistId: string) => void;
  // addItem: (str: string, todolistId: string) => void;
  filter: FilterValueType;
  // removeTodolist: (taskId: string) => void;
  // changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist = React.memo(({todolistId, title, tasks, filter}: TodolistProps) => {
  console.log(`render ${title} Todolist`)
  const dispatch = useDispatch()

  const statusHandler = (evt) => {
    const text = (evt.target.textContent).toLowerCase()
    dispatch(changeTodolistFilterAC(text, todolistId))
  }
  const onTodolistRemove = () => {
    dispatch(removeTodolistAC(todolistId))
  }
  const addTask = (title: string) => {
    dispatch(addNewTaskActionCreator(todolistId, title))
  }
  const changeTodolistTitle = (title: string, todolistId: string) => {
    const action = changeTodolistTitleAC(todolistId, title)
    dispatch(action)
  }

  let tasksToTodolist = tasks;

  if (filter === 'active') {
    tasksToTodolist = tasks.filter(task => !task.isDone)
  }
  if (filter === 'completed') {
    tasksToTodolist = tasks.filter(task => task.isDone)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={title} onChange={(value) => changeTodolistTitle(value, todolistId)}/>
        <IconButton onClick={onTodolistRemove} size={'small'} >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>
      <ul>
        {

          tasksToTodolist?.map(task => {


            const onRemoveHandler = () => dispatch(deleteTaskActionCreator(todolistId, task.id))
            const onChangeTaskStatus = (evt: ChangeEvent<HTMLInputElement>) =>
              dispatch(changeTaskStatusActionCreator(todolistId, evt.target.checked, task.id))
            const onChangeTaskTitle = (title) =>  dispatch(changeTaskTitleActionCreator(todolistId, task.id, title))

            return (
              <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                <Checkbox onChange={onChangeTaskStatus}
                          checked={task.isDone}
                          color={'success'}/>

                <EditableSpan title={task.title} onChange={onChangeTaskTitle}/>
                <IconButton onClick={onRemoveHandler} size={'small'} >
                  <Delete />
                </IconButton>
              </li>)
          })
        }
      </ul>
      <div>

        <ButtonGroup variant="outlined" aria-label="Basic button group" size={'small'}>
          <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                  onClick={statusHandler}>All
          </Button>
          <Button color={"secondary"}
                  variant={filter === 'active' ? 'contained' : 'outlined'}
                  onClick={statusHandler}>Active
          </Button>
          <Button variant={filter === 'completed' ? 'contained' : 'outlined'}
                  color={'success'}
                  onClick={statusHandler}>Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
} )
