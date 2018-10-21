# Types primitifs composés

<Avertissement />

Les types composés peuvent regrouper plusieurs valeurs dans un seul type. Rust propose deux types composés primitifs : les **tuples** et les **arrays**.

## tuple

Créer un tuple composé de différents _types primitifs_:

```rust
let tup: (i32, f64, u8, String) = (500, 6.4, 1, String::from("Hello"));
```

L'inférence de type permet d'écrire plus simplement :

```rust
let tup = (500, 6.4, 1, String::from("Hello"));
```

Lire les valeurs du tuple :

```rust
let tup = (500, 6.4, 1, String::from("Hello"));

// affiche "6.4"
println!("{}", tup.1);

// affiche aussi "6.4"
let (x, y, z, hello) = tup;
println!("{}", y);
```

## array

Contrairement au _tuple_, chaque élément d'un _array_ **doit être du même type**.

```rust
let ids: [i32; 5] = [12, 16, 23, 15, 99];

// affiche "99'"
println!("{}", ids[4]);
```

L'inférence de type nous permet d'écrire plus simplement:

```rust
let ids = [12, 16, 23, 15, 99];

// affiche "99'"
println!("{}", ids[4]);
```

:::warning NOTA BENE
**les arrays ont une longueur fixe !**: une fois déclaré, leur taille ne peut pas s'agrandir ou se réduire. On verra plus tard le type **vectors** dont la taille peut varier dynamiquement.
:::