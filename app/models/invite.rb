class Invite < ApplicationRecord
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
    validates :guest_email,
              presence: true, length: { maximum: 255 },
              format: { with: VALID_EMAIL_REGEX },
              uniqueness: { case_sensitive: false }
    validates :message,
              length: { maximum: 1000}
    validates :event_id,
              presence: true

end
