import ClassRepository from '../../repositories/Class';

class GetAllClasses {
  constructor() {
    this.classRepository = new ClassRepository();
  }

  async execute(where) {
    const classInstance = await this.classRepository.findAll(where);

    return classInstance;
  }
}

export default new GetAllClasses();
