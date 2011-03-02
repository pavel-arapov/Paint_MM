### INSTALLATION ###
(Node.js requis)
Executer la commande:
> node paint-server.js

Le serveur est fait pour être autonome (pas besoin d'un serveur web additionnel) pour récupérer tous les types de fichiers (html, js, gif, png ...).

### UTILISATION ###
Avec Google Chrome, se connecter à l'adresse:
http://localhost/

### VERSION 1.0 ###
[SERVEUR]
- Serveur Node.js autonome.
- Séparation des dossiers serveur et client pour ne pas avoir le serveur dans l'arborescence du client.
- Code Javascript trés structuré (Prévoir de concaténer les fichiers pour gagner en performances).
[DESSIN]
- Outils de dessin: Rectangle, Cercle, Crayon, Ligne, Gomme.
- Options: taille du trait, couleur de remplissage et du contour, ombre.
- Affichage en temps réel des dessins sur tous les navigateurs connectés.
- Bouton effacer le canvas.
[BASE DE DONNEES]
- Fonctions: Enregistrer, Charger, Vider la mémoire.
- Affichage animé du chargement des données.
[CHAT]
- Commandes: /nick, /stats, /who (affiche tous les utilisateurs connectés).
- Bouton de connection / déconnection.
[ANIMATIONS]
- Animations avec JQuery: menus déroulants et chat.
- Animation du chargement des dessins.
[ERGONOMIE]
- Design étroit pour une future intégration à facebook et utilisation sur smartphone.

### INFORMATIONS ###
Nous avons décidé de restructurer entièrement le code javascript pour une plus grande clarté et une simplicité d'utilisation.
On a essayé de le structurer à la façon MVC, le résultat s'en rapproche mais ça reste Javascript (et les fonctions callback :).

