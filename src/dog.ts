import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

router.get("/", errorChecked(async (_req, res) => {
    const result = await prisma.dog.findMany({});
    res.status(200).json({ dogs: result, ok: true });
}));

//CREATE
router.post("/", errorChecked(async (req, res) => {
    const newDog = await prisma.dog.create({
        data: req.body,
    });
    res.status(200).json({ newDog, ok: true });
}));

export interface RequestWithDogId extends Request{
    dogId: number;
}
router.use("/:id", async(req: RequestWithDogId, res, next) => {
    const { id } = req.params;
    req.dogId = Number(id);
    next();
}); 

//READ
router.get("/:id", errorChecked(async (req: RequestWithDogId, res) => {
  const dog = await prisma.dog.findUniqueOrThrow({
    where: { id: req.dogId },
  });
  res.status(200).json(dog);
}));

//UPDATE
router.put("/:id", errorChecked(async (req: RequestWithDogId, res) => {
  const updatedDog = await prisma.dog.update({
    where: { id: req.dogId },
    data: req.body,
  });
  res.status(200).json(updatedDog);
}));

//DELETE
router.delete("/:id", errorChecked(async (req: RequestWithDogId, res) => {
  const deletedDog = await prisma.dog.delete({
    where: { id: req.dogId },
  });
  res.status(200).json(deletedDog);
}));


export default router;