class Event < ApplicationRecord
    belongs_to :user, optional: true
    has_many :comments, dependent: :destroy
    has_many :invites, dependent: :destroy
    has_many :rsvps, dependent: :destroy
end
