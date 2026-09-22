import Backendless from "../config/backendless";

export const uploadBlogImageService = async (file: File) => {
  const fileURL = await Backendless.Files.upload(
    file,
    "blog-images",
    true
  );

  return fileURL;
};