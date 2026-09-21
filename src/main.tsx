import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./config/backendless";

import Home from "./pages/Home";
import About from "./pages/About";
import MainLayout from "./layouts/MainLayout";
import UniversitasTerbuka from "./pages/universitas-terbuka/UniversitasTerbuka";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Blogs from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Teams from "./pages/Teams";
import Contact from "./pages/Contact";
import Login from "./pages/login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreateBlog from "./pages/CreateBlog";
import AdminBlogs from "./pages/admin/AdminBlogs";
import EditBlog from "./pages/admin/EditBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/univ.terbuka",
        element: <UniversitasTerbuka />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/portfolio",
        element: <Portfolio />,
      },
      {
        path: "/blog",
        element: <Blogs />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "/teams",
        element: <Teams />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/create-blog",
        element: (
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/blogs",
        element: (
          <ProtectedRoute>
            <AdminBlogs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/blogs/:id/edit",
        element: (
          <ProtectedRoute>
            <EditBlog />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
