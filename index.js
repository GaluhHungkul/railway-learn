require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3009
const prisma = require("./lib/prisma")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.get("/", async (req,res) => {
    const user = await prisma.user.findMany()
    res.json(user)
})

app.post("/user",  async (req,res) => {
    console.log(req.body)
    const { name, email } = req.body
    const newUser = await prisma.user.create({
        data : { name, email }
    })
    res.json(newUser)
})

app.listen(PORT, () => {
    console.log(`Listen to http://localhost:${PORT}`)
})