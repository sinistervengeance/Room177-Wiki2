var g = [];
const bodyParser = require('body-parser')
const {url,database,pass,user} = require('./security.json')
const express = require('express')

mongoose = require('mongoose')
g.app = express()
//Website port
g.port = 80 

g.app.use(bodyParser.json()) 
g.app.use(bodyParser.urlencoded({ extended: true }))


main().catch(err =>{console.error("Wiki failed to start");console.log(err)})

async function main() {
    console.log("Starting Wiki")
    try{
    await mongoose.connect(`${url}/${database}`);
    console.log("DB Connected")
    }catch(err){
        console.error("Failed to connet to DB")
        console.error(err)
        return
    }
    var ar = ['api','express']
    ar.forEach(e=> {
        try{
        require(`./module/${e}`)(g);
    }catch(err){
        console.error(`Failed to Start: `,e,err)
    }finally{
        console.log("Successfully Started: ",e)
    }
    })
    console.log("Wiki Started")
}