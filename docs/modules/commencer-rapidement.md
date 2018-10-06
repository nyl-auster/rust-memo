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
- Pour accéder au méthodes et types d'un module, il faut **toujours** les préfixer par le nom du module. Ici on écrit `database::connect` et pas `connect`.

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

Et voilà ! nous savons déjà organiser facilement notre code en créant modules dans leurs propres fichiers. Mais le mot-clef `mod` nous permet encore mieux.

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

Au final, le mot-clef `mod` permet d'inclure du code dans notre programme, une bonne fois pour toutes. Ainsi

## Le mot clef `use`