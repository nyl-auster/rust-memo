# Les 3 segments de mémoire les plus utilisés par un programme

Un programme a à sa disposition plusieurs types de mémoire pour manipuler lire ou écrire des données.

- La pile d'éxécution ( _stack_ )
- Le tas ( _heap_ )
- Le fichier binaire final.

## La pile d'éxécution et le tas

Si des langages tels que PHP ou JavaScript nous permettent de coder sans nous soucier de la gestion de la mémoire (c'est tout l'intérêt du Garbage Collector), il en est pas de même en Rust : bien comprendre la disctinction entre la pile et le tas permet de comprendre comment il gère la mémoire.

**🚨 Une variable en Rust ne se comportera pas de la même manière selon que sa valeur soit stockée dans le tas ou dans la pile d'éxécution.**

## La pile d'éxécution

> _représentation naïve du principe de base d'une pile_ > <img width="500px" src="images/stack.png" />

La mémoire de la pile d'éxécution a une mission principale : mémoriser la fonction du programme actuellement en cours d'éxécution et savoir à quelle partie du code ( l'_adresse de retour_ ) retourner une fois cette fonction termnée.

> 💡 Il serait plus exact de parler de sous-programme (subroutine) que de fonction : c'est à dire une portion de programme qui peut s'éxécuter indépendamment du reste du programme. Une fonction est un type de sous-programme.

Son nom de "pile" vient du fait, que la donnée tout en haut de la pile est toujours la prochaine adresse de retour où le programme doit se rendre. Il suffit donc de "dépiler" (pop) pour connaître la prochaine étape. Cette opération est très rapide.

La pile stocke aussi les informations dont a besoin la fonction (ou le sous-programme ) pour s'éxécuter, comme par exemple les variables locales ou les arguments de la fonction.

Par exemple, supposons le pseudo code suivant :

```rust
fn DrawSquare() {
  Drawline(pointA, pointB);
  // ... reste du code pour construire un carré
}
```

La pile d'éxécution correspondant à cette portion de code peut être schématisée ainsi :

<img width="500px" src="images/stack-instance.svg" />
> source : [https://en.wikipedia.org/wiki/Call_stack](https://en.wikipedia.org/wiki/Call_stack)

On voit ici qu'en réalité la pile est composées de **trames** (_frames_). On voit en <strong style="color:green;">vert</strong> la trame pour éxécuter `Drawline(pointA, pointB);` et en <strong style="color:blue;">bleu</strong> la trame pour éxécuter `DrawSquare`.

Les pointeurs (_Stack pointer_ et _Frame pointer_) permettent de savoir ce qui est actuellement en cours d'éxécution et où se trouve l'adresse de retour de la prochaine instruction de code à éxécuter.

## Le tas

La plupart des programmes ont besoin, au cours de leur exécution, d'allouer dynamiquement de la mémoire de manière non-prédictible, puis de la restituer au système.

Par exemple, si on propose à un utilisateur de rentrer un long texte en markdown, sans limite de caractères, et qu'on veut lui afficher en temps réel une prévisualisation du rendu final de son texte. On ne connaît alors pas la taille finale du texte; mais on a pourtant besoin de le stocker au fur et à mesure en mémoire pour pouvoir générer puis afficher le rendu markdown.

Il faut dans ce genre de cas allouer de la mémoire sur le **tas** , puis libérer cette mémoire quand cette variable n'a plus d'utilité.

[ A compléter ]
