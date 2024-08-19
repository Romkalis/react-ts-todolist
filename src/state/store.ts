import { combineReducers, createStore} from 'redux'
import {todolistsReducer} from "./todolist-reducer.ts";
import {tasksReducer} from "./tasks-reducer.ts";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})

export type AppRootState = ReturnType< typeof rootReducer >

export const store: AppRootState = createStore(rootReducer)




