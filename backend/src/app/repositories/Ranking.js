import Ranking from '../models/RankingModel';

class RankingRepository {
  async create(data) {
    return Ranking.create(data);
  }

  async findById(pk, otherProps) {
    return Ranking.findByPk(pk, {
      ...otherProps,
    });
  }

  async findOne(whereProps) {
    return Ranking.findOne(whereProps);
  }

  async findAll(props = {}) {
    return Ranking.findAll({
      ...props,
    });
  }

  async update(values, where) {
    return Ranking.update(values, where);
  }
}

export default RankingRepository;
