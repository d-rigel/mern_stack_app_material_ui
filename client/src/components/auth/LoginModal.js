import React, { useState, useEffect } from "react";
import { Button, Modal, makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { clearErrors } from "../../redux/actions/errorActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  title: {
    flexGrow: 1,
  },
}));

function LoginModal() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const error = useSelector((state) => state.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const ClearErrorsAndClose = () => {
    dispatch(clearErrors());
    setOpen(false);
  };

  // const prevError = useRef();
  useEffect(() => {
    //check if anything is changed
    console.log(error.msg.msg);
    console.log(isAuthenticated);
    if (error.id === "LOGIN_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }

    //if authenticated close modal
    if (open) {
      if (isAuthenticated) {
        setOpen(false);
      }
    }

    // return () => {};
  }, [error, open, isAuthenticated]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    setEmail("");
    setPassword("");

    dispatch(login(user));

    // setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Button variant="outlined" color="inherit" onClick={(e) => setOpen(true)}>
        Login
      </Button>
      <Modal open={open} onClose={(e) => ClearErrorsAndClose()}>
        <div className={classes.paper}>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Login
          </Typography>
          {msg ? <Alert severity="error">{msg}</Alert> : null}
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Enter Password"
              type="password"
              name="name"
              autoComplete="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={onFormSubmit} variant="contained" color="primary">
              Login
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default LoginModal;
