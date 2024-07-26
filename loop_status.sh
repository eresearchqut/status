#!/usr/bin/env bash

while true; do
    /app/status.sh > /app/public/status.json 2>&1
    echo "Status updated!"
    sleep 60
done
