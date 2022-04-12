class Area < ApplicationRecord
    has_many :projects, dependent: :nullify
end
