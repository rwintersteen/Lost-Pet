const serverless = require("serverless-http");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const connection = mongoose.connect("mongodb://localhost:27017/test");

const lostPetSchema = new Schema({ author: String, body: String });
const PetModel = mongoose.model("lostpetschema", lostPetSchema);

exports.handler = async event => {
    await connection;

    const newPet = await PetModel.create(JSON.parse(event.body));
    console.log("Saved to db: ", newPet);
    return {
        statusCode: 201,
        body: JSON.stringify(newPet),
    };
};