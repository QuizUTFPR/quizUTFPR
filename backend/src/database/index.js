import Sequelize from "sequelize";
import DatabaseConfig from "../config/database";

//Models
import Teacher from '../app/models/TeacherModel'

//Buffer
const models = [Teacher];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Inicializa conexao
    this.connection = new Sequelize(DatabaseConfig);

    // Percorre o vetor e acessa o método inicializador e associações
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
