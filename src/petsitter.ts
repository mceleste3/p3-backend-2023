import { Router } from "express";
import prisma from './prisma-client.js'

const router = Router();

router.get("/", async(req, res) => {
    try {
        const result = await prisma.petSitter.findMany({});
        res.status(200).json({ petsitters: result, ok: true});
    } catch (e) {
        res.status(500).json({
            type: e.constructor.name,
            message: e.toString(),
        });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const petsitter = await prisma.petSitter.findUnique({
            where: { id: Number(id) },
        });
        if (petsitter === null){
            return res.status(404).json({
                error: `The pet sitter with ID ${id} not found`,
            });
        }
        res.status(200).json(petsitter);
    } catch (e){
        res.status(500).json({
            type: e.constructor.name,
            message: e.toString(),
        });
    }
});



export default router;