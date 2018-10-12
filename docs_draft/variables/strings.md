# Chaînes de caractères ( String , str , slices)

pour les programmeurs C

```rust
struct str {
   char text[]; // unknown number of bytes, which is why `str` as such is not used
}

struct &str {
   size_t length; 
   const char *text; // not owned
};

struct String {
   size_t length; 
   size_t free_capacity; 
   char *text; // malloc()'ed
}
```

## slice

une vue sur les datas

## str

https://stackoverflow.com/questions/24158114/what-are-the-differences-between-rusts-string-and-str/24159933#24159933

séquence immutable de longueur dynamique. Comme la taille est inconnue, on ne peut s'en servir qu'en utilisant un pointeur (d'où `&str`), c'est pour ça que str apparait toujours sous la forme `&str`
La taille de str ne peut pas être changée.

## &str

`&str` est une référence. Il s'agit d'une *tranche de chaîne de caractères* (string slice). En Rust, les référence sont des **emprunts** comme on va le voir, `&str` représente donc aussi un "emprunt" d'une chaîne de caractère.
C'est la manière priviligié de faire circuler des chaînes de caractère dans notre programme.

## String

dynamic heap string type : use it when you need to own or modify your string data.
String: String dereferences to a &str view 