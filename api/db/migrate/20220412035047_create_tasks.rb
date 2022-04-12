class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :notes
      t.boolean :completed
      t.timestamp :completed_when
      t.timestamp :when

      t.timestamps
    end
  end
end
