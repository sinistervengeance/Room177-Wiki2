var g = [];

const {url,database,pass,user} = require('./security.json')
const express = require('express')
g.mongoose = require('mongoose')
g.app = express()
//Website port
g.port = 80 


main().catch(err =>{console.error("Wiki failed to start");console.log(err)})

async function main() {
    console.log("Starting Wiki")
    await g.mongoose.connect(`${url}/${database}`);
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