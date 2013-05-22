/* Chapter 8 Functions
 * 8.1 Defining Functions */
// Print the name and value of each property of o. Return undefined.
function printProps(o) {
  for(var p in o) {
    console.log(p + ": " + o[p] + "\n");
  }
}

// Compute the distance between Cartesian points (x1, y1) and (x2, y2).
function distance(x1, y1, x2, y2) {
  var dx = x2-x1;
  var dy = y2-y1;
  return Math.sqrt(dx*dx + dy*dy);
}

// A recursive function (one that calls itself) that computes factorals
// Recall that x! is the product of x and all positive integers less than it.
function factorial(x) {
  if (x <= 1) return 1;
  return x * factorial(x-1);
}

// This function expression defines a function that squares its argument.
// Note that we assign it to a variable
var square = function(x) { return x*x; }

// Function expressions can inclue names, which is useful for recursion.
var f = function fact(x) { if (x <= 1) return 1; else return x*fact(x-1); };

// Function expressions can also be used as arguments to other functions:
data.sort(function(a,b) { return a-b; });

// Function expressions are sometimes defined and immediately invoked:
var tenSquared = (function(x) {return x*x;}(10));

/* 8.1.1 Nested Functions */
function hypotenuse(a, b) {
  function square(x) { return x*x; }
  return Math.sqrt(square(a) + square(b));
}

/* 8.2 Invoking Functions
 * 8.2.1 Functions Invocation
 */
printProps({x:1});
var total = distance(0,0,2,1) + distance(2,1,3,5);
var probability = factorial(5)/factorial(13);
// Define and invoke a function to determine if we're in strict mode
var strict = (function() { return !this; }());

/* 8.2.2 Method Invocation */
o.m = f;

o.m(1);

var calculator = { // An object literal
  operand1: 1,
  operand2: 1,
  add: function() {
    // Note the use of the this keyword to refer to this object
    this.result = this.operand1 + this.operand2;
  }
};
calculator.add();         // A method invocation to compute 1+1.
calculator.result         // => 2

o["m"](2);

var o = {                             // An object object.
  m: function() {                     // Method m of the object.
    var self = this;                  // Save the this value in a variable
    console.log(this === o);          // Prints "true": this is the object o.
    f();                              // Now call the helper function f().

    function f() {                    // A nested function f
      console.log(this === o);        // "false": this is global or undefined
      console.log(self === o);        // "true": self is the outer this value
    }
  }
};
o.m();

/* 8.2.3 Constructor Invocation */
var o = new Object();
var o = new Object;

/* 8.2.4 Indirect Invocation */

/* 8.3 Function Arguments and Parameters
 * 8.3.1 Optional Parameters
 */
// Append the names of the enumerable properties of object o to the
// array a, and return a. If a is omitted, create and return a new array.
function getPropertyNames(o, /* optional */ a) {
  if (a === undefined) a = [];   // If undefined, use a new array
  for(var property in o) a.push(property);
    return a;
}

// This function can be invoked with 1 or 2 arguments:
var a = getPropertyNames(o);      // Get o's properties into a new array
getPropertyNames(p,a);          // append p's properties to that array

/* 8.3.2 Variable-Length Argument Lists: The Arguments Object */
function checkParams(x, y, z)
{
  // First, verify that the rigth number of arguments was passed
  if (arguments.length != 3) {
    throw new Error("function f called with " + arguments.length +
                    " arguments, but it expects 3 arguments.");
  }
  // Now do the actual function
}

function max(/*.....*/) {
  var max = Number.NEGATIVE_INFINITY;
  // Loop through the arguments, looking for, and remembering, the biggest.
  for(var i = 0; i < arguments.length; i++)
    if (arguments[i] > max) max = arguments[i];
  // Return the biggest
  return max;
}

var largest = max(1, 10, 100, 2, 3, 1000, 4, 5, 10000, 6); // => 10000

function arg(x) {
  console.log(x);       // Displays the initial value of the argument
  arguments[0] = null;  // Changing the array element also changes x
  console.log(x);       // Now displays "null"
}

/* 8.3.2.1 The callee and caller properties */
var calleeFact = function(x) {
  if (x <= 1) return 1;
  return x * arguments.callee(x-1);
}

/* 8.3.3 Using Object Properties As Arguments */
// Copy length elements of the array from to the array to.
// Begin copying with element from_start in the from array.
// and copy that element to to_start in the to array.
// It is hard to remember the order of the arguments.
function arrayCopy(/* array */ from, /* index */ fromStart,
                   /* array */ to,   /* index */ toStart,
                   /* integer */ length)
{
  // code goes here
}

