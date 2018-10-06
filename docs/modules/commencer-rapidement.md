# Les modules

## Commencer rapidement

Rust nous permet d'organiser très facilement les fichiers de notre code grâce à son système de  *modules*. Voici l'exemple le plus simple de déclaration d'un module :

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

C'était facile 🙀 . Deux choses importantes à retenir ici :

- Par défaut, toutes les fonctions et types d'un module sont **privées**, il faut utiliser le mot clef `pub` pour les rendre accessibles au code extérieur.
- Pour accéder aux méthodes et types du module, il faut d'abord indiquer à Rust le nom du module suivi de `::`.  Ce qui donne ici `database::connect`

## Mettre notre module dans un fichier dédié

Créons un fichier `src/database.rs`, de manière à obtenir l'arborescence de fichiers suivante :

```rust
📂 src
  📝 database.rs
  📝 main.rs
```

Dans `src/database.rs`, nous allons inclure le code notre module; mais **SANS** le mot clef `mod`

```rust
// src/database.rs

pub fn connect() {
  println!("Connexion à la base")
}
```

Il faut maintenant déclarer notre module et l'inclure dans le programme, avec le mot clef `mod`. Dans `main.rs` :

```rust
// src/main.rs

mod database;

fn main() {
  database::connect()
}

```

:::tip Note:
`mod database;` est donc équivalent à

```rust

mod database {
  pub fn connect() {
    println!("Connexion à la base")
  }
}
```

:::

## Organiser ses modules en dossier

Pour un module plus complexe, on voudra rapidement créer un dossier pour notre module qui contiendra tous les fichiers liés à ses fonctionnalités.

Faisons cela avec notre module `database` en créant un fichier `src/database/mod.rs`

```rust
// src/database/mod.rs

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
Quand on écrit `mod database;`, Rust va chercher automatiquement 

- soit un fichier  `src/database.rs`
- soit un fichier `src/database/mod.rs`.
:::

Supposons que nous voulions ajouter dans notre module *database* un script de création de tables pour installer la base de données de notre programme. Voici l'arborescence qu'on aimerait avoir :

```rust
📂 src
  📂 database
    📝 install.rs
    📝 mod.rs
  📝 main.rs
```

Contenu de `src/database/install.rs`

```rust
pub fn create_tables() {
  println!("Script de création des tables dans la base de données")
}
```

Contenu de `src/database/mod.rs`

```rust
// on inclut nos modules dans le programme en indiquant avec "pub"
// que les méthodes et types sont publiques.
pub mod install;

pub fn connect() {
  println!("Connexion à la base")
}
```

Et dans notre fichier `src/main.rs`

```rust
mod database;

fn main() {
  database::connect();
  database::install::create_tables();
}
```

Et voilà 🎉 ! Armé de ce simple mot clef `mod`, nous pouvons déjà organiser facilement un code complexe, et sur le même principe nous pouvons créer des dossiers de modules dans nos dossiers de module et ainsi de suite.

## comprendre les chemins de modules et le mot-clef `use`

### Les modules forment une arboresence virtuelle

Les espaces de nom des modules forment en réalité **une arborescence** de modules, avec une racine. Un peu comme un système de fichier. 

On peut réprésenter ainsi l'arborescence des modules que nous avons crée au cours de ce chapitre. Je vais utiliser des icônes de paquets 📦 pour bien distinguer l'arborescence des modules de l'arborescence des fichiers.

```rust
📦 root
  📦 database
    📦 install
    📦 uninstall
  📦 user
```

:::tip NOTA BENE

L'arborescence des modules n'est PAS identique à l'arborescence de leurs dossiers et fichiers ! On peut très bien créer une arborescence complexe de modules dans un seul fichier :

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

Nous avons ci-dessus un seul fichier `main.rs` mais l'arborescence de module suivante :

```rust
📦 root
  📦 nourriture
    📦 fruits
      📦 pommes
        📦 reinettes
          {} nom
```

:::

Pour accéder à la fonction `nom` du module reinettes, on doit indiquer son **chemin** dans l'arborescence de modules. soit `nourriture::fruits::pommes::reinettes::nom()`

**Mais il s'agit en réalité d'un chemin **relatif** qui prend en compte l'endroit où l'on se trouve dans le code**. Le chemin **absolu** complet réel est le suivant : `::nourriture::fruits::pommes::reinettes::nom()`

C'est exactement la même différence conceptuelle qu'entre les urls `nourriture/fruits/pommes/reinettes` et `/nourriture/fruits/pommes/reinettes` : le slash du début permet d'indiquer qu'il s'agit d'un chemin absolu, qui doit donc repartir de la racine.

### Exemple d'erreur de chemin

Créons un module user, qui appelera du code de notre module *database*

fichier `src/user.rs` :

```rust
pub fn get() {
  database::connect();
  println!("getting user");
}
```

fichier `main.rs`

```rust
mod user;
mod database;

fn main () {
  user::get();
}
```

Nous avons une erreur 😨 , le fichier `user.rs` ne parvient pas à résoudre `database::connect`

```rust
error[E0433]: failed to resolve. Use of undeclared type or module `database`
 --> src/user.rs:2:3
  |
2 |   database::connect();
  |   ^^^^^^^^ Use of undeclared type or module `database`
```

C'est parce que nous indiquons ici un chemin de module **relatif** : Rust cherche donc d'abord un module database **dans** notre module user. Voici en réalité ce que nous avons demandé en écrivant `database::connect()` :

```rust
📦 root
  📦 user
    📦 database
      {} connect
```

Pour régler cela, nous pouvons utiser un chemin absolu (qui commence par `::`), changeons `user.rs`:

```rust{2}
pub fn get() {
  ::database::connect();
  println!("getting user");
}
```

Ce qui revient cette fois à demander le bon chemin vers notre fonction. L'erreur a disparu !

```rust
📦 root
  📦 database
    {} connect
```

## Le mot clef `use`

Il existe une autre notation en Rust pour appeler la bonne méthode dans l'arborescence de module : c'est `use` :

Fichier `user.rs`

```rust{1}
use database::connect;

pub fn get() {
  connect();
  println!("getting user");
}
```

Ainsi, si on a besoin d'appeler la fonction `connect()` 10 fois dans le fichier, nous n'aurons pas à repréciser à chaque le chemin absolu.

:::danger ATTENTION
Le chemin indiqué par `use` est toujours **absolu**, bien qu'on ne précise pas `::`. On part donc toujours de la racine de notre arborscence de module pour utiliser use.
:::

Le mot clef use propose d'autres syntaxes :

```rust
// permet d'appeler ensuite sans chemin connect() et tagazok()
use database::{connect, tagazok};
// permet d'appeler sans chemin tout ce qui est public dans database
use database::*
```
