// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

/**
Nosso primeiro verbo é o GET;
Em req (require) será tudo aquilo que se envia pra rota;
Em res (response) será tudo aquilo que se retorna ao cliente;
**/
router.get('/', (req, res) => {
    return res.status(200).json({ message: 'Hello World! ;-)'});
});

export default router;