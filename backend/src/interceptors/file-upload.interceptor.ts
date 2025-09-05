import { FileInterceptor, FilesInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

interface FileUploadOptions {
  fieldName?: string;           // tên field, optional nếu AnyFilesInterceptor
  destination?: string;
  maxSizeMB?: number;
  allowedMimeTypes?: RegExp;
  multiple?: boolean;
  maxCount?: number;
  optional?: boolean;           // nếu true, file không bắt buộc
}

export function FileUploadInterceptor(options: FileUploadOptions) {
  const {
    fieldName,
    destination = './uploads',
    maxSizeMB = 5,
    allowedMimeTypes = /\/(jpg|jpeg|png)$/,
    multiple = false,
    maxCount = 10,
    optional = true,
  } = options;

  const storage = diskStorage({
    destination,
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  });

  const fileFilter = (req, file, callback) => {
    if (!file.mimetype.match(allowedMimeTypes)) {
      return callback(new Error('File type not allowed!'), false);
    }
    callback(null, true);
  };

  if (optional && !fieldName) {
    // nếu file optional, không xác định fieldName → parse tất cả file
    return AnyFilesInterceptor();
  }

  return multiple
    ? FilesInterceptor(fieldName, maxCount, { storage, limits: { fileSize: maxSizeMB * 1024 * 1024 }, fileFilter })
    : FileInterceptor(fieldName, { storage, limits: { fileSize: maxSizeMB * 1024 * 1024 }, fileFilter });
}
