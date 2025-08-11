import { useState } from "react";
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
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Recordatorio de Meditación Matutina",
      message: "Es hora de tu sesión de meditación. Dedica 10 minutos para centrar tu mente y comenzar el día con tranquilidad.",
      type: "reminder",
      category: "meditation",
      recipients: 45,
      status: "active",
      frequency: "daily",
      time: "08:00",
      channels: ["push", "email"],
      priority: "medium",
      created: "2024-08-10",
      lastSent: "2024-08-11",
      responseRate: 78,
      icon: "🧘‍♀️"
    },
    {
      id: 2,
      title: "Verificación de Estado de Ánimo",
      message: "¿Cómo te sientes hoy? Registra tu estado emocional para un mejor seguimiento de tu bienestar.",
      type: "check-in",
      category: "mood",
      recipients: 32,
      status: "active",
      frequency: "daily",
      time: "20:00",
      channels: ["push"],
      priority: "high",
      created: "2024-08-08",
      lastSent: "2024-08-11",
      responseRate: 85,
      icon: "😊"
    },
    {
      id: 3,
      title: "Ejercicios de Respiración",
      message: "Tómate un momento para practicar ejercicios de respiración profunda. Tu mente y cuerpo te lo agradecerán.",
      type: "activity",
      category: "breathing",
      recipients: 28,
      status: "paused",
      frequency: "weekly",
      time: "15:30",
      channels: ["push", "sms"],
      priority: "low",
      created: "2024-08-05",
      lastSent: "2024-08-09",
      responseRate: 62,
      icon: "🌬️"
    },
    {
      id: 4,
      title: "Cita con Terapeuta",
      message: "Recordatorio: Tu próxima sesión con el Dr. Mendoza es mañana a las 16:00. ¿Necesitas reprogramar?",
      type: "appointment",
      category: "therapy",
      recipients: 1,
      status: "scheduled",
      frequency: "once",
      time: "16:00",
      channels: ["push", "email", "sms"],
      priority: "high",
      created: "2024-08-11",
      lastSent: null,
      responseRate: 0,
      icon: "👩‍⚕️"
    },
    {
      id: 5,
      title: "Hidratación y Autocuidado",
      message: "¿Has bebido suficiente agua hoy? Recuerda mantener tu cuerpo hidratado para un mejor bienestar general.",
      type: "wellness",
      category: "health",
      recipients: 67,
      status: "active",
      frequency: "daily",
      time: "14:00",
      channels: ["push"],
      priority: "low",
      created: "2024-08-01",
      lastSent: "2024-08-11",
      responseRate: 45,
      icon: "💧"
    }
  ];

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

  const NotificationForm = ({ notification, onClose }: { notification?: any; onClose: () => void }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título de la notificación</Label>
        <Input id="title" defaultValue={notification?.title} placeholder="Ingresa el título" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea 
          id="message" 
          defaultValue={notification?.message} 
          placeholder="Escribe el mensaje que recibirán los usuarios..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Select defaultValue={notification?.type || "reminder"}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reminder">Recordatorio</SelectItem>
              <SelectItem value="check-in">Verificación</SelectItem>
              <SelectItem value="activity">Actividad</SelectItem>
              <SelectItem value="appointment">Cita</SelectItem>
              <SelectItem value="wellness">Bienestar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select defaultValue={notification?.category || "meditation"}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="meditation">Meditación</SelectItem>
              <SelectItem value="mood">Estado de ánimo</SelectItem>
              <SelectItem value="breathing">Respiración</SelectItem>
              <SelectItem value="therapy">Terapia</SelectItem>
              <SelectItem value="health">Salud</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priority">Prioridad</Label>
          <Select defaultValue={notification?.priority || "medium"}>
            <SelectTrigger>
              <SelectValue placeholder="Prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Baja</SelectItem>
              <SelectItem value="medium">Media</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="frequency">Frecuencia</Label>
          <Select defaultValue={notification?.frequency || "daily"}>
            <SelectTrigger>
              <SelectValue placeholder="Frecuencia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="once">Una vez</SelectItem>
              <SelectItem value="daily">Diario</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Hora</Label>
          <Input id="time" type="time" defaultValue={notification?.time} />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Canales de envío</Label>
        <div className="flex gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="push" defaultChecked={notification?.channels?.includes('push')} />
            <Label htmlFor="push" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Push
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="email" defaultChecked={notification?.channels?.includes('email')} />
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="sms" defaultChecked={notification?.channels?.includes('sms')} />
            <Label htmlFor="sms" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              SMS
            </Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={onClose} className="bg-gradient-care text-white">
          {notification ? 'Actualizar' : 'Crear'} Notificación
        </Button>
      </div>
    </div>
  );

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
            <Button className="bg-gradient-care text-white shadow-soft hover:shadow-glow transition-gentle">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Notificación
            </Button>
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
                  <div className="text-3xl">{notification.icon}</div>
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
                      <div className="flex gap-2">
                        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => setSelectedNotification(notification)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Edit className="h-5 w-5 text-care" />
                                Editar Notificación
                              </DialogTitle>
                            </DialogHeader>
                            <NotificationForm notification={selectedNotification} onClose={() => setIsEditOpen(false)} />
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-gradient-care text-white">
                          <Send className="h-4 w-4 mr-2" />
                          Enviar
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant={getStatusColor(notification.status)}>
                        {notification.status === 'active' && 'Activa'}
                        {notification.status === 'paused' && 'Pausada'}
                        {notification.status === 'scheduled' && 'Programada'}
                      </Badge>
                      <Badge variant={getPriorityColor(notification.priority)}>
                        Prioridad {notification.priority === 'high' ? 'Alta' : notification.priority === 'medium' ? 'Media' : 'Baja'}
                      </Badge>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {notification.recipients} usuarios
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {notification.time}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex gap-2">
                        {notification.channels.map((channel) => (
                          <Badge key={channel} variant="outline" className="text-xs">
                            {channel === 'push' && <Smartphone className="h-3 w-3 mr-1" />}
                            {channel === 'email' && <Mail className="h-3 w-3 mr-1" />}
                            {channel === 'sms' && <MessageSquare className="h-3 w-3 mr-1" />}
                            {channel.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Frecuencia: {notification.frequency === 'daily' ? 'Diaria' : notification.frequency === 'weekly' ? 'Semanal' : notification.frequency === 'monthly' ? 'Mensual' : 'Una vez'}</span>
                        <span>Respuesta: {notification.responseRate}%</span>
                        {notification.lastSent && (
                          <span>Último envío: {notification.lastSent}</span>
                        )}
                      </div>
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