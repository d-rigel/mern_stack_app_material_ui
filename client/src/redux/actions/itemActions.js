import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
} from "../actions/types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

//get items
export const getItems = () => async (dispatch) => {
  dispatch(setItemsLoading());
  try {
    const { data } = await axios.get("/api/items");
    dispatch({
      type: GET_ITEMS,
      payload: data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

//add items
export const addItem = (item) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(
      "/api/items",
      item,
      tokenConfig(getState)
    );
    dispatch({
      type: ADD_ITEM,
      payload: data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

//delete items
export const deleteItem = (id) => async (dispatch, getState) => {
  axios.delete(`/api/items/${id}`, tokenConfig(getState)).then((res) =>
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    })
  );
};

//set items loading
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
