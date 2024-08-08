import {FilterValueType, TodolistsType} from "../App.tsx";
import {v1} from "uuid";
// import {useReducer} from "react";
import {
  // tasksReducer,
  todolistId1, todolistId2} from "./tasks-reducer.ts";

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  title: string;
  id: string;
}
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE';
  id: string;
  title: string;
}
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string;
  filter: FilterValueType;
}

type ActionsTypes =
  RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType


const initialState: Array<TodolistsType> = [
  {id: todolistId1, title: 'What to buy', filter: 'all',},
  {id: todolistId2, title: 'What to Learn', filter: 'all',}
]
export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionsTypes): Array<TodolistsType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return [...state.filter(tl => tl.id !== action.id)]
    case 'ADD-TODOLIST':
      return [{id: action.id, title: action.title, filter: 'all'}, ...state]
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.id === action.id)
      if (todolist) {
        todolist.title = action.title
        return [...state]
      }
      break
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(tl => tl.id === action.id)
      if (todolist) {
        todolist.filter = action.filter
        return [...state]
      }
      break
    }
    default:
      return state
  }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolistTitle: string): AddTodolistActionType => {
  return {type: 'ADD-TODOLIST', title: todolistTitle, id: v1()}
}
export const changeTodolistTitleAC = (todolistId: string, todolistTitle: string): ChangeTodolistTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', title: todolistTitle, id: todolistId}
}
export const changeTodolistFilterAC = (todolistFilter: FilterValueType, todolistId: string): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: todolistFilter}
}
