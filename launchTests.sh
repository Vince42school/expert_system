#!/bin/bash
RED='\033[0;31m'
GRE='\033[0;32m'
NC='\033[0m'

printf "${GRE}*************Error TEST************\n\n${NC}"

printf "\nOn testFiles/empty\n"
node expertSys.js testFiles/empty

printf "\nOn testFiles/falseBracket\n"
node expertSys.js testFiles/falseBracket

printf "\nOn testFiles/falseRules\n"
node expertSys.js testFiles/falseRules

printf "\nOn testFiles/partial\n"
node expertSys.js testFiles/partial

printf "\n${GRE}*************Resolution TEST*******\n\n${NC}"


printf "\nOn testFiles/proper\n"
node expertSys.js testFiles/proper
