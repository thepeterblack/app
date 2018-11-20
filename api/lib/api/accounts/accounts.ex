defmodule Api.Accounts do

  alias Api.Repo
  alias Api.Accounts.User
  alias Api.Guardian

  import Ecto.Query, warn: false
  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]

  require IEx

  def list_users do
    Repo.all(User)
  end

  def get_user!(id), do: Repo.get!(User, id)

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

  def token_sign_in(email, password) do
    case email_password_auth(email, password) do
      {:ok, user} ->
        case Guardian.encode_and_sign(user) do
          {:ok, token, _claims} -> {:ok, token, user}
          _ -> {:error, :unauthorized}
        end
      _ ->
        {:error, :unauthorized}
    end
  end

  def get_by_email(email) when is_binary(email) do
    case Repo.get_by(User, email: email) do
      nil ->
        dummy_checkpw()
        {:error, "Login error."}
      user ->
        {:ok, user}
    end
  end

  defp email_password_auth(email, password) when is_binary(email) and is_binary(password) do
    with {:ok, user} <- get_by_email(email),
         do: verify_password(password, user)
  end

  defp verify_password(password, %User{} = user) when is_binary(password) do
    if checkpw(password, user.password_hash) do
      {:ok, user}
    else
      {:error, :invalid_password}
    end
  end
end
