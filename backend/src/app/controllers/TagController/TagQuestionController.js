import * as Yup from "yup";

// MODELS
import Tag from "../../models/TagModel";
import Question from '../../models/QuestionModel'

class TagQuestionController {
  // Lista todos os registros
  async index(req, res) {
    try{
      const tags = await Tag.findAll({
        include: [{
          model: Question,
          as: "questions",
          required: true,
          attributes: ["id", "title", "timer", "difficulty_level"],
          through: {
            attributes: []
          }
        }],
        attributes: ["name"],
        through: {
          attributes: []
        }
      });


      if(!tags.length)
        return res.status(204).json({error: "Não existe nenhuma tag com questões cadastrada."});

      return res.status(200).json(tags);
    }catch(err){
      return res.status(500).json(err);
    }
  }
  // Exibe um único registro
  async show() {}

  // Altera um único registro
  update() {}
  // Remove um único registro
  async delete() {}
}

export default new TagQuestionController();
