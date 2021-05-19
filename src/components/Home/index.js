import React from "react"
import Header from "../Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import BannerComponent from "./Banner";
import Events from "./Events";
import NewsLettterSubscription from "./NewsletterSubscription";
import ContactUs from "./Contactus";
import Footer from "./Footer";

function HomePage(props) {
  return (
    <React.Fragment>
      <CssBaseline/>
      <Header {...props}/>
      <BannerComponent
        title="Decentralize the way your ideas"
        titleHighlighted="raise capital."
        description="Event managers plan and organise promotional,
        business and social events. ...
        You'll manage the whole process from the planning stage,
        right through to running the event and carrying out the post-event evaluation.
        The role is primarily hands-on and often involves working as part of a team."
      />
      <NewsLettterSubscription {...props}/>
      <Events {...props}/>
      <ContactUs {...props} />
      <Footer {...props} />
    </React.Fragment>
  )
}

export default HomePage;
