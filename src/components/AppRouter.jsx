import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import NotfoundPage from "../pages/NotfoundPage";
import Profilepage from "../pages/Profilepage";
import Registerpage from "../pages/Registerpage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import game from "../pages/Game";
import Contact from "../pages/Contact";
import About from "../pages/About";
import AdminDashboard from "../pages/AdminDashboard";

export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <ProtectedRoute exact path="/login" component={Loginpage} />
          <ProtectedRoute exact path="/register" component={Registerpage} />
          <ProtectedRoute exact path="/profile" component={Profilepage} />
          <ProtectedRoute exact path="/game" component={game} />
          <ProtectedRoute exact path="/admin" component={AdminDashboard} />
          <ProtectedRoute
            exact
            path="/forgot-password"
            component={ForgotPasswordPage}
          />
          <ProtectedRoute
            exact
            path="/reset-password"
            component={ResetPasswordPage}
          />
          <Route exact path="*" component={NotfoundPage} />
        </Switch>
      </Router>
    </>
  );
}

function ProtectedRoute(props) {
  const { currentUser } = useAuth();
  const { path } = props;
  console.log("path", path);
  const location = useLocation();
  console.log("location state", location.state);

  if (
    path === "/login" ||
    path === "/register" ||
    path === "/forgot-password" ||
    path === "/reset-password"
  ) {
    return currentUser ? (
      <Redirect to={location.state?.from ?? "/"} />
    ) : (
      <Route {...props} />
    );
  }
  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: path },
      }}
    />
  );
}
