import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {Box, Container, Typography} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  hero: {
    position: "relative",
    textAlign: "center",
    padding: "100px 0",
    overflow: "hidden",
    [theme.breakpoints.down('sm')]: {
      padding: "80px 0",
    },
  },
  container: {
    margin: '0 auto'
  },
  heroContent: {
    wordWrap: "break-word"
  },
  title: {
    maxWidth: "80%",
    fontWeight: 800,
    margin: "0 auto 16px",
    fontSize: "3.5vw",
    [theme.breakpoints.down('sm')]: {
      fontSize: "7.5vw",
      maxWidth: "90%",
    },
  },
  redTitle: {
    color: 'red'
  },
  heroSubtitle: {
    maxWidth: "80%",
    margin: "0 auto 16px",
    color: "#a8a8b4",
    fontSize: 22,
    [theme.breakpoints.down('sm')]: {
      fontSize: "4vw",
      maxWidth: "90%",
    },
  }
}));

function BannerComponent({title, titleHighlighted, description}) {
  const classes = useStyles()

  return (
    <Box component="div" className={classes.hero}>
      <Container className={classes.container}>
        <Box component="div" className={classes.heroContent}>
          <Typography variant="h2" className={classes.title}>
             {title + " "}
            <Box component="span" className={classes.redTitle}>{titleHighlighted}</Box>
          </Typography>
          <Typography variant="subtitle2" className={classes.heroSubtitle}>
            {description}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default BannerComponent;
