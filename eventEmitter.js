// const emitter = new EventEmitter()
// const callback1 = jasmine.createSpy('callback1');
// const sub1 = emitter.subscribe('event1', callback1)
// const sub2 = emitter.subscribe('event1', callback1)
// emitter.emit('event1', 1, 2, 3)
// expect(callback1.calls.count()).toBe(2)
// sub2.release()
// callback1.calls.reset()
// emitter.emit('event1', 4,5,6)
// expect(callback1.calls.count()).toBe(1)

// const emitter = new EventEmitter()
// const callback1 = jasmine.createSpy('callback1');
// emitter.subscribe('event1', callback1)
// emitter.emit('event1')
// expect(callback1).toHaveBeenCalled();


// const emitter = new EventEmitter()
// const callback1 = jasmine.createSpy('callback1');
// const sub1 = emitter.subscribe('event1', callback1)
// emitter.emit('event1', 1, 2, 3)
// expect(callback1).toHaveBeenCalledWith(1,2,3)
// sub1.release()
// callback1.calls.reset()
// emitter.emit('event1', 4,5,6)
// expect(callback1.calls.count()).toBe(0)


// event emitter
// class EventEmitter {
//     eventsSub = new Map();
//     subscribe(eventName, callback) {
//         if (!this.eventsSub.has(eventName)) {
//         this.eventsSub.set(eventName, new Set())
//         }
//         const subscriptions = this.eventsSub.get(eventName)
//         const callbackObj = { callback } // you can add the same callback to the same events several times.
//         subscriptions.add(callbackObj)
    
//         return {
//         release: () => {
//             subscriptions.delete(callbackObj)
//             if (subscriptions.size === 0) {
//             delete this.eventsSub.eventName
//             }
//         }
//         }
//     }
    
//     emit(eventName, ...args) {
//         const subscriptions = this.eventsSub.get(eventName)
//         if (subscriptions) {
//         subscriptions.forEach(cbObj => {
//             cbObj.callback.apply(this, args)
//         })
//         }
//     }
// }



// use map<eventname, map<id, callback>>
//
class EventEmitter {
    // to create a new class, we have to use this.
    map = new Map();
  
    //Map<eventName, Map<id, callbackfunction>>
    subscribe(eventName, callback) {
      let id = Symbol();
      let callbackMap = this.map.get(eventName);
      // undefined.
      if (!callbackMap) {
        callbackMap = new Map();
      }
    // but we need a name for thee callback Map to used in the closure.
    // if (!this.map.has(eventName)) {
    //     map.set(eventName, new Map());
    //   }
    // map.get(eventName).set(id, callback);
      callbackMap.set(id, callback);
      this.map.set(eventName, callbackMap);
  
      return {
        release: function() {
        callbackMap.delete(id);
        if (!callbackMap) {
            this.map.delete(eventName);
        }
        }
      }
    }
    
    emit(eventName, ...args) {
        if (!this.map.has(eventName)) {
            // throw new Error("not valid event name");
            throw `event name: ${eventName} does not exist`;
        }
      const callbackMap = this.map.get(eventName);
      
      // even if the callbackMap is empty; it's still not undefined.
      if (callbackMap) { // we need this!! what if we just call the emit when we don't have the callback map.
        for(const callback of callbackMap.values()) {
            // callback.apply(this, args);
            try{
                callback(...args);
            } catch(e) {
                this.emit('error', eventName)
                // console.log(e);
            }
          }
      }
    
    }
  }

// try{
    const emitter = new EventEmitter();
    const testCallback = (a, b, c) => {
        console.log('I am the callback1 function:P');
        console.log( a + b + c);
    }
    const errorCallback = () => {
        const map = new Map();
        return map.get(key).name;
        // throw new error("callback error");
    }
    
    // test cases:
    const callback1 = testCallback;
    const sub1 = emitter.subscribe('event1', callback1);
    const error = emitter.subscribe('error',(eventname)=> {
        console.log("an error in the callback: " + eventname);
    });
    const sub2 = emitter.subscribe('event1', errorCallback);
   
    emitter.emit('event1', 1, 2, 3); // 6 and an error
    const sub3 = emitter.subscribe('event2', callback1);
    emitter.emit('event2', 1, 2, 3);
    // const sub3 = emitter.subscribe('event1', callback1);
    // // expect(callback1).toHaveBeenCalledWith(1,2,3)
    // sub1.release(); // no callback function for event 1;
    // emitter.emit('event1', 4,5,6);//15 only once;
    sub2.release();
    emitter.emit('event1', 4,5,6);// nothing.
    // emitter.emit("event", 1,2,3);
// } catch(e) {
    // console.log(e);
// }


// corner cases:
// when we delete all the callback, then the event is not subscribed any more.

// about the error handling. we can use try ... catch;
//
// handle the error:
//   try {
//       new emitter();
//   } catch (e){
//       console.log(e);
//   }

// what if the callback function throw some error.
// we can run the test case to see what would happen
// if there is an error throws from the callback function
// the program still runs, but we get an error in the middle, 
// so we can use try...catch to catch the error and handle it.

// maybe we can subscribe another error function.