const { getUserFromToken ,loadToken,verifyAdminToken,verifyUserToken} = require('./authMiddleware');

exports.ifAdminOrSameUser = (req, res, next) => {
    const next1 =()=>{
        const next2 =()=>{
            if(req.role === 'admin'){
                verifyAdminToken(req, res, next);
            }else if (req.role === 'user'){
                console.log('req.role is user',req.role);
                verifyUserToken(req, res, next);
            }else{
                console.log('req.role is not admin or user',req.role);
                return res.status(401).json({ message: 'req.role is not admin or user' });
            }
        }
        console.log('getting user from token');
        getUserFromToken(req, res, next2);
    }
    console.log('loading token');
    loadToken(req, res, next1);
};


