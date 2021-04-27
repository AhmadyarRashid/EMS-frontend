import React from "react"
import {Box, TextField, Typography, Button} from "@material-ui/core"
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
      flexDirection: 'row',
      alignItems: 'center'
    },
    title: {
      marginRight: 12
    }
  });
});

function NewsLettterSubscription({themeMode}) {
  const classes = useStyles()

  return (
      <Box component="div" className={classes.root}
           style={{backgroundColor: themeMode === "light" ? "white" : colors.black}}>
        <Box component="div" className={classes.form}>
          <Typography variant="subtitle1" className={classes.title}>Newsletter Subscription</Typography>
          <TextField id="outlined-basic" label="Outlined" variant="outlined"/>
          <Button variant="contained" color="primary" style={{padding: 8, marginLeft: 12}}>Add</Button>
        </Box>
      </Box>
  )
}

export default NewsLettterSubscription;
