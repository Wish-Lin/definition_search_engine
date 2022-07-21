window.onload = function(){
	fetch('https://linebot.muen1019.repl.co/file') //get muen's database
  .then(response => response.text())
  .then(data => {
  	// Do something with your data
  	document.getElementById("test").innerHTML = data;
	});
}