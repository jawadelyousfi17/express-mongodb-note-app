const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')


const conectDb = require('./db/conectdb')
const userRoutes = require('./routes/userRoutes')
const notesRoutes = require('./routes/notesRoute')
const pulicRoutes = require('./routes/publicRoutes')
const {userCheck , requireAuth } = require('./middlware/authCheck')
const User = require('./models/user')


const PORT = 5000

const app = express()


conectDb(() => app.listen(PORT ,
    console.log(`server is running on port ${PORT} ...`)))

    app.set('view engine', 'ejs')
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(express.json())
    app.use(cookieParser())
    app.use(express.urlencoded({ extended: false }))



app.use('*' , userCheck )
app.use('/u',requireAuth , pulicRoutes)
app.use(userRoutes)
app.use('/notes' ,requireAuth, notesRoutes)
app.get('/' , (req ,res ) => {
    res.redirect('/notes')
} )
app.get('/local' ,(req ,res ) => {
    res.render('local')
} )
app.use((req ,res ) => {
    res.render('404')
} )



      

