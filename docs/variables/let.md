# Déclarer une variable avec `let`

En rust, on déclare une variable avec le mot clef `let`.

```rust
let x :i32 = 67;
```

:::tip NOTE
Il est possible de "shadow" une variable en ré-utilisant le mot clef let avec le même nom de variable.
:::

```rust
let my_var = 5;
let my_var = 6;
```

:::tip NOTE 
On peut lier plusieurs variables avec un seul mot clef `let` en utilisant le type `tuple`. C'est possible car en réalité, la partie de code à gauche, entre `let` et `=`, est ce que Rust appelle un **motif** (pattern). Plus à ce sujet ultérieurement.
:::

```rust
  let (x, y, z) = (1, 2.0, "Hello, world");
```
