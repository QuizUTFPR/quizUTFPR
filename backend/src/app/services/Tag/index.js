import TagRepository from '../../repositories/Tag';

class TagService {
  constructor() {
    this.tagRepository = new TagRepository();
  }

  async execute(query) {
    const tags = await this.tagRepository.findAll(query);

    if (!tags.length) {
      const error = new Error();
      error.status = 404;
      error.response = 'Não foi encontrada nenhuma tag.';
      throw error;
    }

    return tags;
  }
}

export default new TagService();
