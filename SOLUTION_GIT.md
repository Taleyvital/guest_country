# 🔧 Solution - Problème Git Push

## 🐛 Problème

GitHub refuse le push car un fichier de `node_modules` est trop gros (111.53 MB > 100 MB).

**Erreur** :
```
remote: error: File node_modules/@next/swc-darwin-x64/next-swc.darwin-x64.node is 111.53 MB
```

## ✅ Solution

Le fichier `.gitignore` a été créé. Suivez ces étapes :

### Étape 1 : Nettoyer le dépôt Git

```bash
# Retirer node_modules du cache Git
git rm -r --cached node_modules/

# Si vous avez d'autres fichiers à exclure
git rm -r --cached .next/ 2>/dev/null || true

# Ajouter le .gitignore
git add .gitignore
```

### Étape 2 : Commit des changements

```bash
git add .
git commit -m "Ajout .gitignore et suppression node_modules du dépôt"
```

### Étape 3 : Push sur GitHub

```bash
git push origin main
```

## ⚠️ Important

**NE COMMITTEZ JAMAIS `node_modules` sur GitHub** car :
- ❌ Taille énorme (centaines de MB)
- ❌ Pas nécessaire (autres devs peuvent faire `npm install`)
- ❌ Peut causer des erreurs de push
- ❌ Limite GitHub de 100 MB par fichier

## 📋 Contenu du .gitignore

Le fichier `.gitignore` exclut maintenant :
- `node_modules/` - Dépendances
- `.next/` - Build Next.js
- `.DS_Store` - Fichiers système Mac
- `*.log` - Fichiers de log
- `.env` - Variables d'environnement
- etc.

## 🎯 Après le Push

Les autres développeurs pourront :
1. Cloner le dépôt
2. Lancer `npm install`
3. Lancer `npm run dev`

## 🚀 Commandes Complètes

Copiez-collez ces commandes :

```bash
# Nettoyer le dépôt
git rm -r --cached node_modules/ .next/ 2>/dev/null || true

# Ajouter le .gitignore
git add .gitignore

# Commit
git commit -m "fix: Add .gitignore and remove node_modules"

# Push
git push origin main
```

✅ **Cichon devrait résoudre votre problème !**

