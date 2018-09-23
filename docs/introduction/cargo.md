# Le gestionnaire de paquet : Cargo

## Cargo

**Cargo** est le system de build et le gestionnaire de paquet de Rust. Il est installé par défaut avec Rust et très simple à utiliser.

Voici comment créer un projet avec cargo, dont le nom serait : "hello_cargo" :

```sh
cargo new hello_cargo --bin
```

:::tip Note
💡l'argument `--bin` permet de créer une application éxecutable. L'argument `--lib` servirait à créer une librairie.
:::

En Rust, les paquets sont nommés **crates**, ( caisses / cageots ). Voici quelque unes des commandes utile de *cargo*:

| commande               | description                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| cargo build           | compiler. le binaire sera crée dans "target/debug/hello_cargo"                                         |
| cargo run             | compile and exécute                                                                                    |
| cargo check           | vérifie les erreurs mais ne produit pas un exécutable (plus rapide que "cargo run" donc)               |
| cargo build --release | compiler avec optimisations. L'éxécutable sera crée dans "target/release" à la pkace de "target/debug" |
| cargo update          | mettre à jour les _crates_ - seulement le dernier numéro number de leur versionning sémantique         |

## Installation d'un crate

Rust permet de très facile installer des paquets externes et de fixer la version désirée. Exemple avec l'installation du crate _rand_ (génération de nombres au hasard). Il faut d'abord ajouter la dépendance au fichier _Cargo.toml_

```toml
[dependencies]
rand = "0.3.14"
```

... puis taper la commande suivante à la racine du projet :

```sh
cargo build
```

On peut maintenant appeler les méthodes de du crate `rand`, en ajoutant par exemple le *trait* `Rng` à notre scope :

```rust
extern crate rand;
use rand::Rng;
```

:::tip Note
 💡 Pour savoir comment importer les méthodes et fonction d'un *crate*, il faut ouvir la documentation et cliquer sur le paquet concerné dans la barre de gauche.

```sh
cargo doc --open
```

:::
