/* 7.1 Creating Arrays */
var empty = [];                 // An array with no elements
var primes = [2, 3, 5, 7, 11];  // An array with 5 numeric elements
var misc = [1.1, true, "a", ];  // 3 elements of various types + trailing comma

// Values in arrays need not be constants; they may be arbitrary expressions:
var base = 1204;
var table = [base, base+1, base+3];

// Array literals can contain object literals or other array literals:
var b = [[1, {x:1, y:2}], [2, {x:3, y:4}]];

// Omitted elements are given the value: undefined
var count = [1,,3];  // An array with 3 elements, the middle one undefined.
var undefs = [,,];   // An array with 2 elements, both undefined.

// Another way to create an array with the Array() constructor
var a = new Array();

// Create an array with a specified length with the Array() constructor.
var a = new Array(10);

// Create an array with two or more array elements
var a = new Array(5, 4, 3, 2, 1, "testing, testing");

/* 7.2 Reading and writing array elements */
var a = ["world"];      // Start with a one-element array
var value = a[0];       // Read element 0
a[1] = 3.14;            // Write element 1
i = 2;
a[i] = 3;               // Write element 2
a[i + 1] = "hello";     // Write element 3
a[a[i]] = a[0];         // Read elements 0 and 2, write element 3

a.length                // => 4

a[-1.23] = true;        // This creates a property named "-1.23"
a["1000"] = 0;          // This creates the 1001st element of the array
a[1.000]                // Array index 1. Same as a[1]

a = [true, false]       // This array has elements at indexes 0 and 1
a[2]                    // => undefined. No element at this index.
a[-1]                   // => undefined. No property with this name.

/* 7.3 Sparse Arrays */
a = new Array(5);       // No elements, but a.length is 5.
a = [];                 // Create an array with no elements and length = 0.
a[1000] = 0;            // Assignment adds one element but sets length to 1001.

var a1 = [,,,];         // This array is [undefined, undefined, undefined]
var a2 = new Array(3);  // This array has no values at all
//0 in a1;              // => true: a1 has an element with index 0
//0 in a2;              // => false: a2 has no element with index 0

/* 7.4 Array Length */
[].length               // => 0: the array has no elements
//['a', 'b', 'c'].length  // => 3: highest index is 2, length is 3

a = [1,2,3,4,5];        // Start with a 5-element array
a.length = 3;           // a is now [1,2,3].
a.length = 0;           // Delete all elements. a is [].
a.length = 5;           // Length is 5, but no elements, like new Array(5)

// Not implemented in Firefox 19.02
//a = [1,2,3];                               // Start with a 3-element array.
//Object.defineProperty(a, "length",         // Make the length property
                      //{writable: false});  // readonly
//a.length = 0;                              // a is unchanged.

/* 7.5 Adding and Deleting Array Elements */
a = [];                 // Start with an empty array.
a[0] = "zero";          // And add elements to it.
a[1] = "one";

a = [];                 // Start with an empty array
a.push("zero")          // Add a value at the end. a = ["zero"]
a.push("one", "two")    // Add two more values. a = ["zero", "one", "two"]

a = [1,2,3];
delete a[1];        // a now has no element at index 1
1 in a;             // => false: no array index 1 is defined
a.length;           // => 3: delete does not affect array length

/* 7.6 Iterating Arrays */
var keys = Object.keys(o);    // Get an array of property names for object o
var values = [];              // Store matching property values in this array
for(var i = 0; i < keys.length; i++) {  // For each index in the array
  var key = keys[i];                    // Get the key at that index
  values[i] = o[key];                   // Store the value in the values array
}

// Lookup length once
for(var i = 0, len = keys.length; i < len; i++) {
  // loop body remains the same
}

// skip or exclude null, undefined and non existent elements
for(var i = 0; i < a.length; i++) {
  if (!a[i]) continue;  // Skip null, undefined, and nonexistent elements
  // loop body here
}

for(var i = 0; i < a.length; i++) {
  if (a[i] === undefined) continue; // Skip undefined + nonexistent elements
  // loop body here
}

for(var i = 0; i < a.length; i++) {
  if (!(i in a)) continue; // Skip nonexistent elements
  // loop body here
}

