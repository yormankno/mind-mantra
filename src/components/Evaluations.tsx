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
  ClipboardList, 
  Edit, 
  Trash2,
  Eye,
  BarChart3,
  Clock,
  Users,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  FileText,
  Brain,
  Heart,
  Activity
} from "lucide-react";

const Evaluations = () => {
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const evaluations = [
    {
      id: 1,
      title: "Escala de Ansiedad GAD-7",
      description: "Evaluación estandardizada para medir niveles de ansiedad generalizada",
      type: "anxiety",
      questions: 7,
      avgCompletionTime: "5 min",
      totalCompletions: 127,
      avgScore: 6.8,
      status: "active",
      created: "2024-07-15",
      lastCompleted: "2024-08-11",
      category: "Trastornos de Ansiedad",
      severity: "medium",
      completionRate: 89,
      results: [
        { userId: 1, userName: "Ana García", score: 8, severity: "medium", date: "2024-08-11" },
        { userId: 2, userName: "Carlos López", score: 12, severity: "high", date: "2024-08-10" },
        { userId: 4, userName: "Juan Pérez", score: 4, severity: "low", date: "2024-08-09" }
      ]
    },
    {
      id: 2,
      title: "Inventario de Depresión PHQ-9",
      description: "Herramienta de screening para detectar síntomas depresivos",
      type: "depression",
      questions: 9,
      avgCompletionTime: "7 min",
      totalCompletions: 98,
      avgScore: 9.2,
      status: "active",
      created: "2024-07-20",
      lastCompleted: "2024-08-11",
      category: "Trastornos del Estado de Ánimo",
      severity: "medium",
      completionRate: 92,
      results: [
        { userId: 2, userName: "Carlos López", score: 14, severity: "high", date: "2024-08-11" },
        { userId: 3, userName: "María Rodríguez", score: 16, severity: "high", date: "2024-08-10" },
        { userId: 1, userName: "Ana García", score: 6, severity: "low", date: "2024-08-09" }
      ]
    },
    {
      id: 3,
      title: "Escala de Estrés Percibido PSS-10",
      description: "Medición del nivel de estrés percibido en el último mes",
      type: "stress",
      questions: 10,
      avgCompletionTime: "6 min",
      totalCompletions: 156,
      avgScore: 18.5,
      status: "active",
      created: "2024-06-10",
      lastCompleted: "2024-08-11",
      category: "Estrés y Adaptación",
      severity: "high",
      completionRate: 95,
      results: [
        { userId: 4, userName: "Juan Pérez", score: 22, severity: "high", date: "2024-08-11" },
        { userId: 1, userName: "Ana García", score: 15, severity: "medium", date: "2024-08-10" },
        { userId: 5, userName: "Elena Martínez", score: 19, severity: "high", date: "2024-08-09" }
      ]
    },
    {
      id: 4,
      title: "Evaluación de Bienestar WHO-5",
      description: "Índice de bienestar general y calidad de vida",
      type: "wellbeing",
      questions: 5,
      avgCompletionTime: "3 min",
      totalCompletions: 89,
      avgScore: 14.2,
      status: "draft",
      created: "2024-08-05",
      lastCompleted: "2024-08-08",
      category: "Bienestar General",
      severity: "low",
      completionRate: 78,
      results: [
        { userId: 4, userName: "Juan Pérez", score: 18, severity: "low", date: "2024-08-08" },
        { userId: 1, userName: "Ana García", score: 16, severity: "low", date: "2024-08-07" },
        { userId: 2, userName: "Carlos López", score: 10, severity: "medium", date: "2024-08-06" }
      ]
    },
    {
      id: 5,
      title: "Cuestionario de Trauma PCL-5",
      description: "Screening para síntomas de estrés postraumático",
      type: "trauma",
      questions: 20,
      avgCompletionTime: "12 min",
      totalCompletions: 34,
      avgScore: 28.7,
      status: "paused",
      created: "2024-05-20",
      lastCompleted: "2024-08-05",
      category: "Trauma y Estrés",
      severity: "high",
      completionRate: 67,
      results: [
        { userId: 3, userName: "María Rodríguez", score: 42, severity: "high", date: "2024-08-05" },
        { userId: 2, userName: "Carlos López", score: 35, severity: "high", date: "2024-08-03" }
      ]
    }
  ];

  const filteredEvaluations = evaluations.filter(evaluation =>
    evaluation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evaluation.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evaluation.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'anxiety': return Brain;
      case 'depression': return Heart;
      case 'stress': return Activity;
      case 'wellbeing': return CheckCircle;
      case 'trauma': return AlertTriangle;
      default: return ClipboardList;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'anxiety': return 'therapeutic';
      case 'depression': return 'care';
      case 'stress': return 'wellness';
      case 'wellbeing': return 'secondary';
      case 'trauma': return 'destructive';
      default: return 'primary';
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'secondary';
      case 'medium': return 'wellness';
      case 'high': return 'destructive';
      default: return 'muted';
    }
  };

  const EvaluationForm = ({ evaluation, onClose }: { evaluation?: any; onClose: () => void }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título de la evaluación</Label>
        <Input id="title" defaultValue={evaluation?.title} placeholder="Ingresa el título" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea 
          id="description" 
          defaultValue={evaluation?.description} 
          placeholder="Describe el propósito y alcance de la evaluación..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo de evaluación</Label>
          <Select defaultValue={evaluation?.type || "anxiety"}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anxiety">Ansiedad</SelectItem>
              <SelectItem value="depression">Depresión</SelectItem>
              <SelectItem value="stress">Estrés</SelectItem>
              <SelectItem value="wellbeing">Bienestar</SelectItem>
              <SelectItem value="trauma">Trauma</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Input id="category" defaultValue={evaluation?.category} placeholder="Categoría clínica" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="questions">Número de preguntas</Label>
          <Input id="questions" type="number" defaultValue={evaluation?.questions} placeholder="5" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Tiempo estimado (min)</Label>
          <Input id="time" type="number" defaultValue={evaluation?.avgCompletionTime?.replace(' min', '')} placeholder="5" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Estado</Label>
          <Select defaultValue={evaluation?.status || "draft"}>
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

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={onClose} className="bg-gradient-serenity text-white">
          {evaluation ? 'Actualizar' : 'Crear'} Evaluación
        </Button>
      </div>
    </div>
  );

  const EvaluationResults = ({ evaluation }: { evaluation: any }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-therapeutic">{evaluation.totalCompletions}</p>
          <p className="text-sm text-muted-foreground">Completadas</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-care">{evaluation.avgScore}</p>
          <p className="text-sm text-muted-foreground">Puntuación Media</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-wellness">{evaluation.completionRate}%</p>
          <p className="text-sm text-muted-foreground">Tasa de Finalización</p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">Resultados Recientes</h4>
        {evaluation.results.map((result: any, index: number) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium">{result.userName}</p>
              <p className="text-sm text-muted-foreground">{result.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">{result.score}</p>
              <Badge variant={getSeverityColor(result.severity)}>
                {result.severity === 'low' ? 'Bajo' : result.severity === 'medium' ? 'Medio' : 'Alto'}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Evaluaciones de Diagnóstico</h1>
          <p className="text-muted-foreground mt-2">
            Administra cuestionarios y herramientas de evaluación psicológica
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-serenity text-white shadow-soft hover:shadow-glow transition-gentle">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Evaluación
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-therapeutic" />
                Crear Nueva Evaluación
              </DialogTitle>
            </DialogHeader>
            <EvaluationForm onClose={() => setIsCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-serenity">
                <ClipboardList className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Evaluaciones Activas</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-wellness">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completadas Hoy</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-care">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tasa Finalización</p>
                <p className="text-2xl font-bold">87%</p>
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
                <p className="text-sm text-muted-foreground">Tiempo Promedio</p>
                <p className="text-2xl font-bold">6.2m</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar evaluaciones por título, categoría o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Evaluations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvaluations.map((evaluation) => {
          const TypeIcon = getTypeIcon(evaluation.type);
          return (
            <Card key={evaluation.id} className="shadow-card hover:shadow-glow transition-gentle">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-${getTypeColor(evaluation.type)} shadow-soft`}>
                      <TypeIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {evaluation.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {evaluation.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {evaluation.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setSelectedEvaluation(evaluation)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-therapeutic" />
                            Resultados de {selectedEvaluation?.title}
                          </DialogTitle>
                        </DialogHeader>
                        {selectedEvaluation && <EvaluationResults evaluation={selectedEvaluation} />}
                      </DialogContent>
                    </Dialog>
                    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setSelectedEvaluation(evaluation)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Edit className="h-5 w-5 text-therapeutic" />
                            Editar Evaluación
                          </DialogTitle>
                        </DialogHeader>
                        <EvaluationForm evaluation={selectedEvaluation} onClose={() => setIsEditOpen(false)} />
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={getStatusColor(evaluation.status)}>
                      {evaluation.status === 'active' && 'Activa'}
                      {evaluation.status === 'draft' && 'Borrador'}
                      {evaluation.status === 'paused' && 'Pausada'}
                    </Badge>
                    <Badge variant={getSeverityColor(evaluation.severity)}>
                      Severidad {evaluation.severity === 'low' ? 'Baja' : evaluation.severity === 'medium' ? 'Media' : 'Alta'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-lg font-bold text-therapeutic">{evaluation.questions}</p>
                      <p className="text-muted-foreground">Preguntas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-care">{evaluation.totalCompletions}</p>
                      <p className="text-muted-foreground">Completadas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-wellness">{evaluation.avgScore}</p>
                      <p className="text-muted-foreground">Puntuación</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tasa de finalización</span>
                      <span className="font-medium">{evaluation.completionRate}%</span>
                    </div>
                    <Progress value={evaluation.completionRate} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {evaluation.avgCompletionTime}
                    </span>
                    <span>Última: {evaluation.lastCompleted}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredEvaluations.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron evaluaciones
            </h3>
            <p className="text-muted-foreground">
              Intenta ajustar los términos de búsqueda o crear una nueva evaluación.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Evaluations;