// const convertToBase64 = (imgUrl: string) => {
//   const image = new Image();
//   image.crossOrigin = "anonymous";
//   image.onload = () => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     canvas.height = image.naturalHeight;
//     canvas.width = image.naturalWidth;
//     ctx && ctx.drawImage(image, 0, 0);
//     const dataUrl = canvas.toDataURL();
//     console.log("dataUrl =>", dataUrl);
//   };
//   image.src = imgUrl;
//   console.log("image.src =>", image.src);
// };

// export default convertToBase64;

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
