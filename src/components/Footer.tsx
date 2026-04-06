import { Hotel } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Hotel className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground">StayBooker</span>
            </div>
            <p className="text-sm text-muted-foreground">La meilleure plateforme pour trouver et réserver votre hébergement idéal.</p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Découvrir</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Destinations populaires</li>
              <li>Offres du moment</li>
              <li>Avis voyageurs</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Aide</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Centre d'aide</li>
              <li>Conditions générales</li>
              <li>Politique de confidentialité</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Contact</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>support@staybooker.com</li>
              <li>+33 1 23 45 67 89</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          © 2026 StayBooker. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
