import {
  AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todolistsReducer
} from "./todolist-reducer.ts";
import {v1} from "uuid";
import {FilterValueType, TodolistsType} from "../App.tsx";


test('check removeTodoList option', () => {

  const todolistId1 = v1()
  const todolistId2 = v1()

  const startState: Array<TodolistsType> = [
    {id: todolistId1, title: 'What to buy', filter: 'all',},
    {id: todolistId2, title: 'What to Learn', filter: 'all',},
  ]

  const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId2))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId1)
  expect(endState).toEqual([{id: todolistId1, title: 'What to buy', filter: 'all',}])
})

test('todolist should be added', () => {
  const todolistId1 = v1()
  const todolistId2 = v1()
  const newTodolistTitle = 'newTodolistTitle'

  const startState: Array<TodolistsType> = [
    {id: todolistId1, title: 'What to buy', filter: 'all',},
    {id: todolistId2, title: 'What to Learn', filter: 'all',},
  ]
  const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTodolistTitle)
  expect(endState[2].filter).toBe('all')
})

test('todolist title should be changed', () => {

  const todolistId1 = v1()
  const todolistId2 = v1()
  const newTodolistTitle = 'newTodolistTitle'

  const startState: Array<TodolistsType> = [
    {id: todolistId1, title: 'What to buy', filter: 'all',},
    {id: todolistId2, title: 'What to Learn', filter: 'all',},
  ]

  const endState = todolistsReducer(startState, ChangeTodolistTitleAC( todolistId1, newTodolistTitle ))

  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe(newTodolistTitle)

})

test('todolist filter should be changed', () => {

  const todolistId1 = v1()
  const todolistId2 = v1()
  const newTodolistFilter: FilterValueType = 'completed'

  const startState: Array<TodolistsType> = [
    {id: todolistId1, title: 'What to buy', filter: 'all',},
    {id: todolistId2, title: 'What to Learn', filter: 'all',},
  ]

  const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, newTodolistFilter))

  expect(endState[1].filter).toBe(newTodolistFilter)
})
