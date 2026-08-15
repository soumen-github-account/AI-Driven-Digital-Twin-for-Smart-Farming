import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  Sprout,
  ShieldCheck,
  BrainCircuit,
  Activity,
  TrendingUp,
  UserPlus,
  CheckCircle2,
} from "lucide-react";

import { useState } from "react";

import logo from "../assets/logo.png"

import BgDark from "../assets/BgRegisterDark.png"
import BgLight from "../assets/BgLoginLight.png"

import { useTheme } from "../contexts/ThemeContext";

function LoginPage() {
    const { theme } = useTheme();
  const [loginMethod, setLoginMethod] = useState("email");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      method: loginMethod,
      identifier:
        loginMethod === "email"
          ? formData.email
          : formData.phone,
      password: formData.password,
      rememberMe,
    };

    console.log("Login:", loginData);

    // Backend API yahan call kar sakte ho
  };

  const benefits = [
    {
      icon: BrainCircuit,
      title: "AI-Powered Insights",
      description:
        "Get intelligent recommendations tailored for your farm.",
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description:
        "Track crops, soil, weather and farm conditions live.",
    },
    {
      icon: TrendingUp,
      title: "Higher Productivity",
      description:
        "Improve yield, optimize resources and reduce costs.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Reliable",
      description:
        "Your farm data stays encrypted and protected.",
    },
  ];

  return (
    <div
      className="
        min-h-screen
        bg-[var(--color-bg)]
        px-3
        py-3
        text-[var(--color-text-primary)]
        transition-colors
        duration-500
        sm:px-4
      "
    >
      {/* =====================================================
          MAIN IOS CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          min-h-[calc(100vh-24px)]
          max-w-[1500px]
          overflow-hidden
          rounded-[24px]
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          shadow-[0_10px_50px_rgba(15,23,42,0.10)]
        "
      >
        {/* ===================================================
            BACKGROUND GLOWS
        =================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-[-180px]
            top-[35%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[var(--color-primary)]/10
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[-180px]
            top-[-100px]
            h-[450px]
            w-[450px]
            rounded-full
            bg-[var(--color-ai)]/8
            blur-[120px]
          "
        />

        {/* ===================================================
            HEADER
        =================================================== */}

        <header
          className="
            relative
            z-20
            flex
            h-[60px]
            items-center
            justify-between
            border-b
            border-[var(--color-border)]
            bg-[var(--color-surface)]/80
            px-6
            backdrop-blur-xl
            sm:px-8
            lg:px-10
          "
        >
          {/* Logo */}

          <a
            href="/"
            className="flex items-center gap-2.5"
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                text-[var(--color-primary)]
              "
            >
              <img src={logo} alt="logo image" />
            </div>

            <div className="flex items-center gap-2">
              <span
                className="
                  text-[19px]
                  font-black
                  tracking-[-0.7px]
                  text-[var(--color-text-primary)]
                  sm:text-[21px]
                "
              >
                AgriTwin
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

          {/* Register */}

          <div className="flex items-center gap-3">
            <span
              className="
                hidden
                text-[11px]
                text-[var(--color-text-secondary)]
                sm:block
              "
            >
              Don't have an account?
            </span>

            <a
              href="/register"
              className="
                inline-flex
                h-9
                items-center
                justify-center
                rounded-lg
                border
                border-[var(--color-primary)]
                px-5
                text-[11px]
                font-bold
                text-[var(--color-primary)]
                transition-all
                duration-200
                hover:bg-[var(--color-primary)]
                hover:text-white
                active:scale-95
              "
            >
              Create Account
            </a>
          </div>
        </header>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div
          className="
            relative
            z-10
            grid
            lg:min-h-[calc(100vh-84px)]
            lg:grid-cols-[1fr_0.9fr]
          "
        >
          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <section
            className="
              relative
              hidden
              overflow-hidden
              lg:block
            "
          >
            {/* Farm Image */}

            <img
              src={theme === "dark" ? BgDark : BgLight}
              alt="Smart digital farm"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />

            {/* Overlay */}

            {/* <div
              className="
                absolute
                inset-0
                bg-gradient-to-b
                from-[var(--color-surface)]/95
                via-[var(--color-surface)]/45
                to-[var(--color-surface)]/90
                dark:from-[var(--color-bg)]/80
                dark:via-[var(--color-bg)]/40
                dark:to-[var(--color-bg)]/90
              "
            /> */}

            {/* Green glow */}

            <div
              className="
                absolute
                bottom-0
                left-0
                h-[60%]
                w-full
                bg-gradient-to-t
                from-[var(--color-primary)]/20
                to-transparent
              "
            />

            {/* Left Content */}

            <div
              className="
                relative
                flex
                h-full
                flex-col
                justify-between
                px-10
                py-12
                xl:px-12
              "
            >
              <div className="max-w-[470px]">
                {/* Badge */}

                <div
                  className="
                    mb-4
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[var(--color-primary)]/20
                    bg-[var(--color-surface)]/70
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    text-[var(--color-primary)]
                    backdrop-blur-md
                  "
                >
                  <Sprout size={13} />

                  Welcome Back to AgriTwin
                </div>

                {/* Heading */}

                <h1
                  className="
                    text-[42px]
                    font-black
                    leading-[1.05]
                    tracking-[-1.8px]
                    text-[var(--color-text-primary)]
                    xl:text-[46px]
                  "
                >
                  Your Farm.
                  <br />

                  Your{" "}
                  <span className="text-[var(--color-primary)]">
                    Intelligence.
                  </span>
                </h1>

                <p
                  className="
                    mt-4
                    max-w-[390px]
                    text-[16px]
                    font-semibold
                    leading-7
                    text-[var(--color-text-primary)]
                  "
                >
                  Welcome back to your Digital Farm Twin.
                  Monitor, predict and manage your farm
                  smarter with AI.
                </p>

                {/* Benefits */}

                <div className="mt-8 space-y-5">
                  {benefits.map(
                    ({
                      icon: Icon,
                      title,
                      description,
                    }) => (
                      <div
                        key={title}
                        className="flex items-start gap-3.5"
                      >
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[var(--color-primary)]/15
                            bg-[var(--color-surface)]/75
                            text-[var(--color-primary)]
                            shadow-sm
                            backdrop-blur-md
                          "
                        >
                          <Icon size={18} />
                        </div>

                        <div>
                          <h3
                            className="
                              text-[12px]
                              font-bold
                              text-[var(--color-text-primary)]
                            "
                          >
                            {title}
                          </h3>

                          <p
                            className="
                              mt-1
                              max-w-[270px]
                              text-[10px]
                              leading-5
                              text-[var(--color-text-secondary)]
                            "
                          >
                            {description}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Testimonial */}

              <div
                className="
                  mt-10
                  max-w-[470px]
                  rounded-[18px]
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-surface)]/75
                  p-5
                  shadow-lg
                  backdrop-blur-xl
                "
              >
                <div className="flex gap-3">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[var(--color-primary)]/10
                      text-[var(--color-primary)]
                    "
                  >
                    <Sprout size={21} />
                  </div>

                  <div>
                    <p
                      className="
                        text-[11px]
                        leading-5
                        text-[var(--color-text-secondary)]
                      "
                    >
                      “AgriTwin gives me a complete view
                      of my farm. I can finally make
                      decisions using real data.”
                    </p>

                    <p
                      className="
                        mt-2
                        text-[10px]
                        font-bold
                        text-[var(--color-primary)]
                      "
                    >
                      — Ramesh Patel, Farmer
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}

            <div
              className="
                absolute
                bottom-24
                right-8
                hidden
                items-center
                gap-2
                xl:flex
              "
            >
              <LoginStat
                icon={CheckCircle2}
                title="Farm Twin"
                value="Active"
              />

              <LoginStat
                icon={BrainCircuit}
                title="AI Insights"
                value="24 New"
              />

              <LoginStat
                icon={Activity}
                title="Monitoring"
                value="Live"
              />
            </div>
          </section>

          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <section
            className="
              flex
              items-center
              justify-center
              bg-[var(--color-surface-secondary)]/40
              px-4
              py-8
              sm:px-8
              lg:px-10
              xl:px-14
            "
          >
            <div
              className="
                w-full
                max-w-[500px]
                rounded-[24px]
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]/90
                p-6
                shadow-[0_20px_60px_rgba(15,23,42,0.08)]
                backdrop-blur-xl
                sm:p-8
              "
            >
              {/* Heading */}

              <div className="mb-6">
                <h2
                  className="
                    text-[23px]
                    font-black
                    tracking-[-0.7px]
                    text-[var(--color-text-primary)]
                  "
                >
                  Welcome Back
                </h2>

                <p
                  className="
                    mt-1.5
                    text-[11px]
                    text-[var(--color-text-secondary)]
                  "
                >
                  Sign in to continue to your AgriTwin
                  dashboard
                </p>
              </div>

              {/* Google */}

              <button
                type="button"
                className="
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-surface)]
                  text-[12px]
                  font-semibold
                  text-[var(--color-text-primary)]
                  transition-all
                  hover:border-[var(--color-primary)]
                  hover:bg-[var(--color-surface-secondary)]
                  active:scale-[0.99]
                "
              >
                <span
                  className="
                    text-[17px]
                    font-black
                  "
                >
                  G
                </span>

                Continue with Google
              </button>

              {/* Divider */}

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-[var(--color-border)]" />

                <span
                  className="
                    text-[10px]
                    text-[var(--color-text-muted)]
                  "
                >
                  or continue with
                </span>

                <div className="h-px flex-1 bg-[var(--color-border)]" />
              </div>

              {/* =================================================
                  LOGIN METHOD SWITCH
              ================================================= */}

              <div
                className="
                  mb-5
                  grid
                  grid-cols-2
                  gap-1
                  rounded-xl
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-surface-secondary)]
                  p-1
                "
              >
                <button
                  type="button"
                  onClick={() => setLoginMethod("email")}
                  className={`
                    flex
                    h-9
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    text-[10px]
                    font-bold
                    transition-all
                    duration-200
                    ${
                      loginMethod === "email"
                        ? "bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm"
                        : "text-[var(--color-text-secondary)]"
                    }
                  `}
                >
                  <Mail size={14} />
                  Email
                </button>

                <button
                  type="button"
                  onClick={() => setLoginMethod("phone")}
                  className={`
                    flex
                    h-9
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    text-[10px]
                    font-bold
                    transition-all
                    duration-200
                    ${
                      loginMethod === "phone"
                        ? "bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm"
                        : "text-[var(--color-text-secondary)]"
                    }
                  `}
                >
                  <Phone size={14} />
                  Phone
                </button>
              </div>

              {/* =================================================
                  FORM
              ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* EMAIL */}

                {loginMethod === "email" && (
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    icon={Mail}
                    value={formData.email}
                    onChange={handleChange}
                  />
                )}

                {/* PHONE */}

                {loginMethod === "phone" && (
                  <div>
                    <label
                      className="
                        mb-1.5
                        block
                        text-[10px]
                        font-bold
                        text-[var(--color-text-primary)]
                      "
                    >
                      Phone Number
                    </label>

                    <div className="flex gap-2">
                      <div
                        className="
                          flex
                          h-10
                          w-[82px]
                          shrink-0
                          items-center
                          justify-center
                          gap-2
                          rounded-lg
                          border
                          border-[var(--color-border)]
                          bg-[var(--color-surface)]
                          text-[10px]
                          font-semibold
                          text-[var(--color-text-primary)]
                        "
                      >
                        🇮🇳
                        <span>+91</span>
                      </div>

                      <div className="relative flex-1">
                        <Phone
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
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className={inputClass}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PASSWORD */}

                <PasswordField
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  show={showPassword}
                  setShow={setShowPassword}
                />

                {/* Remember + Forgot */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    pt-1
                  "
                >
                  <label
                    className="
                      flex
                      cursor-pointer
                      items-center
                      gap-2
                    "
                  >
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(e.target.checked)
                      }
                      className="
                        h-3.5
                        w-3.5
                        accent-[var(--color-primary)]
                      "
                    />

                    <span
                      className="
                        text-[9px]
                        text-[var(--color-text-secondary)]
                      "
                    >
                      Remember me
                    </span>
                  </label>

                  <a
                    href="/forgot-password"
                    className="
                      text-[9px]
                      font-semibold
                      text-[var(--color-primary)]
                      hover:underline
                    "
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Login Button */}

                <button
                  type="submit"
                  className="
                    group
                    mt-2
                    flex
                    h-11
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[var(--color-primary)]
                    text-[11px]
                    font-bold
                    text-white
                    shadow-[0_8px_25px_rgba(22,163,74,0.2)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[var(--color-primary-hover)]
                    hover:shadow-[0_12px_30px_rgba(22,163,74,0.28)]
                    active:scale-[0.99]
                  "
                >
                  Sign In

                  <ArrowRight
                    size={14}
                    className="
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />
                </button>
              </form>

              {/* Security */}

              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[var(--color-primary)]/10
                  bg-[var(--color-primary)]/5
                  px-3
                  py-2.5
                "
              >
                <ShieldCheck
                  size={14}
                  className="text-[var(--color-primary)]"
                />

                <span
                  className="
                    text-[9px]
                    font-medium
                    text-[var(--color-text-secondary)]
                  "
                >
                  Your login is protected with secure
                  encryption
                </span>
              </div>

              {/* Register CTA */}

              <div
                className="
                  mt-6
                  text-center
                  text-[10px]
                  text-[var(--color-text-secondary)]
                "
              >
                New to AgriTwin?{" "}
                <a
                  href="/register"
                  className="
                    font-bold
                    text-[var(--color-primary)]
                    hover:underline
                  "
                >
                  Create your account
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* ===================================================
            TRUSTED BY
        =================================================== */}

        <div
          className="
            relative
            z-20
            flex
            flex-col
            gap-5
            border-t
            border-[var(--color-border)]
            bg-[var(--color-surface)]/75
            px-6
            py-5
            backdrop-blur-xl
            sm:px-8
            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:px-10
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-bold
                text-[var(--color-text-primary)]
              "
            >
              Trusted by farmers, agribusinesses
            </p>

            <p
              className="
                text-[9px]
                text-[var(--color-text-secondary)]
              "
            >
              and researchers worldwide
            </p>
          </div>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-6
              opacity-60
              grayscale
              sm:gap-8
              lg:gap-10
            "
          >
            <span className="text-xs font-black">
              John Deere
            </span>

            <span className="text-xs font-black">
              BAYER
            </span>

            <span className="text-xs font-black">
              CORTEVA
            </span>

            <span className="text-xs font-black">
              FMC
            </span>

            <span className="text-xs font-black">
              syngenta
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

