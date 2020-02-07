import { TOO_LESS, TOO_MUCH } from './constants';

export default (num, expected) => {
  if (num > expected) {
    alert(TOO_MUCH);
  } else if (num < expected) {
    alert(TOO_LESS);
  }
};
