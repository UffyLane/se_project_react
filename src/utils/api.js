const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

const handleServerResponse = async (response) => {
  if (response.ok) {
    return response.json();
  }
  const errorData = await response.json();
  return Promise.reject(`Error: ${response.status} - ${errorData.message}`);
};

export const fetchClothes = () => {
  return fetch(`${baseUrl}/items`, {
    headers,
  }).then(handleServerResponse);
};

export const addClothingItem = (itemData) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify(itemData),
  }).then(handleServerResponse);
};

export const deleteClothingItem = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers,
  }).then(handleServerResponse);
};
