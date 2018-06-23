/*
 * leftpad
 */
export function leftpad(str, len, ch = ' ') {
  str = `${str}`;

  for (let i = str.length; i < len; i++) {
    str = ch + str;
  }

  return str;
};

/*
 * shuffle 打乱数组
 */
export function shuffle(array) {
  const items = array.slice();
  let t, r, i;

  for (i = items.length - 1; i > 0; i--) {
    r = Math.round(Math.random() * i);

    t = items[i];
    items[i] = items[r];
    items[r] = t;
  }

  return items;
}

/*
 * debounce 防抖
 */
export function debounce(func, delay) {
  let timer;

  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/*
 * throttle 节流
 */
export function throttle(func, delay) {
  let timer, now, prev, ctx, args;

  const excute = function () {
    func.apply(ctx, args);
    prev = now;
  };

  return function() {
    now = Date.now();
    args = arguments;
    ctx = this;

    timer && clearTimeout(timer);

    if (prev) {
      const diff = now - (prev + delay);
      if (diff >= 0) {
        excute();
      } else {
        timer = setTimeout(excute, -diff);
      }
    } else {
      excute();
    }
  };
}

/*
 * getRandom
 */
export function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
