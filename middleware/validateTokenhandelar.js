const asyncHandlelr = require('express-async-handler')
const jwt = require('jsonwebtoken')


const validattoken = asyncHandlelr (async (req , res , next)=>{
    let token;

    let authHeader = req.headers.authorization ||  req.headers.Authorization
    if(authHeader && authHeader.startsWith('Bearer')){
       
        token = authHeader.split(" ")[1]
        jwt.verify(token , process.env.JWT_SECRET, (err, decoded )=>{
            if(err){
                console.error(err)
                throw new Error('User is not Authorization')
                
            }
             req.user = decoded.user
             
               next();
        })
        if(!token){
            res.status(404)
            throw new Error('User is not Authorization or token is missing')
        }
    }
})
module.exports = validattoken



/*


exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startswith('Beare')
  ) {
    token = req.headers.authorization.split(' ');
  }
  console.log(token);
  if (!token) {
    return next(
      AppError('you are not log in , please log in to get access', 401)
    );
  }
  //verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //3) check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return new AppError(
      'the user beloging to this token dose no longer exist.',
      401
    );
  }
  //4)check if user changed password after the token was issued

  if (currentUser.changedpasswordAfter(decoded.iat)) {
    return new AppError('user recently user password ! please login ', 401);
  }
  req.user = currentUser;
  next();
});












*/



/*
(async (req ,res,next)=>{
    let token;

    let authHeader = req.headers.authorization ||  req.headers.Authorization

    if(authHeader && authHeader.startsWith('Bearar')){
        
        token = authHeader.split(" ")[1]
        jwt.verify(token , process.env.JWT_SECRET, (err, decoded )=>{
            if(err){
                
                throw new Error('User is not Authorization')
                
            }
             console.log(decoded)
             
               next();
        })
        if(!token){
            res.status(404)
            throw new Error('User is not Authorization or token is missing')
        }

    }
})
*/

 //4)check if user changed password after the token was issued
  
//  if (currentUser.changedpasswordAfter(decoded.iat)) {
//     return new AppError('user recently user password ! please login ', 401);
//   }
//   req.user = currentUser;