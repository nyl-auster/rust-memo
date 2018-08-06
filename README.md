# RUST - MEMO

Il s'agit d'un mémo des concepts clefs de Rust, issu de la lecture de https://doc.rust-lang.org/book/second-edition/index.html .

## Commencer rapidement Rust

### installation

Sur Mac & linux :

```sh
curl https://sh.rustup.rs -sSf | sh
```

Si l'installation s'est bien déroulée, taper *rustup* dans le terminal doit afficher les commandes disponibles.

| Commande | description |
|---------|-------------|
|rustup update| update rustup|
|rustc --version | display Rust version |
| rustup doc | open local doc |

### Hello world

```rust
// filname: main.rs
fn main() {
    println!("Hello, world!");
}
```

> 💡La fonction *main* est spéciale : c'est toujours la première partie du code exécutée par un programme Rust.
> ⚠️ println! n'est **pas** une fonction mais une **macro** :  d'où la présence du "!" à la fin.

Compiler puis exécuter notre code.
```sh
rustc main.rs
./main
```

### 💡déboguer les variables avec les placeholders de "println!"

```rust
let array = [1, 2, 3];

println!("this is my variable : {:?}", array);
// affiche: "this is my variable : [1, 2, 3]"

println!("this is my variable : {:#?}", array);
// affiche :
// this is my variable : [
//    1,
//    2,
//    3
// ]
```

### Gestion des paquets

#### Cargo

**Cargo** est le system de build et le gestionnaire de paquet de Rust. Il est installé par défaut avec Rust.

Voici comment créer un projet avec cargo, dont le nom serait : "hello_cargo" :

```sh
cargo new hello_cargo --bin
```

> 💡l'argument --bin permet de créer une application éxecutable au lieu d'un librairie.

En Rust, les paquets sont nommés **crates** : caisses / cageots.

| command | description |
|---------|-------------|
|cargo build|compiler. le binaire sera crée dans "target/debug/hello_cargo"|
|cargo run|compile and exécute|
|cargo check|vérifie les erreurs mais ne produit pas un exécutable (plus rapide que "cargo run" donc)|
|cargo build --release| compiler avec optimisations. L'éxécutable sera crée dans "target/release" à la pkace de "target/debug"|
|cargo update| mettre à jour les *crates* - seulement le dernier numéro number de leur versionning sémantique|

#### Installation d'un crate

Exemple avec l'installation du crate *rand* (génération de nombres au hasard) : Il faut ajouter la dépendance au fichier *Cargo.toml*

```toml
[dependencies]
rand = "0.3.14"
```
puis taper la commande suivant à la racine du projet :
```sh
cargo build
```

Pour pouvoir appeler les méthodes de "Rng", doit ajouter le *trait* à notre scope :
```rust
extern crate rand;
// put Rng trait in the scope to use its methods like "gen_range"
use rand::Rng;
```

> 💡 Pour savoir comment importer les méthodes et fonction d'un crate, il faut ouvir la documentation et cliquer sur le paquet concerné dans la barre de gauche.

```sh
cargo doc --open
```

## Concepts généraux

### Variables et mutabilité

#### Immutabilité

> 💡 Rust utilise le type de casse **snake_case** pour nommer les fonctions et variables. Exemple : "hello_world()"

> ⚠️ Par défaut, les variables sont **immutables**. Le code suivant provoquera donc une erreur du compilateur.

```rust
fn main() {
    let x = 5;
    x = 6;
}
```

Il faut utiliser le mot-clef **mut** pour render une variable mutable.

```rust
fn main() {
    let mut x = 5;
    x = 6;
}
```

#### Exemples de déclaration de variables

```rust
// déclarer un nombre immutable ave le type par défaut qui est i32 ( 32 bits signés) 
let a = 42

// déclarer un nombre immubtale en le typant manuellement en 64 bits signés.
let x: i64 = 42;

// déclarer un nombre
let mut y = 27;

// créer une string de taille fixe et immutable (appelée "slice", son  type est *&str*)
let greeting = "Hello there.";

// déclarer une chaîne de caractères UTF-8 mutable et agrandissable ( type **String** )
let mut s = String::from("Hello");
s.push_str(", world.");
println!("{}", s); // display "Hello, world."
```

Il est possible de "shadow" une variable en ré-utilisant le mot clef let.

```rust
let my_var = 5;
let my_var = 6;
```

### Les types de données

Il existe quatre types scalaires de données. Un type scalaire représente une données "atomique" par opposition à des types composés - comme des types listant plusieurs valeurs tels que *array*, *tuple* ou *String* (une String est une liste de *characters* )

