# tasks-inf

This is still a work-in-progress. The app is mostly functional, but some features are still disabled or marked as "TODO."

## What is Tasks-Inf?

Tasks-Inf is an application modeled after Culture Code's [Things 3](https://culturedcode.com/things/). This is a paid application ($49 for Mac, $19 for iPad, $9 for iPhone) which won WWDC17's Apple Design Award. I wanted to be able to use this app without having to pay for it, and also wanted a fun project to display my skills.

Tasks-Inf has (for completed, non-TODO features) the same exact styling as the Things 3 application. I wanted to display my ability to make an exact-copy of another UI with only seeing the design and not having any of the code to create it.

I started the app with some mock data while styling. I then hooked the app up to a Rails API which is now where it is fetching its data from. Again, the app is still in development and some features have yet to be completed, but as of now you can **create** a task, **update** some of the values of the task including the date its due and its completed state, and also **delete** tasks.

Right now, the main features of the app that are availible is seeing how the data is displayed. There are different areas which house projects, and projects which house tasks and headers. The "Meet Things for Mac" project has most of the created tasks showing how a task is displayed, what it looks like with and without a data, if that date is today, if it is completed, etc. There are also some menus in the project that can be opened using the ellipsis or the context menu by right-clicking on a task. (Some of these menu functions are still TODO, but some work as well as some hot keys).

The today view will show all tasks due today. The upcoming page shows all upcoming tasks, and the logbook page shows completed tasks and when they were completed.

## How to run

### Start API

`cd api && bundle install && rails db:migrate && rails db:seed && rails s`

The API should be running on `http://localhost:3000`

## Start web-app

`cd client && npm i && npm start`

The app should ask if you want to start it on `http://localhost:3001`
