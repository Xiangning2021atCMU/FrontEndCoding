function render(str, styles) {
return str.split('').reduce((res, letter, i, arr) => {
    // console.log("check the letter");
    // console.log(letter);
    const tags = styles.reduce((acc, [start, end, tag]) =>  {
        const result = i >= start && i <= end ? acc.concat(tag) : acc;
    return result;
    }// Current letter tags
    , []);
    
    while (res.stack.some(tag => !tags.includes(tag))) {
    res.str += `</${res.stack.pop()}>`; // Pop unwanted tags off the stack
    }
    
    tags.forEach(tag => {
        if (!res.stack.includes(tag)) { // Push wanted tags to the stack
        res.stack.push(tag);
        res.str += `<${tag}>`;
        }
    });

    res.str += letter;

    // If there are tags to close at the end of the string
    if (i === arr.length - 1)
    while (res.stack.length)
        res.str += `</${res.stack.pop()}>`;

    return res;
}, { stack: [], str: '' }).str;
}

//  console.log(('hello, word'.split(' ')).split("").flat(1));
// console.log(Array.from('hello, world')); // turn it into array.
// console.log([].includes(4));
// console.log([].some(val => 1)); // at least one elment returns false, but we have no element at first.

function render2(str, styles) {
return Array.from(str).reduce( (res, letter, i, arr) => {
    // for each character, we just find the corresponding tags is has.
    const tags = styles.reduce((acc, [start, end, tag]) => {
        if (i >= start && i <= end) {
            acc.concat(tag);
            return acc.concat(tag); // concat cannot change the arr, so we have to return it seperately.
        }
        return acc;
    }, []);
    // delete the tag in the stack that is not in the tags;
    while(res.stack.some(tag => !tags.includes(tag))) {
        res.str += `</${res.stack.pop()}>`;
    }
    
    // notice here we use foreach, and also foreach can run in the empty array.
    tags.forEach(tag => {
        if (!res.stack.includes(tag)) {
            res.stack.push(tag);
            res.str += `<${tag}>`;
        } 
    });
    res.str += letter;

    if (i == arr.length - 1) {
        while(res.stack.length) { // length, notice the spelling.
        res.str += `</${res.stack.pop()}>`;
        }
    }

    return res;
}
, {str:'', stack:[]}).str;
}


const res2 = render2('Hello,world', [[0, 2, 'i'], [7, 10, 'u'], [4, 9, 'b'] ]);
// <i>Hel</i>l<b>o, w<u>orl</u></b><u>d</u>

console.log(res2);
const res = render('Hello,world', [[0, 2, 'i'], [7, 10, 'u'], [4, 9, 'b'] ]);

console.log(res);

function render3(str, styles) {
    if (!str) return null;
    if (!styles) return str;

    return Array.from(str).reduce((res, letter, i, arr) => {
//    for each of the letter: find its tags
    const tags = styles.reduce((acc, [start, end, tag]) => {
        if (i >= start && i <= end) {
        return acc.concat(tag); // concat does not change the acc.
        }
        return acc;
    },
    []);

//    use the stack, push and pop;
    while(res.stack.some(tag => !tags.includes(tag))) {
        res.str += `</${res.stack.pop()}>`;
    }

    tags.forEach(tag => {
        if (!res.stack.includes(tag)) {
            res.stack.push(tag);
            res.str += `<${tag}>`;
        }
    });

    res.str += letter;
    if (i == arr.length - 1) {
        while(res.stack.length) {
            res.str += `</${res.stack.pop()}>`;        
        }
    }

    return res;
    }, {
    stack:[],
    str:''
    }).str;
}

const res3 = render3('Hello,world', [[0, 2, 'i'], [7, 10, 'u'], [4, 9, 'b'] ]);
//  {/* <i>Hel</i>l<b>o, w<u>orl</u></b><u>d</u>
//  document.body.innerHTML = res; */}
console.log(res3);



// // // const arr = [1, 2, [3, 4, [5, 6]]];

const { reset } = require("yargs");

// to enable deep level flatten use recursion with reduce and concat
function flatDeep(arr, d = 1) {
return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
            : arr.slice();
};

