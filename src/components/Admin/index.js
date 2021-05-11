import React, {useState, useEffect} from 'react';
import {Box, Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom"
import AdminWrapper from "./WrapperComponent";
import EventTable from "../Table";
import axios from "axios";
import {baseUrl} from "../../utils/constant";

export default function AdminDashboard() {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo")
    userInfo = userInfo ? JSON.parse(userInfo) : {role: "admin", id: 1}

    axios.get(`${baseUrl}/api/event/${userInfo.role}/${userInfo.id}`)
      .then(({data}) => {
        if (data.isSuccess) {
          const tempRows = data.payload.map(({id, title, startDateTime, endDateTime, type, sizeOfVenue, about, price}) =>
            createData(id, title, startDateTime, endDateTime, type, sizeOfVenue, price, about))
          setRows(tempRows)
        }
      })
      .catch(error => {
        console.log("some thing went wrong")
      })
  }, [])

  const columns = [
    {id: 'title', label: 'Title', minWidth: 170},
    {id: 'startDateTime', label: 'Start Time', minWidth: 170, align: 'center'},
    {id: 'endDateTime', label: 'End Time', minWidth: 170, align: 'center'},
    {id: 'type', label: 'Type', minWidth: 170, align: 'center'},
    {id: 'sizeOfVenue', label: 'Size Of Venue', minWidth: 10, align: 'center'},
    {id: 'price', label: 'Price', minWidth: 10, align: 'center'},
    {id: 'about', label: 'Details', minWidth: 200, align: 'center'},
    {id: 'action', label: 'Actions', minWidth: 10, align: 'center'},
  ];

  function createData(id, title, startDateTime, endDateTime, type, sizeOfVenue, price,about, action) {
    return {id, title, startDateTime, endDateTime, type, sizeOfVenue, price,about, action};
  }

  const updateEventsListAfterDelete = id => {
    const tempEvents = rows.filter(event => event.id !== id);
    setRows(tempEvents)
  }

  return (
    <AdminWrapper>
      <Typography variant="h4" style={{marginBottom: 12}}>
        Events
      </Typography>
      <Link to="/admin/event/create" style={{marginTop: 12, float: 'right', marginBottom: 12}}>
        <Button variant="contained" color="primary">Create Event</Button>
      </Link>
      <EventTable
        columns={columns}
        rows={rows}
        updateEventsListAfterDelete={updateEventsListAfterDelete}
      />
    </AdminWrapper>
  )
}
