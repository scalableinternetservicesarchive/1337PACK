class Comment < ApplicationRecord
    validates :content,
              length: { maximum: 250}
    validates :user_id,
              presence: false
end
