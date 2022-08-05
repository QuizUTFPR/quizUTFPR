import File from '../models/FileModel';

export default async (req, res, next) => {
  if (req.file) {
    const { originalname: name, filename: path } = req.file;
    const image = await File.create({
      name,
      path,
    });

    req.idImage = image.id;
  }

  return next();
};
