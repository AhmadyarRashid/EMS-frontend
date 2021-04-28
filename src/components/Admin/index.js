import React from 'react';
import AdminWrapper from "./WrapperComponent";
import EventTable from "../Table";
import {Box, Button, Typography} from "@material-ui/core";

export default function AdminDashboard() {
  const columns = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'code', label: 'Code', minWidth: 170, align: 'center'},
    {id: 'date', label: 'Date', minWidth: 170, align: 'center'},
    {id: 'price', label: 'Ticket Price', minWidth: 170, align: 'center'},
    {id: 'action', label: 'Actions', minWidth: 10, align: 'center'},
  ];

  function createData(name, code, date, price, action) {
    return {name, code, date, price, action};
  }

  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];

  return (
    <AdminWrapper>
      <Typography variant="h4" style={{marginBottom: 12}}>
        Events
      </Typography>
      <Box component="div" style={{marginTop: 12, float: 'right', marginBottom: 12}}>
        <Button variant="contained" color="primary">Create Event</Button>
      </Box>
      <EventTable
        columns={columns}
        rows={rows}
      />
    </AdminWrapper>
  )
}
