#!/bin/bash

# if temporary folder dos not exist, create it
TMP=$PWD/../tmp/
if [ ! -d  $TMP ]
then
	mkdir $TMP
fi

#get params
read QUERY_STRING
TEST_THEME=$(echo $QUERY_STRING | awk -F '-' '{print $1}' )
TEST_NUMBER=$(echo $QUERY_STRING | awk -F '-' '{print $2}' | sed 's/=//g' )
echo "########## $TEST_THEME - $TEST_NUMBER ##########" >> $TMP/report
PARAMRESULT=0
while [ $PARAMRESULT -eq 0 ]
do
	read QUERY_STRING
	PARAMRESULT=$?
	echo $QUERY_STRING >> $TMP/report
done

echo '<p>code submitted with success</p>'
