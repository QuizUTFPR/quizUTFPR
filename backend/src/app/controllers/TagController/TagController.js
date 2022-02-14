import TagService from '../../services/Tag';

class TagController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const tags = await TagService.execute({
        attributes: ['name'],
      });

      return res.status(200).json(tags);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error.response)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new TagController();
