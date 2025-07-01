#!/bin/bash
cd /home/kavia/workspace/code-generation/taskmaster-97731-f25f0099/to_do_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

