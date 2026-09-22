import Backendless from "../config/backendless";

export interface Blog {
  objectId: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  created: string;
  updated: string;
}

export const createBlogService = async (blog: {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
}) => {
  const newBlog = await Backendless.Data.of("blogs").save(blog);

  return newBlog;
};

export const getBlogsService = async (
  page: number,
  take: number
) => {
  const queryBuilder = Backendless.DataQueryBuilder.create();

  queryBuilder.setSortBy(["created DESC"]);

  queryBuilder.setPageSize(take);

  queryBuilder.setOffset((page - 1) * take);

  const blogs = await Backendless.Data.of("blogs").find(queryBuilder);

  const total = await Backendless.Data.of("blogs").getObjectCount();

  return {
    blogs,
    total,
  };
};

export const getBlogByIdService = async (
  objectId: string
): Promise<Blog> => {
  const blog = await Backendless.Data.of("blogs").findById(objectId);

  return blog as Blog;
};

export const updateBlogService = async (
  objectId: string,
  blog: {
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    author: string;
  }
) => {
  const updatedBlog = await Backendless.Data.of("blogs").save({
    objectId,
    ...blog,
  });

  return updatedBlog;
};

export const deleteBlogService = async (objectId: string) => {
  const deletedBlog = await Backendless.Data.of("blogs").remove(objectId);

  return deletedBlog;
};

