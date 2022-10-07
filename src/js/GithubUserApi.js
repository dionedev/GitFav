export class GithubUserApi {
  static searchUser(username) {
    const apiAdress = `https://api.github.com/users/${username}`

    return fetch(apiAdress)
      .then((data) => data.json())
      .then((data) => {
        const { login, name, public_repos, followers } = data

        return {
          login,
          name,
          public_repos,
          followers
        }
      })
  }
}