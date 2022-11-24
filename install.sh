#!/bin/bash
cd ./scripts
COD1=$1
COD2=$2
pnpm install

if [[ $COD1 == "install" ]]
then
    pnpm tsx ./src/install.ts
elif [[ $COD1 == "lint" ]]
then
    pnpm tsx ./src/lint.ts lint
elif [[ $COD1 == "build" ]]
then
    pnpm tsx ./src/build.ts build
elif [[ $COD1 == "lint-fix" ]]
then
    pnpm tsx ./src/lint.ts lint:fix
else
    pnpm tsx ./src/install.ts $1 $2 $3 $4 $5 $6 $7 $8 $9
fi

