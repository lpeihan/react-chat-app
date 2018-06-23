function serialize(val) {
  return JSON.stringify(val);
}

function deserialize(val) {
  try {
    return JSON.parse(val);
  } catch (e) {}
}

const cache = {
  store: window.localStorage,

  getItem(key) {
    return deserialize(this.store.getItem(key));
  },
  setItem(key, val) {
    this.store.setItem(key, serialize(val));

    return val;
  },
  removeItem(key) {
    this.store.removeItem(key);
  }
};

export default cache;
