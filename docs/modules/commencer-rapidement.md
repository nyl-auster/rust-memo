# Commencer rapidement

Rust nous permet d'organiser notre code en *modules* grâce au mot clef `mod`. Les fonctions et types d'un module sont privées par défaut, il faut utiliser le mot clef `pub` pour les rendre accessibles au code extérieur.

Créer un module "hello"

**src/hello.rs**:

```rust
pub fn world() {
  println!("{}", "Hello")
}
```

L'appeler depuis main.rs

**src/main.rs**: 

```rust
mod hello; 

fn main() {
    hello::world()
}
```

:::warning NOTA BENE
le nom du fichier doit être identique à celui utiliser avec le mot clef `mod` : ici le fichier s'appelle `hello.rs` et dans le fichier main.rs on fait une déclaration `mod hello`.
:::
