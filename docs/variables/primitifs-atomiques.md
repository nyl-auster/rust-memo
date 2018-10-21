# Types primitifs atomiques

<Avertissement />

Un type scalaire représente une donnée _atomique_ par opposition à des types composés - comme des types listant plusieurs valeurs tels que _array_, _tuple_ ou _String_ (une String étant une liste de _caractères_). Il existe quatre types scalaires de données :

- Entier
- Nombre à virgule flottante
- Booléen
- Caractère

## Entier

```rust
let y: u8 = 142;  // type entier non-signé 8 bits
let x = 142; // Rust infère le type i32 par défaut
```

| longueur | signé | non-signé | en décimal signé                                                | en décimal non-signé                  |
| -------- | ----- | --------- | --------------------------------------------------------------- | ------------------------------------- |
| 8-bits   | i8    | u8        | de `-128` à `+127`                                              | de `0` à `255`                        |
| 16-bits  | i16   | u16       | de `-32 768` à `+32 767`                                        | de `0` à `65 536`                     |
| 32-bits  | i32   | u32       | de `-2147483648` à `+2147483647`                                | de `0` à `4 294 967 296`              |
| 64-bits  | i64   | u64       | de `- 9 223 372 036 854 775 808` à `+9 223 372 036 854 775 807` | de `0` à `18 446 744 073 709 551 616` |
| arch     | isize | usize     | dépend de l'architecture                                        |

:::tip NOTE
isize et usize dépendent du type d'ordinateur sur lequel tourne le programme : 64 bits si vous êtes sur une architecture 64 bits, 32 bits si vous êtes sur une architecture 32 bits.
:::

:::tip NOTE
Les entiers sont par défaut du type i32 parce que c'est généralement le type le plus performant.
:::

## Nombre à virgule flottante

```rust
let y: f32 = 142.567890; // flottant 32 bits
let x = 2.0; // Rust infère le type f64 par défaut
```

| longueur | notation |
| -------- | -------- |
| 32-bits  | f32      |
| 64-bits  | f64      |

> 💡 Le type par défaut est _f64_ parce que sur les CPUs modernes, il est quasiment aussi rapide que _f32_ mais offre bien plus de précisions.

## Booléen

```rust
let y: bool = false; // avec un type explicite
let x = true; // ici Rust infère le type bool
```

## Caractère

```rust
let c = 'z';
let z = 'ℤ';
let heart_eyed_cat = '😻';
```

:::tip NOTE
Le type caractère est spécifié avec des guillemets simples tandis que les chaînes de caractères sont spécifiées avec des guillemets doubles.
:::
