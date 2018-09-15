
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
