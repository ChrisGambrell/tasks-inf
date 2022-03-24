class AddWhenToTask < ActiveRecord::Migration[7.0]
  def change
    add_column :tasks, :when, :datetime
  end
end
