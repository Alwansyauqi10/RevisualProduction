import { useEffect, useState } from "react";
import { getBlogsService } from "../service/blogService";
import { Link } from "react-router";

function Blog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await getBlogsService();

        console.log("BLOGS:", data);

        setBlogs(data);
      } catch (error) {
        console.error("GAGAL MENGAMBIL BLOG:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getBlogs();
  }, []);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F7FA] text-[#071A33]">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F7FA] px-6 py-32 text-[#071A33]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#071A33]/45">
            Revisual Journal
          </p>

          <h1 className="font-display mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
            STORIES.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#071A33]/55">
            Stories, projects, and moments from Revisual Production.
          </p>
        </div>

        {/* Blog List */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {blogs.map((blog) => (
            <Link
              key={blog.objectId}
              to={`/blog/${blog.objectId}`}
              className="block"
            >
              <article
                key={blog.objectId}
                className="overflow-hidden rounded-[2rem] bg-white"
              >
                {/* Cover */}
                <div className="aspect-[16/10] bg-[#E8F1F8]">
                  {blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-display text-sm uppercase tracking-[0.2em] text-[#071A33]/30">
                        Revisual Production
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-7">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#071A33]/40">
                    {blog.author}
                  </p>

                  <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
                    {blog.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#071A33]/55">
                    {blog.excerpt}
                  </p>

                  <p className="mt-6 text-xs text-[#071A33]/40">
                    {new Date(blog.created).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Blog;