// This version is a little less efficient, but you don't have to
// remember the order of the arguments, and fromStart and toStart
// default to 0.
function easyCopy(args) {
  arrayCopy(args.from,
           args.fromStart || 0,   // Note default value provided
           args.to,
           args.toStart || 0,
           args.length);
}

// Here is how you might invoke easyCopy():
var a = [1,2,3,4], b = [];
easyCopy({from: a, to: b, length: 4});

/* 8.3.4 Argument Types */
function max(/* number..... */) { /* code here */ };

// Return the sum of the elements of array (or array-like object) a.
// The elements of a must all be numbers or null and undefined are ignored.
function sum(a) {
  if (isArrayLike(a)) {
    var total = 0;
    for(var i = 0; i < a.length; i++) {     // Loop through all elements
      var element = a[i];
      if (element == null) continue;        // Skip null and undefined
      if (isFinite(element)) total += element;
      else throw new Error("sum(): elements must be finite numbers");
    }
    return total;
  }
  else throw new Error("sum(): argument must be array-like");
}

function flexiSum(a) {
  var total = 0;
  for(var i = 0; i < arguments.length; i++) {
    var element = arguments[i], n;
    if (element == null) continue;        // Ignore null and undefined arguments
    if (isArray(element))                     // If the argument is an array
      n = flexiSum.apply(this, element);      // compute its sum recursively
    else if (typeof element === "function")   // Else if its a function
      n = Number(element())                   // invoke it and convert.
    else n = Number(element);                 // Else try to convert it

    if (isNaN(n))   // If we couldn't convert to a number, throw an error
      throw Error("flexiSum(): can't convert " + element + " to number");
    total += n;     // Otherwise, add n to the total
  }
  return total;
}

/* 8.4 Functions As Values */
function square(x) { return x*x };

var s = square;   // Now s refers to the same function that square does
square(4);        // => 16
s(4);             // => 16

var o = { square: function(x) { return x*x; } };  // An object literal
var y = o.square(16);                             // y = 256


var a = [function(x) { return x*x; }, 20];        // An array literal
a[0](a[1]);                                       // => 400

// We define some simple functons here
function add(x,y) { return x + y; }
function subtract(x,y) { return x - y; }
function multiply(x,y) { return x * y; }
function divide(x,y) { return x / y; }

// Here's a function that takes one of the above functions
// as an argument and invokes it on two operands
function operate(operator, operand1, operand2) {
  return operator(operand1, operand2);
}

// We could invoke this function like this to compute the value (2+3) + (4*5):
var i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5));  // i = 25

// For the sake of the example, we implement the simple functions again,
// this time using function literals within an object literal;
var operators = {
  add:        function(x,y) { return x+y; },
  subtract:   function(x,y) { return x-y; },
  multiply:   function(x,y) { return x*y; },
  divide:     function(x,y) { return x/y; },
  pow:        Math.pow    // Works for predefined functions too
};

// This function takes the name of an operator, looks up that operator
// in the object, and then invokes it on the supplied operands. Note
// the syntax used to invoke the operator function.
function operate2(operation, operand1, operand2) {
  if (typeof operators[operation] === "function")
    return operators[operation](operand1, operand2);
  else throw "unknown operator";
}

// Compute the value ("hello" + " " + "world") like this:
var j = operate2("add", "hello", operate2("add", " ", "world"));
// Using the predefined Math.pow() function:
var k = operate2("pow", 10, 2);

/* 8.4.1 Defining Your Own Function Properties */
// Initialize the counter property of the function object.
// Function declarations are hoisted so we really can
// do this assignment before the function declaration.
uniqueInteger.counter = 0;

// This function returns a different integer each time it is called.
// It uses a property of itself to remember the next value to be returned.
function uniqueInteger() {
  return uniqueInteger.counter++;   // Increment and return counter property
}

// Compute factorials and cache results as properties of the function itself.
function fastFactorial(n) {
  if (isFinite(n) && n>0 && n==Math.round(n)) { // Finite, positive ints only
    if (!(n in factorial))                      // If no cached result
      fastFactorial[n] = n * factorial(n-1);        // Compute and cache it
    return fastFactorial[n];                        // Return the cached result
  }
  else return NaN;                              // If input was bad
}
fastFactorial[1] = 1;   // Initialize the cache to hold this base case.

/* 8.5 Functions As Namespaces */
function myModule() {
  // Module code goes here.
  // Any variables used by the module are local to this function
  // instead of cluttering up the global namespace.
}
myModule();   // But don't forget to invoke the function!

(function() { // myModule function rewritten as an unnamed expression
  // Module code goes here.
}());         // end the function literal and invoke it now.

