#!/usr/bin/env bash
npm run build && rsync -azv --progress --delete ./dist/ kutalo:/var/www/carfinance
