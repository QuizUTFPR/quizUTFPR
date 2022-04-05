// SERVICES
import GetGlobalRanking from '../../services/Ranking/GetGlobalRanking';

class GlobalRankingController {
  async index(req, res) {
    try {
      const globalRanking = await GetGlobalRanking.execute();

      return res.status(200).json(globalRanking);
    } catch (error) {
      console.log(error);
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new GlobalRankingController();
