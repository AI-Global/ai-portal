const BASE_URL = process.env.REACT_APP_API_BASE_URL;

let get = async (path) => {
  let resp = await fetch(BASE_URL + path);
  return await resp.json();
};

let post = async (path, data) => {
  let resp = await fetch(BASE_URL + path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await resp.json();
};

window.api = { get, post };

export default window.api;
