import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { deleteBlogService, getBlogsService } from "../../service/blogService";
import { useAuth } from "../../context/AuthContext";

function AdminBlogs() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await getBlogsService();

        console.log("ADMIN BLOGS:", data);

        setBlogs(data);
      } catch (error) {
        console.error("GAGAL MENGAMBIL BLOG:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getBlogs();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleDelete = async (objectId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmed) return;

    try {
      await deleteBlogService(objectId);

      setBlogs((currentBlogs) =>
        currentBlogs.filter((blog) => blog.objectId !== objectId),
      );

      console.log("BLOG BERHASIL DIHAPUS");
    } catch (error) {
      console.error("BLOG GAGAL DIHAPUS:", error);
    }
  };

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
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#071A33]/45">
              Revisual Admin
            </p>

            <h1 className="font-display mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
              BLOGS.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#071A33]/55">
              Manage stories and publications for Revisual Production.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/create-blog"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#071A33] px-6 text-sm font-medium text-white transition hover:bg-[#0B2545]"
            >
              + Create Blog
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#071A33]/10 bg-white px-6 text-sm font-medium transition hover:bg-[#071A33] hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
        {/* Blog List */}
        <div className="mt-16 overflow-hidden rounded-[2rem] bg-white">
          <div className="border-b border-[#071A33]/10 px-6 py-5 sm:px-8">
            <p className="text-sm font-medium">
              {blogs.length} {blogs.length === 1 ? "Blog" : "Blogs"}
            </p>
          </div>

          <div className="divide-y divide-[#071A33]/10">
            {blogs.map((blog) => (
              <article
                key={blog.objectId}
                className="flex flex-col gap-6 px-6 py-6 sm:flex-row sm:items-center sm:px-8"
              >
                {/* Cover */}
                <div className="h-24 w-full shrink-0 overflow-hidden rounded-2xl bg-[#E8F1F8] sm:w-36">
                  {blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-4 text-center">
                      <span className="font-display text-[10px] uppercase tracking-[0.15em] text-[#071A33]/30">
                        Revisual
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#071A33]/40">
                    {blog.author}
                  </p>

                  <h2 className="font-display mt-2 truncate text-xl font-semibold tracking-tight">
                    {blog.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#071A33]/55">
                    {blog.excerpt}
                  </p>

                  <p className="mt-3 text-xs text-[#071A33]/40">
                    {new Date(blog.created).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-3">
                  <Link
                    to={`/blog/${blog.objectId}`}
                    className="rounded-full border border-[#071A33]/10 px-4 py-2 text-sm font-medium transition hover:bg-[#071A33] hover:text-white"
                  >
                    View
                  </Link>

                  <Link
                    to={`/admin/blogs/${blog.objectId}/edit`}
                    className="rounded-full border border-[#071A33]/10 px-4 py-2 text-sm font-medium transition hover:bg-[#071A33] hover:text-white"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(blog.objectId)}
                    className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {blogs.length === 0 && (
            <div className="px-6 py-20 text-center">
              <p className="font-display text-xl font-semibold">
                No blogs yet.
              </p>

              <p className="mt-2 text-sm text-[#071A33]/50">
                Start by creating your first story.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default AdminBlogs;
