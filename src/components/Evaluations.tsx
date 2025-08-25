import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Activity,
  HelpCircle

} from "lucide-react";

const API_BACKEND = import.meta.env.VITE_API_URL

const Evaluations = () => {
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [evaluations, setEvaluations] = useState<any[]>([]);
  
  useEffect(() => {
    fetch(`${API_BACKEND}/evaluations/base/all`)
      .then(res => res.json())
      .then(data => {
        console.log("PREGUNTAS: ", data);
        setEvaluations(data || [])
      })
      .catch(() => setEvaluations([]));
  }, []);


  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ANSIEDAD': return Brain;
      case 'DEPRESION': return Heart;
      case 'BIENESTAR': return Activity;
      case 'APOYO_SOCIAL': return CheckCircle;
      case 'trauma': return AlertTriangle;
      default: return ClipboardList;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ANSIEDAD': return 'care';
      case 'DEPRESION': return 'wellness';
      case 'BIENESTAR': return 'care';
      case 'APOYO_SOCIAL': return 'wellness';
      case 'trauma': return 'destructive';
      default: return 'primary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '0-25': return 'secondary';
      case '26-50': return 'wellness';
      case '51-75': return 'destructive';
      case '76-100': return 'care';
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

  const EvaluationEditForm = ({ evaluation, onClose, onSave }: { evaluation: any; onClose: () => void; onSave: (data: any) => void }) => {
    const [form, setForm] = useState({
      codeEval: evaluation?.codeEval || "",
      nameEval: evaluation?.nameEval || "",
      scoreMax: evaluation?.scoreMax || 0,
      form: evaluation?.form || "",
      interpretation: evaluation?.interpretation || [],
      questions: evaluation?.questions || [],
    });

    const [answersArray, setAnswersArray] = useState<any[]>([]);

    // Manejo de cambios para campos simples
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setForm({ ...form, [id]: id === "scoreMax" ? Number(value) : value });
    };

    // Manejo de cambios para interpretación
    const handleInterpretationChange = (idx: number, field: string, value: string) => {
      const updated = [...form.interpretation];
      updated[idx][field] = value;
      setForm({ ...form, interpretation: updated });
    };

    // Manejo de cambios para preguntas
    const handleQuestionChange = (
      idx: number,
      field: string,
      value: string | number,
      event: any
    ) => {
      event.preventDefault();
      const updated = [...form.questions];
      updated[idx][field] = value;
      setForm({ ...form, questions: updated });

      // Actualiza answersArray con la respuesta seleccionada
      const newAnswers = updated.map(q => ({
        question: q.text,
        answer: q.answer ?? ""
      }));
      setAnswersArray(newAnswers);
    };

    console.log("FORM RESPUESTAS: ", answersArray);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // Construir el objeto con la estructura requerida
      const payload = {
        userId: 2,
        type: form.codeEval || "PHQ-9",
        questions: form.questions.map((q: any) => ({
          question: q.text,
          answer: q.answer ?? ""
        }))
      };

      try {
        const res = await fetch(`${API_BACKEND}/evaluations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const evalResult = await res.json();

          const fechaEvaluacion = evalResult.createdAt
            ? new Date(evalResult.createdAt).toISOString().slice(0, 10)
            : "";

          // Enviar correo después de crear la evaluación
          await fetch(`${API_BACKEND}mail/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: "yormankno@gmail.com",
              subject: "Resultado de Mente sana",
              html: `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Resultado de Evaluación - Apoyo Social</title>
  <style>
    /* Estilos básicos compatibles con la mayoría de clientes */
    body { margin:0; padding:0; background-color:#f6f7fb; }
    table { border-spacing:0; }
    img { border:0; display:block; }
    a { color:#2563eb; text-decoration:none; }

    /* Tipografías de respaldo */
    .font { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, 'Helvetica Neue', Helvetica, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif; }

    /* Badges */
    .badge { display:inline-block; padding:4px 10px; border-radius:999px; font-size:12px; font-weight:600; }
    .badge-info { background:#e0f2fe; color:#0369a1; }
    .badge-score { background:#ecfdf5; color:#065f46; }

    /* Cards */
    .card { background:#ffffff; border-radius:12px; box-shadow:0 1px 2px rgba(0,0,0,0.06); }

    /* Small helpers for spacing */
    .px { padding-left:24px; padding-right:24px; }
    .py { padding-top:24px; padding-bottom:24px; }
    .mt-16 { margin-top:16px; }

    /* Responsive table fallback */
    @media only screen and (max-width:600px){
      .container { width:100% !important; }
      .px { padding-left:16px !important; padding-right:16px !important; }
    }
  </style>
</head>
<body class="font" style="margin:0; padding:0; background-color:#f6f7fb;">
  <center style="width:100%; background:#f6f7fb;">
    <table role="presentation" width="100%" style="max-width:640px; margin:0 auto;" class="container">
      <tr>
        <td class="px py">

          <!-- Header -->
          <table role="presentation" width="100%" class="card" style="background:#0f172a; color:#ffffff; border-radius:14px;">
            <tr>
              <td style="padding:20px 24px;">
                <table role="presentation" width="100%">
                  <tr>
                    <td align="left" style="font-weight:700; font-size:18px;">MenteSana</td>
                    <td align="right" style="font-size:12px; opacity:.9;">Notificación de evaluación</td>
                  </tr>
                </table>
                <h1 style="margin:10px 0 0; font-size:20px; line-height:1.4; color:#ffffff;">Resultado de Evaluación: <span style="color:#93c5fd;">${evalResult.type}</span></h1>
                <div style="margin-top:8px; font-size:12px; color:#cbd5e1;">Generado el <strong>13 de agosto de 2025, 8:39 p. m.</strong> (hora de Colombia)</div>
              </td>
            </tr>
          </table>

          <!-- Resumen -->
          <table role="presentation" width="100%" class="card mt-16" style="border-radius:12px;">
            <tr>
              <td style="padding:20px 24px;">
                <table role="presentation" width="100%">
                  <tr>
                    <td style="padding-bottom:10px; font-weight:700; font-size:16px; color:#0f172a;">Resumen</td>
                  </tr>
                </table>

                <table role="presentation" width="100%" style="font-size:14px; color:#334155;">
                  <tr>
                    <td style="padding:8px 0; color:#64748b;">Usuario</td>
                    <td style="padding:8px 0;">yorman programador &lt;<a href="mailto:${evalResult.user.email}">yormankno@gmail.com</a>&gt;</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; color:#64748b;">Tipo</td>
                    <td style="padding:8px 0;">
                      <span class="badge badge-info">${evalResult.type}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; color:#64748b;">Puntaje</td>
                    <td style="padding:8px 0;">
                      <span class="badge badge-score">${evalResult.score}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; color:#64748b;">Resultado</td>
                    <td style="padding:8px 0;"> Según la evaluación, obtuve un resultado de ${evalResult.score}, lo que indica una tendencia ${evalResult.result} a la ${evalResult.type}.  </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; color:#64748b;">Creado (UTC)</td>
                    <td style="padding:8px 0;">${fechaEvaluacion}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Detalle de preguntas -->
          <table role="presentation" width="100%" class="card mt-16" style="border-radius:12px;">
            <tr>
              <td style="padding:20px 24px;">
                <table role="presentation" width="100%">
                  <tr>
                    <td style="padding-bottom:10px; font-weight:700; font-size:16px; color:#0f172a;">Detalle de preguntas</td>
                  </tr>
                </table>

                <table role="presentation" width="100%" style="border-collapse:collapse; font-size:14px; color:#0f172a;">
                  <thead>
                    <tr>
                      <th align="left" style="padding:12px 10px; border-bottom:1px solid #e2e8f0; color:#64748b; font-weight:600;">#</th>
                      <th align="left" style="padding:12px 10px; border-bottom:1px solid #e2e8f0; color:#64748b; font-weight:600;">Pregunta</th>
                      <th align="left" style="padding:12px 10px; border-bottom:1px solid #e2e8f0; color:#64748b; font-weight:600;">Respuesta</th>
                    </tr>
                  </thead>
                  <tbody>
${evalResult.questions.map((q: any, idx: number) => (
                `<tr>
                      <td style="padding:10px; border-bottom:1px solid #f1f5f9;">${idx + 1}</td>
                      <td style="padding:10px; border-bottom:1px solid #f1f5f9;">${q.question}</td>
                      <td style="padding:10px; border-bottom:1px solid #f1f5f9;">${q.answer}</td>
                    </tr>`
              ))
                }
                  </tbody>
                </table>

                <!-- Nota -->
                <p style="margin:16px 0 0; font-size:12px; color:#64748b;">Escala asumida 1–5 (mayor = más acuerdo). Ajusta el texto si tu escala es diferente.</p>
              </td>
            </tr>
          </table>

          <!-- CTA / Footer -->
          <table role="presentation" width="100%" class="mt-16">
            
            <tr>
              <td align="center" style="font-size:12px; color:#94a3b8; padding-bottom:40px;">
                © 2025 MenteSana • Este email fue enviado automáticamente, por favor no responder a este mensaje.
              </td>
            </tr>
          </table>

          <!-- Comentarios para integración (no visibles por la mayoría de clientes) -->
          <!--
            Para usarlo como plantilla dinámica (ej. NestJS + @nestjs-modules/mailer):

            const html = renderTemplate({
              id: data.id,
              userName: data.user.name,
              userEmail: data.user.email,
              type: data.type,
              score: data.score,
              result: data.result,
              createdUtc: new Date(data.createdAt).toISOString().slice(0,19).replace('T',' '),
              createdLocal: new Date(data.createdAt).toLocaleString('es-CO', { timeZone:'America/Bogota', dateStyle:'long', timeStyle:'short' }),
              questions: data.questions
            })

            Luego reemplaza los valores dentro del HTML (busca por los literales actuales) o usa un motor de plantillas (Handlebars/EJS) con placeholders como {{userName}}.
          -->

        </td>
      </tr>
    </table>
  </center>
</body>
</html>
`
            }),
          });

          onSave(payload);
        } else {
          alert("Error al guardar la evaluación");
        }
      } catch (error) {
        alert("Error de conexión");
      }
    };

    const ratings = [
      { emoji: "😵", value: 1, label: "Very dissatisfied" },
      { emoji: "😞", value: 2, label: "Dissatisfied" },
      { emoji: "😐", value: 3, label: "Neutral" },
      { emoji: "😊", value: 4, label: "Satisfied" },
      { emoji: "😍", value: 5, label: "Very satisfied" },
    ]

    return (
      <form className="space-y-4" onSubmit={handleSubmit}>

        <div className="space-y-2">
          <Label htmlFor="nameEval">Nombre de la Evaluación: {form.nameEval}</Label>
        </div>
        <div>
          <Label className="space-y-2" >Preguntas</Label>
          <div className="space-y-2">
            {form.questions.map((q: any, idx: number) => (
              <div key={q.id} className="flex flex-col gap-2">
                <Label htmlFor="nameEval">{q.numberQuestion}. {q.text}</Label>

                {/* <Input
                  id={`question-${idx}`}
                  value={q.text}
                  onChange={(e) => handleQuestionChange(idx, "text", e.target.value)}
                  placeholder="Pregunta..." /> */}

                <div className="flex gap-6 mt-3 mb-3">
                  {ratings.map((rating) => (
                    <button
                      key={rating.value}
                      className={`
          w-10 h-10 rounded-full flex items-center justify-center text-3xl
          transition-all duration-200 hover:scale-105
          bg-orange-200 ring-2 ring-orange-300 bg-orange-100 hover:bg-orange-150
          ${form.questions[idx]?.answer === rating.value ? "ring-4 ring-orange-500" : ""}
        `}
                      aria-label={rating.label}
                      onClick={e => handleQuestionChange(idx, "answer", rating.value, e)}
                      type="button"
                    >
                      {rating.emoji}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>


        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-gradient-serenity text-white">
            Guardar Cambios
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
          <h1 className="text-3xl font-bold text-foreground">Evaluaciones de Diagnóstico</h1>
          <p className="text-muted-foreground mt-2">
            Administra cuestionarios y herramientas de evaluación psicológica
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            {/* <Button className="bg-gradient-serenity text-white shadow-soft hover:shadow-glow transition-gentle">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Evaluación
            </Button> */}
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
                <p className="text-2xl font-bold">4</p>
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
                <p className="text-2xl font-bold">2</p>
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
                <p className="text-2xl font-bold">1.2m</p>
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
        {evaluations.map((evaluation) => {
          const TypeIcon = getTypeIcon(evaluation.codeEval);
          return (
            <Card key={evaluation.id} className="shadow-card hover:shadow-glow transition-gentle">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-${getTypeColor(evaluation.codeEval)} shadow-soft`}>
                      <TypeIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {evaluation.nameEval}
                      </h3>

                      <Badge variant="outline" className="text-xs">
                        {evaluation.codeEval}
                      </Badge>
                    </div>
                  </div>
                  <div className="">
                    <Dialog open={isViewOpen} onOpenChange={setIsViewOpen} >
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
                      <DialogContent className="max-w-2xl h-screen p-0 overflow-hidden">
                        <div className="flex flex-col h-full">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Edit className="h-5 w-5 text-therapeutic" />
                              Realizar Evaluación
                            </DialogTitle>
                          </DialogHeader>
                          <div className="flex-1 overflow-y-auto p-4">

                            {selectedEvaluation && (
                              <EvaluationEditForm
                                evaluation={selectedEvaluation}
                                onClose={() => setIsEditOpen(false)}
                                onSave={(data) => {
                                  // Aquí puedes hacer el fetch PUT/PATCH a tu API
                                  setIsEditOpen(false);
                                }}
                              />
                            )}
                          </div>

                        </div>

                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">

                    <Badge variant={getSeverityColor(evaluation.severity)}>
                      Severidad {evaluation.severity === 'low' ? 'Baja' : evaluation.severity === 'medium' ? 'Media' : 'Alta'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-lg font-bold text-therapeutic">{evaluation.questions.length}</p>
                      <p className="text-muted-foreground">Preguntas</p>
                    </div>

                    <div className="text-center">
                      <p className="text-lg font-bold text-wellness">{evaluation.scoreMax}</p>
                      <p className="text-muted-foreground">Max Puntuación</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground"></span>
                      <span className="font-medium"></span>
                    </div>
                    <Progress value={evaluation.completionRate} className="h-2" />
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-serenity text-white"
                    onClick={() => {setSelectedEvaluation(evaluation); setIsEditOpen(true)}}
                  >
                    Realizar Evaluación
                  </Button>
                </div>
              </CardContent>
              
            </Card>
          );
        })}
      </div>

      {/* {filteredEvaluations.length === 0 && (
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
      )} */}

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {evaluations.map((evalItem) => {
          const TypeIcon = getTypeIcon(evalItem.codeEval);
          return <Card key={evalItem.id} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-${getTypeColor(evalItem.codeEval)} shadow-soft`}>
                  <TypeIcon className="h-6 w-6 text-white" />
                </div>
                <h2 className="font-semibold text-lg mb-1">{evalItem.nameEval}</h2>
                <p className="text-muted-foreground mb-2">Código: {evalItem.codeEval}</p>
                <p className="mb-2"><span className="font-medium">Puntaje Máximo:</span> {evalItem.scoreMax}</p>
                <p className="mb-2"><span className="font-medium">Fórmula:</span> {evalItem.form}</p>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Interpretación:</h4>
                  <ul className="list-disc ml-6 space-y-1">
                    {evalItem.interpretation.map((interp: any, idx: number) => (
                      <li key={idx}>
                        {/* <Badge variant={getStatusColor(evaluation.status)}>
                      {evaluation.status === 'active' && 'Activa'}
                      {evaluation.status === 'draft' && 'Borrador'}
                      {evaluation.status === 'paused' && 'Pausada'}
                    </Badge> */}
      {/* <Badge variant="outline" className="mr-2">{interp.nivel}</Badge>
                        <span>Rango: {interp.rango}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        })}
      </div>  */}
    </div>
  );
};

export default Evaluations;