flatDeep(arr, Infinity);
// [1, 2, 3, 4, 5, 6]

// 1. flatten an array.
const arr = [1, 2, [[3, 4, [5, 6]], 7, 8]];


const flat = (arr, d = 1) => {
if (d > 0) {
    return arr.reduce(
        (acc, val) => {
            if(Array.isArray(val)) {
                return acc.concat(flat(val, d - 1)); // concat function does not change the original one. 
            } else {
                return acc.concat(val);
            }
        },[]);
}
return arr.slice();

// return d > 0? arr.reduce((acc, val) => acc.concat(Array.isArray(val)? flat(val, d - 1) : val),[]) : arr.slice();
}

console.log(flat(arr, 1));
// in a iterative way:
const flatIterative = (arr, depth = 1) => {
const stack = arr.map(item => [item, depth]);
const result = [];
while(stack.length > 0) {
    const [item, depth] = stack.pop();
    
    if (Array.isArray(item) && depth > 0) {
        stack.push(...item.map(i => [i, depth - 1]));
    } else{
        result.push(item);
    }
}
return result.reverse();
}

console.log(flatIterative(arr, 1));

// time complexity?

// https://stackoverflow.com/questions/69197348/javascript-flatten-array-are-the-two-approaches-the-same-in-terms-of-the-time-c

// 9. decode the string.

/**
 * @param {string[][]} message
 * @return {string}
 */
function decode(message) {
if (message == null || message.length == 0) return '';

let i= 0;
let j = 0;
let step = 1;
let cols = message[0].length;
let result = '';

while(j < cols) {
    result += message[i][j];
    if(!message[i + step]) {
    step *= (-1);
    }
    i += step;
    j++;
}
return result;
// your code here
}


//   18. improve the function
//   Given an input of array, 
// which is made of items with >= 3 properties

let items = [
{color: 'red', type: 'tv', age: 18}, 
{color: 'silver', type: 'tv', age: 20},
{color: 'blue', type: 'book', age: 17}
] 

const excludes = [ 
{k: 'color', v: 'silver'}, 
{k: 'color', v: 'red'}
]
function excludeItems(items, excludes) { 
const map = new Map();
for (const {k,  v} of excludes) {
    if (!map.has(k)) {
        map.set(k, new Set());
    }
    map.get(k).add(v);
}

return items.filter(item => {
    // return true, if element pass the filter
    return Object.keys(item).every(key => !map.has(key) || !map.get(key).has(item[key]) )
})

}


console.log(excludeItems(items, excludes));

// test case:
// // // // const map = new Map();
// // // // map.set("1",{"key": 7});
// // // // map.set(2,2);
// // // // console.log(map);
// // // // const keyvalue= "1";
// // // // delete map.keyvalue;
// // // // map.delete(keyvalue);
// // // // console.log(map);

// // // // console.log(!1);


// // // let items = [
// // //     {color: 'red', type: 'tv', age: 18}, 
// // //     {color: 'silver', type: 'phone', age: 20},
// // //     {color: 'blue', type: 'book', age: 17}
// // //  ]

// // //  const excludes = [ 
// // //   {k: 'color', v: 'silver'}, 
// // //   {k: 'type', v: 'tv'}, 
// // //  ] 

// // // excludes.forEach(exclude => {
// // //     console.log(exclude.k);
// // //     // console.log(exclude[k]);
// // // })

// // // items.forEach(item => {
// // //     let key = "color";
// // //     console.log(item[key]);
// // // })

// // // // for object.

// // // function excludeItems(items, excludes) {
// // //     const map = new Map();
// // //     excludes.forEach(i => {
// // //       if (!map.has(i.k)) {
// // //         map.set(i.k, new Set());
// // //       }
// // //       map.get(i.k).add(i.v);
// // //     });

// // //   return items.filter(item => 
// // //         Object.keys(item).every(key => !map.has(key) || 
// // //         !map.get(key).has(item[key]))
// // //   );
// // // }

// // // console.log(excludeItems(items,excludes));

