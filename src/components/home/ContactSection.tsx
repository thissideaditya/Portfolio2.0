import Container from "@/components/ui/Container";
import SplitHeading from "@/components/ui/SplitHeading";
import ContactForm from "@/components/shared/ContactForm";

export default function ContactSection() {
  return (
    <section className="border-t border-border/60 py-20 sm:py-28">
      <Container>
        <SplitHeading solid="Let's Work" ghost="Together" />
        <div className="mt-14 max-w-4xl">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
