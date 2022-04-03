// SERVICES
import GetAllClassRanking from '../../services/Ranking/GetAllClassRanking';

class ClassRankingController {
  async index(req, res) {
    try {
      const { classId } = req.body;

      const quizRanking = await GetAllClassRanking.execute({
        classId,
      });

      return res.status(200).json(quizRanking);
    } catch (error) {
      console.log(error);
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new ClassRankingController();
