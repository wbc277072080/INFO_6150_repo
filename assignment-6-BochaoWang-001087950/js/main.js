let defaultRowCount = 5; // No of rows
let defaultColCount = 5; // No of cols
let selecthead = null;
let oldselect = null;
let tableEle=document.getElementById('table-all');
const SPREADSHEET_DB = "spreadsheet_db";

import { Subscription,fromEvent,Observable} from 'rxjs';
import {throttleTime,scan} from 'rxjs/operators';
import {startWith,filter} from 'rxjs/operators';
import {distinctUntilChanged} from 'rxjs/operators';

let initializeData = () => {
  // console.log("initializeData");
  const data = [];
  for (let i = 0; i <= defaultRowCount; i++) {
    const child = [];
    for (let j = 0; j <= defaultColCount; j++) {
      child.push("");
    }
    data.push(child);
  }
  return data;
};

function getData(){
  let data = localStorage.getItem(SPREADSHEET_DB);
  if (data === undefined || data === null) {
    return initializeData();
  }
  return JSON.parse(data);
};

function saveData(data) {
  localStorage.setItem(SPREADSHEET_DB, JSON.stringify(data));
};

function resetData(data){
  localStorage.removeItem(SPREADSHEET_DB);
  createSpreadsheet();
};

function createHeaderRow(){
    const tr = document.createElement("tr");
    tr.setAttribute("id", "h-0");
    for (let i = 0; i <= defaultColCount; i++) {
      const th = document.createElement("th");
      th.setAttribute("id", `h-0-${i}`);
      th.setAttribute("class", `${i === 0 ? "" : "column-header"}`);
      if (i !== 0) {
        const span = document.createElement("span");
        span.innerHTML = String.fromCharCode(64+i);
        span.setAttribute("class", "column-header-span");
        th.appendChild(span);
      }
      tr.appendChild(th);
    }
    return tr;
  };

function createTableBodyRow(rowNum) {
const tr = document.createElement("tr");
tr.setAttribute("id", `r-${rowNum}`);
for (let i = 0; i <= defaultColCount; i++) {
    const cell = document.createElement(`${i === 0 ? "th" : "td"}`);
    if (i === 0) {
        cell.contentEditable = false;
        const span = document.createElement("span");
        span.innerHTML = rowNum;
        cell.appendChild(span);
        cell.setAttribute("class", "row-header");
    } else {
        cell.contentEditable = true;
    }
    cell.setAttribute("id",`r-${rowNum}-${i}`)
    //cell.setAttribute("id", `r-${rowNum}-${i}`);
    tr.appendChild(cell);
}
return tr;
};

function createTableBody(tableBody){
    for (let rowNum = 1; rowNum <= defaultRowCount; rowNum++) {
      tableBody.appendChild(createTableBodyRow(rowNum));
    }
};

// Fill Data in created table from localstorage
function populateTable(){
    const data = getData();
    if (data === undefined || data === null) return;
  
    for (let i = 1; i < data.length; i++) {
        for (let j = 1; j < data[i].length; j++) {
          const cell = document.getElementById(`r-${i}-${j}`);
          if (cell!=null){
            cell.innerHTML = data[i][j];
          }
          
        }
      }
  };


//add and delete
// Utility function to add row
function addRow(currentRow, direction) {
    let data = getData();
    // for(var i = 0;i<data.length;i++){
    //   console.log(data[i]);
    // }
    
    const colCount = data[0].length;
    const newRow = new Array(colCount).fill("");
    if (direction === "top") {
      data.splice(currentRow, 0, newRow);
    } else if (direction === "bottom") {
      data.splice(currentRow + 1, 0, newRow);
    }
    defaultRowCount++;
    saveData(data);
    createSpreadsheet();
  };
  
  // Utility function to delete row
  function deleteRow(currentRow) {
    let data = getData();
    if(defaultRowCount ===1){
        alert("you can't delete row now!")
    }
    else{

    data.splice(currentRow, 1);
    defaultRowCount++;
    saveData(data);
    createSpreadsheet();
    }
  };
  
  // Utility function to add columns
  function addColumn(currentCol, direction) {
    let data = getData();
    for (let i = 0; i <= defaultRowCount; i++) {
      if (direction === "left") {
        data[i].splice(currentCol, 0, "");
      } else if (direction === "right") {
        data[i].splice(currentCol + 1, 0, "");
      }
    }
    defaultColCount++;
    saveData(data);
    createSpreadsheet();
  };
  
  // Utility function to delete column
  function deleteColumn(currentCol){
    let data = getData();
    if(defaultColCount ===1){
        alert("you can't delete column now!")
    }
    else{
        for (let i = 0; i <= defaultRowCount; i++) {
            data[i].splice(currentCol, 1);
          }
          defaultColCount++;
          saveData(data);
          createSpreadsheet();
        }
    
  };

  const cell = fromEvent(document, "keyup").pipe(filter(e => e.keyCode == 13));
  cell
  .subscribe(
    function(e) {
      // console.log(e.target.innerHTML)
      if(e.target){
        if(e.target.innerHTML){
          var str=e.target.innerText
          //console.log(str); 
          if((str.startsWith("=SUM(") || str.startsWith("=sum("))
          &&str.match(/\(([^)]*)\)/))
          {
            str = str.match(/\(([^)]*)\)/);
            //console.log(str);
            str = str[1];
            //var arr = str.split(/[:CR]/);//arr[1],arr[2];arr[4],arr[5]
            var arr = str.split("");
            //console.log(str);
            //console.log(arr); 
            //console.log(arr[1]);
            //arr[0]=String.fromCharCode(arr[0]-64);
            arr[0] = str.charCodeAt(0)-64;
            arr[3] = str.charCodeAt(3)-64;
            //console.log(arr[0]);
            if(arr[1]>0&&arr[1]<=defaultRowCount&&arr[0]>0&&arr[0]<=defaultColCount&&
              arr[4]>0&&arr[4]<=defaultRowCount&&arr[3]>0&&arr[3]<=defaultColCount
              ){
                let tds = document.getElementsByTagName("td");
                var sum=0;
                for(let j=0;j<tds.length;j++){
                  let tdrc=tds[j].id.split('-');
                  //console.log(tdrc);
                  if(tdrc[1]>=arr[1]&&tdrc[2]>=arr[0]&&tdrc[1]<=arr[4]&&tdrc[2]<=arr[3]){
                    if(tds[j].innerHTML==''){
                      //sum =sum+0;
                      alert('exist empty cell!');
                      e.target.innerHTML="";
                      return;
                    }else{
                      sum = sum+parseInt(tds[j].innerHTML);
                    }
                    //console.log(parseInt(document.getElementById(`r-${arr[1]}-${arr[2]}`).innerHTML)); 
                    //console.log(sum)
                    //e.target.innerHTML="";
                    
                  }
                  
                }
                e.target.innerHTML=sum;

              }
            else{
              alert("the input out of range!");
              e.target.innerHTML="";
            }
            
          }
          else if(str.startsWith("=(") && str.match(/\(([^)]*)\)/)){
            str = str.match(/\(([^)]*)\)/);
            //console.log(str);
            str = str[1];
            //var arr = str.split(/[:CR]/);//arr[1],arr[2];arr[4],arr[5]
            var arr = str.split("");
            arr[0] = str.charCodeAt(0)-64;
            arr[3] = str.charCodeAt(3)-64;
            if(arr[1]>0&&arr[1]<=defaultRowCount&&arr[0]>0&&arr[0]<=defaultColCount&&
              arr[4]>0&&arr[4]<=defaultRowCount&&arr[3]>0&&arr[3]<=defaultColCount){
                //console.log(arr);
                let tds = document.getElementsByTagName("td");
                var sum=0;
                
                  for(let j=0;j<tds.length;j++){
                    let tdrc=tds[j].id.split('-');
                    //console.log(tdrc);
                    if((tdrc[1]==arr[1]&&tdrc[2]==arr[0]) || (tdrc[1]==arr[4]&&tdrc[2]==arr[3])){
                      var index=0;
                      if(tdrc[1]==arr[1]&&tdrc[2]==arr[0]) {
                        index=1;
                      }
                      else if(tdrc[1]==arr[4]&&tdrc[2]==arr[3]){
                        index=2;
                      }
                      if(tds[j].innerHTML==''){
                        //sum =sum+0;
                        alert('exist empty cell!');
                        e.target.innerHTML="";
                        return;
                      }else{
                
                        if(arr[2]=='+'){
                          sum = sum+parseInt(tds[j].innerHTML);
                        }

                        else if(arr[2]=='-'){
                          if(index == 1){
                            sum=parseInt(tds[j].innerHTML);
                          }
                          else if(index == 2){
                            sum=sum-parseInt(tds[j].innerHTML);
                          }
                        }
                        else if(arr[2]=='*'){
                          if(index == 1){
                            sum=parseInt(tds[j].innerHTML);
                          }
                          else if(index == 2){
                            sum=sum * parseInt(tds[j].innerHTML);
                          }
                        }
                        else if(arr[2]=='/'){
                          if(index == 1){
                            sum=parseInt(tds[j].innerHTML);
                          }
                          else if(index == 2){
                            sum=sum / parseInt(tds[j].innerHTML);
                          }
                        }
                        
                      }
                      //console.log(parseInt(document.getElementById(`r-${arr[1]}-${arr[2]}`).innerHTML)); 
                      //console.log(sum)
                      //e.target.innerHTML="";
                      
                    }
                    
                  }
                  e.target.innerHTML=sum;
                
                

            }
            else{
              alert("the input out of range!");
              e.target.innerHTML="";
            }

            
          }
          else{
            alert('it is not a fomula!')
          }
        }
        
      }
      
    }
  );

function createSpreadsheet() {
    //localStorage.clear;
    const spreadsheetData = getData();
    defaultRowCount = spreadsheetData.length - 1 || defaultRowCount;
    defaultColCount = spreadsheetData[0].length - 1 || defaultColCount;

    const tableHeaderElement = document.getElementById("table-headers");
    const tableBodyElement = document.getElementById("table-body");

    const tableBody = tableBodyElement.cloneNode(true);
    tableBodyElement.parentNode.replaceChild(tableBody, tableBodyElement);
    const tableHeaders = tableHeaderElement.cloneNode(true);
    tableHeaderElement.parentNode.replaceChild(tableHeaders, tableHeaderElement);

    tableHeaders.innerHTML = "";
    tableBody.innerHTML = "";

    tableHeaders.appendChild(createHeaderRow(defaultColCount));
    createTableBody(tableBody, defaultRowCount, defaultColCount);

    populateTable();

      // attach focusout event listener to whole table body container
    tableBody.addEventListener("focusout", function(e) {
        if (e.target && e.target.nodeName === "TD") {
        let item = e.target;
        const indices = item.id.split("-");
        let spreadsheetData = getData();
        spreadsheetData[indices[1]][indices[2]] = item.innerHTML;
        saveData(spreadsheetData);
        }
    });

    //row 
    tableBody.addEventListener("click", function(e) {
        if (e.target) {
          //if (e.target.className === "row-header") {
                selecthead = e.target.id;
                //e.target.style.color = "#E5502E";
                
                //console.log(selecthead);
            //}
            
        }
      });
    
    tableHeaders.addEventListener("click", function(e) {
        if (e.target) {
          if (e.target.className === "column-header") {
                selecthead = e.target.id;
                //console.log(selecthead);
            }
            
        }
      });
      
    

};

createSpreadsheet();

document.getElementById("reset-btn").addEventListener("click", e => {
    if (
      confirm("This will erase all data and set default configs. Are you sure?")
    ) {
      resetData();
    }
});

document.getElementById("addrow-btn").addEventListener("click", e => {
    const indices = selecthead.split("-");
    //console.log(parseInt(indices[1]));
    addRow(parseInt(indices[1]), "bottom");
});

