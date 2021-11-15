
/**
 * @param {HTMLElement} rootA
 * @param {HTMLElement} rootB - rootA and rootB are clone of each other
 * @param {HTMLElement} nodeA
 */

 // we can have two stacks,
 // for each stack, we just store the child nodes of each level of the dom tree.
const findCorrespondingNode1 = (rootA, rootB, target) => {
    // your code here
    if (rootA == target) {
      return rootB;
    }
    const queueA = [rootA];
    const queueB = [rootB]; // we can just put it inside the queue;
    // there is no need to record that we are a new level of the travesal or not.
    // as long as the queue is not empty, we do the comparison.
    while(queueA.length) {
        const left = queueA.shift();
        const right = queueB.shift();
        if(left == target) return right;
        queueA.push(...left.children); // notice we can write the code in such a way.
        queueB.push(...right.children);
    }
    return null;
}

// iterative way:
// bfs: traverse all the node for the worst case, then time complexity would be O(n); n is the number of the node;
// if using a stack, that would be a dfs, since we always push the children first.

// recursive way:

const findCorrespondingNode2 = (rootA, rootB, target) => { 
    if (rootA == target) return rootB;
    for (let i = 0; i < rootA.children.length; i++) {
        const result = findCorrespondingNode(rootA.children[i], rootB.children[i], target);
        if (result) return result;
    }
    return null;
}

// this dfs, O(N) the worst case, we have to traverse all the child nodes.

// the test case?

// the corner cases, can you think of any corner cases?

// what if we use some api to help us to do this job?
// treewalker api;
const findCorrespondingNode3 = (rootA, rootB, target) => { 
    const rootAWalker = document.createTreeWalker(rootA, NodeFilter.SHOW_ELEMENT);
    const rootBWalker = document.createTreeWalker(rootB, NodeFilter.SHOW_ELEMENT);
    
    const currentNodes = [rootAWalker.currentNode, rootBWalker.currentNode];
    if (currentNodes[0] == target) {
        return currentNodes[1];
    } else {
        // document order.
        currentNodes = [rootAWalker.nextNode(), rootBWalker.nextNode()];
    }
}

// use dom api:

const findCorrespondingNode4 = (rootA, rootB, target) => {
    // if 'target' is itself rootA then directly return rootA, this will make 'path' array empty, and it will return rootB in reduceRight
    if (rootA === target)
    return rootB;
    
    // we can track 'target' in rootB using indexes stored during tracing 'target' in rootA
    let path = getRootAPath(rootA, target);
    
    // reduceRight is same as reduce but it iterate values from right to left
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight
    return path.reduceRight((accumulator, currentValue, index) => {
        return accumulator.children[currentValue];
    }, rootB) // rootB pointing to initialValue from where start the processing, this will be the accumulator when we start
}

// get path from target to rootA in the form of index arr, index pointing to position of a node in its parent HTML collection
function getRootAPath(rootA, target) {
    let path = [];
    
    let node = target;
    
    while (node !== rootA && node.parentNode) { // we will iterate till we reach top of the DOM tree
        const children = Array.from(node.parentNode.children); // convert HTMLCollection into Array
        path.push(children.indexOf(node)); // push index where 'node' found
        node = node.parentNode; // this will make sure we move from down to top
    }
    return path;
}

const acc =[];
console.log(acc.length);
if (acc) {
console.log("haha");
}