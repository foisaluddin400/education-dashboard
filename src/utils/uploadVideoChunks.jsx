import axios from "axios";

export const uploadVideoChunks = async (file, onProgress) => {
  const chunkSize = 5 * 1024 * 1024; // 5 MB per chunk
  const totalChunks = Math.ceil(file.size / chunkSize);
  let uploadedBytes = 0; // Track the uploaded bytes across chunks

  for (let index = 0; index < totalChunks; index++) {
    const start = index * chunkSize;
    const end = Math.min(file.size, start + chunkSize);
    const chunk = file.slice(start, end);

    const formData = new FormData();
    formData.append("chunk", chunk);
    formData.append("originalname", file.name);
    formData.append("chunkIndex", index.toString()); // Convert to string
    formData.append("totalChunks", totalChunks.toString()); // Convert to string

    try {
      const response = await axios.post(
        `http://143.110.241.146:9050/upload-video`,
        // `http://192.168.10.11:9000/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // onUploadProgress: (progressEvent) => {
          //   if (progressEvent.total) {
          //     // Update the total uploaded bytes
          //     uploadedBytes += progressEvent.loaded;

          //     // Calculate the overall progress percentage
          //     const totalProgress = Math.round(
          //       (uploadedBytes / file.size) * 100
          //     );
          //     onProgress(totalProgress); // Update the progress state
          //   }
          // },
        }
      );

      // Update the total uploaded bytes after each chunk completes
      uploadedBytes += chunk.size;

      // Calculate the overall progress percentage
      const totalProgress = Math.min(
        100,
        Math.round((uploadedBytes / file.size) * 100)
      );
      onProgress(totalProgress); // Update the progress state

      // If this is the last chunk, return the video URL
      if (
        index === totalChunks - 1 &&
        response.data &&
        response.data.videoUrl
      ) {
        return response.data.videoUrl;
      }
    } catch (error) {
      console.error("Error uploading chunk:", error);
      throw error;
    }
  }
};
