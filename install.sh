#!/bin/bash
cd scripts
echo "pnpm tsx $1 $2"
if $1 == "install" 
then
    pnpm tsx install.ts
else
    pnpm tsx install.ts $1 $2
fi

