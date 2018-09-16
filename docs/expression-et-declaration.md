# La différence entre les expressions et les déclarations

Rust est un langage centré sur les **expressions**, il est important savoir distinguer une *expression* d'une *déclaration*.

- les **déclarations** ne retournent **pas** de valeur
- les expressions sont toujours **résolues en une valeur**, qu'elles retournent.

Exemples de déclaration:

```rust
// créer une variable et lui assigner une valeur
let y = 5;
```

:::tip NOTA BENE
_let y = 5_ est une **déclaration** mais que "5" est en lui-même une **expression** qui est évalué à "5" et retourné à `y`
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

Le corps des fonctions est composé d'une série de **déclarations** , qui se termine **éventuellement** par une **expression**. Ci-dessous; le chiffre `5` est retourné par la fonction car il n'y a **pas** de point-virgule à la fin.

```rust
fn example() -> i32 {
    5
}
```

Si on ajoute un point-virgule, l'*expression* devient une *déclaration* et le résultat n'est **pas** retourné par la fonction, rust affichera d'ailleurs une erreur très explicite à ce sujet.

```rust
fn example() -> i32 {
    5;
}
```

L'erreur retournée est la suivante : 

```sh
 |
5 |   fn example() -> i32 {
  |  _____________________^
6 | |     5;
  | |      - help: consider removing this semicolon
7 | | }
  | |_^ expected i32, found ()
```

La fonction ne renvoie rien, Rust infère donc que le type de retour est le type par défault, qui est `()`. Il s'agit d'un *tuple* vide, qu'on verra plus en détail dans la section sur les [variables](./variables/primitifs-composes.html#tuple).