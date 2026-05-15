const baseUrl = import.meta.env.VITE_API_URL;



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

// 🔥 GET Clothing Items (PUBLIC — NO TOKEN)
export const fetchClothes = () => {
  return fetch(`${baseUrl}/items`).then(handleServerResponse);
};


// 🔥 GET User Info
export const fetchUserInfo = () => {
  return fetch(`${baseUrl}/users/me`, {
    headers: getHeaders(),
  }).then(handleServerResponse);
};

export const getCurrentUser = () => {
  return fetch(`${baseUrl}/users/me`, {
    headers: getHeaders(),
  }).then(handleServerResponse);
};


// 🔥 PATCH User Info
export const updateUserInfo = ({ name, avatar }) => {
  const token = localStorage.getItem("jwt");

  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
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
export const deleteClothingItem = async (id) => {
  const response = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleServerResponse(response);
};

// 🔥 LIKE item
export const addCardLike = (id) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: getHeaders(),
  }).then(handleServerResponse);
};

// 🔥 DISLIKE item
export const removeCardLike = (id) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: getHeaders(),
  }).then(handleServerResponse);
};
