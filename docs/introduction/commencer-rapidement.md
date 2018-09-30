# Commencer rapidement

Installation sur Mac & linux :

```sh
curl https://sh.rustup.rs -sSf | sh
```

Si l'installation s'est bien déroulée, taper *rustup* dans le terminal doit afficher les commandes disponibles.

| Commande | description |
|---------|-------------|
|rustup update| update rustup|
|rustc --version | display Rust version |
| rustup doc | open local doc |

# Hello world

Tout programme *Rust* doit contenir une fonction *main*, qui sera toujours la première partie du code exécutée. le mot clef `fn` est utilisé pour créer une fonction.

```rust
// nom du fichier: main.rs
fn main() {
    println!("Hello, world!");
}
```

:::tip NOTA BENE
Il faut ici note la présence d'un point d'exclamation à la fin de println : c'est que `println!` n'est **pas** une fonction mais une **macro**. Pour l'heure, il suffit de dire que les macros sont fréquemment utilisées en Rust et de bien faire attention à ne pas confondre une macro et une fonction.
:::

Compiler puis exécuter notre code.

```sh
rustc main.rs
./main
```