var sparseArray = [];
for(var index in sparseArray) {
  var value = sparseArray[index];
  // Now do something with index and value
}

for(var i in a) {
  if (!a.hasOwnProperty(i)) continue; // Skip inherited properties
  // loop body here
}

for(var i in a) {
  // Skip i if it is not a non-negative integer
  if (String(Math.floor(Math.abs(Number(i)))) !== i) continue;
}

var data = [1,2,3,4,5]      // This is the array we want to iterate
var sumOfSquares = 0;       // We want to compute the sum of the squares of data
data.forEach(function(x) {  // Pass each element of data to this function
                sumOfSquares += x*x;  // add up the squares
            });

/* 7.7 Multidimensional Arrays */
// Create a multidimensional array
var table = new Array(10);              // 10 rows of the table
for(var i = 0; i < table.length; i++)
  table[i] = new Array(10);             // Each row has 10 columns

// Initialize the array
for(var row = 0; row < table.length; row++) {
  for(col = 0; col < table[row].length; col++) {
    table[row][col] = row*col;
  }
}

// Use the multidimensional array to compute 5*7
var product = table[5][7];  // 35

/* 7.8 Array Methods */

/* 7.8.1 join() */
var a = [1,2,3];       // Create a new array with these three elements
a.join();              // => "1,2,3"
a.join(" ");           // => "1 2 3"
a.join("");            // => "123"
var b = new Array(10); // An array of length 10 with no elements
b.join('-');           // => '---------': a string of 9 hypens

/* 7.8.2 reverse() */
a.reverse().join();    // => "3,2,1" and a is now [3,2,1]

/* 7.8.3 sort() */
var a = new Array("banana", "cherry", "apple");
a.sort();
var s = a.join(", ");  // s == "apple, banana, cherry"

var a = [33, 4, 1111, 222];
a.sort();                   // Alphabetical order: 1111, 222, 33, 4
a.sort(function(a,b) {      // Numerical order: 4, 33, 222, 1111
         return a-b;        // Returns < 0, 0 , > 0, depending on the order
       });
a.sort(function(b,a) {return b-a}); // Reverse numerical order

a = ['ant', 'Bug', 'cat', 'Dog'];
a.sort();                 // case-sensitive sort: ['Bug', 'Dog', 'ant', 'cat']
a.sort(function(s,t){     // Case-insensitive sort
         var a = s.toLowerCase();
         var b = t.toLowerCase();
         if (a < b) return -1;
         if (a > b) return 1;
         return 0;
       });                // => ['ant', 'Bug', 'cat', 'Dog']

/* 7.8.4 concat() */
var a = [1,2,3];
a.concat(4,5);            // => [1,2,3,4,5]
a.concat([4,5]);          // => [1,2,3,4,5]
a.concat([4,5], [6,7]);   // => [1,2,3,4,5,6,7]
a.concat(4, [5, [6,7]])   // => [1,2,3,4,5[6,7]]

/* 7.8.5 sort() */
var a = [1,2,3,4,5];
a.slice(0,3);     // Returns [1,2,3]
a.slice(3);       // Returns [4,5]
a.slice(1, -1);   // Returns [2,3,4]
a.slice(-3,-2);   // Returns [3]

/* 7.8.6  splice() */
var a = [1,2,3,4,5,6,7,8];
a.splice(4);      // Returns [5,6,7,8]; a is [1,2,3,4]
a.splice(1,2);    // Returns [2,3]; a is [1,4]
a.splice(1,1);    // Returns [4]; a is [1]
var a = [1,2,3,4,5];
a.splice(2,0,'a', 'b'); // Returns []; a is [1,2,'a','b',3,4,5]
a.splice(2,2,[1,2],3);  // Returns ['a','b']; a is [1,2,[1,2],3,3,4,5]

/* 7.8.7 push() and pop() */
var stack = [];         // stack: []
stack.push(1,2);        // stack: [1,2]     Returns 2
stack.pop();            // stack: [1]       Returns 2
stack.push(3);          // stack: [1,3]     Returns 2
stack.pop();            // stack: [1]       Returns 3
stack.push([4,5]);      // stack: [1,[4,5]] Returns 2
stack.pop();            // stack: [1]       Returns [4,5]
stack.pop();            // stack: []

