const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://group4:123@123a@cluster0.zb7jr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true },
);

async function insertObject(collectionName,objectToInsert){
    const dbo = await getDB();
    const newObject = await dbo.collection(collectionName).insertOne(objectToInsert);
    console.log("Gia tri id moi duoc insert la: ", newObject.insertedId.toHexString());
}

module.exports = {insertObject}