import React, {useState, useEffect} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {Box, Container, CircularProgress} from "@material-ui/core"
import {colors} from "../../utils/colors"
import EventCard from "../EventCard";
import axios from "axios";
import {baseUrl} from "../../utils/constant";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import moment from "moment";

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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  searchContainer: {
    marginLeft: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}));

function Events({themeMode}) {
  const classes = useStyles()

  const [events, setEvents] = useState([])
  const [isloading, setLoading] = useState(false);
  const [sort, setSort] = useState("calendar")
  const [category, setCategory] = useState("previous")
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setLoading(true)
    axios.get(`${baseUrl}/api/event/admin/1`)
      .then(({data}) => {
        setLoading(false)
        console.log("events api response:", data)
        setEvents(data.payload)
        setFilteredEvents(data.payload)
      })
      .catch(error => {
        setLoading(false)
        console.log("events api error:", error)
      })
  }, [])

  const handleChange = (event) => {
    setSort(event.target.value);
    setCategory("")
    setStartDate("")
    setEndDate("")
  };

  if (isloading)
    return <CircularProgress/>
  console.log("filteredEvents", filteredEvents)
  return (
    <Box component="div" className={classes.events}
         style={{backgroundColor: themeMode === "light" ? colors.pink : colors.black}}>
      <Container>
        <Box component="div" className={classes.searchContainer}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={sort}
              onChange={handleChange}
              style={{minWidth: 385}}
              label="Sort"
            >
              <MenuItem value="calendar">Calendar</MenuItem>
              <MenuItem value="category">Category</MenuItem>
            </Select>
          </FormControl>

          {sort === "calendar"
            ? <Box component="div">
              <TextField
                id="date"
                label="start date"
                type="date"
                value={startDate}
                onChange={e => {
                  setStartDate(e.target.value)
                  setFilteredEvents(events.filter(item =>
                    moment(item.startDateTime).endOf("day").diff(moment(e.target.value).endOf("day"), "days") >= 0 &&
                    moment(item.startDateTime).endOf("day").diff(moment(endDate).endOf("day"), "days") <= 0
                  ))
                }}
                className={classes.textField}
                style={{marginRight: 20}}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="date"
                label="end date"
                type="date"
                value={endDate}
                onChange={e => {
                  setEndDate(e.target.value)
                  setFilteredEvents(events.filter(item =>
                    moment(item.startDateTime).endOf("day").diff(moment(startDate).endOf("day"), "days") >= 0 &&
                    moment(item.startDateTime).endOf("day").diff(moment(e.target.value).endOf("day"), "days") <= 0
                  ))
                }}
                className={classes.textField}
                style={{marginRight: 20}}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            : <Box component="div" style={{marginTop: 20}}>
              <ButtonGroup color="secondary" aria-label="outlined primary button group">
                <Button
                  onClick={() => {
                    setCategory("previous")
                    setFilteredEvents(events.filter(item =>  moment(item.startDateTime).endOf("day").diff(moment(new Date()).endOf("day"), "days") < 0))
                  }}
                  variant={category === "previous" && "contained"}
                >Previous</Button>
                <Button
                  onClick={() => {
                    setCategory("today")
                    setFilteredEvents(events.filter(item =>  moment(item.startDateTime).endOf("day").diff(moment(new Date()).endOf("day"), "days") === 0))
                  }}
                  variant={category === "today" && "contained"}
                >Today</Button>
                <Button
                  onClick={() => {
                    setCategory("upComing")
                    setFilteredEvents(events.filter(item =>  moment(item.startDateTime).endOf("day").diff(moment(new Date()).endOf("day"), "days") > 0))
                  }}
                  variant={category === "upComing" && "contained"}
                >Up-Coming</Button>
              </ButtonGroup>

            </Box>}
        </Box>
        <Box
          component="div"
          className={classes.eventsList}
        >
          {filteredEvents.length < 1 ? <h3>No Event avaiable</h3> : filteredEvents.map(item => (
            <EventCard event={item}/>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Events;
