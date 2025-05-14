export const uploadToCloudinary = async (pics: any) => {
  const cloud_name = "dwzgiynnk";
  const upload_preset = "ecommerce";

  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const fileData = await res.json();
    return fileData.secure_url;
  } else {
    console.log("Error: Pics not found");
  }
};
