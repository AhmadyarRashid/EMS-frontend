import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {withRouter} from "react-router";
import { Formik } from 'formik';
import {Alert} from '@material-ui/lab';
import axios from "axios";
import {baseUrl} from "../../utils/constant";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        EMS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const classes = useStyles();

  const [error, setError] = useState('');

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{firstName: '', lastName: '', phoneNo: '', email: '', password: '', confirmPassword: ''}}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }

            if (!values.password) {
              errors.password = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]{4,}$/i.test(values.password)
            ) {
              errors.password = 'Password length must be greater than 4';
            }

            if (!values.confirmPassword) {
              errors.confirmPassword = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]{4,}$/i.test(values.confirmPassword)
            ) {
              errors.confirmPassword = 'Confirm Password length must be greater than 4';
            }

            if (!values.firstName) {
              errors.firstName = 'Required';
            }

            return errors;
          }}
          onSubmit={(values, {setSubmitting}) => {
            setError("")
            setTimeout(() => {
              if (values.password !== values.confirmPassword){
                setError("Both password field must be same")
              }else {
                axios.post(`${baseUrl}/api/users/register`, values)
                  .then(({data}) => {
                    console.log("register:", data)
                    if (data.isSuccess){
                      props.history.push("/login")
                    }else {
                      setError(data.message)
                    }
                  })
                  .catch(error => {
                    setError("Something went wrong. Please try again later")
                  })
              }
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
            }) => (
            <form onSubmit={handleSubmit} className={classes.form} >
              {error && <Alert severity="error" style={{marginBottom: 22}}>{error}</Alert>}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    error={errors.firstName && touched.firstName && errors.firstName}
                    id="firstName"
                    label="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    autoFocus
                  />
                  <span style={{color: 'red', fontSize: 11}}>{errors.firstName && touched.firstName && errors.firstName}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="phone"
                    label="Phone No"
                    name="phoneNo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNo}
                    autoComplete="phoneNo"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    error={errors.email && touched.email && errors.email}
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    autoComplete="email"
                  />
                  <span style={{color: 'red', fontSize: 11}}>{errors.email && touched.email && errors.email}</span>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    error={errors.password && touched.password && errors.password}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    autoComplete="current-password"
                  />
                  <span style={{color: 'red', fontSize: 11}}>{errors.password && touched.password && errors.password}</span>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    error={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    autoComplete="current-password"
                  />
                  <span style={{color: 'red', fontSize: 11}}>{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</span>
                </Grid>
              </Grid>
              <Button
                type="submit"
                disabled={isSubmitting}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
      <Box mt={5}>
        <Copyright/>
      </Box>
    </Container>
  );
}

export default withRouter(SignUp)
