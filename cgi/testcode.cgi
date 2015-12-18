#!/bin/bash

TMP=$PWD/../tmp/
if [ ! -d  $TMP ]
then
	echo "aucune compilation tentée"
else
	$TMP/ELTest-compile > $TMP/ELTest-compile.run 2> $TMP/ELTest-compile.run
	echo "Run status"
	cat $TMP/ELTest-compile.run		
fi