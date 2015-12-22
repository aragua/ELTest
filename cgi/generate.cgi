#!/bin/bash

# if temporary folder dos not exist, create it
TMP=$PWD/../tmp/
if [ ! -d  $TMP ]
then
    mkdir $TMP
else
    rm -rf $TMP/*
fi


#NAME=$(echo $QUERY_STRING | awk -F '&' '{print $1}' | sed 's/%20/_/g')
#if [ -d $TMP/$NAME ]
#then
#    rm $TMP/$NAME/*
#else
#    mkdir $TMP/$NAME
#fi
#TMPNAME=$TMP/$NAME

# Add name in the report
echo "########################################" > $TMP/report
echo $QUERY_STRING | awk -F '&' '{print $1}' | sed 's/%20/ /g' | sed 's/^name=/Nom : /g' >> $TMP/report

# Add chosen them in the report
THEME=$(echo $QUERY_STRING | awk -F '&' '{print $2}' | sed -e 's/theme=//g' | sed -e 's/-$//g' | sed 's/-/\n\t/g')
echo "Themes choisis :" >> $TMP/report
for test in $THEME
do
    echo "<span class=\"tabulation\">- $test</span>" >> $TMP/report
done
echo "########################################" >> $TMP/report
echo >> $TMP/report

# Liste all available test
rm -f $TMP/available_test
for test in $THEME
do
    find ../tests/$test/ -name "test.html" >> $TMP/available_tests
done
# Get randomly SELECT_TEST_NBR test
SELECT_TEST_NBR=5
sort -R $TMP/available_tests | head -n $SELECT_TEST_NBR > $TMP/selected_tests

echo '<nav>'
echo '<ul id="menu">'
echo '<li>'
echo "<a href=\"javascript:loadsection('Introduction.html')\" >Introduction</a>"
echo '</li>'

TESTNBR=1
while read LINE
do
echo '<li>'
echo "<a id=link$TESTNBR href=\"javascript:loadtest($TESTNBR, '$LINE')\" >Test$TESTNBR</a>"
echo '</li>'
TESTNBR=$(($TESTNBR + 1))
done < $TMP/selected_tests

echo '<li>'
echo "<a href=\"javascript:loadreport()\" >Bilan</a>"
echo '</li>'
echo '</ul>'
echo '</nav>'

echo '<section id="main_section">'
echo '<p>Choisissez une question et soumettez votre réponse une fois que vous etes sures.Au bout de 30minutes la soumission sera automatiquement réalisée.</p>'
echo '</section>'



