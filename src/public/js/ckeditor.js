const CodeBlock = fetch("/node/@ckeditor/ckeditor5-code-block/src/codeblock.js")
    var ckeditor;
    try{ckeditor.destroy()}catch{}
     ClassicEditor
     .create( document.querySelector( '#editor' ))
    .then( editor => {
        ckeditor = editor
    } )
    .catch( error => {
        console.error( error );
    } );