import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Button, ButtonGroup} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ApproveIcon from '@material-ui/icons/CheckCircleOutline';
import axios from "axios";
import {baseUrl} from "../../utils/constant";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  editIcon: {
    cursor: "pointer",
    color: "orange"
  },
  deleteIcon: {
    cursor: "pointer",
    color: "red"
  },
  detailIcon: {
    cursor: "pointer",
    color: "green"
  }
});

export default function EventTable({children, columns, rows, updateEventsListAfterDelete, updateEventsListAfterApproval}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onEventDeleteHandler = eventId => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${baseUrl}/api/event/delete/${eventId}`)
          .then(({data}) => {
            if (data.isSuccess) {
              updateEventsListAfterDelete(eventId)
              Swal.fire(
                'Deleted!',
                'Your Event has been deleted.',
                'success'
              )
            }
          })
      }
    })
  }

  const onEventApproveHandler = eventId => {
    Swal.fire({
      title: 'Are you sure to approve it?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`${baseUrl}/api/event/approve/${eventId}`)
          .then(({data}) => {
            if (data.isSuccess) {
              updateEventsListAfterApproval(eventId)
              Swal.fire(
                'Approved!',
                'Your Event has been Approved.',
                'success'
              )
            }
          })
      }
    })
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    let userInfo = localStorage.getItem("userInfo")
                    userInfo = userInfo ? JSON.parse(userInfo) : {role: "admin", id: 1}
                    const value = row[column.id];
                    if (userInfo.role === "admin" && column.id === "status") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {row.status === "pending"
                            ? <Button
                              onClick={() => onEventApproveHandler(row.id)}
                              variant="outlined" color="primary">Pending</Button>
                            : <ApproveIcon style={{color: "green"}}/>}
                        </TableCell>
                      )
                    }
                    if (column.id === "action") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <ButtonGroup
                            size="small"
                            aria-label="small outlined button group">
                            {/*<DetailsIcon className={classes.detailIcon}/>*/}
                            <Link to={`/admin/event/edit/${row.id}`}><EditIcon className={classes.editIcon}/></Link>
                            <DeleteIcon onClick={() => onEventDeleteHandler(row.id)} className={classes.deleteIcon}/>
                          </ButtonGroup>
                        </TableCell>
                      )
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
