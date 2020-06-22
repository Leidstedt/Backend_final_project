import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import participants from './data/participants.json'
import Person from './model/modelParticipant.js'


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-backend-finalproject"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise



if (process.env.RESET_DATABASE) {
  console.log('Resetting database')

  const seedDatabase = async () => {
      await Person.deleteMany()
      await participants.forEach((person) => new Person(person).save())
  }
  seedDatabase()
}

// PORT
const port = process.env.PORT || 8080
const app = express()


// MIDDLEWARES
app.use(cors())
app.use(bodyParser.json())


// DISCONNECTED DATABASE
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    res.status(503).json({ error: 'Service unavailable' })
  }
})


// ROUTES
app.get('/', (req, res) => {
  res.send(`
  <h1>Database</h1>
  `)
})



// List of all participants
app.get('/participants', async (req, res) => {
  const item = await Person.find();

  if ( item.length > 0  ) {
    res.json(item)
  } else {
    res.status(404).json({ message: `Error` })
  }
});
// Route for subprojct
app.get('/participants/subproject/:subproject', async ( req, res ) => {
  const { subproject } = req.params
  const participantsByCategory = await Person.find({ subproject: subproject })

  if (participantsBySubproject) {
    res.json(participantsBySubproject)
  } else {
    res.status(404).json({ message: `Error.` })
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
