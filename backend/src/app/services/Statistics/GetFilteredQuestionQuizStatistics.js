import * as Yup from 'yup';
import { Op } from 'sequelize';
import GetAllMethods from '../../utils/getMethodsOfAssociation';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';
import ClassRepository from '../../repositories/Class';

class GetFilteredQuestionQuizStatisticsService {
  constructor() {
    this.quizRepository = new QuizRepository();
    this.classRepository = new ClassRepository();
  }
}

export default new GetFilteredQuestionQuizStatisticsService();
