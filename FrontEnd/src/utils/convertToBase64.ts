const convertToBase64 = (imgUrl: string) => {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = image.naturalHeight;
    canvas.width = image.naturalWidth;
    ctx && ctx.drawImage(image, 0, 0);
    const dataUrl = canvas.toDataURL();
    console.log("dataUrl =>", dataUrl);
  };
  image.src = imgUrl;
  console.log("image.src =>", image.src);
};

export default convertToBase64;
