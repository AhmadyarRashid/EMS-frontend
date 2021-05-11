import React, {useEffect, useState} from "react"
import {makeStyles} from '@material-ui/core/styles';
import {useParams} from "react-router-dom"
import {withRouter} from "react-router"
import {TextField, Typography, Button, Box, ButtonGroup, TextareaAutosize, Grid} from "@material-ui/core"
import {Formik} from 'formik';
import WrapperComponent from "../Admin/WrapperComponent";
import axios from "axios";
import {baseUrl} from "../../utils/constant";
import Swal from "sweetalert2"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 30
  },
  textField: {
    width: "100%",
  },
  actionBtn: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 22
  },
  saveBtn: {
    color: 'white',
    backgroundColor: 'green'
  },
  resetBtn: {
    color: 'white',
    backgroundColor: 'red',
    marginLeft: 12
  },
  fieldBox: {
    marginTop: 22,
  },
  fieldName: {
    fontSize: 14,
    marginBottom: 0,
    color: 'gray'
  }
}));

function CreateEvent(props) {
  const classes = useStyles()

  const {id} = useParams()
  const [type, setType] = useState("private")
  const [isLoading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    title: '',
    startDateTime: '',
    endDateTime: '',
    sizeOfVenue: "",
    price: "0",
    location: '',
    url: '',
    about: '',
  })

  useEffect(() => {
    if (id) {
      axios.get(`${baseUrl}/api/event/getEvent/${id}`)
        .then(({data}) => {
          console.log("get event data:", data)
          if (data.isSuccess && data.payload.length > 0) {
            setLoading(false)
            setFormValues(data.payload[0])
            setType(data.payload[0].type)
          }else {
            setLoading(false)
          }
        })
        .catch(error => {
          console.log("get event error:", error)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [id])

  console.log("params:", id)

  if (isLoading) return null
  console.log("formValues:", formValues)
  return (
    <WrapperComponent>
      <Formik
        enableReinitialize
        initialValues={formValues}
        onSubmit={(values, {resetForm}) => {
          console.log(values);
          let userInfo = localStorage.getItem("userInfo")
          userInfo = userInfo ? JSON.parse(userInfo) : {role: "admin", id: 1}
          if (id){
            axios.post(`${baseUrl}/api/event/update/${id}`, {
              ...values,
              type,
            }).then(({data}) => {
              if (data.isSuccess) {
                resetForm({
                  title: '',
                  startDateTime: '',
                  endDateTime: '',
                  sizeOfVenue: "",
                  price: "0",
                  location: '',
                  url: '',
                  about: '',
                })
                props.history.push('/admin')
                Swal.fire({
                  icon: "success",
                  title: 'event updated successfully',
                  timer: 1500
                })
              }
            }).catch(error => {
              console.log("create event error: ", error)
            })
          }else {
            axios.post(`${baseUrl}/api/event/create`, {
              ...values,
              type,
              userId: userInfo.id
            }).then(({data}) => {
              if (data.isSuccess) {
                resetForm({})
                Swal.fire({
                  icon: "success",
                  title: 'Event Create Successfully',
                  timer: 1500
                })
              }
            }).catch(error => {
              console.log("create event error: ", error)
            })
          }
        }}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            resetForm,
            isSubmitting,
          }) => (
          <form className={classes.form} onSubmit={handleSubmit}>

            <Typography variant="h5">
              Create Event
            </Typography>

            <Grid container spacing={3}>

              <Grid item xs={6}>
                <Box component="div" className={classes.fieldBox}>
                  <Typography
                    variant="h6"
                    className={classes.fieldName}
                  >
                    Title
                  </Typography>
                  <TextField
                    className={classes.textField}
                    required
                    name="title"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    defaultValue={values.title}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box component="div" className={classes.fieldBox}>
                  <Typography
                    variant="h6"
                    className={classes.fieldName}
                  >
                    Event Type
                  </Typography>

                  <ButtonGroup color="primary" style={{marginTop: 12}} aria-label="outlined primary button group">
                    <Button
                      name="type"
                      onClick={() => setType("public")}
                      variant={type === "public" ? "contained" : "outlined"}
                    >Public</Button>
                    <Button
                      name="type"
                      onClick={() => setType("private")}
                      variant={type === "private" ? "contained" : "outlined"}
                    >Private</Button>
                  </ButtonGroup>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box component="div" className={classes.fieldBox}>
                  <Typography
                    variant="h6"
                    className={classes.fieldName}
                  >
                    Start Date & Time
                  </Typography>
                  <TextField
                    className={classes.textField}
                    required
                    name="startDateTime"
                    type="datetime-local"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.startDateTime}
                    defaultValue={values.startDateTime}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box component="div" className={classes.fieldBox}>
                  <Typography
                    variant="h6"
                    className={classes.fieldName}
                  >
                    End Date & Time
                  </Typography>
                  <TextField
                    className={classes.textField}
                    required
                    name="endDateTime"
                    type="datetime-local"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.endDateTime}
                    defaultValue={values.endDateTime}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box component="div" className={classes.fieldBox}>
                  <Typography
                    variant="h6"
                    className={classes.fieldName}
                  >
                    Location
                  </Typography>
                  <TextField
                    className={classes.textField}
                    required
                    name="location"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.location}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box component="div" className={classes.fieldBox}>
                  <Typography
                    variant="h6"
                    className={classes.fieldName}
                  >
                    Size Of Venue
                  </Typography>
                  <TextField
                    className={classes.textField}
                    required
                    name="sizeOfVenue"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sizeOfVenue}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box component="div" className={classes.fieldBox}>
                  <Typography
                    variant="h6"
                    className={classes.fieldName}
                  >
                    Price
                  </Typography>
                  <TextField
                    className={classes.textField}
                    required
                    name="price"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box component="div" className={classes.fieldBox}>
                  <Typography
                    variant="h6"
                    className={classes.fieldName}
                  >
                    Url
                  </Typography>
                  <TextField
                    className={classes.textField}
                    required
                    name="url"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.url}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box component="div" className={classes.fieldBox}>
                  <Typography
                    variant="h6"
                    className={classes.fieldName}
                  >
                    About
                  </Typography>
                  <TextareaAutosize
                    className={classes.textField}
                    required
                    name="about"
                    variant="outlined"
                    rows={8}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.about}
                  />
                </Box>
              </Grid>

            </Grid>

            <div className={classes.actionBtn}>
              <Button type="submit" variant="contained" className={classes.saveBtn}>Save</Button>
              <Button onClick={resetForm} variant="contained" className={classes.resetBtn}>Reset</Button>
            </div>
          </form>
        )}
      </Formik>
    </WrapperComponent>
  )
}

export default withRouter(CreateEvent);
