const validateSignUp = (req,res,next)=>{
    const {fullName,email,password,role} = req.body;
    if(!fullName.trim() || !email.trim() || !password.trim() || !role.trim()){
        return res.json({
            status:400,
            message:"All fields are require"
        });

    }
    if(password.length()<6){
        return res.json({
            status:400,
            message:"password length must be greater than 8"
        });
    }
    next();
}