/* 7.8.8 unshift() and shift() */
var a = [];             // a:[]
a.unshift(1);           // a:[1]            Returns 1
a.unshift(22);          // a:[22,1]         Returns: 22
a.shift();              // a:[1]            Returns: 22
a.unshift(3,[4,5]);     // a:[3,[4,5],1]    Returns: 3
a.shift();              // a:[[4,5], 1]     Returns: 3
a.shift();              // a:[1]            Returns: [4,5]
a.shift();              // a:[]             returns: 1

/* 7.8.9 toString() and toLocaleString() */
([1,2,3].toString());         // Yields '1,2,3'
(["a", "b", "c"].toString()); // Yields 'a,b,c'
([1, [2,'c']].toString());    // Yields '1,2,c'

/* 7.9.1 forEach() */
var data = [1,2,3,4,5];                               // An array to sum
// Compute the sum of array elements
var sum = 0;                                          // Start at 0
data.forEach(function(value) { sum += value; });      // Add each value to sum
(sum)                                                 // => 15

// Now increment each array element
data.forEach(function(v,i,a) { a[i] = v + 1; });
(data)                                                // => [2,3,4,5,6]

function foreach(a,f,t) {
  try { a.forEach(f,t); }
  catch(e) {
    if (e === foreach.break) return;
    else throw e;
  }
}
foreach.break = new Error("StopIteration");

/* 7.9.2 map() */
a = [1,2,3];
b = a.map(function(x) { return x*x; });  // b is [1,4,9]

/* 7.9.3 filter() */
a = [5,4,3,2,1];
smallValues = a.filter(function(x) { return x < 3 });       // => [2,1]
everyOther = a.filter(function(x,i) { return i%2 == 0 });   // => [5,3,1]
var sparse = [1,,2,,3];
var dense = sparse.filter(function(x) { return true });     // => [1,2,3]

// Remove undefined, null, and close gaps
var arr = [undefined, null, , 1];
arr = arr.filter(function(x) { return x !== undefined && x != null });

/* 7.9.4 every() and some() */
a = [1,2,3,4,5];
a.every(function(x) { return x < 10; });        // => true: all values < 10
a.every(function(x) { return x % 2 === 0; });   // => false: not all values even

a.some(function(x) { return x%2===0; });     // => true a has some even numbers
a.some(isNaN)                                // => false: a has no non-numbers

/* 7.9.5 reduce(), reduceRight() */
var a = [1,2,3,4,5]
var sum = a.reduce(function(x,y) { return x+y }, 0);      // Sum of values
var product = a.reduce(function(x,y) { return x*y }, 1);  // Product of values
var max = a.reduce(function(x,y) { return (x>y)?x:y; });  // Largest value
var a = [2,3,4];
// Compute 2^(3^4). Exponentation has right-to-left precedence
var big = a.reduceRight(function(accumulator,value) {
                          return Math.pow(value, accumulator);
                        });
var objects = [{x:1}, {y:2}, {z:3}];
var merged = objects.reduce(union);     // => {x:1, y:2, z:3}
var objects = [{x:1, a:1}, {y:2,a:2}, {z:3, a:3}];
var leftUnion = objects.reduce(union);          // {x:1, y:2, z:3, a:3}
var rightUnion = objects.reduceRight(union);    // {x:1, y:2, z:3, a:1}

/* 7.9.6 indexOf() and lastIndexOf() */
a = [0,1,2,1,0];
a.indexOf(1);           // => 1: a[1] is 1
a.lastIndexOf(1);       // => 3: a[3] is 1
a.indexOf(3);           // => -1: no element has value 3

// Find all occurrences of a value x in an array a and return an array of
// matching indexes
function findall(a, x) {
  var results = [],               // The array of indexes we'll return
      len = a.length,             // The length of the array to be searched
      pos = 0;                    // The position to search from

  while(pos < len) {              // While more elements to search...
    pos = a.indexOf(x, pos);      // Search
    if (pos === -1) break;        // If nothing found, we're done
    results.push(pos);            // Otherwise, store index in array
    pos = pos + 1;                // And start next search at next element
  }
  return results;
}

/* 7.10 Array type */

