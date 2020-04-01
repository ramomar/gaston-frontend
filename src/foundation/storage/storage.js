export function setItem(key, value) {
  JSON.stringify(localStorage.setItem(key, value));
}

export function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function removeItem(key) {
  localStorage.removeItem(key);
}
