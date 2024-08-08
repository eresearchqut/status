#!/usr/bin/env bash

# Define input CSV files
INCIDENTS_FILE="incidents.csv"
PAST_INCIDENTS_FILE="past_incidents.csv"
LAST_UPDATED=$(date +"%Y-%m-%dT%H:%M:%S%z")

command_exists(){
    if ! command -v "${1}" >/dev/null 2>&1; then
        echo >&2 "Error: ${1} missing. Please install it"
        exit 1
    fi
}

trim_spaces() {
  echo "$1" | sed 's/^[ \t]*//;s/[ \t]*$//'
}

# Initialize JSON structure
json_output=$(cat <<EOF
{
  "last_updated": "$LAST_UPDATED",
  "current_incidents": [],
  "past_incidents": []
}
EOF
)

convert_csv_to_json() {
  local csv_file=$1
  local json_array_name=$2
  local json_objects=""

  while IFS=',' read -r date service reason; do
    # Trim spaces
    date=$(trim_spaces "$date")
    service=$(trim_spaces "$service")
    reason=$(trim_spaces "$reason")

    # Create JSON object for each row
    json_object=$(cat <<EOF
    {
      "date": "$date",
      "service": "$service",
      "reason": "$reason"
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

load_current_incidents() {
  local json_objects=""

  while IFS=',' read -r name detected status; do
    # Check for no ongoing incidents
    if [[ "$name" == "" ]]; then
      break
    fi

    # Trim spaces
    name=$(trim_spaces "$name")
    detected=$(trim_spaces "$detected")
    status=$(trim_spaces "$status")

    # Create JSON object for each row
    json_object=$(cat <<EOF
    {
      "name": "$name",
      "detected": "$detected",
      "status": "$status"
    }
EOF
)
    if [ -z "$json_objects" ]; then
      json_objects="$json_object"
    else
      json_objects="$json_objects, $json_object"
    fi
  done < <(tail -n +1 "$INCIDENTS_FILE")

  # Add JSON objects to the main JSON structure
  if [ -n "$json_objects" ]; then
    json_output=$(echo "$json_output" | jq ".current_incidents = [$json_objects]")
  fi
}

command_exists 'jq'

# Process the CSV files
load_current_incidents
convert_csv_to_json "$PAST_INCIDENTS_FILE" "past_incidents"

# Output the final JSON structure
echo "$json_output"
