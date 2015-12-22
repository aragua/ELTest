#!/bin/sh

TMP=$PWD/../tmp/

echo '<p>'
cat $TMP/report | sed -e 's/-$//g' | sed -e 's/$/<br>/g'
echo '</p>'
