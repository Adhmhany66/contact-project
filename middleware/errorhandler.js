const constants = require('./constants')


const errorHandlelr = (err, req, res, next)=>{
 const statusCode= err.statusCode ? err.statusCode :500;
 switch(statusCode){
    case constants.VALIDATION:
      res.json({title:"Validation Failed" ,
       message : err.message,
       stackTrace : err.stack
      })
      break;
      case constants.UNAUTHORIZED:
      res.json({title:"Unauthorized Failed" ,
       message : err.message,
       stackTrace : err.stack
      })
      break;
      case constants.FORBIDDENT:
         res.json({title:"Forbiddent Failed" ,
          message : err.message,
          stackTrace : err.stack
         })
         break;
         case constants.NOT_FOUND:
            res.json({title:"Not Found" ,
             message : err.message,
             stackTrace : err.stack
            })
            break;
            case constants.SERVER_ERROR:
               res.json({
                  title:"Server Error" ,
                message : err.message,
                stackTrace : err.stack
               })
               break;
               default: console.log("No Error All Good")
 }
}

module.exports = errorHandlelr;