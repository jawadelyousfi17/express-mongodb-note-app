const mongoose = require('mongoose')
const schema = mongoose.Schema

const noteSchema = new schema({
    title : {
        type : String
    } , 
    notebody : {
        type : String ,
        required : [true , 'note body is required']
    } ,
    createdAt : {
        type : Date ,
        default : Date.now
    } , 
    updatedAt : {
        type : Date ,
        default : Date.now
    }
})

module.exports = mongoose.model('note' , noteSchema)