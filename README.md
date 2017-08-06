# A project

## Installation

1. Clone this
1. Open console and go to project directory
1. Type `npm i`

## Build project

1. Type `npm run build`
1. Project is compiled and placed in `dist` directory
1. Place files from `dist` to your server. For instance you can use `rsync` utility

## Hot reload running

1. Type `npm start`
1. Open `http://localhost:8000`

## Face templates

Templates are located in `src/app/share/templates/`.

### When you need to make new template

1. Clone `src/app/share/templates/example.html` and put changes into new template
1. Add new template into array `templates` in `src/app/share/face.service.ts`
