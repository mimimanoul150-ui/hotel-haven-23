import { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { reservations, hotels } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, Heart, MapPin, Star } from "lucide-react";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  confirmed: "bg-booking-green text-primary-foreground",
  pending: "bg-secondary text-secondary-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
  completed: "bg-muted text-muted-foreground",
};

const statusLabels: Record<string, string> = {
  confirmed: "Confirmée",
  pending: "En attente",
  cancelled: "Annulée",
  completed: "Terminée",
};

export default function ClientDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  if (!isAuthenticated) return <Navigate to="/login" />;

  const favoriteHotels = hotels.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-foreground">Mon espace</h1>

        <Tabs defaultValue="reservations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:inline-flex">
            <TabsTrigger value="reservations" className="gap-1"><Calendar className="h-4 w-4 hidden sm:block" /> Réservations</TabsTrigger>
            <TabsTrigger value="history" className="gap-1">Historique</TabsTrigger>
            <TabsTrigger value="favorites" className="gap-1"><Heart className="h-4 w-4 hidden sm:block" /> Favoris</TabsTrigger>
            <TabsTrigger value="profile" className="gap-1"><User className="h-4 w-4 hidden sm:block" /> Profil</TabsTrigger>
          </TabsList>

          <TabsContent value="reservations">
            <div className="space-y-3">
              {reservations.filter((r) => r.status !== "completed").map((r) => (
                <div key={r.id} className="booking-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{r.hotelName}</h3>
                    <p className="text-sm text-muted-foreground">{r.roomType} · {r.guests} voyageur{r.guests > 1 ? "s" : ""}</p>
                    <p className="text-sm text-muted-foreground">{r.checkIn} → {r.checkOut}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={statusColors[r.status]}>{statusLabels[r.status]}</Badge>
                    <span className="font-bold text-foreground">{r.totalPrice} €</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-3">
              {reservations.map((r) => (
                <div key={r.id} className="booking-card p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{r.hotelName}</h3>
                    <Badge className={statusColors[r.status]}>{statusLabels[r.status]}</Badge>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-muted-foreground sm:grid-cols-4">
                    <div><span className="font-medium text-foreground">Chambre:</span> {r.roomType}</div>
                    <div><span className="font-medium text-foreground">Séjour:</span> {r.checkIn} – {r.checkOut}</div>
                    <div><span className="font-medium text-foreground">Prix:</span> {r.totalPrice} €</div>
                    <div><span className="font-medium text-foreground">Réservé le:</span> {r.createdAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteHotels.map((h) => (
                <div key={h.id} className="booking-card overflow-hidden">
                  <img src={h.images[0]} alt={h.name} className="h-40 w-full object-cover" loading="lazy" />
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{h.name}</h3>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3 w-3" /> {h.city}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: h.stars }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 star-filled fill-current" />
                        ))}
                      </div>
                      <span className="font-bold text-foreground">{h.price} €/nuit</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="booking-card max-w-lg p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Modifier mon profil</h3>
              <form onSubmit={(e) => { e.preventDefault(); toast.success("Profil mis à jour !"); }} className="space-y-4">
                <div>
                  <Label htmlFor="pname">Nom</Label>
                  <Input id="pname" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="pemail">Email</Label>
                  <Input id="pemail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="ppass">Nouveau mot de passe</Label>
                  <Input id="ppass" type="password" placeholder="••••••••" />
                </div>
                <Button type="submit">Enregistrer</Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
