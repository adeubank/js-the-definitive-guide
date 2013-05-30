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
// This function uses arguments.callee, so it won't work in strict mode
function check(args) {
  var actual = args.length;            // The actual number of arguments
  var expected = args.callee.length;   // The expected number of arguments
  if (actual !== expected)             // Throw an exception if they differ
    throw Error("Expected " + expected + " args; got " + actual);
}

function testCheck(x, y, z) {
  check(arguments);     // Check that the actual # of args matches expected #.
  return x + y + z;
}

/* 8.7.3 The call() and apply() Methods */
var biggest = Math.max.apply(Math, /* array of numbers */ [1,2]);

// Replace the method named m of the object o with a version that logs
// messages before and after invoking the original method.
function trace(o, m) {
  var original = o[m];    // Remember the original method in the closure
  o[m] = function() {     // Now define the new method
    console.log(new Date(), "Entering:", m);     // Log message.
    var result = original.apply(this, arguments); // Invoke original.
    console.log(new Date(), "Exiting:", m);      // Log message
    return result;                                // Return result
  };
}

/* 8.7.4 The bind() Method */
function testBind(y) { return this.x + y; }   // This function needs to be bound
var o = { x : 1 };                            // An object we'll bind to
var g = testBind.bind(o);                     // Calling g(x) invokes o.f(x)
g(2);                                         // => 3

// Return a function that invokes f as a method of o, passing all its arguments
function bind(f, o) {
  if (f.bind) return f.bind(o);         // Use the bind method, if there is one
  else return function() {
    return f.apply(o, arguments);
  };
}

var sum = function(x, y) { return x + y; }      // Return the sum of 2 args
// Create a new function like sum, but with the this value bound to null
// and the 1st argument bound to 1. This new function expects just one arg.
var succ = sum.bind(null, 1);
succ(2);         // => 3: x is bound to 1, and we pass 2 for the y argument

function curry(y,z) { return this.x + y + z; };   // Another function that adds
var g = curry.bind({x:1}, 2);                     // Bind this and y
g(3);       // => 6: this.x is bound to 1, y is bound to 2, and z is 3

// Example 8-5. A Function.bind() method for ECMAScript 3
if (!Function.prototype.bind) {
  Function.prototype.bind = function(o /*, args */) {
    // Save the this and arguments values into variables so we can
    // use them in the nested function below.
    var self = this, boundArgs = arguments;

    // The return value of the bind() method is a function
    return function() {
      // Build up an argument list, starting with any args passed
      // to bind after the first one, and follow those with all args
      // passed to this function.
      var args = [], i;
      for(i = 1; i < boundArgs.length; i++) args.push(boundArgs[i]);
      for(i = 0; i < arguments.length; i++) args.push(arguments[i]);

      // Now invoke self as a method of o, with those arguments
      return self.apply(o, args);
    };
  };
}

/* 8.7.6 The Function() Constructor */
var justInTimeCompilation = new Function("x", "y", "return x*y;");

var scope = "global";
function constructFunction() {
  var scope = "local";
  return new Function("return scope");  // Does not capture the local scope!
}
// This line returns "global" because the function returned by the
// Function() constructor does not use the local scope
constructFunction()();      // => "global"

// Example 6-4
function isFunction(x) {
  return Object.prototype.toString.call(x) === "[object Function]";
}

/* 8.8 Functional Programming
 * 8.8.1 Processing Arrays with Functions
 */

// Nonfunctional
var data = [1,1,3,5,5];

// The mean is the sum of the elements divided by the number of elements
var total = 0;
for(var i = 0; i < data.length; i++) total += data[i];
var mean = total/data.length;           // The mean of our data is 3

// To compute the standard deviation, we first sum the squares of
// the deviation of each element from the mean
total = 0;
for(var i = 0; i < data.length; i++) {
  var deviation = data[i] - mean;
  total += deviation * deviation;
}
var stdDev = Math.sqrt(total / (data.length-1));  // The standard devaition is 2

