import * as Yup from "yup";

// MODELS
import Teacher from "../../models/TeacherModel";
import Quiz from "../../models/QuizModel";
import Tag from "../../models/TagModel";
import File from '../../models/FileModel';

class PublishQuizController {
  // Lista todos os registros
  async store(req, res) {
    try{
      const {id, published} = req.body;

      const quizUpdated = await Quiz.update({
        published
      },{ 
      where:{
        id: id
      }})

      if(!quizUpdated)
      return res.status(204).json({error: "Nenhum quiz encontrado."});


      return res.status(200).json(quizUpdated);

    }catch(err){
      return res.status(500).json(err);
    }
  }
}

export default new PublishQuizController();
