class AddProjectIdToHeader < ActiveRecord::Migration[7.0]
  def change
    add_reference :headers, :project, foreign_key: true
  end
end
