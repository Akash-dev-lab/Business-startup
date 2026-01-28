import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log("DB is Connected.")
            })
    } catch (error) {
        console.log("Error while connecting DB...", error)
    }
};

export default connectDB;