
// MODELS
import File from "../../models/FileModel";

class FileController {
  async store(req, res) {
    try{
      const { originalname: name, filename: path } = req.file;
      const file = await File.create({ name, path });

      return res.status(200).json(file);
    }catch(err){
      return res.status(500).json(err);
    }
  }
}

export default new FileController();
