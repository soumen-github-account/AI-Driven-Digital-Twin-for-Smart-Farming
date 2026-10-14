import {
  Sprout,
  ArrowUpRight,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import logo from "../../assets/logo.png"


function Footer() {
  const productLinks = [
    { name: "Features", href: "#ai-features" },
    { name: "Digital Twin", href: "#digital-twin" },
    { name: "AI Insights", href: "#ai-features" },
    { name: "Predictions", href: "#ai-features" },
    { name: "Pricing", href: "#pricing" },
  ];

  const solutionLinks = [
    { name: "Small Farmers", href: "#solutions" },
    { name: "Large Farms", href: "#solutions" },
    { name: "Agribusiness", href: "#solutions" },
    { name: "Researchers", href: "#solutions" },
  ];

  const resourceLinks = [
    { name: "Documentation", href: "#documentation" },
    { name: "Guides", href: "#guides" },
    { name: "Blog", href: "#blog" },
    { name: "API Reference", href: "#api" },
    { name: "FAQ", href: "#faq" },
  ];

  const companyLinks = [
    { name: "About Us", href: "#about" },
    { name: "Careers", href: "#careers" },
    { name: "Contact Us", href: "#contact" },
    { name: "Privacy Policy", href: "#privacy" },
  ];

  const socialLinks = [
    {
      icon: FaLinkedinIn,
      href: "#",
      label: "LinkedIn",
    },
    {
      icon: FaGithub,
      href: "#",
      label: "GitHub",
    },
    {
      icon: FaTwitter,
      href: "#",
      label: "Twitter",
    },
    {
      icon: FaInstagram,
      href: "#",
      label: "Instagram",
    },
  ];

  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        transition-colors
        duration-500
      "
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-0
          h-96
          w-96
          rounded-full
          bg-[var(--color-primary)]/8
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-20
          h-96
          w-96
          rounded-full
          bg-[var(--color-ai)]/8
          blur-[120px]
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-[1400px]
          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* =====================================================
            CTA CARD
        ===================================================== */}

        <div
          className="
            relative
            mt-8
            overflow-hidden
            rounded-[28px]
            border
            border-[var(--color-primary)]/20
            bg-[var(--color-surface-secondary)]
            px-6
            py-8
            shadow-[0_15px_50px_rgba(22,163,74,0.06)]
            sm:px-9
            sm:py-10
            lg:px-12
          "
        >
          {/* CTA glow */}

          <div
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              h-48
              w-80
              rounded-full
              bg-[var(--color-primary)]/10
              blur-[100px]
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-7
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            {/* CTA text */}

            <div>
              <div
                className="
                  mb-3
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[1.5px]
                  text-[var(--color-primary)]
                "
              >
                <Sprout size={15} />

                Smart Farming Starts Here
              </div>

              <h2
                className="
                  text-2xl
                  font-black
                  tracking-[-0.8px]
                  text-[var(--color-text-primary)]
                  sm:text-3xl
                "
              >
                Ready to Transform Your Farm?
              </h2>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-xs
                  leading-6
                  text-[var(--color-text-secondary)]
                  sm:text-sm
                "
              >
                Create your digital twin and start making
                smarter, data-driven farming decisions.
              </p>
            </div>

            {/* CTA button */}

            <a
              href="#get-started"
              className="
                group
                inline-flex
                h-11
                shrink-0
                items-center
                justify-center
                gap-2.5
                rounded-xl
                bg-[var(--color-primary)]
                px-5
                text-xs
                font-bold
                text-white
                shadow-[0_10px_30px_rgba(22,163,74,0.22)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[var(--color-primary-hover)]
                hover:shadow-[0_14px_35px_rgba(22,163,74,0.28)]
                active:scale-95
              "
            >
              Create Your Farm Twin

              <ArrowRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </a>
          </div>
        </div>

        {/* =====================================================
            MAIN FOOTER CONTENT
        ===================================================== */}

        <div
          className="
            grid
            gap-12
            py-14
            lg:grid-cols-[1.5fr_repeat(4,1fr)]
            lg:gap-8
            lg:py-16
          "
        >
          {/* ===================================================
              BRAND
          =================================================== */}

          <div className="max-w-sm">
            {/* Logo */}

            <a
              href="#home"
              className="
                inline-flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  p-2
                  items-center
                  justify-center
                  rounded-[14px]
                  bg-[var(--color-surface-secondary)]
                  text-[var(--color-primary)]
                  shadow-sm
                "
              >
                <img src={logo} alt="logo image" />
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="
                    text-[20px]
                    font-black
                    tracking-[-0.7px]
                    text-[var(--color-text-primary)]
                  "
                >
                  Farm Intel
                </span>

                <span
                  className="
                    rounded-[5px]
                    border
                    border-[var(--color-primary)]
                    px-1.5
                    py-[2px]
                    text-[8px]
                    font-bold
                    leading-none
                    text-[var(--color-primary)]
                  "
                >
                  AI
                </span>
              </div>
            </a>

            {/* Description */}

            <p
              className="
                mt-5
                text-[12px]
                leading-6
                text-[var(--color-text-secondary)]
                sm:text-[13px]
              "
            >
              An AI-powered digital twin platform built to
              help farmers monitor, predict and optimize
              their farms with confidence.
            </p>

            {/* Contact */}

            <div className="mt-6 space-y-3">
              <a
                href="mailto:hello@agritwin.ai"
                className="
                  flex
                  items-center
                  gap-2.5
                  text-[11px]
                  text-[var(--color-text-secondary)]
                  transition-colors
                  hover:text-[var(--color-primary)]
                "
              >
                <Mail size={14} />

                hello@agritwin.ai
              </a>

              <div
                className="
                  flex
                  items-center
                  gap-2.5
                  text-[11px]
                  text-[var(--color-text-secondary)]
                "
              >
                <MapPin size={14} />

                AgriTech Innovation Hub
              </div>
            </div>

            {/* Social */}

            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(
                ({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-[11px]
                      border
                      border-[var(--color-border)]
                      bg-[var(--color-surface-secondary)]
                      text-[var(--color-text-secondary)]
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:border-[var(--color-primary)]
                      hover:bg-[var(--color-primary)]/10
                      hover:text-[var(--color-primary)]
                    "
                  >
                    <Icon size={14} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* ===================================================
              PRODUCT
          =================================================== */}

          <FooterColumn
            title="Product"
            links={productLinks}
          />

          {/* ===================================================
              SOLUTIONS
          =================================================== */}

          <FooterColumn
            title="Solutions"
            links={solutionLinks}
          />

          {/* ===================================================
              RESOURCES
          =================================================== */}

          <FooterColumn
            title="Resources"
            links={resourceLinks}
          />

          {/* ===================================================
              COMPANY
          =================================================== */}

          <FooterColumn
            title="Company"
            links={companyLinks}
          />
        </div>

        {/* =====================================================
            NEWSLETTER
        ===================================================== */}

        <div
          className="
            mb-10
            flex
            flex-col
            gap-5
            rounded-[22px]
            border
            border-[var(--color-border)]
            bg-[var(--color-surface-secondary)]
            p-5
            sm:p-6
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          {/* Newsletter text */}

          <div>
            <div className="flex items-center gap-2">
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-[9px]
                  bg-[var(--color-primary)]/10
                  text-[var(--color-primary)]
                "
              >
                <Mail size={14} />
              </div>

              <h3
                className="
                  text-[12px]
                  font-extrabold
                  text-[var(--color-text-primary)]
                "
              >
                Stay Updated with AgriTwin
              </h3>
            </div>

            <p
              className="
                mt-2
                text-[10px]
                text-[var(--color-text-secondary)]
              "
            >
              Get the latest AI farming insights and updates.
            </p>
          </div>

          {/* Newsletter form */}

          <form
            onSubmit={(e) => e.preventDefault()}
            className="
              flex
              w-full
              max-w-md
              gap-2
            "
          >
            <div className="relative flex-1">
              <Mail
                size={14}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-[var(--color-text-muted)]
                "
              />

              <input
                type="email"
                placeholder="Enter your email"
                className="
                  h-10
                  w-full
                  rounded-xl
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-surface)]
                  pl-9
                  pr-3
                  text-[11px]
                  text-[var(--color-text-primary)]
                  outline-none
                  placeholder:text-[var(--color-text-muted)]
                  transition-all
                  focus:border-[var(--color-primary)]
                  focus:ring-2
                  focus:ring-[var(--color-primary)]/10
                "
              />
            </div>

            <button
              type="submit"
              aria-label="Subscribe"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--color-primary)]
                text-white
                transition-all
                hover:bg-[var(--color-primary-hover)]
                active:scale-95
              "
            >
              <ArrowUpRight size={15} />
            </button>
          </form>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-[var(--color-border)]
            py-6
            text-[10px]
            text-[var(--color-text-muted)]
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Copyright */}

          <p>
            © {new Date().getFullYear()} Farm Intel AI.
            All rights reserved.
          </p>

          {/* Legal */}

          <div className="flex items-center gap-5">
            <a
              href="#terms"
              className="
                transition-colors
                hover:text-[var(--color-primary)]
              "
            >
              Terms of Service
            </a>

            <a
              href="#privacy"
              className="
                transition-colors
                hover:text-[var(--color-primary)]
              "
            >
              Privacy Policy
            </a>
          </div>

          {/* Built with */}

          <div
            className="
              flex
              items-center
              gap-1.5
            "
          >
            <CheckCircle2
              size={12}
              className="text-[var(--color-primary)]"
            />

            Built for smarter farming
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   FOOTER COLUMN
========================================================= */

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3
        className="
          mb-5
          text-[10px]
          font-extrabold
          uppercase
          tracking-[1.4px]
          text-[var(--color-text-primary)]
        "
      >
        {title}
      </h3>

      <div className="space-y-3.5">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="
              group
              flex
              w-fit
              items-center
              gap-1
              text-[11px]
              font-medium
              text-[var(--color-text-secondary)]
              transition-colors
              duration-200
              hover:text-[var(--color-primary)]
            "
          >
            {link.name}

            <ArrowUpRight
              size={10}
              className="
                opacity-0
                transition-all
                duration-200
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
                group-hover:opacity-100
              "
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Footer;
