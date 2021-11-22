import TagService from '../../services/Tag';

class TagController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const tagService = new TagService();
      const tags = await tagService.execute({
        attributes: ['name'],
      });

      return res.status(200).json(tags);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new TagController();
