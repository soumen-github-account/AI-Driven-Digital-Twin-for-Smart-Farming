import { useState } from "react";
import { ChevronDown, MessageCircleQuestion, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "What is AgriTwin AI?",
    answer:
      "AgriTwin AI is an intelligent digital twin platform for farms. It combines AI, IoT, weather, satellite and soil data to create a real-time digital representation of your farm and help you make smarter farming decisions.",
  },
  {
    question: "How does the Digital Twin work?",
    answer:
      "AgriTwin collects data from sensors, satellite imagery, weather services and soil information. Our AI analyzes this data continuously and creates a dynamic digital model of your farm.",
  },
  {
    question: "Can AgriTwin detect crop diseases?",
    answer:
      "Yes. AgriTwin uses AI and computer vision to analyze crop conditions and identify potential disease risks at an early stage, helping farmers take preventive action.",
  },
  {
    question: "Does AgriTwin provide irrigation recommendations?",
    answer:
      "Yes. The platform analyzes soil moisture, weather conditions, crop requirements and historical data to recommend when and how much irrigation may be required.",
  },
  {
    question: "Can I monitor my farm in real time?",
    answer:
      "Absolutely. AgriTwin provides real-time monitoring for connected IoT sensors, soil moisture, weather conditions, crop health and other important farm parameters.",
  },
  {
    question: "Is AgriTwin suitable for small farms?",
    answer:
      "Yes. AgriTwin is designed to support different types and sizes of farms, from small farmers to large agricultural operations and agribusinesses.",
  },
  {
    question: "Do I need IoT sensors to use AgriTwin?",
    answer:
      "Not necessarily. IoT sensors can provide additional real-time information, but AgriTwin can also work with available weather, satellite and farm data.",
  },
  {
    question: "How does AI help farmers make decisions?",
    answer:
      "AI converts complex farm data into understandable insights, predictions and actionable recommendations for irrigation, disease prevention, crop health, yield planning and resource optimization.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      id="faq"
      className="
        relative
        overflow-hidden
        bg-[var(--color-bg)]
        px-6
        py-24
        transition-colors
        duration-500
        sm:px-8
        lg:px-12
      "
    >
      {/* ================= BACKGROUND GLOW ================= */}

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-20
          h-72
          w-72
          rounded-full
          bg-[var(--color-primary)]/10
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-10
          h-80
          w-80
          rounded-full
          bg-[var(--color-ai)]/10
          blur-[110px]
        "
      />

      <div className="relative mx-auto max-w-5xl">

        {/* ================= HEADER ================= */}

        <div className="mx-auto mb-14 max-w-2xl text-center">

          {/* Small badge */}

          <div
            className="
              mx-auto
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[var(--color-primary)]/20
              bg-[var(--color-surface)]
              px-4
              py-2
              text-xs
              font-semibold
              text-[var(--color-primary)]
              shadow-[0_8px_30px_rgba(22,163,74,0.08)]
              backdrop-blur-xl
            "
          >
            <MessageCircleQuestion size={15} />

            <span>Frequently Asked Questions</span>

            <Sparkles
              size={13}
              className="text-[var(--color-ai)]"
            />
          </div>

          <h2
            className="
              text-3xl
              font-extrabold
              tracking-[-1.2px]
              text-[var(--color-text-primary)]
              sm:text-4xl
              lg:text-5xl
            "
          >
            Everything You Need
            <span className="block text-[var(--color-primary)]">
              To Know About AgriTwin.
            </span>
          </h2>

          <p
            className="
              mt-5
              text-sm
              leading-7
              text-[var(--color-text-secondary)]
              sm:text-base
            "
          >
            Have questions about AI-powered farming, Digital Twins,
            monitoring or predictions? Find your answers below.
          </p>
        </div>

        {/* ================= FAQ LIST ================= */}

        <div className="space-y-4">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`
                  overflow-hidden
                  rounded-[24px]
                  border
                  bg-[var(--color-surface)]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  ${
                    isOpen
                      ? `
                        border-[var(--color-primary)]/35
                        shadow-[0_15px_50px_rgba(22,163,74,0.10)]
                      `
                      : `
                        border-[var(--color-border)]
                        shadow-[0_8px_30px_rgba(0,0,0,0.03)]
                        hover:border-[var(--color-border-hover)]
                      `
                  }
                `}
              >

                {/* QUESTION */}

                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-5
                    px-6
                    py-5
                    text-left
                    sm:px-7
                    sm:py-6
                  "
                >

                  <div className="flex items-center gap-4">

                    {/* Number */}

                    <div
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        text-xs
                        font-bold
                        transition-all
                        duration-300
                        ${
                          isOpen
                            ? "bg-[var(--color-primary)] text-white"
                            : "bg-[var(--color-surface-secondary)] text-[var(--color-primary)]"
                        }
                      `}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <span
                      className={`
                        text-sm
                        font-bold
                        transition-colors
                        duration-200
                        sm:text-[15px]
                        ${
                          isOpen
                            ? "text-[var(--color-primary)]"
                            : "text-[var(--color-text-primary)]"
                        }
                      `}
                    >
                      {faq.question}
                    </span>

                  </div>

                  {/* Chevron */}

                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[var(--color-border)]
                      bg-[var(--color-surface-secondary)]
                      text-[var(--color-text-secondary)]
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? "rotate-180 border-[var(--color-primary)]/30 text-[var(--color-primary)]"
                          : ""
                      }
                    `}
                  >
                    <ChevronDown size={17} />
                  </div>
                </button>

                {/* ANSWER */}

                <div
                  className={`
                    grid
                    transition-all
                    duration-300
                    ease-in-out
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">

                    <div
                      className="
                        border-t
                        border-[var(--color-border)]
                        px-6
                        pb-6
                        pt-5
                        sm:px-7
                      "
                    >
                      <div className="ml-[52px] max-w-3xl">

                        <p
                          className="
                            text-sm
                            leading-7
                            text-[var(--color-text-secondary)]
                          "
                        >
                          {faq.answer}
                        </p>

                      </div>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}

        </div>

        {/* ================= BOTTOM CTA ================= */}

        <div
          className="
            relative
            mt-12
            overflow-hidden
            rounded-[28px]
            border
            border-[var(--color-primary)]/20
            bg-[var(--color-surface)]
            p-7
            text-center
            shadow-[0_15px_60px_rgba(22,163,74,0.08)]
            sm:p-9
          "
        >

          {/* Glow */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-32
              w-64
              -translate-x-1/2
              rounded-full
              bg-[var(--color-primary)]/10
              blur-[70px]
            "
          />

          <div className="relative">

            <div
              className="
                mx-auto
                mb-4
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-[var(--color-surface-secondary)]
                text-[var(--color-primary)]
              "
            >
              <MessageCircleQuestion size={21} />
            </div>

            <h3
              className="
                text-lg
                font-extrabold
                text-[var(--color-text-primary)]
                sm:text-xl
              "
            >
              Still have questions?
            </h3>

            <p
              className="
                mx-auto
                mt-2
                max-w-lg
                text-sm
                leading-6
                text-[var(--color-text-secondary)]
              "
            >
              Our team is ready to help you understand how
              AgriTwin can transform your farming workflow.
            </p>

            <a
              href="#contact"
              className="
                mt-6
                inline-flex
                h-11
                items-center
                justify-center
                rounded-xl
                bg-[var(--color-primary)]
                px-6
                text-sm
                font-bold
                text-white
                shadow-[0_8px_25px_rgba(22,163,74,0.25)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[var(--color-primary-hover)]
                hover:shadow-[0_12px_30px_rgba(22,163,74,0.3)]
                active:scale-95
              "
            >
              Talk to Our Team
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}

export default FAQ;