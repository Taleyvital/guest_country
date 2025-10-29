# 🎮 Devinez le Pays - Country Guess Game

Un jeu de devinette de pays multijoueur avec support IA et en ligne.

## 📁 Structure du Projet

```
Guest pays/
├── page.tsx                 # Composant principal (orchestrateur)
├── types.ts                 # Définitions TypeScript
├── constants.ts              # Constantes du jeu (PAYS, ALPHABET)
├── components/              # Composants UI réutilisables
│   ├── GameModeSelector.tsx # Sélection du mode de jeu
│   ├── SoloModeSetup.tsx   # Configuration solo vs IA
│   ├── LocalModeSetup.tsx  # Configuration multijoueur local
│   ├── OnlineModeSetup.tsx # Configuration multijoueur en ligne
│   ├── GameHeader.tsx      # En-tête du jeu
│   ├── PlayerCard.tsx      # Carte de joueur
│   ├── TurnActions.tsx     # Actions du tour
│   └── index.ts            # Exports
├── hooks/                   # Hooks personnalisés
│   ├── useGame.ts          # Logique de jeu principale
│   ├── useAiLogic.ts       # Logique de l'IA
│   ├── useOnlineGame.ts    # Logique multijoueur en ligne
│   └── index.ts            # Exports
└── utils/                   # Fonctions utilitaires
    ├── game.ts             # Utilitaires de jeu
    ├── storage.ts          # Gestion du stockage en ligne
    ├── ai.ts               # IA utilitaires
    └── index.ts            # Exports
```

## 🎯 Fonctionnalités

### Modes de Jeu

1. **Solo vs IA** 🤖
   - Affrontez une IA avec 3 niveaux de difficulté
   - Facile (aléatoire)
   - Moyen (stratégique)
   - Difficile (expert)

2. **Multijoueur Local** 👥
   - 2 à 6 joueurs sur le même appareil
   - Parfait pour les soirées entre amis

3. **Multijoueur en Ligne** 🌐
   - Créez ou rejoignez une salle avec un code
   - Jouez avec vos amis à distance

## 🎲 Règles du Jeu

- Chaque joueur a un pays secret
- À votre tour, vous avez **1 seule action** :
  - **Action 1** : Demander UNE lettre à un adversaire
  - **Action 2** : Tenter de deviner le pays d'un adversaire
- Après votre action, le tour passe au joueur suivant
- Deviner correct = **+1 point** et **élimination de l'adversaire**
- Deviner faux = vous **passez votre prochain tour** (pénalité)
- Le dernier en jeu ou celui avec le plus de points **gagne** !

## 🏗️ Architecture

### Composants

Les composants sont organisés par responsabilité :
- **Setup** : Configuration avant le jeu (SoloModeSetup, LocalModeSetup, OnlineModeSetup)
- **Display** : Affichage des informations (GameHeader, PlayerCard)
- **Actions** : Interactions utilisateur (TurnActions)

### Hooks

La logique métier est séparée en hooks :
- **useGame** : Gestion du jeu principal (initialisation, états)
- **useAiLogic** : Logique de l'IA (choix de lettres, stratégie)
- **useOnlineGame** : Gestion du multijoueur en ligne (salles, synchronisation)

### Utilitaires

Les fonctions utilitaires sont organisées par domaine :
- **game.ts** : Fonctions de jeu (détection de victoire, lettres)
- **storage.ts** : Stockage en ligne (création/rejoindre salle)
- **ai.ts** : Intelligence artificielle (stratégie, choix)

## 🚀 Améliorations Futures

- [ ] Ajout de thèmes visuels
- [ ] Historique des parties
- [ ] Classements et statistiques
- [ ] Chat en temps réel
- [ ] Invitations par lien
- [ ] Mode tournoi

## 📝 Remarques Techniques

- Utilise React hooks pour la gestion d'état
- TypeScript pour la sécurité de type
- Tailwind CSS pour le styling
- Lucide React pour les icônes
- Stockage persistant via `window.storage`

# guest_country
