const baseUrl = "http://localhost:3001";

// 🔑 Always include JWT token in headers
const getHeaders = () => {
  const token = localStorage.getItem("jwt");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const handleServerResponse = async (response) => {
  if (response.ok) {
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }

  const text = await response.text();
  let errorData;

  try {
    errorData = text ? JSON.parse(text) : { message: "Unknown error" };
  } catch {
    errorData = { message: "Invalid JSON response" };
  }

  return Promise.reject(`Error: ${response.status} - ${errorData.message}`);
};

// 🔥 GET Clothing Items
export const fetchClothes = () => {
  return fetch(`${baseUrl}/items`, {
    headers: getHeaders(),
  }).then(handleServerResponse);
};

// 🔥 GET User Info
export const fetchUserInfo = () => {
  return fetch(`${baseUrl}/users/me`, {
    headers: getHeaders(),
  }).then(handleServerResponse);
};

// 🔥 PATCH User Info
export const updateUserInfo = (userData) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  }).then(handleServerResponse);
};

// 🔥 POST Signup
export const signupUser = (userData) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  }).then(handleServerResponse);
};

// 🔥 POST Signin
export const loginUser = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
};

// 🔥 POST Clothing Item (MISSING BEFORE — now fixed)
export const addClothingItem = (itemData) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(itemData),
  }).then(handleServerResponse);
};

// 🔥 DELETE Clothing Item
export const deleteClothingItem = async (item) => {
  const id = item._id;
  const response = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleServerResponse(response);
};

