class UserPolicy < ApplicationPolicy
  def index?
    record === user
  end

  def show?
    record === user
  end
end
