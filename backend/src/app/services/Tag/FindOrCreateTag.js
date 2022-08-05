import TagRepository from '../../repositories/Tag';

class FindOrCreateTagService {
  constructor() {
    this.tagRepository = new TagRepository();
  }

  async execute(query) {
    await this.tagRepository.findOrCreate(query);
  }
}

export default new FindOrCreateTagService();
