import {
  addNewTaskActionCreator,
  changeTaskStatusActionCreator, changeTaskTitleActionCreator,
  deleteTaskActionCreator,
  tasksReducer
} from "./tasks-reducer.ts";
import {v1} from "uuid";
import {TasksObjectType} from "../App.tsx";
import {addTodolistAC} from "./todolist-reducer.ts";

test('Adding new task to todolist testing', () => {

  const todolistId1 = v1()
  const todolistId2 = v1()
  const newTaskTitle = 'I\'m new task btch'

  const startState = {
    [todolistId1]: [
      {id: v1(), title: "Css", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: false,},
      {id: v1(), title: "REST Api", isDone: false,},
      {id: v1(), title: "GraphQL", isDone: false,},
      {id: v1(), title: "Zustand", isDone: false,},
    ],
    [todolistId2]: [
      {id: v1(), title: "Bread", isDone: true},
      {id: v1(), title: "Hammer", isDone: false,},
    ],
  }

  const endState = tasksReducer(startState, addNewTaskActionCreator(todolistId2, newTaskTitle))

  expect(endState[todolistId2].length).toBe(3)
  expect(endState[todolistId2][endState[todolistId2].length - 1].title).toBe(newTaskTitle)
  expect(endState[todolistId2][endState[todolistId2].length - 1].isDone).toBe(false)
})
test('Change task title testing', () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const startState = {
    [todolistId1]: [
      {id: v1(), title: "Css", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: false,},
      {id: v1(), title: "REST Api", isDone: false,},
      {id: v1(), title: "GraphQL", isDone: false,},
      {id: v1(), title: "Zustand", isDone: false,},
    ],
    [todolistId2]: [
      {id: v1(), title: "Bread", isDone: true},
      {id: v1(), title: "Hammer", isDone: false,},
    ],
  }

  // const endState = tasksReducer(state, )
const endState = tasksReducer(startState, changeTaskStatusActionCreator(todolistId1, true, startState[todolistId1][2].id))
expect(endState[todolistId1][2].isDone).toBe(true)
})
test('remove task testing', () => {
  const todolistId1 = 'todolistId1'
  const todolistId2 = 'todolistId2'

  const startState = {
    [todolistId1]: [
      {id: '1', title: "JS", isDone: true},
      {id: '2', title: "React", isDone: false,},

    ],
    [todolistId2]: [
      {id: '1', title: "Bread", isDone: true},
      {id: '2', title: "Hammer", isDone: false,},
    ],
  }

  const action = deleteTaskActionCreator(todolistId2, '2')

  const endState = tasksReducer(startState, action)

  expect(endState[todolistId2].length).toBe(1)
  expect(endState[todolistId1].length).toBe(2)
  expect(endState[todolistId1][1].id).toBe('2')
})
test('change task title testing', () => {
  const todolistId1 = 'todolistId1'
  const todolistId2 = 'todolistId2'

  const startState = {
    [todolistId1]: [
      {id: '1', title: "JS", isDone: true},
      {id: '2', title: "React", isDone: false,},

    ],
    [todolistId2]: [
      {id: '1', title: "Bread", isDone: true},
      {id: '2', title: "Hammer", isDone: false,},
    ],
  }

  const action =  changeTaskTitleActionCreator(todolistId2, '2', 'kolbaska');

  const endState = tasksReducer(startState, action)

  expect(endState[todolistId2].length).toBe(2)
  expect(endState[todolistId2][1].title).toBe('kolbaska')

})
test('new array should be added when new todolist added', () => {
  const startState :TasksObjectType = {
    'todolistId1': [
      {id: '1', title: "JS", isDone: true},
      {id: '2', title: "React", isDone: false,},
      {id: '3', title: "Jest", isDone: false,},

    ],
    'todolistId2': [
      {id: '1', title: "Bread", isDone: true},
      {id: '2', title: "Hammer", isDone: false,},
      {id: '3', title: "Milk", isDone: false,},
    ],
  }

  const action = addTodolistAC('new todolist')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
  if (!newKey) {
    throw new Error('new key should be added!')
  }
  expect(keys.length).toBe(3) // проверяем что в стейте теперь 3 олбъекта, по количеству ключей
  expect(endState[newKey]).toEqual([]) // проверяем, чтоу  третьего ключа значение - пустой массив
})
