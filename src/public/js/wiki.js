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
		content.forEach(element => {
			document.getElementById("category").innerHTML = document.getElementById("category").innerHTML + `<option>${element.Category}</option>`
		});
	}catch(err){
		console.log(err)
	}
}

async function sendDataToDB(){
	var dataToSend = ckeditor.getData()

	var dataTitle = dataToSend.split("</h1>")[0]
	dataTitle = dataTitle.replace("<h1>","")
	author = document.getElementById("author").value
	category = document.getElementById("categorytext").value
	dataToSendJSON = {
		"title":dataTitle,
		"author":author,
		"content":dataToSend,
		"category":category
	}
	console.log(dataToSendJSON)
	alert(await postData("/api/submit", dataToSendJSON))
}

selector()


async function postData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
	  method: 'POST', // *GET, POST, PUT, DELETE, etc.
	  mode: 'cors', // no-cors, *cors, same-origin
	  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	  credentials: 'same-origin', // include, *same-origin, omit
	  headers: {
		'Content-Type': 'application/json'
		// 'Content-Type': 'application/x-www-form-urlencoded',
	  },
	  redirect: 'follow', // manual, *follow, error
	  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	  body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
}