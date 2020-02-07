import TO_FIND from './random';
import getNum from './input';
import success from './success';
import info from './info';
import counter from './counter';

export default () => {
  let num = getNum();
  counter.init();
  while (num !== TO_FIND) {
    counter.increment();
    info(num, TO_FIND);
    num = getNum();
  }
  success(counter.result);
};