- integers
- floating-point numbers
- Booleans
- characters

> 💡 Note : ces types de données scalaires sont stockés uniquement dans la pile et supprimer de la pile lorsqu'il sont hors de portée. ( plus de détails plus bas concernant la *pile* et le *tas*)

#### Le type entier

example :
```rust
let x = 142; // sera du type "entier 32 bits" par défault
let y: u8 = 142;  // type entier non-signé 8 bits
```

|longueur|  signé | non-signé |
|--------|--------|----------|
|8-bits  | i8     | u8       |
|16-bits | i16    | u16      |
|32-bits | i32    | u32      |
|64-bits | i64    | u64      |
|arch    | isize  | usize    |


> 💡 isize et usize dépendent du type d'ordinateur sur lequel tourne le programme : 64 bits si vous êtes sur une architecture 64 bits, 32 bits si vous êtes sur une architecture 32 bits.

> 💡 Les entiers sont par défault du type i32 parce que c'est généralement le type le plus performant.


#### Type nombre à virgule flottante

exemple :

```rust
let x = 2.0; // f64 par défault
let y: f32 = 142.567890; // flottant 32 bits
```

|longueur|notation|
|--------|--------|
|32-bits | f32    |
|64-bits | f64    |

> 💡 Le type par défaut est *f64* parce que sur les CPUs moderne, il est quasimenet aussi rapidement que *f32* mais offre bien plus de précisions.

#### Le type booléen

```rust
let x = true;
let y: bool = false; // avec un type explicite
```

#### Le type caractère

```rust
let c = 'z';
let z = 'ℤ';
let heart_eyed_cat = '😻';
```

> ⚠️ Le type caractère est spécifié avec des guillemets simples tandis que les chaîne de caractères sont spécifiées avec des guillemets doubles.

#### Les types composés

Les types composés peuvent regrouper plusieurs valeurs dans un seul type. Rust propose deux types composés primitifs : les **tuples** et les **arrays**.

##### Le type tuple

```rust
// créer un tuple composé de différents types simples
let tup: (i32, f64, u8) = (500, 6.4, 1);

// lire les valeurs du tuple
let (x, y, z) = tup;

println!("The value of y is: {}", y); // affiche 6.4
println!("{}", tup.1); // affiche aussi 6.4
```
##### Le type array

Unlike a tuple, every element of an array must have the same type.

Contrairement au *tuple*, chaque élément d'un *array* **doit être du même type**.

```rust
let a = [1, 2, 3, 4, 5];
// accédérer à la première et à la deuxième valeur du tableau.
let first = a[0];
let second = a[1];
```
> ⚠️ **les arrays ont une longueur fixe !**: une fois déclaré, leur taille ne peut pas s'agrandir ou se réduire. On verra plus tard le type **vectors** dont la taille peut varier dynamiquement.

#### Opérations arithmétiques

```rust
// addition
let sum = 5 + 10;

// soustraction
let difference = 95.5 - 4.3;

// multiplication
let product = 4 * 30;

// division
let quotient = 56.7 / 32.2;

// reste
let remainder = 43 % 5;
```
### Fonctions 

> 💡Note : Rust peut accéder à vos fonctions quel que soit l'endroit de leur déclaration.

#### exemples

Vous **devez** declarer le type de valeur retournée avec une flèche. Si vous ne le faites pas, Rust considérera que votre fonction retourne par défaut un *tuple* vide "()".

```rust
fn get_x() -> i32 {
    76
}
```

> ⚠️ Bien noter qu'il n'y a **PAS** de point-virgule à la fin; ce qui permet à 76 d'être évalué comme une expression, et Rust retourne automatiquement la valeur d'une expression.

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

#### Pièges pour les débutants

🚨 Ceci provoquera une erreur du compilateur
```rust
fn multiply(x: i32, y: i32) -> i32 {
    x * y;
}
```

Comme il y a un point-virgule à la fin de "x * y", l'expression est convertie en **déclaration** (statement), et une déclaration ne retourne rien. Donc Rust considère que la fonction renvoie un tuple vide, ce qui ne correspondant pas au type de retour *i32* qui a été déclaré dans la signature de notre fonction.

Pour réparer l'erreur, il suffit de retirer le point-virgule pour convertir la déclaration en expression, dont la valeur sera retournée automatiquement.

```rust
fn multiply(x: i32, y: i32) -> i32 {
    x * y
}
```

#### La différente entre arguments et paramètres

> ⚠️ Les **paramètres** sont les variables spéciales utilisées dans la signature d'une fonction. Les **arguments** sont les valeurs concrètes passées au moment de l'appel de la fonction.

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

