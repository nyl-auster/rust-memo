
# boucles

## loop

Le mot clef `loop` crée une boucle infinie. Le mot-clef `break` permet d'en sortir.

```rust
fn main() {
    let max = 5;
    let mut i = 0;
    loop {
        i = i + 1;
        if i > max {
            break;
        }
        println!("loop {}", i);
    }
}
```

## while

```rust
fn main() {
    let max = 5;
    let mut i = 0;
    while i < max {
        i = i + 1;
        println!("loop {}", i);
    }
}
```

## for

> 💡 For est l'une des constructions de boucles les plus utilisées en Rust pour sa concision.

Itérer sur un `array`

```rust
fn main() {
    let loops = [1, 2, 3, 4, 5];
    for element in loops.iter() {
        println!("loop {}", element);
    }
}
```

En utilisant **Range**

```rust
fn main() {
    for element in 1..6 {
        println!("loop {}", element);
    }
}
```

pour obtenir un index, il faut passer par l'itérateur et enumerate(). Enumerate va nous renvoyer un `tuple` pour chaque iteration de type de la forme `(index, element).`

```rust
let elements = ["hello", "world", "!"];
for (i, element) in elements.iter().enumerate() {
    println!("{} {}", i, element);
}
```
