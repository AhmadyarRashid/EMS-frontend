import React from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {Container, Typography, Paper, Box, Button, Menu, MenuItem, Hidden} from "@material-ui/core"
import DarkIcon from '@material-ui/icons/Brightness4'
import BrightIcon from '@material-ui/icons/Brightness7'
import MenuIcon from '@material-ui/icons/Menu'
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

function Header({onToggleDark, themeMode}) {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null);

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
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Container>
    </Paper>
  )
}

export default Header
