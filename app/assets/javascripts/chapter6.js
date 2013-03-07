/* 6.1 Objects */
// inherit() returns a newly created object that inherits properties from the
// prototype object p. It uses the ECMAScript 5 function Object.create() if
// it is defined, and otherwise falls back to an older technique.
function inherit(p) {
  if (p == null) throw TypeError(); // p must be a non-null object
  if (Object.create)                // If Object.create() is defined...
    return Object.create(p);        //    then just use it.
  var t = typeof p;                 // Otherwise do some more type checking
  if (t !== "object" && t !== "function") throw TypeError();
  function f() {};                  // Define a dummy constructor function.
  f.prototype = p;                  // Set its prototype property to p.
  return new f();                   // Use f() to create an "heir" of p.
}

/* 6.2 Querying and Setting properties */
var o = {}            // o inherits object methods from Object.prototype
o.x = 1;              // and has an own property x.
var p = inherit(o);   // p inherits properties from o and Object.prototype
p.y = 2;              // and has an own property y.
var q = inherit(p);   // q inherits properties from p, o, and Object. prototype
q.z = 3;              // and has an own property z.
var s = q.toString(); // toString is inherited from Object.prototype
q.x + q.y             // => 3: x and y are inherited from o and p

var unitcircle = { r:1 };     // An object to inherit from
var c = inherit(unitcircle);  // c inherits the property r
c.x = 1; c.y = 1;             // c defines two properties of its own
c.r = 2;                      // c overrides its inherited property
unitcircle.r;                 // => 1: the prototype object is not affected

book.subtitle; // => undefined: property doesn't exist

// A verbose and explicit technique
var len = undefined;
if (book) {
    if (book.subtitle) len = book.subtitle.length;
}

// A concise and idiomatic alternative to get subtitle length or undefined
var len = book && book.subtitle && book.subtitle.length;

// The prototype propertiess of built-in constructors are read-only

/* 6.5 Enumerating Properties */
var o = {x:1, y:2, z:3};            // Three enumerable own properties
o.propertyIsEnumerable("toString")  // => false: not enumerable

for(p in o) {
  if (!o.hasOwnProperty(p)) continue;       // Skip inherited properties
}

for(p in 0) {
  if (typeof o[p] === "function") continue; // Skip methods
}

/*
 * Copy the enumerable properties of p to o, and return o.
 * If o and p have a property by the same name, o's property is overwritten.
 * This function does not handle getters and setters or copy attributes.
 */
function extend(o, p) {
  for(prop in p) {                            // For all props in p.
    o[prop] = p[prop];                        // Add the property to o.
  }
  return o;
}

/*
 * Copy the enumerable properties of p to o, and return o.
 * If o and p have a property by the same name, o's property is left alone.
 * This function does not handle getters and setters or copy attributes.
 */
function merge(o, p) {
  for(prop in p) {                          // For all props in p.
    if (o.hasOwnProperty[prop]) continue;   // Except those already in o.
      o[prop] = p[prop];                    // Add the property to o.
  }
  return o;
}

/*
 * Remove properties from o if there is not a property with the same name in p.
 * Return o.
 */
function restrict(o, p) {
  for(prop in o) {                          // For all props in o
    if (!(prop in p)) delete o[prop];       // Delete if not in p
  }
  return o;
}

/*
 * For each property of p, delete the property with the same name from o.
 * Return o.
 */
function subtract(o, p) {
  for(prop in p) {                          // For all props in p
    delete o[prop];                         // Delete from o (deleting a
                                            // nonexistant prop is harmless)
  }
  return o;
}

/* 
 * Return a new object that holds the properties of both o and p.
 * If o and p have properties by the same name, the values from o are used.
 */
function union(o,p) { return extend(extend({}, o), p); }

/*
 * Return a new object that hold only properties of o that also appear
 * in p. This is something like the intersection of o and p, but the values of
 * the properties in p are discarded.
 */
function intersection(o,p) { return restrict(extend({}, o), p); }

/*
 * Return an array that holds the names of the enumerable own properties of o.
 */
function keys(o) {
  if (typeof o !== "object") throw TypeError();   // Object argument required
  var result = [];                  // the array we will return
  for(var prop in o) {              // For all enumerable properties
    if (o.hasOwnProperty[prop])     // If it is an own property
      result.push(prop);            // add it to the array.
  }
  return result;                    // Return the array.
}
/* 6.6 Property Getters and Setters */
var o = {
  // An ordinary data property
  data_prop: undefined,

  // An accessor property defined as a pair of functions
  get accessor_prop() { /* function body here */ },
  set accessor_prop(value) { /* function body here */ }
};

var p = {
  // x and y are regular read-write properties.
  x: 1.0,
  y: 1.0,

  // r is a read-write accessor property with getter and setter.
  // Don't forget to put a comma after accessor methods.
  get r() { return Math.sqrt(this.x*this.x + this.y*this.y); },
  set r(newvalue) {
    var oldvalue = Math.sqrt(this.x*this.x + this.y*this.y);
    var ratio = newvalue/oldvalue;
    this.x *= ratio;
    this.y *= ratio;
  },

  // theta is a read-only accessor property with getter only.
  get theta() { return Math.atan2(this.y, this.x); }
}

var q = inherit(p);   // Create a new objec that inherits getters and setters
q.x = 0; q.y = 0;     // Create q's own data properties

// This object generates strictly increasing serial numbers
var serialnum = {
  // This data property holds the next serial number.
  // The $ in the property name hints that it is a private property.
  $n: 0,

  // Return the current value and increment it
  get next() { return this.$n++; },

  // Set a new value of n, but only if it is larger than current
  set next(n) {
    if (n >= this.$n) this.$n = n;
    else throw "serial number can only be set to a larger value";
  }
};

// This object has accessor properties that return random numbers.
// The expression "random.octet", for example, yields a random number
// between 0 and 255 each time it is evaluated.
var random = {
  get octet() { return Math.floor(Math.random()*256); },
  get uint16() { return Math.floor(Math.random()*65536); },
  get int16() { return Math.floor(Math.random()*65536)-32768; }
}
