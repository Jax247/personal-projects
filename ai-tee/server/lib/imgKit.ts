import ImageKit from "imagekit";

// SDK initialization


 const ImageKitClient = new ImageKit({
    publicKey : "public_cmgNBoROvsgOFvSGnwEfiAIqe0U=",
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint : "https://ik.imagekit.io/jpluto"
});

export const UploadImage = async (data: Buffer | string, name: string) => {

    const res = await ImageKitClient.upload({
      file: data,
      fileName: name,
    });
  
    if (!res) console.error("Error uploading");
  
    console.log('Image Upload Result:', res);
  
    return res;
  
  };

export default ImageKitClient;

