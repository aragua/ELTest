#!/bin/bash

TMP=$PWD/../tmp/

TEST_THEME=$(echo $QUERY_STRING | awk -F '-' '{print $1}' )
TEST_NUMBER=$(echo $QUERY_STRING | awk -F '-' '{print $2}' | awk -F '=' '{ print $1 }' )
TEST_ANSWER=$(echo $QUERY_STRING | awk -F '=' '{print $2}' | sed 's/-$//g' )

# generate result
echo "########## $TEST_THEME - $TEST_NUMBER ##########" >> $TMP/report
if ! [ -f ../tests/$TEST_THEME/$TEST_NUMBER/qcm_answer ]
then
    echo "Cannot check result: $TEST_ANSWER" >> $TMP/report
else
    GOOD_ANSWER=$(cat ../tests/$TEST_THEME/$TEST_NUMBER/qcm_answer | head -1)
    if [ x"$TEST_ANSWER" = x"$GOOD_ANSWER" ]
    then
	echo "Good answer : $TEST_ANSWER" >> $TMP/report
    else
	echo "Bad answer : $TEST_ANSWER. Expecting $GOOD_ANSWER" >> $TMP/report
    fi
fi
    
echo '<p>answer submitted with success</p>'
