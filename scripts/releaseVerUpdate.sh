#!/bin/bash
grep "^Release" ../releasenote.txt | tail -1 > ../src/main/frontend/public/latestReleaseVer.txt
echo "Release Version Updated"
