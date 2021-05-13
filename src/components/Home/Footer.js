import React from 'react'
import {Box, Container, Grid, Hidden, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../../utils/colors";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "80px 0",
    paddingBottom: "148px !important",
    [theme.breakpoints.down('sm')]: {
      padding: "40px 0",
      paddingBottom: "40px !important"
    },
  },
  subtitle: {
    marginTop: 8
  },
  mobileFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginLeft: '10%'
  }
}));

function Footer({themeMode}) {
  const classes = useStyles()
  return (
    <Box component="div" className={classes.root}
         style={{backgroundColor: themeMode === "light" ? colors.pink : colors.black}}>
      <Container>
        <Grid container spacing={3}>
          <Hidden smDown>
            <Grid item xs={3}>
              <Link to="/" style={{textDecoration: 'none', color: 'black'}}>
                <Typography variant="h4" style={{fontWeight: 'bold'}}>EMS</Typography>
              </Link>
              <Typography variant="caption" className={classes.subtitle}>@ems 2021</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" style={{fontWeight: 'bold'}}>Social</Typography>
              <Typography variant="subtitle2" className={classes.subtitle}>Blog</Typography>
              <Typography variant="subtitle2" className={classes.subtitle}>Twitter</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" style={{fontWeight: 'bold'}}>Company</Typography>
              <Typography variant="subtitle2" className={classes.subtitle}>Career</Typography>
              <Link to="/about" style={{textDecoration: 'none', color: 'black'}}>
                <Typography variant="subtitle2" className={classes.subtitle}>About us</Typography>
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" style={{fontWeight: 'bold'}}>Help</Typography>
              <Typography variant="subtitle2" className={classes.subtitle}>Support</Typography>
              <Typography variant="subtitle2" className={classes.subtitle}>Term</Typography>
              <Typography variant="subtitle2" className={classes.subtitle}>Privacy</Typography>
            </Grid>
          </Hidden>
          <Hidden smUp>
            <Grid xs={12}>
              <Box component="div" className={classes.mobileFooter}>
                <Typography variant="subtitle2" className={classes.subtitle}>Support</Typography>
                <Typography variant="subtitle2" className={classes.subtitle}>About Us</Typography>
                <Typography variant="subtitle2" className={classes.subtitle}>Disclaimer</Typography>
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer;
