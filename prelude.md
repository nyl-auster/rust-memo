
# Prélude

Apprendre vite, c'est apprendre doucement ! Rust requiert plus de connaissances "bas-niveau" que n'en requiert *PHP* ou *JavaScript*, ce prélude contient un récapitulatif, adapté à Rust, de ce qu'il faut savoir pour aborder *Rust* sans difficultés quand on vient des langages PHP ou JavaScript : les différents segments de mémoire que peut utiliser un programme, le binaire, qu'est ce qu'un fichier binaire, ce qu'est un "type de donnée" .... 

## La phase de compilation (compile-time) et la phase d'éxécution (run-time)

En PHP ou JavaScript, il n'y pas de phase de compilation : ce sont des languages interprétés à la volée. A l'opposé, Rust nécessite d'être compilé avant de pouvoir être exécuté.  Donc en Rust, on distingue le "compile-time" ( phase de compilation ) et le run-time ( phase d'éxécution). 

Mais en contre-partie PHP et JavaScript ont besoin d'un interpréteur pour être exécuté. Il faut un navigateur ou Node.js pour exécuter du JavaScript; et il faut un serveur HTTP sur lequel il faut installer un interpréteur pour PHP. 

Rust de son côté fourni après compilation un fichier binaire qu'il est possible d'éxécuter même si Rust n'est pas installé sur la machine. [<span style="color:red">A préciser</span>]

Le rôle du compilateur de Rust n'est pas seulement de compiler et optimiser le programme en un fichier binaire; c'est aussi lui qui, pendant la phase de développement, garantit la sûreté de la mémoire et la qualité du code en imposant le respect de certaines conventions d'écriture du code.

## Fichier binaire

J'ai écrit que Rust se compile en un fichier binaire. Mais qu'est ce qu'un fichier binaire précisément ? 

<img width="500" src="images/binary-file.png" />
> ci-dessus un extrait d'un fichier binaire de Rust obtenu avec la commande `xxd -b filename`

Quand on compile Rust, on obtient un fichier qui contient des `0` et des  `1` , que l'ordinateur est en mesure de comprendre et éxécuter pour que le programme fasse ce pourquoi il a été développé. Pourquoi des `0` et des  `1` ?

## Le bit.

Les ordinateurs stockent leurs données dans la mémoire. La mémoire consiste en une séquence d'octets, qui stockent chacun 8 bits. Un octet est la plus petite unité de mémoire qu'un ordinateur peut lire ou écrire; et un *bit* est la plus petite unité de données d'un ordinateur.

Dans votre ordinateur le principe du **bit** repose en réalité sur tout petit composant électronique (composés lui-même de **transistors**); que l'ordinateur peut manipuler pour qu'il bloque ou pas la circulation d'un courant électrique (un peu comme un interrupteur).  

On peut alors considérer que ce composant, d'un point de vue électrique a **deux états** bien distincts : "ouvert" ou "fermé". On interpretera par exemple comme "ouvert" le fait que le courant circule et comme "fermé" le fait que le courant en circule pas. On représente souvent par `0` et `1` ou "vrai" et "faux" ces deux états. 

Avec deux états, on ne peut représenter que deux valeurs, c'est peu. 

Mais avec une séquences de 2 bits , on obtient 4 valeurs / mots / combinaisons / états possibles : 

`00`,  `01`,  `10`, `11`. 

On peut donc déjà compter de 0 jusqu'à 3 en créeant une table de correspondance ! on dira simplement que :

| encodage en bits | signification |
|---|---|
|00 |0 |
|01 |1 |
|10 |2 |
|11 |3 |

Continuons : avec 5 bits on a 32 valeurs possibles; avec 32 bits, on obtient .... **4 milliards de valeurs possibles** ! Sachant que nos ordinateurs modernes contiennent plusieurs centaines de **millions** de transistors.

