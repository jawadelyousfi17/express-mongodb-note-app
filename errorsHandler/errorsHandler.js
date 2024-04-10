// errors handler 
// related to mongoose 
// check mongoose errors - email -- password -- and returr
// returns * Object email,password 

const signupErrors = (error) => {
    const errors = { username: '', password: '' }
    console.log(error)
    if(error.password) {
        errors.password = error.password
        return errors 
    }
    if (err = error.errors) {
        if (err.username) {
            errors.username = err.username.message
        }
        if (err.password) {
            errors.password = err.password.message
        }
    }
    if (error.code) {
        if (error.code === 11000) {
            errors.username = 'username must be unique'
        }
    }
    return errors
}

const loginErrHandler = (error) => {
    if (error.message === '100') return { message: 'Please enter Email and password', code: 1 }
    if (error.message === '101') return { message: 'no user found with this email', code: 2 }
    if (error.message === '102') return { message: 'wrong password', code: 3 }
}

function checkPassword(inputString) {
    if (inputString.length < 6) {
      throw  { password : 'password is too short' }
    }
    return 
  }
  

module.exports = { signupErrors, loginErrHandler , checkPassword }