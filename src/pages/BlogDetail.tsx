import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getBlogByIdService } from "../service/blogService";

function BlogDetail() {
  const { id } = useParams();

  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBlog = async () => {
      if (!id) return;

      try {
        const data = await getBlogByIdService(id);

        console.log("BLOG DETAIL:", data);

        setBlog(data);
      } catch (error) {
        console.error("GAGAL MENGAMBIL BLOG:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getBlog();
  }, [id]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F7FA] text-[#071A33]">
        Loading...
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F7FA] px-6 text-[#071A33]">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold">
            Blog not found.
          </h1>

          <Link
            to="/blog"
            className="mt-6 inline-block text-sm underline underline-offset-4"
          >
            Back to Journal
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F7FA] text-[#071A33]">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-32">
        {/* Back */}
        <Link
          to="/blog"
          className="text-sm text-[#071A33]/50 transition hover:text-[#071A33]"
        >
          ← Back to Journal
        </Link>

        {/* Header */}
        <header className="mt-12 max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#071A33]/40">
            Revisual Journal
          </p>

          <h1 className="font-display mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {blog.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#071A33]/55 sm:text-lg">
            {blog.excerpt}
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm text-[#071A33]/45">
            <span>{blog.author}</span>

            <span>•</span>

            <span>
              {new Date(blog.created).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Cover */}
        <div className="mt-14 overflow-hidden rounded-[2rem]">
          <div className="aspect-[16/9] bg-[#E8F1F8]">
            {blog.coverImage ? (
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="font-display text-sm uppercase tracking-[0.25em] text-[#071A33]/25">
                  Revisual Production
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Article */}
        <article className="mx-auto mt-14 max-w-5xl">
          <div className="whitespace-pre-line text-base leading-8 text-[#071A33]/75 sm:text-lg sm:leading-9">
            {blog.content}
          </div>
        </article>
      </div>
    </main>
  );
}

export default BlogDetail;