import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users,
  Heart,
  MapPin,
  Mail,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

const API_BACKEND = import.meta.env.VITE_API_URL

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]); // Cambia aquí

  // Nuevo: obtener usuarios desde la API
  useEffect(() => {
    fetch(`${API_BACKEND}/users`)
      .then(res => res.json())
      .then(data => {
        
        console.log("Usuarios obtenidos:", data.data);
        setUsers(data.data || [])})
      .catch(() => setUsers([]));
  }, []);

  const filteredUsers = users.filter(user =>
    (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'secondary';
      case 'inactive': return 'destructive';
      case 'pending': return 'wellness';
      default: return 'muted';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'secondary';
      case 'medium': return 'wellness';
      case 'high': return 'destructive';
      default: return 'muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'inactive': return AlertCircle;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  // Nueva función para crear usuario
  const createUser = async (userData: any) => {
    try {
      const res = await fetch(`${API_BACKEND}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (res.ok) {
        // Recargar usuarios después de crear
        const data = await res.json();
        setUsers((prev) => [...prev, data]);
        setIsCreateOpen(false);
      }
    } catch (error) {
      alert("Error al crear usuario");
    }
  };

  // Modifica el UserForm para manejar el submit
  const UserForm = ({ user, onClose }: { user?: any; onClose: () => void }) => {
    const [form, setForm] = useState({
      email: user?.email || "",
      role: user?.role || "paciente",
      name: user?.name || "",
      age: user?.age ?? "",
      gender: user?.gender || "",
      password: "123456",
    });
    console.log(form);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setForm({
        ...form,
        [id]: id === "age" ? Number(value) : value, // Asegura que age sea número
      });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createUser(form);
    };

    return (
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input id="name" value={form.name} onChange={handleChange} placeholder="Ingresa el nombre" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Edad</Label>
            <Input id="age" type="number" value={form.age} onChange={handleChange} placeholder="Edad" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={handleChange} placeholder="email@ejemplo.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Género</Label>
            <Input id="gender" value={form.gender} onChange={handleChange} placeholder="Género" />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-gradient-serenity text-white">
            {user ? 'Actualizar' : 'Crear'} Usuario
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Usuarios</h1>
          <p className="text-muted-foreground mt-2">
            Administra los perfiles de pacientes y su información médica
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-serenity text-white shadow-soft hover:shadow-glow transition-gentle">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Crear Nuevo Usuario
              </DialogTitle>
            </DialogHeader>
            <UserForm onClose={() => setIsCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuarios por nombre, email o diagnóstico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => {
          const StatusIcon = getStatusIcon(user.status);
          return (
            <Card key={user.id} className="shadow-card hover:shadow-glow transition-gentle group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-care flex items-center justify-center text-white font-semibold">
                      {user.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.age}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-gentle">
                    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Edit className="h-5 w-5 text-therapeutic" />
                            Editar Usuario
                          </DialogTitle>
                        </DialogHeader>
                        <UserForm user={selectedUser} onClose={() => setIsEditOpen(false)} />
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={getStatusColor(user.status)} className="flex items-center gap-1">
                      <StatusIcon className="h-3 w-3" />
                      {user.status === 'active' && 'Activo'}
                      {user.status === 'inactive' && 'Inactivo'}
                      {user.status === 'pending' && 'Pendiente'}
                    </Badge>
                    <Badge variant={getRiskColor(user.riskLevel)}>
                      Riesgo {user.riskLevel === 'low' ? 'Bajo' : user.riskLevel === 'medium' ? 'Medio' : 'Alto'}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      {user.gender}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {user.role}
                    </div>
                    
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="font-medium text-foreground">{user.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-1">
                      <div 
                        className="h-2 rounded-full bg-gradient-wellness transition-all duration-300"
                        style={{ width: `${user.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>{user.sessions} sesiones</span>
                      <span>
                        {user.lastSession ? `Última: ${user.lastSession}` : 'Sin sesiones'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {filteredUsers.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron usuarios
            </h3>
            <p className="text-muted-foreground">
              Intenta ajustar los términos de búsqueda o crear un nuevo usuario.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserManagement;