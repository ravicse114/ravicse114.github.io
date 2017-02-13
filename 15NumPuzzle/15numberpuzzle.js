var n = (4 * 4)-1;var flag=true;
var null_position=15;
            var arrN = new Array();
            for (var i = 1; i <= n; i++) {
                arrN.push(i);
            }
           
     var moves = 0,count=0;
        var tbl=4, rows=4, cols=4;
        function Move(d) {
            //Get the td
            var cell = GetCell(d);
            var row = GetRow(cell);
            var ri = row.rowIndex;
            var ci = cell.cellIndex;
            var emptycell;

            if (ri > 0 && emptycell == null) {
                if (IsCellEmpty(tbl.rows[ri - 1].cells[ci])) { emptycell = tbl.rows[ri - 1].cells[ci]; }
            }
            if (ri < tbl.rows.length - 1 && emptycell == null) {
                if (IsCellEmpty(tbl.rows[ri + 1].cells[ci])) { emptycell = tbl.rows[ri + 1].cells[ci]; }
            }
            if (ci > 0 && emptycell == null) {
                if (IsCellEmpty(tbl.rows[ri].cells[ci - 1])) { emptycell = tbl.rows[ri].cells[ci - 1]; }
            }
            if (ci < row.cells.length - 1 && emptycell == null) {
                if (IsCellEmpty(tbl.rows[ri].cells[ci + 1])) { emptycell = tbl.rows[ri].cells[ci + 1]; }
            }

            if (emptycell == null) { 
                //d.style.backgroundColor = "#FF3300";
                //d.style.color = "#FFFFFF";
                //setTimeout("RemoveHighlight('" + d.id + "');", 500);
                
            }
            else {
                ChangeParent(d, emptycell);
                
                null_position=ri*4+ci;
                moves++;
                document.getElementById("moves").innerHTML = moves;
                IsInOrder();
            }
        }
        
    
    onSubmit = function () { flag=false;
    var name = document.getElementById("Team Name").value;
    var arrDiv = document.getElementsByTagName("DIV");
    var matrix=["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"];
    for (var i = 0; i <arrDiv.length; i++) {
                var n = parseInt(trim(arrDiv[i].innerHTML));
                matrix[i]=n;
                
            }
    var mat=[];
    for(var i=0;i<null_position;i++)
        mat[i]=matrix[i];
        mat[null_position]=0;
        for(var i=null_position;i<15;i++)
         mat[i+1]=matrix[i];
    var data = { "move" : moves, "team" : name, "solution" : mat};
    //console.log(name);
    //console.log(matrix);

    $.post("server.php",
          data,
        function(data){
            alert(data + "\nYour Answer is Submitted");
        });
  }
  
        function IsInOrder() {
            var arrDiv = document.getElementsByTagName("DIV");
            var inorder = true;
            for (var i = 0; i < arrDiv.length ; i++) {
                var n = parseInt(trim(arrDiv[i].innerHTML));
                var n1 = parseInt(trim(arrDiv[i + 1].innerHTML));
                if (n + 1 != n1) {
                    inorder = false;
                    break;
                }
            }
            if (inorder && IsCellEmpty(tbl.rows[tbl.rows.length - 1].cells[cols - 1])) {
                for (var i = 0; i < arrDiv.length-1; i++) {
                    arrDiv[i].style.backgroundColor = "#FFFFCC";
                }
                if(flag){
                onSubmit();
                alert("Congratulations! It took you " + moves + " moves to solve it.");}
            }
        }
        moves = -1;
        function Reset() {
            moves++;
            document.getElementById("moves").innerHTML = moves;

            rows = 4;
            if (isNaN(rows) || rows < 0) { rows = 4; }
            else { rows = 4}
            document.getElementById("rows").value = 4;

            cols = 4;
            if (isNaN(cols) || cols < 0) { cols = 4; }
            else { cols = 4 }
            document.getElementById("cols").value = 4;

            tbl = document.getElementById("tbl");
            while (tbl.rows.length > 0) {
                tbl.deleteRow(0);
            }
            
            var inversions = 1;

            while (inversions % 2 == 1) {
                arrN = Shuffle(arrN);
                //                var t = "";
                //                for (var i = 0; i < arrN.length; i++) {
                //                    t += arrN[i] + ", ";
                //                }
                //                alert(t);

                //Now check if the resulting array is solvable
                //http://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html

                inversions = 0;
                for (var i = 0; i < arrN.length; i++) {
                    for (var j = i; j < arrN.length; j++) {
                        if (arrN[i] > arrN[j])
                            inversions++;
                    }
                }
            }

            n = 0;
            for (var i = 0; i < rows; i++) {
                tbl.insertRow(i);
                var tr = tbl.rows[i];
                for (var j = 0; j < cols; j++) {
                    tr.insertCell(j);
                    var td = tr.cells[j];
                    td.className = "cell";
                    if (i == rows - 1 && j == cols - 1)
                        td.innerHTML = "";
                    else
                        td.innerHTML = "<div id='n" + arrN[n] + "' class='num' onclick='Move(this)'>" + arrN[n] + "</div>";

                    n++;
                }
            }
        }

        function Shuffle(o) {
            for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        function IsCellEmpty(cell) {
            for (var i = 0; i < cell.childNodes.length; i++) {
                if (cell.childNodes[i].className == "num") {
                    return false;
                }
            }
            return true;
        }

        function RemoveHighlight(did) {
            var d = document.getElementById(did);
            d.style.backgroundColor = "#CCFFFF";
            d.style.color = "#0099FF";
        }

        function GetTable(a) {
            var c = a.parentNode;
            while (c.tagName != 'TABLE') {
                c = c.parentNode;
            }
            return c;
        }

        function GetRow(a) {
            var c = a.parentNode;
            while (c.tagName != 'TR') {
                c = c.parentNode;
            }
            return c;
        }

        function GetCell(a) {
            var c = a.parentNode;
            while (c.tagName != 'TD') {
                c = c.parentNode;
            }
            return c;
        }

        function GetRowIndex(a) {
            var c = a.parentNode;
            while (c.tagName != 'TR') {
                c = c.parentNode;
            }
            return c.rowIndex;
        }

        function GetCellIndex(a) {
            var c = a.parentNode;
            while (c.tagName != 'TD') {
                c = c.parentNode;
            }
            return c.cellIndex;
        }

        function AddRow(tbl, i, NumCells) {
            var r = tbl.insertRow(i);
            for (j = 0; j < NumCells; j++) {
                var c = r.insertCell(j);
                c.className = "col" + (j + 1);
                c.innerHTML = "";
            }
        }

        function trim(str) {
            str = str.replace(/^\s+/, '');
            for (var i = str.length - 1; i >= 0; i--) {
                if (/\S/.test(str.charAt(i))) {
                    str = str.substring(0, i + 1);
                    break;
                }
            }
            return str;
        }

        function ChangeParent(sourceElement, targetElement) {
            var sourceElementParent = sourceElement.parentNode;
            sourceElementParent.removeChild(sourceElement);
            targetElement.appendChild(sourceElement);
        }
var mins;
var secs;

function dis(mins,secs) {
 	var disp;
 	if(mins <= 9) {
  		disp = " 0";
 	} else {
  		disp = " ";
 	}
 	disp += mins + " mins : ";
 	if(secs <= 9) {
  		disp += "0" + secs +" secs ";
 	} else {
  		disp += secs+" secs ";
 	}
 	return(disp);
}
var c1=0;
function redo() {
 	secs--;
 	if(secs == -1) {
  		secs = 59;
  		mins--;
 	}
 	document.cd.disp.value = dis(mins,secs); // setup additional displays here.
 	//console.log(mins+" "+secs);
 	if((mins == 0) && (secs == 0) && (c1==0)&& flag) {
 	c1++;
 	onSubmit();
  		window.alert("Time is up."); // change timeout message as required
  		// window.location = "yourpage.htm" // redirects to specified page once timer ends and ok button is pressed
 	} else {
 		cd = setTimeout("redo()",1000);
 		
 	}
}

function init() {
	$.post("time_receive.php", function(data)
	{
		//console.log(data);
		mins = parseInt(data.substring(0,2));
		secs = parseInt(data.substring(3,5));
	});
  redo();
}
window.onload = init;
