import Container from "@/components/ui/Container";
import SocialLinks from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <Container className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <SocialLinks links={profile.socials} />
      </Container>
    </footer>
  );
}
