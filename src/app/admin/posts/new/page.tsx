import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SplitHeading from "@/components/ui/SplitHeading";
import PostEditor from "@/components/admin/PostEditor";
import { requireSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "New post",
  robots: { index: false, follow: false },
};

export default async function NewPostPage() {
  await requireSession();

  return (
    <section className="pb-24 pt-40">
      <Container className="max-w-3xl">
        <SplitHeading solid="New" ghost="Post" />
        <div className="mt-12">
          <PostEditor />
        </div>
      </Container>
    </section>
  );
}
