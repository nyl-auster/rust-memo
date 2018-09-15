# Propriété( Ownership )

:::danger ATTENTION    
⚠️ Ce chapitre **requiert** une connaissance à propos de la gestion de l'allocation mémoire par un programme avec la _pile_ (stack) et le _tas_ (heap). [Voir annexe: la pile et le tas](annex-stack-and-heap.md).
:::

La _propriété_ est un principe essentiel et unique de Rust qui permet de gérer de manière très performante et fiable l'allocation et la libération de la mémoire du _tas_ par votre programme.

:::warning NOTA BENE
Le concept de _propriété_ et de _transfert de propriété_ concerne uniquement les variables dont la valeur est stockée **dans le tas (heap)** !
:::

La _propriété_ permet à Rust de n'avoir besoin ni de _Garbage Collector_, ni de demander au développeur d'allouer et libérer lui même la mémoire du tas.

Enfin, grâce à ce principe, Rust peut **garantir à la compilation** qu'**il n'y aura pas d'erreur mémoire au moment du "run time"** ( pas de double libération de la mémoire ou de pointeur vers un espace vide ou une mauvaise valeur).

## Portée des variables

En rust, les variables existent uniquement le temps de leur _bloc_. Un _bloc_ est une portion de code comprise entre deux accolades. La portée d'une variable en Rust est donc tout simplement déterminée par les accolades qui l'entourent.

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

Dans l'exemple ci-dessus, Rust sait qu'il peut supprimer "hello" de la mémoire du tas; car seul "s" utilise la valeur "hello" dans la portion de code entre les deux accolades.

## Propriété et "déplacement de valeur"

Voici comme est stockée la valeur "hello" en Rust avec le type complexe **String** ( un morceau de texte UTF-8 qui peut grandir )

- à gauche, la **pile** qui contient les métadonnées de la variable (pointeur, longueur, capacité)
- à droite le **tas** qui contient la valeur.

```rust
let s1 = String::from("hello");
```

<img width="300px" src="./images/ownership-figure-a.svg" />

Voyons ce qu'il se passe si nous écrivons :

```rust
let s1 = String::from("hello");
// on assigne la valeur de s1 à s2.
let s2 = s1;
```

Cette assignation de _s1_ à _s2_ se traduit par l'allocation de mémoire suivante :

<img width="300px" src="./images/ownership-figure-b.svg" />

Les métadonnés de la **pile** sont **copiées** mais pas la valeur de du **tas** ! Pour des raisons de performance et par défaut, Rust ne copie que les métadonnées de la **pile** pour créer cette seconde variable; et s1 et s2 ont toutes les deux un pointeur vers la même valeur dans la pile.

Nous voilà donc ici avec deux "**propriétaires**" de la valeur "hello"; c'est précisément ce qui est **interdit en Rust** pour garantir une absence d'erreur de pointeur et de mémoire au moment du run-time.

C'est pourquoi Rust décide dans ce cas de **transfèrer la propriété de la valeur de s1 à la variable s2** : c'est à dire qu'on n'est plus autorisé à appeler _s1_ à ce moment là. On dit aussi que la valeur "s'est déplacée" (**moved**) de s1 à s2 parce que du point de vue du code, on ne peut plus afficher la valeur avec s1 : c'est comme si la valeur "hello" s'était déplacée de _s1_ à _s2_.

<img width="300px" src="./images/ownership-figure-c.svg" />

Que se passe-til concrètement si on essaie d'appeler _s1_ après l'assignation à _s2_ ? Le compilateur nous jettera une erreur "value moved here"

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

Quand Rust rencontre l'accolade fermante de la fonction main() ci-dessus, il peut supprimer en toute sécurité la valeur "hello" du **tas** car il est certain que seule la variable _s2_ s'en servait; et elle est désormais hors de portée.

Note : il est possible, si nécessaire, d'utiliser la méthode **clone** pour copier une variable **entièrement**, c'est à dire en duppliquant également la valeur du tas. Il sera alors tout à fait possible de continuer à appeler s1 car on obtient alors l'utilisation suivante de la mémoire :

```rust
let s1 = String::from("hello");
let s2 = s1.clone();
```

<img width="300px" src="./images/ownership-figure-d.svg" />
 
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

<img width="500px" src="./images/ownership-figure-e.svg" />

> 💡 l'opposé de la référence et la dé-référence avec l'operateur \*. Plus de détails plus tard à ce sujet.

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

<img width="500px" src="./images/string-slice-figure-a.svg" />

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
