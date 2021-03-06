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

// // // // 9. decode the string.

// // // /**
// // //  * @param {string[][]} message
// // //  * @return {string}
// // //  */
// // // function decode(message) {
// // //     if (message == null || message.length == 0) return '';
  
// // //     let i= 0;
// // //     let j = 0;
// // //     let step = 1;
// // //     let cols = message[0].length;
// // //     let result = '';
  
// // //     while(j < cols) {
// // //       result += message[i][j];
// // //       if(!message[i + step]) {
// // //         step *= (-1);
// // //       }
// // //       i += step;
// // //       j++;
// // //     }
// // //     return result;
// // //     // your code here
// // //   }


// //   // 18. improve the function
// //   // Given an input of array, 
// // // which is made of items with >= 3 properties

// // // let items = [
// // //     {color: 'red', type: 'tv', age: 18}, 
// // //     {color: 'silver', type: 'tv', age: 20},
// // //     {color: 'blue', type: 'book', age: 17}
// // //   ] 
   
// // //  const excludes = [ 
// // //   {k: 'color', v: 'silver'}, 
// // //   {k: 'color', v: 'red'}
// // //  ]
// // //   function excludeItems(items, excludes) { 
// // //     const map = new Map();
// // //     for (const {k,  v} of excludes) {
// // //         if (!map.has(k)) {
// // //             map.set(k, new Set());
// // //         }
// // //         map.get(k).add(v);
// // //     }

// // //     return items.filter(item => {
// // //         // return true, if element pass the filter
// // //         return Object.keys(item).every(key => !map.has(key) || !map.get(key).has(item[key]) )
// // //     })
 
// // //   }


// // //   console.log(excludeItems(items, excludes));


// // const emitter = new EventEmitter()
// // const callback1 = jasmine.createSpy('callback1');
// // const sub1 = emitter.subscribe('event1', callback1)
// // emitter.emit('event1', 1, 2, 3)
// // expect(callback1).toHaveBeenCalledWith(1,2,3)
// // sub1.release()
// // callback1.calls.reset()
// // emitter.emit('event1', 4,5,6)
// // expect(callback1.calls.count()).toBe(0)



// // const emitter = new EventEmitter()
// // const callback1 = jasmine.createSpy('callback1');
// // const sub1 = emitter.subscribe('event1', callback1)
// // const sub2 = emitter.subscribe('event1', callback1)
// // emitter.emit('event1', 1, 2, 3)
// // expect(callback1.calls.count()).toBe(2)
// // sub2.release()
// // callback1.calls.reset()
// // emitter.emit('event1', 4,5,6)
// // expect(callback1.calls.count()).toBe(1)



// // const emitter = new EventEmitter()
// // const callback1 = jasmine.createSpy('callback1');
// // emitter.subscribe('event1', callback1)
// // emitter.emit('event1')
// // expect(callback1).toHaveBeenCalled();


// // const emitter = new EventEmitter()
// // const callback1 = jasmine.createSpy('callback1');
// // const sub1 = emitter.subscribe('event1', callback1)
// // emitter.emit('event1', 1, 2, 3)
// // expect(callback1).toHaveBeenCalledWith(1,2,3)
// // sub1.release()
// // callback1.calls.reset()
// // emitter.emit('event1', 4,5,6)
// // expect(callback1.calls.count()).toBe(0)

// // // event emitter
// // class EventEmitter {
// //     eventsSub = new Map()
  
// //     subscribe(eventName, callback) {
// //         if (!this.eventsSub.has(eventName)) {
// //         this.eventsSub.set(eventName, new Set())
// //       }
// //       const subscriptions = this.eventsSub.get(eventName)
// //       const callbackObj = { callback } // you can add the same callback to the same events several times.
// //       subscriptions.add(callbackObj)
  
// //       return {
// //         release: () => {
// //           subscriptions.delete(callbackObj)
// //           if (subscriptions.size === 0) {
// //             delete this.eventsSub.eventName
// //           }
// //         }
// //       }
// //     }
    
// //     emit(eventName, ...args) {
// //       const subscriptions = this.eventsSub.get(eventName)
// //       if (subscriptions) {
// //         subscriptions.forEach(cbObj => {
// //           cbObj.callback.apply(this, args)
// //         })
// //       }
// //     }
// //   }

// // const map = new Map();
// // map.set("1",{"key": 7});
// // map.set(2,2);
// // console.log(map);
// // const keyvalue= "1";
// // delete map.keyvalue;
// // map.delete(keyvalue);
// // console.log(map);

// // console.log(!1);


// let items = [
//     {color: 'red', type: 'tv', age: 18}, 
//     {color: 'silver', type: 'phone', age: 20},
//     {color: 'blue', type: 'book', age: 17}
//  ]
 
