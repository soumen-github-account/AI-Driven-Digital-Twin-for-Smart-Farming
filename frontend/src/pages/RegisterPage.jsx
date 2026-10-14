
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  Sprout,
  User,
  ShieldCheck,
  Activity,
  BrainCircuit,
  TrendingUp,
  Building2,
  FlaskConical,
  MoreHorizontal,
  CloudSun,
  Droplets,
  Leaf,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import RegisterBgLight from "../assets/BgRegisterLight.png";
import RegisterBgDark from "../assets/BgRegisterDark.png";
import { useTheme } from "../contexts/ThemeContext";
import logo from "../assets/logo.png";

import { registerUser, googleLogin } from "../services/auth.service";
import { setUser } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";

/* =========================================================
   REGISTER PAGE
========================================================= */

function RegisterPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  /* =======================================================
     STATES
  ======================================================= */

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [role, setRole] = useState("Farmer");

  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  /* =======================================================
     BENEFITS
  ======================================================= */

  const benefits = [
    {
      icon: BrainCircuit,
      title: "AI-Powered Insights",
      description: "Get AI recommendations tailored for your farm.",
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Monitor crops, soil, weather and more in real-time.",
    },
    {
      icon: TrendingUp,
      title: "Higher Productivity",
      description: "Improve yield, save resources and reduce costs.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Reliable",
      description: "Your farm data is encrypted and 100% secure.",
    },
  ];

  /* =======================================================
     ROLES
  ======================================================= */

  const roles = [
    {
      name: "Farmer",
      icon: Sprout,
    },
    {
      name: "Agribusiness",
      icon: Building2,
    },
    {
      name: "Researcher",
      icon: FlaskConical,
    },
    {
      name: "Other",
      icon: MoreHorizontal,
    },
  ];

  /* =======================================================
     PASSWORD RULES
  ======================================================= */

  const passwordRules = [
    {
      label: "At least 8 characters",
      valid: formData.password.length >= 8,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(formData.password),
    },
    {
      label: "One number",
      valid: /[0-9]/.test(formData.password),
    },
    {
      label: "One special character",
      valid: /[^A-Za-z0-9]/.test(formData.password),
    },
  ];

  /* =======================================================
     NORMAL REGISTER
  ======================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || googleLoading) return;

    setError("");

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    /* -----------------------------------------------
       BASIC VALIDATION
    ------------------------------------------------ */

    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!phone) {
      setError("Please enter your phone number.");
      return;
    }

    /* -----------------------------------------------
       PHONE VALIDATION
    ------------------------------------------------ */

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    /* -----------------------------------------------
       PASSWORD MATCH
    ------------------------------------------------ */

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    /* -----------------------------------------------
       PASSWORD STRENGTH
    ------------------------------------------------ */

    const allPasswordRulesValid = passwordRules.every((rule) => rule.valid);

    if (!allPasswordRulesValid) {
      setError("Please create a stronger password.");
      return;
    }

    /* -----------------------------------------------
       API REQUEST
    ------------------------------------------------ */

    try {
      setLoading(true);

      const result = await registerUser({
        name: fullName,
        email,
        phone,
        password: formData.password,
        role: role.toUpperCase(),
      });

      const token = result?.data?.token;
      const user = result?.data?.user;

      if (!token) {
        throw new Error("Authentication token was not received.");
      }

      localStorage.setItem("agritwin_token", token);

      if (user) {
        dispatch(setUser(user));
      }

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Registration error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Registration failed. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    if (loading || googleLoading) return;

    setError("");
    setGoogleLoading(true);

    googleLogin();
  };

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[var(--color-bg)]
        font-sans
        text-[var(--color-text-primary)]
      "
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <img
        src={theme === "dark" ? RegisterBgDark : RegisterBgLight}
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[var(--color-surface)]/[0.08]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          right-0
          z-[1]
          w-full
          lg:w-[51%]
          bg-gradient-to-r
          from-transparent
          via-[var(--color-surface)]/75
          to-[var(--color-surface)]/95
        "
      />

      {/* ===================================================
          TOP SOFT LIGHT
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-[2]
          h-[170px]
          bg-gradient-to-b
          from-[var(--color-surface)]/80
          to-transparent
        "
      />

      {/* ===================================================
          HEADER
      =================================================== */}

      <header
        className="
          absolute
          left-0
          right-0
          top-0
          z-50
          flex
          h-[80px]
          items-center
          justify-between
          px-[20px]
          sm:px-[38px]
        "
      >
        {/* LOGO */}

        <Link
          to="/"
          className="
            flex
            items-center
            gap-[9px]
            select-none
          "
        >
          <img src={logo} className="w-[35px]" alt="Farm Intel AI" />

          <div className="flex items-center gap-[8px]">
            <span
              className="
                text-[22px]
                font-extrabold
                leading-none
                tracking-[-1.5px]
                text-[var(--color-text-primary)]
                sm:text-[27px]
              "
            >
              Farm Intel
            </span>

            <span
              className="
                rounded-[5px]
                border
                border-[var(--color-primary)]
                px-[6px]
                py-[3px]
                text-[9px]
                font-bold
                leading-none
                text-[var(--color-primary)]
                sm:text-[10px]
              "
            >
              AI
            </span>
          </div>
        </Link>

        {/* LOGIN */}

        <div className="flex items-center gap-[10px] sm:gap-[17px]">
          <span
            className="
              hidden
              text-[12px]
              font-medium
              text-[var(--color-text-primary)]
              sm:block
            "
          >
            Already have an account?
          </span>

          <Link
            to="/login"
            className="
              flex
              h-[38px]
              min-w-[76px]
              items-center
              justify-center
              rounded-[7px]
              border
              border-[var(--color-primary)]
              bg-[var(--color-surface)]/30
              px-[16px]
              text-[12px]
              font-semibold
              text-[var(--color-primary)]
              backdrop-blur-sm
              transition-all
              duration-200
              hover:bg-[var(--color-primary)]
              hover:text-white
            "
          >
            Login
          </Link>
        </div>
      </header>

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <div
        className="
          relative
          z-10
          grid
          min-h-screen
          grid-cols-1
          lg:grid-cols-[51.4%_48.6%]
        "
      >
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <section
          className="
            relative
            hidden
            min-h-screen
            lg:block
          "
        >
          {/* HERO CONTENT */}

          <div
            className="
              absolute
              left-[38px]
              top-[165px]
              z-20
              w-[390px]
              xl:w-[425px]
            "
          >
            <h1
              className="
                m-0
                text-[48px]
                font-extrabold
                leading-[1.04]
                tracking-[-2.8px]
                text-[var(--color-text-primary)]
                xl:text-[51px]
              "
            >
              Join <span className="text-[var(--color-primary)]">Farm Intel</span>
            </h1>

            <p
              className="
                mt-[13px]
                text-[22px]
                font-medium
                leading-[1.42]
                tracking-[-0.4px]
                text-[var(--color-text-primary)]
              "
            >
              Build your Digital Farm Twin
              <br />
              and grow smarter with AI
            </p>

            {/* BENEFITS */}

            <div className="mt-[31px] space-y-[20px]">
              {benefits.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex items-start gap-[13px]">
                  <div
                    className="
                        flex
                        h-[50px]
                        w-[50px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[var(--color-primary)]/20
                        bg-[var(--color-surface)]/70
                        text-[var(--color-primary)]
                        shadow-[0_4px_16px_rgba(22,163,74,.07)]
                        backdrop-blur-md
                      "
                  >
                    <Icon size={23} strokeWidth={1.8} />
                  </div>

                  <div className="pt-[2px]">
                    <h3
                      className="
                          text-[13px]
                          font-bold
                          leading-5
                          text-[var(--color-text-primary)]
                        "
                    >
                      {title}
                    </h3>

                    <p
                      className="
                          mt-[2px]
                          max-w-[255px]
                          text-[11px]
                          leading-[18px]
                          text-[var(--color-text-secondary)]
                        "
                    >
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WEATHER */}

          <div
            className="
              absolute
              left-[600px]
              top-[330px]
              z-30
              hidden
              xl:block
            "
          >
            <WeatherCard />
          </div>

          {/* CROP HEALTH */}

          <div
            className="
              absolute
              left-[598px]
              top-[488px]
              z-30
              hidden
              xl:block
            "
          >
            <FarmStat
              icon={Leaf}
              title="Crop Health"
              value="82%"
              status="Good"
            />
          </div>

          {/* SOIL MOISTURE */}

          <div
            className="
              absolute
              left-[598px]
              top-[576px]
              z-30
              hidden
              xl:block
            "
          >
            <FarmStat
              icon={Droplets}
              title="Soil Moisture"
              value="68%"
              status="Optimal"
            />
          </div>

          {/* TESTIMONIAL */}

          <div
            className="
              absolute
              bottom-[142px]
              left-[38px]
              z-30
              w-[350px]
              rounded-[17px]
              border
              border-[var(--color-surface)]/90
              bg-[var(--color-surface)]/85
              px-[15px]
              py-[13px]
              shadow-[0_10px_35px_rgba(23,32,26,.12)]
              backdrop-blur-xl
            "
          >
            <div className="flex items-center gap-[12px]">
              <div
                className="
                  flex
                  h-[48px]
                  w-[48px]
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border-[3px]
                  border-[var(--color-surface-secondary)]
                  bg-[var(--color-surface-secondary)]
                  text-[var(--color-primary)]
                "
              >
                <User size={25} strokeWidth={1.6} />
              </div>

              <div>
                <p
                  className="
                    text-[11px]
                    leading-[17px]
                    text-[var(--color-text-primary)]
                  "
                >
                  “Farm Intel has completely transformed how I manage my farm. The
                  AI insights are incredibly accurate!”
                </p>

                <p
                  className="
                    mt-[5px]
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

          {/* TRUSTED BY */}

          <div
            className="
              absolute
              bottom-[28px]
              left-[43px]
              right-[35px]
              z-30
              flex
              items-center
              justify-between
            "
          >
            <div className="shrink-0">
              <p
                className="
                  text-[10px]
                  font-semibold
                  leading-[14px]
                  text-[var(--color-text-primary)]
                "
              >
                Trusted by farmers, agribusinesses
              </p>

              <p
                className="
                  text-[9px]
                  leading-[13px]
                  text-[var(--color-text-secondary)]
                "
              >
                and researchers worldwide
              </p>
            </div>

            <div
              className="
                flex
                items-center
                gap-[17px]
                opacity-70
                grayscale
                text-[var(--color-text-secondary)]
              "
            >
              <span className="text-[11px] font-black">John Deere</span>

              <span className="text-[11px] font-black">BAYER</span>

              <span className="text-[11px] font-black">CORTEVA</span>

              <span className="text-[11px] font-black">FMC</span>

              <span className="text-[11px] font-black">syngenta</span>
            </div>
          </div>
        </section>

        {/* =================================================
            RIGHT FORM SIDE
        ================================================= */}

        <section
          className="
            flex
            min-h-screen
            items-center
            justify-center
            px-[15px]
            pb-[24px]
            pt-[90px]
            sm:px-[30px]
            lg:px-[20px]
            xl:px-[20px]
          "
        >
          {/* REGISTER CARD */}

          <div
            className="
              w-full
              max-w-[718px]
              rounded-[23px]
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]/95
              px-[22px]
              py-[30px]
              shadow-[0_14px_55px_rgba(23,32,26,.10)]
              backdrop-blur-[22px]
              sm:px-[34px]
              sm:py-[35px]
              xl:px-[33px]
            "
          >
            {/* HEADING */}

            <div>
              <h2
                className="
                  text-[23px]
                  font-extrabold
                  leading-[28px]
                  tracking-[-0.7px]
                  text-[var(--color-text-primary)]
                "
              >
                Create Your Account
              </h2>

              <p
                className="
                  mt-[6px]
                  text-[11px]
                  leading-[16px]
                  text-[var(--color-text-secondary)]
                "
              >
                Start your journey toward smarter farming
              </p>
            </div>

            {/* ERROR */}

            {error && (
              <div
                role="alert"
                className="
                  mt-[16px]
                  rounded-[8px]
                  border
                  border-red-500/20
                  bg-red-500/5
                  px-[12px]
                  py-[10px]
                  text-[10px]
                  font-medium
                  text-red-500
                "
              >
                {error}
              </div>
            )}

            {/* =================================================
                GOOGLE BUTTON
            ================================================= */}


            <div className="relative mt-[25px]">
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading || googleLoading}
                className="
      relative
      flex
      h-[55px]
      w-full
      items-center
      justify-center
      gap-[11px]
      overflow-hidden
      rounded-[10px]
      border
      border-[var(--color-border)]
      bg-[var(--color-surface)]
      text-[14px]
      font-semibold
      text-[var(--color-text-primary)]
      shadow-[0_2px_10px_rgba(23,32,26,.02)]
      transition-all
      duration-200
      hover:border-[var(--color-border-hover)]
      hover:shadow-[0_5px_18px_rgba(22,163,74,.08)]
      active:scale-[0.99]
      disabled:cursor-not-allowed
      disabled:opacity-60
    "
              >
                {googleLoading ? (
                  <>
                    <span
                      className="
            h-[18px]
            w-[18px]
            animate-spin
            rounded-full
            border-2
            border-[var(--color-primary)]/20
            border-t-[var(--color-primary)]
          "
                    />

                    <span>Connecting to Google...</span>
                  </>
                ) : (
                  <>
                    <FcGoogle className="text-[21px]" />

                    <span>Sign up with Google</span>
                  </>
                )}
              </button>
            </div>

            {/* DIVIDER */}

            <Divider text="or sign up with email" />

            {/* =================================================
                FORM
            ================================================= */}

            <form onSubmit={handleSubmit} className="space-y-[15px]">
              {/* NAME + EMAIL */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-[17px]
                  sm:grid-cols-2
                "
              >
                <InputField
                  label="Full Name"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  icon={User}
                  value={formData.fullName}
                  onChange={handleChange}
                />

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  icon={Mail}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* PHONE */}

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone Number
                </label>

                <div className="flex gap-[8px]">
                  <button
                    type="button"
                    aria-label="Country code"
                    className="
                      flex
                      h-[44px]
                      w-[103px]
                      shrink-0
                      items-center
                      justify-center
                      gap-[8px]
                      rounded-[8px]
                      border
                      border-[var(--color-border)]
                      bg-[var(--color-surface)]
                      text-[12px]
                      font-medium
                      text-[var(--color-text-primary)]
                    "
                  >
                    <span className="text-[16px]">🇮🇳</span>

                    <span>+91</span>

                    <span className="text-[var(--color-text-muted)]">˅</span>
                  </button>

                  <div className="relative flex-1">
                    <Phone
                      size={16}
                      strokeWidth={1.6}
                      className="
                        absolute
                        left-[12px]
                        top-1/2
                        -translate-y-1/2
                        text-[var(--color-text-muted)]
                      "
                    />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");

                        if (value.length <= 10) {
                          setFormData((prev) => ({
                            ...prev,
                            phone: value,
                          }));
                        }

                        setError("");
                      }}
                      placeholder="Enter your phone number"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* PASSWORD + CONFIRM */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-[17px]
                  sm:grid-cols-2
                "
              >
                <PasswordField
                  label="Password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  show={showPassword}
                  setShow={setShowPassword}
                />

                <PasswordField
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  show={showConfirmPassword}
                  setShow={setShowConfirmPassword}
                />
              </div>

              {/* PASSWORD REQUIREMENTS */}

              <div className="pt-[1px]">
                <p
                  className="
                    mb-[8px]
                    text-[10px]
                    font-semibold
                    text-[var(--color-text-secondary)]
                  "
                >
                  Password must contain:
                </p>

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-y-[7px]
                    sm:grid-cols-2
                  "
                >
                  {passwordRules.map((rule) => (
                    <div
                      key={rule.label}
                      className="
                        flex
                        items-center
                        gap-[8px]
                        text-[10px]
                        text-[var(--color-text-secondary)]
                      "
                    >
                      <span
                        className={`
                          flex
                          h-[14px]
                          w-[14px]
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          ${
                            rule.valid
                              ? "bg-[var(--color-success)] text-white"
                              : "border border-[var(--color-border)] bg-[var(--color-surface)]"
                          }
                        `}
                      >
                        {rule.valid && <Check size={9} strokeWidth={3} />}
                      </span>

                      {rule.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* ROLES */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-[13px]
                  sm:grid-cols-4
                "
              >
                {roles.map(({ name, icon: Icon }) => {
                  const active = role === name;

                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        setRole(name);
                        setError("");
                      }}
                      className={`
                          flex
                          h-[80px]
                          flex-col
                          items-center
                          justify-center
                          gap-[7px]
                          rounded-[9px]
                          border
                          transition-all
                          duration-200
                          ${
                            active
                              ? `
                                border-[var(--color-primary)]
                                bg-[var(--color-surface-secondary)]
                                text-[var(--color-primary)]
                              `
                              : `
                                border-[var(--color-border)]
                                bg-[var(--color-surface)]
                                text-[var(--color-text-secondary)]
                                hover:border-[var(--color-border-hover)]
                                hover:text-[var(--color-primary)]
                              `
                          }
                        `}
                    >
                      <Icon size={21} strokeWidth={1.7} />

                      <span
                        className="
                            text-[10px]
                            font-semibold
                          "
                      >
                        {name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* TERMS */}

              <label
                className="
                  flex
                  cursor-pointer
                  items-start
                  gap-[9px]
                  pt-[3px]
                "
              >
                <input
                  type="checkbox"
                  required
                  className="
                    mt-[2px]
                    h-[15px]
                    w-[15px]
                    shrink-0
                    accent-[var(--color-primary)]
                  "
                />

                <span
                  className="
                    text-[9px]
                    leading-[16px]
                    text-[var(--color-text-secondary)]
                  "
                >
                  I agree to the{" "}
                  <a
                    href="#terms"
                    className="
                      font-semibold
                      text-[var(--color-primary)]
                    "
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#privacy"
                    className="
                      font-semibold
                      text-[var(--color-primary)]
                    "
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>

              {/* INFO */}

              <p
                className="
                  mt-[23px]
                  text-center
                  text-[9px]
                  leading-[16px]
                  text-[var(--color-text-muted)]
                "
              >
                By creating an account, you agree to our{" "}
                <a
                  href="#terms"
                  className="
                    font-medium
                    text-[var(--color-primary)]
                  "
                >
                  Terms of Service
                </a>{" "}
                and acknowledge our{" "}
                <a
                  href="#privacy"
                  className="
                    font-medium
                    text-[var(--color-primary)]
                  "
                >
                  Privacy Policy
                </a>
                .
              </p>

              {/* CREATE ACCOUNT */}

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="
                  group
                  mt-[1px]
                  flex
                  h-[50px]
                  w-full
                  items-center
                  justify-center
                  gap-[10px]
                  rounded-[9px]
                  bg-[var(--color-primary)]
                  text-[14px]
                  font-bold
                  text-white
                  shadow-[0_7px_20px_rgba(22,163,74,.20)]
                  transition-all
                  duration-200
                  hover:-translate-y-[1px]
                  hover:bg-[var(--color-primary-hover)]
                  hover:shadow-[0_10px_28px_rgba(22,163,74,.27)]
                  active:translate-y-0
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  disabled:hover:translate-y-0
                "
              >
                {loading ? (
                  <>
                    <span
                      className="
                        h-[17px]
                        w-[17px]
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight
                      size={17}
                      className="
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   DIVIDER
========================================================= */

function Divider({ text }) {
  return (
    <div className="my-[17px] flex items-center gap-[14px]">
      <div
        className="
          h-px
          flex-1
          bg-[var(--color-border)]
        "
      />

      <span
        className="
          whitespace-nowrap
          text-[10px]
          font-medium
          text-[var(--color-text-muted)]
        "
      >
        {text}
      </span>

      <div
        className="
          h-px
          flex-1
          bg-[var(--color-border)]
        "
      />
    </div>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

const labelClass = `
  mb-[6px]
  block
  text-[11px]
  font-semibold
  leading-[15px]
  text-[var(--color-text-primary)]
`;

const inputClass = `
  h-[44px]
  w-full
  rounded-[8px]
  border
  border-[var(--color-border)]
  bg-[var(--color-surface)]
  pl-[39px]
  pr-[12px]
  text-[11px]
  font-medium
  text-[var(--color-text-primary)]
  outline-none
  placeholder:text-[var(--color-text-muted)]
  transition-all
  duration-200
  focus:border-[var(--color-primary)]
  focus:ring-[3px]
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
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>

      <div className="relative">
        <Icon
          size={16}
          strokeWidth={1.6}
          className="
            absolute
            left-[12px]
            top-1/2
            -translate-y-1/2
            text-[var(--color-text-muted)]
          "
        />

        <input
          id={name}
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
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>

      <div className="relative">
        <LockKeyhole
          size={16}
          strokeWidth={1.6}
          className="
            absolute
            left-[12px]
            top-1/2
            -translate-y-1/2
            text-[var(--color-text-muted)]
          "
        />

        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            h-[44px]
            w-full
            rounded-[8px]
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            pl-[39px]
            pr-[40px]
            text-[11px]
            font-medium
            text-[var(--color-text-primary)]
            outline-none
            placeholder:text-[var(--color-text-muted)]
            transition-all
            duration-200
            focus:border-[var(--color-primary)]
            focus:ring-[3px]
            focus:ring-[var(--color-primary)]/10
          "
          required
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="
            absolute
            right-[12px]
            top-1/2
            -translate-y-1/2
            text-[var(--color-text-muted)]
            transition-colors
            hover:text-[var(--color-primary)]
          "
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   WEATHER CARD
========================================================= */

function WeatherCard() {
  return (
    <div
      className="
        flex
        h-[76px]
        w-[122px]
        items-center
        gap-[8px]
        rounded-[11px]
        border
        border-[var(--color-surface)]/70
        bg-[var(--color-surface)]/15
        px-[12px]
        shadow-[0_8px_30px_rgba(23,32,26,.08)]
        backdrop-blur-[10px]
      "
    >
      <CloudSun size={25} strokeWidth={1.5} className="text-white" />

      <div>
        <div
          className="
            text-[20px]
            font-semibold
            leading-[22px]
            text-white
          "
        >
          24°C
        </div>

        <div className="text-[8px] text-white/75">Partly Cloudy</div>
      </div>
    </div>
  );
}

/* =========================================================
   FARM STAT
========================================================= */

function FarmStat({ icon: Icon, title, value, status }) {
  return (
    <div
      className="
        relative
        h-[81px]
        w-[164px]
        overflow-hidden
        rounded-[11px]
        border
        border-[var(--color-surface)]/60
        bg-[var(--color-primary)]/35
        px-[12px]
        py-[9px]
        shadow-[0_8px_28px_rgba(22,163,74,.12)]
        backdrop-blur-[12px]
      "
    >
      <div
        className="
          flex
          items-center
          gap-[6px]
          text-[8px]
          font-medium
          text-white/90
        "
      >
        <Icon size={12} strokeWidth={1.6} />

        {title}
      </div>

      <div
        className="
          mt-[3px]
          text-[21px]
          font-bold
          leading-[22px]
          text-white
        "
      >
        {value}
      </div>

      <div
        className="
          text-[8px]
          font-medium
          text-white/75
        "
      >
        {status}
      </div>

      {/* MINI CHART */}

      <div
        className="
          absolute
          bottom-[10px]
          right-[10px]
          flex
          items-end
          gap-[3px]
        "
      >
        <span className="h-[8px] w-[4px] rounded-t-sm bg-white/35" />
        <span className="h-[13px] w-[4px] rounded-t-sm bg-white/45" />
        <span className="h-[20px] w-[4px] rounded-t-sm bg-white/60" />
        <span className="h-[27px] w-[4px] rounded-t-sm bg-[var(--color-primary-light)]" />
      </div>
    </div>
  );
}

export default RegisterPage;
