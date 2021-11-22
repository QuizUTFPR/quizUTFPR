import Tag from '../models/TagModel';

class TagRepository {
  async findAll(query) {
    return Tag.findAll(query);
  }

  async findOrCreate(query) {
    return Tag.findOrCreate(query);
  }
}

export default TagRepository;
