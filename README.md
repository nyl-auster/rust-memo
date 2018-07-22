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
<blockquote>💡  The main function is special: it is always the first code that runs in every executable Rust program</blockquote>
<blockquote>💡 println! is not a function, it is a macro **macro**.</blockquote>

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

<blockquote>💡The --bin argument passed to cargo new makes an executable application (often just called a binary) as opposed to a library</blockquote>
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
- floating-point 
- numbers
- Booleans
- characters

#### Integer types

|length  | signed | unsigned |
|--------|--------|----------|
|8-bits  | i8     | u8       |
|16-bits | i16    | u16      |
|32-bits | i32    | u32      |
|64-bits | i64    | u64      |
|arch    | isize  | usize    |

<blockquote>💡 isize et usize sont en fonction de l'architecture : 64 bits if you’re on a 64-bit architecture and 32 bits if you’re on a 32-bit architecture.</blockquote>

<blockquote>💡 integer types default to i32: this type is generally the fastest</blockquote>

https://doc.rust-lang.org/book/second-edition/ch03-02-data-types.html

#### Floating-point types (decimal points)

<blockquote> 💡 default type is f64 because on modern CPUs it’s roughly the same speed as f32 but is capable of more precision.</blockquote>








