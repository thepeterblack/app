defmodule Api.Keeper.Participant do
  use Ecto.Schema
  import Ecto.Changeset

  alias Api.{Accounts.User, Keeper.Box, Keeper.Participant, Keeper.Position}


  schema "participants" do
    belongs_to :user, User
    belongs_to :box, Box

    timestamps()
  end

  def changeset(participant, attrs) do
    participant
    |> cast(attrs, [])
    |> validate_required([])
  end

  def changeset(participant, user, attrs) do
    changeset(participant, attrs)
    |> put_assoc(:user, user)
  end

end
