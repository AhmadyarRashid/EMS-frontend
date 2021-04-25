import React, {useState, useEffect} from 'react'
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import HomePage from "../components/Home";
import AboutPage from "../components/About";
import DisclaimerPage from "../components/Disclaimer";
import SignIn from "../components/Signin";
import SignUp from "../components/Signup";

function AppRoutes() {
  // We keep the theme in app state
  const [theme, setTheme] = useState({
    palette: {
      type: "light"
    }
  });

  useEffect(() => {
    try {
      const themeMode = localStorage.getItem("mode")
      setTheme({
        palette: {
          type: !themeMode ? "light" : themeMode
        }
      })
    }catch (e){
      console.log()
    }
  },[])

  // we change the palette type of the theme in state
  const toggleDarkTheme = () => {
    let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
    setTheme({
      palette: {
        type: newPaletteType
      }
    });
    localStorage.setItem("mode", newPaletteType)
  };

  // we generate a MUI-theme from state's theme object
  const muiTheme = createMuiTheme(theme);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Router>
        <Switch>
          <Route path="/login">
            <SignIn onToggleDark={toggleDarkTheme}/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
          <Route path="/about">
            <AboutPage/>
          </Route>
          <Route path="/disclaimer">
            <DisclaimerPage/>
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

export default AppRoutes;
