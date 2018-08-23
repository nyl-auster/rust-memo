
*La seconde édition du livre de Rust résumé en une seule (grosse) page - work in progress. Le livre original [est disponible ici (en anglais)](https://doc.rust-lang.org/book/second-edition/index.html)*

# Commencer rapidement Rust

## installation

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

## Hello world

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

# Gestion des paquets

## Cargo

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

## Installation d'un crate

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

# Concepts généraux

## Variables et mutabilité

### Immutabilité

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

### Exemples de déclaration de variables

Un survol rapide des types de données couramment utilisées en Rust. Les détails concernant l'utilisattion de chaque type seront données plus bas.

Entiers :

```rust
// Un nombre immutable avec le type par défaut qui est i32 ( 32 bits qui peut être positif ou négatif) 
let a = 42;

// Déclarer un nombre immutable compris en 0 et 255.
let x: u8 = 42;

// déclarer un nombre mutable
let mut y = 27;
```

Flottants:

```rust
let x: f64 = 37.2
```

Vecteurs - une collection agrandissable de valeurs d'un même type :

```rust
let ids = vec![18, 21, 36, 98];
ids.push(101);

// affiche [18, 21, 36, 98, 101]
println!("{:#?}", ids);
```

Les chaînes de caractères

```rust
// créer une string de taille fixe et immutable appelée "slice" : son  type est *&str* . 
/// Il n'est PAS possible de l'agrandir ultérieurement.
let greeting = "Hello there.";

// la macro "format!" est la plus pratique pour créer une chaîne
// de caractères agrandissable à volonté (type "String") et 
// y insérer des variables 
let my_string = format!("les valeurs sont : {} {} {}", a, x, y);

// concaténation de slices avec "format!" :
let hello = "hello";
let world = "world";
let my_string = format!("{} {}", hello, world);

// On peut aussi déclarer un type String de la manière suivante :
let mut s = String::from("Hello");
s.push_str(", world.");
println!("{}", s); // display "Hello, world."
```

Structures :

```rust
// l'annotation debug permettra d'afficher l'objet 
// avec "println!("{:#?}", user)"
#[derive(Debug)]
struct User {
    name: String,
    id: u64,
}

fn main() {
    let user = User {
        name: String::from("Yann"),
        id: 99,
    };
    println!("{:#?}", user)
}

```

> 💡 Il est possible de "shadow" une variable en ré-utilisant le mot clef let.

```rust
let my_var = 5;
let my_var = 6;
```

## 💡déboguer les variables avec les placeholders de "println!"

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

## [Annexe] Qu'est ce qu'un type de donnée et une valeur ?

source : http://gradebot.org/doc/ipur/type.html

Les ordinateurs stockent leurs données dans la mémoire. La mémoire consiste en une séquence d'octets, qui stockent chacun 8 bits. Un octet est la plus petite unité de mémoire qu'un ordinateur peut lire ou écrire; and un *bit* est la plus petite unité de données (0 ou 1).

Un octet peut représenter différents types de données. Par exemple un octet peut représenter en entier non-signé de 8 bits, un entier signé de 7 bits ou un caractère ASCII. Un **type** définit un ensemble de valeurs valides et d'opération sur ces valeurs. Par exemple, le type `u8` définit des valeurs qui vont de 0 à 255 et les opérations mathématiques sur ces valeurs.

Les types déterminent comment le compilateur traduit les octets en mémoire en valeur. Par exemple, si un octet stocke la séquence de bit ```10000000```, le compilateur l'interprète comme :

- un entier 128 **si le type est `u8`**
- un entier -128 **si le type est `i8`**

On peut diviser les types en 3 catégories :

- les types primitifs atomiques
- les types primitifs composés
- les types personnalisés (custom)

### les types primitifs atomiques

Il sont définis par le compilateur et ne peuvent pas être personnalisés par l'utilisateur. Le compilateur implémentent le trait `Copy` sur ces types. ( Note de traduction : ce trait `Copy` joue un rôle clef dans la compréhension de la *propriété* qu'on voit plus bas ).

- booléen :  `bool` 
- entiers signés : `i8` `i16` `i32` `i64`, `isize`
- entiers non-signés : `u8` `u16` `u32` `u64`, `usize`
- nombres flottant : `f32` `f64`

