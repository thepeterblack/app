defmodule ApiWeb.AuthController do
  use ApiWeb, :controller

  action_fallback ApiWeb.FallbackController

  alias Api.Accounts
  alias Api.Accounts.User
  alias Api.Guardian

  require IEx

  def sign_up(conn, %{"auth" => user_params}) do
    with {:ok, %User{} = user} <- Accounts.create_user(user_params),
         {:ok, token, _claims} <- Guardian.encode_and_sign(user) do

      conn |> render("auth.json", user: user, token: token)
    end
  end

  def sign_in(conn, %{"email" => email, "password" => password}) do
    case Accounts.token_sign_in(email, password) do
      {:ok, token, user} ->
        conn |> render("auth.json", token: token, user: user)
      _ ->
        {:error, :unauthorized}
    end
  end

  def logout(conn, _) do
    conn
    |> Accounts.logout
    |> render("logout.json")
  end

  def current() do

  end
end