var p = new Vue({
  el: '#ROOT',
  data: () => ({
    ready: false,
    width: 30,
    height: 30,
    map: [],
    chanceToBeAlive: 25,
    tickInterval: 200,
    i: null,
    iState: 0,
  }),
  methods: {
    draw() {
      clearInterval(this.i)
      this.iState = 0
      this.map = []
      for (var h = 0; h < this.height; h++) {
        this.map.push([])
        for (var w = 0; w < this.width; w++) {
          // if (h == 0 || w == 0 || h == this.height-1 || w == this.width-1) {
          //   this.map[h][w] = 0
          // } else {
            this.map[h][w] = (Math.random() < this.chanceToBeAlive/100) ? 1 : 0
          // }
        }
      }
    },
    update() {
      let mirrorMap = this.map
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.height; x++) {
          let neighboursAlive = 0
          for (var b = -1; b < 2; b++) {
            for (var a = -1; a < 2; a++) {
               neighboursAlive += this.map[(y+b+this.width)%this.width][(x+a+this.height)%this.height]
            }
          }

          switch (neighboursAlive) {
            case 2:  // stays alive if alive
              break;
            case 3:  // stays alive or becomes alive
              mirrorMap[y][x] = 1
              break;
            default:  // otherwise dies
              mirrorMap[y][x] = 0
          }
        }
      }
      this.map = []
      this.map = mirrorMap
    },
    start() {
      clearInterval(this.i)
      this.i = setInterval(this.update, this.tickInterval)
      this.iState = 1
    },
    stop() {
      clearInterval(this.i)
      this.iState = 0
    },
  },
  async mounted() {
    this.draw()
    this.ready = true

    let that = this

    this.$nextTick(() => {
      document.getElementById('sA').oninput = function() {
        that.chanceToBeAlive = document.getElementById('sA').value
      }
      document.getElementById('sB').oninput = function() {
        that.tickInterval = document.getElementById('sB').value
        clearInterval(that.i)
        if (that.iState) {
          that.i = setInterval(that.update, that.tickInterval)
        }
      }
    })
  }
})
