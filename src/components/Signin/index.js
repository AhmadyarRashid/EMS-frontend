import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Alert} from '@material-ui/lab';
import {Formik} from 'formik';
import {withRouter} from "react-router";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn({onToggleDark, ...props}) {
  const classes = useStyles();
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem("userInfo")){
      props.history.push('/')
    }
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{email: '', password: ''}}
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

            return errors;
          }}
          onSubmit={(values, {setSubmitting}) => {
            setError("")
            setTimeout(() => {
              axios.post(`${baseUrl}/api/users/login`, values)
                .then(({data}) => {
                  console.log("login response: ", data)
                  if (!data.isSuccess) {
                    setError(data.message)
                  } else {
                    setError("")
                    localStorage.setItem("userInfo", JSON.stringify(data.payload))
                    props.history.push('/')
                  }
                })
                .catch(error => {
                  console.log("login error: ", error)
                  setError("Something went wrong. Please try again later.")
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
            }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                variant="outlined"
                margin="normal"
                required
                error={errors.email && touched.email && errors.email}
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                autoComplete="email"
                autoFocus
              />
              <span style={{color: 'red', fontSize: 11}}>{errors.email && touched.email && errors.email}</span>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                name="password"
                error={errors.password && touched.password && errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                autoComplete="current-password"
              />
              <span style={{color: 'red', fontSize: 11}}>{errors.password && touched.password && errors.password}</span>
              <Button
                type="submit"
                disabled={isSubmitting}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/*<Link href="#" variant="body2">*/}
                  {/*  Forgot password?*/}
                  {/*</Link>*/}
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright/>
      </Box>
    </Container>
  );
}

export default withRouter(SignIn)
