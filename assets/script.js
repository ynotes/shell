document.addEventListener('DOMContentLoaded', load)

function load() {
  var button = document.getElementById('menu-button')
  if (button) {
    button.addEventListener('click', function () {
      document.body.classList.toggle('open')
    })

    document.addEventListener('click', function (e) {
      if (e.target !== button) {
        document.body.classList.remove('open')
      }
    })

    window.onhashchange = function () {
      document.body.classList.remove('open')
    }

    var doc = document.getElementById('idx').contentDocument
    doc.querySelectorAll('a[target]').forEach(function(a) {
      a.target = '_top'
    })
  }
}
