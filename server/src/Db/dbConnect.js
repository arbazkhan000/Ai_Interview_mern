import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error, "Databse is disconnected");
        process.exit(1);
    }
};

export default dbConnect;
