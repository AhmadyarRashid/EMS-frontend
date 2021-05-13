import React from 'react'
import {Box, Button, OutlinedInput, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../../utils/colors";
import {Formik} from 'formik';
import Swal from "sweetalert2";
import axios from "axios";
import {baseUrl} from "../../utils/constant";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const useStyles = makeStyles((theme) => {
  return ({
    root: {
      padding: "80px 0",
      paddingBottom: "48px !important",
      [theme.breakpoints.down('sm')]: {
        padding: "40px 0",
      },
      display: 'flex',
      justifyContent: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '45%',
      [theme.breakpoints.down('sm')]: {
        width: '80%',
      },
    },
    title: {
      marginRight: 12,
      [theme.breakpoints.down('sm')]: {
        fontSize: '6vw'
      },
    },
    input: {
      marginTop: 20,
      minWidth: "60%",
      [theme.breakpoints.down('sm')]: {
        minWidth: "100%",
      },
    },
    btn: {
      padding: 8,
      marginTop: 20,
      minWidth: "20%",
      [theme.breakpoints.down('sm')]: {
        minWidth: "50%",
        padding: 4
      },
    }
  });
});

function ContactUs({themeMode}) {
  const classes = useStyles()
  return (
    <Box component="div" className={classes.root}
         style={{backgroundColor: themeMode === "light" ? "white" : colors.black1}}>
      <Formik
        initialValues={{email: '', phoneNo: '', message: '', name: ''}}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          if (!values.name) {
            errors.name = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]{3,}$/i.test(values.name)
          ) {
            errors.name = 'name length at least 3';
          }

          if (!values.message) {
            errors.message = 'Required';
          }

          return errors;
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setTimeout(() => {
            axios.post(`${baseUrl}/api/event/contact`, values)
              .then(({data}) => {
                if (data.isSuccess) {
                  resetForm({})
                  Swal.fire({
                    icon: 'success',
                    title: data.payload,
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
          <form className={classes.form} onSubmit={handleSubmit}>
            <Typography variant="h4" className={classes.title}>Contact Us</Typography>
            <OutlinedInput
              id="outlined-basic"
              placeholder="name"
              variant="outlined"
              className={classes.input}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <span style={{color: 'red', fontSize: 11}}>{errors.name && touched.name && errors.name}</span>
            <OutlinedInput
              id="outlined-basic"
              placeholder="email"
              variant="outlined"
              className={classes.input}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <span style={{color: 'red', fontSize: 11}}>{errors.email && touched.email && errors.email}</span>
            <OutlinedInput
              id="outlined-basic"
              placeholder="phone No"
              variant="outlined"
              className={classes.input}
              name="phoneNo"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNo}
            />
            <TextareaAutosize
              rows={10}
              id="outlined-basic"
              placeholder="Message"
              variant="outlined"
              className={classes.input}
              name="message"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
            />
            <span style={{color: 'red', fontSize: 11}}>{errors.message && touched.message && errors.message}</span>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              className={classes.btn}
            >Send</Button>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default ContactUs;
