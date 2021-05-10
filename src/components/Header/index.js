import React, {useState, useEffect} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {Container, Typography, Paper, Box, Menu, MenuItem, Hidden} from "@material-ui/core"
import DarkIcon from '@material-ui/icons/Brightness4'
import BrightIcon from '@material-ui/icons/Brightness7'
import MenuIcon from '@material-ui/icons/Menu'
import {withRouter} from "react-router"
import NotificationsIcon from '@material-ui/icons/NotificationsNone'

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  logo: {
    fontWeight: "bold",
    cursor: "pointer"
  },
  icon: {
    cursor: "pointer",
    marginRight: 12
  },
  menuIcon: {
    cursor: "pointer",
  }
}));

function Header({onToggleDark, themeMode, ...props}) {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper className={classes.paper}>
      <Container className={classes.container}>
        <Hidden smUp sm>
          <Typography variant="h5" subtitle1="h2" className={classes.logo}>
            EMS
          </Typography>
        </Hidden>
        <Hidden smDown>
          <Typography variant="h5" subtitle1="h2" className={classes.logo}>
            Event Management System
          </Typography>
        </Hidden>

        <Box component="div">
          {themeMode === "dark" ?
            <BrightIcon onClick={onToggleDark} className={classes.icon}/> :
            <DarkIcon onClick={onToggleDark} className={classes.icon}/>}

          <NotificationsIcon className={classes.icon}/>

          <MenuIcon
            className={classes.menuIcon}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          />

          {isLoggedin ?
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {
                handleClose()
                props.history.push("/admin")
              }}>Dashboard</MenuItem>
              <MenuItem onClick={() => {
                handleClose()
                localStorage.removeItem("userInfo")
                props.history.push("/login")
              }}>Logout</MenuItem>
            </Menu> :
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {
                handleClose()
                props.history.push("/login")
              }}>Login</MenuItem>
            </Menu>
          }
        </Box>
      </Container>
    </Paper>
  )
}

export default withRouter(Header)
