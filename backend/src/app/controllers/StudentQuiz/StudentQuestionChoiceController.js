import * as Yup from "yup";


// MODELS
import StudentQuestionChoice from "../../models/StudentQuestionChoice";
import Student from '../../models/StudentModel'

class StudentQuestionChoiceController {
  // Cadastra um único registro
  async store(req, res) {
    try{
      const schema = Yup.object().shape({
        student_id: Yup.number().required(),
        question_id: Yup.number().required(),
        arrayOfChecked: Yup.array(Yup.bool()).required()        
      });

      if(!(await schema.isValid(req.body))){
        return res.status(400).json({error: 'Falha na validação!'});
      }

      const {student_id, question_id, arrayOfChecked} = req.body;
      const checked1 = arrayOfChecked[0];
      const checked2 = arrayOfChecked[1];
      const checked3 = arrayOfChecked[2];
      const checked4 = arrayOfChecked[3];
      const attempt = await StudentQuestionChoice.count({
        where: {student_id: student_id, question_id: question_id}
      });

          
      const studentQuestionChoice = await StudentQuestionChoice.create({
        student_id, 
        question_id, 
        attempt,
        checked1, 
        checked2, 
        checked3, 
        checked4
      })

      return res.status(200).json(studentQuestionChoice);

    }catch(err){
      console.log(err)
      return res.status(500).json(err)
    }
    }
}

export default new StudentQuestionChoiceController();
