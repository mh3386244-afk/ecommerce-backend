// src/Modules/Category/category.routes.js
import { Router } from "express";
import { MulterWithCloudinary } from "../../Servies/multercloudnary.js";
import { getAll, get, add, update, remove } from "./category.controler.js";

const upload = MulterWithCloudinary();
const categoryRouter = Router();

categoryRouter.route("/")
  .get(getAll)
  .post(upload.single("image"), add);

categoryRouter.route("/:_id")
  .get(get)
  .put(upload.single("image"), update)
  .delete(remove);

export default categoryRouter;