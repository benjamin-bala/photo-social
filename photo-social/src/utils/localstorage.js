export function STORE_DATA(key, data) {
  try {
    let DATA = JSON.stringify(data);
    localStorage.setItem(key, DATA);
    return true;
  } catch (err) {
    return false;
  }
}

export function GET_DATA(key) {
  try {
    let response = localStorage.getItem(key);
    return JSON.parse(response);
  } catch (err) {
    return false;
  }
}
