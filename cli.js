#!/usr/bin/env node

const fs = require('fs')

main()

function main() {
  const filename = process.argv[2]

  if (!filename) {
    console.log('Please specify a file')
    return
  }

  const ignored = ['index.html']

  if (!filename.endsWith('.html')) {
    console.log('Not a html file')
    return
  }

  if (ignored.includes(filename)) {
    console.log('This file is ignored')
    return
  }

  modify(filename)
}

function modify(filename) {
  const content = fs.readFileSync(filename, 'utf8')
  const doctype = '<!DOCTYPE html>'
  if (content.includes(doctype)) {
    console.log(filename + ' has been modified')
    return
  }

  const newContent = doctype + '\n' + content
    .replace(/<!DOCTYPE[^>]+>/, '<!-- $& -->')
    .replace('charset=iso-8859-1', 'charset=utf8')
    .replace('</head>', `
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="../assets/custom.css">
<script src="../assets/script.js"></script>
<base href="https://pubs.opengroup.org/onlinepubs/9699919799/utilities/">\n$&`)
    .replace('/codes.js"', '$& async')

  fs.writeFileSync(filename, newContent, 'utf8')
}
