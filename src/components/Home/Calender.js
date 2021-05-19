import React, {useState} from "react"
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import Switch from '@material-ui/core/Switch';
import {Typography, Container, Box, Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const localizer = momentLocalizer(moment)

function CalenderComponent({events}) {

  const [isShow, setShow] = useState(false);
  const userInfo = localStorage.getItem("userInfo")

  const eventList = events.map(event => ({
    id: event.id,
    title: event.title,
    allDay: true,
    start: new Date(event.startDateTime),
    end: new Date(event.endDateTime),
  }))

  return (
    <div style={{margin: 30}}>
      <Container style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
        <Box style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Typography variant="h6">Switch to Calender</Typography>
          <Switch
            checked={isShow}
            onChange={e => setShow(e.target.checked)}
            name="Calender"
            inputProps={{'aria-label': 'secondary checkbox'}}
          />
        </Box>
        <Link to="/admin/event/create" style={{textDecoration: 'none'}}>
          <Button color="primary" variant="contained" style={!userInfo ? {visibility: 'hidden'}: {}}>
            Create Event
          </Button>
        </Link>
      </Container>
      {isShow
      && <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{height: 500}}
      />}
    </div>
  )
}

export default CalenderComponent;
