# Le gestionnaire de paquet : Cargo

## Cargo

**Cargo** est le system de build et le gestionnaire de paquet de Rust. Il est installé par défaut avec Rust.

Voici comment créer un projet avec cargo, dont le nom serait : "hello_cargo" :

```sh
cargo new hello_cargo --bin
```

> 💡l'argument --bin permet de créer une application éxecutable au lieu d'un librairie.

En Rust, les paquets sont nommés **crates** : caisses / cageots.

| command               | description                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| cargo build           | compiler. le binaire sera crée dans "target/debug/hello_cargo"                                         |
| cargo run             | compile and exécute                                                                                    |
| cargo check           | vérifie les erreurs mais ne produit pas un exécutable (plus rapide que "cargo run" donc)               |
| cargo build --release | compiler avec optimisations. L'éxécutable sera crée dans "target/release" à la pkace de "target/debug" |
| cargo update          | mettre à jour les _crates_ - seulement le dernier numéro number de leur versionning sémantique         |

## Installation d'un crate

Exemple avec l'installation du crate _rand_ (génération de nombres au hasard) : Il faut ajouter la dépendance au fichier _Cargo.toml_

```toml
[dependencies]
rand = "0.3.14"
```

puis taper la commande suivant à la racine du projet :

```sh
cargo build
```

Pour pouvoir appeler les méthodes de "Rng", doit ajouter le _trait_ à notre scope :

```rust
extern crate rand;
// put Rng trait in the scope to use its methods like "gen_range"
use rand::Rng;
```

> 💡 Pour savoir comment importer les méthodes et fonction d'un crate, il faut ouvir la documentation et cliquer sur le paquet concerné dans la barre de gauche.

```sh
cargo doc --open
```
