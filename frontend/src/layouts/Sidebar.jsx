import {
  Activity,
  BarChart3,
  Bell,
  Bot,
  CloudSun,
  Droplets,
  FileText,
  Gauge,
  Leaf,
  Map,
  Settings,
  Sprout,
  Tractor,
  Wheat,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar({
  tabletExpanded,
  mobileOpen,
  onCloseMobile,
}) {
  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: Gauge,
    },
    {
      label: "Farms",
      path: "/farms",
      icon: Tractor,
    },
    {
      label: "Fields",
      path: "/fields",
      icon: Map,
    },
    {
      label: "Digital Twin",
      path: "/digital-twin",
      icon: Activity,
    },
    {
      label: "Crop Health",
      path: "/crop-health",
      icon: Leaf,
    },
    {
      label: "Soil",
      path: "/soil",
      icon: Sprout,
    },
    {
      label: "Weather",
      path: "/weather",
      icon: CloudSun,
    },
    {
      label: "Irrigation",
      path: "/irrigation",
      icon: Droplets,
    },
    {
      label: "AI Assistant",
      path: "/ai-assistant",
      icon: Bot,
      badge: "New",
    },
    {
      label: "Predictions",
      path: "/predictions",
      icon: Wheat,
    },
    {
      label: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      label: "Alerts",
      path: "/alerts",
      icon: Bell,
      count: 12,
    },
    {
      label: "Reports",
      path: "/reports",
      icon: FileText,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* =====================================================
          MOBILE BACKDROP
      ===================================================== */}

      {mobileOpen && (
        <div
          className="
            fixed
            inset-0
            z-[90]
            bg-black/35
            backdrop-blur-[3px]

            md:hidden
          "
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          left-3
          top-3
          z-[100]
          flex
          h-[calc(100vh-24px)]
          flex-col
          overflow-hidden
          border
          border-[var(--color-border)]
          shadow-[0_14px_45px_rgba(0,0,0,0.08)]
          transition-[width,transform]
          duration-300
          ease-out

          /* =================================================
             MOBILE DEFAULT
          ================================================= */

          w-[290px]
          -translate-x-[calc(100%+20px)]
          rounded-[24px]
          bg-[var(--color-surface)]

          /* =================================================
             MOBILE OPEN
          ================================================= */

          ${
            mobileOpen
              ? "translate-x-0"
              : ""
          }

          /* =================================================
             TABLET
          ================================================= */

          md:w-[72px]
          md:translate-x-0
          md:rounded-[22px]
          md:bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)]
          md:backdrop-blur-2xl

          ${
            tabletExpanded
              ? "md:max-lg:w-[248px]"
              : ""
          }

          /* =================================================
             DESKTOP
          ================================================= */

          lg:w-[248px]
          lg:translate-x-0
          lg:rounded-[24px]
          lg:bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)]
          lg:backdrop-blur-2xl
        `}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            relative
            flex
            h-[76px]
            shrink-0
            items-center
            border-b
            border-[var(--color-border)]
            px-3

            lg:px-5
          "
        >
          {/* LOGO */}

          <NavLink
            to="/dashboard"
            onClick={onCloseMobile}
            className={`
              flex
              min-w-0
              flex-1
              items-center
              gap-3

              /* Mobile */
              justify-start

              /* Tablet collapsed */
              md:justify-center

              /* Tablet expanded */
              ${
                tabletExpanded
                  ? "md:max-lg:justify-start"
                  : ""
              }

              /* Desktop */
              lg:justify-start
            `}
          >
            {/* Logo Icon */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-[13px]
                border
                border-[var(--color-primary)]/15
                bg-[var(--color-primary)]/10
                text-[var(--color-primary)]
                shadow-[0_4px_14px_rgba(22,163,74,0.08)]
              "
            >
              <Sprout
                size={21}
                strokeWidth={2}
              />
            </div>

            {/* Logo Text */}

            <div
              className={`
                min-w-0

                /* Mobile */
                block

                /* Tablet */
                md:hidden

                ${
                  tabletExpanded
                    ? "md:max-lg:block"
                    : ""
                }

                /* Desktop */
                lg:block
              `}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="
                    text-[18px]
                    font-extrabold
                    tracking-[-0.7px]
                    text-[var(--color-text-primary)]
                  "
                >
                  FarmIntel
                </span>

                <span
                  className="
                    rounded-md
                    border
                    border-[var(--color-primary)]/30
                    bg-[var(--color-primary)]/10
                    px-1.5
                    py-0.5
                    text-[7px]
                    font-bold
                    leading-none
                    text-[var(--color-primary)]
                  "
                >
                  AI
                </span>
              </div>

              <p
                className="
                  mt-0.5
                  whitespace-nowrap
                  text-[8px]
                  font-medium
                  tracking-wide
                  text-[var(--color-text-muted)]
                "
              >
                Digital Farm Intelligence
              </p>
            </div>
          </NavLink>

          {/* =================================================
              MOBILE CLOSE
          ================================================= */}

          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
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

              hover:bg-[var(--color-danger)]/10
              hover:text-[var(--color-danger)]

              active:scale-95

              md:hidden
            "
          >
            <X
              size={19}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <nav
          className="
            flex-1
            overflow-y-auto
            px-2
            py-4

            lg:px-3
          "
        >
          <div className="space-y-1.5">
            {menuItems.map(
              ({
                label,
                path,
                icon: Icon,
                badge,
                count,
              }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `
                    group
                    relative
                    flex
                    h-[42px]
                    items-center
                    rounded-xl
                    px-3
                    transition-all
                    duration-200

                    /* ========================================
                       MOBILE
                    ======================================== */

                    justify-start

                    /* ========================================
                       TABLET
                    ======================================== */

                    md:justify-center

                    ${
                      tabletExpanded
                        ? "md:max-lg:justify-start"
                        : ""
                    }

                    /* ========================================
                       DESKTOP
                    ======================================== */

                    lg:justify-start

                    ${
                      isActive
                        ? `
                          bg-[var(--color-primary)]/12
                          text-[var(--color-primary)]
                          shadow-[inset_0_0_0_1px_var(--color-primary)]/10
                        `
                        : `
                          text-[var(--color-text-secondary)]
                          hover:bg-[var(--color-primary)]/7
                          hover:text-[var(--color-primary)]
                        `
                    }
                  `
                  }
                >
                  {/* Active Indicator */}

                  <span
                    className={`
                      absolute
                      left-0
                      top-1/2
                      h-5
                      w-[3px]
                      -translate-y-1/2
                      rounded-r-full
                      bg-[var(--color-primary)]

                      ${
                        "hidden"
                      }
                    `}
                  />

                  {/* Icon */}

                  <Icon
                    size={18}
                    strokeWidth={1.9}
                    className="
                      shrink-0
                      transition-transform
                      duration-200
                      group-hover:scale-[1.04]
                    "
                  />

                  {/* Label */}

                  <span
                    className={`
                      ml-3
                      min-w-0
                      flex-1
                      truncate
                      text-[12px]
                      font-medium

                      /* Mobile */
                      block

                      /* Tablet collapsed */
                      md:hidden

                      /* Tablet expanded */
                      ${
                        tabletExpanded
                          ? "md:max-lg:block"
                          : ""
                      }

                      /* Desktop */
                      lg:block
                    `}
                  >
                    {label}
                  </span>

                  {/* New Badge */}

                  {badge && (
                    <span
                      className={`
                        ml-auto
                        rounded-full
                        bg-[var(--color-primary)]/10
                        px-1.5
                        py-0.5
                        text-[8px]
                        font-bold
                        text-[var(--color-primary)]

                        /* Mobile */
                        block

                        /* Tablet collapsed */
                        md:hidden

                        /* Tablet expanded */
                        ${
                          tabletExpanded
                            ? "md:max-lg:block"
                            : ""
                        }

                        /* Desktop */
                        lg:block
                      `}
                    >
                      {badge}
                    </span>
                  )}

                  {/* Alert Count */}

                  {count && (
                    <span
                      className={`
                        ml-auto
                        h-5
                        min-w-5
                        items-center
                        justify-center
                        rounded-full
                        bg-[var(--color-danger)]/10
                        px-1
                        text-[8px]
                        font-bold
                        text-[var(--color-danger)]

                        /* Mobile */
                        flex

                        /* Tablet collapsed */
                        md:hidden

                        /* Tablet expanded */
                        ${
                          tabletExpanded
                            ? "md:max-lg:flex"
                            : ""
                        }

                        /* Desktop */
                        lg:flex
                      `}
                    >
                      {count}
                    </span>
                  )}
                </NavLink>
              )
            )}
          </div>
        </nav>

        {/* =====================================================
            PLAN CARD
        ===================================================== */}

        <div
          className={`
            shrink-0
            px-3
            pb-3

            /* Mobile */
            block

            /* Tablet collapsed */
            md:hidden

            /* Tablet expanded */
            ${
              tabletExpanded
                ? "md:max-lg:block"
                : ""
            }

            /* Desktop */
            lg:block
          `}
        >
          <div
            className="
              rounded-2xl
              border
              border-[var(--color-border)]
              bg-[var(--color-surface-secondary)]
              p-3
            "
          >
            <div className="flex items-center justify-between">
              <span
                className="
                  text-[9px]
                  font-medium
                  text-[var(--color-text-secondary)]
                "
              >
                Current Plan
              </span>

              <span
                className="
                  text-[9px]
                  font-bold
                  text-[var(--color-text-primary)]
                "
              >
                Pro Plan
              </span>
            </div>

            <p
              className="
                mt-2
                text-[8px]
                text-[var(--color-text-muted)]
              "
            >
              Valid until 24 Aug 2026
            </p>

            <div className="mt-2 flex items-center gap-2">
              <div
                className="
                  h-1.5
                  flex-1
                  overflow-hidden
                  rounded-full
                  bg-[var(--color-border)]
                "
              >
                <div
                  className="
                    h-full
                    w-[75%]
                    rounded-full
                    bg-[var(--color-primary)]
                  "
                />
              </div>

              <span
                className="
                  text-[8px]
                  font-bold
                  text-[var(--color-text-primary)]
                "
              >
                75%
              </span>
            </div>

            <button
              type="button"
              className="
                mt-3
                h-8
                w-full
                rounded-xl
                bg-[var(--color-primary)]
                text-[9px]
                font-bold
                text-white
                shadow-[0_4px_12px_rgba(22,163,74,0.15)]
                transition-all

                hover:bg-[var(--color-primary-hover)]
                active:scale-[0.98]
              "
            >
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* =====================================================
            VERSION
        ===================================================== */}

        <div
          className={`
            shrink-0
            pb-4
            text-center
            text-[8px]
            text-[var(--color-text-muted)]

            /* Mobile */
            block

            /* Tablet collapsed */
            md:hidden

            /* Tablet expanded */
            ${
              tabletExpanded
                ? "md:max-lg:block"
                : ""
            }

            /* Desktop */
            lg:block
          `}
        >
          AgriTwin AI v2.4.1
        </div>
      </aside>
    </>
  );
}

export default Sidebar;