class Comment < ApplicationRecord
    validates :content,
              presence: true,
              length: { maximum: 250}
    # allow anonymous
    validates :user_id,
              presence: false
    # comment has to be on a event
    validates :event_id,
              presence: true
end
