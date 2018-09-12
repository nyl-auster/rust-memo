
# Portée des variables

Les portées joue un rôle crucial dans la **propriété** et les **temps de vie**. Ce sont notamment elles qui indiquent au compilateur quand allouer et libérer la mémoire.

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

Dans l'exemple ci-dessus, Rust sait qu'il peut supprimer "hello" de la mémoire du tas; car seul "s" utilise la valeur "hello" dans la portion de code entre les deux accolades. 


## durée de vie (lifetime) et portées implicites.

### Lien entre portée et durée de vie

La notions de **durée de vie** des variables et de **portée** sont étroitement liées.

Par défaut la durée de vie d'une variable comment à sa déclaration avec le mot clef `let`  jusqu'à l'accolade fermante du bloc dans lequel elle est déclarée :

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

car les portées implicites deviennent alors  :

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
