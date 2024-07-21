import multer from 'multer';
import DataParser from 'datauri/parser.js';
import path from 'path';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const parser = new DataParser();

export const formatImage = (file: any): string | null | undefined => {
  const fileExtension = path.extname(file.originalname).toString();
  const result = parser.format(fileExtension, file.buffer);
  return result ? result.content : null;
};

export default upload;
