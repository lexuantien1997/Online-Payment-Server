// const User = require('../../../../database/app/user');
const errorsName = require('../validations/errors-name');
// const loginService = require('../services/LoginService');
const { updateInformationUser } = require('../services/UpdateUserService');

const api = {
    status: 1, // 1: fail _ 0: success
    errors: {},
    user: {}
};

module.exports = (req,res) => {

    // check validate of data
    // believe everything is still true @@

    let user = req.body;
    console.log(user);

    // Check email

    updateInformationUser(user).then(userUdated => {

        let uid = Object.keys(userUdated)[0];

        let { name, phone, money, gender, memberAt, 
            address, email, birthday, isFirstTime, avatar,
            typeMoney, securityPass } = userUdated[uid];

        api.user = {id: uid, name,phone,money, gender,memberAt,address,
                email,birthday,isFirstTime,avatar,typeMoney,online: true , securityPass}

        api.errors = {};
        api.status = 0;
        return res.status(200).json(api);  

    })



    

    // loginService.checkEmailExist(user.email).then (status => {
        
    //     if (status == null) {
    //         // if (user.phone != userResult.phone) {
    //             api.status = 1;
    //             api.errors.email = errorsName.EMAIL_EXIST;
    //             api.user = {};     
    //             return res.status(200).json(api);
    //         // }
    //     }

    //     // Update user
    //     User.findOneAndUpdate(
    //         {phone: user.phone},
    //         {
    //                 name: user.name,
    //                 email: user.email,
    //                 address: user.address,
    //                 birthday: user.birthday,
    //                 gender: user.gender
    //         },
    //         {
    //             new: true
    //         },
    //         (error, usercollection) => {

    //             if (error) {
    //                 api.user = {};
    //                 api.status = 1;
    //                 api.errors.databse = errorsName.UPDATE_INFOR_USER_ERROR;
    //                 return res.status(200).json(api);   
    //             }

    //             if (usercollection == null){
    //                 api.user = {};
    //                 api.status = 1;
    //                 api.errors.phone = errorsName.UPDATE_INFOR_USER_PHONE_NOT_EXIST;
    //                 return res.status(200).json(api);
    //             }

    //             let { 
    //                 _id, name, phone, money, gender, memberAt,
    //                 email, birthday, isFirstTime, address,avatar
    //             } = usercollection;

    //             api.user = {
    //                 id: _id,
    //                 name: name,
    //                 phone: phone,
    //                 money: money,
    //                 gender: gender,
    //                 memberAt: memberAt,
    //                 address: address,
    //                 email: email,
    //                 birthday: birthday,
    //                 isFirstTime: isFirstTime,
    //                 avatar:avatar
    //             };    

    //             api.errors = {};
    //             api.status = 0;
    //             return res.status(200).json(api);  
    //         }
    //     )
    // });  

}