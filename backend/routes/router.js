import express from 'express';
import {getUser,addUser,updateUser,deleteUser,mail} from '../controllers/controller.user.js';

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
    res.send("API Working");
});

router.get("/getUser",getUser);

router.post("/newUser", addUser);

router.put("/updateUser",updateUser);

router.delete("/deleteUser",deleteUser);

router.post("/mail",mail);

export default router;
