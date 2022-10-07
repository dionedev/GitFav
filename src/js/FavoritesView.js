import { Favorites } from "./Favorites.js"

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')
    this.updateTable()
    this.addUserEvent()
  }

  updateTable() {
    this.removeAllTableRows()
    this.createRowWithUserData()

    this.userEntity.forEach((user) => {
      const tagTd = this.createRowWithUserData()

      tagTd.querySelector('.user img').src = `https://github.com/${user.login}.png`
      tagTd.querySelector('.user img').alt = `Foto de perfil do usuário ${user.name}`
      tagTd.querySelector('.user a').href = `https://github.com/${user.login}`
      tagTd.querySelector('.user p').textContent = user.name
      tagTd.querySelector('.user span').textContent = `/${user.login}`

      tagTd.querySelector('.repositories').textContent = user.public_repos
      tagTd.querySelector('.followers').textContent = user.followers

      tagTd.querySelector('.trash').onclick = () => {
        const isOK = confirm('Deseja realmente excluir esta linha?')

        if(isOK) {
          this.deleteUser(user)
        }
      }
      this.tbody.append(tagTd)
    })
  }

  createRowWithUserData() {
    const tagTr =  document.createElement('tr')

    tagTr.innerHTML = `
      <td class="user">
        <img src="https://avatars.githubusercontent.com/u/73083955?v=4" alt="foto do perfil github">
        <a href="#">
          <p>Dione Santos</p>
          <span>/dionedev</span>
        </a>
      </td>

      <td class="repositories">123</td>
      <td class="followers">1000</td>

      <td>
        <button class="trash">
          <img src="./src/assets/Trash.svg" alt="" />
        </button>
      </td>
    `
    return tagTr
  }

  removeAllTableRows() {
    const tableSection = this.root.querySelector('.tableSection tbody')
    
    this.tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove()
    })

    if(this.userEntity.length === 0) {
      tableSection.classList.add('cleanTableImage')
    }
    else {
      tableSection.classList.remove('cleanTableImage')
    }

    this.root.querySelector('.search input').value = ''
  }

  addUserEvent() {
    const favoriteButton = this.root.querySelector('.search button')

    favoriteButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')
      
      this.addUser(value)
    }
  }
}