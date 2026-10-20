import { Router } from "express";
import { getAll, get, add, update, remove } from "./subcategory.controler.js";

const subcategoryRouter = Router();

subcategoryRouter.route("/")
  .get(getAll)
  .post(add);

subcategoryRouter.route("/:_id")
  .get(get)
  .put(update)
  .delete(remove);

export default subcategoryRouter;