// Functional way
// First, define two simple functions
var sum = function(x,y) { return x+y; };
var square = function(x) { return x*x; };

// Then use those functions with Array methods to compute mean and stdDev
var data = [1,1,3,5,5];
var mean = data.reduce(sum)/data.length;
var deviations = data.map(function(x) { return x-mean; });
var stdDev = Math.sqrt(deviations.map(square).reduce(sum)/(data.length-1));

// Call the function f for each element of array and return
// an array of results. Use Array.prototype.map if it is defined.
var map = Array.prototype.map
  ? function(a, f) { return a.map(f); }   // Use map method if it exists
  : function (a,f) {
    var results = [];
    for (var i = 0, len = a.length; i < len; i++) {
      if (i in a) results[i] = f.call(null, a[i], i, a);
    }
    return results;
  };

// Reduce the array a to a single value using the function f and
// optional initial value. Use Array.prototype.reduce if it is defined.
var reduce = Array.prototype.reduce
  ? function(a, f, initial) {   // If the reduce() method exists.
    if (arguments.length > 2)
      return a.reduce(f, initial);      // If an initial value was passed.
    else return a.reduce(f);            // Otherwise, no initial value.
  }
  : function(a, f, initial) {   // This algorithm from the ES5 specification
    var i = 0, len = a.length; accumulator;

    // Start with the specified intial value, or the first value in a
    if (arguments.length > 2) accumulator = initial;
    else { // Find the first defined index in the array
      if (len ==0) throw TypeError();
      while (i < len) {
        if (i in a) {
          accumulator = a[i++];
          break;
        }
        else i++;
      }
      if (i == len) throw TypeError();
    }

    // Now call f for each remaining element in the array
    while (i < len) {
      if (i in a)
        accumulator = f.call(undefined, accumulator, a[i], i, a);
      i++;
    }

    return accumulator;
};

// Above map and reduce
var data = [1,1,3,5,5];
var sum = function(x, y) { return x+y; };
var square = function(x) { return x*x; };
var mean = reduce(data, sum)/data.length;
var deviations = map(data, function(x) { return x - mean; });
var stdDev = Math.sqrt(reduce(map(deviations, square), sum)/(data.length-1));

// This higher-order fucntion returns a new function that passes its
// arguments to f and returns the logical negation of f's return value;
function not(f) {
  return function() {                       // Return a new function
    var result = f.apply(this, arguments);  // that calls f
    return !result;                         // and negates its result
  };
}

var even = function(x) { // A function to determine if a number is even
  return x % 2 == 0;
};

var odd = not(even);    // A new function that does the opposite of even
[1,1,3,5,5].every(odd); // => true: every element of the array is odd

// Return a function that expects an array argument and applies f to
// each element, returning the array of return values.
// Contrast this with the map() function from earlier.
function mapper(f) {
  return function(a) { return map(a, f); };
}

var increment = function(x) { return x + 1; };
var incrementer = mapper(increment);

incrementer([1,2,3]); // => [2,3,4]

// Return a new function that computes f(g(...)).
// The returned function h passes all of its arguments to g, and then passes
// the return value of g to f, and then returns the return value of f.
// Both f and g are invoked with the same this value as h was invoked with.
function compose(f,g) {
  return function() {
    // We use call for f because we're passing a single value and
    // apply for g because we're passing an array of values.
    return f.call(this, g.apply(this, arguments));
  };
}

var square = function(x) { return x*x; };
var sum = function(x,y) { return x+y; }
var squareOfSum = compose(square, sum);
squareOfSum(2,3);                                 // => 25

/* 8.8.3 Partial Application of Functions */

// A utility function to convert an array-like object (or suffix of it)
// to a true array. Used below to convert arguments objects to real arrays.
function array(a, n) { return Array.prototype.slice.call(a, n || 0); }

