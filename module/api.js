var {addWikiPage,getContents,getWikiPage,init} = require("../database/mongoose")
var Init = require("../Init.json")
var api = "/api/"
module.exports = async(g) => {
    
    init("Home",Init.Home,"About",Init.About)
    g.app.get(api+"", (req, res) => {
        res.send("Api is working")
    })
    g.app.get(api+"content",async (req, res) => {
        res.json(await getContents())
    })
    g.app.get(api+"wiki/:category/:title",async (req, res) => {
        res.json(await getWikiPage({"Category":req.params.category,"Title":req.params.title}))
    })
}