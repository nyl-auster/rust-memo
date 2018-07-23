# RUST MEMO

## Getting started

### installation

install **rustup**, a command line tool for managing Rust versions and associated tools. On Mac & linux :

```sh
curl https://sh.rustup.rs -sSf | sh
```

If the install is successfull, *rustup* command will display its version and available commands.

| Command | description |
|---------|-------------|
|rustup update| update rustup|
|rustc --version | display Rust version |
| rustup doc | open local doc |

### Hello world

```rust
// filname: main.rs
fn main() {
    println!("Hello, world!");
}
```
> 💡The main function is special: it is always the first code that runs in every executable Rust program

> ⚠️ println! is not a function, it is a macro; that's why there is a "!" at the end.

Compile and execute :
```sh
rustc main.rs
./main
```

### Package manager

**Cargo** is Rust’s build system and package manager. Cargo comes installed with Rust.
Create a new project named "hello_cargo" :
```sh
cargo new hello_cargo --bin
```

> 💡The --bin argument passed to cargo new makes an executable application (often just called a binary) as opposed to a library

In Rust, packages of code are referred to as **crates** : ( caisses / cageots in french)

| command | description |
|---------|-------------|
|cargo build|compile. binary will be in target/debug/hello_cargo|
|cargo run|compile and execute|
|cargo check| check for errors but doesn’t produce an executable|
|cargo build --release| compile with optimizations.create an executable in target/release instead of target/debug|


## Common programming concepts

### variables and mutability

> ⚠️ by default variables are **immutable**. This code will throw en error :

```rust
fn main() {
    let x = 5;
    x = 6;
}
```

Declare a variable, example :
```rust
// immutable variable ( unsigned 64 bits number )
let x: u64 = 42;
// immutable variable with default typing ( default is signed 32 bits number)
let a = 42
// mutable variable with explicit typing
let mut y: i64 = 27;
```

This is possible to "shadow" a variable by re-using "let" keyword: 

```rust
let my_var = 5;
let my_var = 6;
```

> 💡 Rust code uses snake case as the conventional style for function and variable names.

### DATA TYPES

four primary scalar types: 
- integers
- floating-point numbers
- Booleans
- characters

#### Integer types

example :
```rust
let x = 142; // i32
let y: u8 = 142;
```

|length  | signed | unsigned |
|--------|--------|----------|
|8-bits  | i8     | u8       |
|16-bits | i16    | u16      |
|32-bits | i32    | u32      |
|64-bits | i64    | u64      |
|arch    | isize  | usize    |

> 💡 the isize and usize types depend on the kind of computer your program is running on: 64 bits if you’re on a 64-bit architecture and 32 bits if you’re on a 32-bit architecture.

> 💡 integer types default to i32: this type is generally the fastest

https://doc.rust-lang.org/book/second-edition/ch03-02-data-types.html

#### Floating-point types (decimal points)

example :
```rust
let x = 2.0; // f64
let y: f32 = 142.567890;
```

|length  | primitive |
|--------|--------|
|32-bits | f32    |
|64-bits | f64    |

> 💡 default type is f64 because on modern CPUs it’s roughly the same speed as f32 but is capable of more precision.

#### Boolean type

```rust
let x = true;
let y: bool = false; // with explicit type annotation
```

#### Character type

```rust
let c = 'z';
let z = 'ℤ';
let heart_eyed_cat = '😻';
```

> ⚠️ Note that the char type is specified with single quotes, as opposed to strings, which use double quotes

#### Compound Types

Compound types can group multiple values into one type. Rust has two primitive compound types: tuples and arrays.

##### The Tuple Type

Variety of types into one compound type.
```rust
// create a tuple
let tup: (i32, f64, u8) = (500, 6.4, 1);
// read values:
let (x, y, z) = tup;
println!("The value of y is: {}", y); // display 6.4
println!("{}", tup.1); // display also 6.4
```
##### The Array Type

Unlike a tuple, every element of an array must have the same type.

```rust
let a = [1, 2, 3, 4, 5];
// access first and second value
let first = a[0];
let second = a[1];
```
> ⚠️ arrays in Rust have a fixed length: once declared, they cannot grow or shrink in size. Only **vector** are allowed to grow or shrink in size.

#### Numeric operations

```rust
// addition
let sum = 5 + 10;

// subtraction
let difference = 95.5 - 4.3;

// multiplication
let product = 4 * 30;

// division
let quotient = 56.7 / 32.2;

// remainder
let remainder = 43 % 5;
```
### Functions 

#### examples

You **must** declare return value type with an arrow. If you don't do it, Rust assumes that the value returned by the function MUST be of the type "()", an empty tuple.

```rust
fn get_x() -> i32 {
    76
}
```

> ⚠️ We DID NOT put a semi-column, so that 76 is evaluated as an expression and its value returned implicity.

This is equivalent to :

 ```rust
 fn get_x() -> i32 {
    return 76;
}
 ```

with parameters.  In function signatures, you **must** declare the type of each parameter:
```rust
fn multiply(x: i32, y: i32) -> i32 {
    x * y
}
```

without returning a value (so it return "()" by default, which is the default return type for functions)

```rust
fn my_function(x: i32, y: i32) {
    println!("The value of x is: {}", x);
}
```

#### Beginners gotchas

```rust
fn multiply(x: i32, y: i32) -> i32 {
    x * y;
}
```

🚨 this will throw an error because there is a semi-column : expression is turned into a **statement** and do not return the value. **The default value for functions is expressed by (), the empty tuple.** Therefore, nothing is returned, which is not compatible with the return type which is i32. 

To fix this error, simply remove the semi-column:

```rust
fn multiply(x: i32, y: i32) -> i32 {
    x * y
}
```

#### difference between ARGUMENTS and PARAMETERS

> 💡Rust doesn’t care where you define your functions, only that they’re defined somewhere.

>  ⚠️ **Parameters** are the special variables used in the function signature, **arguments** are the concrete values we pass to the function when we call it.

```rust
// x is a PARAMETER
fn hello_world(x: i32) {
    println!("Hello world");
}
fn main() {
  // 67 is an ARGUMENT
  hello_world(67)
}
```

#### DIFFERENCE BETWEEN STATEMENTS AND EXPRESSIONS

> ⚠️ Rust is an expression-based language, this is an important distinction to understand

Function bodies are made up of a series of **statements** *optionally* ending in an **expression**
- Statements do **not return** values
- Expressions **evaluate** to something (it doest not necessarly return a value, like a function call that can print a message for exemple)

examples of statements :
```rust
// creating a variable and assigning a value to it
let y = 5;
```
> 💡 *let y = 5* is a **statement** but "5" is an **expression** that evaluates to "5"

examples of expressions:
```rust
5 + 6 // evaluates to 11
// calling a function
say_hello()
// calling a macro
println! 
// blocks : evaluates to 4
let y = {
    let x = 3;
    x + 1 
};
```

> ⚠️ Please note again that last expression of a *block* **do not end with a ";"** so that it can return a value. 

> 🚨Expressions do not include ending semicolons. If you add a semicolon to the end of an expression, you turn it into a **statement**, which will then not return a value. 

### Control flow

#### If expressions

```rust
fn main() {
    let number = 3;
    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }
}
```

> ⚠️ the condition must be a bool. If the condition isn’t a bool, we’ll get an error. Rust will **NOT** automatically try to convert non-Boolean types to a Boolean

multiples conditions :
```rust
fn main() {
    let number = 6;

    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }
}
```
