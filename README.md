# RUST MEMO

This is a summary of Rust book second edition. I'm a very beginner, you can PR if you spotted any mistake / misunderstanding.

Resources :
- Rust book : https://doc.rust-lang.org/book/second-edition/index.html

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

> ⚠️ println! is **not** a function, it is a **macro**; that's why there is a "!" at the end.

Compile and execute :
```sh
rustc main.rs
./main
```

### debug variables with println! placeholders

```rust
let array = [1, 2, 3];

println!("this is my variable : {:?}", array);
// displays: "this is my variable : [1, 2, 3]"

println!("this is my variable : {:#?}", array);
// displays with formatting :
// this is my variable : [
//    1,
//    2,
//    3
// ]
```

### Package manager

#### Cargo

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
|cargo update| update crates - only last number of the semantic versionning|

#### Install a crate

example to add "rand" crate to your project. Add rand to your dependencies in your Cargo.toml file.
```toml
[dependencies]
rand = "0.3.14"
```
now run :
```sh
cargo build
```

Example on how tu use "Rng" methods :
```rust
extern crate rand;
// put Rng trait in the scope to use its methods like "gen_range"
use rand::Rng;
```

> 💡 You won’t just know which traits to use and which methods and functions to call from a crate. Instructions for using a crate are in each crate’s documentation. run **cargo doc --open and click rand** in the sidebar on the left.

## Common programming concepts

### variables and mutability

#### immutability

> 💡 Rust code uses snake case as the conventional style for function and variable names.

> ⚠️ by default variables are **immutable**. So this code will throw en error :

```rust
fn main() {
    let x = 5;
    x = 6;
}
```

Use **mut** keyword, if you need to mutate your variable
```rust
fn main() {
    let mut x = 5;
    x = 6;
}
```

#### examples

```rust
// declare an immutable variable with default typing ( default is "i32" : signed 32 bits number)
let a = 42

// declare an immutable variable ( signed 64 bits number )
let x: i64 = 42;

// declare a MUTABLE variable
let mut y: i64 = 27;

// Strings are a more complex subject. Here is a quick example that will be explained in depth later.

// This string (called "slice") has a fixed size, and cannot be mutated. (&str type)
let greeting = "Hello there.";

// This is how to declare a mutable, growable, UTF-8 encoded bit of text (String type)
let mut s = String::from("Hello");
s.push_str(", world.");
println!("{}", s); // display "Hello, world."
```

This is possible to "shadow" a variable by re-using "let" keyword: 

```rust
let my_var = 5;
let my_var = 6;
```

### DATA TYPES

four primary scalar types: 
- integers
- floating-point numbers
- Booleans
- characters

> 💡The types covered in this section all stored on the stack and popped off the stack when their scope is over.  

#### Integer types

example :
```rust
let x = 142; // i32 type by default
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

> 💡 integer types default to i32 because this type is generally the fastest

https://doc.rust-lang.org/book/second-edition/ch03-02-data-types.html

#### Floating-point types (decimal points)

example :
```rust
let x = 2.0; // f64 by default
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

Compound types can group multiple values into one type. Rust has two primitive compound types: **tuples** and **arrays**.

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
> ⚠️ **arrays in Rust have a fixed length**: once declared, they cannot grow or shrink in size. Only **vectors** are allowed to grow or shrink in size.

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

> 💡Rust doesn’t care where you define your functions, only that they’re defined somewhere.

#### examples

You **must** declare return value type with an arrow. If you don't do it, Rust assumes that the value returned by the function is of the type "()", which is an **empty tuple**.

```rust
fn get_x() -> i32 {
    76
}
```

> ⚠️ Please note that we DID NOT put a semi-column, so that 76 is evaluated as an **expression** and its value returned implicity.

This is strictly equivalent to :

 ```rust
 fn get_x() -> i32 {
    return 76;
}
 ```

Example with parameters. In function signatures, you **must** declare the type of each parameter:
```rust
fn multiply(x: i32, y: i32) -> i32 {
    x * y
}
```

Without returning any explicit value (so it will return an empty tuple "()" by default)
```rust
fn my_function(x: i32, y: i32) {
    println!("The value of x is: {}", x);
}
```

#### Beginners gotchas

🚨 this will throw an error:
```rust
fn multiply(x: i32, y: i32) -> i32 {
    x * y;
}
```

There is a semi-column : **expression** is turned into a **statement**, and a statement **do not return a value**. So an empty tuple is returned; which is not matching the declared return type ( i32 ). 

To fix this error, simply remove the semi-column:

```rust
fn multiply(x: i32, y: i32) -> i32 {
    x * y
}
```

#### difference between ARGUMENTS and PARAMETERS

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

#### Difference between statements and expressions