// // // expect(run(['A@0', 'B@2', 'C@3'])).toEqual(['C@5'])



// // // Debouncing in Javascript
// // let counter = 0;
// // const getData = () => {
// //   // calls an API and gets Data
// //   console.log("Fetching Data ..", counter++);
// // }

// // const debounce = function (fn, d) {
// //   let timer;
// //   return function () {
// //     let context = this,
// //       args = arguments;
// //     clearTimeout(timer);
// //     timer = setTimeout(() => {
// //       getData.apply(context, arguments);
// //     }, d);
// //   }
// // }

// // const betterFunction = debounce(getData, 300);

// // // throttle:
// // const throttle = function(fn, wait) {
// //     let lastTime = 0;
// //     return (...args) => {
// //         let now = new Date().getTime();
// //         if (now - lastTime > wait) {
// //             fn(...args);
// //             lastTime = now;
// //         }
    
// //     }
// // }

// // function throttle (callback, limit) {
// //     var wait = false;                  // Initially, we're not waiting
// //     return function () {               // We return a throttled function
// //         if (!wait) {                   // If we're not waiting
// //             callback.call();           // Execute users function
// //             wait = true;               // Prevent future invocations
// //             setTimeout(function () {   // After a period of time
// //                 wait = false;          // And allow future invocations
// //             }, limit);
// //         }
// //     }
// // }



// // // how to clear all the timers using clearalltimeout function.
// // const oldSetTimeOut = window.setTimeout;

// // const timers = new Set(); // can that set be const, yes, since it's a reference.
// // // overwrite the settimeout function.
// // window.setTimeout = (callback, delay, ...args) =>  {
// //   const timerID = oldSetTimeOut(callback, delay, ...args);
// //   timers.add(timerID);
// //   return timerID;
// // }

// // function clearAllTimeout() {
// //   for (const timer of timers) {
// //     clearTimeout(timer);
// //     timers.delete(timer);
// //   }
// //   // timers.clear(); // remove all the id in the set.
// // }

// // // debounce and throttle function:

// // // call the function.
// // // run the function once with the lastest arguments if there is no more function call
// // // in the given cooldown time period.
// // // 
// // // if we have a new event, 
// // function debounce(func, wait) {
// //   let timer;
// //   return function() {
// //     clearTimeout(timer);
// //     timer = setTimeout( () => {
// //       func.apply(this, arguments);
// //     }, wait);
// //   }
// // }


// // // throttle function:
// // // run a function once per ms milliseconds;
// // function throttle(func, ms) {
// //   let isThrottle  = false;
// //   let savedArgs;
// //   let savedThis;

// //   return function wrapper(...args) {  // we can use arguments 
// //     // also we can use ...res as the es6 features.
// //     if (isThrottle) {
// //       savedArgs = args;
// //       savedThis = this;
// //       return;
// //     }

// //     isThrottle = true;
// //     // func.apply(this, args);
// //     func(...args);

// //     setTimeout(()=> {
// //       isThrottle = false;
// //       if (savedArgs) {
// //         wrapper.apply(savedThis, savedArgs);
// //         savedThis = null;
// //         savedArgs = null; // a must, after a ms, we call the function once, and then
// //         // after like another ms, if there is no call at all;
// //         // but the savedArgs is not null, we will get into the if statement again.
// //       }
// //     }, ms);
// //   }

// // }




// // // clear all the timers:
// // /**
// //  * cancel all timer from window.setTimeout
// //  */

// // let timers = new Set();
// // let oldSetTimeout = window.setTimeout;
// // let oldClearTimeout = window.clearTimeout;

// // window.setTimeout = (callback, delay, ...args) => {
// //   let callbackWrapper = () => {
// //     callback(...args);
// //   };
// //   let id = oldSetTimeout(callbackWrapper, delay);
// //   timers.add(id);
// //   return id; // notice that we have to return this id.
// // }

// // window.clearTimeout = (id) => {
// //   oldClearTimeout(id); // notice we have to call the 
// //   // previous function.
// //   timers.delete(id);
// // }

