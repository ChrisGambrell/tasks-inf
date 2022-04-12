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