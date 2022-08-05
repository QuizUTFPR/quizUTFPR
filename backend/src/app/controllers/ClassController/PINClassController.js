// SERVICES
import PINClassService from '../../services/Class/PINClass';

class PINClassCOntroller {
  async index(req, res) {
    try {
      const { pin } = req.params;
      const studentId = req.userId;

      const classInstance = await PINClassService.findByPin({
        pin,
        studentId,
      });

      return res.status(200).json(classInstance);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new PINClassCOntroller();