const inputClass = `
  h-10
  w-full
  rounded-lg
  border
  border-[var(--color-border)]
  bg-[var(--color-surface)]
  pl-9
  pr-3
  text-[10px]
  text-[var(--color-text-primary)]
  outline-none
  placeholder:text-[var(--color-text-muted)]
  transition-all
  duration-200
  focus:border-[var(--color-primary)]
  focus:ring-2
  focus:ring-[var(--color-primary)]/10
`;

function InputField({
  label,
  name,
  type,
  placeholder,
  icon: Icon,
  value,
  onChange,
}) {
  return (
    <div>
      <label
        className="
          mb-1.5
          block
          text-[10px]
          font-bold
          text-[var(--color-text-primary)]
        "
      >
        {label}
      </label>

      <div className="relative">
        <Icon
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
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass}
          required
        />
      </div>
    </div>
  );
}

/* =========================================================
   PASSWORD FIELD
========================================================= */

function PasswordField({
  label,
  name,
  placeholder,
  value,
  onChange,
  show,
  setShow,
}) {
  return (
    <div>
      <label
        className="
          mb-1.5
          block
          text-[10px]
          font-bold
          text-[var(--color-text-primary)]
        "
      >
        {label}
      </label>

      <div className="relative">
        <LockKeyhole
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
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            h-10
            w-full
            rounded-lg
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            pl-9
            pr-10
            text-[10px]
            text-[var(--color-text-primary)]
            outline-none
            placeholder:text-[var(--color-text-muted)]
            transition-all
            duration-200
            focus:border-[var(--color-primary)]
            focus:ring-2
            focus:ring-[var(--color-primary)]/10
          "
          required
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-[var(--color-text-muted)]
            transition-colors
            hover:text-[var(--color-primary)]
          "
          aria-label={
            show ? "Hide password" : "Show password"
          }
        >
          {show ? (
            <EyeOff size={14} />
          ) : (
            <Eye size={14} />
          )}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   LOGIN STAT
========================================================= */

function LoginStat({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div
      className="
        min-w-[100px]
        rounded-xl
        border
        border-[var(--color-primary)]/30
        bg-[var(--color-surface)]/70
        px-3
        py-2.5
        shadow-lg
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          items-center
          gap-1.5
          text-[8px]
          font-semibold
          text-[var(--color-text-secondary)]
        "
      >
        <Icon
          size={12}
          className="text-[var(--color-primary)]"
        />

        {title}
      </div>

      <div
        className="
          mt-1
          text-[14px]
          font-black
          text-[var(--color-text-primary)]
        "
      >
        {value}
      </div>
    </div>
  );
}

export default LoginPage;