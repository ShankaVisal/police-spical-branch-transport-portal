import Vehicle from "../models/vehicle.js"

export function createVehicleItem (req, res){

    const user = req.user

    if(user == null){
        res.status(403).json({
            message: "Please Login to create a vehicley item"
        })
        return
    }

    if(user.type != "admin"){
        res.status(403).json({
            message: "You do not have a permission to create a vehicle item"
        })
        return
    }

    const vehicleItem = req.body
    const newVehicleItem = new Vehicle(vehicleItem)

    newVehicleItem.save().then(
        ()=>{
            res.json({
                message : "Vehicle item created successfully"
            })
        }
    ).catch(
        ()=>{
            res.status(500).json({
                message : "Vehicle item creation failed"
            })
        }
    )
}

export function GetVehicleItems (req, res){
    Vehicle.find().then(
        (list)=>{
            res.json({
                list : list
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message: err
            })
        }
    )
}

export function UpdateVehicleItem(req, res){
    const user = req.user

    if(user == null){
        res.status(403).json({
            message: "Please Login to create a vehicley item"
        })
        return
    }

    if(user.type != "admin"){
        res.status(403).json({
            message: "You do not have a permission to create a vehicle item"
        })
        return
    }

    const vehicleNumber = req.params.name;
    Vehicle.updateOne({vehicleNumber:vehicleNumber},req.body).then(
        (result)=>{
            if(result.matchedCount != 0){
                res.json({
                    message: "Category updated successfully",
                    result: result
                })
            }else{
                res.json({
                    message: "Coudn't find this one",
                    result: result
                })
            }

        }
    ).catch(
        (result)=>{
            res.json({
                message: "faild to update Category",
                result:result
            })
        }
    )
}

export function deleteVehicleItem(req,res){
    if(req.user == null){
        res.status(401).json({
            message : "Please Login to create a category"
        })
        return
    }

    if(req.user.type !== "admin"){
        res.json({
            message: "You do not have a permission to create a category"
        })
        return
    }

    const vehicleName = req.params.name

    Vehicle.findOneAndDelete({vehicleNumber:vehicleName}).then(
        (result)=>{

            if(result !== null){
                res.json({
                    message: vehicleName + " " + "vehicle is successfully deleted",
                    result: result
                })
            }

            if(result == null){
                res.json({
                    message: "Couldn't find this vehicle number",
                    result: result
                })
            }


           
        }
    ).catch(
        (err)=>{
            res.json({
                message: vehicleName + " " + "vehicle couldn't deleted " + err,
                error: err
            })
        }
    )

}

export function getVehicleByProvice(req,res){
    const provinceName = req.params.name

    Vehicle.find({province:provinceName}).then(
        (result)=>{

            if(result !== null){
                res.json({
                    message: result
                })
            }else{
                res.json({
                    message: " not found any vehicle  in " + provinceName
                })
            }

        }
    ).catch(
        (err)=>{
            res.json({

                message: "failed to get vehicle details",
                error: err
            })
        }
    )
}

//