<?php
	$fileHandle = fopen("time.txt", 'r');
	$time = fread($fileHandle, filesize("time.txt"));
	fclose($fileHandle);
	echo $time;
?>
