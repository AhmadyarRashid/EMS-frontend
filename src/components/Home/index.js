import React from "react"
import Header from "../Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import BannerComponent from "./Banner";
import Events from "./Events";

function HomePage(props){
  return(
    <React.Fragment>
      <CssBaseline/>
      <Header {...props}/>
      <BannerComponent />
      <Events {...props}/>
    </React.Fragment>
  )
}

export default HomePage;
