export const Authrization =(Roles=[])=>{
  return (req,res,next)=>{
    try {
         if(!Roles.includes(req.user.role)){
       return next(new Error("Forbidden Account"))
     }
    return next();
    } catch (error) {
        return next(error)
    }
  }
} 