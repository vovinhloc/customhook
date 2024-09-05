import {useEffect} from "react";
import { useReducer } from "./useReducer";

function fetchReducer(state, action) {
  switch (action.type) {
    case "fetchAPI/request":
      return { ...state, isLoading: action.isLoading };
    case "fetchAPI/success":
    case "fetchAPI/error":
      return {
        ...state,
        isLoading: action.isLoading,
        data: action.data,
        error: action.error,
      };
    default:
      return state;
  }
}

const fetchUsers = async (url = "https://dummyjson.com/users", dispatch) => {
  dispatch({
    type: "fetchAPI/request",
    isLoading: true,
    data: [],
    error: null,
  });
  try {
    const res = await fetch(url);
    const data = await res.json();
    dispatch({
      type: "fetchAPI/success",
      isLoading: false,
      data: data.users,
      error: null,
    });
  } catch (err) {
    dispatch({
      type: "fetchAPI/error",
      isLoading: true,
      data: [],
      error: null,
    });
  }
};
export const useFetch = (url) => {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: [],
    isLoading: false,
    error: null,
  });
  useEffect(() => {
    fetchUsers(url, dispatch);
  }, [url]);

  return { ...state };
};