> ⚠️ Rust is an expression-based language, this is an important distinction to understand

Function bodies are made up of a series of **statements** *optionally* ending in an **expression**
- Statements do **not return** values
- Expressions **evaluate** to something

Examples of statements :
```rust
// creating a variable and assigning a value to it. This does NOT return a value.
let y = 5;
```
> 💡 *let y = 5* is a **statement** but "5" is an **expression** that evaluates to "5". 

Examples of expressions:
```rust
// Numbers by themselves are expressions.
5

// mathematics operations
5 + 6 

// calling a function
say_hello()

// calling a macro
println! 

// block ( evaluates to 4 )
let y = {
    let x = 3;
    x + 1 
};
``` 

### Control flow

#### If expressions

> 💡Note that **patterns** are also a very powerful way to handle conditions : https://doc.rust-lang.org/book/second-edition/ch18-03-pattern-syntax.html


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

>  💡 Because **if** is an expression, it returns a value : so we can use it on the right side of a **let** statement:

```rust
fn main() {
    let condition = true;
    let result = if condition { 5 } else { 6 };
    println!("{}", result); // display "5"
}

```


> 🚨 Below code will throw en error : each **arm** of the **if** must be the same type.

```rust
fn main() {
    let condition = true;
    let number = if condition { 5 } else { "six" };
    println!("The value of number is: {}", number);
}
```

#### loops

##### loop

The **loop** keyword creates an infinite loop. We need **break** keyword to exit a infinite loop.

```rust
fn main() {
    let max = 5;
    let mut i = 0;
    loop {
        i = i + 1;
        if i > max {
            break;
        }
        println!("loop {}", i);
    }
}
```

##### while

```rust
fn main() {
    let max = 5;
    let mut i = 0;
    while i < max {
        i = i + 1;
        println!("loop {}", i);
    }
}
```

##### for

> 💡The safety and conciseness of for loops make them the most commonly used loop construct in Rust. 

Iterate on an array:

```rust
fn main() {
    let loops = [1, 2, 3, 4, 5];
    for element in loops.iter() {
        println!("loop {}", element);
    }
}
```
Using **Range**

```rust
fn main() {
    for element in 1..6 {
        println!("loop {}", element);
    }
}
```

## Ownership

> Ownership is **all about the heap**, so this chapter **requires** some basic knowledges about what are the **stack** and the **heap**. See [Annexe: the stack and the heap](annex-stack-and-heap.md)

Rust’s central and most unique feature is **ownership**. It enables Rust to make memory safety guarantees without needing a garbage collector and without the need for the programmer to explicitly allocate and free the memory from the heap.

**Managing heap data is why Rust ownership exists** : keeping track of what parts of code are using what data on the heap, minimizing the amount of duplicate data on the heap, and cleaning up unused data on the heap so you don’t run out of space are all problems that ownership addresses.

> 🙂 Because ownership is a new concept for many programmers, it does take some time to get used to.

### Ownership Rules

- Each **value** in Rust has a **variable** that’s called its **owner**.
- There can only be **one** owner at a time.
- When the owner goes **out of scope**, the value will be **dropped**.

### Rust drop the value when "owner" goes out of scope

```rust
{                      // s (the "owner") is not valid here, it’s not yet declared
    let s = "hello";   // s is valid from this point forward
    // do stuff with s
}                      // this scope is now over, and "s" is no longer valid : the value will be dropped.
```

### understanding "move" error

This code displays "5", as expected
```rust
fn main() {
    let x = 5;
    let y = x;
    println!("{}", y);
}
```

Because integers are simple values with a known, fixed size, they are pushed onto the stack. The stack looks like now :
```
let y = 5
let x = 5
```

🚨but this code will throw an error : s1 can **not** be used anymore after s2 declaration.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
    println!("{}", s1)
}
```
This will display this error : "use of moved value s1"

```sh
error[E0382]: use of moved value: `s1`
  --> src/main.rs:14:20
   |
13 |     let s2 = s1;
   |         -- value moved here
14 |     println!("{}", s1)
   |                    ^^ value used here after move
```

Why ? *String* is a growable text. So its value is located on the **heap**. The stack only store its size and its pointer to the value location. When we copy *s1* to *s2*, only the **stack** data is copied, not the value located on the heap. 

<img width="400px" src="https://doc.rust-lang.org/book/second-edition/img/trpl04-02.svg" />

Only ONE variable can be the **owner** of the value, so that Rust can be sure to free the memory only **one** time; to avoid a *a double free error*. So this is what it does :

<img width="400px" src="https://doc.rust-lang.org/book/second-edition/img/trpl04-04.svg" />

### clone

It is possible to copy value from the **stack** AND the **heap** using "clone"

```rust
let s1 = String::from("hello");
let s2 = s1.clone();
```
