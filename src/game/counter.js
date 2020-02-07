let count = 0;

export default {
  init: () => {
    count = 0;
  },
  increment: () => {
    count += 1;
  },
  get result() {
    return count;
  }
};
