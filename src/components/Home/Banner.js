import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {Box, Container, Typography} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  hero: {
    position: "relative",
    textAlign: "center",
    padding: "100px 0",
    overflow: "hidden",
  },
  container: {
    margin: '0 auto'
  },
  heroContent: {
    wordWrap: "break-word"
  },
  title: {
    maxWidth: "60%",
    fontWeight: 800,
    margin: "0 auto 16px",
  },
  redTitle:{
    color: 'red'
  },
  heroSubtitle:{
    maxWidth: "55%",
    margin: "0 auto 16px",
    color: "#a8a8b4"
  }
}));

function BannerComponent() {
  const classes = useStyles()

  return (
    <Box component="div" className={classes.hero}>
      <Container className={classes.container}>
        <Box component="div" className={classes.heroContent}>
          <Typography variant="h2" className={classes.title}>
            Decentralize the way your ideas {" "}
            <Box component="span" className={classes.redTitle}>raise capital.</Box>
          </Typography>
          <Typography variant="subtitle1" className={classes.heroSubtitle}>
            Be the first to join Polkastarter,
            a Protocol built for cross-chain token pools and auctions,
            enabling projects to raise capital on a decentralized and interoperable environment based on Polkadot.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default BannerComponent;
