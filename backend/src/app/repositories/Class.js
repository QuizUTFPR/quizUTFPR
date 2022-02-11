import Class from '../models/ClassModel';

class ClassRepository {
  async create(data) {
    return Class.create(data);
  }

  async findById(pk) {
    return Class.findByPk(pk);
  }

  async findAll(props) {
    return Class.findAll({ ...props });
  }

  async update(values, where) {
    return Class.update(values, where);
  }
}

export default ClassRepository;
