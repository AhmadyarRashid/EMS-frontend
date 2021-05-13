import React from "react"
import {Box, Typography, Button, OutlinedInput} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../../utils/colors";
import {Formik} from 'formik';
import axios from "axios";
import {baseUrl} from "../../utils/constant";
import Swal from "sweetalert2";

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
      [theme.breakpoints.down('sm')]: {
        width: '80%'
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
      minWidth: "100%",
      [theme.breakpoints.down('sm')]: {
        padding: 0,
        minWidth: "80%",
      },
    },
    btn: {
      padding: 8,
      marginTop: 20,
      minWidth: "50%",
      [theme.breakpoints.down('sm')]: {
        padding: 4,
        minWidth: "40%",
      },
    }
  });
});

function NewsLettterSubscription({themeMode}) {
  const classes = useStyles()

  return (
    <Box component="div" className={classes.root}
         style={{backgroundColor: themeMode === "light" ? "white" : colors.black1}}>
      <Formik
        initialValues={{email: ''}}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setTimeout(() => {
            axios.post(`${baseUrl}/api/event/subscription`, {
              email: values.email
            }).then(({data}) => {
              if (data.isSuccess) {
                resetForm({})
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
            <Typography variant="h4" className={classes.title}>Newsletter Subscription</Typography>
            <OutlinedInput
              placeholder="enter email"
              variant="outlined"
              className={classes.input}
              error={errors.email && touched.email && errors.email}
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <span style={{color: 'red', fontSize: 11}}>{errors.email && touched.email && errors.email}</span>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              className={classes.btn}
            >Subscribe</Button>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default NewsLettterSubscription;
