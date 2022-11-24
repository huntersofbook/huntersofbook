#!/bin/bash
cd ./scripts
COD1=$1
COD2=$2
pnpm install
echo "Installing dependencies... ${COD1}"

if [[ $COD1 == "install" ]]
then
    echo "install"
    pnpm tsx ./src/install.ts
elif [[ $COD1 == "lint" ]]
then
    pnpm tsx ./src/lint.ts lint
elif [[ $COD1 == "build" ]]
then
    echo "build"
    pnpm tsx ./src/build.ts build
elif [[ $COD1 == "lint-fix" ]]
then
    pnpm tsx ./src/lint.ts lint:fix
else
     echo "son"
    pnpm tsx ./src/install.ts $1 $2
fi

