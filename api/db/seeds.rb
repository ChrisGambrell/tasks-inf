# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Task.create(title: 'Double-click this to-do', notes: 'You\'re looking at a to-do! Complete it by clicking the checkbox on the left. Completed to-dos are collected at the bottom of your project.')
Task.create(title: 'Create a new to-do', notes: 'Your turn - just hit the plus button on the toolbar at the bottom.')
Task.create(title: 'Add this to-do to your Today list', notes: 'Click the calendar button below to plan when you\'ll do this to-do. Choose Today.')
Task.create(title: 'Plan this to-do for later', notes: 'Click the calendar button again, but this time, choose a date in the future. It will automatically appear in your Today list when the date comes.\n\nUpcoming to-dos are grouped together at the bottom of each section.')
