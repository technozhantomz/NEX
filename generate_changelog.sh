#!/bin/bash

OUTPUT_FILE="CHANGELOG.md"
echo "# Changelog" > $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

for tag in $(git tag --sort=-creatordate)
do
  echo "## ${tag}" >> $OUTPUT_FILE
  echo "" >> $OUTPUT_FILE
  git log --pretty=format:'- %s (%cd) <%an>' --date=short ${tag}^..${tag} >> $OUTPUT_FILE
  echo "" >> $OUTPUT_FILE
done
