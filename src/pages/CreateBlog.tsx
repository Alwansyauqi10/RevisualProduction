import { type FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createBlogService } from "../service/blogService";
import { useNavigate } from "react-router";


function CreateBlog() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const newBlog = await createBlogService({
        title,
        excerpt,
        content,
        coverImage: "",
        author: user.name,
      });

      console.log("BLOG BERHASIL DIBUAT:", newBlog);

      navigate("/blog");
    } catch (error) {
      console.error("BLOG GAGAL DIBUAT:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA] px-6 py-32 text-[#071A33]">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#071A33]/45">
            Revisual Production
          </p>

          <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            CREATE BLOG.
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#071A33]/55">
            Create and publish a new story for Revisual Production.
          </p>

          <button
            onClick={logout}
            className="rounded-full border border-[#071A33]/10 bg-white px-5 py-3 text-sm font-medium transition hover:bg-[#071A33] hover:text-white"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Title
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter blog title"
              className="h-12 w-full rounded-xl border border-[#071A33]/10 bg-white px-4 text-sm outline-none transition focus:border-[#071A33]/40"
              required
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="mb-2 block text-sm font-medium">
              Excerpt
            </label>

            <input
              id="excerpt"
              type="text"
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              placeholder="Short summary of your blog"
              className="h-12 w-full rounded-xl border border-[#071A33]/10 bg-white px-4 text-sm outline-none transition focus:border-[#071A33]/40"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="mb-2 block text-sm font-medium">
              Content
            </label>

            <textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Write your story..."
              rows={10}
              className="w-full resize-none rounded-xl border border-[#071A33]/10 bg-white px-4 py-4 text-sm leading-6 outline-none transition focus:border-[#071A33]/40"
              required
            />
          </div>

          <button
            type="submit"
            className="h-12 rounded-full bg-[#071A33] px-6 text-sm font-medium text-white transition hover:bg-[#0B2545]"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </main>
  );
}

export default CreateBlog;
