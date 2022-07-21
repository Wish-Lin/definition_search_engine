function addRow(tableID,a,b,c,d,e,f,g) { // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/insertRow
  // Get a reference to the table
  
  let newRow = document.getElementById(tableID).insertRow(-1);

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

window.onload = function(){
	document.getElementById("stat_display").innerHTML = "資料擷取中，各位同學請稍候...";
	fetch('https://linebot.muen1019.repl.co/file') //fetch data from Muen's database
	.then(response => response.text())
	.then(data => {
		document.getElementById("stat_display").innerHTML = "擷取完畢。資料處理中，各位同學請稍候...";
		
		var objectList = data.split("\n");   
		
		var pian_pang = new Array(objectList.length);//智障般的變數名稱
		var shin = new Array(objectList.length);
		var yin = new Array(objectList.length);
		var yi = new Array(objectList.length);
		var liju = new Array(objectList.length);
		var chuchu = new Array(objectList.length);
		var beijou = new Array(objectList.length);
		var tmp = "";
		for(var i = 0;i<objectList.length;i++){
			tmp = objectList[i].split("\t"); //tab separated
			pian_pang[i] = tmp[0];
			shin[i] = tmp[1];
			yin[i] = tmp[2];
			yi[i] = tmp[3];
			liju[i] = tmp[4];
			chuchu[i] = tmp[5];
			beijou[i] = tmp[6];
		}
		
		document.getElementById("stat_display").innerHTML = "資料處理完畢，目前有 "+objectList.length+ " 筆資料";
		//processing complete, create output table
		
		
		for(var i = 0;i<objectList.length;i++){
			addRow("search_result",pian_pang[i],shin[i],yin[i],yi[i],liju[i],chuchu[i],beijou[i]);
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/*for(var i = 0;i<objectList.length;i++){
			console.log(pian_pang[i]);
			console.log(shin[i]);
			console.log(yin[i]);
			console.log(yi[i]);
			console.log(liju[i]);
			console.log(chuchu[i]);
			console.log(beijou[i]);
			console.log("-------------------------------------------");
		}*/
	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	});
}