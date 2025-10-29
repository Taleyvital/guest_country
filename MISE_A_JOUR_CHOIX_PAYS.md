# 🎯 Mise à Jour - Choix du Pays par le Joueur

## ✅ Nouvelle Fonctionnalité

Les joueurs peuvent maintenant **choisir eux-mêmes le pays** qu'ils veulent faire deviner, au lieu de recevoir un pays aléatoire.

## 🎮 Fonctionnement

### Mode Solo (vs IA)

1. **Le joueur choisit son pays** dans le champ de saisie
2. L'IA reçoit un pays aléatoire
3. La partie commence avec ces pays

### 📝 Interface

Dans `SoloModeSetup`, ajout d'un champ de saisie :

```typescript
<input
  type="text"
  value={playerCountry}
  onChange={(e) => setPlayerCountry(e.target.value.toUpperCase())}
  placeholder="Ex: FRANCE, ALLEMAGNE, ESPAGNE..."
  className="..."
/>
```

## 🔧 Modifications Techniques

### Fichiers Modifiés

1. **`components/SoloModeSetup.tsx`**
   - Ajout de `playerCountry` et `setPlayerCountry` aux props
   - Ajout d'un champ de saisie pour le pays

2. **`hooks/useGame.ts`**
   - Ajout de l'état `playerCountry`
   - Modification de `initSoloGame()` pour utiliser le pays choisi :
     ```typescript
     const selectedCountry = playerCountry.trim() || getRandomCountry();
     ```

3. **`app/page.tsx`**
   - Extraction de `playerCountry` et `setPlayerCountry` du hook
   - Passage de ces props à `SoloModeSetup`

## 💡 Logique

```typescript
const initSoloGame = () => {
  // Si le joueur a saisi un pays, l'utiliser
  // Sinon, utiliser un pays aléatoire
  const selectedCountry = playerCountry.trim() || getRandomCountry();
  const aiCountry = getRandomCountry();
  
  // ...
};
```

## ✨ Avantages

1. **Contrôle du joueur** : Le joueur choisit son pays
2. **Flexibilité** : Peut laisser vide pour un pays aléatoire
3. **Stratégie** : Le joueur peut choisir un pays difficile ou facile à deviner

## 🎯 Exemples de Pays

Le joueur peut choisir parmi les pays de la liste :
- FRANCE
- ALLEMAGNE
- ESPAGNE
- ITALIE
- etc. (voir `constants.ts`)

## 🚀 Utilisation

1. Lancer le jeu
2. Choisir "Jouer contre l'IA"
3. Saisir votre pays (ou laisser vide)
4. Choisir la difficulté
5. Commencer la partie

C'est terminé ! Le joueur choisit maintenant son pays à faire deviner ! 🎉

