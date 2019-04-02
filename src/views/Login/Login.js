import { randomNum, randomColor } from '@/libs/utils'
import LoginCom from './components/login-com'
import ResetPassCom from './components/resetPass-com'

export default {
  name: 'login',
  components: {
    LoginCom,
    ResetPassCom
  },
  data() {
    return {
      currentCom: 'LoginCom',
      btnLoading: false,
      canvas: null,
      ctx: null,
      maxNum: 200,
      // 连线距离
      lineDis: 100,
      // 记录鼠标位置
      mousePosition: {
        x: null,
        y: null,
        max: 20000
      },
      mouseTimer: null,
      balls: [],
      createBassTimer: null
    };
  },
  created() {
    let type = this.$route.params.type;
    if (type && type === 'reset') {
      this.currentCom = 'ResetPassCom';
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this._initCanvas();
    })
  },
  destroyed() {
    clearInterval(this.createBassTimer);
    cancelAnimationFrame(this.request);
    window.onresize = null;
  },
  methods: {
    _initCanvas() {
      this._resize();
      window.onresize = this._resize;
      window.onmousemove = this._windowMouseMove;
      window.onmouseout = this._windowMouseOut;
      this._createBall();
      this._drawBall();
    },
    _resize() {
      let canvas = this.$refs.canvas;
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      canvas.width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      canvas.height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    },
    _windowMouseMove(e) {
      clearTimeout(this.mouseTimer);
      this.mousePosition.x = e.clientX;
      this.mousePosition.y = e.clientY;
      this.mouseTimer = setTimeout(() => {
        this.mousePosition.x = null;
        this.mousePosition.y = null;
      }, 500);
    },
    _windowMouseOut() {
      this.mousePosition.x = null;
      this.mousePosition.y = null;
    },
    _createBall() {
      this.createBassTimer = setInterval(() => {
        if (this.balls.length >= this.maxNum) {
          clearInterval(this.createBassTimer);
          return;
        }
        let ball = {
          x: randomNum(100, this.canvas.width - 100),
          y: randomNum(100, this.canvas.height - 100),
          r: randomNum(1, 3),
          color: randomColor(),
          speedX: randomNum(-4, 3) * 0.4,
          speedY: randomNum(-4, 3) * 0.4,
          max: 6000
        };
        if (ball.speedX != 0 || ball.speedY != 0) {
          this.balls.push(ball);
        }
      }, 1000 / 60);
    },
    _drawBall() {
      // console.log(3);
      let ctx = this.ctx;
      let canvas = this.canvas;
      let balls = this.balls;
      let mousePosition = this.mousePosition;
      let newBalls = [mousePosition].concat(balls);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      balls.forEach(ball => {
        if (ball.x <= ball.r || ball.x >= canvas.width - ball.r) {
          ball.speedX *= -1;
        }
        if (ball.y <= ball.r || ball.y >= canvas.height - ball.r) {
          ball.speedY *= -1;
        }
        ball.x += ball.speedX;
        ball.y += ball.speedY;
        ctx.beginPath();
        ctx.fillStyle = ball.color;
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fill();
        // 循环比对粒子间的距离
        for (let i = 0; i < newBalls.length; i++) {
          let item = newBalls[i];
          if (ball === item || item.x === null || item.y === null) continue;
          let xc = ball.x - item.x;
          let yc = ball.y - item.y;
          // 两个粒子之间的距离
          let dis = xc * xc + yc * yc;
          // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
          if (dis < item.max) {
            // 如果是鼠标，则让粒子向鼠标的位置移动
            if (item === mousePosition && dis > item.max / 2) {
              ball.x -= xc * 0.03;
              ball.y -= yc * 0.03;
            }
            // 计算距离比
            let ratio = (item.max - dis) / item.max;
            // 画线
            ctx.beginPath();
            ctx.lineWidth = ratio / 3;
            ctx.strokeStyle = ball.color;
            ctx.moveTo(ball.x, ball.y);
            ctx.lineTo(item.x, item.y);
            ctx.stroke();
          }
        }
        newBalls.splice(newBalls.indexOf(ball), 1);
      });
      this.request = window.requestAnimationFrame(this._drawBall);
    }
  }
};