const axios = require('axios')

class TrelloSource {
  static defaultOptions () {
    return {
      boardId: '',
      key: '',
      token: '',
      typeNamePrefix: 'Trello',
    }
  }

  constructor(api, options) {
    this.options = options

    //Plugin config validation
    if (!options.typeNamePrefix) {
      throw new Error(`Missing typeNamePrefix option.`)
    }
    if (!options.key) {
      throw new Error(`Missing trello key option.`)
    }
    if (!options.token) {
      throw new Error(`Missing trello token option.`)
    }

    this.client = axios.create({
      baseURL: `https://api.trello.com/1`
    })

    api.loadSource(async actions => {
      
      const cards = actions.addCollection(`${options.typeNamePrefix}Card`)
      const lists = actions.addCollection( `${options.typeNamePrefix}List`)

      console.log(`Loading data from ${baseUrl}`)
      const { data } = await this.client.get('batch', {
        params: {
          urls: 
          `/boards/${options.boardId}/lists?cards=all,`+
          `/boards/${options.boardId}/cards?checklists=all&attachments=true&attachment_fields=all`,
          key: options.key,
          token: options.token,
        }
      })

      for (const item of data[1]['200']) {
        cards.addReference('list', `${options.typeNamePrefix}List`)
        cards.addNode({
          ...item,
          list: item.idList
        })
      }

      for (const item of data[0]['200']) {
        lists.addNode(item)
      }
    })
  }
}

module.exports = TrelloSource