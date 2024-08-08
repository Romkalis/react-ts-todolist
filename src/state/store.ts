import { combineReducers, createStore} from 'redux'
import {todolistsReducer} from "./todolist-reducer.ts";
import {tasksReducer} from "./tasks-reducer.ts";
import {TasksObjectType, TodolistsType} from "../AppWithRedux.tsx";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})

// type AppRootState = {
//   todolists: Array<TodolistsType> ;
//   tasks: TasksObjectType
// }
export type AppRootState = ReturnType< typeof rootReducer >

export const store: AppRootState = createStore(rootReducer)


// @ts-ignore
window.store = store;



