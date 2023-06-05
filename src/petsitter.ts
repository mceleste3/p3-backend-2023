import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import contractsRouter from "./contract.js"
import serviceRouter from "./service.js"

const router = Router();

router.get("/", errorChecked(async (_req, res) => {
    const result = await prisma.petSitter.findMany({});
    res.status(200).json({ petsitters: result, ok: true });
}));

//CREATE
router.post("/", errorChecked(async (req, res) => {
    const newPetSitter = await prisma.petSitter.create({
        data: req.body,
    });
    res.status(200).json({ newPetSitter, ok: true });
}));

export interface RequestWithPetSitterId extends Request{
    petSitterId: number;
}
router.use("/:id", async(req: RequestWithPetSitterId, res, next) => {
    const { id } = req.params;
    req.petSitterId = Number(id);
    next();
}); 

//READ
router.get("/:id", errorChecked(async (req: RequestWithPetSitterId, res) => {
  const petsitter = await prisma.petSitter.findUniqueOrThrow({
    where: { id: req.petSitterId },
  });
  res.status(200).json(petsitter);
}));

//UPDATE
router.put("/:id", errorChecked(async (req: RequestWithPetSitterId, res) => {
  const updatedPetSitter = await prisma.petSitter.update({
    where: { id: req.petSitterId },
    data: req.body,
  });
  res.status(200).json(updatedPetSitter);
}));

//DELETE
router.delete("/:id", errorChecked(async (req: RequestWithPetSitterId, res) => {
  const deletedPetSitter = await prisma.petSitter.delete({
    where: { id: req.petSitterId },
  });
  res.status(200).json(deletedPetSitter);
}));

router.use("/:id/contracts", contractsRouter);
router.use("/:id/service", serviceRouter)

export default router;