// The arguments to this function are passed on the left
function partialLeft(f /*, ...*/) {
  var args = arguments;   // Save the outer arguments array
  return function() {     // And return this function
    var a = array(args, 1);             // Start with the outer args from 1 on.
    a = a.concat(array(arguments));     // Then add all the inner arguments.
    return f.apply(this, a);            // Then invoke f on that argument list.
  };
}

function partialRight(f /*, ...*/) {
  var args = arguments;   // Save the outer arguments array
  return function() {     // And return this function
    var a = array(arguments);     // Start with the inner arguments
    a = a.concat(array(args,1));  // Then add the outer args from 1 on.
    return f.apply(this, a);
  };
}

// The arguments to this function serve as a template. Undefined values
// in the argument list are filled in with values from the inner set.
function partial(f /*, ...*/) {
  var args = arguments;   // Save the outer arguments array
  return function() {
    var a = array(args, 1);       // Start with an array of outer args
    var i=0, j=0;
    // Loop through those args, filling in undefined values from inner
    for(; i < a.length; i++)
      if (a[i] === undefined) a[i] = arguments[j++];
    // Now append any remaining inner arguments
    a = a.concat(array(arguments, j));
    return f.apply(this, a);
  };
}

// Here is a function with three arguments
var f = function(x,y,z) { return x * (y - z); };
// Notice how these three partial applications differ
partialLeft(f, 2)(3,4);         // => -2: Bind first argument: 2 * (3 -4)
partialRight(f, 2)(3,4);        // =>  6: Bind last argument: 3 * (4 - 2)
partial(f, undefined, 2)(3,4);   // => -6: Bind middle argument: 3 * (2 - 4)

var increment = partialLeft(sum, 1);
var cuberoot = partialRight(Math.pow, 1/3);
String.prototype.first = partial(String.prototype.charAt, 0);
String.prototype.last = partial(String.prototype.substr, -1, 1);

var data = [1,1,3,5,5];             // Our data
var sum = function(x,y) { return x+y; };      // Two elementary functions
var product = function(x,y) { return x*y; };  
var neg = partial(product, -1);               // Define some others
var square = partial(Math.pow, undefined, 2);
var sqrt = partial(Math.pow, undefined, .5);
var reciprocal = partial(Math.pow, undefined, -1);

// Now compute the mean and standard deviation. This is all function
// invocations with no opreators, and it starts to look like Lisp code!
var mean = product(reduce(data,sum), reciprocal(data.length));
var stdDev = sqrt(product(reduce(map(data,
                                     compose(square,
                                             partial(sum, neg(mean)))),
                                 sum),
                          reciprocal(sum(data.length, -1))));

/* 8.8.4 Memoization */

// Return a memoized version of f.
// It only works if arguments to f all have distinct string representations.
function memoize(f) {
  var cache = {};   // Value cache stored in the closure.

  return function() {
    // Create a string version of the arguments to use as a cache key.
    var key = arguments.length + Array.prototype.join.call(arguments,",");
    if (key in cache) return cache[key];
    else return cache[key] = f.apply(this, arguments);
  };
}

// Return the Greatest Common Divisor of two integers, using the Euclidean
// algorithm: http://en.wikipedia.org/wiki/Euclidean_algorithm
function gcd(a,b) {   // Type checking for a and b has been omitted
  var t;                              // Temporary variable for swapping values
  if (a < b) t=b, b=a, a=t;           // Ensure that a >= b
  while(b != 0) t=b, b= a%b, a=t;     // This is Euclid's algorithm for GCD
  return a;
}

var gcdMemo = memoize(gcd);
gcdMemo(85, 187);     // => 17

// Note that when we write a recursive function that we will be memoizing,
// we typically want to recurse to the memoized version, not the original.
var factorial = memoize(function(n) {
                          return (n <= 1) ? 1 : n * factorial(n-1);
                        });
factorial(5);     // => 120. Also caches values for 4, 3, 2 and 1.
