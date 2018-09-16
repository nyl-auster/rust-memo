# Durée de vie des variables

:::warning NOTA BENE
La durée de vie et la portée des variables est une notion qui, l'air de rien, va  permettre de comprendre facilement les notions de **propriété** et **d'emprunt**, cette partie requiert donc, cher lectrice ou lecteur, une attention bien particulière de ta part.
:::

## Définition de la portée

Un _bloc_ est une portion de code comprise entre deux accolades. **Les variables existent uniquement le temps du _bloc_ dans lequel elles ont été déclarée**. Leur *durée de vie* est délimité par le bloc.

```rust
fn main() {
    // la variable "x" n'exite pas encore ici
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

Si une variable n'est pas accessible en dehors de son bloc de déclaration, c'est que **Rust supprime automatiquement, à chaque fois qu'il rencontre une accolade fermante, les variables qui ont été déclarées au sein de ce bloc.**

C'est grâce à ce principe de base que Rust peut nettoyer automatiquement la mémoire allouée par le programme; sans utiliser de *ramasse-miettes* (Garbage collector), ni demander au développeur de libérer manuellement la mémoire. 

Dès que le programme rencontre une accolade fermante, Rust appelle automatiquement, si nécessaire, la méthode **Drop** (parfois appelée "destructeur") pour chaque variable du bloc de code concerné, qui a pour mission de supprimer les valeurs stockées dans le tas.

⚠️ Cela vaut pour toute accolade fermante : que soit la fin d'une fonction ou des accolades au sein d'une fonction.

Dans l'exemple ci-dessus, Rust sait qu'il peut supprimer "hello" de la mémoire du tas; car seul "s" utilise la valeur "hello" dans la portion de code entre les deux accolades.

## durée de vie (lifetime) et portées implicites.

### Lien entre portée et durée de vie

La notions de **durée de vie** des variables et de **portée** sont étroitement liées.

Par défaut la durée de vie d'une variable comment à sa déclaration avec le mot clef `let` jusqu'à l'accolade fermante du bloc dans lequel elle est déclarée :

```rust
{ // x n'existe pas encore
  // x n'existe toujours pas
  let x = 1; // x existe   // |
  println!("{}", x)        // | durée de vie de "x"
                           // |
} // x n'existe plus
```

Rust déduit donc la durée de vie par défaut d'une variable des accolades de son bloc de déclaration.

### Le cas des références

Mais dans le cas des **références**, pour satisfaire à la garantie de sûreté de la mémoire; Rust peut avoir besoin d'indications supplémentaires pour être certain que la référence ne pointe pas vers une variable qui n'existe plus, ou vers une valeur qui n'est plus la valeur originellement pointée : c'est à ça que servent les **durées de vie explicites.**

Ainsi, quand Rust ne peut garantir avec certitude à la compilation qu'une variable ou valeur possède une durée de vie supérieure ou égale à ses références; le compilateur produira une erreur nous incitant à expliciter la durée de vie minimale des variables. Il s'en servira pour libérer la mémoire d'une manière qui garantit l'absence d'erreur au moment de l'éxécution.

C'est le **vérificateur d'emprunt** ( Borrow checker ) qui est chargé d'assurer que la variable vers laquelle pointe une référence existe au moins aussi longtemps que la référence elle-même. En effet, en Rust, on considère une référence comme un "emprunt" d'une valeur à une variable. Cette notion est détaillées dans le chapitre sur la **propriété**.

#### Les Portées implicites

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
        // le compilateur refuse cette possibilité et provoque une erreur.
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
