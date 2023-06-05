import { Request, Router } from "express";
import { errorChecked } from "./utils.js";
import prisma from "./prisma-client.js";
import { RequestWithPetSitterId } from "./petsitter.js";


const router = Router();

//petSitter/:id/service

//READ
router.get("/", errorChecked(async (req: RequestWithPetSitterId, res) => {
    const services = await prisma.service.findMany({
        where: {
            petSitterId: req.petSitterId
        }
    });
    res.status(200).json(services);
}));

//CREATE
router.post("/", errorChecked(async (req: RequestWithPetSitterId, res) => {
    const newService = await prisma.service.create({
        data: { ...req.body, petSitterId: req.petSitterId },
    });
    res.status(200).json(newService);
}));

export interface RequestWithServiceId extends Request{
    serviceId: number;
}
router.use("/:id", async(req: RequestWithServiceId, res, next) => {
    const { id } = req.params;
    req.serviceId = Number(id);
    next();
}); 

//DELETE
router.delete("/:id", errorChecked(async (req: RequestWithServiceId, res) => {
    const deletedService = await prisma.service.delete({
      where: { id: req.serviceId },
    });
    res.status(200).json(deletedService);
}));

//UPDATE
router.put("/:id", errorChecked(async (req: RequestWithServiceId, res) => {
    const updatedService = await prisma.service.update({
      where: { id: req.serviceId },
      data: req.body,
    });
    res.status(200).json(updatedService);
}));

export default router;