function addRow(tableID,zero,a) { // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/insertRow
  // Get a reference to the table
  
  let newRow = document.getElementById(tableID).insertRow(-1); //bottommost row

  let newParagraph = document.createElement("pre"); //render with \n
  
  newParagraph.appendChild(document.createTextNode(a));

  // Insert a cell in the row at index 0
  let newCell0 = newRow.insertCell(0);
  let newCell1 = newRow.insertCell(1);

  newCell0.appendChild(document.createTextNode(zero));
  newCell1.appendChild(newParagraph);
}

function search(){
	var query = document.getElementById("search_input").value;
	if(query != ""){
		//clear previous search results
		while(document.getElementById("search_result").rows.length > 1) { //delete everything except the first row.
			document.getElementById("search_result").deleteRow(1);
		}
		var count = 0;
		
		var tmp = "";
		for(var i = 0;i<objectList.length;i++){
				tmp = objectList[i].split("\t"); //tab separated
				if(tmp[0].search(query) != -1){ //match found 
					addRow("search_result",tmp[0],tmp[1].replace(/\`/g,"\n"));
					count++;
				}
		}
	document.getElementById("result_count").innerHTML = "「"+query+"」: "+count+"項結果";
	}
}

var objectList = "";






window.onload = function(){
	document.getElementById("stat_display").innerHTML = "正在連線至資料庫，各位同學請稍候...";
	fetch('https://Chinese-project.muen1019.repl.co/雜項') //fetch data from Muen's database
	.then(response => response.text())
	.then(data => {
		
		objectList = data.split("\n");  //load all the data
		
		document.getElementById("search").disabled = false; //unfreeze search button
		
		document.getElementById("stat_display").innerHTML = "資料處理完畢。目前資料庫中有 "+objectList.length+ " 筆資料";
		
		search(); //run example
	});
	document.getElementById("search_input").addEventListener("keyup", function(){	
			if (event.key === "Enter") {
				search();
			}
	});
}
