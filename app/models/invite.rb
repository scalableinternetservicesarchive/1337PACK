class Invite < ApplicationRecord
    validates :user_id,
              presence: true
    validates :message,
              length: { maximum: 1000}
    validates :event_id,
              presence: true
    belongs_to :event
    belongs_to :user
end
