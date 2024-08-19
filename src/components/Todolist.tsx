import {FilterValueType} from "../App.tsx";
import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Button, ButtonGroup, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolist-reducer.ts";
import {addNewTaskActionCreator} from "../state/tasks-reducer.ts";
import {Task} from "./Task.tsx";

export interface TaskType {
  id: string;
  title: string;
  isDone: boolean;
}

export type TodolistProps = {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  filter: FilterValueType;
}

export const Todolist = React.memo(({todolistId, title, tasks, filter}: TodolistProps) => {
  console.log(`render ${title} Todolist`)
  const dispatch = useDispatch()

  const statusHandler = (evt: React.MouseEvent<HTMLElement>) => {
    const text = (evt.target.textContent || '').toLowerCase()
    dispatch(changeTodolistFilterAC(text, todolistId))
  }
  const onTodolistRemove = () => {
    dispatch(removeTodolistAC(todolistId))
  }
  const addTask = useCallback((title: string) => {
    dispatch(addNewTaskActionCreator(todolistId, title))
  }, [dispatch, todolistId])

  const changeTodolistTitle = useCallback((title: string) => {
    const action = changeTodolistTitleAC(todolistId, title)
    dispatch(action)
  }, [dispatch, todolistId])

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
        <EditableSpan title={title} onChange={changeTodolistTitle}/>
        <IconButton onClick={onTodolistRemove} size={'small'}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>
      <ul>
        {
          tasksToTodolist?.map(task => <Task key={task.id} task={task} todolistId={todolistId}/>)
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
})

