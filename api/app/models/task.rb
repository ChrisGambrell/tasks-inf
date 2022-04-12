class Task < ApplicationRecord
    belongs_to :project, optional: true
    belongs_to :header, optional: true
end
