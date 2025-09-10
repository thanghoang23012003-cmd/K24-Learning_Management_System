import { FileInterceptor, FilesInterceptor, AnyFilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

interface FileUploadOptions {
  fieldName?: string | string[];   // cho phép string hoặc array
  destination?: string;
  maxSizeMB?: number;
  allowedMimeTypes?: RegExp;
  multiple?: boolean;
  maxCount?: number;
  optional?: boolean;
}

export function FileUploadInterceptor(options: FileUploadOptions) {
  const {
    fieldName,
    destination = './uploads',
    maxSizeMB = 5,
    allowedMimeTypes = /\/(jpg|jpeg|png|mp4|avi|mkv)$/,
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

  // Nếu optional và không có fieldName → nhận tất cả file
  if (optional && !fieldName) {
    return AnyFilesInterceptor();
  }

  // Nếu fieldName là mảng → dùng FileFieldsInterceptor
  if (Array.isArray(fieldName)) {
    const fields = fieldName.map((name) => ({ name, maxCount: multiple ? maxCount : 1 }));
    return FileFieldsInterceptor(fields, {
      storage,
      limits: { fileSize: maxSizeMB * 1024 * 1024 },
      fileFilter,
    });
  }

  // Nếu upload nhiều file cùng tên field
  return multiple
    ? FilesInterceptor(fieldName, maxCount, { storage, limits: { fileSize: maxSizeMB * 1024 * 1024 }, fileFilter })
    : FileInterceptor(fieldName, { storage, limits: { fileSize: maxSizeMB * 1024 * 1024 }, fileFilter });
}
