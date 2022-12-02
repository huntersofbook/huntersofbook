#!/bin/bash
COD1=$1
COD2=$2

if [[ $COD1 == "docs" ]]
then
    cd ./docs
    pnpm install
    pnpm lint
    pnpm build
elif [[ $COD1 == "auth-vue" ]]
then
    cd ./projects/auth-vue
    pnpm install
    pnpm lint
    pnpm build
elif [[ $COD1 == "chatwoot" ]]
then
    cd ./projects/chatwoot
    pnpm install
    pnpm lint
    pnpm build
elif [[ $COD1 == "core" ]]
then
    cd ./projects/core
    pnpm install
    pnpm lint
    pnpm build
elif [[ $COD1 == "huntersofbook" ]]
then
    cd ./projects/huntersofbook
    pnpm install
    pnpm lint
    pnpm build
elif [[ $COD1 == "naive-ui-nuxt" ]]
then
    cd ./projects/naive-ui-nuxt
    pnpm install
    pnpm lint
    pnpm build
elif [[ $COD1 == "plausible" ]]
then
    cd ./projects/plausible
    pnpm install
    pnpm lint
    pnpm build
elif [[ $COD1 == "revenuecat" ]]
then
    cd ./projects/revenuecat
    pnpm install
    pnpm lint
    pnpm build
elif [[ $COD1 == "schob" ]]
then
    cd ./projects/schob
    pnpm install
    pnpm lint
    pnpm build
elif [[ $COD1 == "scripts" ]]
then
    cd ./projects/scripts
    pnpm install
    pnpm lint
    pnpm build
else
    echo $1 $2 $3 $4 $5 $6 $7 $8 $9
fi

