import {v1} from "uuid";
import {TasksObjectType} from "../App.tsx";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer.ts";


type AddNewTaskActionType = {
  type: 'ADD-NEW-TASK';
  id: string;
  title: string;
  isDone: boolean;
}
type ChangeTaskActionType = {
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

type ActionType =
  AddNewTaskActionType
  | ChangeTaskActionType
  | RemoveTypeActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType


export const todolistId1 = v1()
export const todolistId2 = v1()


const initalState = {
  [todolistId1]: [
    {id: v1(), title: "Css", isDone: true},
  ],
}

export const tasksReducer = (state: TasksObjectType = initalState, action: ActionType): TasksObjectType => {
  switch (action.type) {
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
      const todolist = state[action.id].map(
        task => task.id === action.taskId ? {...task, isDone: action.isDone} : task
      )
      return {...state, [action.id]: todolist}
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
      const todolist = state[action.id].map( task =>
        task.id === action.taskId
          ? {...task, title: action.title}
          : task
      )
        return {...state, [action.id]: todolist}
    }
    case 'ADD-TODOLIST': {
      const stateCopy = {...state}
      stateCopy[action.id] = []
      return {...stateCopy}
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = {...state}
      delete stateCopy[action.id]
      return stateCopy
    }
    default:
      return state
  }
}

export const addNewTaskActionCreator = (todolistId, taskTitle): AddNewTaskActionType => {
  return {
    type: 'ADD-NEW-TASK',
    id: todolistId,
    title: taskTitle,
    isDone: false,
  }
}
export const changeTaskStatusActionCreator = (todolistId, status, taskId): ChangeTaskActionType => {
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

