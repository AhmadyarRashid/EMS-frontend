import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {colors} from "../../utils/colors"
import {Box, Hidden, Modal, Button, Fade} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(270deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(90deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  eventCard: {
    margin: 18
  },
  price: {
    color: "red"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: "80vh",
    maxWidth: "80vw",
    overflowX: "scroll",
  },
}));

export default function EventCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [isOpen, setModalOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const WebCard = () => (
      <Box component="div" width={expanded ? "100%" : 1 / 4} className={classes.eventCard}>
        <Card style={expanded ?
            {display: 'flex', flexDirection: 'row', maxWidth: "100%"} :
            {display: 'flex', flexDirection: 'column', maxWidth: 345}}>
          <Box component="div" style={expanded ? {maxWidth: "40%"} : {}}>
            <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                action={
                  <Box component="div"
                       style={{borderRadius: 12, backgroundColor: colors.pink, color: "red", padding: 8, marginTop: 8}}>
                    21 days left
                  </Box>
                }
            />
            <CardContent>
              <Typography variant="h6">
                Refinable
              </Typography>
              <Box component="div" style={{marginTop: 12}}>
                Total Raise
              </Box>
              <Typography variant="h5" className={classes.price}>
                180 K
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon/>
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon/>
              </IconButton>
              <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
              >
                <ExpandMoreIcon/>
              </IconButton>
            </CardActions>
          </Box>
          <Collapse in={expanded} timeout="1000" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Button color="info" onClick={() => setModalOpen(true)}>
                More Details
              </Button>
            </CardContent>
          </Collapse>
        </Card>
      </Box>
  )

  const MobileCard = () => (
      <Box component="div" width="100%" className={classes.eventCard}>
        <Card onClick={() => setModalOpen(true)}>
          <Box component="div" style={expanded ? {maxWidth: "40%"} : {}}>
            <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                action={
                  <Box component="div"
                       style={{borderRadius: 12, backgroundColor: colors.pink, color: "red", padding: 8, marginTop: 8}}>
                    21 days left
                  </Box>
                }
            />
            <CardContent>
              <Typography variant="h6">
                Refinable
              </Typography>
              <Box component="div" style={{marginTop: 12}}>
                Total Raise
              </Box>
              <Typography variant="h5" className={classes.price}>
                180 K
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Box>
  )

  const eventDetailsModal = () => {
    return(
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={isOpen}
            onClose={() => setModalOpen(false)}
            closeAfterTransition
            BackdropProps={{
              timeout: 500,
            }}
        >
          <Fade in={isOpen}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Night Party</h2>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Button onClick={() => setModalOpen(false)}>Close</Button>
            </div>
          </Fade>
        </Modal>
    )
  }

  return (
      <React.Fragment>
        <Hidden smDown>
          <WebCard/>
        </Hidden>
        <Hidden smUp sm>
          <MobileCard/>
        </Hidden>
        {eventDetailsModal()}
      </React.Fragment>
  );
}
