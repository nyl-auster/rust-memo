# Structures - Créer des types personnalisés avec `struct`

## Déclarer une structure

Une structure est un type de donnée incontournable qui regroupe un ensemble de champs, dont chaque type est spécifié. On peut également y attacher des **méthodes**.

Voici comment déclarer une structure classique. On utilise le **PascalCase** pour le nommage des structures, au lieu de la **snake_case** habituelle.

```rust
// le trait debug est optionnel: il permet d'afficher
// une instance de notre structure avec `println!`
#[derive(Debug)]
struct User {
    name: String,
    email: String,
    age: u8,
    active: bool,
}
```

Pour utiliser concrètement une structure, on doit créer une *instance*:

```rust
fn main() {
    let yann = User {
        name: String::from("Yann"),
        email: String::from("email@email.fr"),
        age: 35,
        active: true,
    };

    // afficher la valeur d'un champ
    println!("age : {}", yann.age);

    // afficher toute l'instance pour debug
    println!("{:#?}", yann)
}
```

## `unit struct` et `tuple struct`

Les structures sont souvent utilisées de deux autres manières qu'il est bon de savoir reconnaître.

On peut déclarer une structure sans aucun champ, on l'appelle alors *structure unitaire* (unit struct).

```rust
struct User;
```

On peut aussi créer des `tuple struct`, qui fonctionnent exactement comme les `tuple`, si ce n'est qu'ils ont un nom. Supposons par exemple qu'on veuille réprésenter un point avec des coordonnées `x` et `y`; on pourrait utiliser un `tuple struct` :

```rust
#[derive(Debug)]
struct Point(i32, i32);

fn main() {

  let point = Point(0, 10);
  // on accède aux valeurs de la même manière qu'avec
  // un tuple classique : par leur index numérique
  println!("{}", point.0);
  println!("{}", point.1);

  // affiche : Point(0, 10)
  println!("{:?}", point)
}
```

Les *structures unitaires* et *structures tuple* permettent de comprendre la syntaxe des indispensables **énumération** en Rust, qui sont composés des 3 types de structures que l'on vient de voir. La seule différence c'est que le mot clef `struct` n'est pas utilisé pour déclarer une *variante* d'une énumération:

```rust
enum Message {
    Quit, // une structure unitaire
    Move { x: i32, y: i32 }, // une structure classique
    Write(String), // un structure tupple
    ChangeColor(i32, i32, i32), // une structure tuple
}
```

## structure mutables

Pour que les valeurs d'une instance de structure soient mutables, il faut rendre **toute** l'instance mutable en utilisant le mot clef **mut** au moment de l'instanciation de la structure :

```rust
let mut yann = User {
    name: String::from("Yann"),
    email: String::from("email@email.fr"),
    age: 35,
    active: true,
};
```

Muter les variables est désormais possible

```rust
yann.age = 43;
yann.email = String::from("email@email.fr");
yann.active = false;
println!("debug : {:#?}", yann);
```

:::tip NOTE
**Tous** les champs de l'instance deviennent mutables, Rust n'autorise pas seulement certains champs à être mutables.
:::

On peut utiliser des fonctions pour construire des instances avec des valeurs par défaut.

```rust
fn build_user(name: String, email: String) -> User {
    User {
        // notation abrégée. Identique à "name: name"
        name,
        // notation abrégée. Identique à "email: email"
        email,
        active: true,
        age: 35,
    }
}
```

Il est possible d'instancier une structure en se basant sur les valeurs d'une autre instance. On peut ainsi redéfinir uniquement certaines valeurs. L'exemple ci-dessous reprend toutes les valeurs de l'instance yann et redéfinit uniquement les clef *name* et *email* pour l'instance roger.

```rust
fn main() {
    let yann = build_user(String::from("yann"), String::from("yann@yineo.fr"));
    let roger = User {
      // ces valeurs écrasent celle de l'instance "yann"
        name: String::from("Roger"),
        email: String::from("roger@roger.fr"),
        // l'instance de base ( toujours à écrire en dernier )
        ..yann
    };
    println!("debug : {:#?}", roger);
}
```

Le debug ci-dessus affichera :

```rust
debug : User {
    name: "Roger",
    email: "roger@roger.fr",
    age: 35,
    active: true
}
```

## Implémenter une méthode sur la structure

Une **méthode** est une fonction attachée à une structure, qui recoit automatiquement **&self** en premier argument; qui est **l'instance de la structure**.

Pour ajouter une méthode, il faut créer un bloc **impl**. Voici comment définir une méthode `area` sur une structure `Rectangle`, qui calculera l'aire de l'instance du Rectangle.

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

// ajout d'un bloc implémentation
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}
```

Créons une **instance** de notre structure _Rectangle_ sur laquelle on peut ensuite appeler notre _méthode_ `area` :

```rust
let my_rectangle = Rectangle {
    width: 2,
    height: 5,
};
let area_with_struct = my_rectangle.area();
```

## Les fonctions associées

Les fonctions associées sont tout simplement des méthodes qui ne prennent **pas** `&self` en premier paramètre.

```rust
impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}
```

Une fonction associée ne dépend **pas** des valeurs de l'instance : on l'appelle sans créer d'instance :

```rust
Rectangle::square(10);
```

On en sait maintenant assez pour comprendre la notation `String::from("hello")` vu précédemment : `String` est une structure Rust, est `from` une fonction associée de la structure `String`. Voici à quoi ressemble la déclaration de la structure `String`:

```rust
pub struct String {
    vec: Vec<u8>,
}
```

Elle contient un unique champ `vec` qu représente une collection (*Vec*) d'octets, dont chacun représentera un caractère UTF-8.
