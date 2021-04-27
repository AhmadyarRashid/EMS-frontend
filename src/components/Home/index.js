import React from "react"
import Header from "../Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import BannerComponent from "./Banner";
import Events from "./Events";
import NewsLettterSubscription from "./NewsletterSubscription";
import ContactUs from "./Contactus";
import Footer from "./Footer";

function HomePage(props){
  return(
    <React.Fragment>
      <CssBaseline/>
      <Header {...props}/>
      <BannerComponent />
      <NewsLettterSubscription {...props}/>
      <Events {...props}/>
      <ContactUs {...props} />
      <Footer {...props} />
    </React.Fragment>
  )
}

export default HomePage;
