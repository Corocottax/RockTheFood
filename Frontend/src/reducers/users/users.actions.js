import { API } from "../../utils/API/API";

export const login = async (body, dispatch, navigate) => {
  dispatch({ type: "LOADING" });

  const { error, response } = await API({
    endpoint: "/users/login",
    method: "POST",
    body,
    content_type: true,
  });

  if (error) {
    dispatch({ type: "ERROR", payload: error });
  } else {
    dispatch({ type: "LOGIN", payload: response });
    localStorage.setItem("token", response.token);
    navigate("/");
  }
};

export const checkSession = async (dispatch, navigate) => {
  dispatch({ type: "LOADING" });

  const { error, response } = await API({ endpoint: "/users/checksession" });

  if (error) {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  } else {
    dispatch({ type: "LOGIN", payload: response });
    navigate("/");
  }
};

export const registerUser = async (body, dispatch, navigate) => {
  dispatch({ type: "LOADING" });

  const { error } = await API({
    endpoint: "/users/register",
    method: "POST",
    body,
    content_type: true,
  });

  if (error) {
    dispatch({ type: "ERROR", payload: error });
  } else {
    dispatch({
      type: "REGISTER",
      payload: { email: body.email, password: body.password },
    });
    navigate("/verifyaccount");
  }
};

export const verifyAccount = async (id, dispatch, navigate) => {
  dispatch({ type: "LOADING" });

  const { error, response } = await API({ endpoint: `/users/verify/${id}` });

  if (!error) {
    dispatch({ type: "LOGIN", payload: response });
    localStorage.setItem("token", response.token);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  } else {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }

};
