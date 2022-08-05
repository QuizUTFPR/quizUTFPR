import File from '../models/FileModel';

class FileRepository {
  async findByPk(pk, props) {
    return File.findByPk(pk, { ...props });
  }
}

export default FileRepository;
