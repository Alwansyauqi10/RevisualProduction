import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "#components/ui/pagination.tsx";

import {
  deleteBlogService,
  getBlogsService,
} from "../../service/blogService";

function AdminBlogs() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const blogsPerPage = 5;
  const totalPages = Math.ceil(
    totalBlogs / blogsPerPage
  );

  useEffect(() => {
    const getBlogs = async () => {
      try {
        setIsLoading(true);

        const data = await getBlogsService(
          currentPage,
          blogsPerPage
        );

        console.log("ADMIN BLOGS:", data);

        setBlogs(data.blogs);
        setTotalBlogs(data.total);
      } catch (error) {
        console.error(
          "GAGAL MENGAMBIL BLOG:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    getBlogs();
  }, [currentPage]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleDelete = async (objectId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteBlogService(objectId);

      setBlogs((currentBlogs) =>
        currentBlogs.filter(
          (blog) => blog.objectId !== objectId
        )
      );

      setTotalBlogs((currentTotal) =>
        currentTotal - 1
      );

      console.log("BLOG BERHASIL DIHAPUS");
    } catch (error) {
      console.error(
        "BLOG GAGAL DIHAPUS:",
        error
      );
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F7FA] text-[#071A33]">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F7FA] px-6 py-16 text-[#071A33] lg:py-24">
      <div className="mx-auto max-w-7xl pt-16">

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#071A33]/45">
              Admin Dashboard
            </p>
            <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              BLOGS.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#071A33]/55">
              Manage stories, projects, and moments
              from Revisual Production.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/create-blog"
              className="rounded-xl bg-[#071A33] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0B2545]">
              + Create Blog
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-[#071A33]/10 bg-white px-5 py-3 text-sm font-medium text-[#071A33] transition hover:bg-[#F5F7FA]">
              Logout
            </button>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <article
                key={blog.objectId}
                className="rounded-[1.5rem] bg-white p-5">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl bg-[#E8F1F8] md:w-48">
                    {blog.coverImage ? (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="h-full w-full object-cover"/>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="font-display text-xs uppercase tracking-[0.15em] text-[#071A33]/30">
                          Revisual
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#071A33]/40">
                      {blog.author}
                    </p>
                    <h2 className="font-display mt-2 truncate text-xl font-semibold">
                      {blog.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#071A33]/55">
                      {blog.excerpt}
                    </p>
                    <p className="mt-3 text-xs text-[#071A33]/40">
                      {new Date(
                        blog.created
                      ).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Link
                      to={`/blog/${blog.objectId}`}
                      className="rounded-lg border border-[#071A33]/10 px-4 py-2 text-sm font-medium transition hover:bg-[#F5F7FA]">
                      View
                    </Link>

                    <Link
                      to={`/admin/blogs/${blog.objectId}/edit`}
                      className="rounded-lg border border-[#071A33]/10 px-4 py-2 text-sm font-medium transition hover:bg-[#F5F7FA]">
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          blog.objectId
                        )
                      }
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-[1.5rem] bg-white p-12 text-center">
              <p className="text-sm text-[#071A33]/50">
                No blogs found.
              </p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination>
              <PaginationContent>

                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      handlePageChange(
                        currentPage - 1
                      );
                    }}
                  />
                </PaginationItem>

                {Array.from(
                  { length: totalPages },
                  (_, index) => {
                    const page = index + 1;

                    return (
                      <PaginationItem
                        key={page}>
                        <PaginationLink
                          href="#"
                          isActive={
                            currentPage === page
                          }
                          onClick={(event) => {
                            event.preventDefault();
                            handlePageChange(
                              page
                            );
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();

                      handlePageChange(
                        currentPage + 1
                      );
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminBlogs;