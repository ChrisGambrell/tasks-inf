class AddHeaderAndProjectIdToTask < ActiveRecord::Migration[7.0]
  def change
    add_reference :tasks, :header, foreign_key: true
    add_reference :tasks, :project, foreign_key: true
  end
end
