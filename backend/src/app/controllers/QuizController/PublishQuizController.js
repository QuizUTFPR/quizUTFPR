import * as Yup from "yup";
import crc32 from 'fast-crc32c';

// MODELS
import Teacher from "../../models/TeacherModel";
import Quiz from "../../models/QuizModel";
import Tag from "../../models/TagModel";
import File from '../../models/FileModel';

import getMethod from '../../utils/getMethodsOfAssociation';

class PublishQuizController {
  // Lista todos os registros
  async update(req, res) {
    try{
      const {id, published} = req.body;
      var pin = crc32.calculate(toString(id), id);
      const quiz = await Quiz.findByPk(id);

      if(!quiz)
        return res.status(404).json({error: "Nenhum quiz encontrado."});
        
      const countQuestion = await quiz.countQuestions();
      if(countQuestion < 1)
        return res.status(404).json({error: "Nenhuma questão cadastrada no quiz."})


      quiz.published = true;
      quiz.pin = pin;
      quiz.save();
      
      return res.status(200).json();

    }catch(err){
      console.log(err)
      return res.status(500).json(err);
    }
  }
}

export default new PublishQuizController();
