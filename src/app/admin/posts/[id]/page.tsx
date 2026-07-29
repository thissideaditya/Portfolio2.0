import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import SplitHeading from "@/components/ui/SplitHeading";
import PostEditor from "@/components/admin/PostEditor";
import { requireSession } from "@/lib/auth";
import { getPostById } from "@/lib/db";

export const metadata: Metadata = {
  title: "Edit post",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  await requireSession();

  const post = await getPostById(Number(params.id));
  if (!post) notFound();

  return (
    <section className="pb-24 pt-40">
      <Container className="max-w-3xl">
        <SplitHeading solid="Edit" ghost="Post" />
        <div className="mt-12">
          <PostEditor post={post} />
        </div>
      </Container>
    </section>
  );
}
