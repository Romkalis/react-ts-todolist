import {useDispatch} from "react-redux";
import React, {ChangeEvent, useCallback} from "react";
import {
  changeTaskStatusActionCreator,
  changeTaskTitleActionCreator,
  deleteTaskActionCreator
} from "../state/tasks-reducer.ts";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan.tsx";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist.tsx";

interface TaskPropsType {
  task: TaskType;
  todolistId: string;
}

export const Task: React.FC<TaskPropsType> = ({task, todolistId}) => {
  const dispatch = useDispatch();

  const onRemoveHandler = useCallback(
    () => dispatch(deleteTaskActionCreator(todolistId, task.id))
    , [dispatch, todolistId, task.id])
  const onChangeTaskStatus = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) =>
    dispatch(changeTaskStatusActionCreator(todolistId, evt.target.checked, task.id))
    , [dispatch, todolistId, task.id])
  const onChangeTaskTitle = useCallback(
    (title) => dispatch(changeTaskTitleActionCreator(todolistId, task.id, title))
     , [dispatch, todolistId, task.id])

  return (
    <li className={task.isDone ? 'is-done' : ''} key={task.id}>
      <Checkbox onChange={onChangeTaskStatus}
                checked={task.isDone}
                color={'success'}/>
      <EditableSpan title={task.title} onChange={onChangeTaskTitle}/>
      <IconButton onClick={onRemoveHandler} size={'small'}>
        <Delete/>
      </IconButton>
    </li>
  )
}
