#!/bin/sh

echo '<p>'
cat /tmp/ELTest-report | sed -e 's/-$//g' | sed -e 's/$/<\/br>/g'
echo '</p>'