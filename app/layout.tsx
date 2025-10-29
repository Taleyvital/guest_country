import './globals.css'

export const metadata = {
  title: 'Devinez le Pays - Country Guess Game',
  description: 'Un jeu de devinette de pays multijoueur avec support IA et en ligne',
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

