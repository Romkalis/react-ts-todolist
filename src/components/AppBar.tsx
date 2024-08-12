import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import React from "react";

export const HeaderAppBar = () => {
  return (
    <AppBar position={'static'} style={{marginBottom: "20px"}}>
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
            <Menu/>
          </IconButton>
          <Typography variant={'h6'}>
            News
          </Typography>
          <Button color={'inherit'}>  Login</Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
