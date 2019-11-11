class Event < ApplicationRecord
    validates :end_time,
              presence: false
end
