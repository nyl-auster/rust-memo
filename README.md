# MEMO RUST

## Installation

Installer **rustup**, qui permet de gérer les différentes versions de Rust.
Mac et linux :

```sh
curl https://sh.rustup.rs -sSf | sh
```
Taper "rustup" doit afficher la version et les commandes disponibles.

Mettre à jour rustup :
```sh
rustup update
```

Connaître la version de Rust installée
```sh
rustc --version
```
ouvrir la documentation local: 
```sh
rustup doc
```

## Hello world

```rust
// filnemae: main.rs
fn main() {
    println!("Hello, world!");
}
```

Compiler et exécuter pour afficher "Hello world"
```sh
rustc main.rs
./main
```
