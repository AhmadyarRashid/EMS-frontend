import React, {useEffect, useState} from 'react';
import AdminWrapper from "./WrapperComponent";
import CustomerTable from "../Table";
import {Typography} from "@material-ui/core";
import axios from "axios";
import {baseUrl} from "../../utils/constant";

export default function AdminCustomerDashboard() {

  const [rows, setRows] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/api/users/getAllCustomer`)
      .then(({data}) => {
        if (data.isSuccess){
          const tempRows = data.payload.map(({firstName, lastName, phoneNo, email}) => createData(firstName, lastName, phoneNo, email))
          setRows(tempRows)
        }
      })
      .catch(error => {
        console.log("customer list error:", error)
      })
  }, [])

  const columns = [
    {id: 'firstName', label: 'First Name', minWidth: 170},
    {id: 'lastName', label: 'Last Name', minWidth: 170},
    {id: 'phoneNo', label: 'Phone No', minWidth: 170},
    {id: 'email', label: 'Email', minWidth: 170},
  ];

  function createData(firstName, lastName, phoneNo, email,) {
    return {firstName, lastName, phoneNo, email};
  }

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