// // function clearAllTimeout() {
// //   // your code here
// //   for (const id of timers) {
// //     clearTimeout(id);
// //   }
// // }

// function memo(func, resolver) {
//    // your code here
//    const cache = new Map();

//    // Map<cacheKey, Map<context, value>>
//    return function() {
//      const cacheKey = resolver ?  resolver(...arguments) : Array.from(arguments).join(',');

//      const contextMap = cache.get(cacheKey);
//      // If there is a corresponding context map to cachekey
//      // Check if context is in the map, if so, return value.
//      // Else if no corresponding add contextMap, add new entry to the context map
//      if (!contextMap) {
//        const value = func.apply(this, arguments);
//        cache.set(cacheKey, new Map([[ this, value ]]));
//        return value;
//      }

//      if (contextMap.has(this)) {
//        return contextMap.get(this);
//      } 
//      // If context not in the map, calculate and add to context map.
//      const value = func.apply(this, arguments);
//      contextMap.set(this, value);
//      return value;
//    }
//  }

// function testThis(a) {
//   return `${this.val}_${a}`;
// }

// const memoFunc = memo(testThis)

// const testSubject = {
//   val: 1,
//   memo: memoFunc,
// }

// const testSubject2 = {
//   val: 2,
//   memo: memoFunc,
// }

// // 1_1
// console.log(testSubject.memo(1));
// // Expected no caching and output is 2_1
// console.log(testSubject2.memo(1));
// // Expected to cache
// console.log(testSubject2.memo(1));


// /**
//  * @param {Function} func
//  * @param {(args:[]) => string }  [resolver] - cache key generator
//  */
// function memo(func, resolver = (...args) => args.join("_")) {
//    // your code here
//    const map = new Map();

//    return function(...args) {
//      const key = resolver(...args);
//      const contextMap = map.get(key); 
//      // whether we have the context map, map this to the value;

//       // no contextmap;
//      if (!contextMap) {
//          const value = func.apply(this, args);
//          map.set(key, new Map([
//          [this, value]
//          ]));
//          return value;
//      }


//      if (contextMap.has(this)) {
//         return contextMap.get(this);
//      }

//      contextMap.set(this, func.apply(this, args));
//      return contextMap.get(this);
//    }
//  }



function memoizeOne(func, isEqual) {
// your code here
let cache = {};
// key, context and value;
return function(...args) {
    if(!cache.key) { // the cache is empty
    cache.key = args;
    const value = func.apply(this, args);
    cache.value = value;
    cache.context = this;
    return value;
    } else { // the cache has one element.
    const newIsEqual = isEqual? isEqual : (a, b) => {
        if (a.length != b.length) {
        return false;
        }
        console.log("in the equal functioin");
        for (let i = 0; i < a.length; i++) {
        if (a[i] !=b[i]) {
            return false;
        }
        }
        return true;       
    };

    if (newIsEqual(args, cache.key) && this === cache.context) {
        console.log("inside");
        return cache.value;
    } else {
        console.log("different args");
        cache.key = args;
        cache.context = this;
        const value = func.apply(this, args);
        cache.value = value;
        return value;
    }
    }
}

}
let callCount = 0
const func = (a, b) => {
callCount += 1
return a + b
}
const memoed = memoizeOne(func);
console.log(memoed(1,2)); // 3
console.log(callCount); // 1
console.log(memoed(1,2)); // 3
console.log(callCount); // 1
console.log(memoed(1,3));
console.log(callCount); // 2

//  expect(memoed(1,2)).toBe(3)
//  expect(callCount).toBe(1)
//  expect(memoed(1,2)).toBe(3)
//  expect(callCount).toBe(1)
//  expect(memoed(1,3)).toBe(4)
//  expect(callCount).toBe(2)

const cache = {};
console.log(cache.key);
// console.log(cache.key.length); cannot read property length of undefined.
// then we have to make sure that it's not empty then use the size.

// for throttle:
// if all the events are going to run
// what should we do?

