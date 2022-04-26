class AddDeadlineToProject < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :deadline, :datetime
  end
end
