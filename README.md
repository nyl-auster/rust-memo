# RUST MEMO

## INSTALLATION

install **rustup**, a command line tool for managing Rust versions and associated tools
Mac & linux :
```sh
curl https://sh.rustup.rs -sSf | sh
```

If the install is successful "rustup" will display its version and available commands.

| Command | description |
|---------|-------------|
|rustup update| update rustup|
|rustc --version | display Rust version |
| rustup doc | open local doc |

## Hello world

```rust
// filnemae: main.rs
// la fonction "main" est spéciale, c'est toujours la première exécutée dans un programme Rust
fn main() {
    println!("Hello, world!");
}
```

<blockquote>💡 println! is not a function, it is a macro **macro**.</blockquote>

Compile and execute :
```sh
rustc main.rs
./main
```

## Package manager

**Cargo** est le gestionnaire de paquet de Rust et permet aussi de compiler un projet Rust (commande "cargo build")
Cargo est installé de base avec Rust.
Créer un nouveau projet cargo nommé "hello_cargo" :
```sh
# --bin indique que l'on créer un projet exécutable (binary) par opposition à une librairie
cargo new hello_cargo --bin
```
les paquets installés par Cargo s'appelle des **crates** : caisses / cageots.

Compiler avec cargo
```sh
cargo build
# le fichier exécutable sera target/debug/hello_cargo
```
Compiler et exécuter:
```sh
cargo run
```
Vérifier des erreurs sans produire d'exécutable
```sh
cargo check
```
Compiler avec optimisation
```sh
cargo build --release
# le fichier exécutable sera target/release/hello_cargo
```

## principes de bases

https://doc.rust-lang.org/book/second-edition/ch03-01-variables-and-mutability.html#shadowing

<blockquote> 💡 Par défault, toutes les variables sont **immutables**</blockquote>

## shadowing 
on peut écraser la valeur d'une variable immutable en la redéclarant
```rust
let my_var = 5;
let my_var = 6;
```

## DATA TYPES

four primary scalar types: 
- integers
- floating-point 
- numbers
- Booleans
- characters

### Integer types

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

### Floating-point types (decimal points)

<blockquote> 💡 default type is f64 because on modern CPUs it’s roughly the same speed as f32 but is capable of more precision.</blockquote>








