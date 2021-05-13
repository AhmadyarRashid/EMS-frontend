import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../Header";
import BannerComponent from "../Home/Banner";
import Footer from "../Home/Footer";
import {colors} from "../../utils/colors";
import {Box, Container, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CreateIcon from '@material-ui/icons/Create';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SecurityIcon from '@material-ui/icons/Security';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ContactUs from "../Home/Contactus";

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
    },
    gridItem: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center'
    },
    gridIcon: {
      marginRight: 12
    }
  });
});

function AboutPage(props) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline/>
      <Header {...props}/>
      <BannerComponent
        title="About"
        titleHighlighted="EMS"
        description="Event managers plan and organise promotional,
        business and social events. ...
        You'll manage the whole process from the planning stage,
        right through to running the event and carrying out the post-event evaluation.
        The role is primarily hands-on and often involves working as part of a team."
      />

      <Box component="div" className={classes.root}
           style={{backgroundColor: props.themeMode === "light" ? colors.pink : colors.black1}}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={4} style={{display: "flex", flexDirection: 'column', alignItems: "center"}}>
              <Typography variant="h5">
                <b>Features</b>
              </Typography>
            </Grid>
            <Grid item xs={8} style={{display: "flex", flexDirection: 'column', alignItems: "center"}}>
              <Grid container spacing={3} style={{marginBottom: 20}}>
                <Grid item xs={6} className={classes.gridItem}>
                  <CreateIcon className={classes.gridIcon}/>
                  <Typography variant="paragraph">Create Events</Typography>
                </Grid>
                <Grid item xs={6} className={classes.gridItem}>
                  <SecurityIcon className={classes.gridIcon}/>
                  <Typography variant="paragraph">Security</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6} className={classes.gridItem}>
                  <ListAltIcon className={classes.gridIcon}/>
                  <Typography variant="paragraph">Manage Own Events</Typography>
                </Grid>
                <Grid item xs={6} className={classes.gridItem}>
                  <VerifiedUserIcon className={classes.gridIcon}/>
                  <Typography variant="paragraph">Secure Data</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <ContactUs {...props} />

      <Footer {...props} />
    </React.Fragment>
  )
}

export default AboutPage;
