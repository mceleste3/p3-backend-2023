import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

router.get("/", errorChecked(async (_req, res) => {
    const result = await prisma.owner.findMany({});
    res.status(200).json({ owners: result, ok: true });
}));

//CREATE
router.post("/", errorChecked(async (req, res) => {
    const newOwner = await prisma.owner.create({
        data: req.body,
    });
    res.status(200).json({ newOwner, ok: true });
}));

export interface RequestWithOwnerId extends Request{
    ownerId: number;
}
router.use("/:id", async(req: RequestWithOwnerId, res, next) => {
    const { id } = req.params;
    req.ownerId = Number(id);
    next();
}); 

//READ
router.get("/:id", errorChecked(async (req: RequestWithOwnerId, res) => {
  const owner = await prisma.owner.findUniqueOrThrow({
    where: { id: req.ownerId },
  });
  res.status(200).json(owner);
}));

//UPDATE
router.put("/:id", errorChecked(async (req: RequestWithOwnerId, res) => {
  const updatedOwner = await prisma.owner.update({
    where: { id: req.ownerId },
    data: req.body,
  });
  res.status(200).json(updatedOwner);
}));

//DELETE
router.delete("/:id", errorChecked(async (req: RequestWithOwnerId, res) => {
  const deletedOwner = await prisma.owner.delete({
    where: { id: req.ownerId },
  });
  res.status(200).json(deletedOwner);
}));


export default router;