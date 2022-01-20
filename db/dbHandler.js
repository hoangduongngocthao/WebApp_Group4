const mongoose = require('mongoose');

try 
{
    const client = mongoose.connect('mongodb+srv://group4:123@123a@cluster0.zb7jr.mongodb.net/Project0', {
        useNewUrlParser: true,  
        // useFindAndModify: true
    })
    console.log("connected")
} catch (e) {
    console.log(e)
}


// async function insertObject(collectionName,objectToInsert){
//     const dbo = await getDB();
//     const newObject = await dbo.collection(collectionName).insertOne(objectToInsert);
//     console.log("Gia tri id moi duoc insert la: ", newObject.insertedId.toHexString());
// }

module.exports = mongoose;