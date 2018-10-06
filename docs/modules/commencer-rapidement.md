# Les modules

## Commencer rapidement

Rust nous permet d'organiser très simplement son code en différents *modules* grâce au mot clef `mod`. Voici l'exemple le plus simple de déclaration d'un module :

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

Deux choses importantes à retenir ici :

- Les fonctions et types d'un module sont **privées** par défaut, il faut utiliser le mot clef `pub` pour les rendre accessibles au code extérieur.
- Pour accéder au méthodes et types d'un module, il faut **toujours** les préfixer par le nom du module. Ici on écrit `database::connect` et pas `connect`.

## Mettre notre module dans un fichier dédié

Créons un fichier `src/database.rs` et y inclure le code notre module **SANS** le mot clef `mod`

```rust
// src/database.rs

pub fn connect() {
  println!("Connexion à la base")
}
```

Il faut maintenant inclure notre module dans le programme. Dans `main.rs` :

```rust
mod database;

fn main() {
  database::connect()
}

```

Et voilà ! nous savons déjà organiser facilement notre code en créant modules dans leurs propres fichiers.

## Organiser ses modules en dossier

Pour un module plus complexe, on voudra rapidement créer un dossier qui contiendra plusieurs fichiers liées au fonctionnement de notre module. Faisons cela avec notre module `database` en créant un fichier `src/database/mod.rs`

```rust
// src/database/mod.rs

pub fn connect() {
  println!("Connexion à la base")
}
```

Notre code précédent dans `main.rs` fonctionne toujours ! Quand on écrit `mod database`, Rust va chercher automatiquement soit un fichier  `src/database.rs`, soit un fichier `src/database/mod.rs`.

```rust
mod database;

fn main() {
  database::connect()
}
```

Ce fichier `mod.rs` peut lui même inclure des modules ! Supposons que nous voulions ajouter dans notre module *database* un script de création de tables pour installer la base de données de notre programme; puis un script de désinstallation pour les supprimer. Voici notre nouvelle arborescence :

```rust
📂 src
  📂 database
    📝 install.rs
    📝 mod.rs
    📝 uninstall.rs  
  📝 main.rs
```

Contenu de `src/database/install.rs`

```rust
pub fn create_tables() {
  println!("Script de création des tables dans la base de données")
}
```

Contenu de `src/database/uninstall.rs`

```rust
pub fn drop_tables() {
  println!("Script de création des tables dans la base de données")
}
```

Contenu de `src/database/mod.rs`

```rust
pub fn drop_tables() {
  println!("Script de création des tables dans la base de données")
}
```

``` rust
// on inclut nos fichiers dans le programme en indiquant avec "pub"
// que le code extérieur peut accéder à leur code.
pub mod install;
pub mod uninstall;

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
  database::uninstall::drop_tables();
}
```

Et voilà 🎉 ! Armé de ce simple mot clef `mod`, nous pouvons déjà organiser facilement un code complexe, et sur le même principe nous pouvons créer des dossiers de modules dans nos dossiers de module et ainsi de suite.

## Le mot clef `use`