# Durée de vie des variables

:::warning NOTA BENE
La durée de vie et la portée des variables est une notion qui, l'air de rien, va  permettre de comprendre facilement les notions de **propriété** et **d'emprunt**, cette partie requiert donc, cher lectrice ou lecteur, une attention bien particulière de ta part.
:::

## Définition de la durée de vie

Un **bloc** est une portion de code comprise entre deux accolades. Le code ci-dessous contient 2 paires d'accolades, donc 2 blocs de code.

```rust
fn main() {                        //-------------|
    let message = "hello world";   //             | bloc de la 
    {                              //---|         | fonction main()
        let x = 1;                 //   | second  |
        println!("{}", x);         //   | bloc    |
    }                              //---|         |
    println!("{}", message)        //             |
}                                  // ------------|
```

**Un variable existe uniquement le temps que _bloc_ decode dans lequel elle a été déclarée soit éxécuté** : le bloc n'est donc pas seulement un repère visuel pour le développeur, il définit aussi La **durée de vie**. Cela définit donc aussi la **portée** de la variable; qui est la portion de code où on peut accéder à la valeur de la variable.

La portée c'est la portion de code dans laquelle on peut accéder à la variable.


```rust
fn main() {
    // la variable "x" n'existe pas encore ici
    {
        let x = 7; // x est valide à partir d'ici
    }
    // l'accolade de son bloc se referme, x n'existe déjà plus ici !
    println!("{}", x);
}
```

La valeur de `s` n'étant plus accessible, le compilateur nous renvoie l'erreur suivante.

```sh
error[E0425]: cannot find value `x` in this scope
 --> src/main.rs:6:20
  |
6 |     println!("{}", x);
  |
```

Le code suivant est correct:

```rust
fn main() {
    // la variable "x" n'est pas valide ici, car pas encore déclarée
    {
        let x = 7; // x est valide à partir d'ici
        println!("{}", x);
    }
}
```

## Portées imbriquées

Ici, le bloc de déclaration de `y` sont les accolades de la fonction `main`; donc `y`  est valide jusqu'à la fin de la fonction. On peut l'appeler dans les sous-portées.

```rust
fn main() {
    let y = 35;
    {
        let x = 7; // s est valide à partir d'ici
        println!("{}", x);
        println!("{}", y);
    }
}
```

Cela fonctionnerait tout aussi bien avec n'importe quel nombre de sous-portées.

```rust
fn main() {
    let x = 7;
    {
        {
            {
                {
                    println!("{}", x); // c'est moche mais ça affiche bien 7 \o/
                }
            }
        }
    }
}
```

## Nettoyage automatique de la mémoire

Lorsqu'un le programme arrive à une accolade fermante, les valeurs des variables déclarée au sein de ce bloc sont libérées. Il y a deux cas de figures possibles :

1) La valeur de la variable est stockée dans la *pile* : en ce cas elle est supprimée automatiquement par la pile
2) La valeur de la variable est stocké dans le *tas* : dans ce cas Rust appelle automatiquement la méthode ****Drop** (parfois appelée "destructeur") de ce type de variable, qui a pour mission libérer la mémoire qui lui était allouée dans le tas.

Dans le deux cas, quand le programme arrive à  une accolade fermante, il libére automatiquement la mémoire des variables du bloc concerné. C'est le principe de base qu'utilise Rust pour libérer automatiquement la mémoire du tas; alors que cette opération est normalement soit manuelle ( en C et C++), soit du fait d'un ramasse-miettes ( PHP, JavaScript, Java).

## durée de vie (lifetime) et portées implicites.

## Le cas des références

Mais dans le cas des **références**, pour satisfaire à la garantie de sûreté de la mémoire; Rust peut avoir besoin d'indications supplémentaires pour être certain que la référence ne pointe pas vers une variable qui n'existe plus, ou vers une valeur qui n'est plus la valeur originellement pointée : c'est à ça que servent les **durées de vie explicites.**

Ainsi, quand Rust ne peut garantir avec certitude à la compilation qu'une variable ou valeur possède une durée de vie supérieure ou égale à ses références; le compilateur produira une erreur nous incitant à expliciter la durée de vie minimale des variables. Il s'en servira pour libérer la mémoire d'une manière qui garantit l'absence d'erreur au moment de l'éxécution.

C'est le **vérificateur d'emprunt** ( Borrow checker ) qui est chargé d'assurer que la variable vers laquelle pointe une référence existe au moins aussi longtemps que la référence elle-même. En effet, en Rust, on considère une référence comme un "emprunt" d'une valeur à une variable. Cette notion est détaillées dans le chapitre sur la **propriété**.

## Les Portées implicites

Rust crée en réalité une **portée implicite** pour chaque déclaration `let`. Cette portée commence juste avant au mot clef `let` et se termine juste avant que la variable sort de la portée **explicite**

Le code suivant permet de mettre en avant l'existence des portées implicites en fonction du mot clef let.

```rust
fn main() {
    let r;
    let x = 5;
    r = &x;
}
```

Ce code est interprété comme :

```rust
fn main() { // début portée explicite de main()
    { // "let r" ouvre une portée implicite ici
        let r;
        { // "let x" crée une autre porté implicite ici
            let x = 5;
            r = &x;
        } // la portée implicite de x est refermée ici, car on arrive
          // à la fin de la portée explicite. "x" est détruit ici.

        // 🚨 "r" sera encore vivant ici, mais pas "x" =>
        // le compilateur refuse cette possibilité et provoque une erreur,
        // Car pour garantir la sûreté de la mémoire, il faut 
        // que "x" vive au moins aussi longtemps que "r"
    }
}
```

Si on déclare le `let r` de la manière suivante, l'erreur disparaît :

```rust
fn main() {
    let x = 5;
    let y = &x;
}
```

car les portées implicites deviennent alors :

```rust
fn main() {
    { // "let x" crée une portée implicite
        let x = 5;
        { // "let y" céer une portée implicite compris dans celle de x
            let y = &x;
        } // y est détruit ici, x existe encore donc pas d'erreur.
    } // x est détruit ici
}
```

C'est ce que veut nous dire le compilateur quand il indique : "Always keep in mind that values in a scope are dropped in the opposite order they are
created" : les portées implicites ci-dessus montre bien que `x` est déclaré en premier et jeté en dernier : premier déclaré = dernier détruit.
