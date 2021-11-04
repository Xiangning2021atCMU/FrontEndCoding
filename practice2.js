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

console.log(flat(arr, 3));
// in a iterative way:
const flatIterative = (arr, d = 1) => {
    

}