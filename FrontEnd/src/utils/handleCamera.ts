import { SetStateAction } from "jotai";
import { SetAtom } from "../interfaces/SetAtom";

export default async function handleCamera(
  setImage: SetAtom<[SetStateAction<string>], void>
): Promise<string> {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  // Create video element and attach stream
  const videoElement = document.createElement("video");
  videoElement.srcObject = stream;
  videoElement.play();

  return await new Promise((resolve) => {
    // Wait for video to be loaded and playing
    videoElement.addEventListener("canplay", () => {
      // Create canvas element with same dimensions as video
      const canvasElement = document.createElement("canvas");
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;

      // Draw video frame onto canvas
      const context = canvasElement.getContext("2d");

      if (!context) throw new Error("No context found");

      context.drawImage(
        videoElement,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      // Get image data URL from canvas
      const imageDataURL = canvasElement.toDataURL("image/png");

      setImage(imageDataURL);

      // Clean up: stop streaming and remove elements
      stream.getVideoTracks().forEach((track) => track.stop());
      videoElement.remove();
      canvasElement.remove();

      resolve(imageDataURL);
    });
  });
}