5 bits, c'est assez pour créer un système de communication complet et  utilisable en temps de guerre : le morse ne contient que deux signaux possibles (signal court ou un signal long, c'est donc une forme de bit) et pourtant permet d'avoir une conversation.

<img width="300" src="images/morse.png" />
> Avec seulement **5 bits** (c'est le nombre maximal de signaux pour un caractère sur l'image ci-dessus), le morse peut représenter 24 lettres et 10 chiffres !

Les bits sont au final comme des millions de minuscules interrupteurs électriques, qu'on peut éteindre ou allumer pour encoder de l'information.  Tout comme le morse, l'information est donc à **décoder** ensuite : en tant qu'utilisateur d'un ordinateur, nous voulons voir du texte, des images ; mais pas des 0 et des 1 !

Deux états, c'est aussi tout ce qu'il nous faut pour manipuler les bits comme un système de numération très élégant et puissant : le système binaire.

## Le système de numération binaire

Le système de numération binaire n'a en réalité rien de différent de notre système à 10 chiffres de tous les jours; il est même plus simple puisqu'il n'a que deux chiffres ( `0` et `1` ) eu lieu de 10 !

Comprendre le binaire, c'est donc comprendre notre système décimal habituel, c'est donc comprendre ce qu'est un *système de numération positionnel* et pourquoi ça existe.

### La notion d'unité

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

Ce système de petits bâtons marche très bien pour les petites quantités mais on fait mal la différence au premier coup d'oeil entre `8` et `9`; et comment diable pourrait-on bien écrire `1000`  sans y passer la journée?

### La notion de chiffre 

La notation romaine est un des exemples de solutions apportés à ces problèmes. Pour signifier `10`, on peut écrire le symbôle `X` au lieu de `||||||||||`.  Pour écrire `5` on peut écrire le symbole `V` au lieu de `|||||`.

Un symbole qui représente une accumulation d'unités est justement ce qu'on appelle un **chiffre**.

Un nombre tel que `30` devient alors rapide à écrire, il suffit d'écrire plusieurs fois le même symbole : `XXX`

Pour écrire facilement `100` ou `1000` , la notation romaine propose aussi des symboles spécifiques :

symbole | équivalent dans notre système de numération décimal
---|---
| `I` | 1 | 
|`V`| 5 |
| `X`| 10 |
| `L`| 50 |
| `C`| 100 |
| `D`| 500 |
| `M` | 1000 |

Il devient relativement aisé grâce à cette table d'écrire de grands nombres tel que `1528`, en cumulant les symboles :

```
MDXXVIII
```

C'est une belle évolution par rapport aux petits bâtons :D 

Mais le système n'est pas parfait non plus, si on s'en tient à ces symboles : 

- Le nombre maximal romain (en trichant un peu) est `4999` qui s'écrit `MMMM DCCCC LXXXX VIIII`  ! 
- Il faut donc inventer d'autres symboles pour continuer à créer des chiffres plus grands. Les romains ajoutaient des petits traits horizontaux et verticaux pour créer des multiplicateurs et s'affranchir des limites de leur système de numération.
- La longueur manuscrite d'un nombre romain n'a aucun rapport avec sa taille : `CCLXIII` = `263` tandis que `M` = `1000` ; ça ne permet pas non plus de résoudre aussi facilement par écrit, comme avec notre système, des additions, multiplications, des soustractions etc.  Ni de créer facilement un compteur kilométrique mécanique pour une voiture :-p

### La notation positionnelle

C'est pourquoi notre système de numération actuel utilise la très astucieuse **notation positionnelle** qui résoud tous les problèmes précédemment évoqués; avec un ensemble très restreint de symboles. 

Notre système de numération décimal utilisent un ensemble de 10 symboles, nommés chiffres, en utilisant la **notation positionnelle** : c'est à dire que la valeur d'un chiffre va changer en fonction de sa **position** dans le nombre. En réalité, chaque position implique un **multiplicateur caché**.

Prenons le chiffre `222` en décimal.  Il est en réalité un nation raccourcie pour exprimer ce calcul mathématique :

```
(2 x 100) + (2 x 10) + (2 x 1)
```
Qu'on peut lire aussi comme "2 centaines + 2 dizaines + 2 unités". On voit que 2 est à *multiplier* par 1, 10 ou 100 ( et ainsi de suit à l'infini ! ) en fonction de sa position.  C'est la multiplication cachée en fonction de la position dont je parlais.

Un nombre représenté dans par *notation positionnelle* est donc fondamentalement une manière d'écrire une **somme de multiplications** : à chaque position correspond une multiplication, puis on additionne le tout pour obtenir un résultat.

C'est comme un calcul mathématique dont on aurait enlevé les `+`et les `x` , tout simplement parce que c'est plus pratique à écrire et à manipuler sous la forme raccourcie : `222`.

On peut se représenter et nombre et ses positions comme autant de colonnes :


nombre | 2| 2 | 2
-----------|---:|---:|---:|
position du chiffre dans le nombre| 3 | 2 | 1 |
multiplicateur associé à la position | 100 | 10 | 1 |
calcul à faire | `2 x 100` | `2 x 10` | `2 x 1` |
valeur du chiffre | 200 | 20 | 2 |

Contrairement aux romains, on peut donc très facilement représenter de très grands nombres sans inventer de nouveaux symboles, juste avec une longue succession de chiffres dont la valeur se démultiplie grâce à la position : `1 567 847 987 211 544 878 980 765 876 090 764`

Nous disposons mathématiquement d'une notion plus pratique pour écrire nos multiplications cachées : 1, 10, 100, 1000, 10 000, 100 000 etc : ce sont les **puissances**; et en l'occurence  les puissances de **10**. 

Une puissance est une manière de répresenter un nombre qu'on multiplie par lui même. Par exemple `10 x 10 x 10 x 10` peut s'écrire en utilisant les puissances : `10^4`.

Les multiplicateurs cachés de notre système décimal positionnel sont donc plus simples à écrire sous forme de puissances :

|nombre| | représentation en puissance|
|---|---|---|
|1| |10^0
|10|10 x 1| 10^1
|100|10 x 10| 10^2
|1000|10 x 10 x 10| 10^3 
|10 000|10 x 10 x 10 x 10| 10^4 
|100 000|10 x 10 x 10 x 10 x 10| 10^5

> 🚨 Nota bene : 10^0, ça fait `1`; et c'est vrai pour n'importe quel nombre à puissance 0. Donc la valeur du premier multiplicateur de toute numération positionnelle basé sur les puissances est nécessairement **1**

Prenons un autre exemple avec le nombre `432 687`

nombre | 4| 3 | 2 | 0 | 8 | 7 |
-----------|---:|---:|---:|---|---|---|
position du chiffre dans le nombre| 6 | 5 | 5 |3|2|1|
multiplicateur associé à la position | 100 000 | 10 000 | 1 000 |100|10|1|
multiplicateur exprimé en puissance | 10^5 | 10^4 | 10^3 |10^2|10^1|10^0|
calcul à faire| `4 x 10^5` | `3 x  10^4` | `2 x 10^3` |`0 x 10^2`| `8 x 10^1`|`7 x 10^0`|
valeur du chiffre | 400 000 | 30 000 | 2 000 |0|80|7|


A la troisième position, nous avons un `0` : on s'aperçoit que ça revient à une multiplication par `0` et donc qu'on peut tout simplement ignorer les `0` pour calculer la somme final. C'est une propriété qui va nous aider pour le calcul binaire ! 
 
### Compter en binaire

Le système binaire fonctionne sur exactement les mêmes principes que notre système de numération décimal positionnel : c'est un système de numération à notation positionnel avec seulement deux chiffres : `0` et `1` au lieu de 10.

