import {TodolistsType} from "../App.tsx";
import {v1} from "uuid";


type ActionType = {
  type: string;
  [key: string]: any;
}

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType): Array<TodolistsType> => {
  switch (action.type) {

    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id);

    case 'ADD-TODOLIST':
      return [...state, {id: v1(), title: action.title, filter: 'all'}]

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
      throw new Error('Error in user reducer/ Check Action name')
  }
}
