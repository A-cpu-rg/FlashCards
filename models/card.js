const {Schema,model} = require("mongoose")
const cardSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  },
  coverImageURL:{
    type:String
  },
  createdBy:{
    type:Schema.Types.ObjectId,
    ref:"user"
  }
},{timestamps:true})

const Card = model('card',cardSchema)

module.exports = Card