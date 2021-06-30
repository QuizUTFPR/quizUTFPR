// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import QuizController from "../../app/controllers/QuizController/QuizController";
import QuizTeacherController from '../../app/controllers/QuizController/QuizTeacherController'
import PublishQuizController from "../../app/controllers/QuizController/PublishQuizController"
import PINQuizController from '../../app/controllers/QuizController/PINQuizController'

router.get("/", QuizTeacherController.index);
router.post("/create", QuizController.store);
router.put("/update", QuizController.update);
router.delete("/delete", QuizController.delete);
router.get("/:tag", QuizController.show);
router.post('/publish', PublishQuizController.update);
router.post("/getByPIN", PINQuizController.index);
export default router;
