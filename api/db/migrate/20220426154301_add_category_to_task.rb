class AddCategoryToTask < ActiveRecord::Migration[7.0]
  def change
    add_column :tasks, :category, :string
  end
end
