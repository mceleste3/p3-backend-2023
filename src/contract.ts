import { Request, Router } from "express";
import { errorChecked } from "./utils.js";
import prisma from "./prisma-client.js";
import { RequestWithPetSitterId } from "./petsitter.js";


const router = Router();

//petSitter/:id/contracts
//READ
router.get("/", errorChecked(async (req: RequestWithPetSitterId, res) => {
    const contracts = await prisma.contract.findMany({
        where: {
            petSitterId: req.petSitterId
        }
    });
    res.status(200).json(contracts);
}));

//CREATE
router.post("/", errorChecked(async (req: RequestWithPetSitterId, res) => {
    const newContract = await prisma.contract.create({
        data: { ...req.body, petSitterId: req.petSitterId },
    });
    res.status(200).json(newContract);
}));


export default router;