#### La différente entre les expressions et les déclarations

> ⚠️ Rust est un language basé sur les expressions, il est important de bien comprendre cette distinction.

Le corps des fonctions est composé d'une série de **déclarations** , qui se termine **éventuellement** par une **expression**.

Function bodies are made up of a series of **statements** *optionally* ending in an **expression**

- les **déclarations** ne retourne **pas** de valeur
- Les expressions sont toujours **résolues en une valeur** qu'elles retournent.

Exemples de déclarations:

```rust
// créer une variable et lui assigner une valeur
let y = 5;
```
> 💡 *let y = 5* est une **déclaration** mais "5" est une **expression** qui est évalué à "5". 

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

### Contrôle de flux

#### les expressions if

> 💡 Note : on parlera un peu plus loin des **patterns** qui sont une autre manière très puissante de gérer les conditions en Rust : https://doc.rust-lang.org/book/second-edition/ch18-03-pattern-syntax.html


```rust
fn main() {
    let number = 3;
    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }
}
```
> ⚠️ Rust n'essaiera **PAS** de convertir automatiquement des types non-booléens en type booléen au sein des conditions. 

Conditions multiples :

```rust
fn main() {
    let number = 6;

    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }
}
```

>  💡 Comme **if** est une expression, il retourne une valeur : on peut donc utiliser **if** pour assigner une valeur à une variable :

```rust
fn main() {
    let condition = true;
    let result = if condition { 5 } else { 6 };
    println!("{}", result); // display "5"
}

```

> 🚨 Le code ci-dessous provoquer une erreur : chaque **bras** du **if** doit être du même type.

```rust
fn main() {
    let condition = true;
    let number = if condition { 5 } else { "six" };
    println!("The value of number is: {}", number);
}
```

#### boucles

##### loop

Le mot clef **loop** crée une boucle infinie. Il faut utiliser le mot-clef **break** pour sortir d'une boucle infinie.

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

##### while

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

##### for

> 💡For est l'une des constructions de boucles les plus utilisées en Rust pour sa concision.

Itérer sur un *array*

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

pour obtenir un index, il faut passer par l'itérateur et enumerate(). Enumerate va renvoyer un *tuple* pour chaque iteration de type (index, element).

```rust
let test = ["hello", "world", "!"];
for (i, element) in test.iter().enumerate() {
    println!("{} {}", i, element);
}
```

## Propriété( Ownership ) pile (stack) et tas (heap)

> Le concept propriété et de transfert de propriété concerne uniquement les variables dont la valeur est stockée **dans le tas (heap)**, donc ce chapitre **requiert** une connaissance basique à propos de la pile et du tas ( [Annexe: la pile et le tas](annex-stack-and-heap.md) ).

La propriété est un principe central et unique de Rust qui indique qu'une valeur stockée dans le *tas* (heap) ne peut appartenir qu'à une seule variable de la pile (stack) à la fois. On dénomme **propriétaire** cette variable.

Ce principe permet à Rust de supprimer automatiquement la valeur du *tas* dès que son propriétaire correspondant est *hors de portée* (out of scope); comme c'est le cas pour les variables de la *pile*. 

Cela permet de se passer de Garbage collector ou du besoin d'allouer et libérer manuellement la mémoire du *tas*.

Grâce à cela, **il ne peut pas y avoir d'erreur de mémoire au moment** du "run time" ( pas de double libération de la mémoire ou de pointeur qui pointe vers un espace vide ou une mauvaise valeur).

### Hors de portée

🚨🚨🚨 **Attention** ( et je met 3 giyrophares pour marquer le coup ) : c'est un principe capital à conserver en permanence en mémoire quand on fait du Rust ! **Une variable est "hors de portée" et supprimée de la mémoire dès que le programme rencontre une accolade fermante**

```rust
{                      // "s" n'est pas valide ici, car pas encore déclaré
    let s = "hello";   // s est valide à partir d'ici
    // do stuff with s
} // "s" n'est plus valide ici et sa valeur est **jetée** !

```

Quand une accolade fermante est rencontrée, Rust appelle automatiquement une fonction spéciale **drop** qui désalloue la mémoire associée aux variables de la portée. ( qui deviennent donc invalides ).

Donc à chaque fois qu'on voit une accolade fermante, que ce soit dans la fin d'une fonction ou à n'importe quel autre endroit du code, il faut penser : fonction drop() appelée automatiquement et variable supprimée de la mémoire.


### Exemple concret de propriété et de transfert de propriété

