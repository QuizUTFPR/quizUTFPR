// import StudentQuiz from '../../models/StudentQuiz';

class FilteredByAttemptService {
  async execute(data) {
    const { choice, query, optionOrderBy } = data;

    console.log('ORDER', optionOrderBy);
    const student = await choice.getStudent({
      ...query,
      ...optionOrderBy,
    });

    console.log('FILTER', student.studentQuiz);
    return { ...student.dataValues, studentQuiz: student.studentQuiz[0] };
  }
}

export default new FilteredByAttemptService();
