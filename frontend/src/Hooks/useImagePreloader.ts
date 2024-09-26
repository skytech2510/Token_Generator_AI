import { useEffect, useState } from "react";

function preloadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = img.onabort = function () {
      reject(src);
    };
    img.src = src;
  });
}

export default function useImagePreloader() {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    async function effect() {
      if (isCancelled) {
        return;
      }

      const imagesPaths: string[] = await Promise.all(
        Object.values(
          import.meta.glob(
            [
              "/src/Assets/Images/BG/*",
              "/src/Assets/Images/Icons/*",
              "/src/Assets/Images/Character/*",
            ],
            { eager: true }
          )
        ).map((v) => (v as { default: string }).default)
      );

      const imagesPromiseList = [];
      for (const i of imagesPaths) {
        imagesPromiseList.push(preloadImage(i));
      }

      await Promise.all(imagesPromiseList);

      if (isCancelled) {
        return;
      }

      setImagesPreloaded(true);
    }

    effect();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { imagesPreloaded };
}
