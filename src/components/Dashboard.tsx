import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Bell, 
  ClipboardList, 
  Gamepad2,
  TrendingUp,
  Heart,
  Activity,
  Calendar,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface DashboardProps {
  onSectionChange: (section: string) => void;
}

const Dashboard = ({ onSectionChange }: DashboardProps) => {
  const stats = [
    {
      title: "Usuarios Activos",
      value: "248",
      change: "+12.5%",
      icon: Users,
      color: "bg-gradient-serenity",
      description: "En las últimas 24h"
    },
    {
      title: "Evaluaciones Completadas",
      value: "89",
      change: "+8.2%",
      icon: ClipboardList,
      color: "bg-gradient-wellness",
      description: "Esta semana"
    },
    {
      title: "Notificaciones Enviadas",
      value: "156",
      change: "+15.3%",
      icon: Bell,
      color: "bg-gradient-care",
      description: "Hoy"
    },
    {
      title: "Sesiones Terapéuticas",
      value: "34",
      change: "+6.7%",
      icon: Gamepad2,
      color: "bg-gradient-wellness",
      description: "En progreso"
    }
  ];

  const recentActivity = [
    {
      type: "evaluation",
      title: "Nueva evaluación de ansiedad completada",
      user: "Ana García",
      time: "Hace 15 min",
      status: "completed",
      severity: "medium"
    },
    {
      type: "notification",
      title: "Recordatorio de meditación enviado",
      user: "Carlos López",
      time: "Hace 32 min",
      status: "sent",
      severity: "low"
    },
    {
      type: "session",
      title: "Sesión de respiración iniciada",
      user: "María Rodríguez",
      time: "Hace 1h",
      status: "active",
      severity: "low"
    },
    {
      type: "alert",
      title: "Nivel de estrés elevado detectado",
      user: "Juan Pérez",
      time: "Hace 2h",
      status: "alert",
      severity: "high"
    }
  ];

  const quickActions = [
    {
      title: "Crear Usuario",
      description: "Agregar nuevo paciente al sistema",
      icon: Users,
      color: "secondary",
      action: () => onSectionChange('users')
    },
    {
      title: "Nueva Evaluación",
      description: "Configurar evaluación personalizada",
      icon: ClipboardList,
      color: "therapeutic",
      action: () => onSectionChange('evaluations')
    },
    {
      title: "Enviar Notificación",
      description: "Crear recordatorio de cuidado",
      icon: Bell,
      color: "care",
      action: () => onSectionChange('notifications')
    },
    {
      title: "Actividad Terapéutica",
      description: "Asignar ejercicio de bienestar",
      icon: Gamepad2,
      color: "wellness",
      action: () => onSectionChange('entertainment')
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'evaluation': return ClipboardList;
      case 'notification': return Bell;
      case 'session': return Activity;
      case 'alert': return AlertCircle;
      default: return CheckCircle;
    }
  };

  const getStatusColor = (status: string, severity: string) => {
    if (status === 'alert' || severity === 'high') return 'destructive';
    if (severity === 'medium') return 'wellness';
    return 'secondary';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard de Salud Mental</h1>
          <p className="text-muted-foreground mt-2">
            Monitorea el bienestar de tus pacientes en tiempo real
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-gradient-serenity text-white border-0">
            <Heart className="h-3 w-3 mr-1" />
            Sistema Activo
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-card hover:shadow-glow transition-gentle">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground mt-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-3 w-3 text-secondary" />
                      <span className="text-xs text-secondary font-medium">
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {stat.description}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${stat.color} shadow-soft`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-gentle">
                    <div className={`p-2 rounded-lg bg-gradient-serenity`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                    <Badge variant={getStatusColor(activity.status, activity.severity)}>
                      {activity.status === 'completed' && 'Completado'}
                      {activity.status === 'sent' && 'Enviado'}
                      {activity.status === 'active' && 'Activo'}
                      {activity.status === 'alert' && 'Alerta'}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-therapeutic" />
              Acciones Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto p-4 hover:shadow-soft transition-gentle"
                    onClick={action.action}
                  >
                    <div className={`p-2 rounded-lg bg-gradient-${action.color === 'secondary' ? 'wellness' : action.color === 'therapeutic' ? 'serenity' : action.color === 'care' ? 'care' : 'wellness'}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-sm">{action.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;