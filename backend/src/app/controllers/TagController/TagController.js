// MODELS
import Tag from '../../models/TagModel';

class TagController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const tags = await Tag.findAll({
        attributes: ['name'],
      });

      if (!tags.length)
        return res
          .status(404)
          .json({ error: 'Não existe nenhuma tag cadastrada.' });

      return res.status(200).json(tags);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new TagController();
