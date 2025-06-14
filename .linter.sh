#!/bin/bash
cd /home/kavia/workspace/code-generation/cyberguard-ai-43120-bd527930/cyberguardianbackend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

