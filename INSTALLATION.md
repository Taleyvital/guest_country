# 🚀 Comment Lancer le Projet "Devinez le Pays"

## 📋 Prérequis

Assurez-vous d'avoir installé :
- **Node.js** (version 18 ou supérieure)
- **npm** ou **yarn**

## 🔧 Installation

Le projet est actuellement un composant React standalone. Voici les options pour le lancer :

### Option 1 : Avec Next.js (Recommandé)

1. **Créer un nouveau projet Next.js** dans le répertoire parent :
```bash
cd ..
npx create-next-app@latest guest-pays-app --typescript --tailwind --app
cd guest-pays-app
```

2. **Copier les fichiers du projet** :
```bash
# Copier les fichiers du projet réorganisé
cp -r "../Guest pays/components" ./
cp -r "../Guest pays/hooks" ./
cp -r "../Guest pays/utils" ./
cp "../Guest pays/page.tsx" ./app/page.tsx
cp "../Guest pays/types.ts" ./
cp "../Guest pays/constants.ts" ./
```

3. **Installer les dépendances** :
```bash
npm install lucide-react
```

4. **Installer le storage API** (si nécessaire) :
```bash
# Selon votre API de stockage
```

5. **Lancer le projet** :
```bash
npm run dev
```

6. **Ouvrir dans le navigateur** :
```
http://localhost:3000
```

### Option 2 : Avec Vite (Simple)

1. **Créer un projet Vite** :
```bash
cd ..
npm create vite@latest guest-pays-app -- --template react-ts
cd guest-pays-app
```

2. **Installer les dépendances** :
```bash
npm install lucide-react
```

3. **Copier les fichiers** :
```bash
# Créer les dossiers
mkdir -p src/components src/hooks src/utils src/types

# Copier les fichiers
cp -r "../Guest pays/components" ./src/
cp -r "../Guest pays/hooks" ./src/
cp -r "../Guest pays/utils" ./src/
cp "../Guest pays/types.ts" ./src/
cp "../Guest pays/constants.ts" ./src/

# Créer App.tsx
cp "../Guest pays/page.tsx" ./src/App.tsx
```

4. **Configurer Tailwind CSS** :
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

5. **Mettre à jour `tailwind.config.js`** :
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

6. **Ajouter Tailwind à `src/index.css`** :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

7. **Lancer le projet** :
```bash
npm run dev
```

### Option 3 : Créer package.json dans le projet actuel

Si vous voulez créer `package.json` directement dans ce projet :

```bash
cd "Guest pays"

# Créer package.json
cat > package.json << 'EOF'
{
  "name": "guest-pays",
  "version": "1.0.0",
  "description": "Country Guess Game",
  "main": "page.tsx",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.294.0",
    "next": "^14.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
EOF

# Installer les dépendances
npm install

# Créer la structure Next.js basique
mkdir -p app public

# Créer app/layout.tsx
cat > app/layout.tsx << 'EOF'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
EOF

# Créer app/globals.css
cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

# Créer tailwind.config.js
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# Créer postcss.config.js
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Copier page.tsx vers app/page.tsx
cp page.tsx app/page.tsx

# Lancer
npm run dev
```

## 📦 Dépendances Nécessaires

Le projet utilise :
- **React** : Interface utilisateur
- **lucide-react** : Icônes
- **Tailwind CSS** : Styling
- **TypeScript** : Type safety
- **window.storage** : API de stockage (à configurer selon votre environnement)

## 🎯 Structure de lancement

```
Guest pays/
├── package.json (à créer)
├── tailwind.config.js (à créer)
├── postcss.config.js (à créer)
├── tsconfig.json (à créer)
├── app/ (si Next.js)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
└── [votre code existant]
```

## 🔥 Démarrage Rapide (Recommandé)

Pour démarrer rapidement, utilisez cette commande dans un nouveau terminal :

```bash
cd .. && npx create-next-app@latest guest-pays --typescript --tailwind --app && cd guest-pays && npm install lucide-react && echo "Projet créé! Copiez vos fichiers maintenant."
```

Ensuite copiez votre code dans le nouveau projet.

## ⚠️ Notes Importantes

1. **API Storage** : Le projet utilise `window.storage` qui doit être fournie par votre environnement
2. **Environment** : Assurez-vous que votre environnement supporte cette API
3. **Tailwind** : Configuré pour fonctionner avec tous les composants

## 🆘 Troubleshooting

**Problème** : `Module not found`
- **Solution** : Vérifiez que toutes les dépendances sont installées (`npm install`)

**Problème** : `window.storage is not defined`
- **Solution** : Configurez l'API de stockage selon votre environnement

**Problème** : Styles non appliqués
- **Solution** : Vérifiez que Tailwind est configuré et que `globals.css` est importé

## 📝 Commandes Utiles

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build pour production
npm run build

# Lancer en production
npm start
```

