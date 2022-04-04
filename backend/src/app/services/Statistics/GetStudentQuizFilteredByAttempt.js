class FilteredByAttemptService {
  async execute(data) {
    const { choice, query, orderBy } = data;
    console.log('CREATED AT', choice);

    const student = await choice.getStudent({
      ...query,
      ...orderBy,
    });

    console.log('FILTER', student);
    return { ...student.dataValues, studentQuiz: student.studentQuiz[0] };
  }
}

export default new FilteredByAttemptService();
