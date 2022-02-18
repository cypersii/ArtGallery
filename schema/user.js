const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	photo:{
		type:[[String]],
		required:true
	},
	caption:{
		type:String,
		required:true,
		min:3
	}
})

const User=mongoose.model('User',userSchema);

module.exports=User;