Voici comme est stocké la valeur "hello" en Rust avec le type complexe **String** ( un morceau de texte UTF-8 qui peut grandir ou rétrécir )

- à gauche, la **pile** qui contient les métadonnées de la variable (pointeur, longueur, capacité)
- à droite le **tas** qui contient la valeur.

```rust
let s1 = String::from("hello");
```

<img width="300px" src="images/ownership-figure-a.svg" />


Voyons ce qu'il se passe si nous écrivons :

```rust
let s1 = String::from("hello");
// on assigne la valeur de s1 à s2.
let s2 = s1;
```

Cette assignation de *s1* à *s2* se traduit par l'allocation de mémoire suivante :

<img width="300px" src="images/ownership-figure-b.svg" />

Les métadonnés de la **pile** sont **copiées** mais pas la valeur de du **tas** ! Pour des raisons de performance et par défaut, Rust ne copie que les métadonnées de la pile pour créer cette seconde variable. 

Nous voilà donc ici avec deux **propriétaires** de la valeur "hello"; c'est précisément ce qui est **interdit en Rust**.

C'est pourquoi Rust **transfère la propriété de la valeur** à s2 : on dit aussi que la valeur "s'est déplacé" (**moved**) de s1 à s2; parce que du point de vue du code, on ne peut plus l'afficher avec s1; comme si elle s'était déplacé d'une variable à une autre.

<img width="300px" src="images/ownership-figure-c.svg" />

🚨Ce code produira donc une erreur "value moved here"

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
    // Rust compiler ne nous autorise plus à appeler s1 ici, parce que la valeur a été transféré à s2 !
    println!("{}", s1)
}
```

Le code suivant affichera donc l'erreur : **use of moved value s1**

```sh
error[E0382]: use of moved value: `s1`
  --> src/main.rs:14:20
   |
13 |     let s2 = s1;
   |         -- value moved here
14 |     println!("{}", s1)
   |                    ^^ value used here after move
```

s1 ne fera plus partie de la pile, de manière à ce que la string hello n'ait qu'un seul et unique propriétaire. Ce qui permettra à Rust de pouvoir supprimer en toute sécurité la valeur "hello" du **tas** quand *s2* sera hors de portée.

Il est possible toutefois, si nécessaire, d'utiliser la méthode **clone** pour copier également la valeur du tas et obtenir l'utilisation suivante de la mémoire :

```rust
let s1 = String::from("hello");
let s2 = s1.clone();
```

<img width="300px" src="images/ownership-figure-d.svg" />
 
### Les types qui ne sont PAS concernés par la propriété

Les types dont les valeurs sont stockés dans la pile ne sont **pas** concernés par la notion de propriété; puisque la propriété ne sert qu'à gérer l'allocation de la mémoire du tas. Les types suivants ne sont pas concernés par la propriété.

- Les entiers
- Les booléens
- Les nombres à virgule flottante
- Les caractères
- Les types, mais seulement si ils contiennent uniquement des types simples qui utilisent le trait **Copy**. Par exemple, (i32, i32); mais pas (i32, String).

### Propriété et fonctions

**Le passage d'une variable a une fonction fonctionne comme l'assignation d'une variable à une autre variable** : il y aura soit "copie", soit "transfert de la propriété".

```rust
fn main() {
    let s = String::from("hello");  // s comes into scope

    takes_ownership(s);             // s's value moves into the function...
                                    // ... and so is no longer valid here

    let x = 5;                      // x comes into scope

    makes_copy(x);                  // x would move into the function,
                                    // but i32 is Copy, so it’s okay to still
                                    // use x afterward

} // Here, x goes out of scope, then s. But because s's value was moved, nothing
  // special happens.

fn takes_ownership(some_string: String) { // some_string comes into scope
    println!("{}", some_string);
} // Here, some_string goes out of scope and `drop` is called. The backing
  // memory is freed.

fn makes_copy(some_integer: i32) { // some_integer comes into scope
    println!("{}", some_integer);
} // Here, some_integer goes out of scope. Nothing special happens.
```

### Return values and scope

Retourner des valeurs depuis une fonction effectue aussi un transfert de propriété : la valeur est alors déplacée dans la variable à qui on assigne le retour de la fonction.

```rust
fn main() {
    let s1 = gives_ownership();         // gives_ownership moves its return
                                        // value into s1

    let s2 = String::from("hello");     // s2 comes into scope

    let s3 = takes_and_gives_back(s2);  // s2 is moved into
                                        // takes_and_gives_back, which also
                                        // moves its return value into s3
} // Here, s3 goes out of scope and is dropped. s2 goes out of scope but was
  // moved, so nothing happens. s1 goes out of scope and is dropped.

