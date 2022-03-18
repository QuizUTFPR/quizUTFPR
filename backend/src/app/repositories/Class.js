import Class from '../models/ClassModel';

class ClassRepository {
  async create(data) {
    return Class.create(data);
  }

  async findById(pk, otherProps) {
    return Class.findByPk(pk, { ...otherProps });
  }

  async findByPIN(pin, otherProps) {
    return Class.findOne({
      where: {
        pin,
      },
      ...otherProps,
    });
  }

  async findAll(props = {}) {
    return Class.findAll({ ...props });
  }

  async update(values, where) {
    return Class.update(values, where);
  }
}

export default ClassRepository;
