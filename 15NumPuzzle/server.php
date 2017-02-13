<?php
    $moves=$_POST['move'];
	$team = $_POST['team'];
	$mat = $_POST['solution'];
	$fileHandle = fopen("15numberpuzzle", 'a');
	
	fwrite($fileHandle, "\t\tTeam : ".$team."\n\n");
	fwrite($fileHandle, "\t\tMoves : ".$moves."\n\n");
	fwrite($fileHandle, "0\t|\t1\t2\t3\t4\n");
	fwrite($fileHandle, "____|____________________\n    |\n");
	fwrite($fileHandle, "1\t|\t".$mat[0]."\t".$mat[1]."\t".$mat[2]."\t".$mat[3]."\n");
	fwrite($fileHandle, "2\t|\t".$mat[4]."\t".$mat[5]."\t".$mat[6]."\t".$mat[7]."\n");
	fwrite($fileHandle, "3\t|\t".$mat[8]."\t".$mat[9]."\t".$mat[10]."\t".$mat[11]."\n");
	fwrite($fileHandle, "4\t|\t".$mat[12]."\t".$mat[13]."\t".$mat[14]."\t".$mat[15]."\n\n\n\n");
	fwrite($fileHandle, "#############################\n\n\n\n");
	fclose($fileHandle);
	echo "Team : ".$team;
?>
