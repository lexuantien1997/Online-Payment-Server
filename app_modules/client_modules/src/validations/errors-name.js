const NAME_EMPTY = 'name is required';

const EMAIL_EMPTY = 'email is required';
const EMAIL_INVALID = 'email is invalid';

const PASSWORD_EMPTY = 'password is required';
const PASSWORD_NOT_ENOUGH = 'at least 8 character';
const PASSWORD_NOT_UPPER_CHARACTER = 'must contain upper character';
const PASSWORD_NOT_LOWER_CHARACTER = 'must contain lower character';
const PASSWORD_TOO_STRENGTH = 'not exceed 16 character';

const USERNAME_EMPTY = 'username is required';
const USERNAME_INVALID = 'username incorrect';

const CONFIRM_PASSWORD_INCORRECT = 'confirm password incorrect';
const CONFIRM_PASSWORD_EMPTY = 'confirm password is require';

const PHONE_EMPTY = 'phone is required';
const PHONE_INVALID = 'phone is invalid';
const PHONE_NUMBER_NOTSEND = 'phone number not send';
const PHONE_NOT_VERIFY_YET = "phone number not verify";

const VERIFY_CODE_EMPTY = 'verify code is required';

const USERNAME_EXIST = 'username existed';
const EMAIL_EXIST = 'email existed';
const PHONE_EXIST = 'phone existed';

const TOKEN_ERROR = 'send code error';

const NOT_VERIFY =  'user not verify';

const PASSWORD_NOTCORRECT = 'password not correct';

const EMAIL_PHONE_EXIST = 'email phone existed';

const EMAIL_PHONE_NOT_EXIST = 'email phone not exist';

const UPDATE_INFOR_USER_ERROR = 'update information user error';
const UPDATE_INFOR_USER_PHONE_NOT_EXIST = 'update information user error because phone not exist ';

const NOT_VERIFY_EMAIL = "email not verify";

module.exports = {
    NAME_EMPTY,

    EMAIL_EMPTY,
    EMAIL_INVALID,

    PASSWORD_EMPTY,
    PASSWORD_NOT_ENOUGH,
    PASSWORD_NOT_UPPER_CHARACTER,
    PASSWORD_TOO_STRENGTH,
    PASSWORD_NOT_LOWER_CHARACTER,

    USERNAME_INVALID,
    USERNAME_EMPTY,

    CONFIRM_PASSWORD_INCORRECT,
    CONFIRM_PASSWORD_EMPTY,

    VERIFY_CODE_EMPTY,

    PHONE_INVALID,
    PHONE_EMPTY,
    PHONE_NUMBER_NOTSEND,
    PHONE_NOT_VERIFY_YET,
    
    USERNAME_EXIST,
    EMAIL_EXIST,
    PHONE_EXIST,

    TOKEN_ERROR,

    NOT_VERIFY,
    PASSWORD_NOTCORRECT,

    EMAIL_PHONE_EXIST,
    EMAIL_PHONE_NOT_EXIST,
    
    UPDATE_INFOR_USER_ERROR,
    UPDATE_INFOR_USER_PHONE_NOT_EXIST,

    NOT_VERIFY_EMAIL

};