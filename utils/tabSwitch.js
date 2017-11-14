/** @function tabSwitch
 * @param toShowId - id of panel to show
 * @param targetClass - class of panels
 */
module.exports = function (toShowId, targetClass) {
  let panels = document.querySelectorAll(`.${targetClass}`)
  panels.forEach(e => e.classList.add('hidden'))
  document.querySelector(`#${toShowId}`).classList.remove('hidden')
}

/* Example:

JS:
  document.querySelectorAll('.tab').forEach(function (t) {
    t.addEventListener('click', function (e) {
      tabSwitch(this.dataset.target, 'tab-panel')
    })
  })

CSS:
  .hidden {
    display: none;
  }

HTML
  <div class="tab" data-target="panel-1">Tab 1</div>
  <div class="tab" data-target="panel-2">Tab 2</div>
  <div id="panel-1" class="tab-panel"></div>
  <div id="panel-2" class="tab-panel hidden"></div>

*/
