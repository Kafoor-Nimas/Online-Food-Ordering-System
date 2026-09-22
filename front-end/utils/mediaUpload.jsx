export default async function uploadFile(file) {
  if (!file) {
    throw new Error("No file selected");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    "https://online-food-ordering-system-backend.vercel.app/api/upload",
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  const data = await response.json();
  return data.url;
}