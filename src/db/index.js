const mongoose = require('mongoose')


 async function connect(){
    try {
        await mongoose.connect('mongodb+srv://waynex22:3}ViJ,;twkB>H+-@xtrabook.lbhenmy.mongodb.net/extraBook?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('connect successlly')
    }catch(error){
        console.log('false' , error)
    }
}

module.exports = {connect}