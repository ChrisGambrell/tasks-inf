class Project < ApplicationRecord
  belongs_to :areaId, optional: true
  has_many :headers, dependent: :destroy
  has_many :tasks, dependent: :destroy
end
