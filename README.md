# RUST MEMO

## INSTALLATION

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

## Hello world

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

## Package manager

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

by default variables are **immutable**. This code will throw en error :
```rust
fn main() {
    let x = 5;
    x = 6;
}
```
Still, this is possible to "shadow" a variable by re-using "let" keyword: 

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

##### numeric operations

```rust
fn main() {
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
}
```

#### Boolean type

```rust
    let x = true;
    let y: bool = false; // with explicit type annotation
```







