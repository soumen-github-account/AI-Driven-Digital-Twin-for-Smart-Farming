import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

function Layout() {
  // Tablet sidebar state
  const [tabletExpanded, setTabletExpanded] = useState(false);

  // Mobile sidebar state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Mobile sidebar close
  const closeMobile = () => {
    setMobileOpen(false);
  };

  // Mobile menu
  const openMobile = () => {
    setMobileOpen(true);
  };

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // If screen becomes desktop, close mobile sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }

      if (window.innerWidth < 768) {
        setTabletExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="
        min-h-screen
        bg-[var(--color-bg)]
        text-[var(--color-text-primary)]
        transition-colors
        duration-300
      "
    >
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar
        tabletExpanded={tabletExpanded}
        mobileOpen={mobileOpen}
        onCloseMobile={closeMobile}
      />

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div
        className={`
          min-h-screen
          transition-[margin]
          duration-300
          ease-out

          /* Mobile */
          ml-0

          /* Tablet */
          md:ml-[84px]

          ${
            tabletExpanded
              ? "md:max-lg:ml-[264px]"
              : ""
          }

          /* Desktop */
          lg:ml-[264px]
        `}
      >
        {/* =================================================
            TOP NAVBAR
        ================================================= */}

        <TopNavbar
          onMobileMenu={openMobile}
          onTabletMenu={() =>
            setTabletExpanded((prev) => !prev)
          }
          tabletExpanded={tabletExpanded}
        />

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main
          className="
            min-h-[calc(100vh-60px)]
            p-3
            sm:p-4
            lg:p-5
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;