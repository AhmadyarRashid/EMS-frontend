import React, {useState} from 'react';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {colors} from "../../utils/colors"
import {Box, Hidden, Modal, Button, Fade} from "@material-ui/core";
import moment from "moment";

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
    margin: 10
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

export default function EventCard({event}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [isOpen, setModalOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const WebCard = () => (
      <Box component="div" width={expanded ? "100%" : 1 / 3.5} className={classes.eventCard}>
        <Card style={expanded ?
            {display: 'flex', flexDirection: 'row', maxWidth: "100%", borderRadius: 20} :
            {display: 'flex', flexDirection: 'column', maxWidth: 345, borderRadius: 20}}>
          <Box component="div" style={expanded ? {minWidth: "30%"} : {}}>
            <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {event.title[0].toUpperCase()}
                  </Avatar>
                }
                action={
                  <Box component="div"
                       style={{borderRadius: 12, backgroundColor: colors.pink, color: "red", padding: 8, marginTop: 8}}>
                    {moment(event.startDateTime).endOf("day").fromNow()}
                  </Box>
                }
            />
            <CardContent>
              <Typography variant="h6">
                {event.title}
              </Typography>
              <Box component="div" style={{marginTop: 12}}>
                Total Price
              </Box>
              <Typography variant="h5" className={classes.price}>
                {event.price}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <div style={{marginLeft: 8}}>
                {event.type && <Typography style={{fontSize: 18}}>{event.type}</Typography>}
              </div>
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
              {event.location && <Typography><b>Location:</b> {event.location}</Typography>}
              {event.startDateTime && <Typography><b>Launch Date:</b> {event.startDateTime}</Typography>}
              {event.type && <Typography><b>Type:</b> {event.type}</Typography>}
              {event.sizeOfVenue && <Typography paragraph><b>Space:</b> {event.sizeOfVenue}</Typography>}
              {event.about && <>
                <Typography paragraph><b>Detail:</b></Typography>
                <Typography paragraph>
                  {event.about}
                </Typography>
              </>}
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
              <Box component="div">
                Night Party
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
              <h2 id="transition-modal-title">{event.title}</h2>
              {event.price && <Typography><b>Price:</b> {event.price}</Typography>}
              {event.type && <Typography><b>Type:</b> {event.type}</Typography>}
              {event.location && <Typography><b>Location:</b> {event.location}</Typography>}
              {event.startDateTime && <Typography><b>Date:</b> {event.startDateTime}</Typography>}
              {event.type && <Typography><b>Type:</b> {event.type}</Typography>}
              {event.sizeOfVenue && <Typography paragraph><b>Space:</b> {event.sizeOfVenue}</Typography>}
              {event.url && <Typography paragraph><b>URL:</b> {event.url}</Typography>}
              {event.about && <>
                <Typography ><b>Detail:</b></Typography>
                <Typography paragraph>
                  {event.about}
                </Typography>
              </>}
              {/*<Button onClick={() => setModalOpen(false)}>Close</Button>*/}
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
