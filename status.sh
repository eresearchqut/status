#!/usr/bin/env bash

timeout=10
tmp="$(mktemp -d)"
checkfile="${1:-checks.csv}"
failonoutage=false
useragent="User-Agent: Mozilla/5.0 (X11; Linux x86_64; Debian) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36"

command_exists(){
    if ! command -v "${1}" >/dev/null 2>&1; then
        echo >&2 "Error: ${1} missing. Please install it"
        exit 1
    fi
}

get_element(){
    echo "${2}" | awk -v col="${1}" -F',' '{gsub(/^[ \t]+|[ \t]+$/, "", $col); print $col}'
}

check(){
    ctype="${1}"
    host="${2}"
    name="${3}"
    expectedcode="${4}"

    # Sanitize the name by replacing / with _ so it will not be treated as part of file path.
    tmp_name="$(echo "${name}" | sed 's,/,_,' )"

    IPv="$(echo "${ctype}" | grep -o '[46]$')"
    case "${ctype}" in
        http*)
            statuscode="$(curl -${IPv}sSkLo /dev/null -H "${useragent}" -m "${timeout}" -w "%{http_code}" "${host}" 2> "${tmp}/ko/${tmp_name}.error")";;
        ping*)
            ping -${IPv}W "${timeout}" -c 1 "${host}" >/dev/null 2>&1
            statuscode=$?
            [ "${statuscode}" -ne "${expectedcode}" ] && echo 'Host unreachable' > "${tmp}/ko/${tmp_name}.error";;
        port*)
            error="$(nc -${IPv}w "${timeout}" -zv ${host} 2>&1)"
            statuscode=$?
            [ "${statuscode}" -ne "${expectedcode}" ] && echo "${error}" > "${tmp}/ko/${tmp_name}.error";;
    esac

    # verity status and write files
    if [ "${statuscode}" -eq "${expectedcode}" ]; then
        echo "${statuscode}" > "${tmp}/ok/${tmp_name}.status"
    else
        echo "${statuscode}" > "${tmp}/ko/${tmp_name}.status"
    fi
    if [ -s "${tmp}/ko/${tmp_name}.error" ]; then
        sed "${tmp}/ko/${tmp_name}.error" \
          -e 's,curl: ([0-9]*) ,,' \
          -e 's,.*) failed: ,,' > "${tmp}/ko/${tmp_name}.status"
    fi
}

command_exists 'curl'
command_exists 'nc'
command_exists 'ping'
mkdir -p "${tmp}/ok" "${tmp}/ko" || exit 1

while IFS="$(printf '\n')" read -r line; do
    ctype="$(get_element 1 "${line}")"
    code="$(get_element 2 "${line}")"
    name="$(get_element 3 "${line}")"
    host="$(get_element 4 "${line}")"
    check "${ctype}" "${host}" "${name}" "${code}" &
done < "${checkfile}"
wait

joinByChar() {
  local IFS="$1"
  shift
  echo "$*"
}

services=()

for file in "${tmp}/ko/"*.status; do
    [ -e "${file}" ] || continue
    name="$(basename "${file}" | sed 's,.status$,,')"
    display_name="${name//_/\/}"
    status="$(cat "${file}")"
    services+=("{\"name\":\"${display_name}\",\"status\":\"FAILURE\",\"error\":\"${status}\"}")
done
for file in "${tmp}/ok/"*.status; do
    [ -e "${file}" ] || continue
    name="$(basename "${file}" | sed 's,.status$,,')"
    display_name="${name//_/\/}"
    services+=("{\"name\":\"${display_name}\",\"status\":\"OK\"}")
done

last_updated=$(date +"%Y-%m-%dT%H:%M:%S%z")
printf -v joined '%s,' "${services[@]}"
echo "{\"last_updated\":\"${last_updated}\",\"services\":[${joined%,}]}"
