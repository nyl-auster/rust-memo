# La différence entre les expressions et les déclarations

Rust est un language basé sur les **expressions**, il est donc important de bien comprendre la distinction entre une *expression* et une *déclaration*.

- les **déclarations** ne retournent **pas** de valeur
- les expressions sont toujours **résolues en une valeur** qu'elles retournent.

Exemples de déclaration:

```rust
// créer une variable et lui assigner une valeur
let y = 5;
```

:::tip NOTA BENE
_let y = 5_ est une **déclaration** mais que "5" est en lui-même une **expression** qui est évalué à "5".
:::

Exemples d'expressions :

```rust
// Les nombres en eux-même sont des expressions.
5

// les opération mathématiques sont des expressions
5 + 6

// appeler une fonction est une expression
say_hello()

// appeler une macro est une expression
println!

// les blocs ( ici évalué à 4 ) sont des expressions 
let y = {
    let x = 3;
    x + 1
};

// if / else est une expression aussi
fn main() {
  let number = 5;
  let number_is_positive = if number > 0 { true } else { false };
  // affiche "true"
  println!("{}", number_is_positive);
}
```

Le corps des fonctions est composé d'une série de **déclarations** , qui se termine **éventuellement** par une **expression**. Ci-dessous; le chiffre `5` est retourné par la fonction.

```rust
fn number() -> i32 {
    5
}
```
