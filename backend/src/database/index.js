import Sequelize from "sequelize";
import DatabaseConfig from "../config/database";

//Models
import Teacher from "../app/models/TeacherModel";
import File from "../app/models/FileModel";
import QuestionTrueOrFalse from '../app/models/QuestionTrueOrFalseModel'
import Quiz from '../app/models/QuizModel';
import Tag from '../app/models/TagModel'

//Buffer
const models = [Teacher, File, Quiz, QuestionTrueOrFalse, Tag];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Inicializa conexao
    this.connection = new Sequelize(DatabaseConfig);

    console.log("Iniciando relacionamentos!");
    // Percorre o vetor e acessa o método inicializador e associações
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));

    console.log("Finalizou!")
    }
}

export default new Database();
