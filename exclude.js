// items are M Elements.
// let items = [
//     {color: 'silver', type: 'tv', age: 18}, 
//     {color: 'silver', type: 'phone', age: 20},
//     {color: 'blue', type: 'book', age: 17}
//   ] 
  
// // an exclude array made of key value pair // N elements.
//   const excludes = [ 
//     {k: 'color', v: 'silver'}, 
//     {k: 'type', v: 'tv'},
//     {k: 'type', v: 'phone'},
//     {k: 'color', v: 'red'},
//     {k: 'age', v: 18}
//   ];

// let items = [
//     {color: 'red', type: 'tv', age: 18}, 
//     {color: 'silver', type: 'phone', age: 20},
//     {color: 'blue', type: 'book', age: 17}
//  ]
 
//  const excludes = [ 
//   {k: 'color', v: 'silver'}, 
//   {k: 'type', v: 'tv'}, 
//  ] 

// [{color:"blue",type:"book",age:17}]
const items = [
      { type: 'phone', color: 'gold', name: 'iphone' },
      { type: 'phone', color: 'blue', name: 'iphone' },
      { type: 'tv', color: 'blue', name: 'samsung' }];
const excludes = [{ k: 'color', v: 'gold' }, { k: 'type', v: 'tv' }]
    // Print filtered data
// [{color:"blue",type:"book",age:17}]
  
  // O(N):
  const map = new Map();
  excludes.forEach(exclude => {
        if (!map.has(exclude.k)) {
            map.set(exclude.k, new Set());
        }
        map.get(exclude.k).add(exclude.v);
  });

  function excludeItems(items) {
    // we give the includes stuff; is one of the given standard is satisfied, we just exclude it.
    // return items.filter(item => {
    //     return !Object.keys(item).some(key => 
    //         map.has(key) && map.get(key).has(item[key])
    //     )
    // })

    // the exclude stuff: if one of the given standard is satisfied, we return it.
    return items.filter(item => {
        return Object.keys(item).some(key => map.has(key) && map.get(key).has(item[key]));
    })
  }



// O(kM) + O(N);
  console.log(excludeItems(items));