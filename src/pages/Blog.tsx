import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getBlogsService } from "../service/blogService";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "#components/ui/pagination.tsx";

function Blog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);

  const blogsPerPage = 6;

  const totalPages = Math.ceil(
    totalBlogs / blogsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  useEffect(() => {
    const getBlogs = async () => {
      try {
        setIsLoading(true);

        const data = await getBlogsService(
          currentPage,
          blogsPerPage
        );

        console.log("BLOGS:", data);

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

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F7FA] text-[#071A33]">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F7FA] px-6 py-16 text-[#071A33] lg:py-32">
      <div className="mx-auto max-w-7xl pt-16">

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

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {blogs.map((blog) => (
            <Link
              key={blog.objectId}
              to={`/blog/${blog.objectId}`}
              className="block"
            >
              <article className="overflow-hidden rounded-[2rem] bg-white">
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
              </article>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-16">
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
                      <PaginationItem key={page}>
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

export default Blog;