Un des corollaires de la notation positionnelle; c'est qu'il n'y a pas besoin de 10 chiffres pour que ça fonctionne, ça peut être aussi bien 5, ou 60, 12 et même ... seulement 2 chiffres ! Ce qui est la version la plus minimaliste possible d'un système de numération positionnel. Ca fait partie de l'élégance de ce système.

Comme la numération binaire n'utilise que deux chiffres; il fonctionne avec des **puissances de 2** au lieu de fonctionner avec des puissances de 10 comme notre système décimal.

Prenons l'exemple du nombre décimal **1101**

||1|1|0|1|total exprimé en décimal|
|---|:---|:---|:---|---|---|
|position du chiffre dans le nombre|4|3|2|1|
|multiplicateur associé à la position|8|4|2|1|
|multiplicateur exprimé en puissance|2^3|2^2|2^1|2^0|
|valeur du chiffre|8|4|0|1|**13**

On procède donc pour le calcul exactement comme pour le système décimal; excepté que le multiplicateur caché est une puissance de 2. 

Comme il n'y a que deux chiffres; le résultat est toujours directement *soit 0*, *soit la puissance de 2 associée à la position du chiffre*. 

**On peut simplement directement prendre le résultat de la puissance de deux liée à la position là où il y a un chiffre 1 et ne pas s'occuper des 0**

Essayons de calculer la valeur représentée par le nombre binaire : `101000001`

||1|0|1|0|0|0|0|0|1|total exprimé en décimal |
|---|:---|:---|:---|---|---|---|---|---|---|---|
|position du chiffre dans le nombre|9|8|7|6|5|4|3|2|1|
|multiplicateur associé à la position|256|128|64|32|16|8|4|2|1|
|multiplicateur exprimé en puissance|2^8|2^7|2^6|2^5|2^4|2^3|2^2|2^1|2^0| 
|valeur du chiffre|256|0|64|0|0|0|0|0|1|**321** 

On voit donc que la numération binaire, qui peut paraître pauvre et aride au premier regard du néophyte; est en réalité un système de numération extrêmement élégant et efficace; le tout en utilisant seulement deux chiffres avec la notation positionnelle. 

### Les ordinateurs sont des calculette binaires surpuissants.

Nous avons vu ci-dessus qu'un ordinateurs contenaient des millions de petits interrupteurs qu'on pouvait allumer ou éteindre pour répresenter deux états; que l'on peut interpréter dans nos programme comme étant  `0` ou `1`. Il se trouve que c'est tout ce dont on a besoin pour construire une calculette binaire sur-puissante; et c'est précisément ce que sont nos ordinateurs.

## Qu'est ce qu'un type de donnée  ?

En programmation, quand on déclare une variable, elle toujours d'un certain **type**.  Il peut s'agir d'un *booléen*, d'un *nombre*, ou d'une *chaîne de caractères*... Mais aussi des types plus complexes comme des tableaux ou des classes. C'est ce qu'on désigne par **types de données**. 

>🚨 Attention à ne pas mélanger en anglais *bytes* (octet) et *bits* (bits). En cas de doute, penser au **e** qu'on retrouve dans  byt**e** et oct**e**t.

Dans la mémoire de l'ordinateur, la valeur d'une variable est toujours stockée dans un emplacement mémoire sous forme de **séquence de bits** , comme par exemple `11000000` ( on a ici 8 *bits*, soit un *octet*).  Du point de vue de la machine, il n'y a pas de *nombres*, de *chaînes de caractères* ou de *booléen*, seulement des séquences de bits, plus ou moins longues.

C'est le langage qui interprète ces séquences de bits comme étant un  *nombre*, une *chaîne de caractères* ou autre; en lui assignant justement un **type** : ainsi le programme ne stocke pas simplement `11000000` en mémoire; mais aussi le type de donnée que cet octet (ou plusieurs octets) représente.

**Un type de donnée est donc une méta-donnée qui permet à un langage de savoir comment interpréter une séquence de bits**.