fn gives_ownership() -> String {             // gives_ownership will move its
                                             // return value into the function
                                             // that calls it

    let some_string = String::from("hello"); // some_string comes into scope

    some_string                              // some_string is returned and
                                             // moves out to the calling
                                             // function
}

// takes_and_gives_back will take a String and return one
fn takes_and_gives_back(a_string: String) -> String { // a_string comes into
                                                      // scope

    a_string  // a_string is returned and moves out to the calling function
}
``

### reference et emprunt

Comment faire si on souhaite ne **pas** transférer la propriété à une fonction ? Il faut utiliser une référence, déclarée avec le symbole &.

```rust
fn main() {
    let s1 = String::from("hello");
    // ici, len reste le propriétaire de la valeur, il ne fait que
    // la "prêter" à la fonction
    let len = calculate_length(&s1);
    // on peut donc toujours l'afficher ici
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```
Dans ce cas, "s" est une variable dans la pile contenant uniquement un pointeur vers la variable propriétaire de la valeur. Comme "s" n'est **pas** le propriétaire de la valeur, la valeur ne sera pas jetée quand la référence sera hors de portée.

<img width="500px" src="images/ownership-figure-e.svg" />

> 💡 l'opposé de la référence et la dé-référence avec l'operateur *. Plus de détails plus tard à ce sujet.
 
### Références mutables : n immutable or 1 mutable. Period.

Pour muter une référence, il faut obligatoirement utiliser le mot clef **mut** et remplacer "&" par "&mut", à la fois dans la signature dans la fonction et dans l'appel de la fonction.

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

> 💡 Dans la même portée, il est possible d'avoir plusieurs références **non mutables** vers la même variable.

> 🚨 Dans la même portée, il ne peut y avoir **qu'une seule référence mutable** vers la même variable.

> 🚨 Dans la même portée, il ne peut pas y avoir une référence mutable **ET** immutable vers la même variable.

```rust
let mut s = String::from("hello");
let r1 = &mut s;
let r2 = &mut s;
```

Les accolades peuvent être utilisées pour créer une nouvelle portée si il y a besoin de contourner ces règles.

```rust
let mut s = String::from("hello");
{
    let r1 = &mut s;
} // r1 goes out of scope here, so we can make a new reference with no problems.
let r2 = &mut s;
```

### pointeur foireux

Dans le code suivant, la valeur de la variable "s" sera jetée à la fin de la fonction. Mais la fonction retourne une référence vers cette valeur qui n'existe plus ! 

```rust
fn dangle() -> &String { // dangle returns a reference to a String
    let s = String::from("hello"); // s is a new String

    &s // we return a reference to the String, s
} // Here, s goes out of scope, and is dropped. Its memory goes away.
  // Danger!
```

Rust nous protégera de ce genre d'erreur : le compilateur ne nous laissera pas faire et provoquera une erreur.

```
error[E0106]: missing lifetime specifier
 --> main.rs:5:16
  |
5 | fn dangle() -> &String {
  |                ^ expected lifetime parameter
  |
  = help: this function's return type contains a borrowed value, but there is
  no value for it to be borrowed from
  = help: consider giving it a 'static lifetime
```

Il nous suggère d'ajouter un "temps de vie" mais c'est un autre sujet, pour l'heure il suffit de ne pas renvoyer de référence pour fixer l'erreur : on transfert ainsi la propriété, la valeur n'est donc pas jetée.

```rust
fn no_dangle() -> String {
    let s = String::from("hello");
    s
}
```

### Le Type Slice (tranche)

Une tranche permet de référencer ( pas de transfert de propriété ) une séquence d'éléments au sein d'une collection (plutôt que la collection toute entière).

#### String slice

Une string slice est une référence à une partie d'une **String** :

```rust
let s = String::from("hello world");
// string slices :
let hello = &s[0..5]; // hello
let world = &s[6..11]; // world
```

<img width="500px" src="images/string-slice-figure-a.svg" />

autres exemples :

```rust
// strings
let slice = &s[..2]; // de 0 à 2
let slice = &s[2..]; // de 2 jusqu'à la fin
let slice = &s[..];  // toute la chaîne
// array :
let a = [1, 2, 3, 4, 5];
let slice = &a[1..3];
```

## Structures (Structs)

Une structure est un ensemble de *champs* dont chaque type est spécifié.

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

> ⚠️ **Toute** l'instance doit être mutable, Rust n'autorise pas seulement certains champs à être mutables.

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



 










