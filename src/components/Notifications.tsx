import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Bell, 
  Send, 
  Edit, 
  Trash2,
  Clock,
  Users,
  Heart,
  Calendar,
  MessageSquare,
  Smartphone,
  Mail,
  CheckCircle,
  AlertCircle,
  Timer,
  Target,
  Zap
} from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const userLogined = JSON.parse(localStorage.getItem("loggedUser")) || null;

  // Obtener notificaciones desde la API
  useEffect(() => {
    fetch("http://localhost:3000/notifications")
      .then(res => res.json())
      .then(data => setNotifications(data.data || []))
      .catch(() => setNotifications([]));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'secondary';
      case 'paused': return 'wellness';
      case 'scheduled': return 'therapeutic';
      case 'draft': return 'muted';
      default: return 'muted';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'wellness';
      case 'low': return 'secondary';
      default: return 'muted';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meditation': return '🧘‍♀️';
      case 'mood': return '😊';
      case 'breathing': return '🌬️';
      case 'therapy': return '👩‍⚕️';
      case 'health': return '💧';
      default: return '🔔';
    }
  };

  // Función para crear notificación
  const createNotification = async (notificationData: any) => {
    try {
      const res = await fetch("http://localhost:3000/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notificationData),
      });
      if (res.ok) {
        const newNotification = await res.json();
        setNotifications((prev) => [...prev, newNotification]);
        setIsCreateOpen(false);
      }
    } catch (error) {
      alert("Error al crear notificación");
    }
  };

  // Modifica NotificationForm para manejar el submit
  const NotificationForm = ({ notification, onClose }: { notification?: any; onClose: () => void }) => {
    const [form, setForm] = useState({
      title: notification?.title || "",
      message: notification?.message || "",
      userId: notification?.userId || 2, // Puedes cambiar el userId según tu lógica
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setForm({ ...form, [id]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createNotification(form);
    };

    return (
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="title">Título de la notificación</Label>
          <Input id="title" value={form.title} onChange={handleChange} placeholder="Ingresa el título" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            id="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Escribe el mensaje que recibirán los usuarios..."
            rows={4}
          />
        </div>
        {/* <div className="space-y-2">
          <Label htmlFor="userId">ID de Usuario</Label>
          <Input id="userId" type="number" value={form.userId} onChange={handleChange} />
        </div> */}
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-gradient-care text-white">
            {notification ? 'Actualizar' : 'Crear'} Notificación
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
          <h1 className="text-3xl font-bold text-foreground">Notificaciones de Cuidado</h1>
          <p className="text-muted-foreground mt-2">
            Gestiona recordatorios y mensajes de bienestar para tus pacientes
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            {userLogined.role === 'paciente' ? null : (
              <Button className="bg-gradient-care text-white shadow-soft hover:shadow-glow transition-gentle">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Notificación
            </Button>
            )}
            
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-care" />
                Crear Nueva Notificación
              </DialogTitle>
            </DialogHeader>
            <NotificationForm onClose={() => setIsCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-care">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Notificaciones</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-wellness">
                <Send className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Enviadas Hoy</p>
                <p className="text-2xl font-bold">34</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-serenity">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tasa de Respuesta</p>
                <p className="text-2xl font-bold">74%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-serenity">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Usuarios Activos</p>
                <p className="text-2xl font-bold">173</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <div className="grid grid-cols-1 gap-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="shadow-card hover:shadow-glow transition-gentle">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="text-3xl">🔔</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">
                          {notification.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant={notification.status === 'unread' ? 'destructive' : 'secondary'}>
                        {notification.status === 'unread' ? 'No leída' : notification.status}
                      </Badge>
                      <span className="text-muted-foreground flex items-center gap-1">
                        Creada: {new Date(notification.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notifications;