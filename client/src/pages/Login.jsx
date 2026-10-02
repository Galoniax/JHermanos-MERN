import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/paths";
import AuthSection from "../components/auth/AuthSection";
import auth_bg from "../assets/images/auth_bg.webp";
import { useOAuth } from "../hooks/useOAuth";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { handleOAuth } = useOAuth();
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Por favor, completá tu correo y contraseña.");
      return;
    }

    setSubmitting(true);
    try {
      await authLogin(email.trim(), password);

      navigate(ROUTES.HOME);
    } catch (err) {
      console.error("Error en login:", err);
      setErrorMessage(
        err?.error ||
          err?.message ||
          "Credenciales incorrectas o error en el servidor.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthSection>
      <div className="relative w-full max-w-md rounded-2xl p-3 sm:p-6 shadow-2xl overflow-hidden">
        <img
          src={auth_bg}
          alt="Fondo de marco"
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        <section className="relative z-20 w-full bg-[var(--superficie)] rounded-xl p-6 sm:p-8 border border-black/10 flex flex-col justify-center">
          {/* Encabezado */}
          <div className="text-center mb-6">
            <h1 className="font-display font-bold text-3xl text-[var(--tinta)] tracking-tight">
              Bienvenido
            </h1>
            <p className="font-inter text-xs sm:text-sm text-[var(--tinta-suave)] mt-1.5">
              Ingresa tus datos para iniciar sesión
            </p>
          </div>

          {/* Inicios de sesión sociales */}
          <div className="grid grid-cols-1 gap-3 mb-5">
            <button
              type="button"
              onClick={() => handleOAuth("google")}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-stone-300 text-stone-700 font-medium text-xs hover:bg-stone-50 hover:border-stone-400 transition-all shadow-xs cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>
          </div>

          {/* Divisor */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="w-full border-t border-stone-200" />
            <span className="absolute bg-[var(--superficie)] px-3 text-xs text-stone-400 font-medium lowercase">
              o
            </span>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--tinta)] mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[var(--siena)] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--tinta)] mb-1.5">
                Contraseña
              </label>

              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[var(--siena)] focus:border-transparent transition-all"
                />

                {password.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute cursor-pointer right-3 top-0 bottom-0 text-stone-500 hover:text-stone-600 transition-colors"
                  >
                    <svg
                      className="w-4.5 h-4.5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      {showPass ? (
                        <path
                          fill="var(--tinta)"
                          d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z"
                        />
                      ) : (
                        <path
                          fill="var(--tinta)"
                          d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM236.5 202.7C260 185.9 288.9 176 320 176C399.5 176 464 240.5 464 320C464 351.1 454.1 379.9 437.3 403.5L402.6 368.8C415.3 347.4 419.6 321.1 412.7 295.1C399 243.9 346.3 213.5 295.1 227.2C286.5 229.5 278.4 232.9 271.1 237.2L236.4 202.5zM357.3 459.1C345.4 462.3 332.9 464 320 464C240.5 464 176 399.5 176 320C176 307.1 177.7 294.6 180.9 282.7L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L357.4 459.2z"
                        />
                      )}
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="text-right">
              <a
                href="#"
                className="text-xs font-medium text-stone-600 hover:text-[var(--siena)] hover:underline transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-600 font-medium text-center mb-2">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 bg-[var(--tinta)] hover:bg-[var(--siena)] text-[var(--alabastro)] font-semibold rounded-lg text-sm transition-colors shadow-md cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>

          {/* Llamado a Registro */}
          <p className="text-center text-xs text-stone-600 mt-5">
            ¿No tienes una cuenta?{" "}
            <Link
              to={ROUTES.REGISTER}
              className="font-bold text-[var(--tinta)] hover:text-[var(--siena)] hover:underline"
            >
              Regístrate
            </Link>
          </p>

          {/* Legales */}
          <p className="text-center text-[11px] text-stone-400 mt-4 leading-normal">
            Al continuar, aceptas nuestros{" "}
            <a href="#" className="hover:text-stone-600">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="hover:text-stone-600">
              Política de Privacidad
            </a>
            .
          </p>
        </section>
      </div>
    </AuthSection>
  );
}
