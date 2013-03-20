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