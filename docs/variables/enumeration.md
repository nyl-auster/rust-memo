# Énumérations

## Déclaration d'un énumération

Une énumération définit un **type** de données en énumérant la liste de ses valeurs possibles, nommées **variantes**. On peut traiter les valeurs des variantes grâce à l'expression `match`.

Exemple basique d'Enum :

```rust
enum Country {
    France,
    Espagne,
    Allemagne,
}
```

Ci-dessus, les variantes ont juste un nom, mais on peut associer n'importe quel type de donnée à une variante : strings, types numériques, structures ...

**Déclarer des variantes est en réalité identique à déclarer des structures**, sans le mot clef `struct` :

```rust
enum Message {
    Quit, // unit-like struct ou unit-struct
    Move { x: i32, y: i32 }, // struct
    Write(String), // tuple struct avec un seul paramètre
    ChangeColor(i32, i32, i32), // tuple struct avec plusieurs paramètres
}
```

Les variantes peuvent se lire de la manière suivante :

```rust
struct QuitMessage; // unit struct
struct MoveMessage { // struct
    x: i32,
    y: i32,
}
struct WriteMessage(String); // tuple struct
struct ChangeColorMessage(i32, i32, i32); // tuple struct
```

Voici comment **instancier** puis **lire** les différents types de données :

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    // instances de variantes
    let quit = Message::Quit;
    let color = Message::ChangeColor(224, 122, 231);
    let write = Message::Write(String::from("Hello !"));
    let moving = Message::Move { x: 25, y: 38 };

    // accès aux données des instances de variantes
    match moving {
        Message::Quit => println!("Quit !"),
        Message::ChangeColor(v1, v2, v3) => println!("{}, {}, {}", v1, v2, v3),
        Message::Write(v) => println!("{}", v),
        Message::Move { x, y } => println!("{} {}", x, y),
    }
}
```

## Un cas concret d'utilisation des énumérations et de match

Créons une fonction `divide()` capable de faire une simple division; mais qui affichera un message d'erreur courtois si un des deux nombres passés en argument vaut `0`.

Pour cela, on code donc la fonction `divide()` de manière à ce qu'elle nous renvoie :

- _soit_ le résultat de la division
- _soit_ un message d'erreur (une châine de caractère indiquant l'erreur rencontrée) si un nombre vaut `0`.

Ce cas de figure peut s'exprimer très élégamment en Rust avec la combinaison d'un `enum` et de l'expression `match`

```rust
// le retour de divide() pourra être soit un flottant, soit un message d'erreur
enum Return {
    Value(f64),
    Error(&'static str),
}

// le type de retour de la fonction est Return, car on
// va retourner une instance de variante de l'enum Return.
fn divide(x: f64, y: f64) -> Return {
    if x == 0.0 || y == 0.0 {
        Return::Error("Impossible de diviser par zéro")
    } else {
        Return::Value(x / y)
    }
}

fn main() {
    // affiche : "Impossible de diviser par zéro"
    match divide(10.0, 0.0) {
        Return::Value(value) => println!("{}", value),
        Return::Error(message) => println!("{}", message),
    }
    // affiche : "5"
    match divide(10.0, 2.0) {
        Return::Value(value) => println!("{}", value),
        Return::Error(message) => println!("{}", message),
    }
}
```

En réalité, Rust propose justement par défaut un enum `Result` pour ce cas de figure ! Il contient deux variantes : `Ok` et `Err`. Pour nous faciliter la vie, Rust nous autorise même à écrire juste `Ok` et `Err` au lieu de `Result:Ok` et `Result:Err`. On peut donc réecrire notre code comme suit:

```rust
// le type de retour de la fonction est Return, car on
// va retourner une instance de variante de l'enum Return.
fn divide(x: f64, y: f64) -> Result<f64, &'static str> {
    if x == 0.0 || y == 0.0 {
        Err("Impossible de diviser par zéro")
    } else {
        Ok(x / y)
    }
}

fn main() {
    // affiche : "Impossible de diviser par zéro"
    match divide(10.0, 0.0) {
        Ok(value) => println!("{}", value),
        Err(message) => println!("{}", message),
    }
    // affiche : "5"
    match divide(10.0, 2.0) {
        Ok(value) => println!("{}", value),
        Err(message) => println!("{}", message),
    }
}
```

L'enum `Result` propose aussi des méthodes utiles, que l'on verra dans un chapitre dédié.

## Méthodes

Il est possible de d'ajouter des méthodes sur les Enums de la même manière que pour une structure :

```rust
impl Message {
    fn call(&self) {
        // method body would be defined here
    }
}

let m = Message::Write(String::from("hello"));
m.call();
```