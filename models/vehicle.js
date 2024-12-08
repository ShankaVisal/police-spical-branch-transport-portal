import mongoose from "mongoose";

const vehicleSchema = mongoose.Schema({
    vehicleNumber: { type: String, required: true, unique: true },
    vehicleName: { type: String, default: "" },
    vehicleBrand: { type: String, default: "" },
    vehicleImage: { type: String, default: "" },
    chassyNumber: { type: String, default: "" },
    engineNumber: { type: String, default: "" },
    revenueLicenseNumber: { type: String, default: "" },
    vehicleCategory: { type: String, default: "" },
    manufactureYear: { type: Number, default: 0 },
    policeStation: { type: String, default: "" },
    province: { type: String, default: "" },
    policeOfficer: { type: String, default: "" },
    temporaryLocation: { type: String, default: "" },
    isActive: { type: Boolean, default: true },

    // New fields with default values
    isInPoliceGarage: { type: Boolean, default: false },
    outsideGarageLocation: { type: String, default: "" },
    fundAmount: { type: Number, default: 0 },
})

// Optional logic to ensure validation on save if conditions are met
vehicleSchema.pre("save", function (next) {
    if (!this.isActive) {
        if (!this.isInPoliceGarage) {
            if (!this.outsideGarageLocation || this.fundAmount <= 0) {
                return next(
                    new Error(
                        "Both `outsideGarageLocation` and `fundAmount` must be provided when vehicle is inactive and not in police garage."
                    )
                );
            }
        }
    }
    next();
});

const Vehicle = mongoose.model("vehicles", vehicleSchema);

export default Vehicle;
