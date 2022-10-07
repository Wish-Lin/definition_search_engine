var objectList = "";
var display;
var qc = "";
var wrong = 0;
var right = 0;

function grading(){
	var answer = document.getElementById("bpmf_1").value+document.getElementById("bpmf_2").value+document.getElementById("bpmf_3").value+document.getElementById("bpmf_4").value;
	if(answer == qc[2]){
		right++;
		document.getElementById("right").innerHTML = right;
	}
	else{
		wrong++;
		document.getElementById("wrong").innerHTML = wrong;
	}
	
	disp_problem();
}

function disp_problem(){
	qc = objectList[Math.floor(3533*Math.random()+0.5)].split("\t");
	while(qc[1] == "" || qc[4] == ""){
		qc = objectList[Math.floor(3533*Math.random()+0.5)].split("\t");
	}
		display.item(0).innerHTML = qc[1];
		display.item(1).innerHTML = "????";
		display.item(2).innerHTML = qc[3];
		display.item(3).innerHTML = qc[4];
}

window.onload = function(){
	document.getElementById("stat_display").innerHTML = "正在連線至資料庫，各位同學請稍候...";
	fetch('https://script.google.com/macros/s/AKfycbzZIlbBIIPUo5FGjgWPK4ZOZAuutgeko7TMcE9CNzZITMm8UsWbYMXp6rHArqJpnk8emw/exec?sheetName=形音義') //fetch data from Muen's database
	.then(response => response.text())
	.then(data => {
		
		objectList = data.split("\n");  //load all the data
		display = document.getElementById("question").rows.item(1).cells;
		qc = objectList[Math.floor(3533*Math.random()+0.5)].split("\t");
		
		document.getElementById("stat_display").innerHTML = "資料處理完畢。目前資料庫中有 "+objectList.length+ " 筆資料";
		
		document.getElementById("bpmf_search").disabled = false; //unfreeze bpmf_search button
		
		disp_problem();
	});
}