[ to be continued ... http://gradebot.org/doc/ipur/type.html#textual-types ]

## Les types de donnés en Rust

### Type scalaires

Il existe quatre types scalaires de données. Un type scalaire représente une données "atomique" par opposition à des types composés - comme des types listant plusieurs valeurs tels que *array*, *tuple* ou *String* (une String est une liste de *characters* )

- integers
- floating-point numbers
- Booleans
- characters

> 💡 Note : ces types de données scalaires sont stockés uniquement dans la pile et supprimer de la pile lorsqu'il sont hors de portée. ( plus de détails plus bas concernant la *pile* et le *tas*)

#### Le type entier

```rust
let x = 142; // sera du type "entier 32 bits" par défault
let y: u8 = 142;  // type entier non-signé 8 bits
```

|longueur|  signé | non-signé| valeur maximale en décimal non signé
|--------|--------|----------|----
|8-bits  | i8     | u8       | 256
|16-bits | i16    | u16      | 65 536
|32-bits | i32    | u32      | 4 294 967 296
|64-bits | i64    | u64      | 1,844674407370955e19
|arch    | isize  | usize    | dépend de l'architecture


> 💡 isize et usize dépendent du type d'ordinateur sur lequel tourne le programme : 64 bits si vous êtes sur une architecture 64 bits, 32 bits si vous êtes sur une architecture 32 bits.

> 💡 Les entiers sont par défault du type i32 parce que c'est généralement le type le plus performant.

#### Type nombre à virgule flottante

```rust
let x = 2.0; // f64 par défault
let y: f32 = 142.567890; // flottant 32 bits
```

|longueur|notation|
|--------|--------|
|32-bits | f32    |
|64-bits | f64    |

> 💡 Le type par défaut est *f64* parce que sur les CPUs moderne, il est quasimenet aussi rapidement que *f32* mais offre bien plus de précisions.

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

### Les types composés

Les types composés peuvent regrouper plusieurs valeurs dans un seul type. Rust propose deux types composés primitifs : les **tuples** et les **arrays**.

#### Le type tuple

```rust
// créer un tuple composé de différents types simples
let tup: (i32, f64, u8) = (500, 6.4, 1);

// lire les valeurs du tuple
let (x, y, z) = tup;

println!("The value of y is: {}", y); // affiche 6.4
println!("{}", tup.1); // affiche aussi 6.4
```
#### Le type array

Unlike a tuple, every element of an array must have the same type.

Contrairement au *tuple*, chaque élément d'un *array* **doit être du même type**.

```rust
let a = [1, 2, 3, 4, 5];
// accédérer à la première et à la deuxième valeur du tableau.
let first = a[0];
let second = a[1];
```
> ⚠️ **les arrays ont une longueur fixe !**: une fois déclaré, leur taille ne peut pas s'agrandir ou se réduire. On verra plus tard le type **vectors** dont la taille peut varier dynamiquement.

## Fonctions 

> 💡Note : Rust peut accéder à vos fonctions quel que soit l'endroit de leur déclaration.

### exemples

Vous **devez** déclarer le type de valeur retournée avec une flèche. Si vous ne le faites pas, Rust considérera que votre fonction retourne par défaut un *tuple* vide "()".

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

### Pièges pour les débutants

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

### La différente entre arguments et paramètres

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

### La différente entre les expressions et les déclarations

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

## Contrôle de flux

### les expressions if

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

### boucles

#### loop

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

#### while

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

#### for

> 💡 For est l'une des constructions de boucles les plus utilisées en Rust pour sa concision.

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

# Propriété( Ownership ) 

> ⚠️ Ce chapitre **requiert** une connaissance basique à propos de la gestion de l'allocation mémoire avec la *pile* (stack) et le *tas* (heap). [Voir annexe: la pile et le tas](annex-stack-and-heap.md).

La *propriété* est un principe essentiel et unique de Rust qui permet de gérer de manière très performante et fiable l'allocation et la libération de la mémoire du *tas* par votre programme. 

> 🚨 Le concept de *propriété* et de *transfert de propriété* concerne uniquement les variables dont la valeur est stockée **dans le tas (heap)** !

La *propriété* permet à Rust de n'avoir besoin ni de *Garbage Collector*, ni de demander au développeur d'allouer et libérer lui même la mémoire du tas.

Enfin, grâce à ce principe, Rust peut **garantir à la compilation** qu'**il n'y aura pas d'erreur mémoire au moment du "run time"** ( pas de double libération de la mémoire ou de pointeur vers un espace vide ou une mauvaise valeur). 

## Portée des variables et libération de la mémoire du tas.

En rust, les variables existent uniquement le temps de leur *bloc*. Un *bloc* est une portion de code comprise entre deux accolades. La portée d'une variable en Rust est donc tout simplement déterminée par les accolades qui l'entourent. 

Une variable n'est utilisable qu'à l'intérieur de son bloc; elle est "hors de portée" pour les autres portions de code, qui ne pourront pas y accéder.

Dès que le programme rencontre une accolade fermante, Rust appelle automatiquement, si nécessaire, la méthode **Drop** (parfois appelée "destructeur") pour chaque variable du bloc de code concerné, qui a pour mission de supprimer les valeurs stockées dans le tas.

```rust
{ // la variable "s" n'est pas valide ici, car pas encore déclarée

    let s = String::from("hello");;   // s est valide à partir d'ici
    
} // "s" est hors de portée : elle n'est plus valide à partir d'ici. 
// Rust appelle donc la fonction Drop() et la mémoire qu'elle 
// occupe sur le tas est automatiquement libérée !
```

⚠️ Cela vaut pour toute accolade fermante : que soit la fin d'une fonction ou des accolades au sein d'une fonction.

Dans l'exemple ci-dessus, Rust sait qu'il peut libérer la mémoire car seul "s" utilise la valeur "hello" dans la portion de code entre les deux accolades. 

## Propriété et "déplacement de valeur"

Voici comme est stockée la valeur "hello" en Rust avec le type complexe **String** ( un morceau de texte UTF-8 qui peut grandir )

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

Les métadonnés de la **pile** sont **copiées** mais pas la valeur de du **tas** !  Pour des raisons de performance et par défaut, Rust ne copie que les métadonnées de la **pile** pour créer cette seconde variable; et s1 et s2 ont toutes les deux un pointeur vers la même valeur dans la pile.

Nous voilà donc ici avec deux "**propriétaires**" de la valeur "hello"; c'est précisément ce qui est **interdit en Rust** pour garantir une absence d'erreur de pointeur et de mémoire au moment du run-time.

C'est pourquoi Rust décide dans ce cas de **transfèrer la propriété de la valeur de s1 à la variable s2** : c'est à dire qu'on n'est plus autorisé à appeler *s1* à ce moment là. On dit aussi que la valeur "s'est déplacée" (**moved**) de s1 à s2 parce que du point de vue du code, on ne peut plus afficher la valeur avec s1 : c'est comme si la valeur "hello" s'était déplacée de *s1* à *s2*.

<img width="300px" src="images/ownership-figure-c.svg" />

Que se passe-til concrètement si on essaie d'appeler *s1* après l'assignation à *s2* ? Le compilateur nous jettera une erreur "value moved here"

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
    // Rust ne nous autorise plus à appeler s1 ici, 
    // Parce que la valeur a été transférée à s2 !
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

Quand Rust rencontre l'accolade fermante de la fonction main() ci-dessus, il peut supprimer en toute sécurité la valeur "hello" du **tas** car il est certain que seule la variable *s2* s'en servait; et elle est désormais hors de portée.

Note : il est possible, si nécessaire, d'utiliser la méthode **clone** pour copier une variable **entièrement**, c'est à dire en duppliquant également la valeur du tas. Il sera alors tout à fait possible de continuer à appeler s1 car on obtient alors l'utilisation suivante de la mémoire :

```rust
let s1 = String::from("hello");
let s2 = s1.clone();
```

<img width="300px" src="images/ownership-figure-d.svg" />
 
## Les types qui ne sont PAS concernés par la notion de propriété

Les types dont la valeurs est stockée uniquement dans la **pile** ne sont **pas** concernés par la notion de propriété; puisque la propriété ne sert qu'à gérer l'allocation de la mémoire du tas. Les types suivants ne sont pas concernés par la propriété. 

- Les entiers
- Les booléens
- Les nombres à virgule flottante
- Les caractères
- Les types, mais seulement si ils contiennent uniquement des types simples. Par exemple, (i32, i32); mais pas (i32, String).

## Propriété et fonctions

**🚨 Passer une variable en tant qu'argument à une fonction a exactement les mêmes conséquence qu'une assignation, du point de vue de la propriété !** 

Comme pour une assignation de type "s1 = s2", il y aura donc, comme tout à l'heure, soit "copie" de la valeur (pour les type simples avec valeur stockée dans la pile), soit "déplacement de la valeur" (pour les types dont la valeur est stockée dans le tas)

```rust
fn main() {
    // "s" arrive dans la portée
    let s = String::from("hello");  
    
    // "s" est de type "String" : sa valeur est stockée dans le tas
    // La valeur "hello" est déplacée à l'intérieur de la fonction takes_ownership.
    takes_ownership(s);     
           
    // donc à partir d'ici , on ne peut plus appeler "s", qui n'est plus
    // propriétaire de la valeur "hello"

    // "x" arrive dans la portée
    let x = 5;
    
    // "x" est un type dont la valeur est stockée dans la pile.
    // Il n'y a donc pas de notion de transfert de propriété :
    // la fonction reçoit dans ce cas une copie de la variable
    makes_copy(x);
    // Si bien qu'on peut toujours utiliser "x" normalement ici !                  

} // Ici, "x" devient hors de portée, puis "s". Mais comme la valeur de
// "s" a été déplacée dans la fonction takes_ownership, il ne se passe rien
// de spécial ici concernant la gestion de la mémoire du tas.


fn takes_ownership(some_string: String) { // "some_string" arrive dans la portée
    println!("{}", some_string);
} // Ici, "some_string" devient hors de portée, la fonction "drop" est appelée automatiquement par Rust : 
// la valeur "hello" est supprimée du tas et donc la mémoire correspondante est libérée

fn makes_copy(some_integer: i32) { // "some_integer" arrive dans la portée
    println!("{}", some_integer);
} // "some_integer" devient hors de portée. Le tas n'est pas concerné, rien de spécial n'arrive ici
```

## Valeurs retournées par une fonction et portée

**Retourner des valeurs depuis une fonction a aussi les mêmes conséquences qu'une assignation du point de vue la propriété.** La valeur retournée est donc là aussi soit copiée, soit déplacée.

```rust
fn main() {
    // "gives_ownership()" retourne la String "hello". Sa valeur est transférée
    // à "s1" qui en devient le propriétaire.
    let s1 = gives_ownership();         

    let s2 = String::from("hello");     // s2 arrive dans la portée

    let s3 = takes_and_gives_back(s2);  // s2 est déplacée dans
                                        // takes_and_gives_back, qui à son tour
                                        // transfère sa valeur de retour dans s3
} // accolade fermante ! s3 sort de la portée et est jetée. 
// s2 sort de la portée mais sa valeur a été transférée à la fonction takes_and_gives_back
// donc il ne se passe rien.
// s1 sort de la portée et est jetée.

fn gives_ownership() -> String {           
    let some_string = String::from("hello"); // "some_string" arrive dans la portée
    some_string
}

fn takes_and_gives_back(a_string: String) -> String { // a_string arrive dans la portée
    a_string  // a_string est retournée et se déplace dans la fonction qui appelle notre fonction.
}
```

## Visualiser le drop en action 

Le code suivant permet de voir affiché le moment où Rust appelle la fonction "drop", qui correspond au moment où il libère la mémoire.

```rust
fn main() {
    // on appelle user(), mais on assigne pas son retour à une variable.
    user();
    println!("{}", "fin de la fonction main");
}

// on créer une structure simple pour pouvoir implémenter dessus la méthode "Drop"
// qui nous permettra de voir le drop en action.
struct User {
    name: String,
    age: u8,
}

/**
 * On implémente la fonction drop sur notre structure User
 */
impl Drop for User {
    fn drop(&mut self) {
        println!("drop User!");
    }
}

fn user() -> User {
    let yann = User {
        name: String::from("yann"),
        age: 35,
    };
    println!("{}", "fin de la fonction user");
    yann
} // drop sera appelée ici pour supprimer l'instance User "yann" , car notre
// code de la fonction main() n'a pas assigné dans une variable le retour de cette fonction.
// La valeur n'a donc pas été déplacée et Rust la supprime donc en rencontrant l'accolade fermante
```

Le code ci-dessus affichera :

```sh
fin de la fonction user
drop User!
fin de la fonction main
```

La fonction drop est appelée à la fin de la fonction User puisqu'une accolade fermante est rencontrée. 

En revanche, dans l'exemple ci-dessous, drop() ne sera **pas** appelée à la fin de User mais à la fin de main(): la valeur de la fonction user() a été "déplacée" dans la variable "user" de la fonction main(). Si bien que Rust n'a plus de valeur à "nettoyer" concernant la fonction user(). 

```rust
fn main() {
    let user = user();
    println!("Name :{}. Age : {}", user.name, user.age);
    println!("{}", "fin de la fonction main");
}

struct User {
    name: String,
    age: u8,
}

impl Drop for User {
    fn drop(&mut self) {
        println!("drop User!");
    }
}

fn user() -> User {
    let yann = User {
        name: String::from("yann"),
        age: 35,
    };
    println!("{}", "fin de la fonction user");
    yann
} // le retour de la fonction a été assignée à une variable dans la fonction
// main() : drop() n'est pas appelée ici car la valeur a été transférée à la variable
// user de la fonction main().

```

Le code ci-dessus affiche en sortie :

```sh
fin de la fonction user
Name :yann. Age : 35
fin de la fonction main
drop User!
```

La sortie confirme bien que le drop est appelée à la fonction main() et pas à la fin de la fonction user().

## Référence et emprunt

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
 
## Références mutables : n immutable or 1 mutable. Period.

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

## pointeur foireux

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

## Le Type Slice (tranche)

Une tranche permet de référencer ( pas de transfert de propriété ) une séquence d'éléments au sein d'une collection (plutôt que la collection toute entière).

### String slice

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

# Créer des types personnalisés avec les structures (Structs)

## Déclarer une structure

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
## Implémenter une méthode sur la structure

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

On peut ensuite appelé notre *méthode* area() sur une **instance** de *Rectangle*

```rust
let my_rectangle = Rectangle {
    width: 2,
    height: 5,
};
let area_with_struct = my_rectangle.area();
```

## Créer une fonction associée

Les fonctions associées d'une structure s'ajoutent auss dans le bloc **impl** de la structure, mais ne prennent **pas** l'instance *&self* en premier paramètre. 

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

## Tuple struct

Rust a un type de donnée qui est comme un hybride de `tuple` et `struct`, appelé *tuple struct* . Un *Tuple struct* a un nom, mais pas ses champs. On rencontrera ce format au moment de voir les énumérations.

```
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

# Match

`match` est une expression puissante très souvent utilisée en Rust et qui permet de remplacer des groupes complexes de if / else. Chaque branche d'un match est de la forme `motif => expression` , et l'expression exécutée sera celle dont le **motif** correspond à la valeur fournie à `match`.


```rust
fn main() {

    let x = 2;
    
    let result = match x {
        0 => "zero",
        1 => "one",
        2 | 3 | 4 => "two, three, four",
        5...9 => "five -- nine",
        10 => {
            println!("on peut ouvrir des accolades également");
            "ten"
        }
        // "_° est un pattern spécial exécuté dans tous les autres cas.
        _ => "other",
    };
    
    // affiche "two, three four"
    println!("{}", result);
}
```

> ⚠️  toutes les branches d'un bloc `match` doivent retourner le **même type**.

`match` permet aussi de travailler avec les énumérations (voir prochain chapitre) :

```rust
enum Color {
    Red,
    Yellow,
    Blue,
}

fn main() {
    let my_favourite_color = Color::Yellow;
    let result = match my_favourite_color {
        Color::Red => "Rouge",
        Color::Yellow => "Jaune",
        Color::Blue => "Blue",
    };
    println!("{}", result);
}
```

# Énumérations 

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

- *soit* le résultat de la division
- *soit* un message d'erreur (une châine de caractère indiquant l'erreur rencontrée) si un nombre vaut `0`.

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

En réalité, Rust propose justement par défaut un enum `Result` pour ce cas de figure ! Il contient deux variantes : `Ok` et `Err`. Pour nous faciliter la vie, Rust nous autorise même à écrire juste `Ok`  et `Err` au lieu de `Result:Ok` et `Result:Err`. On peut donc réecrire notre code comme suit:

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

# Collections

## Vecteurs

Créér un nouveau vecteur contenant une collection d'entiers. On utilise ensuite la méthode `push` pour ajouter des éléments.

```rust
let mut suite: Vec<i32> = Vec::new();
suite.push(0);
suite.push(1);
```

La macro `vec!` permet d'écrire plus rapidement le code ci-dessus. Rust infère du code ci-dessous que le type est `Vec<i32>`.

``` rust
let mut suite = vec![0, 1];
```


 










