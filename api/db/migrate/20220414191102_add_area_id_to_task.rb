class AddAreaIdToTask < ActiveRecord::Migration[7.0]
  def change
    add_reference :tasks, :area, foreign_key: true
  end
end
