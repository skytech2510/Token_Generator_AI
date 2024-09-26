import backendServiceInstance from "Services/backendServices";

const fileToUint8Array = async (file: File) => {
  const reader = new FileReader();
  return new Promise<Uint8Array>((resolve, reject) => {
    reader.onloadend = () => {
      if (reader.error) {
        reject(reader.error);
      } else {
        resolve(new Uint8Array(reader.result as ArrayBuffer));
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

export const upload_img = async (file: File) => {
  let uint8Array: Uint8Array = await fileToUint8Array(file);
  console.log("upload_img - uint8Array", uint8Array);
  let img_url = await backendServiceInstance.uploadLogo({
    fileBlob: uint8Array,
    fileName: file.name,
    fileType: file.type,
  });
  return img_url;
};
