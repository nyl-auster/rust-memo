# MEMO RUST

## INSTALLATION

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
// la fonction "main" est spéciale, c'est toujours la première exécutée dans un programme Rust
fn main() {
    println!("Hello, world!");
}
```

NOTE : println! n'est pas une fonction mais une **macro**.

Compiler et exécuter pour afficher "Hello world"
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
# le fichier exécutable se trouvera dans target/debug/hello_cargo
```


