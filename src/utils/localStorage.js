export const getItems = (key) => {
  const store = localStorage.getItem(key) || "[]";
  return JSON.parse(store);
};

export const getItem = (key, value, searchKey = "id") => {
  const store = localStorage.getItem(key) || "[]";
  const data = JSON.parse(store);
  return data.find((d) => d[searchKey] == value);
};

export const setItem = (key, data = []) => {
  localStorage.setItem(key, JSON.stringify(data));
  return JSON.parse(localStorage.getItem(key));
};

export const pushItem = (key, data = [], searchKey = "id") => {
  const store = localStorage.getItem(key) || "[]";
  try {
    const _store = JSON.parse(store);

    if (!_store.find((e) => e[searchKey] === data[searchKey])) {
      _store.push(data);
      setItem(key, _store);
      return _store;
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeItem = (key, data = [], searchKey = "id") => {
  const store = localStorage.getItem(key) || "[]";
  try {
    const _store = JSON.parse(store);
    const index = _store.findIndex((e) => e[searchKey] === data[searchKey]);
    if (index !== -1) {
      _store.splice(index, 1);
      setItem(key, _store);
      return _store;
    }
  } catch (error) {
    console.error(error);
  }
};
