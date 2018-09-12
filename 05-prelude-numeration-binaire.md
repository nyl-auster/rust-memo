# Le système de numération binaire

Le système de numération binaire n'a en réalité rien de différent de notre système à 10 chiffres de tous les jours; il est même plus simple puisqu'il n'a que deux chiffres ( `0` et `1` ) eu lieu de 10 !

Comprendre le binaire, c'est donc comprendre notre système décimal habituel, c'est donc comprendre ce qu'est un _système de numération positionnel_ et pourquoi ça existe.

## La notion d'unité

Qu'est ce qu'un chiffre ? Un certaine quantité d'unités ou de "un" que l'on peut compter. Si on note "|" l'unité, voici comment décrire en unités les chiffres de notre système décimal.

```
0   =
1   = |
2   = ||
3   = |||
4   = ||||
5   = |||||
6   = ||||||
7   = |||||||
8   = ||||||||
9   = |||||||||
10 = ||||||||||
```

L'unité est toujours parfaitement égale à elle-même en toutes circonstances : tous les "|" inscrits ci-dessus sont strictement égaux les uns aux autres. Toute la la possibilité de compter et des mathématiques repose sur cette abstraction première qu'est **l'unité**.

Ce système de petits bâtons marche très bien pour les petites quantités mais on fait mal la différence au premier coup d'oeil entre `8` et `9`; et comment diable pourrait-on bien écrire `1000` sans y passer la journée?

## La notion de chiffre

La notation romaine est un des exemples de solutions apportés à ces problèmes. Pour signifier `10`, on peut écrire le symbôle `X` au lieu de `||||||||||`. Pour écrire `5` on peut écrire le symbole `V` au lieu de `|||||`.

Un symbole qui représente une accumulation d'unités est justement ce qu'on appelle un **chiffre**.

Un nombre tel que `30` devient alors rapide à écrire, il suffit d'écrire plusieurs fois le même symbole : `XXX`

Pour écrire facilement `100` ou `1000` , la notation romaine propose aussi des symboles spécifiques :

| symbole | équivalent dans notre système de numération décimal |
| ------- | --------------------------------------------------- |
| `I`     | 1                                                   |
| `V`     | 5                                                   |
| `X`     | 10                                                  |
| `L`     | 50                                                  |
| `C`     | 100                                                 |
| `D`     | 500                                                 |
| `M`     | 1000                                                |

Il devient relativement aisé grâce à cette table d'écrire de grands nombres tel que `1528`, en cumulant les symboles :

```
MDXXVIII
```

C'est une belle évolution par rapport aux petits bâtons :D

Mais le système n'est pas parfait non plus, si on s'en tient à ces symboles :

- Le nombre maximal romain (en trichant un peu) est `4999` qui s'écrit `MMMM DCCCC LXXXX VIIII` !
- Il faut donc inventer d'autres symboles pour continuer à créer des chiffres plus grands. Les romains ajoutaient des petits traits horizontaux et verticaux pour créer des multiplicateurs et s'affranchir des limites de leur système de numération.
- La longueur manuscrite d'un nombre romain n'a aucun rapport avec sa taille : `CCLXIII` = `263` tandis que `M` = `1000` ; ça ne permet pas non plus de résoudre aussi facilement par écrit, comme avec notre système, des additions, multiplications, des soustractions etc. Ni de créer facilement un compteur kilométrique mécanique pour une voiture :-p

## La notation positionnelle

C'est pourquoi notre système de numération actuel utilise la très astucieuse **notation positionnelle** qui résoud tous les problèmes précédemment évoqués; avec un ensemble très restreint de symboles.

Notre système de numération décimal utilisent un ensemble de 10 symboles, nommés chiffres, en utilisant la **notation positionnelle** : c'est à dire que la valeur d'un chiffre va changer en fonction de sa **position** dans le nombre. En réalité, chaque position implique un **multiplicateur caché**.

Prenons le chiffre `222` en décimal. Il est en réalité un nation raccourcie pour exprimer ce calcul mathématique :

```
(2 x 100) + (2 x 10) + (2 x 1)
```

Qu'on peut lire aussi comme "2 centaines + 2 dizaines + 2 unités". On voit que 2 est à _multiplier_ par 1, 10 ou 100 ( et ainsi de suit à l'infini ! ) en fonction de sa position. C'est la multiplication cachée en fonction de la position dont je parlais.

Un nombre représenté dans par _notation positionnelle_ est donc fondamentalement une manière d'écrire une **somme de multiplications** : à chaque position correspond une multiplication, puis on additionne le tout pour obtenir un résultat.

C'est comme un calcul mathématique dont on aurait enlevé les `+`et les `x` , tout simplement parce que c'est plus pratique à écrire et à manipuler sous la forme raccourcie : `222`.

On peut se représenter et nombre et ses positions comme autant de colonnes :

| nombre                               |         2 |         2 |        2 |
| ------------------------------------ | --------: | --------: | -------: |
| position du chiffre dans le nombre   |         3 |         2 |        1 |
| multiplicateur associé à la position |       100 |       10  |       1  |
| calcul à faire                       | `2 x 100` | `2 x 10`  | `2 x 1`  |
| valeur du chiffre                    |       200 |        20 |        2 |

Contrairement aux romains, on peut donc très facilement représenter de très grands nombres sans inventer de nouveaux symboles, juste avec une longue succession de chiffres dont la valeur se démultiplie grâce à la position : `1 567 847 987 211 544 878 980 765 876 090 764`

