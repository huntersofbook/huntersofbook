#!/bin/bash
cd scripts
echo "pnpm tsx $1 $2"
if [ $1 == "install" ]
then
    pnpm tsx install.ts
    echo "install"
elif [ $1 == 'test' ]
then
    pnpm tsx test.ts
    echo "test"
else
    pnpm tsx install.ts $1 $2
    echo "else"
fi

