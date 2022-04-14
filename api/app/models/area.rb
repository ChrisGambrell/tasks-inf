class Area < ApplicationRecord
    has_many :projects, dependent: :nullify
    has_many :tasks, dependent: :nullify
end
