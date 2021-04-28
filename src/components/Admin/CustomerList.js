import React from 'react';
import AdminWrapper from "./WrapperComponent";
import CustomerTable from "../Table";
import {Typography} from "@material-ui/core";

export default function AdminCustomerDashboard() {
  const columns = [
    {id: 'firstName', label: 'First Name', minWidth: 170},
    {id: 'lastName', label: 'Last Name', minWidth: 170},
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
    },
    {
      id: 'phoneNo',
      label: 'Phone No',
      minWidth: 170,
    },
  ];

  function createData(firstName, lastName, email, phoneNo) {
    return {firstName, lastName, email, phoneNo};
  }

  const rows = [
    createData('Ali', 'Khan', "ali@gmail.com", 3287263),
    createData('qasim', 'mustafa', "qasim@gmail.com", 9596961),
    createData('hamza', 'khan', "hamza@gmail.com", 301340),
    createData('United States', 'US', "us@gmail.com", 9833520),
    createData('Canada', 'CA', "canada@gmail.com", 9984670),
    createData('Australia', 'AU', "austalia@gmail.com", 7692024),
    createData('Germany', 'DE', "germany@gmail.com", 357578),
    createData('Ireland', 'IE', "ireland@gmail.com", 70273),
    createData('Mexico', 'MX', "mexico@gmail.com", 1972550),
    createData('Japan', 'JP', "jp@gmail.com", 377973),
    createData('France', 'FR', "fr@gmail.com", 640679),
    createData('United Kingdom', 'GB', "uk@gmail.com", 242495),
    createData('Russia', 'RU', "ru@gmail.com", 17098246),
    createData('Nigeria', 'NG', "ng@gmail.com", 923768),
    createData('Brazil', 'BR', "br@gmail.com", 8515767),
  ];

  return (
    <AdminWrapper>
      <Typography variant="h4">
        Customers
      </Typography>
      <CustomerTable
        columns={columns}
        rows={rows}
      />
    </AdminWrapper>
  )
}
