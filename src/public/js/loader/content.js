async function content(){
    vieweditor.setData("")
    $('#test').hide();
    try{
        document.getElementById("Content").innerHTML = (`<div class="d-flex justify-content-center"><div class="spinner-border" role="status" style="width: 6rem; height: 6rem;"><span class="sr-only"></span></div></div>`)
        var content = await fetch(`/api/content`).then(response => response.json())
        console.log(content)
        var P =""
        console.log(content)
        content.forEach(element => {
        var S =""
        element.Titles.forEach(e => {
            S = S + `<li><a href="#" onClick="load('${element.Category}','${e}',true)">${e}</a></li>\n`
        })
        P = P + `<h3>${element.Category}</h3>\n<ul>${S}</ul>`
        });
        document.getElementById("Content").innerHTML = P
    }catch(err){
        console.log(err)
        document.getElementById("Content").innerHTML = "An error has occure (show better error screen)"
    }
}