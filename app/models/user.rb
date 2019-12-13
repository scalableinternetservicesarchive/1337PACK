class User < ApplicationRecord
  # only store lowercase email addresses
  before_save { email.downcase! }
  # regex used for email format validation
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email,
            presence: true, length: { maximum: 255 },
            format: { with: VALID_EMAIL_REGEX },
            uniqueness: { case_sensitive: false }
  has_secure_password
  validates :password,
            presence: true, length: { minimum: 6 }, :on => :create
  has_many :events, dependent: :destroy
  has_many :invites
  has_many :rsvps
end
