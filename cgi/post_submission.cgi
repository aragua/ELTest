#!/bin/bash

# if temporary folder dos not exist, create it
TMP=$PWD/../tmp/
if [ ! -d  $TMP ]
then
	mkdir $TMP
fi

#get params
PARAMRESULT=0
while [ $PARAMRESULT -eq 0 ]
do
	read QUERY_STRING
	PARAMRESULT=$?
	echo $QUERY_STRING >> /tmp/ELTest-report	
done

echo '<p>code submitted with success</p>'
