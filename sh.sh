#!/bin/bash
clear
i=1
while(($i<10000))
do
echo $i
node "./clientTest.js"
i=$(($i+1))
done