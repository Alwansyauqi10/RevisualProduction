import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  getBlogByIdService,
  updateBlogService,
  type Blog,
} from "../../service/blogService";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [author, setAuthor] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const getBlog = async () => {
      if (!id) return;

      try {
        const blog = await getBlogByIdService(id);

        setTitle(blog.title);
        setExcerpt(blog.excerpt);
        setContent(blog.content);
        setCoverImage(blog.coverImage || "");
        setAuthor(blog.author);
      } catch (error) {
        console.error("GAGAL MENGAMBIL BLOG:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getBlog();
  }, [id]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!id) return;

    try {
      setIsSaving(true);

      const updatedBlog = await updateBlogService(id, {
        title,
        excerpt,
        content,
        coverImage,
        author,
      });

      console.log("BLOG BERHASIL DIUPDATE:", updatedBlog);

      navigate("/admin/blogs");
    } catch (error) {
      console.error("BLOG GAGAL DIUPDATE:", error);
    } finally {
      setIsSaving(false);
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
      <div className="mx-auto max-w-3xl">
        {/* Back */}
        <Link
          to="/admin/blogs"
          className="text-sm text-[#071A33]/50 transition hover:text-[#071A33]"
        >
          ← Back to Admin
        </Link>

        {/* Header */}
        <div className="mt-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#071A33]/45">
            Revisual Admin
          </p>

          <h1 className="font-display mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
            EDIT BLOG.
          </h1>

          <p className="mt-5 text-base leading-7 text-[#071A33]/55">
            Update your story and publication details.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Title
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="h-12 w-full rounded-xl border border-[#071A33]/10 bg-white px-4 text-sm outline-none transition focus:border-[#071A33]/40"
              required
            />
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="mb-2 block text-sm font-medium">
              Excerpt
            </label>

            <input
              id="excerpt"
              type="text"
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              className="h-12 w-full rounded-xl border border-[#071A33]/10 bg-white px-4 text-sm outline-none transition focus:border-[#071A33]/40"
              required
            />
          </div>

          {/* Cover Image */}
          <div>
            <label
              htmlFor="coverImage"
              className="mb-2 block text-sm font-medium"
            >
              Cover Image URL
            </label>

            <input
              id="coverImage"
              type="text"
              value={coverImage}
              onChange={(event) => setCoverImage(event.target.value)}
              placeholder="https://..."
              className="h-12 w-full rounded-xl border border-[#071A33]/10 bg-white px-4 text-sm outline-none transition focus:border-[#071A33]/40"
            />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="mb-2 block text-sm font-medium">
              Author
            </label>

            <input
              id="author"
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              className="h-12 w-full rounded-xl border border-[#071A33]/10 bg-white px-4 text-sm outline-none transition focus:border-[#071A33]/40"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="mb-2 block text-sm font-medium">
              Content
            </label>

            <textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={14}
              className="w-full resize-none rounded-xl border border-[#071A33]/10 bg-white px-4 py-4 text-sm leading-6 outline-none transition focus:border-[#071A33]/40"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSaving}
            className="h-12 rounded-full bg-[#071A33] px-6 text-sm font-medium text-white transition hover:bg-[#0B2545] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Update Blog"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default EditBlog;
