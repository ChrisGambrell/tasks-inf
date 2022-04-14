class AddOpenToArea < ActiveRecord::Migration[7.0]
  def change
    add_column :areas, :open, :boolean
  end
end
