const User=require('../schema/user');

module.exports.home=async (req,res)=>{
	const data=await User.find({})
	res.render('home',{data})
}

module.exports.register=async (req,res)=>{
	const user=await new User(req.body);
	const data=[];
	for(let x of req.files){
		data.push([x.path,x.filename])
	}
	user.photo=data;
	await user.save();
	res.redirect('/home')
}

module.exports.edit_get=async (req,res)=>{
	const data=await User.findById(req.params.id)
	res.render('edit',{data})
}

module.exports.edit_post=async (req,res)=>{
	const {username,caption}=req.body;
	await User.findByIdAndUpdate(req.params.id,{username,caption});
	res.redirect('/home')
}

module.exports.delete=async (req,res)=>{
	const {photo}=await User.findById(req.params.id);
	for(let x of photo){
		if(x.includes(`ArtGallery/${req.params.image}`)){
			await User.findByIdAndUpdate(req.params.id,{$pull:{photo:x}})
		}
	}
	res.redirect('/home')
}