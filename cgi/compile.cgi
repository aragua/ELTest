#!/bin/bash

# if temporary folder dos not exist, create it
TMP=$PWD/../tmp/
if [ ! -d  $TMP ]
then
	mkdir $TMP
fi

#clean
rm $TMP/ELTest-compile.*

#get params
PARAMRESULT=0
while [ $PARAMRESULT -eq 0 ]
do
	read QUERY_STRING
	PARAMRESULT=$?
	echo $QUERY_STRING >> $TMP/ELTest-compile.c	
done

PATH=$PATH /usr/bin/gcc -o $TMP/ELTest-compile $TMP/ELTest-compile.c > $TMP/ELTest-compile.log 2> $TMP/ELTest-compile.log

if [ $? -eq 0 ]
then
	echo Compilation Succeed
else
	cat $TMP/ELTest-compile.log | eval "sed 's/$(echo $TMP | sed 's/\//\\\//g')/\./g'"
fi
