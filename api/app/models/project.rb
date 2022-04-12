class Project < ApplicationRecord
  belongs_to :areaId, optional: true
  has_many :headers, dependent: :nullify
end
