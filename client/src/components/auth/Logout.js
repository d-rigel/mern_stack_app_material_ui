import React, { Fragment } from "react";
import { Button } from "@material-ui/core";
import { logout } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";

function Logout() {
  const dispatch = useDispatch();
  return (
    <div>
      <Fragment>
        <Button
          variant="outlined"
          color="inherit"
          href="#"
          onClick={(e) => dispatch(logout())}>
          Logout
        </Button>
      </Fragment>
    </div>
  );
}

export default Logout;
