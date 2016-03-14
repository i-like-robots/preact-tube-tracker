import { readFile } from 'fs'
import { resolve } from 'path'

const TOKEN = /\{\{yield:(\w+)\}\}/g

function render (template, data) {
  return template.replace(TOKEN, (match, property) => data[property])
}

export default (target, data) => {
  const fullPath = resolve(__dirname, target)

  return new Promise((resolve, reject) => {
    readFile(fullPath, { encoding: 'utf8' }, (err, template) => {
      if (err) {
        reject(err)
      } else {
        resolve(render(template, data))
      }
    })
  })
}
