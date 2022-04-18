class AddWhenToProject < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :when, :datetime
  end
end
