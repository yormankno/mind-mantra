import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users,
  Heart,
  Calendar,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const users = [
    {
      id: 1,
      name: "Ana García Ruiz",
      email: "ana.garcia@email.com",
      phone: "+34 612 345 678",
      age: 28,
      status: "active",
      riskLevel: "low",
      lastSession: "2024-08-10",
      joinDate: "2024-07-15",
      location: "Madrid, España",
      diagnosis: "Ansiedad leve",
      therapist: "Dr. Carlos Mendoza",
      progress: 75,
      sessions: 12,
      avatar: "AG"
    },
    {
      id: 2,
      name: "Carlos López Martín",
      email: "carlos.lopez@email.com",
      phone: "+34 687 912 345",
      age: 35,
      status: "active",
      riskLevel: "medium",
      lastSession: "2024-08-09",
      joinDate: "2024-06-20",
      location: "Barcelona, España",
      diagnosis: "Depresión moderada",
      therapist: "Dra. María Fernández",
      progress: 60,
      sessions: 18,
      avatar: "CL"
    },
    {
      id: 3,
      name: "María Rodríguez Silva",
      email: "maria.rodriguez@email.com",
      phone: "+34 698 765 432",
      age: 42,
      status: "inactive",
      riskLevel: "high",
      lastSession: "2024-08-05",
      joinDate: "2024-05-10",
      location: "Valencia, España",
      diagnosis: "Trastorno bipolar",
      therapist: "Dr. Antonio Ruiz",
      progress: 40,
      sessions: 25,
      avatar: "MR"
    },
    {
      id: 4,
      name: "Juan Pérez González",
      email: "juan.perez@email.com",
      phone: "+34 634 567 890",
      age: 31,
      status: "active",
      riskLevel: "low",
      lastSession: "2024-08-11",
      joinDate: "2024-08-01",
      location: "Sevilla, España",
      diagnosis: "Estrés laboral",
      therapist: "Dra. Carmen López",
      progress: 85,
      sessions: 6,
      avatar: "JP"
    },
    {
      id: 5,
      name: "Elena Martínez Torres",
      email: "elena.martinez@email.com",
      phone: "+34 667 234 567",
      age: 26,
      status: "pending",
      riskLevel: "medium",
      lastSession: null,
      joinDate: "2024-08-11",
      location: "Bilbao, España",
      diagnosis: "Evaluación inicial",
      therapist: "Pendiente asignación",
      progress: 0,
      sessions: 0,
      avatar: "EM"
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
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

  const UserForm = ({ user, onClose }: { user?: any; onClose: () => void }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre completo</Label>
          <Input id="name" defaultValue={user?.name} placeholder="Ingresa el nombre" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Edad</Label>
          <Input id="age" type="number" defaultValue={user?.age} placeholder="Edad" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue={user?.email} placeholder="email@ejemplo.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" defaultValue={user?.phone} placeholder="+34 600 000 000" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Ubicación</Label>
        <Input id="location" defaultValue={user?.location} placeholder="Ciudad, País" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Estado</Label>
          <Select defaultValue={user?.status || "pending"}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="inactive">Inactivo</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="risk">Nivel de riesgo</Label>
          <Select defaultValue={user?.riskLevel || "low"}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar riesgo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Bajo</SelectItem>
              <SelectItem value="medium">Medio</SelectItem>
              <SelectItem value="high">Alto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="diagnosis">Diagnóstico</Label>
        <Textarea id="diagnosis" defaultValue={user?.diagnosis} placeholder="Descripción del diagnóstico..." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="therapist">Terapeuta asignado</Label>
        <Input id="therapist" defaultValue={user?.therapist} placeholder="Nombre del terapeuta" />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={onClose} className="bg-gradient-serenity text-white">
          {user ? 'Actualizar' : 'Crear'} Usuario
        </Button>
      </div>
    </div>
  );

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
                      <p className="text-sm text-muted-foreground">{user.age} años</p>
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
                      <Phone className="h-4 w-4" />
                      {user.phone}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {user.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      {user.diagnosis}
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