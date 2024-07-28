#!/usr/bin/env bash

update_status() {
  /app/status.sh > /app/public/status.json 2>&1
  echo "Status updated!"
}

update_incidents() {
  /app/incidents.sh > /app/public/incidents.json 2>&1
  echo "Incidents updated!"
}

while true; do
  update_status
  update_incidents
  sleep 60
done
