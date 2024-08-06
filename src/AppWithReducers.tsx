import {TaskType, Todolist} from "./Todolist.tsx";
import {useReducer} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm.tsx";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from "./state/todolist-reducer.ts";
import {
  addNewTaskActionCreator,
  changeTaskStatusActionCreator, changeTaskTitleActionCreator,
  deleteTaskActionCreator,
  tasksReducer
} from "./state/tasks-reducer.ts";

export type FilterValueType = 'all' | 'active' | 'completed';
export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValueType;
}
export type TasksObjectType = {
  [key: string]: Array<TaskType>
}

function AppWithReducers() {

  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
      {id: todolistId1, title: 'What to buy', filter: 'all',},
    {id: todolistId2, title: 'What to Learn', filter: 'all',}
  ])

  const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
    const  action = addTodolistAC(title)
    dispatchToTodolistsReducer(action)
  }
  const changeTodolistTitle = (title: string, todolistId: string) => {
    const action= changeTodolistTitleAC(todolistId, title)
    dispatchToTodolistsReducer(action)
  }
  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId)
    dispatchToTodolistsReducer(action)
  }
  const changeFilter = (value: FilterValueType, todolistId: string) => {
    const action = changeTodolistFilterAC(value , todolistId )
    dispatchToTodolistsReducer(action)
  }
  const addNewTask = (title: string, todolistId: string) => {
    const action = addNewTaskActionCreator(todolistId, title)
    dispatchToTasksReducer(action)
  }
  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    const action = changeTaskStatusActionCreator(todolistId, isDone, taskId)
    dispatchToTasksReducer(action)
  }
  const changeTaskTitle = (id: string, todolistId: string, newTitle: string) => {
    const action = changeTaskTitleActionCreator(todolistId, id, newTitle)
    dispatchToTasksReducer(action)
  }
  const removeTask = (id, tasksId) => {
    const action = deleteTaskActionCreator(id, tasksId)
    console.log(action)
    dispatchToTasksReducer(deleteTaskActionCreator(id, tasksId))
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
                  <Grid item key={todolist.id}>
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

export default AppWithReducers
