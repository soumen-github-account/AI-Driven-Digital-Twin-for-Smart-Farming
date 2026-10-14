import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Loader2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

function GoogleCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [error, setError] = useState("");

  useEffect(() => {
    const handleCallback = () => {
      try {
        const token = searchParams.get("token");

        const googleError =
          searchParams.get("google_error");

        // ==========================================
        // GOOGLE ERROR
        // ==========================================

        if (googleError) {
          setError(
            googleError === "cancelled"
              ? "Google login was cancelled."
              : googleError === "invalid_state"
              ? "Google authentication session expired. Please try again."
              : "Google authentication failed."
          );

          setTimeout(() => {
            navigate("/login", {
              replace: true,
            });
          }, 2500);

          return;
        }

        // ==========================================
        // TOKEN MISSING
        // ==========================================

        if (!token) {
          setError(
            "Authentication token was not received."
          );

          setTimeout(() => {
            navigate("/login", {
              replace: true,
            });
          }, 2500);

          return;
        }

        // ==========================================
        // SAVE JWT
        // ==========================================

        localStorage.setItem(
          "agritwin_token",
          token
        );

        console.log(
          "Google authentication successful."
        );

        // ==========================================
        // GO DASHBOARD
        // ==========================================

        navigate("/dashboard", {
          replace: true,
        });
      } catch (err) {
        console.error(
          "Google callback error:",
          err
        );

        setError(
          "Unable to complete Google login."
        );

        setTimeout(() => {
          navigate("/login", {
            replace: true,
          });
        }, 2500);
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  if (error) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[var(--color-bg)]
          px-4
        "
      >
        <div
          className="
            w-full
            max-w-md
            rounded-2xl
            border
            border-red-500/20
            bg-[var(--color-surface)]
            p-8
            text-center
            shadow-xl
          "
        >
          <div
            className="
              mx-auto
              mb-4
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-red-500/10
              text-red-500
            "
          >
            <AlertCircle size={24} />
          </div>

          <h2
            className="
              text-lg
              font-bold
              text-[var(--color-text-primary)]
            "
          >
            Google Login Failed
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-[var(--color-text-secondary)]
            "
          >
            {error}
          </p>

          <p
            className="
              mt-4
              text-xs
              text-[var(--color-text-muted)]
            "
          >
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[var(--color-bg)]
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          p-8
          text-center
          shadow-xl
        "
      >
        <div
          className="
            mx-auto
            mb-5
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-[var(--color-primary)]/10
            text-[var(--color-primary)]
          "
        >
          <ShieldCheck size={28} />
        </div>

        <h2
          className="
            text-xl
            font-black
            text-[var(--color-text-primary)]
          "
        >
          Signing you in...
        </h2>

        <p
          className="
            mt-2
            text-sm
            text-[var(--color-text-secondary)]
          "
        >
          Completing your Google authentication.
        </p>

        <Loader2
          size={22}
          className="
            mx-auto
            mt-6
            animate-spin
            text-[var(--color-primary)]
          "
        />
      </div>
    </div>
  );
}

export default GoogleCallback;