//  const excludes = [ 
//   {k: 'color', v: 'silver'}, 
//   {k: 'type', v: 'tv'}, 
//  ] 

// excludes.forEach(exclude => {
//     console.log(exclude.k);
//     // console.log(exclude[k]);
// })

// items.forEach(item => {
//     let key = "color";
//     console.log(item[key]);
// })

// // for object.

// function excludeItems(items, excludes) {
//     const map = new Map();
//     excludes.forEach(i => {
//       if (!map.has(i.k)) {
//         map.set(i.k, new Set());
//       }
//       map.get(i.k).add(i.v);
//     });

//   return items.filter(item => 
//         Object.keys(item).every(key => !map.has(key) || 
//         !map.get(key).has(item[key]))
//   );
// }

// console.log(excludeItems(items,excludes));

// expect(run(['A@0', 'B@2', 'C@3'])).toEqual(['C@5'])



// Debouncing in Javascript
let counter = 0;
const getData = () => {
  // calls an API and gets Data
  console.log("Fetching Data ..", counter++);
}

const debounce = function (fn, d) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      getData.apply(context, arguments);
    }, d);
  }
}

const betterFunction = debounce(getData, 300);

// throttle:
const throttle = function(fn, wait) {
    let lastTime = 0;
    return (...args) => {
        let now = new Date().getTime();
        if (now - lastTime > wait) {
            fn(...args);
            lastTime = now;
        }
        
    }
}

function throttle (callback, limit) {
    var wait = false;                  // Initially, we're not waiting
    return function () {               // We return a throttled function
        if (!wait) {                   // If we're not waiting
            callback.call();           // Execute users function
            wait = true;               // Prevent future invocations
            setTimeout(function () {   // After a period of time
                wait = false;          // And allow future invocations
            }, limit);
        }
    }
}



// how to clear all the timers using clearalltimeout function.
const oldSetTimeOut = window.setTimeout;

const timers = new Set(); // can that set be const, yes, since it's a reference.
// overwrite the settimeout function.
window.setTimeout = (callback, delay, ...args) =>  {
  const timerID = oldSetTimeOut(callback, delay, ...args);
  timers.add(timerID);
  return timerID;
}

function clearAllTimeout() {
  for (const timer of timers) {
    clearTimeout(timer);
    timers.delete(timer);
  }
  // timers.clear(); // remove all the id in the set.
}

// debounce and throttle function:

// call the function.
// run the function once with the lastest arguments if there is no more function call
// in the given cooldown time period.
// 
// if we have a new event, 
function debounce(func, wait) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout( () => {
      func.apply(this, arguments);
    }, wait);
  }
}


// throttle function:
// run a function once per ms milliseconds;
function throttle(func, ms) {
  let isThrottle  = false;
  let savedArgs;
  let savedThis;

  return function wrapper(...args) {  // we can use arguments 
    // also we can use ...res as the es6 features.
    if (isThrottle) {
      savedArgs = args;
      savedThis = this;
      return;
    }

    isThrottle = true;
    // func.apply(this, args);
    func(...args);

    setTimeout(()=> {
      isThrottle = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedThis = null;
        savedArgs = null; // a must, after a ms, we call the function once, and then
        // after like another ms, if there is no call at all;
        // but the savedArgs is not null, we will get into the if statement again.
      }
    }, ms);
  }

}




// clear all the timers:
/**
 * cancel all timer from window.setTimeout
 */

let timers = new Set();
let oldSetTimeout = window.setTimeout;
let oldClearTimeout = window.clearTimeout;

window.setTimeout = (callback, delay, ...args) => {
  let callbackWrapper = () => {
    callback(...args);
  };
  let id = oldSetTimeout(callbackWrapper, delay);
  timers.add(id);
  return id; // notice that we have to return this id.
}

window.clearTimeout = (id) => {
  oldClearTimeout(id); // notice we have to call the 
  // previous function.
  timers.delete(id);
}

function clearAllTimeout() {
  // your code here
  for (const id of timers) {
    clearTimeout(id);
  }
}

function memo(func, resolver = (...args) => args.join('_')) {
  const cache = new Map();

  return function(...args) {
    const cacheKey = resolver(...args);
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    const value = func.apply(this, args);
    cache.set(cacheKey, value);
    return value;
  }
}

function testThis(a) {
  return `${this.val}_${a}`;
}

const memoFunc = memo(testThis)

const testSubject = {
  val: 1,
  memo: memoFunc,
}

const testSubject2 = {
  val: 2,
  memo: memoFunc,
}

// 1_1
console.log(testSubject.memo(1));
// Expected no caching and output is 2_1
console.log(testSubject2.memo(1));
// Expected to cache
console.log(testSubject2.memo(1));