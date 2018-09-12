# Historique de Rust

Rust est un language crée par **Mozilla Research**. Une partie de leur travail consiste à travailler sur un navigateur nouvelle génération : c'est le le projet [Servo](<https://fr.wikipedia.org/wiki/Servo_(moteur_de_rendu)>)

Une partie de la question posée par Servo est : si on écrit le coeur d'un nouveau navigateur; en quel language faut-il le faire ?

A l'heure actuelle, les principaux navigateurs sont constitués de millions de lignes de code en _C++_. ( Firefox contiendrait environ 8 millions de lignes de code ). Le choix du language _C++_ est lié à une nécessité de pouvoir contrôler ce qu'il se passe au bas-niveau pour maîtriser les performances de rendus du navigateur. _C++_ offre notamment un grand contrôle de la mémoire.

La contrepartie de cette flexibilité, ce sont les erreurs mémoires et les "data races" : une mauvaise manipulation du développeur peut vite mener à une erreur mémoire qui plante l'application : **libération d'une mémoire déjà libérée, pointeur qui pointe vers une valeur qui n'est plus la bonne (dangling pointers), fuites de mémoires (memory leaks), "data races", ou même failles de sécurité lié à une défaillance de la gestion de la mémoire.**

Le développeur peut faire des efforts pour respecter un ensemble de règle pour éviter au maximum ces erreurs mais en C++ rien ne me permet de **garantir** que le code final ne contient aucune de ces erreurs.

Il s'agissait donc pour le projet Servo de choisir un language qui offrait la même flexibilité que _C++_ tout en offrant de solide garanties concernant la sûreté de la mémoire pour s'assurer que toutes ces erreurs deviennent **impossibles**.

Les personnes en charges du projet ont estimé que la plupart des autres languages disponibles offraient :

- du contrôle du bas-niveau mais peu ou pas de garanties de sûreté de la mémoire
- des garanties de la sûreté mémoire mais peu ou pas de contrôle du bas-niveau.

Rust est naît du besoin de remplir ces deux conditions : une grande flexibilité accompagnée et de solides garanties. Servo, encore en version expérimentale, est aujourd'hui codé en Rust
