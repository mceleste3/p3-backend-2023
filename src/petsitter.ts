import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

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

//READ
router.get("/:id", errorChecked(async (req, res) => {
  const { id } = req.params;
  const petsitter = await prisma.petSitter.findUniqueOrThrow({
    where: { id: Number(id) },
  });
  res.status(200).json(petsitter);
}));

//UPDATE
router.put("/:id", errorChecked(async (req, res) => {
  const { id } = req.params;
  const updatedPetSitter = await prisma.petSitter.update({
    where: { id: Number(id) },
    data: req.body,
  });
  res.status(200).json(updatedPetSitter);
}));

//DELETE
router.delete("/:id", errorChecked(async (req, res) => {
  const { id } = req.params;
  const deletedPetSitter = await prisma.petSitter.delete({
    where: { id: Number(id) },
  });
  res.status(200).json(deletedPetSitter);
}));

export default router;
