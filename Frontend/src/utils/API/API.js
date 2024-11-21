/* const BASE_URL = "http://localhost:3000/api/v1"; */
const BASE_URL = "https://rock-the-food-six.vercel.app/api/v1";


export const API = async ({ endpoint, method = "GET", body, content_type }) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  if (content_type) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  const res = await fetch(BASE_URL + endpoint, {
    method,
    headers,
    body,
  });

  const response = await res.json();

  if (res.status === 400 || res.status === 401 || res.status === 500) {
    return { error: response };
  }

  return { response };
};
