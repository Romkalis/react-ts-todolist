import {TaskType, Todolist} from "./components/Todolist.tsx";
import {AddItemForm} from "./components/AddItemForm.tsx";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
  addTodolistAC,
} from "./state/todolist-reducer.ts";

import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store.ts";
import React from "react";
import {HeaderAppBar} from "./components/AppBar.tsx";

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

  console.log('Render AppWithRedux')


  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState>(state => state.todolists)
  const tasks = useSelector<AppRootState, TasksObjectType>(state => state.tasks)
  const addNewTodoList = (title: string) => {
    const action = addTodolistAC(title)
    dispatch(action)
  }


  return (
    <div className="app">

      <HeaderAppBar />

      <Container maxWidth="md">
        <Grid container>
          <AddItemForm addItem={addNewTodoList}/>
        </Grid>

        <Grid container spacing={3}>

          {
            todolists.map(todolist => {
              return (
                <Grid item key={todolist.id}>
                  <Paper elevation={3} style={{padding: '15px'}}>
                    <Todolist
                      key={todolist.id}
                      todolistId={todolist.id}
                      title={todolist.title}
                      tasks={tasks[todolist.id]}
                      filter={todolist.filter}
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
