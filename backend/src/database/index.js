import Sequelize from 'sequelize';
import DatabaseConfig from '../config/database';

// Models
import Teacher from '../app/models/TeacherModel';
import File from '../app/models/FileModel';
import Question from '../app/models/QuestionModel';
import Answer from '../app/models/AnswerModel';
import Quiz from '../app/models/QuizModel';
import Tag from '../app/models/TagModel';
import Student from '../app/models/StudentModel';
import StudentQuestionChoice from '../app/models/StudentQuestionChoice';
import StudentQuiz from '../app/models/StudentQuiz';
import RefreshToken from '../app/models/RefreshTokenModel';
import FavoriteStudentQuiz from '../app/models/FavoriteStudentQuiz';
import Class from '../app/models/ClassModel';
import Feedback from '../app/models/FeedbackModel';
import Ranking from '../app/models/RankingModel';

// Buffer
const models = [
  Teacher,
  File,
  Quiz,
  Question,
  Answer,
  Tag,
  Student,
  StudentQuestionChoice,
  StudentQuiz,
  RefreshToken,
  FavoriteStudentQuiz,
  Class,
  Feedback,
  Ranking,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Inicializa conexao
    this.connection = new Sequelize(DatabaseConfig);

    // Percorre o vetor e acessa o método inicializador e associações
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
