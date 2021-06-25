import * as Yup from "yup";
import crc32 from 'fast-crc32c';

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
      var pin = crc32.calculate(toString(id), id);

      const quizUpdated = await Quiz.update({
        published,
        pin
      },{ 
      where:{
        id: id
      }})

      if(!quizUpdated)
        return res.status(404).json({error: "Nenhum quiz encontrado."});


      return res.status(200).json();

    }catch(err){
      console.log(err)
      return res.status(500).json(err);
    }
  }
}

export default new PublishQuizController();
