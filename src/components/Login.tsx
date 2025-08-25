import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Mail, Lock, Heart, Eye, EyeOff, LogIn, ShieldCheck } from "lucide-react";

interface LoginProps {
  onLogin?: (email: string) => void;
  onGoToRegister?: () => void;
  onGoToReset?: () => void;
}

const API_BACKEND = import.meta.env.VITE_API_URL

export default function Login({ onLogin, onGoToRegister, onGoToReset }: LoginProps) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 👉 Aquí conectas tu lógica real (fetch/axios a tu API NestJS)
      // Simulación breve
    const auth = await fetch(`${API_BACKEND}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then(res => res.json()).then(data => 
        
        data
    );

      console.log("Autenticación simulada:", auth);
      if (auth.error) {
          throw new Error("Credenciales incorrectas");
    } else {
          onLogin?.(auth.data);
      }

      if (!email || !password) {
        throw new Error("Por favor completa tus credenciales");
      }

    //   onLogin?.(email);
    } catch (err: any) {
      setError(err?.message ?? "Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-card hover:shadow-glow transition-gentle">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-serenity shadow-soft">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-2xl">Bienvenido a MenteSana</CardTitle>
            </div>
            <Badge variant="outline" className="bg-gradient-wellness text-white border-0">Seguro</Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Inicia sesión para monitorear el bienestar en tiempo real
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Correo electrónico</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 grid place-items-center">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Contraseña</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 grid place-items-center">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </span>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-3 grid place-items-center hover:opacity-80"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
                <Label htmlFor="remember" className="text-sm text-muted-foreground">Recordarme</Label>
              </div>
              <button
                type="button"
                onClick={onGoToReset}
                className="text-sm text-therapeutic hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 gap-2 font-medium bg-gradient-care hover:opacity-95"
              disabled={loading}
            >
              <LogIn className="h-4 w-4" />
              {loading ? "Accediendo..." : "Iniciar sesión"}
            </Button>

            {/* Divider */}
            <div className="relative py-3">
              <div className="h-px bg-muted" />
              <span className="absolute inset-0 -top-3 mx-auto w-max px-3 text-xs text-muted-foreground bg-background">
                ó
              </span>
            </div>

            {/* Register link */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 gap-2 hover:shadow-soft"
              onClick={onGoToRegister}
            >
              <ShieldCheck className="h-4 w-4" />
              Crear una cuenta segura
            </Button>

            {/* Error */}
            {error && (
              <div className="text-sm text-destructive/90 bg-destructive/10 border border-destructive/20 rounded-md p-3">
                {error}
              </div>
            )}

            {/* Footer tiny status */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
              <span className="inline-flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Sistema Activo
              </span>
              <span>•</span>
              <span>Protegido con buenas prácticas</span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
