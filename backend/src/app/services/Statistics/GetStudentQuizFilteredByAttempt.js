// import StudentQuiz from '../../models/StudentQuiz';

class FilteredByAttemptService {
  async execute(data) {
    const { choice, query, optionOrderBy } = data;

    const student = await choice.getStudent({
      ...query,
      ...optionOrderBy,
    });

    return { ...student.dataValues, studentQuiz: student.studentQuiz[0] };
  }
}

export default new FilteredByAttemptService();
