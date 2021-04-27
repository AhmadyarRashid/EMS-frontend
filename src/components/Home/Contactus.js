import React from 'react'
import {Box, Button, OutlinedInput, Typography} from "@material-ui/core";
import {colors} from "../../utils/colors";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return ({
    root: {
      padding: "80px 0",
      paddingBottom: "48px !important",
      [theme.breakpoints.down('sm')]: {
        padding: "40px 0",
      },
      display: 'flex',
      justifyContent: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '45%',
      [theme.breakpoints.down('sm')]: {
        width: '80%',
      },
    },
    title: {
      marginRight: 12,
      [theme.breakpoints.down('sm')]: {
        fontSize: '6vw'
      },
    },
    input: {
      marginTop: 20,
      minWidth: "60%",
      [theme.breakpoints.down('sm')]: {
        minWidth: "100%",
      },
    },
    btn: {
      padding: 8,
      marginTop: 20,
      minWidth: "20%",
      [theme.breakpoints.down('sm')]: {
        minWidth: "50%",
        padding: 4
      },
    }
  });
});

function ContactUs({themeMode}){
  const classes = useStyles()
  return(
    <Box component="div" className={classes.root}
         style={{backgroundColor: themeMode === "light" ? "white" : colors.black1}}>
      <Box component="div" className={classes.form}>
        <Typography variant="h4" className={classes.title}>Contact Us</Typography>
        <OutlinedInput
          id="outlined-basic"
          placeholder="name"
          variant="outlined"
          className={classes.input}
        />
        <OutlinedInput
          id="outlined-basic"
          placeholder="email"
          variant="outlined"
          className={classes.input}
        />
        <OutlinedInput
          id="outlined-basic"
          placeholder="phone No"
          variant="outlined"
          className={classes.input}
        />
        <OutlinedInput
          id="outlined-basic"
          placeholder="Message"
          variant="outlined"
          className={classes.input}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
        >Send</Button>
      </Box>
    </Box>
  )
}

export default ContactUs;
