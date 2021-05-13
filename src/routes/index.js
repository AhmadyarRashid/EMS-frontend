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
import AdminDashboard from "../components/Admin";
import AdminCustomerDashboard from "../components/Admin/CustomerList";
import CreateEvent from "../components/Event/CreateEvent";

function AppRoutes() {
  // We keep the theme in app state
  const [theme, setTheme] = useState({
    palette: {
      primary: {
        main: "#f8bbd0",
      },
      secondary: {
        main: "#808080",
      },
      type: "light"
    }
  });

  useEffect(() => {
    try {
      const themeMode = localStorage.getItem("mode")
      setTheme({
        palette: {
          ...theme.palette,
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
        ...theme.palette,
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
            <AboutPage onToggleDark={toggleDarkTheme} themeMode={theme.palette.type}/>
          </Route>
          <Route path="/disclaimer">
            <DisclaimerPage onToggleDark={toggleDarkTheme} themeMode={theme.palette.type}/>
          </Route>
          <Route path="/admin/customers">
            <AdminCustomerDashboard />
          </Route>
          <Route path="/admin/event/create">
            <CreateEvent themeMode={theme.palette.type}/>
          </Route>
          <Route path="/admin/event/edit/:id">
            <CreateEvent themeMode={theme.palette.type}/>
          </Route>
          <Route path="/admin">
            <AdminDashboard/>
          </Route>
          <Route path="/">
            <HomePage onToggleDark={toggleDarkTheme} themeMode={theme.palette.type}/>
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

export default AppRoutes;
