/* Import Mongoose and schema(data structure) */
const   mongoose              = require('mongoose'),
        WikiPage              = require('./schema/wikipage');


/*
*Error Codes*

0 good
1 error
2 empty input
3 invalid entry
4 already exist
5 empty data output
*/
module.exports = {
    //function to add wiki page
    init: async function(title,content,title2,content2){
        await WikiPage.findOne({Category : "Home"}).exec((err,icdata) =>{
            if(!icdata){
                var cate = new WikiPage({
                    name: "Home"
                })
                cate.Wikis.push({
                    DateCreated: Date.now(),
                    CreatedBy: "",
                    Title: title,
                    Content: content,
                    IsDeleted: false
                })
                cate.Wikis.push({
                    DateCreated: Date.now(),
                    CreatedBy: "",
                    Title: title2,
                    Content: content2,
                    IsDeleted: false
                })
            cate.save()
            }
        })
    },
    addWikiPage: async function(data){
        //checks to see if data is empty
        var val = 0
        if(!data.category){val ++}
        if(!data.title){val++}
        if(!data.author){val++}
        if(!data.content || data.content == `<h1>${data.title}</h1><p>&nbsp;</p>`){val++}
        if(val > 0)return "2"
        //checks to see if data exist
        const icdata = await WikiPage.findOne({name : data.category})
        // if data dosen't exist make new category
        console.log(icdata)
        if(!icdata){
            var cate = new WikiPage({
                name: data.category
            })
            cate.Wikis.push({
                DateCreated: Date.now(),
                CreatedBy: data.author,
                Title: data.title,
                Content: data.content,
                IsDeleted: false
            })
            console.log(cate)
            await cate.save()
            return "0"
        // if category exist update array
        }else if(!icdata.Wikis.find(e => e.Title == data.title)){
            icdata.Wikis.push({
                DateCreated: Date.now(),
                CreatedBy: data.author,
                Title: data.title,
                Content: data.content,
                IsDeleted: false
            })
            await icdata.save()
            return "0"
        }else{
            //if duplicate
            return "4"
        }
    },
    //gets category and titles and then pushes into an array
    getContents: async function(){
        var icdata = await WikiPage.find({})
        var TOC =[]
        icdata.forEach(e => {
            var con = []
            e.Wikis.forEach(wiki =>{
                con.push(wiki.Title)
            })
            TOC.push({"Category":e.name,"Titles":con})
        })
        return TOC
    },
    //request wiki page
    getWikiPage: async function(data){
       var ws = await WikiPage.findOne({name : data.Category}).exec()
       if(!ws)return
       return await ws.Wikis.find(element => element.Title == data.Title)
    }
}