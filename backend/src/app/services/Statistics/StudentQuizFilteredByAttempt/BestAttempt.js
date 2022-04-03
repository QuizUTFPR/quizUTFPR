import { Op } from 'sequelize';

class FilteredByBestAttemptService {
  async execute(data) {
    const { choice, query, orderBy, classCreationDate } = data;
    console.log('CREATED AT', choice);

    const student = await choice.getStudent({
      where: { createdAt: { [Op.gte]: classCreationDate } }, // Verificando a data de criação da Choice (Op.gte: >=)
      ...query,
      ...orderBy,
    });

    console.log('FILTER', student);
    return { ...student.dataValues, studentQuiz: student.studentQuiz[0] };
  }
}

export default new FilteredByBestAttemptService();
