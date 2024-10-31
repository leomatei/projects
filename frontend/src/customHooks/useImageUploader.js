import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const useImageUploader = (initialImages = []) => {
  const [imageData, setImageData] = useState(initialImages);

  const onDrop = useCallback((acceptedFiles) => {
    const imagePromises = acceptedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({ image_data: reader.result });
        reader.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then((base64Images) =>
        setImageData((prevData) => [...prevData, ...base64Images])
      )
      .catch((error) => console.error('Error reading image files: ', error));
  }, []);

  const removeImage = (indexToRemove) => {
    setImageData((prevData) =>
      prevData.filter((_, index) => index !== indexToRemove)
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return {
    imageData,
    setImageData,
    removeImage,
    getRootProps,
    getInputProps,
    isDragActive,
  };
};
