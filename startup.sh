#!/usr/bin/env bash

update_status() {
  /app/status.sh > /app/public/status.json 2>&1
  echo "Status updated!"
}

update_incidents() {
  /app/incidents.sh > /app/public/incidents.json 2>&1
  echo "Incidents updated!"
}

update_planned_maintenance() {
/app/planned_maintenance.sh > /app/public/planned_maintenance.json 2>&1
echo "Planned maintenance updated!"
}

update_incidents
update_planned_maintenance

while true; do
  update_status
  sleep 60
done
