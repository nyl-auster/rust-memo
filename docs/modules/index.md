# Organiser son code en modules

<Avertissement />

Rust nous permet d'organiser très facilement notre code et ses fichiers grâce à son puissant système de  *modules*. Les modules nous permettent :

- d'organiser notre code en fichiers et dossiers
- de créer des espaces de nom
- de choisir si une portion de code est publique ou privée.

## Exemple

Voici un exemple basique de la création d'un module *database* :

**`📝 src/main.rs`**

```rust
mod database {
  pub fn connect() {
    println!("Connexion à la base")
  }
}

fn main() {
  database::connect()
}

```

C'était facile 🙀 . Deux choses importantes à remarquer ici :

- Par défaut, toutes les fonctions et types d'un module sont **privées**: elles ne sont utilisables qu'à l'intérieur de leur module de déclaration. Le mot clef `pub` (*public*) permet d'appeler le code depuis l'extérieur du module.
- Pour accéder aux méthodes et types d'un module, il faut préciser le nom du module avant : `database::connect` ( et pas simplement `connect`).

## Mettre notre module dans un fichier dédié

On peut mettre le code de notre module *database* dans un fichier dédié, pour obtenir l'organisation de fichiers suivante :

```rust
📂 src
  📝 database.rs
  📝 main.rs
```

Déplaçons le code de notre module *database* dans le fichier `src/database.rs` mais **SANS** utiliser le mot-clef `mod` cette fois.

**`📝 src/database.rs`**

```rust
pub fn connect() {
  println!("Connexion à la base")
}
```

Il faut maintenant déclarer notre module et **inclure** son code dans le programme.

**`📝 src/main.rs`**

```rust{1}
mod database;

fn main() {
  database::connect()
}

```

écrire `mod database;` est donc équivalent à :

```rust
mod database {
  // contenu du fichier src/database.rs
}
```

## Différence entre `mod` et `extern crate`

`mod` permet d'inclure dans notre programme un module interne à notre projet; tandis que `extern crate` permet d'inclure dans notre programme des modules d'une librairie (*crate*) *externe* :

```rust
extern crate postgres;
```

## Mettre notre module dans un dossier dédié

On peut mettre notre module dans un dossier dédié, ce qui permet de séparer si besoin son code en plusieurs fichiers. Par exemple :

```rust{6}
📂 src
  📂 database
    📝 fichier_a.rs
    📝 fichier_b.rs
    📝 fichier_c.rs
    📝 mod.rs //ce fichier est obligatoire
  📝 main.rs
```

Déplaçons le code de notre module *database* dans un fichier `src/database/mod.rs` et supprimons l'ancier fichier `src/database.rs`

**`📝 src/database/mod.rs`**

```rust
pub fn connect() {
  println!("Connexion à la base")
}
```

Notre code précédent dans `main.rs` fonctionne toujours !

```rust
mod database;

fn main() {
  database::connect()
}
```

:::tip NOTA BENE
Le nom de fichier **mod.rs** est **obligatoire** : quand nous écrivons `mod database;` dans le fichier `main.rs`, Rust cherche automatiquement un fichier  `src/database.rs` puis `src/database/mod.rs`.
:::

Ajoutons dans notre module *database* un script de création de tables pour installer la base de données de notre programme. Voici l'arborescence voulue :

```rust{3}
📂 src
  📂 database
    📝 install.rs //  script de création des tables
    📝 mod.rs
  📝 main.rs
```

**`📝 src/database/install.rs`**

```rust
pub fn create_tables() {
  println!("Script de création des tables dans la base de données")
}
```

Il faut maintenant inclure le code de `install.rs` dans notre module database :

**`📝 src/database/mod.rs`**

```rust{2}
// ⚠️ attention, il FAUT déclarer notre module comme public
pub mod install;

pub fn connect() {
  println!("Connexion à la base")
}
```

On vient en réalité de créer un **nouveau module** nommé *install*, qui est un **sous-module** de *database*.

**`📝 src/main.rs`**

```rust{6}
mod database;

fn main() {
  database::connect();
  database::install::create_tables();
}
```

Et voilà 🎉 ! Armé de ce simple mot clef `mod`, nous pouvons déjà organiser facilement un code complexe, et créer autant de dossiers et de sous-dossiers que nécessaire.

## Bien comprendre le chemins des modules

La déclaration de nos modules forment **une arborescence** de modules, avec une racine. Un peu comme un système de fichier.

On peut réprésenter ainsi l'arborescence des modules que nous avons crée au cours de ce chapitre.

```rust
📦 root
  📦 database
    📦 install
  📦 user
```

