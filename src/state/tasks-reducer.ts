import {v1} from "uuid";
import {TasksObjectType} from "../App.tsx";


type AddNewTaskActionType ={
   type: 'ADD-NEW-TASK';
   id: string;
   title: string;
   isDone: boolean;
}
type ChangeTaskActionType ={
   type: 'CHANGE-TASK-STATUS';
   id: string;
   isDone: boolean;
   taskId: string;
}
type RemoveTypeActionType = {
  type: 'DELETE-TASK';
  id: string;
  taskId: string
}
type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE';
  id: string;
  taskId: string;
  title: string;
}

type ActionType = AddNewTaskActionType | ChangeTaskActionType | RemoveTypeActionType | ChangeTaskTitleActionType

export const tasksReducer = (state: TasksObjectType, action: ActionType): TasksObjectType => {
  switch(action.type) {
    case "ADD-NEW-TASK": {
      const newTask = {
        id: v1(),
        title: action.title,
        isDone: false
      }
      const changedTodolist = [...state[action.id], newTask]
      return {...state, [action.id]: changedTodolist}
    }
    case 'CHANGE-TASK-STATUS': {
      // const changeTaskStatus = (id: string, isDone: boolean, tasksId: string)
      const todolist = state[action.id]
      const updatedTodolist = todolist.map( task => task.id === action.taskId ? {...task, isDone: action.isDone} : task)

      return {...state, [action.id]: updatedTodolist}
    }
    case 'DELETE-TASK': {
      const todolist = state[action.id]
      if (todolist) {
        const filteredTodolist = [...todolist.filter(task => task.id !== action.taskId)]
        return {...state, [action.id]: filteredTodolist}
      }
      break
    }
    case 'CHANGE-TASK-TITLE': {

      const todolist = state[action.id]
      if (todolist) {
        const updatedTodolist = todolist.map(task => (
          task.id === action.taskId ? {...task, title: action.title} : task
        ))
        return {...state, [action.id]: updatedTodolist}
      }
      break
    }
    default: throw new Error ('Wrong action type in tasks reducer')
  }
}

export const AddNewTaskActionCreator = (todolistId, taskTitle): AddNewTaskActionType => {
  return {
    type: 'ADD-NEW-TASK',
    id: todolistId,
    title: taskTitle,
    isDone: false,
  }
}
export const ChangeTaskStatusActionCreator = (todolistId, status, taskId): ChangeTaskActionType => {
  return {
    type: 'CHANGE-TASK-STATUS',
    id: todolistId,
    isDone: status,
    taskId: taskId
  }
}
export const deleteTaskActionCreator = (id, taskId): RemoveTypeActionType => {
  return {
    type: 'DELETE-TASK',
    id,
    taskId,
  }
}
export const changeTaskTitleActionCreator = (id, taskId, title): ChangeTaskTitleActionType => {
  return {
    type: 'CHANGE-TASK-TITLE',
    id, taskId, title,
  }
}

