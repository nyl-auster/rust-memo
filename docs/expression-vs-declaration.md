# La différence entre les expressions et les déclarations

:::warning NOTA BENE
Rust est un language basé sur les **expressions**, il est donc important de bien comprendre cette distinction.
 :::

Le corps des fonctions est composé d'une série de **déclarations** , qui se termine **éventuellement** par une **expression**.

Function bodies are made up of a series of **statements** _optionally_ ending in an **expression**

- les **déclarations** ne retourne **pas** de valeur
- Les expressions sont toujours **résolues en une valeur** qu'elles retournent.

Exemples de déclarations:

```rust
// créer une variable et lui assigner une valeur
let y = 5;
```

:::tip NOTA BENE
_let y = 5_ est une **déclaration** mais "5" est une **expression** qui est évalué à "5".
:::

Exemples d'expressions :

```rust
// Les nombres en eux-même sont des expressions.
5

// les opération mathématiques
5 + 6

// appeler une fonction
say_hello()

// appeler une macro
println!

// les blocs ( ici évalué à 4 )
let y = {
    let x = 3;
    x + 1
};
```
