export const useFileReader = () => {
  const readFile = (file: File): Promise<string | null> => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };

      reader.onerror = () => {
        resolve(null);
      };
    });
  };

  return { readFile };
};
