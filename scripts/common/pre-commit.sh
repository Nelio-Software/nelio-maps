#!/bin/bash
# shellcheck disable=SC2207

CHANGED_FILES=$(git status --porcelain --untracked-files=all | awk '{print $2}' | grep "...")
OK="\033[30;42m OK \033[0m"
ERROR="\033[37;41m ERROR \033[0m"
ALL_GOOD="\n\n   \033[30;42m              \033[0m\n   \033[30;42m   ALL GOOD   \033[0m\n   \033[30;42m              \033[0m\n\n"

LOG="/tmp/nab-precommit.log"
rm -f "$LOG"

print_error_message() {
	echo -e " $ERROR"
	echo -e "\033[38;5;250m"
	tail -n100 "$LOG"
	echo -e "\n\033[36m"
	if [ "$(wc -l <$LOG)" -gt 100 ]; then
		echo -e "❌ Pre-commit failed! Full log at $LOG."
	else
		echo -e "❌ Pre-commit failed!"
	fi
	echo -e "\033[0m"
}

echo -e "\033[36m🔍 Pre-commit checks running… please wait\033[0m"

files=$(echo "$CHANGED_FILES" | grep "\.php$\|\.html$" | grep -v "stubs/")
if [ "$(echo "$files" | grep -vc '^$')" -gt 0 ]; then
	echo -n "      yarn format:php"
	# shellcheck disable=SC2086
	if ! yarn format:php $files >/dev/null 2>&1; then
		echo -ne "\\b"
		echo -e " $ERROR"
		exit 10
	else
		echo -e " $OK"
	fi

	echo -n "      yarn lint:php  "
	# shellcheck disable=SC2086
	if ! yarn lint:php $files >"$LOG" 2>&1; then
		print_error_message
		exit 11
	else
		echo -e " $OK"
	fi
fi

files=$(echo "$CHANGED_FILES" | grep "\.[jt]sx\?$")
if [ "$(echo "$files" | grep -vc '^$')" -gt 0 ]; then
	echo -n "      yarn format:js "
	# shellcheck disable=SC2086
	if ! yarn format:js $files >/dev/null 2>&1; then
		echo -e " $ERROR"
		exit 12
	else
		echo -e " $OK"
	fi

	echo -n "      yarn lint:js   "
	# shellcheck disable=SC2086
	if ! yarn lint:js $files >"$LOG" 2>&1; then
		echo -e " $ERROR"
		exit 13
	else
		echo -e " $OK"
	fi
fi

files=$(echo "$CHANGED_FILES" | grep "\.s\?css$")
if [ "$(echo "$files" | grep -vc '^$')" -gt 0 ]; then
	echo -n "      yarn format:css"
	# shellcheck disable=SC2086
	if ! yarn format:css $files >/dev/null 2>&1; then
		echo -e " $ERROR"
		exit 14
	else
		echo -e " $OK"
	fi

	echo -n "      yarn lint:css  "
	# shellcheck disable=SC2086
	if ! yarn lint:css $files >"$LOG" 2>&1; then
		echo -e " $ERROR"
		exit 15
	else
		echo -e " $OK"
	fi
fi

echo -e "$ALL_GOOD"
