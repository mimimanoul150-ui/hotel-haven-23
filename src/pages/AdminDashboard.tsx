import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { hotels, reservations } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, Hotel as HotelIcon, Calendar, Users, BarChart3, LogOut, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const stats = [
  { label: "Clients", value: "2,847", icon: Users, color: "text-primary" },
  { label: "Réservations", value: "1,234", icon: Calendar, color: "text-booking-green" },
  { label: "Revenus", value: "248,500 €", icon: BarChart3, color: "text-secondary" },
  { label: "Hôtels", value: String(hotels.length), icon: HotelIcon, color: "text-primary" },
];

const statusColors: Record<string, string> = {
  confirmed: "bg-booking-green text-primary-foreground",
  pending: "bg-secondary text-secondary-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
  completed: "bg-muted text-muted-foreground",
};

export default function AdminDashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("stats");

  if (!isAuthenticated || user?.role !== "admin") return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-60 flex-shrink-0 border-r border-border bg-card lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-2 border-b border-border px-4">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className="font-bold text-foreground">Admin Panel</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {[
            { id: "stats", label: "Statistiques", icon: BarChart3 },
            { id: "hotels", label: "Hôtels", icon: HotelIcon },
            { id: "reservations", label: "Réservations", icon: Calendar },
            { id: "clients", label: "Clients", icon: Users },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                activeTab === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-border p-3">
          <button onClick={logout} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto bg-muted p-6">
        {/* Mobile tabs */}
        <div className="mb-6 lg:hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="hotels">Hôtels</TabsTrigger>
              <TabsTrigger value="reservations">Résas</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {activeTab === "stats" && (
          <div>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Tableau de bord</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="booking-card p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <s.icon className={`h-5 w-5 ${s.color}`} />
                  </div>
                  <p className="mt-2 text-2xl font-bold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Recent chart placeholder */}
            <div className="mt-6 booking-card p-6">
              <h3 className="mb-4 font-semibold text-foreground">Réservations récentes</h3>
              <div className="flex h-40 items-center justify-center text-muted-foreground">
                Graphique des réservations (sera connecté avec le backend)
              </div>
            </div>

            {/* Popular hotels */}
            <div className="mt-6 booking-card p-6">
              <h3 className="mb-4 font-semibold text-foreground">Hôtels les plus populaires</h3>
              <div className="space-y-3">
                {hotels.slice(0, 3).map((h, i) => (
                  <div key={h.id} className="flex items-center justify-between rounded-md bg-muted p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
                      <div>
                        <p className="font-medium text-foreground">{h.name}</p>
                        <p className="text-xs text-muted-foreground">{h.city} · {h.reviewCount} avis</p>
                      </div>
                    </div>
                    <span className="booking-rating text-sm">{h.rating}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "hotels" && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Gestion des hôtels</h2>
              <Button className="gap-1" onClick={() => toast.info("Fonctionnalité disponible après connexion backend")}><Plus className="h-4 w-4" /> Ajouter</Button>
            </div>
            <div className="space-y-3">
              {hotels.map((h) => (
                <div key={h.id} className="booking-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <img src={h.images[0]} alt={h.name} className="h-16 w-16 rounded-md object-cover" />
                    <div>
                      <h3 className="font-semibold text-foreground">{h.name}</h3>
                      <p className="text-sm text-muted-foreground">{h.city} · {h.totalRooms} chambres · {h.price} €/nuit</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1"><Pencil className="h-3 w-3" /> Modifier</Button>
                    <Button size="sm" variant="outline" className="gap-1 text-destructive hover:bg-destructive/10"><Trash2 className="h-3 w-3" /> Supprimer</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reservations" && (
          <div>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Toutes les réservations</h2>
            <div className="mb-4">
              <Input placeholder="Rechercher une réservation..." className="max-w-sm bg-card" />
            </div>
            <div className="overflow-x-auto booking-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="p-3">ID</th>
                    <th className="p-3">Hôtel</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Dates</th>
                    <th className="p-3">Prix</th>
                    <th className="p-3">Statut</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r) => (
                    <tr key={r.id} className="border-b border-border last:border-0">
                      <td className="p-3 font-mono text-xs text-muted-foreground">{r.id}</td>
                      <td className="p-3 font-medium text-foreground">{r.hotelName}</td>
                      <td className="p-3 text-muted-foreground">{r.userId}</td>
                      <td className="p-3 text-muted-foreground">{r.checkIn} → {r.checkOut}</td>
                      <td className="p-3 font-medium text-foreground">{r.totalPrice} €</td>
                      <td className="p-3"><Badge className={statusColors[r.status]}>{r.status}</Badge></td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => toast.success("Réservation confirmée")}>Confirmer</Button>
                          <Button size="sm" variant="outline" className="text-destructive" onClick={() => toast.error("Réservation annulée")}>Annuler</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "clients" && (
          <div>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Gestion des clients</h2>
            <div className="booking-card overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="p-3">Nom</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Réservations</th>
                    <th className="p-3">Total dépensé</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Marie Dupont", email: "marie@email.com", reservations: 3, total: "2,797 €" },
                    { name: "Pierre Leroy", email: "pierre@email.com", reservations: 1, total: "580 €" },
                    { name: "Sophie Martin", email: "sophie@email.com", reservations: 5, total: "4,230 €" },
                  ].map((c) => (
                    <tr key={c.email} className="border-b border-border last:border-0">
                      <td className="p-3 font-medium text-foreground">{c.name}</td>
                      <td className="p-3 text-muted-foreground">{c.email}</td>
                      <td className="p-3 text-muted-foreground">{c.reservations}</td>
                      <td className="p-3 font-medium text-foreground">{c.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
