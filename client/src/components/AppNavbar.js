import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function AppNavbar() {
  const classes = useStyles();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const authLinks = (
    <Fragment>
      <Typography variant="h6" className={classes.title}>
        <strong>{user ? `Welcome ${user.name}` : ""}</strong>
      </Typography>
      <Typography variant="h6" className={classes.title}>
        <Link color="inherit">
          <Logout />
        </Link>
      </Typography>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Typography variant="h6" className={classes.title}>
        <Link color="inherit">
          <RegisterModal />
        </Link>
      </Typography>
      <Typography variant="h6" className={classes.title}>
        <Link color="inherit">
          <LoginModal />
        </Link>
      </Typography>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Shopping list
          </Typography>
          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppNavbar;
