#!/bin/bash
cd ./scripts
ls
echo "pnpm tsx $1 $2"
if [ $1 -eq "install" ]
then
    pnpm tsx install.ts
    echo "install"
elif [ $1 -eq 'lint' ]
then
    pnpm tsx lint.ts lint
    echo "lint"
elif [ $1 -eq 'lint-fix' ]
then
    pnpm tsx lint.ts lint:fix
    echo "lint"
else
    pnpm tsx install.ts $1 $2
    echo "else"
fi

