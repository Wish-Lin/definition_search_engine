function addRow(tableID,a,b,c,d,e,f,g) { // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/insertRow
  // Get a reference to the table
  
  let newRow = document.getElementById(tableID).insertRow(-1); //bottommost row

  // Insert a cell in the row at index 0
  let newCell0 = newRow.insertCell(0);
  let newCell1 = newRow.insertCell(1);
  let newCell2 = newRow.insertCell(2);
  let newCell3 = newRow.insertCell(3);
  let newCell4 = newRow.insertCell(4);
  let newCell5 = newRow.insertCell(5);
  let newCell6 = newRow.insertCell(6);

  newCell0.appendChild(document.createTextNode(a));
  newCell1.appendChild(document.createTextNode(b));
  newCell2.appendChild(document.createTextNode(c));
  newCell3.appendChild(document.createTextNode(d));
  newCell4.appendChild(document.createTextNode(e));
  newCell5.appendChild(document.createTextNode(f));
  newCell6.appendChild(document.createTextNode(g));
}

function search(){
	var query = document.getElementById("search_input").value;
	if(query != ""){
		//clear previous search results
		while(document.getElementById("search_result").rows.length > 1) { //delete everything except the first row.
			document.getElementById("search_result").deleteRow(1);
		}
		var count = 0;
		
		var number = document.getElementById("search_option").value;
		var tmp = "";
		for(var i = 0;i<objectList.length;i++){
				tmp = objectList[i].split("\t"); //tab separated
				if(tmp[number].search(query) != -1){ //search 
					addRow("search_result",tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]);
					count++;
				}
			document.getElementById("result_count").innerHTML = "「"+query+"」: "+count+"項結果";
		}
	}
}
var objectList = "";
window.onload = function(){
	var pswd = prompt("本服務目前僅開放薇閣高中高三戊同學使用，請輸入密碼:");
	if(pswd != "erica")
		location.replace("redirect.html");
	else{
	document.getElementById("stat_display").innerHTML = "資料擷取中，各位同學請稍候...";
	fetch('https://linebot.muen1019.repl.co/file') //fetch data from Muen's database
	.then(response => response.text())
	.then(data => {
		document.getElementById("stat_display").innerHTML = "擷取完畢。資料處理中，各位同學請稍候...";
		
		objectList = data.split("\n");  //load all the data
		
		document.getElementById("search").disabled = false; //unfreeze search button
		
		document.getElementById("stat_display").innerHTML = "資料處理完畢。目前資料庫中有 "+objectList.length+ " 筆資料，感謝大家幫忙整理";

	});
	}
}
