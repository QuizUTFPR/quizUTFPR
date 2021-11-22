import TagRepository from '../../repositories/Tag';

class TagService {
  constructor() {
    this.tagRepository = new TagRepository();
  }

  async execute(query) {
    const tags = await this.tagRepository.findAll(query);

    if (!tags.length) {
      const error = new Error('Não foi encontrada nenhuma tag.');
      error.status = 404;
      throw error;
    }

    return tags;
  }
}

export default TagService;