:::warning NOTA BENE

L'arborescence des modules n'est PAS l'arborescence de leurs dossiers et fichiers! On peut très bien créer une arborescence complexe de modules dans un seul fichier :

```rust
// fichier src/main.rs

fn main () {
  nourriture::fruits::pommes::reinettes::nom()
}

pub mod nourriture {
  pub mod fruits{
    pub mod pommes{
      pub mod reinettes {
        pub fn nom() {
          println!("Pommes reinettes");
        }
      }
    }
  }
}
```

Nous avons ci-dessus un seul fichier `main.rs` mais l'arborescence de modules suivante :

```rust
📦 root
  📦 nourriture
    📦 fruits
      📦 pommes
        📦 reinettes
          {} nom
```

:::

Pour accéder à la fonction `nom` du module reinettes ci-dessus, on doit indiquer son **chemin** dans l'arborescence de modules. soit `nourriture::fruits::pommes::reinettes::nom()`

**Il s'agit d'un chemin RELATIF**, c'est à dire qu'il s'ajoute au chemin du module dans lequel on se trouve actuellement. Dans `main.rs`, on se trouve dans le module implicite **root** qui a pour chemin `::`.

Le chemin **absolu** et réel de `nourriture::fruits::pommes::reinettes::nom()` est donc `::nourriture::fruits::pommes::reinettes::nom()`.

Pourquoi les chemins relatifs existent ? Si on se trouve dans une fonction du module *pommes*, les chemins relatifs nous permettent d'appeler la fonction `nom()` en écrivant juste `reinettes::nom()` au lieu du chemin absolu  `::nourriture::fruits::pommes::reinettes::nom()`.

### Exemple d'erreur de chemin

Créons un module user, qui appelera une fonction de notre module *database*.

**`📝 src/user.rs`**:

```rust
pub fn get() {
  database::connect();
  println!("getting user");
}
```

**`📝 main.rs`**:

```rust
mod user;
mod database;

fn main () {
  user::get();
}
```

Nous avons une erreur en compilant 😱 : le fichier `user.rs` ne parvient pas à résoudre le chemin `database::connect`. C'est une sorte de *404 module not found*:

```rust
error[E0433]: failed to resolve. Use of undeclared type or module `database`
 --> src/user.rs:2:3
  |
2 |   database::connect();
  |   ^^^^^^^^ Use of undeclared type or module `database`
```

C'est parce que nous indiquons ici un chemin de module **relatif** : Rust cherche donc d'abord un module database **dans** notre module user. En écrivant `database::connect()`, nous avons en réalité demandé `::user::database::connect`, ce qui ne correspond à rien dans notre arborescence de modules:

```rust
📦 root
  📦 database
    📦 install
    {} connect
  📦 user
```

Pour régler cela, nous devons utiliser un chemin absolu. 

**`📝 src/user.rs`**:

```rust{2}
pub fn get() {
  ::database::connect();
  println!("getting user");
}
```

Ce qui revient cette fois à demander le bon chemin vers notre fonction. L'erreur a disparue ! Mais en Rust, on utilisera plutôt le mot-clef `use` pour gérer nos chemins absolus.

## Gérer les chemins absolus avec `use`

Il peut devenir fastidieux de répéter plusieurs fois les mêmes chemins pour accéder à une fonction : le mot-clef `use` nous facilite les choses de ce côté.

On peut créer un chemin absolu avec le mot-clef `use` :

```rust{1,4}
use database;

pub fn get() {
  database::connect();
  println!("getting user");
}
```

Dans le cas ci-dessus, `database::connect()` sera bien interprété comme `::database::connect()`.

:::danger NOTA BENE

- Le chemin importé par `use` est toujours à renseigner en **absolu**, bien qu'on ne précise pas `::` au début. On part donc toujours de la racine de notre arborescence de modules.
- `use` n'inclus PAS de nouveau code dans le projet**. On ne peut utiliser `use` que concernant du code *déjà inclus*, soit par `mod`, soit par `extern crate`.

:::

On peut aussi importer le chemin tout entier, ce qui nous permet d'appeler tout simplement `connect()` ensuite :

**`📝 src/user.rs`**:

```rust{1,4}
use database::connect;

pub fn get() {
  connect();
  println!("getting user");
}
```

Le mot-clef `use` propose d'autres syntaxes utiles :

```rust
// permettra d'écrire "connect()" et "close_connection()"
use database::{connect, close_connection};

// permettra la même chose mais avec TOUTES les fonctions et types
// contenu(e)s dans le module database
use database::*
```
