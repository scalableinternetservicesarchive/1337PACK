class Comment < ApplicationRecord
    validates :content,
              presence: true,
              length: { maximum: 250 }
    validates :user_name,
              presence: true,
              length: { maximum: 20 }
    # comment has to be on a event
    validates :event_id,
              presence: true
    belongs_to :event
end
