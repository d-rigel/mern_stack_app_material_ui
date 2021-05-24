import React, { useState } from "react";
import { Button, Modal, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/actions/itemActions";

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
      // marginLeft: -150,
    },
  },
}));

function ItemModal() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onFormSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name,
    };
    setName("");

    dispatch(addItem(newItem));

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {isAuthenticated ? (
        <Button
          variant="outlined"
          color="primary"
          onClick={(e) => setOpen(true)}>
          Add Item
        </Button>
      ) : (
        <h4>Please login to manage items</h4>
      )}

      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Add shopping item"
              name="name"
              autoComplete="item"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={onFormSubmit} variant="contained" color="primary">
              Add Item
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ItemModal;
