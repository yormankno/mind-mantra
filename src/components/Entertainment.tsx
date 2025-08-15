import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Search,
  Gamepad2,
  Edit,
  Trash2,
  Play,
  Pause,
  Star,
  Clock,
  Users,
  Heart,
  TrendingUp,
  Headphones,
  Book,
  Video,
  Puzzle,
  Smile,
  Zap,
  Award,
  Timer,
  Target
} from "lucide-react";

const Entertainment = () => {
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const activities = [
    {
      id: 1,
      title: "Meditación Guiada: Respiración Consciente",
      description: "Sesión de 10 minutos de meditación enfocada en técnicas de respiración para reducir la ansiedad",
      type: "meditation",
      category: "Relajación",
      duration: "10 min",
      difficulty: "Principiante",
      participants: 89,
      rating: 4.8,
      completionRate: 92,
      status: "active",
      benefits: ["Reduce ansiedad", "Mejora concentración", "Aumenta calma"],
      instructions: "Encuentra un lugar cómodo, cierra los ojos y sigue las instrucciones de respiración...",
      resources: ["audio", "transcript"],
      tags: ["respiración", "ansiedad", "calma"],
      creator: "Dra. Carmen López",
      created: "2024-07-15",
      lastUsed: "2024-08-11",
      emoji: "🧘‍♀️"
    },
    {
      id: 2,
      title: "Diario de Gratitud Digital",
      description: "Ejercicio interactivo para practicar la gratitud diaria y mejorar el estado de ánimo",
      type: "journaling",
      category: "Bienestar Emocional",
      duration: "5 min",
      difficulty: "Fácil",
      participants: 156,
      rating: 4.9,
      completionRate: 88,
      status: "active",
      benefits: ["Mejora estado de ánimo", "Reduce depresión", "Aumenta bienestar"],
      instructions: "Escribe tres cosas por las que te sientes agradecido hoy...",
      resources: ["digital_journal", "prompts"],
      tags: ["gratitud", "estado de ánimo", "reflexión"],
      creator: "Dr. Antonio Ruiz",
      created: "2024-06-20",
      lastUsed: "2024-08-11",
      emoji: "📝"
    },
    {
      id: 3,
      title: "Rompecabezas Cognitivo: Patrones",
      description: "Juego de lógica diseñado para mejorar la función cognitiva y reducir el estrés",
      type: "game",
      category: "Estimulación Cognitiva",
      duration: "15 min",
      difficulty: "Intermedio",
      participants: 67,
      rating: 4.6,
      completionRate: 76,
      status: "active",
      benefits: ["Mejora concentración", "Reduce estrés", "Estimula mente"],
      instructions: "Resuelve los patrones siguiendo las secuencias lógicas presentadas...",
      resources: ["interactive_game", "hints"],
      tags: ["lógica", "concentración", "patrones"],
      creator: "Equipo de Desarrollo",
      created: "2024-08-01",
      lastUsed: "2024-08-10",
      emoji: "🧩"
    },
    {
      id: 4,
      title: "Soundscape: Sonidos de la Naturaleza",
      description: "Colección de paisajes sonoros naturales para relajación y reducción del estrés",
      type: "audio",
      category: "Relajación",
      duration: "30 min",
      difficulty: "Fácil",
      participants: 234,
      rating: 4.7,
      completionRate: 94,
      status: "active",
      benefits: ["Reduce estrés", "Mejora sueño", "Aumenta relajación"],
      instructions: "Ponte cómodo, usa auriculares y deja que los sonidos te transporten...",
      resources: ["audio_tracks", "timer"],
      tags: ["naturaleza", "relajación", "sueño"],
      creator: "Dra. María Fernández",
      created: "2024-05-10",
      lastUsed: "2024-08-11",
      emoji: "🌿"
    },
    {
      id: 5,
      title: "Ejercicios de Mindfulness",
      description: "Serie de ejercicios de atención plena para la vida cotidiana",
      type: "mindfulness",
      category: "Mindfulness",
      duration: "8 min",
      difficulty: "Principiante",
      participants: 112,
      rating: 4.5,
      completionRate: 85,
      status: "draft",
      benefits: ["Aumenta atención", "Reduce ansiedad", "Mejora bienestar"],
      instructions: "Practica estos ejercicios en cualquier momento del día...",
      resources: ["guided_exercises", "reminders"],
      tags: ["mindfulness", "atención", "presente"],
      creator: "Dr. Carlos Mendoza",
      created: "2024-08-05",
      lastUsed: "2024-08-08",
      emoji: "🎯"
    },
    {
      id: 6,
      title: "Terapia de Color: Mandalas Digitales",
      description: "Actividad de colorear mandalas interactivos para promover la relajación",
      type: "art",
      category: "Arte Terapia",
      duration: "20 min",
      difficulty: "Fácil",
      participants: 98,
      rating: 4.4,
      completionRate: 79,
      status: "paused",
      benefits: ["Reduce ansiedad", "Mejora concentración", "Aumenta creatividad"],
      instructions: "Selecciona colores y pinta el mandala siguiendo tu intuición...",
      resources: ["digital_canvas", "color_palette"],
      tags: ["arte", "creatividad", "relajación"],
      creator: "Dra. Elena Torres",
      created: "2024-07-01",
      lastUsed: "2024-08-05",
      emoji: "🎨"
    }
  ];

  const categories = [
    { value: "all", label: "Todas las categorías" },
    { value: "Relajación", label: "Relajación" },
    { value: "Bienestar Emocional", label: "Bienestar Emocional" },
    { value: "Estimulación Cognitiva", label: "Estimulación Cognitiva" },
    { value: "Mindfulness", label: "Mindfulness" },
    { value: "Arte Terapia", label: "Arte Terapia" }
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === "all" || activity.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meditation': return Headphones;
      case 'journaling': return Book;
      case 'game': return Puzzle;
      case 'audio': return Video;
      case 'mindfulness': return Target;
      case 'art': return Heart;
      default: return Gamepad2;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meditation': return 'therapeutic';
      case 'journaling': return 'wellness';
      case 'game': return 'care';
      case 'audio': return 'secondary';
      case 'mindfulness': return 'primary';
      case 'art': return 'care';
      default: return 'wellness';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'secondary';
      case 'draft': return 'wellness';
      case 'paused': return 'destructive';
      default: return 'muted';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'secondary';
      case 'Principiante': return 'secondary';
      case 'Intermedio': return 'wellness';
      case 'Avanzado': return 'destructive';
      default: return 'muted';
    }
  };

  const ActivityForm = ({ activity, onClose }: { activity?: any; onClose: () => void }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título de la actividad</Label>
        <Input id="title" defaultValue={activity?.title} placeholder="Ingresa el título" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          defaultValue={activity?.description}
          placeholder="Describe la actividad y sus beneficios..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo de actividad</Label>
          <Select defaultValue={activity?.type || "meditation"}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="meditation">Meditación</SelectItem>
              <SelectItem value="journaling">Diario</SelectItem>
              <SelectItem value="game">Juego</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="mindfulness">Mindfulness</SelectItem>
              <SelectItem value="art">Arte Terapia</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select defaultValue={activity?.category || "Relajación"}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Relajación">Relajación</SelectItem>
              <SelectItem value="Bienestar Emocional">Bienestar Emocional</SelectItem>
              <SelectItem value="Estimulación Cognitiva">Estimulación Cognitiva</SelectItem>
              <SelectItem value="Mindfulness">Mindfulness</SelectItem>
              <SelectItem value="Arte Terapia">Arte Terapia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Duración</Label>
          <Input id="duration" defaultValue={activity?.duration} placeholder="10 min" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="difficulty">Dificultad</Label>
          <Select defaultValue={activity?.difficulty || "Principiante"}>
            <SelectTrigger>
              <SelectValue placeholder="Dificultad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fácil">Fácil</SelectItem>
              <SelectItem value="Principiante">Principiante</SelectItem>
              <SelectItem value="Intermedio">Intermedio</SelectItem>
              <SelectItem value="Avanzado">Avanzado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Estado</Label>
          <Select defaultValue={activity?.status || "draft"}>
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Borrador</SelectItem>
              <SelectItem value="active">Activa</SelectItem>
              <SelectItem value="paused">Pausada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Instrucciones</Label>
        <Textarea
          id="instructions"
          defaultValue={activity?.instructions}
          placeholder="Proporciona instrucciones claras para la actividad..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="benefits">Beneficios (separados por comas)</Label>
        <Input
          id="benefits"
          defaultValue={activity?.benefits?.join(', ')}
          placeholder="Reduce ansiedad, Mejora concentración..."
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={onClose} className="bg-gradient-wellness text-white">
          {activity ? 'Actualizar' : 'Crear'} Actividad
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Entretenimiento Terapéutico</h1>
          <p className="text-muted-foreground mt-2">
            Gestiona actividades y recursos para el bienestar mental de tus pacientes
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            {/* <Button className="bg-gradient-wellness text-white shadow-soft hover:shadow-glow transition-gentle">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Actividad
            </Button> */}
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5 text-wellness" />
                Crear Nueva Actividad
              </DialogTitle>
            </DialogHeader>
            <ActivityForm onClose={() => setIsCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-wellness">
                <Gamepad2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Actividades Activas</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-care">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Participaciones</p>
                <p className="text-2xl font-bold">756</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-serenity">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valoración Media</p>
                <p className="text-2xl font-bold">4.7</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-serenity">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tasa Finalización</p>
                <p className="text-2xl font-bold">86%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar actividades por título, descripción o tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredActivities.map((activity) => {
          const TypeIcon = getTypeIcon(activity.type);
          return (
            <Card key={activity.id} className="shadow-card hover:shadow-glow transition-gentle">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex flex-col items-center gap-2">
                      <div className={`p-3 rounded-xl bg-gradient-${getTypeColor(activity.type)} shadow-soft`}>
                        <TypeIcon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-2xl">{activity.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {activity.description}
                      </p>
                      <div className="flex gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {activity.category}
                        </Badge>
                        <Badge variant={getDifficultyColor(activity.difficulty)} className="text-xs">
                          {activity.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="text-secondary">
                      <Play className="h-4 w-4" />
                    </Button>
                    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedActivity(activity)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Edit className="h-5 w-5 text-wellness" />
                            Editar Actividad
                          </DialogTitle>
                        </DialogHeader>
                        <ActivityForm activity={selectedActivity} onClose={() => setIsEditOpen(false)} />
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={getStatusColor(activity.status)}>
                      {activity.status === 'active' && 'Activa'}
                      {activity.status === 'draft' && 'Borrador'}
                      {activity.status === 'paused' && 'Pausada'}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-wellness fill-current" />
                      <span className="text-sm font-medium">{activity.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-lg font-bold text-wellness">{activity.participants}</p>
                      <p className="text-muted-foreground">Participantes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-care">{activity.duration}</p>
                      <p className="text-muted-foreground">Duración</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-therapeutic">{activity.completionRate}%</p>
                      <p className="text-muted-foreground">Completado</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tasa de finalización</span>
                      <span className="font-medium">{activity.completionRate}%</span>
                    </div>
                    <Progress value={activity.completionRate} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Beneficios:</p>
                    <div className="flex flex-wrap gap-1">
                      {activity.benefits.map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border">
                    <span className="flex items-center gap-1">
                      <Timer className="h-3 w-3" />
                      Última: {activity.lastUsed}
                    </span>
                    <span>Por: {activity.creator}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredActivities.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <Gamepad2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron actividades
            </h3>
            <p className="text-muted-foreground">
              Intenta ajustar los términos de búsqueda o crear una nueva actividad.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Entertainment;