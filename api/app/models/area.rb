class Area < ApplicationRecord
    has_many :projects, dependent: :destroy
    has_many :tasks, dependent: :destroy
end
