import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const con =await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected  : ${con.connection.host}`);
    }catch(err){
         console.error(`Error : ${err.messsage}`);
         process.exit(1);
    }
}

export default connectDB;