#!/bin/bash

rm /tmp/ELTest-report

echo '<nav>'
echo '<ul id="menu">'
echo '<li>'
echo "<a href=\"javascript:loadsection('Introduction.html')\" >Introduction</a>"
echo '</li>'
echo '<li>'
echo "<a id=link1 href=\"javascript:loadtest(1, 'tests/c/test0/test.html')\" >Test1</a>"
echo '</li>'
echo '<li>'
echo "<a id=link2 href=\"javascript:loadtest(2, 'tests/c/test2/test.html')\" >Test2</a>"
echo '</li>'
echo '<li>'
echo "<a id=link3 href=\"javascript:loadtest(3, 'tests/c/test3/test.html')\" >Test3</a>"
echo '</li>'
echo '<li>'
echo "<a id=link4 href=\"javascript:loadtest(4, 'tests/c/test4/test.html')\" >Test4</a>"
echo '</li>'
echo '<li>'
echo "<a href=\"javascript:loadreport()\" >Bilan</a>"
echo '</li>'
echo '</ul>'
echo '</nav>'

echo '<section id="main_section">'
echo '<p>Choisissez une question et soumettez votre réponse une fois que vous etes sures.Au bout de 30minutes la soumission sera automatiquement réalisée.</p>'
echo '</section>'



