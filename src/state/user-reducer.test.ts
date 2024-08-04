import {userReducer} from "./user-reducer.ts";

test('user reducer should increment only age', () => {
  const startState = { age: 20, childrenCount: 2, name: 'Lis'};

  const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

  expect(endState.age).toBe(21)
  expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only childrenCount', () => {
  const startState = { age: 20, childrenCount: 2, name: 'Lis'};

  const endState = userReducer(startState, { type: 'INCREMENT-CHILDREN-COUNT' })

  expect(endState.age).toBe(20)
  expect(endState.childrenCount).toBe(3)
})


test('user reducer should change users name', () => {
  const startState = {name: 'Usssser', age: 33, childrenCount: 12}
  const newName = 'Ololoev'
  const  endState = userReducer(startState, {type: 'CHANGE-USER-NAME', newName: newName})

  expect(endState.age).toBe(33)
  expect(endState.childrenCount).toBe(12)
  expect(endState.name).toBe('Ololoev')
})

