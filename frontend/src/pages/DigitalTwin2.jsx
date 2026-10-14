
import FieldRepresentationBuilder from "../components/digital/FieldRepresentationBuilder";

export default function DigitalTwin2() {
  return (
    <main
      className="
        min-h-screen
        bg-[var(--color-bg)]
        px-[28px]
        pb-[50px]
        pt-[20px]
        text-[var(--color-text-primary)]
        xl:px-[30px]
      "
    >
      {/* Builder */}
      <FieldRepresentationBuilder />
    </main>
  );
}

