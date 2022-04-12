class Project < ApplicationRecord
  belongs_to :areaId, optional: true
  has_many :headers, dependent: :nullify
  has_many :tasks, dependent: :nullify
end
