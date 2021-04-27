import React from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {Box, Container, Grid, Paper, GridList} from "@material-ui/core"
import {colors} from "../../utils/colors"
import EventCard from "../EventCard";

const useStyles = makeStyles((theme) => ({
  events: {
    padding: "80px 0",
    paddingBottom: "48px !important",
    [theme.breakpoints.down('sm')]: {
      padding: "40px 0",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  eventsList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
}));

function Events({themeMode}) {
  const classes = useStyles()
  return (
    <Box component="div" className={classes.events}
         style={{backgroundColor: themeMode === "light" ? colors.pink : colors.black}}>
      <Container>
        <Box
          component="div"
          className={classes.eventsList}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(item => (
            <EventCard/>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Events;
