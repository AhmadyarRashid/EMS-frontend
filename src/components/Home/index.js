import React from "react"
import Header from "../Header";
import CssBaseline from "@material-ui/core/CssBaseline";

function HomePage(props){
  return(
    <React.Fragment>
      <CssBaseline/>
      <Header {...props}/>
    </React.Fragment>
  )
}

export default HomePage;
