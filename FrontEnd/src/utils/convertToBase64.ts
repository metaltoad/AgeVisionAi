type ConvertToBase64PayloadType = {
  File: File;
};

export default async function convertToBase64(
  data: ConvertToBase64PayloadType
): Promise<string> {
  if (!data.File) throw new Error("No image sent to convertToBase64 function");

  if (!data.File.type.startsWith("image"))
    throw new Error("File type must be an image");

  // transform file to base64
  const base64Image = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data.File);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

  return base64Image;
}
