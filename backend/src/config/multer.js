import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    // local de armazenamento da imagem
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // nome como hash da imagem usando crypto (lib nativa)
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
