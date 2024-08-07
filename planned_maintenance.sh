#!/usr/bin/env bash

PLANNED_MAINTENANCE_FILE="planned_maintenance.csv"
LAST_UPDATED=$(date +"%Y-%m-%dT%H:%M:%S%z")

command_exists() {
    if ! command -v "${1}" >/dev/null 2>&1; then
        echo >&2 "Error: ${1} missing. Please install it"
        exit 1
    fi
}

trim_spaces() {
  echo "$1" | sed 's/^[ \t]*//;s/[ \t]*$//'
}

json_output=$(cat <<EOF
{
  "last_updated": "$LAST_UPDATED",
  "planned_maintenance": []
}
EOF
)

convert_csv_to_json() {
  local csv_file=$1
  local json_array_name=$2
  local json_objects=""

  while IFS=',' read -r service date_time_from date_time_to impact; do
    # Trim spaces
    service=$(trim_spaces "$service")
    date_time_from=$(trim_spaces "$date_time_from")
    date_time_to=$(trim_spaces "$date_time_to")
    impact=$(trim_spaces "$impact")

    # Create JSON object for each row
    json_object=$(cat <<EOF
    {
      "service": "$service",
      "date_time_from": "$date_time_from",
      "date_time_to": "$date_time_to",
      "impact": "$impact"
    }
EOF
)
    if [ -z "$json_objects" ]; then
      json_objects="$json_object"
    else
      json_objects="$json_objects, $json_object"
    fi
  done < <(tail -n +1 "$csv_file")

  # Add JSON objects to the main JSON structure
  if [ -n "$json_objects" ]; then
    json_output=$(echo "$json_output" | jq ".${json_array_name} = [$json_objects]")
  fi
}

command_exists 'jq'

# Process the CSV files
convert_csv_to_json "$PLANNED_MAINTENANCE_FILE" "planned_maintenance"

# Output the final JSON structure
echo "$json_output"
