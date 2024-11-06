const { getUserFromToken ,loadToken,verifyAdminToken,verifyUserToken} = require('./authMiddleware');

exports.ifAdminOrSameUser = (req, res, next) => {
    const next1 =()=>{
        const next2 =()=>{
            if(req.role === 'admin'){
                verifyAdminToken(req, res, next);
            }else if (req.role === 'user'){
                verifyUserToken(req, res, next);
            }else{
                console.log('req.role is not admin or user',req.role);
                return res.status(401).json({ message: 'req.role is not admin or user' });
            }
        }
        getUserFromToken(req, res, next2);
    }
    loadToken(req, res, next1);
};


