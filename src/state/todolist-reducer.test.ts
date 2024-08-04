import {AddTodolistActionType, ChangeTodolistTitleActionType, todolistsReducer} from "./todolist-reducer.ts";
import {v1} from "uuid";
import {FilterValueType, TodolistsType} from "../App.tsx";


test('check removeTodoList option', () => {

  const todolistId1 = v1()
  const todolistId2 = v1()

  const startState: Array<TodolistsType> = [
    {id: todolistId1, title: 'What to buy', filter: 'all',},
    {id: todolistId2, title: 'What to Learn', filter: 'all',},
  ]

  const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId2})

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
  const action: AddTodolistActionType = {type: 'ADD-TODOLIST', title: newTodolistTitle}
  const endState = todolistsReducer(startState, action)

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
  const action: ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: newTodolistTitle,
    id: todolistId1
  }
  const endState = todolistsReducer(startState, action)

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
  const endState = todolistsReducer(startState, {
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistId2,
    filter: newTodolistFilter
  })

  expect(endState[1].filter).toBe(newTodolistFilter)
})
