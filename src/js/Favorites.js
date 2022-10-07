import { GithubUserApi } from "./GithubUserApi.js"

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.loadUserData()
  }

  loadUserData() {
    this.userEntity = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  saveToLocalStorage() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.userEntity))
  }

  async addUser(username) {
    try {
      const userExists = this.userEntity.find((userEnt) => userEnt.login === username)
      
      if(userExists) {
        throw new Error('Ops! Usuário já cadastrado.')
      }

      const githubUser = await GithubUserApi.searchUser(username)

      if(githubUser.login === undefined) {
        throw new Error(`Ops! Usuário ${username} não existe.`)
      }

      this.userEntity = [githubUser, ...this.userEntity]
      this.updateTable()
      this.saveToLocalStorage()
    }
    catch(error) {
      alert(error.message)
    }
  }

  deleteUser(user) {
    const filteredUserEntity = this.userEntity.filter((userEnt) => {
      return userEnt.login !== user.login
    })

    this.userEntity = filteredUserEntity
    this.updateTable()
    this.saveToLocalStorage()
  }
}