document.getElementById("addcol-btn").addEventListener("click", e => {
    const indices = selecthead.split("-");
    //console.log(parseInt(indices[2]));
    addColumn(parseInt(indices[2]), "right");
});

document.getElementById("delrow-btn").addEventListener("click", e => {
    const indices = selecthead.split("-");
    //console.log(defaultRowCount);
    deleteRow(parseInt(indices[1]));
});

document.getElementById("delcol-btn").addEventListener("click", e => {
    const indices = selecthead.split("-");
    console.log(defaultColCount);
    deleteColumn(parseInt(indices[2]));
});


// export table to csv

function exportTableToCSV(tableid, title) {
    var winname;
    var str = getTblData(tableid);
          
    var uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);

    var downloadLink = document.createElement("a");
    downloadLink.href = uri;
    downloadLink.download = title + ".csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function getTblData(inTbl) {
 
    var rows = 0;
    var tblDocument = document;
 
    //tblDocument = eval(inWindow).document;
    var curTbl = tblDocument.getElementById(inTbl);
    var outStr = "";
    if (curTbl != null) {
        for (var j = 0; j < curTbl.rows.length; j++) {
            for (var i = 0; i < curTbl.rows[j].cells.length; i++) {
 
                if (i == 0 && rows > 0) {
                    outStr += ",";
                    rows -= 1;
                }
                
                if(i<curTbl.rows[j].cells.length-1){
                  outStr +=curTbl.rows[j].cells[i].innerText + ",";
                }
                else if(i==curTbl.rows[j].cells.length-1){
                  outStr +=curTbl.rows[j].cells[i].innerText;
                }
                
                if (curTbl.rows[j].cells[i].colSpan > 1) {
                    for (var k = 0; k < curTbl.rows[j].cells[i].colSpan - 1; k++) {
                        outStr += ",";
                    }
                }
                if (i == 0) {
                    if (rows == 0 && curTbl.rows[j].cells[i].rowSpan > 1) {
                        rows = curTbl.rows[j].cells[i].rowSpan - 1;
                    }
                }
            }
            outStr += "\r\n";//换行
        }
    }
 
    else {
        outStr = null;
        alert(allPage.noData);
    }
    return outStr;
}



document.getElementById("export-btn").addEventListener("click", e => {
    if (
      confirm(" Are you sure to xport?")
    ) {
        exportTableToCSV( 'table-all','export');
    }
});




//import 
function Upload() {
    let data = getData();
    //console.log(data[0]);
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                //var table = document.createElement("table");
                var table = document.getElementById('table-all');
                var rows = e.target.result.split("\n");

                var maxcol = 0;
                for(var i = 0;i<rows.length; i++){
                  var cells = rows[i].split(",");
                  if(cells.length-1 > maxcol){
                    maxcol = cells.length;
                  }
                }

                // console.log(maxcol);
                // console.log(rows.length);
                // console.log(table.rows.length-1);
                // console.log(table.rows[0].cells.length-1);


                if(rows.length-2<=table.rows.length-1 && maxcol-2 <= table.rows[0].cells.length-1){
                  for (var i = 0; i < rows.length; i++) {
                    var cells = rows[i].split(",");
                    if (cells.length > 1) {
                        //var row = table.insertRow(-1);
                        for (var j = 0; j < cells.length; j++) {
                            //var cell = row.insertCell(-1);
                            var thecell = document.getElementById(`r-${i}-${j}`);
                            if(thecell != null){
                              thecell.innerHTML = cells[j];
                              data[i][j]=cells[j];
                            }
                            
                        }
                    }
                }
                saveData(data);

                }
                else{
                  alert('it can not be import because of size');
                  //console.log(maxcol);
                  //console.log();

                }

                
                //var dvCSV = document.getElementById("dvCSV");
                //dvCSV.innerHTML = "";
                //dvCSV.appendChild(table);
            }
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.");
    }
}

document.getElementById("upload-btn").addEventListener("click", e => {
  Upload();
});







