# 🚀 Comment Lancer le Projet

## ✅ Configuration Complète

Le projet est maintenant **entièrement configuré** et prêt à être lancé !

## 🎯 Lancer le Jeu

```bash
npm run dev
```

Puis ouvrez dans votre navigateur :
```
http://localhost:3000
```

> **Note** : Si le port 3000 est occupé, utilisez un autre port :
```bash
npm run dev -- -p 3001
```

## 📁 Structure Créée

```
Guest pays/
├── app/
│   ├── layout.tsx        ← Créé
│   ├── page.tsx          ← Créé (votre jeu)
│   └── globals.css       ← Créé
├── components/            ← Vos composants
├── hooks/                ← Vos hooks
├── utils/                ← Vos utilitaires
├── package.json          ← Créé
├── tailwind.config.js    ← Créé
├── postcss.config.js     ← Créé
└── tsconfig.json         ← Créé
```

## ⚡ Commandes Disponibles

```bash
# Lancer en mode développement
npm run dev

# Build pour production
npm run build

# Lancer en production
npm start
```

## 🎮 Utilisation

Une fois lancé, vous verrez :
1. **Sélection du mode de jeu** (Solo, Local, En ligne)
2. **Configuration** selon le mode choisi
3. **Jeu** avec interface complète

## 🐛 Si ça ne fonctionne pas

### Problème : Port déjà utilisé
```bash
npm run dev -- -p 3001
```

### Problème : Erreur de compilation
```bash
# Vider le cache et réinstaller
rm -rf .next node_modules
npm install
npm run dev
```

### Problème : Erreur de modules
```bash
# Réinstaller les dépendances
npm install
```

## 📝 Notes

- Le jeu utilise `window.storage` pour le mode multijoueur en ligne
- Assurez-vous que cette API est disponible dans votre environnement
- Les composants sont dans `/components`
- Les hooks sont dans `/hooks`
- Les utilitaires sont dans `/utils`

## 🎉 C'est Prêt !

Lancez simplement :
```bash
npm run dev
```

Et amusez-vous bien ! 🎮

