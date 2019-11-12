class Invite < ApplicationRecord
    validates :message,
              length: { maximum: 250}
    # must associate with an event
    validates :event_id,
              presence: true
    # must have a target email
    validates :guest_email,
              presence: true
end
