import {
  Bell,
  ChevronDown,
  CircleHelp,
  Menu,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

function TopNavbar({
  onMobileMenu,
  onTabletMenu,
  tabletExpanded,
}) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header
      className="
        sticky
        top-3
        z-40
        mx-3
        flex
        h-[58px]
        items-center
        justify-between
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[color-mix(in_srgb,var(--color-surface)_88%,transparent)]
        px-3
        shadow-[0_8px_30px_rgba(0,0,0,0.05)]
        backdrop-blur-2xl
        transition-all
        duration-300

        sm:px-4

        lg:mr-3
        lg:h-[60px]
        lg:rounded-[20px]
        lg:px-5
      "
    >
      {/* =====================================================
          LEFT
      ===================================================== */}

      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {/* =================================================
            MOBILE + TABLET MENU
            Hidden on large desktop
        ================================================= */}

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => {
            if (window.innerWidth < 768) {
              onMobileMenu();
            } else {
              onTabletMenu();
            }
          }}
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            text-[var(--color-text-secondary)]
            transition-all
            duration-200

            hover:bg-[var(--color-primary)]/10
            hover:text-[var(--color-primary)]

            active:scale-95

            lg:hidden
          "
        >
          <Menu
            size={19}
            strokeWidth={1.9}
          />
        </button>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div
          className="
            relative
            hidden
            w-[280px]

            md:block
            lg:w-[380px]
            xl:w-[420px]
          "
        >
          <Search
            size={15}
            strokeWidth={1.8}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-[var(--color-text-muted)]
            "
          />

          <input
            type="text"
            placeholder="Search farms, fields, crops..."
            className="
              h-9
              w-full
              rounded-xl
              border
              border-[var(--color-border)]
              bg-[var(--color-surface-secondary)]/60
              pl-9
              pr-12
              text-[10px]
              font-medium
              text-[var(--color-text-primary)]
              outline-none
              placeholder:text-[var(--color-text-muted)]
              transition-all
              duration-200

              focus:border-[var(--color-primary)]/50
              focus:bg-[var(--color-surface)]
              focus:ring-2
              focus:ring-[var(--color-primary)]/10
            "
          />

          <span
            className="
              absolute
              right-2.5
              top-1/2
              -translate-y-1/2
              rounded-md
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              px-1.5
              py-0.5
              text-[8px]
              font-semibold
              text-[var(--color-text-muted)]
            "
          >
            ⌘K
          </span>
        </div>

        {/* Mobile Search */}

        <button
          type="button"
          aria-label="Search"
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            text-[var(--color-text-secondary)]
            transition-all

            hover:bg-[var(--color-primary)]/10
            hover:text-[var(--color-primary)]

            md:hidden
          "
        >
          <Search
            size={18}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* =====================================================
          RIGHT
      ===================================================== */}

      <div
        className="
          flex
          shrink-0
          items-center
          gap-1

          sm:gap-1.5
          lg:gap-2
        "
      >
        {/* Theme */}

        {/* <button
          type="button"
          title="Toggle theme"
          className="
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            text-[var(--color-text-secondary)]
            transition-all

            hover:bg-[var(--color-primary)]/10
            hover:text-[var(--color-primary)]
            flex
          "
        >
          <Sun
            size={17}
            strokeWidth={1.8}
          />
        </button> */}
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

        {/* Notifications */}

        <button
          type="button"
          title="Notifications"
          className="
            relative
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            text-[var(--color-text-secondary)]
            transition-all

            hover:bg-[var(--color-primary)]/10
            hover:text-[var(--color-primary)]
          "
        >
          <Bell
            size={17}
            strokeWidth={1.8}
          />

          <span
            className="
              absolute
              right-[1px]
              top-0
              flex
              h-[15px]
              min-w-[15px]
              items-center
              justify-center
              rounded-full
              border-2
              border-[var(--color-surface)]
              bg-[var(--color-danger)]
              px-1
              text-[6px]
              font-bold
              leading-none
              text-white
            "
          >
            8
          </span>
        </button>

        {/* Help */}

        <button
          type="button"
          title="Help"
          className="
            hidden
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            text-[var(--color-text-secondary)]
            transition-all

            hover:bg-[var(--color-primary)]/10
            hover:text-[var(--color-primary)]

            sm:flex
          "
        >
          <CircleHelp
            size={17}
            strokeWidth={1.8}
          />
        </button>

        {/* Divider */}

        <div
          className="
            mx-1
            hidden
            h-7
            w-px
            bg-[var(--color-border)]

            sm:block
          "
        />

        {/* =================================================
            PROFILE
        ================================================= */}

        <button
          type="button"
          className="
            flex
            items-center
            gap-2
            rounded-xl
            px-1.5
            py-1
            transition-all

            hover:bg-[var(--color-primary)]/8
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              border-[var(--color-primary)]/20
              bg-[var(--color-primary)]/10
              text-[9px]
              font-bold
              text-[var(--color-primary)]
            "
          >
            SD
          </div>

          <div className="hidden text-left lg:block">
            <p
              className="
                text-[10px]
                font-bold
                leading-tight
                text-[var(--color-text-primary)]
              "
            >
              Soumen
            </p>

            <p
              className="
                mt-0.5
                text-[8px]
                leading-tight
                text-[var(--color-text-muted)]
              "
            >
              Farm Manager
            </p>
          </div>

          <ChevronDown
            size={13}
            strokeWidth={1.8}
            className="
              hidden
              text-[var(--color-text-secondary)]
              lg:block
            "
          />
        </button>
      </div>
    </header>
  );
}

export default TopNavbar;