// Define an extend function that copies the propeties of its second and
// subsequent arguments onto its first argument.
// We work around an IE bug here: in many versions of IE, the for/in loop
// won't enumerate an enumerable property of o if the prototype of o has
// a nonenumerable property by the same name. This means that properties
// like toString are not handled correctly unless we explicitly check for them.
var extend = (function() {  // Assign the return value of this function
  // First check for the presence of the bug before patching it.
  for(var p in {toString:null}) {
    // If we get here, then the for/in loop works correctly and we return
    // a simple version of the extend() function
    return function extend(o) {
      for(var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for(var prop in source) o[prop] = source[prop];
      }
    return o;
    };
  }
  // If we get here, it means that the for/in loop did not enumerate
  // the toString property of the test object. So return a version
  // of the extend() function that explicitly tests for the nonenumerable
  // properties of Object.prototype.
  return function patchedExtend(o) {
    for(var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      // Copy all the enumerable properties
      for(var prop in source) o[prop] = source[prop];

      for(var j = 0; j < protoProps.length; j++) {
        prop = protoProps[j];
        if (source.hasOwnProperty(prop)) o[prop] = source[prop];
      }
    }
    return o;
  };

  // This is the list of special-case properties we check for
  var protoProps = ["toString", "valueOf", "constructor", "hasOwnProperty",
                    "isPrototypeOf", "propertyIsEnumerable", "toLocaleString"];
}());

/* 8.6 Closures */
var scope = "global scope";           // A global variable
function checkScope() {
  var scope = "local scope";          // A local variable
  function f() { return scope; }      // Return the value in scope here
  return f();
}
checkScope();                         // => "local scope"

var scope = "global scope";           // A global variable
function checkScope2() {
  var scope = "local scope";          // A local variable
  function f() { return scope; }      // Return the value in scope here
  return f;
}
checkScope2()()                       // What does this return?

var uniqueInteger = (function() {       // Define and invoke
                       var counter = 0; // Private state of function below
                       return function() { return counter++; };
                     }());

function counter() {
  var n = 0;
  return {
    count: function() { return n++; },
    reset: function() { n = 0; }
  };
}

var c = counter(), d = counter();     // Create two counters
c.count();                            // => 0
d.count();                            // => 0
c.reset();                            // reset() and count() methods share state
c.count();                            // => 0: because we reset c
d.count();                            // => 1: d was not reset

function counter2(n) { // Function argument n is the private variable
  return {
    // Property getter method returns and increments private counter var.
    get count() { return n++ },
    // Property setter doesn't allow the value of n to decrease
    set count(m) {
      if (m >= n) n = m;
      else throw Error("count can only be set to a larger value");
    }
  };
}

var c = counter2(1000);
c.count             // => 1000
c.count             // => 1001
c.count = 2000
c.count             // => 2000
c.count             // => Error!

// This function adds property accessor methods for a property with
// the specified name to the object o. The methods are named get<name>
// and set<name>. If a predicate function is supplied, the setter
// method uses it to test its argument for validity before storing it.
// If the predicate returns false, the setter method throws an exception.
//
// The unusual thing about this function is that the property value
// that is manipulated by the getter and setter methods is not stored in
// the object o. Instead, the value is stored only in a local variable
// in this function. The getter and setter methods are also defined
// locally to this function and therefore have access to this local variable.
// This means that the value is private to the two accessor methods, and it
// cannot be set or modified except through the setter method.
function addPrivateProperty(o, name, predicate) {
  var value;  // This is the property value

  // The getter method simply returns the value.
  o["get" + name] = function() { return value; };

  // The setter method stores the value or throws an exception if
  // the predicate rejects the value.
  o["set" + name] = function(v) {
    if (predicate && !predicate(v))
      throw Error("set" + name + ": invalid value " + v);
    else
      value = v;
  };
}

// The following code demonstrates the addPrivateProperty() method.
var o = {};     // Here is an empty object

// Add property accessor methods getName and setName()
// Ensure that only string values are allowed
addPrivateProperty(o, "Name", function(x) { return typeof x == "string"; });

o.setName("Frank");         // Set the property value
o.getName();                // Get the property value
try {
  o.setName(0);               // Try to set a value of the wrong type
}
catch(err) { console.log(err.message); }

// This function returns a function that always returns v
function constFunc(v) { return function() { return v; }; }

// Create an array of constant functions
var funcs = [];
for(var i = 0; i < 10; i++) funcs[i] = constFunc(i);

// The function at array element 5 returns the value 5.
funcs[5]()      // => 5

// Return an array of functions that return the values 0-9
function constFuncs() {
  var funcs = [];
  for(var i = 0; i < 10; i++)
    funcs[i] = function() { return i; };
  return funcs;
}

var funcs = constFuncs()
funcs[5]()      // What does this return?

/* 8.7 Function Properties, Methods, and Constructor
 * 8.7.1 The length Property
 */
