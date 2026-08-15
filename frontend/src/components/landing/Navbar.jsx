import { Sprout, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"


function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "AI Features", href: "#ai-features" },
    { name: "Technology", href: "#technology" },
    { name: "About", href: "#about" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-10">
      <nav
        className="
          mx-auto
          flex
          h-[58px]
          max-w-[1400px]
          items-center
          justify-between

          rounded-[20px]

          border
          border-[var(--color-border)]

          bg-[var(--color-surface)]/90
          backdrop-blur-xl

          px-4
          shadow-[0_8px_30px_rgba(0,0,0,0.06)]

          transition-all
          duration-300

          sm:px-5
          lg:h-[64px]
          lg:rounded-[24px]
          lg:px-7
        "
      >
        {/* =========================================================
            LOGO
        ========================================================= */}
        <a
          href="#home"
          className="
            flex
            shrink-0
            items-center
            gap-2
          "
        >
          {/* Logo Icon */}
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              sm:h-9
              sm:w-9
            "
          >
            {/* <Sprout
              size={30}
              strokeWidth={2.2}
              className="text-[var(--color-primary)]"
            /> */}
            <img src={logo} alt="logo image" />
          </div>

          {/* Brand */}
          <div className="flex items-center gap-1.5">
            <span
              className="
                text-[18px]
                font-extrabold
                tracking-[-0.7px]
                text-[var(--color-text-primary)]

                sm:text-[20px]
              "
            >
              AgriTwin
            </span>

            {/* AI Badge */}
            <span
              className="
                rounded-[5px]
                border
                border-[var(--color-primary)]
                px-[5px]
                py-[2px]
                text-[8px]
                font-bold
                leading-none
                text-[var(--color-primary)]

                sm:text-[9px]
              "
            >
              AI
            </span>
          </div>
        </a>

        {/* =========================================================
            DESKTOP NAVIGATION
        ========================================================= */}
        <div className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className={`
                relative
                py-1

                text-[11px]
                font-semibold

                transition-colors
                duration-200

                xl:text-[12px]

                ${
                  index === 0
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-text-primary)] hover:text-[var(--color-primary)]"
                }
              `}
            >
              {link.name}

              {/* Active underline */}
              {index === 0 && (
                <span
                  className="
                    absolute
                    -bottom-[5px]
                    left-0
                    h-[2px]
                    w-full
                    rounded-full
                    bg-[var(--color-primary)]
                  "
                />
              )}
            </a>
          ))}
        </div>

        {/* =========================================================
            DESKTOP RIGHT ACTIONS
        ========================================================= */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* ================= THEME TOGGLE ================= */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="
              relative
              h-[32px]
              w-[62px]
              shrink-0
              rounded-full

              border
              border-[var(--color-border)]

              bg-[var(--color-surface-secondary)]

              p-1

              transition-all
              duration-300

              hover:border-[var(--color-primary)]
            "
          >
            {/* Sun */}
            <Sun
              size={14}
              strokeWidth={2.3}
              className="
                absolute
                left-[8px]
                top-1/2
                -translate-y-1/2
                text-[var(--color-warning)]
              "
            />

            {/* Moon */}
            <Moon
              size={14}
              strokeWidth={2.3}
              className="
                absolute
                right-[8px]
                top-1/2
                -translate-y-1/2
                text-[var(--color-ai-purple)]
              "
            />

            {/* Sliding Circle */}
            <span
              className={`
                absolute
                top-[3px]

                flex
                h-[24px]
                w-[24px]
                items-center
                justify-center

                rounded-full

                bg-[var(--color-primary)]
                text-white

                shadow-[0_2px_8px_rgba(22,163,74,0.35)]

                transition-transform
                duration-300
                ease-in-out

                ${
                  theme === "dark"
                    ? "translate-x-[30px]"
                    : "translate-x-0"
                }
              `}
            >
              {theme === "dark" ? (
                <Moon
                  size={13}
                  strokeWidth={2.5}
                />
              ) : (
                <Sun
                  size={13}
                  strokeWidth={2.5}
                />
              )}
            </span>
          </button>

          {/* ================= GET STARTED ================= */}
          <Link
            to="/register"
            className="
              inline-flex
              h-[34px]
              items-center
              justify-center

              rounded-[8px]

              bg-[var(--color-primary)]

              px-5

              text-[11px]
              font-bold
              text-white

              shadow-[0_4px_12px_rgba(22,163,74,0.18)]

              transition-all
              duration-200

              hover:bg-[var(--color-primary-hover)]
              hover:shadow-[0_6px_18px_rgba(22,163,74,0.25)]

              active:scale-95
            "
          >
            Get Started
          </Link>
        </div>

        {/* =========================================================
            MOBILE ACTIONS
        ========================================================= */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="
              relative
              h-[32px]
              w-[58px]

              rounded-full

              border
              border-[var(--color-border)]

              bg-[var(--color-surface-secondary)]

              p-1

              transition-all
              duration-300

              hover:border-[var(--color-primary)]
            "
          >
            <Sun
              size={13}
              className="
                absolute
                left-[7px]
                top-1/2
                -translate-y-1/2
                text-[var(--color-warning)]
              "
            />

            <Moon
              size={13}
              className="
                absolute
                right-[7px]
                top-1/2
                -translate-y-1/2
                text-[var(--color-ai-purple)]
              "
            />

            <span
              className={`
                absolute
                top-[3px]
                flex
                h-[24px]
                w-[24px]
                items-center
                justify-center
                rounded-full
                bg-[var(--color-primary)]
                text-white
                shadow-sm
                transition-transform
                duration-300
                ease-in-out

                ${
                  theme === "dark"
                    ? "translate-x-[26px]"
                    : "translate-x-0"
                }
              `}
            >
              {theme === "dark" ? (
                <Moon size={12} />
              ) : (
                <Sun size={12} />
              )}
            </span>
          </button>

          {/* Menu */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center

              rounded-lg

              border
              border-[var(--color-border)]

              bg-[var(--color-surface-secondary)]

              text-[var(--color-text-primary)]

              transition-all
              duration-200

              hover:border-[var(--color-primary)]
              hover:text-[var(--color-primary)]
            "
          >
            {mobileOpen ? (
              <X size={19} />
            ) : (
              <Menu size={19} />
            )}
          </button>
        </div>
      </nav>

      {/* =========================================================
          MOBILE MENU
      ========================================================= */}
      {mobileOpen && (
        <div
          className="
            mx-4
            mt-2

            overflow-hidden
            rounded-[18px]

            border
            border-[var(--color-border)]

            bg-[var(--color-surface)]/95
            backdrop-blur-xl

            shadow-[0_10px_30px_rgba(0,0,0,0.08)]

            sm:mx-6
            lg:hidden
          "
        >
          <div className="flex flex-col gap-1 p-3">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  rounded-lg
                  px-4
                  py-3

                  text-sm
                  font-semibold

                  transition-all
                  duration-200

                  ${
                    index === 0
                      ? "bg-[var(--color-surface-secondary)] text-[var(--color-primary)]"
                      : "text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-primary)]"
                  }
                `}
              >
                {link.name}
              </a>
            ))}

            {/* Mobile CTA */}
            <Link
              to="/register"
              onClick={() => setMobileOpen(false)}
              className="
                mt-2
                flex
                h-11
                items-center
                justify-center

                rounded-lg

                bg-[var(--color-primary)]

                text-sm
                font-bold
                text-white

                transition-colors
                duration-200

                hover:bg-[var(--color-primary-hover)]
              "
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;