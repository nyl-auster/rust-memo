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

## Ownership

> Ownership is **all about the heap**, so this chapter **requires** some basic knowledges about what are the **stack** and the **heap**. See [Annexe: the stack and the heap](annex-stack-and-heap.md)

Rust’s central and most unique feature is **ownership**. It enables Rust to make memory safety guarantees without needing a garbage collector and without the need for the programmer to explicitly allocate and free the memory from the heap.

**Managing heap data is why Rust ownership exists** : keeping track of what parts of code are using what data on the heap, minimizing the amount of duplicate data on the heap, and cleaning up unused data on the heap so you don’t run out of space are all problems that ownership addresses.

> 🙂 Because ownership is a new concept for many programmers, it does take some time to get used to.

### Understand if a value is in the stack or in the heap

Ownership concern only variables whose values are stored in the "heap". 
You must be able to distinguish if a variable is stored only in the stack; or if its value is stored on the heap; because this it what will determine copy behavior and ownership.

#### Simple types

For example : Integers are a simple type, only stored in the stack; because we know at compile time their size. So this code works exactly as expected.

```rust
fn main() {
    let x = 5;
    let y = x;
    println!("{}", y);
}
```

When assigning x to y, a full copy is made and the stack will looks like :

```
y = 5
x = 5
```

#### Complex types

This is how to declare a growable and mutable piece of text.
```rust
let mut s = String::from("hello");
```

 As this is growable, Rust will not store "hello" value on the stack. String data are actually shared between two memory locations : 
- metadata are stored in the *stack* : name, length ... Those values have a known size at compile time.
- actual value is store on the heap, because it is growable and can not be known for sure at compile time

<img src="https://doc.rust-lang.org/book/second-edition/img/trpl04-01.svg" width="400px" />

#### The "Copy" trait

Rust has a special annotation called the **Copy trait** that is sued by **types** like integers that are stored **only in the stack**.  You don't have to think about ownership if the type has the Copy trait, because in this case, value is not in the heap.

**So what types are Copy?**
- All the integer types, such as u32.
- The Boolean type, bool, with values true and false.
- All the floating point types, such as f64.
- The character type, char.
- Tuples, but only if they contain types that are also Copy. For example, (i32, i32) is Copy, but (i32, String) is not.

### How Rust ownership is handling allocation in the heap

### Ownsership rules
- Each **value** in Rust has a **variable** that’s called its **owner**.
- There can only be **one** owner at a time.
- When the owner goes **out of scope**, the value will be **dropped**

Let's explore en example with String type :

```rust
{
    // "s" is valid from this point forward and is the "owner" of "Hello" value stored in the heap.
    let s = String::from("hello"); 
    
    // do stuff with "s"
    
} // this scope is now over, and "s is no longer valid : Rust drop the value automatically here.
```

A scope is the range within a program for which an item is valid. Scope in Rust is delimited by curly brackets. "String::from("hello")" is requesting an allocation in the heap. Rust calls a special **drop** functon automatically at the closing curly bracket. This is when Rust drop the "hello" value from the heap and give back the memory to the OS. 

### Move

🚨But this code will throw an error : 

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
    // Rust compiler do not allow us to call s1 here, because we have assigned s1 value to s2 !
    println!("{}", s1)
}
```
This will display this error : **use of moved value s1**

```sh
error[E0382]: use of moved value: `s1`
  --> src/main.rs:14:20
   |
13 |     let s2 = s1;
   |         -- value moved here
14 |     println!("{}", s1)
   |                    ^^ value used here after move
```

That's because when we do "let s2 = s1", Rust copy **only** the stack data, not the value from the heap ! so "s2" and "s1" have actually a pointer toward the same value. 

<img src="https://doc.rust-lang.org/book/second-edition/img/trpl04-02.svg" width="400px" />

s1 can **not** be used anymore after s2 declaration, because s1 and s2 would be **two owners** for the same value in the heap allocation, and Rust allow only **one owner**. 

That is exactly what ownership is all about, and that's precisely how Rust can ensures us at **compile time** that nothing wrong can happen with memory allocation during **run time**.

> 💡 Note: it is still possible to copy value from the **stack** AND the **heap** using "clone"

```rust
let s1 = String::from("hello");
let s2 = s1.clone();
```




