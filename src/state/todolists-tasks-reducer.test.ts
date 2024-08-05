import {TasksObjectType, TodolistsType} from "../App.tsx";
import {addTodolistAC, todolistsReducer} from "./todolist-reducer.ts";
import {tasksReducer} from "./tasks-reducer.ts";

test('todolists ID-s in reducers must be equals', () => {
  const startTasksState : TasksObjectType = {}
  const startTodolistsState: Array<TodolistsType> = []

  const action = addTodolistAC('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.id)
  expect(idFromTodolists).toBe(action.id)
})
