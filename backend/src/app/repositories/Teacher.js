import Teacher from '../models/TeacherModel';

class TeacherRepository {
  async create(data) {
    return Teacher.create(data);
  }

  async findOne(props) {
    return Teacher.findOne({ ...props });
  }
}

export default TeacherRepository;
