import {TaskType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm.tsx";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValueType = 'all' | 'active' | 'completed';
export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValueType;
}
export type TasksObjectType = {
  [key: string]: Array<TaskType>
}

function App() {

  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState<Array<TodolistsType>>([
    {id: todolistId1, title: 'What to buy', filter: 'all',},
    {id: todolistId2, title: 'What to Learn', filter: 'all',},
  ])
  const [tasksObj, setTasksObj] = useState<TasksObjectType>({
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
  const addNewTodoList = (title: string) => {

    const newTodoList: TodolistsType = {
      id: v1(),
      title,
      filter: 'all',
    }
    setTodolists(prevState => [...prevState, newTodoList])
    setTasksObj({
      ...tasksObj,
      [newTodoList.id]: []
    })
  }
  const changeTodolistTitle = (title: string, todolistId: string) => {
    const todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.title = title
      setTodolists([...todolists])
    }
  }
  const removeTodolist = (tasksId: string) => {
    const changedList = todolists.filter(tl => tl.id !== tasksId)
    setTodolists(changedList)
  }
  const changeFilter = (value: FilterValueType, todolistId: string) => {
    const todolist = todolists.find(list => list.id === todolistId)
    if (todolist) {
      todolist.filter = value;
    }
    setTodolists([...todolists])
    console.log(todolists)
  }

  const addNewTask = (title: string, tasksId: string) => {
    const tasks = tasksObj[tasksId]

    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    }

    tasks.push(newTask)
    tasksObj[tasksId] = tasks

    setTasksObj({...tasksObj})
  }
  const changeTaskStatus = (id: string, isDone: boolean, tasksId: string) => {
    const tasks = tasksObj[tasksId]
    const task = tasks.find(task => task.id === id)
    if (task) {
      task.isDone = isDone
    }
    tasksObj[tasksId] = tasks
    setTasksObj({...tasksObj})
  }
  const changeTaskTitle = (id: string, todolistId: string, newTitle: string) => {
    const tasks = tasksObj[todolistId]
    const changeableTask = tasks.find(task => task.id === id)

    changeableTask!.title = newTitle

    tasksObj[todolistId] = tasks
    setTasksObj({...tasksObj})
  }
  const removeTask = (id: string, tasksId: string) => {
    const tasks = tasksObj[tasksId]
    tasksObj[tasksId] = tasks.filter(task => task.id !== id)
    setTasksObj({...tasksObj})
  }

  return (
    <>
      <div className="app">

        <AppBar position={'static'} style={{marginBottom: "20px"}}>
          <Container maxWidth="lg">
            <Toolbar>
              <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                <Menu/>
              </IconButton>
              <Typography variant={'h6'}>
                News
              </Typography>
              <Button color={'inherit'}>Login</Button>
            </Toolbar>
          </Container>
        </AppBar>

        <Container maxWidth="md">
          <Grid container>
            <AddItemForm addItem={addNewTodoList}/>
          </Grid>

          <Grid container spacing={3}>

            {
              todolists.map(todolist => {
                let tasksToTodolist = tasksObj[todolist.id];

                if (todolist.filter === 'active') {
                  tasksToTodolist = tasksToTodolist.filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                  tasksToTodolist = tasksToTodolist.filter(task => task.isDone)
                }

                return (
                  <Grid item>
                    <Paper elevation={3} style={{padding: '15px'}}>
                      <Todolist
                        key={todolist.id}
                        todolistId={todolist.id}
                        title={todolist.title}
                        tasks={tasksToTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addItem={addNewTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={todolist.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                      />
                    </Paper>
                  </Grid>
                )
              })
            }
          </Grid>
        </Container>

      </div>
    </>
  )
}

export default App
