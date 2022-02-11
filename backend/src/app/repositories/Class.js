import Class from '../models/ClassModel';

class ClassRepository {
  async create(data) {
    console.log('repos', data);
    return Class.create(data);
  }

  async findById(pk) {
    return Class.findByPk(pk);
  }

  async findAll(otherProps) {
    return Class.findAll({ ...otherProps });
  }

  async delete(where) {
    return Class.destroy(where);
  }

  async update(values, where) {
    console.log(values, where);
    return Class.update(values, where);
  }
}

export default ClassRepository;
