async function load(path1,path2){
    $('#test').hide();
    try{
    document.getElementById("Content").innerHTML = (`<div class="d-flex justify-content-center"><div class="spinner-border" role="status" style="width: 6rem; height: 6rem;"><span class="sr-only"></span></div></div>`)
    var data = await fetch(`/api/sql/${path1}/${path2}`).then(response => response.json())
    vieweditor.setData( data.Data[0].content );
    }catch(err){
        console.log(err)
        vieweditor.setData("An error has occure (show better error screen)")
    }finally{
        $('#test').show();
        document.getElementById("Content").innerHTML = ""
    }
}
