import {TaskType, Todolist} from "./components/Todolist.tsx";
import {AddItemForm} from "./components/AddItemForm.tsx";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/todolist-reducer.ts";
import {
  addNewTaskActionCreator,
  changeTaskStatusActionCreator,
  changeTaskTitleActionCreator,
  deleteTaskActionCreator,
} from "./state/tasks-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store.ts";

export type FilterValueType = 'all' | 'active' | 'completed';
export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValueType;
}
export type TasksObjectType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {

  const dispatch = useDispatch()

  const todolists = useSelector<AppRootState>(state => state.todolists)
  const tasks = useSelector<AppRootState, TasksObjectType>(state => state.tasks)

  const addNewTodoList = (title: string) => {
    const action = addTodolistAC(title)
    dispatch(action)
  }
  const changeTodolistTitle = (title: string, todolistId: string) => {
    const action = changeTodolistTitleAC(todolistId, title)
    dispatch(action)
  }
  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    const action = changeTaskStatusActionCreator(todolistId, isDone, taskId)
    dispatch(action)
  }
  const changeTaskTitle = (id: string, todolistId: string, newTitle: string) => {
    const action = changeTaskTitleActionCreator(todolistId, id, newTitle)
    dispatch(action)
  }
  const removeTask = (id, tasksId) => {
    dispatch( deleteTaskActionCreator(id, tasksId) )
  }

  return (
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
              let tasksToTodolist = tasks[todolist.id];

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
                      filter={todolist.filter}
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
  )
}

export default AppWithRedux
