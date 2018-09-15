# Bits et transistors

Les ordinateurs stockent leurs données dans la mémoire. La mémoire consiste en une séquence d'octets, qui stockent chacun 8 bits. Un octet est la plus petite unité de mémoire qu'un ordinateur peut lire ou écrire; et un _bit_ est la plus petite unité de données d'un ordinateur.

Dans votre ordinateur le principe du **bit** repose en réalité sur tout petit composant électronique (composés lui-même de **transistors**); que l'ordinateur peut manipuler pour qu'il bloque ou pas la circulation d'un courant électrique (un peu comme un interrupteur).

On peut alors considérer que ce composant, d'un point de vue électrique a **deux états** bien distincts : "ouvert" ou "fermé". On interpretera par exemple comme "ouvert" le fait que le courant circule et comme "fermé" le fait que le courant en circule pas. On représente souvent par `0` et `1` ou "vrai" et "faux" ces deux états.

Avec deux états, on ne peut représenter que deux valeurs, c'est peu.

Mais avec une séquences de 2 bits , on obtient 4 valeurs / mots / combinaisons / états possibles :

`00`, `01`, `10`, `11`.

On peut donc déjà compter de 0 jusqu'à 3 en créeant une table de correspondance ! on dira simplement que :

| encodage en bits | signification |
| ---------------- | ------------- |
| 00               | 0             |
| 01               | 1             |
| 10               | 2             |
| 11               | 3             |

Continuons : avec 5 bits on a 32 valeurs possibles; avec 32 bits, on obtient .... **4 milliards de valeurs possibles** ! Sachant que nos ordinateurs modernes contiennent plusieurs centaines de **millions** de transistors.

5 bits, c'est assez pour créer un système de communication complet et utilisable en temps de guerre : le morse ne contient que deux signaux possibles (signal court ou un signal long, c'est donc une forme de bit) et pourtant permet d'avoir une conversation.

<img width="300" src="images/morse.png" />
> Avec seulement **5 bits** (c'est le nombre maximal de signaux pour un caractère sur l'image ci-dessus), le morse peut représenter 24 lettres et 10 chiffres !

Les bits sont au final comme des millions de minuscules interrupteurs électriques, qu'on peut éteindre ou allumer pour encoder de l'information. Tout comme le morse, l'information est donc à **décoder** ensuite : en tant qu'utilisateur d'un ordinateur, nous voulons voir du texte, des images ; mais pas des 0 et des 1 !

Deux états, c'est aussi tout ce qu'il nous faut pour manipuler les bits comme un système de numération très élégant et puissant : le système binaire.