Nous disposons mathématiquement d'une notion plus pratique pour écrire nos multiplications cachées : 1, 10, 100, 1000, 10 000, 100 000 etc : ce sont les **puissances**; et en l'occurence les puissances de **10**.

Une puissance est une manière de répresenter un nombre qu'on multiplie par lui même. Par exemple `10 x 10 x 10 x 10` peut s'écrire en utilisant les puissances : `10^4`.

Les multiplicateurs cachés de notre système décimal positionnel sont donc plus simples à écrire sous forme de puissances :

| nombre  |                        | représentation en puissance |
| ------- | ---------------------- | --------------------------- |
| 1       |                        | 10^0                        |
| 10      | 10 x 1                 | 10^1                        |
| 100     | 10 x 10                | 10^2                        |
| 1000    | 10 x 10 x 10           | 10^3                        |
| 10 000  | 10 x 10 x 10 x 10      | 10^4                        |
| 100 000 | 10 x 10 x 10 x 10 x 10 | 10^5                        |

> 🚨 Nota bene : 10^0, ça fait `1`; et c'est vrai pour n'importe quel nombre à puissance 0. Donc la valeur du premier multiplicateur de toute numération positionnelle basé sur les puissances est nécessairement **1**

Prenons un autre exemple avec le nombre `432 687`

| nombre                               |          4 |           3 |           2 | 0          | 8          | 7          |
| ------------------------------------ | ---------: | ----------: | ----------: | ---------- | ---------- | ---------- |
| position du chiffre dans le nombre   |          6 |           5 |           5 | 3          | 2          | 1          |
| multiplicateur associé à la position |    100 000 |     10 000  |      1 000  | 100        | 10         | 1          |
| multiplicateur exprimé en puissance  |       10^5 |       10^4  |       10^3  | 10^2       | 10^1       | 10^0       |
| calcul à faire                       | `4 x 10^5` | `3 x 10^4`  | `2 x 10^3`  | `0 x 10^2` | `8 x 10^1` | `7 x 10^0` |
| valeur du chiffre                    |    400 000 |      30 000 |       2 000 | 0          | 80         | 7          |

A la troisième position, nous avons un `0` : on s'aperçoit que ça revient à une multiplication par `0` et donc qu'on peut tout simplement ignorer les `0` pour calculer la somme final. C'est une propriété qui va nous aider pour le calcul binaire !

## Compter en binaire

Le système binaire fonctionne sur exactement les mêmes principes que notre système de numération décimal positionnel : c'est un système de numération à notation positionnel avec seulement deux chiffres : `0` et `1` au lieu de 10.

Un des corollaires de la notation positionnelle; c'est qu'il n'y a pas besoin de 10 chiffres pour que ça fonctionne, ça peut être aussi bien 5, ou 60, 12 et même ... seulement 2 chiffres ! Ce qui est la version la plus minimaliste possible d'un système de numération positionnel. Ca fait partie de l'élégance de ce système.

Comme la numération binaire n'utilise que deux chiffres; il fonctionne avec des **puissances de 2** au lieu de fonctionner avec des puissances de 10 comme notre système décimal.

Prenons l'exemple du nombre décimal **1101**

|                                      | 1   | 1   | 0   | 1   | total exprimé en décimal |
| ------------------------------------ | :-- | :-- | :-- | --- | ------------------------ |
| position du chiffre dans le nombre   | 4   | 3   | 2   | 1   |
| multiplicateur associé à la position | 8   | 4   | 2   | 1   |
| multiplicateur exprimé en puissance  | 2^3 | 2^2 | 2^1 | 2^0 |
| valeur du chiffre                    | 8   | 4   | 0   | 1   | **13**                   |

On procède donc pour le calcul exactement comme pour le système décimal; excepté que le multiplicateur caché est une puissance de 2.

Comme il n'y a que deux chiffres; le résultat est toujours directement _soit 0_, _soit la puissance de 2 associée à la position du chiffre_.

**On peut simplement directement prendre le résultat de la puissance de deux liée à la position là où il y a un chiffre 1 et ne pas s'occuper des 0**

Essayons de calculer la valeur représentée par le nombre binaire : `101000001`

|                                      | 1   | 0   | 1   | 0   | 0   | 0   | 0   | 0   | 1   | total exprimé en décimal |
| ------------------------------------ | :-- | :-- | :-- | --- | --- | --- | --- | --- | --- | ------------------------ |
| position du chiffre dans le nombre   | 9   | 8   | 7   | 6   | 5   | 4   | 3   | 2   | 1   |
| multiplicateur associé à la position | 256 | 128 | 64  | 32  | 16  | 8   | 4   | 2   | 1   |
| multiplicateur exprimé en puissance  | 2^8 | 2^7 | 2^6 | 2^5 | 2^4 | 2^3 | 2^2 | 2^1 | 2^0 |
| valeur du chiffre                    | 256 | 0   | 64  | 0   | 0   | 0   | 0   | 0   | 1   | **321**                  |

On voit donc que la numération binaire, qui peut paraître pauvre et aride au premier regard du néophyte; est en réalité un système de numération extrêmement élégant et efficace; le tout en utilisant seulement deux chiffres avec la notation positionnelle.

## Les ordinateurs sont des calculette binaires surpuissants.

Nous avons vu ci-dessus qu'un ordinateurs contenaient des millions de petits interrupteurs qu'on pouvait allumer ou éteindre pour répresenter deux états; que l'on peut interpréter dans nos programme comme étant `0` ou `1`. Il se trouve que c'est tout ce dont on a besoin pour construire une calculette binaire sur-puissante; et c'est précisément ce que sont nos ordinateurs.
