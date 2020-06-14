function range(start, stop, step) {
  if (typeof stop == 'undefined') {
    // one param defined
    stop = start;
    start = 0;
  }
  if (typeof step == 'undefined') {
    step = 1;
  }
  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }
  var result = [];
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }
  return result;
};

function updateChart() {
  chart1.config.data.labels = range(0, parseInt(iterations) + 1)
  chart1.data.datasets[0].data = logistic()

  chart1.update(200)
}

function update() {
  try {
    if (!(+r === +r) || r === '' || r < 1 || iterations > 50 || iterations < 1) throw 'e'
    xn = parseFloat(xn)
    r = parseFloat(r)

    eval(capFunction)
  } catch {
    $('#output-formula').hide()
    $('#wait-placeholder').show()
    return
  }

  rewriteFormula()
  updateChart()
}

function rewriteFormula() {
  let capfText = capFunction.replace('xn', 'x<sub>n</sub>').replace('r', r)
  $('#wait-placeholder').hide()
  $('#output-formula').html('x<sub>n+1</sub> = ' + r + '(x<sub>n</sub>) ⋅ (' + capfText + ')').show()
  $('#series-end').html(iterations)
}

function logistic(rounding=2) {
  let l = []
  let _xn = xn
  let _r = r
  let parsed = capFunction.toLowerCase().replace('r', '_r').replace('xn', '_xn')
  for (let _ = 0; _ <= iterations; _++) {
    l.push((_xn * 100).toFixed(rounding))
    _xn = _r * _xn * eval(parsed)
    if (_xn < 0) _xn = 0
  }
  return l
}



// BINDING //
body.oninput = function() {
  update()
}

cfdt.oninput = function() {
  capFunction = this.value
}

xnSlider.oninput = function() {
  $('#nan-error-1').hide()
  xnVal.value = this.value
  xn = this.value/100
}

rSlider.oninput = function() {
  $('#nan-error-2').hide()
  rVal.value = this.value/100
  r = this.value/100
}

iterationsSlider.oninput = function() {
  $('#nan-error-3').hide()
  iterationsVal.value = this.value
  iterations = this.value
}

iterationsVal.onblur = function() {
  let val = Math.round(iterationsVal.value.replace(/^\s+|\s+$/g, ''))  // strip spaces
  if (!(+val === +val)) {
    iterationsVal.value = ''
    $('#nan-error-3').show()
    return
  }
  iterationsVal.value = val
  iterations = val
  iterationsSlider.value = val
}

iterationsVal.oninput = function() {
  $('#nan-error-3').hide()
  let val = iterationsVal.value.replace(/^\s+|\s+$/g, '')  // strip spaces
  if (val < 1) val = 1
  if (val > 50) val = 50
  iterationsVal.value = val
  iterations = val
  iterationsSlider.value = val
}

rVal.onblur = function() {
  let val = rVal.value.replace(/^\s+|\s+$/g, '')  // strip spaces
  if (!(+val === +val)) {
    rVal.value = ''
    $('#nan-error-2').show()
    return
  }
  if (r < 1) {
    val = 1
    rVal.value = val
    r = val
    rSlider.value = val*100
    update()
  }
}

rVal.oninput = function() {
  $('#nan-error-2').hide()
  let val = rVal.value.replace(/^\s+|\s+$/g, '')  // strip spaces
  if (val > 1000) val = 1000
  rVal.value = val
  r = val
  rSlider.value = val*100
}

xnVal.onblur = function() {
  let val = xnVal.value.replace(/^\s+|\s+$/g, '')  // strip spaces
  if (!(+val === +val)) {
    xnVal.value = ''
    $('#nan-error-1').show()
    return
  }
}

xnVal.oninput = function() {
  $('#nan-error-1').hide()
  let val = xnVal.value.replace(/^\s+|\s+$/g, '')  // strip spaces
  if (val > 100) val = 100
  if (val < 0) val = 0
  xnVal.value = val
  xn = val/100
  xnSlider.value = val
}
