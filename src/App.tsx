
import {TaskType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed';
export interface TodolistsType {
  id: string;
  title: string;
  filter: FilterValueType;
}
function App() {

  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState <Array<TodolistsType>> ([
    { id: todolistId1, title: 'What to buy', filter: 'active', },
    { id: todolistId2, title: 'What to Learn', filter: 'all', },
  ])

  const removeTodolist = (tasksId: string) => {
    let changedList = todolists.filter( tl => tl.id !== tasksId)
    setTodolists(changedList)
  }

  const [tasksObj, setTasksObj] = useState({
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

  })

  const changeFilter = (value: FilterValueType, todolistId: string) => {
    let todolist = todolists.find( list => list.id === todolistId)
    if (todolist) {
      todolist.filter = value;
    }
    setTodolists([...todolists])
    console.log(todolists)
  }

  const addNewTask = (title: string, tasksId: string) => {
    let tasks = tasksObj[tasksId]

    let newTask = {
      id: v1(),
      title,
      isDone: false,
    }

    tasks.push(newTask)
    tasksObj[tasksId] = tasks

    setTasksObj({...tasksObj})
  }

  const changeTaskStatus = (id: string, isDone: boolean, tasksId: string) => {
    let tasks = tasksObj[tasksId]
    let task = tasks.find( task => task.id === id)
      if(task) {
        task.isDone = isDone
      }
      tasksObj[tasksId] = tasks
      setTasksObj({...tasksObj})
  }

  const removeTask = (id: string, tasksId: string) => {
    let tasks = tasksObj[tasksId]
    tasksObj[tasksId] = tasks.filter(task => task.id !== id)
    setTasksObj({...tasksObj})
  }



  return (
    <>
      {
        todolists.map( todolist => {
          let tasksToTodolist = tasksObj[todolist.id];

          if (todolist.filter === 'active') {
            tasksToTodolist = tasksToTodolist.filter(task => !task.isDone)
          }
          if (todolist.filter === 'completed') {
            tasksToTodolist = tasksToTodolist.filter(task => task.isDone)
          }

          return <Todolist
                      key={todolist.id}
                      todolistId={todolist.id}
                      title={todolist.title}
                      tasks={tasksToTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addNewTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={todolist.filter}
                      removeTodolist={removeTodolist}
          />
        })
      }
    </>
  )
}

export default App
