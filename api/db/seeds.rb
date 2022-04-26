# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

area1 = Area.create(title: 'University of Kentucky')

project1 = Project.create(area_id: nil, title: 'Reminders', icon: 'bookmark')
project2 = Project.create(area_id: nil, title: 'Meet Things for Mac', description: 'This project shows you everything you need to know to hit the ground running. Don’t hesitate to play around in it – you can always create a new one from the Help menu.', icon: 'handshake')
project3 = Project.create(area_id: 1, title: 'COM 101', icon: 'person-chalkboard')
project3 = Project.create(area_id: 1, title: 'CS 371', icon: 'network-wired')

header1 = Header.create(project_id: 2, title: 'Learn the basics')
header2 = Header.create(project_id: 2, title: 'Tune your setup')

task1 = Task.create(header_id: 1, project_id: 2, title: 'Double-click this to-do', notes: 'You’re looking at a to-do! Complete it by clicking the checkbox on the left. Completed to-dos are collected at the bottom of your project.',	completed: false, completed_when: nil,	when: Time.current.beginning_of_day)
task2 = Task.create(header_id: 1, project_id: 2, title: 'Create a new to-do', notes: 'Your turn – just hit ⌘N on your keyboard.', completed: false, completed_when: nil, when: Time.current.beginning_of_day + 1.day)
task3 = Task.create(header_id: 1, project_id: 2, title: 'Add this to-do to your Today list', notes: 'Click the calendar button below to plan when you’ll do this to-do. Choose Today.',	completed: true, completed_when: Time.current.beginning_of_day - 1.day,	when: Time.current.beginning_of_day)
task4 = Task.create(header_id: 1, project_id: 2, title: 'Plan this to-do for later', notes: 'Click the calendar button again, but this time, choose a date in the future. It will automatically appear in your Today list when the date comes. Upcoming to-dos are grouped together at the bottom of each section.', completed: false, completed_when: nil,	when: Time.current.beginning_of_day + 7.days)
task5 = Task.create(header_id: 1, project_id: 2, title: 'Create a new heading', notes: 'Go to File → New Heading to create a heading, then drag this to-do under it.', completed: true, completed_when: Time.current.beginning_of_day, when: Time.current.beginning_of_day + 6.days)
task6 = Task.create(header_id: 1, project_id: 2, title: 'Create a project', notes: 'On to bigger things! At the bottom of the sidebar, click “+ New List” to add a project of your own.', completed: true, completed_when: Time.current.beginning_of_day - 4.days, when: Time.current.beginning_of_day + 10.days)
task7 = Task.create(header_id: nil, project_id: 2, title: 'Task without header & without description', notes: nil, completed: false, completed_when: nil, when: Time.current.beginning_of_day + 1.month)
task8 = Task.create(header_id: 1, project_id: 2, title: 'Organize with areas', notes: 'Create an area for each sphere of your life, such as Work, Family, Finance, and so on. You can drop your projects into them to stay organized. At the bottom of the sidebar, click “+ New List” to create one. Unlike projects, areas are never completed.',	completed: true, completed_when: Time.current.beginning_of_day - 1.day, when: Time.current.beginning_of_day + 10.days)
task9 = Task.create(header_id: 1, project_id: 2, title: "You're done!",	notes: 'That’s all you really need to know. Feel free to start adding your own projects and to-dos. You can come back to this project later to learn the advanced features below. When you’re done with the project, click the progress ring at the top to mark it complete. We hope you’ll enjoy using Things!', completed: true, completed_when: Time.current.beginning_of_day - 2.months - 2.days, when: nil)
task10 = Task.create(header_id: 2, project_id: 2, title: 'Show your calendar events', notes: 'You can connect your calendars to Things and see all of your events and to-dos together. Go to Things → Preferences → Calendar Events to turn it on.', completed: false, completed_when: nil, when: Time.current.beginning_of_day + 4.months)
task11 = Task.create(header_id: 2, project_id: 2, title: 'Add some widgets', notes: 'Widgets let you quickly access to your lists while working in other apps. You can add as many as you like. Here’s how:', completed: true, completed_when: Time.current.beginning_of_day - 1.year - 6.months, when: Time.current.beginning_of_day + 4.months + 2.days)
task12 = Task.create(header_id: 2, project_id: 2, title: 'Sync your devices', notes: 'Things Cloud keeps your to-dos in sync across your Mac, iPhone, and iPad. Go to Things → Preferences → Things Cloud to create a free account. Even if you only use one device, you should still create a Things Cloud account – this ensures your data is always safely backed up.', completed: false, completed_when: nil, when: Time.current.beginning_of_day + 1.year + 2.months)
