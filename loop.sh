#!/usr/bin/env bash

update_status() {
  /app/status.sh > /app/public/status.json 2>&1
  echo "Status updated!"
}

while true; do
  update_status
  sleep 60
done
