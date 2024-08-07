import {FilterValueType} from "../App.tsx";
import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Button, ButtonGroup, IconButton, Checkbox} from "@mui/material";
import {Delete} from "@mui/icons-material";

export interface TaskType {
  id: string;
  title: string;
  isDone: boolean;
}

export type TodolistProps = {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  removeTask: (id: string, taskId: string) => void;
  changeFilter: (value: string, todolistId: string) => void;
  addItem: (str: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (id: string, todolistId: string, newTitle: string) => void;
  filter: FilterValueType;
  removeTodolist: (taskId: string) => void;
  changeTodolistTitle: (title: string, todolistId: string) => void
}

export function Todolist({
                           todolistId,
                           title,
                           tasks,
                           removeTask,
                           changeFilter,
                           addItem,
                           changeTaskStatus,
                           filter,
                           removeTodolist,
                           changeTaskTitle,
                           changeTodolistTitle
                         }: TodolistProps) {
  const statusHandler = (evt) => {
    changeFilter((evt.target.textContent).toLowerCase(), todolistId)
  }
  const onTodolistRemove = () => {
    removeTodolist(todolistId)
  }
  const addTask = (title: string) => {
    addItem(title, todolistId)
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
          tasks?.map(task => {
            const onRemoveHandler = () => removeTask(todolistId, task.id)
            const onChangeTaskStatus = (evt: ChangeEvent<HTMLInputElement>) => {
              changeTaskStatus(task.id, evt.target.checked, todolistId)
            }
            const onChangeTaskTitle = (value) => {
              changeTaskTitle(task.id, todolistId, value)
            }
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
}


