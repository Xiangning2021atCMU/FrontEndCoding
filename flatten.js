// iterative, recursive, what is the time complexity
// test case;
// corner case;

// what if the depth is infinity.
// what is the depth layer given is far more than the nested situaition.

function flat(arr, depth = 1) {
  const result = [];
  arr.forEach((item) => {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flat(item, depth - 1));
    } else {
      result.push(item);
    }
  });
  return result;
}

function flat(arr, depth) {
  const result = [];
  const stack = arr.map((item) => [item, depth]);

  while (stack.length) {
    const [item, depth] = stack.pop();
    if (Array.isArray(item) && depth > 0) {
      stack.push(...item.map((i) => [i, depth - 1]));
    } else if (typeof item != "object") {
      result.push(item);
    }
  }
  return result.reverse(); // notice here, we have to reverse it.
}

console.log(flat([1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]], Infinity));
// time complexity
// space complexity
// it can be very tricky for the complexity stuff.
// when the depth is 1;
//
// iterative case: stack: space complexity: O(n); time complexity: O(n);
// recursive case: O(n) for time complexity, O(n) for the space complexity.
// corner cases?

function flattenRecursive(a, ret) {
  return a.reduce((ret, cur) => {
    if (Array.isArray(cur)) {
      flattenRecursive(cur, ret);
    } else if (typeof cur !== "object") {
      ret.push(cur);
    }
    return ret;
  }, ret || []);
}

function flattenIterative(a) {
  let ret = [];

  while (a.length) {
    let cur = a.pop();
    if (Array.isArray(cur)) {
      a = [...a, ...cur];
    } else if (typeof cur !== "object") {
      ret.push(cur);
    }
  }

  return ret.reverse();
}

var flatten = function (arr) {
  newArr = typeof newArr === "undefined" ? [] : newArr;
  arr.forEach(function (elem, id, ar) {
    if (Array.isArray(elem)) {
      flatten3(elem);
    } else if (elem.constructor === Object) {
      void 0;
    } else {
      newArr.push(elem);
    }
  });
  return newArr;
};

// but sometimes typeof item === 'object' won't work for null.
// if the depth is not given, and also we need the array to be flattened, then depth is Infinity.