champ |   |
------|---
nom  | ma_variable
type | u8
valeur|11000000

L'interprétation de: `11000000` dépend du type qui lui est asigné. Si le type est "entier non-signé" ( `u8` ), la séquence de bits sera interprétée comme un nombre décimal valant **191** 

> Soit `(2^7  + 2^8) - 1 = 191` . Moins 1 car il faut garder une valeur pour représenter le `0`

Si le type était en entier **signé** ( `i8` ), la séquence de bits sera interprétée comme le nombre décimal négatif `-63`

> Le bit le plus à gauche est utilisé pour indiquer la présence ou l'absence du signe `-`; donc si il vaut `1`, on considérera qu'il s'agit d'un nombre négatif. Soit : `2^7 - 1 = 63`. 

Sur la même logique, `11000000` pourrait aussi bien représenter un caractère ou tout autre chose que le langage aura décidé de lui faire représenter.

## La gestion de la mémoire 

Pour fonctionner, un programme doit constammer allouer puis libérer de la mémoire. Une variable est par exemple un espace mémoire contenant une séquences de **bits**; qui doit être supprimée de la mémoire quand elle n'est plus utile au programme. 

La question de la gestion de la mémoire est centrale en Rust, il est donc impératif d'avoir un modèl mental clair de la manière dont un programme gére la mémoire dans les grandes lignes.

### Gestion automatique de la mémoire

En PHP ou JavaScript, il n'est jamais nécesserait d'allouer ou libérer soi-même de la mémoire : on créer simplement nos variables (allocations de mémoire) et le **ramasse-miettes** (Garbage Collector) se charge ensuite de libérer automatiquement la mémoire. 

Cela libére le développeur de l'obligation d'allouer manuellement la mémoire et évite les erreurs mentionnées de double libération ou de pointeurs foireux. Cela peut aussi avoir un impact sur les performances, le récupérateur mémoire ayant tendance à augmenter la consommation mémoire du programme : le programme doit en effet évaluer par lui même au moyen d'un algorithme, sans aucune indication du développeur, pendant qu'il s'éxécute, quelles sont les valeurs en mémoires devenus inutiles au programme et si il peut les supprimer en toute sécurité.  

Établir un algorithme pour établir avec certitude quelles sont les valeurs qui ne sont plus utiles au programme n'est par ailleurs pas si simple; une erreur dans cet algorithme pourrait par exemple provoquer une fuite de mémoire dans certains cas. A contrario, une amélioration de cet algorithme peut se traduire par un gain de performance très important pour le langage. ( voir par exemple cette page de la documentation de PHP qui explique une amélioration importante de son Garbage collector : [http://php.net/manual/fr/features.gc.performance-considerations.php](http://php.net/manual/fr/features.gc.performance-considerations.php) )

### Gestion manuelle de la mémoire

Dans certains languages, l'allocation de la mémoire peut être *manuelle* ( comme en `C` ); c'est à dire que le développeur doit parfois allouer et libérer lui même la mémoire pour certaines variables.

Cela peut-être sources de nombreux bugs : par exemple si on essaie de lire une variable dans la valeur a déjà été effacée de la mémoire; ou bien si on essaie de libérer un emplacement mémoire déjà libéré. On risque aussi une **fuite de mémoire**, c'est à dire que le programme va allouer trop de mémoire de manière incontrolée et exponentielle à cause d'un bout de code incorrect dans la gestion de la mémoire.

### Rust : la Voie du milieu

Rust de son côté n'utilise pas de *ramasse-miettes* ; mais ne demande pas non plus au développeur de libérer manuellement la mémoire. Il le fait automatiquement grâce à des règles d'écriture de code qui permet au compilateur de toujours savoir à quel moment il peut supprimer une donnée de la mémoire de façon sûre.
 
