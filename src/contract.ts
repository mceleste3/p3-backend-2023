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

export interface RequestWithContractId extends Request{
    contractId: number;
}
router.use("/:id", async(req: RequestWithContractId, res, next) => {
    const { id } = req.params;
    req.contractId = Number(id);
    next();
});

//READ ONE
router.get("/:id", errorChecked(async (req: RequestWithContractId, res) => {
    const contract = await prisma.contract.findUniqueOrThrow({
      where: { id: req.contractId },
    });
    res.status(200).json(contract);
 }));
 
//DELETE
router.delete("/:id", errorChecked(async (req: RequestWithContractId, res) => {
    const deletedContract = await prisma.contract.delete({
      where: { id: req.contractId },
    });
    res.status(200).json(deletedContract);
}));

//UPDATE
router.put("/:id", errorChecked(async (req: RequestWithContractId, res) => {
    const updatedContract = await prisma.contract.update({
      where: { id: req.contractId },
      data: req.body,
    });
    res.status(200).json(updatedContract);
}));


export default router;

