# Les types de données

## Qu'est ce qu'un type de donnée ?

En programmation, quand on déclare une variable, elle toujours d'un certain **type** : il peut s'agir d'un _booléen_, d'un _nombre_, ou d'une _chaîne de caractères_... Mais aussi de types plus complexes comme des *tableaux*, des *collections*, des *objets* ... C'est ce qu'on désigne par **types de données**.

Dans la mémoire de l'ordinateur, la valeur d'une variable est toujours stockée dans un emplacement mémoire sous forme d'une **séquence de bits** , comme par exemple `11000000` ( on a ici 8 _bits_, soit un _octet_). Du point de vue de la machine, il n'y a pas de _nombres_, de _chaînes de caractères_ ou de _booléen_, seulement des séquences de bits, plus ou moins longues.

C'est le langage de programmation qui **interprète** ensuite ces séquences de bits comme étant un _nombre_, une _chaîne de caractères_ ou autre; en lui assignant justement un **type** : ainsi le programme ne stocke pas simplement la valeur `11000000` en mémoire; mais aussi le type de donnée que cet octet (ou plusieurs octets) représente pour lui; afin de savoir comment l'interpréter.

L'interprétation de `11000000` dépend du type qui lui est asigné. Si le type est "entier non-signé" (`u8` en Rust ), la séquence de bits sera interprétée comme un nombre décimal valant **192**

:::tip EXPLICATION
```rust 
(2^7 + 2^8) = 192
```
:::

Si le type était en entier **signé** ( `i8` ), la séquence de bits sera interprétée comme le nombre décimal négatif `-64`

:::tip EXPLICATION
 Le bit le plus à gauche est utilisé pour indiquer si le nombre est négatif ou positif. On considère que `0` veut dire `+` et `1` veut dire `-`. Il nous reste ensuite seulement 7 bits pour le calcul:
 
 ```rust
 -(2^7) = -64
 ```
 :::

Sur la même logique, `11000000` pourrait aussi bien représenter un caractère de la norme ISO/CEI 8859-1, un emoji, ou tout autre chose que le langage aura décidé de lui faire représenter.

## Vue d'ensemble des types de données de Rust

On peut diviser les types de données de Rust en 4 grandes catégories, que l'on va voir en détail dans les chapitres suivant.

- **les primitifs atomiques**
- **les primitifs composés** ( collections de primitifs atomiques )
- **les collections**
- **les types personnalisés** (*custom*, crée par le développeur)
