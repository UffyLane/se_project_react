const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export const handleServerResponse = async (response) => {
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

export const deleteClothingItem = async (item) => {
  console.log('Deleting item:', item);
  const id = item.id || item._id;
  const response = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers,
  });
  return handleServerResponse(response);
};
