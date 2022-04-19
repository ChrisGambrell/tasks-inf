class AddCompletedToHeader < ActiveRecord::Migration[7.0]
  def change
    add_column :headers, :completed, :boolean
    add_column :headers, :completed_when, :datetime
  end
end
