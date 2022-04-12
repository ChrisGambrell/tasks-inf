class AddAreaIdToProject < ActiveRecord::Migration[7.0]
  def change
    add_reference :projects, :area, foreign_key: true
  end
end
