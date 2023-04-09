
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db/connect')
const task = require('./routes/task')
const history =  require('./routes/history')
const member = require('./routes/member')
const authRoute = require('./routes/authRoute')
const verifyUserToken = require('./middlewares/authJWT')
//Define
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 5000
var bodyParser = require('body-parser');

// Configs
dotenv.config()

//Middlewares
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Routes
app.use('/auth', authRoute)
app.use('/task', task)
app.use('/member', member)
app.use('/history',verifyUserToken, history)
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.json({
    'status':'success',
    'port':PORT
  })
})

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT , () => console.log(`server is running on port ${PORT}`))
    } catch (error) {
        console.log(error);
		process.exit(1);
    }
}

start()