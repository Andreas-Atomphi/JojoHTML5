var fps;
var context;
var char;
var speed = {x:Number(0), y:Number(0)};
var maxspeed = {x:Number(10), y:Number(64)};
var rz_vel = 1;
var tcl_d;
var tcl_e;
var keydir = 0;

var tela = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.canvas.classList.add("mCanvas");
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        window.addEventListener('keydown', function(e)
        {
            tela.keys = (tela.keys || []);
            tela.keys[e.code] = true;
            var tcs_aceitas = {
                KeyA()
                {
                    keydir = -1;
                },
                KeyD()
                {
                    keydir = 1;
                }
            }
            var tcl_press = e.code;
            var tcl_func = tcs_aceitas[tcl_press];
            if (tcl_func)
            {
                tcl_func();
            }
        });
        window.addEventListener('keyup', function (e) {
            tela.keys[e.code] = false; 
            if (tela.keys[KeyA] == false && tela.keys[KeyD] == false)
            {
                keydir = 0;
            }
        });
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function init() {
    tela.start();
    char = new component(40, 40, "#FF0000", 40, 50);
}
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = tela.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.update = function(){
        ctx = tela.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
function updateGameArea() {
    console.log(keydir);
    tela.clear();
    char.update();
    char.x += speed.x;
    char.y += speed.y;
    speed.x = speedMechanicChar(speed.x, maxspeed.x);
}
function speedMechanicChar (valor, valor_max)
{
    if (valor > valor_max)
    {
        valor = valor_max;
    }
    else if (valor < -(valor_max))
    {
        valor = -(valor_max);
    }
    else
    {
        if (keydir != 0)
        {
            valor += rz_vel * keydir;
        }
    }
    if (keydir == 0)
    {
        if (valor > 0)
        {
            valor -= rz_vel;
        }
        if (valor < 0)
        {
            valor += rz_vel;
        }
    }
    return valor;
}