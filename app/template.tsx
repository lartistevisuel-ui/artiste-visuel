// Rejoué à chaque changement de page : anime l'entrée du contenu.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
