#!/bin/bash
COD1=$1
COD2=$2

if [[ $COD1 == "docs" ]]
then
    cd ./docs
    pnpm install
elif [[ $COD1 == "auth-vue" ]]
then
    cd ./projects/auth-vue
    pnpm install
elif [[ $COD1 == "chatwoot" ]]
then
    cd ./projects/chatwoot
    pnpm install
elif [[ $COD1 == "core" ]]
then
    cd ./projects/core
    pnpm install
elif [[ $COD1 == "huntersofbook" ]]
then
    cd ./projects/huntersofbook
    pnpm install
elif [[ $COD1 == "naive-ui-nuxt" ]]
then
    cd ./projects/naive-ui-nuxt
    pnpm install
elif [[ $COD1 == "plausible" ]]
then
    cd ./projects/plausible
    pnpm install
elif [[ $COD1 == "revenuecat" ]]
then
    cd ./projects/revenuecat
    pnpm install
elif [[ $COD1 == "schob" ]]
then
    cd ./projects/schob
    pnpm install
elif [[ $COD1 == "scripts" ]]
then
    cd ./projects/scripts
    pnpm install
else
    echo $1 $2 $3 $4 $5 $6 $7 $8 $9
fi

