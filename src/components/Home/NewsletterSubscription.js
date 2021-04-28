import React from "react"
import {Box, Typography, Button, OutlinedInput} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../../utils/colors";

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
      [theme.breakpoints.down('sm')]: {
        width: '80%'
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
      minWidth: "100%",
      [theme.breakpoints.down('sm')]: {
        padding: 0,
        minWidth: "80%",
      },
    },
    btn: {
      padding: 8,
      marginTop: 20,
      minWidth: "50%",
      [theme.breakpoints.down('sm')]: {
        padding: 4,
        minWidth: "40%",
      },
    }
  });
});

function NewsLettterSubscription({themeMode}) {
  const classes = useStyles()

  return (
    <Box component="div" className={classes.root}
         style={{backgroundColor: themeMode === "light" ? "white" : colors.black1}}>
      <Box component="div" className={classes.form}>
        <Typography variant="h4" className={classes.title}>Newsletter Subscription</Typography>
        <OutlinedInput
          id="outlined-basic"
          placeholder="enter email"
          variant="outlined"
          className={classes.input}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
        >Subscribe</Button>
      </Box>
    </Box>
  )
}

export default NewsLettterSubscription;