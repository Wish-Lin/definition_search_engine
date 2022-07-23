function addRow(tableID,a,b,c,d,e,f,g,h) { // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/insertRow
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
  let newCell7 = newRow.insertCell(7);

  newCell0.appendChild(document.createTextNode(a));
  newCell1.appendChild(document.createTextNode(b));
  newCell2.appendChild(document.createTextNode(c));
  newCell3.appendChild(document.createTextNode(d));
  newCell4.appendChild(document.createTextNode(e));
  newCell5.appendChild(document.createTextNode(f));
  newCell6.appendChild(document.createTextNode(g));
  newCell7.appendChild(document.createTextNode(h));
}
function change_input_configuration(){
	if(document.getElementById("search_option").value == 2){ //bpmf search
		document.getElementById("bpmf_inputzone").style.display = "inline";
		document.getElementById("basic_inputzone").style.display = "none";
	}
	else{
		document.getElementById("basic_inputzone").style.display = "inline";
		document.getElementById("bpmf_inputzone").style.display = "none";		
	}
}
function search(){
	var number = document.getElementById("search_option").value;
	var query = document.getElementById("search_input").value;
	if(query != ""){
		
		
		
		if(number == 0){ //形轉成偏旁
			for(var i = 0;i<objectList.length;i++){
				tmp = objectList[i].split("\t"); //tab separated
				if(tmp[1] == query){ //match found 
					query = tmp[0];
					break;
				}
			}
		}
		
		if(query != "all"){ //非資料檢測模式
			
				//clear previous search results
				while(document.getElementById("search_result").rows.length > 1) { //delete everything except the first row.
					document.getElementById("search_result").deleteRow(1);
				}
				var count = 0;
				
				var tmp = "";
				for(var i = 0;i<objectList.length;i++){
						tmp = objectList[i].split("\t"); //tab separated
						if(tmp[number].search(query) != -1){ //match found 
							addRow("search_result",tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6],i+2);
							count++;
						}
				}
			document.getElementById("result_count").innerHTML = "「"+query+"」: "+count+"項結果";
		}
		else{
			print_all();
		}
	}
}

function bpmf_search(){
	var query = document.getElementById("bpmf_1").value+document.getElementById("bpmf_2").value+document.getElementById("bpmf_3").value;

		//clear previous search results
		while(document.getElementById("search_result").rows.length > 1) { //delete everything except the first row.
			document.getElementById("search_result").deleteRow(1);
		}
		var count = 0;
		
		var number = document.getElementById("search_option").value;
		var tmp = "";
		
		if(document.getElementById("bpmf_4").value == "*"){
			var query1 = query;
			var query2 = query+"ˊ";
			var query3 = query+"ˇ";
			var query4 = query+"ˋ";
			var query5 = query+"˙";
			query += "*";
			for(var i = 0;i<objectList.length;i++){
					tmp = objectList[i].split("\t"); //tab separated
					if(tmp[2] == query1 || tmp[2] == query2 || tmp[2] == query3 || tmp[2] == query4 || tmp[2] == query5){ //contains
						addRow("search_result",tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6],i+2);
						count++;
					}
			}
		}
		else{
			query += document.getElementById("bpmf_4").value;
			for(var i = 0;i<objectList.length;i++){
					tmp = objectList[i].split("\t"); //tab separated
					if(tmp[2] == query){ //exact match
						addRow("search_result",tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6],i+2);
						count++;
					}
			}
		}
		
	document.getElementById("result_count").innerHTML = "「"+query+"」: "+count+"項結果";
}

function print_all(){
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
				addRow("search_result",tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6],i+2);
				count++;
		}
		document.getElementById("result_count").innerHTML = "「"+query+"」: "+count+"項結果";
	}
}

var objectList = "";
window.onload = function(){
	document.getElementById("stat_display").innerHTML = "正在連線至資料庫，各位同學請稍候...";
	fetch('https://chinese-definition.muen1019.repl.co/file') //fetch data from Muen's database
	.then(response => response.text())
	.then(data => {
		
		objectList = data.split("\n");  //load all the data
		
		document.getElementById("search").disabled = false; //unfreeze search button
		document.getElementById("bpmf_search").disabled = false; //unfreeze bpmf_search button
		
		document.getElementById("stat_display").innerHTML = "資料處理完畢。目前資料庫中有 "+objectList.length+ " 筆資料";
		
		search(); //run example
	});
	document.getElementById("search_input").addEventListener("keyup", function(){	
			if (event.key === "Enter") {
				search();
			}
	});
}
