# ⚡ Démarrage Rapide

## 🎯 Méthode la Plus Simple (2 minutes)

### Étape 1: Créer un nouveau projet Next.js
```bash
cd ..
npx create-next-app@latest pays-game --typescript --tailwind --app
cd pays-game
```

### Étape 2: Installer les dépendances
```bash
npm install lucide-react
```

### Étape 3: Copier votre code
```bash
# Depuis le dossier "Guest pays"
cp -r components ./app/
cp -r hooks ./app/
cp -r utils ./app/
cp types.ts ./app/
cp constants.ts ./app/
cp ../Guest\ pays/page.tsx ./app/page.tsx
```

### Étape 4: Créer app/layout.tsx
```bash
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
```

### Étape 5: Créer app/globals.css
```bash
cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF
```

### Étape 6: Lancer
```bash
npm run dev
```

Ouvrez : http://localhost:3000

---

## 🐛 Si ça ne marche pas

### Option Alternative (Plus Simple)

**Créer tout en une fois :**

```bash
# Créer le projet
cd ..
npx create-next-app@latest pays-game --typescript --tailwind --app

# Aller dans le projet
cd pays-game

# Installer lucide
npm install lucide-react

# Créer les dossiers
mkdir -p app/components app/hooks app/utils app/types

# Créer les fichiers de base
cat > app/layout.tsx << 'EOF'
import './globals.css'

export const metadata = {
  title: 'Devinez le Pays',
  description: 'Jeu de devinette de pays',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  )
}
EOF

cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

# Maintenant, téléchargez tout le contenu de "Guest pays" 
# et copiez les fichiers dans ce nouveau projet
```

Ensuite :
```bash
# Copier tout le code depuis "Guest pays"
cp -r ../Guest\ pays/* ./app/

# Lancer
npm run dev
```

## ⚡ Commande All-in-One

```bash
cd .. && \
npx create-next-app@latest pays-game --typescript --tailwind --app && \
cd pays-game && \
npm install lucide-react && \
echo "✅ Projet créé! Maintenant :" && \
echo "1. Copiez vos fichiers depuis 'Guest pays'" && \
echo "2. Créez app/layout.tsx et app/globals.css" && \
echo "3. Lancez: npm run dev"
```

## 📱 Après le lancement

1. Ouvrez http://localhost:3000
2. Le jeu apparaît avec les 3 modes de jeu
3. Profitez !

