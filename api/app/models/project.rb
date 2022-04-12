class Project < ApplicationRecord
  belongs_to :areaId, optional: true
end
