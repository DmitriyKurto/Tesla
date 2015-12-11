# Web-application - Tesla Power Wall

Install:

    $ git clone https://github.com/DmitriyKurto/Tesla.git
    $ npm install
    $ bower install


# Overall Directory Structure
at a high level, the structure looks roughly like this:

    Tesla/
    |- app/
    | |- css/
    
    | | |- scss/
    | |- img/
    | |- js/
    | | |- controllers/
    | | |- directives/
    | | |- services/
    | |-pages/
    | |- index.html
    |- .gitingnore
    |- bower.json
    |- gulpfile.js
    |- package.json

# Build

Path to built project:

    Tesla/
    |- dist/


 1.to build project run:

    gulp 

 2.to run webserver:

    gulp webserver

 3.to run watcher:

    gulp watch

# Purpose
The application is designed to work with Tesla Power Wall (further TPW).

Capabilities:

 1. TPW indicators mapping
 2. TPW charge method choice
 3. visual data displaying via graphs
 4. addition / removal of devices connected to a TWP
 5. TPW manual data entry

# Pages for example

![img dashboard](http://www.imageup.ru/img95/2297446/1.jpg)

![img statistic](http://www.imageup.ru/img95/2297447/2.png)