const throttle = (func, wait) => {
let queue = []; // push and shift.
let isThrottle = false;

return function wrapper(){
    if (isThrottle) {
        queue.push([this, arguments]); // the context and the arguments;
        return;
    }
    isThrottle = true;
    func.apply(this, arguments);

    setTimeout(() => {
        isThrottle = false;
        if (queue.length > 0) {
        const [context, args] = queue.shift();
        wrapper.apply(context, args); 
        }
    }, wait);

}
}


// const move = document.getElementById("move");

const animateRight = (element, duration, distance) => {
    const startTime = new Date().getTime();
    let endTime = null;
    const ani = setInterval(()=> {
      endTime = new Date().getTime();
      const percent = (endTime - startTime) / duration;
      if( percent>= 1){
        clearInterval(ani);
      }
      element.style.marginLeft = percent * distance + "px";
    }, 20);
}


// https://jsfiddle.net/9g310uez/

// function animate(elm, milliseconds, distance) {
//    const { x } = elm.getBoundingClientRect()
//    elm.animate([
//      { transform: `translateX(${x}px)` },
//      { transform: `translateX(${x + distance}px)` }
//    ], {
//      duration: milliseconds,
//      fill: 'forwards'
//    })
//  }

//  var elm = document.getElementById('rect')
//  elm.addEventListener('click', () => {
//    animate(elm, 1000, 200)
//  })

function animateRighthaha(element, time, distance) {
const {x} = element.getBoundingClientRect(); // get the starting position of the element;

const timerID = setInteval(frame, 10); // every 10 miliseconds, we call the function.
let position = 0;
const frame = () => {
    if (position == distance) {
        clearInterval(timerID);
    } else {
        position++;
        element.style.left = (x + position) + "px";
    }
}

}


// basically three methods to get the animation method:
/* function animate(elm, milliseconds, distance) {
const { x } = elm.getBoundingClientRect()
elm.animate([
{ transform: `translateX(${x}px)` },
{ transform: `translateX(${x + distance}px)` }
], {
duration: milliseconds,
fill: 'forwards'
})
}

var elm = document.getElementById('rect')
elm.addEventListener('click', () => {
animateRight(elm, 1000, 200)
})


function animateRight(element, time, distance) {
var elmement = document.getElementById('rect');
var pos = 0;
var id = setInterval(frame, time / distance);
function frame() {
    if (pos == distance) {
        clearInterval(id);
    } else {
        pos++;
        element.style.left = pos + 'px';
    }
}
}


function conventionalAnimation() {
var elem = document.getElementById("myAnimation");
var pos = 0;
var id = setInterval(frame, 10);
function frame() {
    if (pos == 300) {
        clearInterval(id);
    } else {
        pos++;
        elem.style.left = pos + 'px';
    }
}
}



conventionalAnimation(); */

// let elem = document.getElementById("myAnimation");
function animateRight1(elem, time, distance) {
const { x, y } = elem.getBoundingClientRect();
console.log("check x" + x + y);
var pos = 0;
var id = setInterval(frame, time/distance);
function frame() {
    if (pos == distance) {
        clearInterval(id);
    } else {
        pos++;
        elem.style.transform = "translateX("+ pos + "px)"; 
        /* style.transform = "translateX("+ (x + pos) + ")px" */;
    }
}
}
// animateRight1(elem, 1000, 200);


function animateRight2(element, time, distance) {
let startTime;
let stopFlag = false;
let progress = 0;
let animationId;

function step(timestamp) {
if (startTime === undefined) {
    startTime = timestamp; // get the beginning timepoint;
} else {
    progress = timestamp - startTime;
}

    let pos = progress * (distance / time); // progress is
    element.style.transform = "translateX("+ pos + "px)"; // 注意这个地方的格式. px)

if (progress <= time) {
    animationId = window.requestAnimationFrame(step);
    } else {
    window.cancelAnimationFrame(animationId);

    }
    }
window.requestAnimationFrame(step);
}

// let elem2 = document.getElementById("item");
// animateRight2(elem2,1000, 200);

function animateRight3(element, time, distance) {
    element.animate([
{transform: `translateX({$distance})px`},
], {
duration:time,
});
}

// let elem3 = document.getElementById("item2");
// animateRight2(elem3,1000, 200);


