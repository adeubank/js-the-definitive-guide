/* 3.1 Math */
Math.pow(2, 53)           // 2 to the power 53
Math.round(.6)            // round to the nearest integer
Math.ceil(.6)             // round up to an integer
Math.floor(.6)            // round down to an integer
Math.abs(-5)              // absolute value
Math.max(1,2,3)           // Return the largest argument
Math.min(1,2,3)           // Return the smallest argument
Math.random()             // Psuedo-random number of x where 0 <= x < 1.0
Math.PI                   // π: circumference of a circle / diameter
Math.E                    // e: The base of the natural logarithm
Math.sqrt(3)              // The square root of 3
Math.pow(3, 1/3)          // The cube root of 3
Math.sin(0)               // Trigonometry: also Math.cos, Math.atan, etc.
Math.log(10)              // Natural logarithm of 10
Math.log(100)/Math.LN10   // Base 10 logarithm of 100
Math.log(512)/Math.LN2    // Base 2 logarithm of 512
Math.exp(3)               // Math.E cubed

/* 3.1 Numbers */
Infinity                  // A read/write variable intialized to Infinity
Number.POSITIVE_INFINITY  // Same value, read-only
1/0                       // This is also the same value.
Number.MAX_VALUE          // This also evaluates to Infinity

Number.NEGATIVE_INFINITY  // These expressions are negative infinity.
-Infinity
-1/0
-Number.MAX_VALUE - 1

NaN                       // A read/write variable initialized to NaN.
Number.NaN                // A read-only property holding the same value.
0/0                       // Evaluates to NaN.

Number.MIN_VALUE/2        // Underflow: evaluates to 0
-Number.MIN_VALUE/2       // Negative zero
-1/Infinity               // Also negative 0
-0

var zero = 0;             // Regular zero
var negz = -0;            // Negative zero
zero === negz             // => true: zero and negative zero are equal
1/zero === 1/negz         // => false: infinity and -infinity are not equal

var x = .3 - .2;          // 30 cents minus 20 cents
var y = .2 - .1;          // 20 cents minus 10 cents
x == y                    // => false: the two values are not the same!
x == .1                   // => false: .3-.2 is not equal to .1
y == .1                   // => true: .2-.1 is equal to .1

/* 3.1 Date */
var then = new Date(2010, 0, 1);  // The 1st day of the 1st month of 2010
var later = new Date(2010, 0, 1,  // Same day, at 5:10:30pm, local time
                     17, 10, 30);

var now = new Date();             // The current date and time
var elapsed = now - then;         // Date substraction: interval in milliseconds

later.getFullYear()               // => 2010
later.getMonth()                  // => 0: zero-based months
later.getDate()                   // => 1: one-based days
later.getDay()                    // => 5: day of week, 0 is Sunday 5 is Friday
later.getHours()                  // => 17: 5pm, local time
later.getUTCHours()               // hours in UTC time; depends on timezone
later.toString()                  // => "Fri Jan 01 2010 17:10:30 GMT-0800 (PST)"
later.toUTCString()               // => "Sat, 02 Jan 2010 01:10:30 GMT"
later.toLocaleDateString()        // => "01/01/2010"
later.toLocaleTimeString()        // => "05:10:30 PM"
later.toISOString()               // => "2010-01-02T01:10:30.000Z" ES5 only

/* 3.2 Text */
var p = "π"; // π is 1 character with 16-bit codepoint 0x03c0
var e = "e"; // e is 1 character with 17-bit codepoint 0x1d452
p.length     // => 1: p consists of 1 16-bit element
e.length     // => 2: UTF-16 encoding of e is 2 16-bit values: "\ud835\udc52"

""  // The empty string: it has zero characters
'testing'
"3.14"
'name="myform"'
"Wouldn't you prefer O'Reilly's book?"
"This string\nhas two lines"
"π is the ratio of a circle's circumference to its diameter"

