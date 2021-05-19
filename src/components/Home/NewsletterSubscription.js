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
      flexDirection: "column",
      justifyContent: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      width: '60%',
      marginTop: 12,
      justifyContent: "center",
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: "center",
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
      minWidth: "40%",
      marginRight: 12,
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
        marginTop: 20,
        padding: 0,
        minWidth: "80%",
      },
    },
    btn: {
      padding: 12,
      minWidth: "10%",
      [theme.breakpoints.down('sm')]: {
        marginTop: 20,
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
      <center>
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
              <Typography variant="h6" align="center" className={classes.title}>Newsletter Subscription</Typography>
              <Box component="div" className={classes.input}>
                <OutlinedInput
                  placeholder="enter email"
                  variant="outlined"
                  error={errors.email && touched.email && errors.email}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <span style={{color: 'red', fontSize: 11}}>{errors.email && touched.email && errors.email}</span>
              </Box>
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
      </center>
    </Box>
  )
}

export default NewsLettterSubscription;
