# 📁 Structure du Projet Réorganisé

## Vue d'Ensemble

Le projet a été complètement réorganisé pour améliorer la maintenabilité et la clarté du code. Le fichier `page.tsx` de 976 lignes a été divisé en fichiers plus petits et spécialisés.

## Avant vs Après

### ❌ Avant (Monolithique)
```
page.tsx (976 lignes)
├── Toutes les constantes
├── Toute la logique du jeu
├── Tous les composants UI
├── Toute la logique en ligne
└── Toute la logique IA
```

### ✅ Après (Modulaire)
```
├── page.tsx (300 lignes) - Orchestrateur principal
├── types.ts - Définitions TypeScript
├── constants.ts - Constantes du jeu
├── components/ - Composants UI réutilisables
├── hooks/ - Logique métier
└── utils/ - Fonctions utilitaires
```

## 📂 Structure Détaillée

```
Guest pays/
│
├── 📄 page.tsx (orchestrateur principal)
│   └── Coordonne tous les composants et hooks
│
├── 📄 types.ts
│   └── Définitions TypeScript (Player, GameMode, AiDifficulty)
│
├── 📄 constants.ts
│   ├── PAYS (50 pays)
│   ├── ALPHABET
│   └── COMMON_LETTERS
│
├── 📁 components/ (7 composants)
│   ├── 📄 GameModeSelector.tsx
│   │   └── Sélection du mode de jeu (Solo/Local/Online)
│   │
│   ├── 📄 SoloModeSetup.tsx
│   │   └── Configuration Solo vs IA
│   │
│   ├── 📄 LocalModeSetup.tsx
│   │   └── Configuration Multijoueur Local
│   │
│   ├── 📄 OnlineModeSetup.tsx
│   │   └── Configuration Multijoueur En Ligne
│   │
│   ├── 📄 GameHeader.tsx
│   │   └── En-tête du jeu avec message
│   │
│   ├── 📄 PlayerCard.tsx
│   │   └── Carte d'affichage d'un joueur
│   │
│   ├── 📄 TurnActions.tsx
│   │   └── Actions disponibles au tour du joueur
│   │
│   └── 📄 index.ts
│       └── Exports centralisés
│
├── 📁 hooks/ (3 hooks personnalisés)
│   ├── 📄 useGame.ts
│   │   ├── État du jeu
│   │   ├── Initialisation des modes
│   │   └── Gestion des joueurs
│   │
│   ├── 📄 useAiLogic.ts
│   │   ├── Choix de lettre de l'IA
│   │   ├── Stratégie de devinette
│   │   └── Gestion du tour de l'IA
│   │
│   ├── 📄 useOnlineGame.ts
│   │   ├── Création/rejoint salle
│   │   ├── Synchronisation
│   │   └── Gestion multijoueur en ligne
│   │
│   └── 📄 index.ts
│       └── Exports centralisés
│
└── 📁 utils/ (3 modules utilitaires)
    ├── 📄 game.ts
    │   ├── getRandomCountry()
    │   ├── countLetterOccurrences()
    │   ├── findNextPlayer()
    │   ├── checkGameEnd()
    │   └── getWinnerByPoints()
    │
    ├── 📄 storage.ts
    │   ├── generateRoomCode()
    │   ├── saveGame()
    │   └── loadGame()
    │
    ├── 📄 ai.ts
    │   ├── shouldAiGuess()
    │   ├── getPossibleCountries()
    │   ├── getAiLetterChoice()
    │   └── getAvailableLetters()
    │
    └── 📄 index.ts
        └── Exports centralisés
```

## 🔄 Flux de Données

### Initialisation du Jeu
```
page.tsx
  ├─→ useGame() [États de base]
  ├─→ useOnlineGame() [Si mode online]
  └─→ Composants de Setup
      ├─→ SoloModeSetup
      ├─→ LocalModeSetup
      └─→ OnlineModeSetup
```

### Pendant le Jeu
```
page.tsx
  ├─→ GameHeader [Affichage info]
  ├─→ PlayerCard [x] [Affichage joueurs]
  ├─→ TurnActions [Actions joueur]
  └─→ useAiLogic() [Si mode solo et tour IA]
```

### Logique Métier
```
Utils/
  ├─→ game.ts → Logique jeu
  ├─→ ai.ts → Logique IA
  └─→ storage.ts → Stockage en ligne

Hooks/
  ├─→ useGame → Gestion jeu
  ├─→ useAiLogic → Gestion IA
  └─→ useOnlineGame → Gestion en ligne
```

## ✨ Avantages de la Nouvelle Structure

### 1. **Maintenabilité** 
- Chaque fichier a une responsabilité claire
- Facile de localiser et modifier une fonctionnalité
- Tests unitaires simplifiés

### 2. **Réutilisabilité**
- Composants indépendants
- Hooks réutilisables dans d'autres contextes
- Utilitaires exportables

### 3. **Lisibilité**
- Code de 976 lignes → 7 fichiers de ~100-300 lignes
- Namespaces clairs (components, hooks, utils)
- Documentation intégrée

### 4. **Scalabilité**
- Facile d'ajouter de nouveaux modes
- Nouvelles fonctionnalités sans toucher à l'existant
- Structure prête pour la croissance

## 📊 Métriques

| Métrique | Avant | Après | Gain |
|----------|-------|-------|------|
| Fichiers | 1 | 17 | +1600% |
| Lignes max | 976 | ~300 | 70% |
| Responsabilités | Toutes | Séparées | ✅ |
| Testabilité | Difficile | Facile | ✅ |
| Réutilisabilité | Faible | Haute | ✅ |

## 🎯 Prochaines Étapes Suggérées

1. **Tests** : Ajouter des tests unitaires pour chaque hook et utilitaire
2. **Storybook** : Documenter les composants avec Storybook
3. **API** : Extraire l'API en ligne dans un service séparé
4. **Theming** : Ajouter un système de thèmes
5. **i18n** : Internationaliser les textes

