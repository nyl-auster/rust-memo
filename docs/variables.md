# Variables et types de données


## Déboguer les variables avec les placeholders de "println!" 💡

`println!` permet d'afficher une variable à l'aide de différents formatteurs tels que `{}`, `{:?}` , `{:#?}`, `{:p}` et d'autres :

```rust
// pour une variable primitive atomique, "{}" est suffisant:
let x = "hello world";
println!("{}", x);

// pour les types plus complexes, un formatteur est nécessaire
let array = [1, 2, 3];

// ceci ne fonctionnera pas
println!("this is my variable : {}", array);
// error[E0277]: `[{integer}; 3]` doesn't implement `std::fmt::Display`

// ceci fonctionne
println!("this is my variable : {:?}", array);
// affiche: "this is my variable : [1, 2, 3]"

// pour encore plus de lisibilité :
println!("this is my variable : {:#?}", array);
// affiche :
// this is my variable : [
//    1,
//    2,
//    3
// ]

// affiche l'adresse mémoire, par exemple `0x7ffee458816c`
// L'éperluette signifie "donne moi l'adresse mémoire de cette variable"
// Mais Rust affiche par défaut la valeur au lieu de l'adresse dans println!,
// on doit donc ajouter le formateur `:p` pour voir réellement l'adresse.
println!("{:p}", &array);

// affiche une valeur sous forme de séquences de bits, ici `11`.
println!("{:b}", array[2]);
```

# Fonctions

:::tip Note
Rust peut accéder à vos fonctions quel que soit l'endroit de leur déclaration.
:::

## exemples

Vous **devez** déclarer le type de valeur retournée avec une flèche. Si vous ne le faites pas, Rust considérera que votre fonction retourne par défaut un _tuple_ vide "()".

```rust
fn get_x() -> i32 {
    76
}
```

:::danger
Bien noter qu'il n'y a **PAS** de point-virgule à la fin; ce qui permet à 76 d'être évalué comme une expression, et Rust retourne automatiquement la valeur d'une expression.
 :::

La notation ci-dessus est donc strictement équivalente à la suivante :

```rust
fn get_x() -> i32 {
   return 76;
}
```

Exemple avec des paramètres. La signature de la fonction **doit** déclarer le type de chaque argument.

```rust
fn multiply(x: i32, y: i32) -> i32 {
    x * y
}
```

Exemple sans retourner explicitement une valeur ( Rust retournera donc "()" par défault )

```rust
fn my_function(x: i32, y: i32) {
    println!("The value of x is: {}", x);
}
```

## Pièges pour les débutants

🚨 Ceci provoquera une erreur du compilateur

```rust
fn multiply(x: i32, y: i32) -> i32 {
    x * y;
}
```

Comme il y a un point-virgule à la fin de "x * y", l'expression est convertie en **déclaration** (statement), et une déclaration ne retourne rien. Donc Rust considère que la fonction renvoie un tuple vide, ce qui ne correspondant pas au type de retour *i32\* qui a été déclaré dans la signature de notre fonction.

Pour réparer l'erreur, il suffit de retirer le point-virgule pour convertir la déclaration en expression, dont la valeur sera retournée automatiquement.

```rust
fn multiply(x: i32, y: i32) -> i32 {
    x * y
}
```

## La différente entre arguments et paramètres

:::tip NOTE
 Les **paramètres** sont les variables spéciales utilisées dans la signature d'une fonction. Les **arguments** sont les valeurs concrètes passées au moment de l'appel de la fonction.
:::

```rust
// x est un paramètre
fn hello_world(x: i32) {
    println!("Hello world");
}

fn main() {
  // 67 est un argument
  hello_world(67)
}
```

## La différence entre les expressions et les déclarations

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

# Les types de données



## Structure - Créer des types personnalisés avec les structures (Structs)

### Déclarer une structure

Une structure est un ensemble de _champs_ dont chaque type est spécifié.

```rust
// créer une structure, en implémentant le trait Debug pour pouvoir
// afficher la variable dans un println!
#[derive(Debug)]
struct User {
    name: String,
    email: String,
    age: u8,
    active: bool,
}

// instanciation de la structure
fn main() {
    let yann = User {
        name: String::from("Yann"),
        email: String::from("yann@yineo.fr"),
        age: 35,
        active: true,
    };
    // afficher l'âge
    println!("age : {}", yann.age);
    // afficher l'objet pour debug
    println!("debug : {:#?}", yann)
}
```

