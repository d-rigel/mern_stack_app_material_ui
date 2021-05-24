import React, { useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Container from "@material-ui/core/Container";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useDispatch, useSelector } from "react-redux";
import { getItems, deleteItem } from "../redux/actions/itemActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function ShoppingList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListItem>
                  <div className="btn__del">
                    {isAuthenticated ? (
                      <DeleteForeverIcon
                        onClick={(e) => dispatch(deleteItem(_id))}
                      />
                    ) : null}
                  </div>
                  {name}
                </ListItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </List>
      </div>
    </Container>
  );
}

export default ShoppingList;
