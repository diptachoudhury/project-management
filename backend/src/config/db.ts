import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI as string)
       console.log('MongoDB connected')
    }catch(error) {
     console.error("Error occured in utils-db", error); 
     process.exit(1);   
    }
}

export default connectDB;