Pour rendre le champ mutable, il faut rendre toute l'instance mutable avec le mot clef **mut** lors de la déclaration de la variable

```rust
// ajout du mot clef mut à l'instanciation
let mut yann = User {
    name: String::from("Yann"),
    email: String::from("yann@yineo.fr"),
    age: 35,
    active: true,
};

// muter les variables
yann.age = 43;
yann.email = String::from("email@email.fr");
yann.active = false;
println!("debug : {:#?}", yann);
```

:::warning NOTA BENE
**Toute** l'instance doit être mutable, Rust n'autorise pas seulement certains champs à être mutables.
:::

Utiliser une fonction pour instancier la structure :

```rust
fn main() {
    let yann = build_user(String::from("yann"), String::from("yann@yineo.fr"));
    println!("debug : {:#?}", yann);
}

#[derive(Debug)]
struct User {
    name: String,
    email: String,
    age: u8,
    active: bool,
}

fn build_user(name: String, email: String) -> User {
    User {
        name: name,
        email: email,
        active: true,
        age: 35,
    }
}
```

On peut utiliser la notation abrégée pour instancier les champs dans build_user, pour éliminer les redondances comme "name: name" :

```rust
fn build_user(name: String, email: String) -> User {
    User {
        // notation abrégée. Identique à "name: name"
        name,
        // notation abrégée
        email,
        active: true,
        age: 35,
    }
}
```

Il est possible d'instancier une structure en reprenant les valeurs d'une autre instance. Ici, Roger est identique à Yann, on change juste le nom et l'email pour créer l'instance de Roger.

```rust
fn main() {
    let yann = build_user(String::from("yann"), String::from("yann@yineo.fr"));
    let roger = User {
        name: String::from("Roger"),
        email: String::from("roger@roger.fr"),
        // Struct update syntax
        ..yann
    };
    println!("debug : {:#?}", yann);
    println!("debug : {:#?}", roger);
}
```

### Implémenter une méthode sur la structure

Une **méthode** est une fonction attachée à une structure, qui recoit automatiquement **&self** en premier argument; qui est **l'instance de la structure**.

Pour ajouter une méthode, il faut créer un bloc **impl**. Voici comment définir une méthode "area" sur une structure "Rectangle", qui calculera l'aire de l'instance du Rectangle.

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

// ajout d'un bloc implémentation
impl Rectangle {
    // self est forcément le premier paramètre de la signature de la méthode
    fn area(&self) -> u32 {
        self.width * self.height
    }
}
```

On peut ensuite appelé notre _méthode_ area() sur une **instance** de _Rectangle_

```rust
let my_rectangle = Rectangle {
    width: 2,
    height: 5,
};
let area_with_struct = my_rectangle.area();
```

#### Créer une fonction associée

Les fonctions associées d'une structure s'ajoutent auss dans le bloc **impl** de la structure, mais ne prennent **pas** l'instance _&self_ en premier paramètre.

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

Une fonction associée ne dépend **pas** de l'instance, on l'appelle de la manière suivante :

```rust
Rectangle::square(10);
```

On sait maintenant d'où provient la notation `String::from("hello")` vu précédemment.

## Énumérations

### Déclaration d'un énumération

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

### Un cas concret d'utilisation des énumérations et de match

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

### Méthodes

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

## Tuple struct

Rust a un type de donnée qui est comme un hybride de `tuple` et `struct`, appelé _tuple struct_ . Un _Tuple struct_ a un nom, mais pas ses champs. On rencontrera ce format au moment de voir les énumérations.

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
	let black = Color(0, 0, 0);
	let origin = Point(0, 0, 0);
}
```

## Unit-like struct

Il est possible de définir une `struct` avec aucun champs :

```rust
struct Electron;

fn main() {
  let x = Electron;
}
```

Ca peut arriver si on doit implémenter un trait mais qu'on a rien à stocker au niveau de la structure, ou pour créer une variante d'énumération qui n'a pas de données.
