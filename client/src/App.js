import "./App.css";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { loadUser } from "./redux/actions/authActions";
import AppNavbar from "./components/AppNavbar";
import Container from "@material-ui/core/Container";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <ItemModal />
        <ShoppingList />
      </Container>
    </div>
  );
}

export default App;
