vieweditor.setData("")
//ckeditor builder
try{var ckeditor;}catch{}
try{ckeditor.destroy()}catch{}
ClassicEditor
.create( document.querySelector( '#editor' ),{
	removePlugins:["Markdown"],
	toolbar: {
	items: [
		'heading',
		'findAndReplace',
		'|',
		'undo',
		'redo',
		'|',
		'fontColor',
		'fontSize',
		'fontFamily',
		'fontBackgroundColor',
		'bold',
		'italic',
		'underline',
		'strikethrough',
		'link',
		'removeFormat',
		'|',
		'outdent',
		'indent',
		'alignment',
		'|',
		'imageUpload',
		'blockQuote',
		'insertTable',
		'mediaEmbed',
		'-',
		'bulletedList',
		'numberedList',
		'codeBlock',
		'code',
		'specialCharacters',
		'superscript',
		'subscript'
	],
	shouldNotGroupWhenFull: true
},
language: 'en',
image: {
	toolbar: [
		'imageTextAlternative',
		'imageStyle:inline',
		'imageStyle:block',
		'imageStyle:side',
		'linkImage'
	]
},
table: {
	contentToolbar: [
		'tableColumn',
		'tableRow',
		'mergeTableCells',
		'tableCellProperties',
		'tableProperties'
	]
}} )
.then( editor => {
	ckeditor = editor
} )
.catch( error => {
	console.error( error );
} );

//category slector
async function selector(){
	$('#test').hide();
	try{
		var content = await fetch(`/api/content`).then(response => response.json())
		content.Data.forEach(element => {
			document.getElementById("category").innerHTML = document.getElementById("category").innerHTML + `<option>${element.category}</option>`
		});
	}catch(err){
		console.log(err)
	}
}
selector()