En Rust on doit donc écrire du **code déterministe, aux yeux du compilateur, en terme d'usage de mémoire** ; c'est à dire que la sémantique du code doit permettre seule de déterminer *au moment de la compilation*, précisément et sans aucune ambiguité, si telle ou telle donnée peut être supprimée de la mémoire en tout sécurité. 

Le compilateur vous avertira donc souvent ( avec un message bien précis) que tel ou tel code,bien que fonctionnel, n'est pas valide car le compilateur ne peut pas **déterminer** comment libérer la mémoire avec la certitude de ne pas déclencher une erreur au moment de l'éxécution du programme; et vous invitera à réecrire différemment une partie du code ou parfois à ajouter des indications supplémentaires ( comme une *durée de vie explicite* pour une référence )

Si le compilateur peut sembler contraignant de prime abord, il confère aussi des super-pouvoirs à Rust, comme par exemple :
- Si ça compile, vous pouvez aller boire une bière en étant certain de n'avoir aucun problème de gestion de la mémoire ou de "data races".
- On obtient un programme dont la mémoire est gérée de manière très performante.
- On peut utiliser Rust pour tout, y compris écrire un système d'exploitation, ce qui ne serait pas possible si il avait un *ramasse-miette*, parce que le ramasse-miette s'appuie justement sur des fonctionnalités mémoires bas-niveau du système d'exploitation lui-même. 

### Les 3 segments de mémoire les plus utilisés par un programme

La mémoire accessible par un programme se divise en trois segments. En avoir une vision claire permet de comprendre Rust aisément. A contrario, une mauvaise compréhension de ces types de mémoires seront un frein important à beaucoup de concepts de Rust.

- Sur la pile d'éxécution ( *stack* )
- Dans le tas ( *heap* ) 
- Dans le segment de données du programme

C'est à dire que le programme peut écrire et lire des données à partir de ces trois segments de mémoire. 

## La pile d'éxécution et le tas

Si vous pouvez coder tranquillement du PHP et du JavaScript sans vous me demander si la valeur d'une variable est stockée dans la pile d'éxécution ( the stack ) ou bien dans le tas ( heap ); il n'en va pas de même en Rust !

En effet, toutes les problématiques de la gestion de mémoire évoqués ci-dessus concerne uniquement la mémoire du *tas* ( heap ). 

**🚨 Une variable en Rust ne se comportera pas de la même manière selon que sa valeur soit stockée dans le tas ou dans la pile d'éxécution.**

### La pile d'éxécution

> *représentation naïve du principe de base d'une pile*
<img width="500px" src="images/stack.png" />

La mémoire de la pile d'éxécution a une mission principale : mémoriser la fonction du programme actuellement en cours d'éxécution et savoir à quelle partie du code ( l'*adresse de retour* ) retourner une fois cette fonction termnée. 

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

On voit ici qu'en réalité la pile est composées de **trames** (*frames*). On voit en <strong style="color:green;">vert</strong> la trame pour éxécuter `Drawline(pointA, pointB);` et en <strong style="color:blue;">bleu</strong>  la trame pour éxécuter `DrawSquare`.

Les pointeurs (*Stack pointer* et *Frame pointer*) permettent de savoir ce qui est actuellement en cours d'éxécution et où se trouve l'adresse de retour de la prochaine instruction de code à éxécuter.

### Le tas 

La plupart des programmes ont besoin, au cours de leur exécution, d'allouer dynamiquement de la mémoire de manière non-prédictible, puis de la restituer au système. 

Par exemple, si on propose à un utilisateur de rentrer un long texte en markdown, sans limite de caractères, et qu'on veut lui afficher en temps réel une prévisualisation du rendu final de son texte. On ne connaît alors pas la taille finale du texte; mais on a pourtant besoin de le stocker au fur et à mesure en mémoire pour pouvoir générer puis afficher le rendu markdown.

Il faut dans ce genre de cas allouer de la mémoire sur le **tas** , puis libérer cette mémoire quand cette variable n'a plus d'utilité.

[ A compléter ]

