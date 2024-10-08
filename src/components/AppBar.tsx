import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export const HeaderAppBar = () => {
  return (
    <AppBar position={'static'} style={{marginBottom: "20px"}}>
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
            <Menu/>
          </IconButton>
          <Typography variant={'h6'}>
            Новости
          </Typography>
          <Button color={'inherit'}>  Login</Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
