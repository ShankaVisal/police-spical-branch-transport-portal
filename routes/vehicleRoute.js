import express from "express";
import { createVehicleItem, deleteVehicleItem, getVehicleByProvice, GetVehicleItems, UpdateVehicleItem } from "../controllers/vehicleController.js";

const vehicleRouter = express.Router()

vehicleRouter.post('/',createVehicleItem)

vehicleRouter.get('/',GetVehicleItems)

vehicleRouter.put('/:name',UpdateVehicleItem)

vehicleRouter.delete('/:name',deleteVehicleItem)

vehicleRouter.get('/:name',getVehicleByProvice)

export default vehicleRouter;