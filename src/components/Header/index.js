import React, {useState, useEffect} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {Container, Typography, Paper, Box, Menu, MenuItem, Hidden} from "@material-ui/core"
import DarkIcon from '@material-ui/icons/Brightness4'
import BrightIcon from '@material-ui/icons/Brightness7'
import MenuIcon from '@material-ui/icons/Menu'
import {withRouter} from "react-router"
import NotificationsIcon from '@material-ui/icons/NotificationsNone'
import Swal from "sweetalert2";
import axios from "axios";
import {baseUrl} from "../../utils/constant";
import Modal from "@material-ui/core/Modal";
import {Formik} from 'formik';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  logo: {
    fontWeight: "bold",
    cursor: "pointer"
  },
  icon: {
    cursor: "pointer",
    marginRight: 12
  },
  menuIcon: {
    cursor: "pointer",
  },
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

function Header({onToggleDark, themeMode, ...props}) {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const subscriptionHandler = () => {
    if (isLoggedin) {
      let userInfo = localStorage.getItem("userInfo")
      userInfo = userInfo ? JSON.parse(userInfo) : {email: ""}
      if (!userInfo.email) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please login again after logout',
        })
      }
      axios.post(`${baseUrl}/api/event/subscription`, {
        email: userInfo.email
      }).then(({data}) => {
        if (data.isSuccess) {
          Swal.fire({
            icon: 'success',
            title: data.payload,
            timer: 1500
          })
        } else {
          Swal.fire({
            icon: 'info',
            title: data.message,
            timer: 1500
          })
        }
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong.',
        })
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to login first',
      })
    }
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Container className={classes.container}>
          <Hidden smUp sm>
            <Link to="/" style={{textDecoration: 'none', color: 'black'}}>
              <Typography variant="h5" subtitle1="h2" className={classes.logo}>
                EMS
              </Typography>
            </Link>
          </Hidden>
          <Hidden smDown>
            <Link to="/" style={{textDecoration: 'none', color: 'black'}}>
              <Typography variant="h5" subtitle1="h2" className={classes.logo}>
                Event Management System
              </Typography>
            </Link>
          </Hidden>

          <Box component="div">
            {themeMode === "dark" ?
              <BrightIcon onClick={onToggleDark} className={classes.icon}/> :
              <DarkIcon onClick={onToggleDark} className={classes.icon}/>}

            <NotificationsIcon onClick={() => subscriptionHandler()} className={classes.icon}/>

            <MenuIcon
              className={classes.menuIcon}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            />

            {isLoggedin ?
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {
                  handleClose()
                  props.history.push("/admin")
                }}>Dashboard</MenuItem>
                <MenuItem onClick={() => {
                  setOpen(true)
                }}>Donation</MenuItem>
                <MenuItem onClick={() => {
                  handleClose()
                  localStorage.removeItem("userInfo")
                  props.history.push("/login")
                }}>Logout</MenuItem>
              </Menu> :
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {
                  handleClose()
                  props.history.push("/login")
                }}>Login</MenuItem>
              </Menu>
            }
          </Box>
        </Container>
      </Paper>
      <Modal
        open={isOpen}
        className={classes.modalContainer}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modal}>
          <h2 id="simple-modal-title">Donation</h2>
          <Formik
            initialValues={{email: '', amount: ''}}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }

              if (!values.amount) {
                errors.amount = 'Required';
              } else if (Number(values.amount) < 1) {
                errors.amount = 'Amount must be greater than 0';
              }
              return errors;
            }}
            onSubmit={(values, {setSubmitting, resetForm}) => {
              setTimeout(() => {
                axios.post(`${baseUrl}/api/event/donations`, values)
                  .then(({data}) => {
                    if (data.isSuccess) {
                      resetForm({})
                      setOpen(false)
                      Swal.fire({
                        icon: 'success',
                        title: data.payload,
                        timer: 1500
                      })
                    }
                  })
                  .catch(error => {
                    Swal.fire({
                      icon: 'error',
                      title: 'Something went wrong.',
                      text: ' Please try again later',
                    })
                  })
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  style={{width: '100%'}}
                  variant="outlined"
                  margin="normal"
                  placeholder="email"
                  error={errors.email && touched.email && errors.email}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <span style={{color: 'red', fontSize: 11}}>{errors.email && touched.email && errors.email}</span>
                <TextField
                  style={{width: '100%'}}
                  variant="outlined"
                  placeholder="amount"
                  margin="normal"
                  error={errors.amount && touched.amount && errors.amount}
                  type="number"
                  name="amount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amount}
                />
                <span style={{color: 'red', fontSize: 11}}>{errors.amount && touched.amount && errors.amount}</span>
                <Button
                  type="submit" disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  style={{width: "100%", marginTop: 20}}>
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
    </React.Fragment>
  )
}

export default withRouter(Header)
