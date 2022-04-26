# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_04_20_032448) do
  create_table "areas", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "open"
  end

  create_table "headers", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "project_id"
    t.boolean "completed"
    t.datetime "completed_when"
    t.index ["project_id"], name: "index_headers_on_project_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "icon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "area_id"
    t.datetime "when"
    t.datetime "deadline"
    t.index ["area_id"], name: "index_projects_on_area_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "title"
    t.text "notes"
    t.boolean "completed"
    t.datetime "completed_when", precision: nil
    t.datetime "when", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "header_id"
    t.integer "project_id"
    t.integer "area_id"
    t.datetime "deadline"
    t.index ["area_id"], name: "index_tasks_on_area_id"
    t.index ["header_id"], name: "index_tasks_on_header_id"
    t.index ["project_id"], name: "index_tasks_on_project_id"
  end

  add_foreign_key "headers", "projects"
  add_foreign_key "projects", "areas"
  add_foreign_key "tasks", "areas"
  add_foreign_key "tasks", "headers"
  add_foreign_key "tasks", "projects"
end
