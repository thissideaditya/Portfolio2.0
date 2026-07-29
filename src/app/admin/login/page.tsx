import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SplitHeading from "@/components/ui/SplitHeading";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <Container className="max-w-xl">
        <SplitHeading solid="Welcome" ghost="Back" />
        <p className="mt-6 text-base text-muted">
          Sign in to write, edit, and publish posts.
        </p>
        <div className="mt-12">
          <LoginForm />
        </div>
      </Container>
    </section>
  );
}
