import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hotel } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [params] = useSearchParams();
  const isSignupMode = params.get("mode") === "signup";
  const redirect = params.get("redirect") || "/";
  const [isSignup, setIsSignup] = useState(isSignupMode);
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginAdmin, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      signup(name, email, password);
      toast.success("Compte créé avec succès !");
      navigate(redirect);
    } else if (isAdmin) {
      loginAdmin(email, password);
      toast.success("Bienvenue, administrateur !");
      navigate("/admin");
    } else {
      login(email, password);
      toast.success("Connexion réussie !");
      navigate(redirect);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-2">
          <Hotel className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">StayBooker</span>
        </div>

        <div className="booking-card p-6">
          <h2 className="mb-1 text-xl font-bold text-foreground">
            {isSignup ? "Créer un compte" : isAdmin ? "Espace administrateur" : "Se connecter"}
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            {isSignup ? "Rejoignez StayBooker" : "Accédez à votre espace"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Marie Dupont" required />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemple.com" required />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full">
              {isSignup ? "S'inscrire" : "Se connecter"}
            </Button>
          </form>

          <div className="mt-4 space-y-2 text-center text-sm">
            {!isAdmin && (
              <button onClick={() => setIsSignup(!isSignup)} className="text-primary hover:underline">
                {isSignup ? "Déjà un compte ? Se connecter" : "Pas de compte ? S'inscrire"}
              </button>
            )}
            <div>
              <button onClick={() => { setIsAdmin(!isAdmin); setIsSignup(false); }} className="text-xs text-muted-foreground hover:text-foreground">
                {isAdmin ? "← Retour connexion client" : "Accès administrateur"}
              </button>
            </div>
          </div>
        </div>

        <button onClick={() => navigate("/")} className="mt-4 block w-full text-center text-sm text-muted-foreground hover:text-foreground">
          ← Retour à l'accueil
        </button>
      </div>
    </div>
  );
}
