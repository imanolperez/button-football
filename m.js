function B(r) {
  this.c = [0.5 * W, 0.5 * H];
  this.r = r;
  this.v = 0;
  this.vd = [0, 0];
}

function T(te) {
  this.te = te;
  this.p = [];
  this.s = 0;
  this.act = 0;
}

function P(cx, cy, r) {
  this.c = [cx, cy];
  this.r = r;
  this.s = 0;
  this.vd = [0, 0];
  this.v = 0;
  this.t = 0;
  this.vload = 0;
}

function stP() {
  mov = true;
  for (i = 0; i < te[0].p.length; i++) {
    if (te[0].p[i].v != 0) {
      mov = false;
      break;
    }
  }
  for (i = 0; i < te[1].p.length; i++) {
    if (te[1].p[i].v != 0) {
      mov = false;
      break;
    }
  }
  if (ball.v != 0) mov = false;
  if (mov && turn == 0) {
    te[0].p[te[0].act].v = te[0].p[te[0].act].vload;
    te[0].p[te[0].act].vd = [
      Math.cos(te[0].p[te[0].act].t),
      Math.sin(te[0].p[te[0].act].t)
    ];
    vload = false;
    turntimes += 1;
    if (turntimes == 2) {
      turn = 1;
      turntimes = 0;
    }
  }
}

function tos(x, y) {
  loading = 0;
  tpl = false;
  for (i = 0; i < te[0].p.length; i++) {
    if (
      Math.sqrt(
        Math.pow(x - te[0].p[i].c[0], 2) + Math.pow(y - te[0].p[i].c[1], 2)
      ) <= te[0].p[i].r
    ) {
      tpl = true;
      te[0].act = i;
      break;
    }
  }
  if (
    Math.sqrt(Math.pow(x - 0.15 * H, 2) + Math.pow(y - 0.85 * H, 2)) <=
    0.08 * H
  ) {
    dir = -1;
  } else if (
    Math.sqrt(Math.pow(x - W + 0.15 * H, 2) + Math.pow(y - 0.85 * H, 2)) <=
    0.08 * H
  ) {
    dir = 1;
  } else if (!tpl) {
    stP2();
    loading = 1;
  }
}

function toe(x, y) {
  if (dir == 0 && loading == 1) {
    stP();
  }
  dir = 0;
}

function stP2() {
  mov = true;
  for (i = 0; i < te[0].p.length; i++) {
    if (te[0].p[i].v != 0) {
      mov = false;
      break;
    }
  }
  for (i = 0; i < te[1].p.length; i++) {
    if (te[1].p[i].v != 0) {
      mov = false;
      break;
    }
  }
  if (ball.v != 0 || turn == 1) mov = false;
  vload = mov;
}

function u(e) {
  //Key up
  k = "which" in e ? e.which : e.keyCode;
  if (k == 39 || k == 37) {
    dir = 0;
  }
  if (k == 32) {
    stP();
  }
}

function d(e) {
  //Key down
  if (win != -1) {
    eq1 = Math.floor(Math.random() * 4);
    eq2 = Math.floor(Math.random() * 4);
    init();
    win = -1;
    sc = [0, 0];
  } else {
    k = "which" in e ? e.which : e.keyCode;
    switch (k) {
      case 39:
        dir = 1;
        break;
      case 37:
        dir = -1;
        break;
      case 32:
        stP2();
        break;
      case 38:
        te[0].p[te[0].act].vload = 0;
        te[0].act += 1;
        te[0].act = te[0].act == te[0].p.length ? 0 : te[0].act;
        break;
      case 40:
        te[0].p[te[0].act].vload = 0;
        te[0].act -= 1;
        te[0].act = te[0].act == -1 ? te[0].p.length - 1 : te[0].act;

        break;
    }
  }
}

// Draw everything
var render = function() {
  ctx.clearRect(0, 0, W, H); // clear canvas
  //Create field
  ctx.save();
  var grd = ctx.createLinearGradient(0, 0, 0.7 * W, 0);
  grd.addColorStop(0, "#0B610B");
  grd.addColorStop(1, "#0B3B0B");
  ctx.beginPath();
  ctx.strokeStyle = "rgba(0, 0, 0, 0)";
  ctx.rect(0, 0, W, H);
  ctx.fillStyle = grd;
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.moveTo(Math.floor(0.5 * W), 0);
  ctx.lineTo(Math.floor(0.5 * W), H);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(
    Math.floor(0.5 * W),
    Math.floor(0.5 * H),
    Math.floor(0.2 * H),
    0,
    2 * Math.PI
  );
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(2, 0.3 * H);
  ctx.lineTo(2, 0.7 * H);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(W - 2, 0.3 * H);
  ctx.lineTo(W - 2, 0.7 * H);
  ctx.stroke();

  ctx.font = "50px Helvetica";
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.fillText(sc[0], 0.45 * W, H);
  ctx.font = "20px Helvetica";
  switch (te[0].te) {
    case 0:
      ctx.fillText("FIRE", 0.45 * W, H - 60);
      break;
    case 1:
      ctx.fillText("WATER", 0.45 * W, H - 60);
      break;
    case 2:
      ctx.fillText("AIR", 0.45 * W, H - 60);
      break;
    case 3:
      ctx.fillText("EARTH", 0.45 * W, H - 60);
      break;
  }

  ctx.textAlign = "left";
  ctx.font = "50px Helvetica";
  ctx.fillText(sc[1], 0.55 * W, H);
  ctx.font = "20px Helvetica";
  switch (te[1].te) {
    case 0:
      ctx.fillText("FIRE", 0.55 * W, H - 60);
      break;
    case 1:
      ctx.fillText("WATER", 0.55 * W, H - 60);
      break;
    case 2:
      ctx.fillText("AIR", 0.55 * W, H - 60);
      break;
    case 3:
      ctx.fillText("EARTH", 0.55 * W, H - 60);
      break;
  }

  ctx.restore();

  ////

  //Render ball

  ctx.save();
  ctx.beginPath();
  var grd = ctx.createRadialGradient(
    ball.c[0],
    ball.c[1],
    (ball.r * 8) / 10,
    ball.c[0],
    ball.c[1],
    ball.r / 10
  );
  grd.addColorStop(0, "#585858");
  grd.addColorStop(1, "white");
  ctx.fillStyle = grd;
  ctx.strokeStyle = "rgba(0,0,0,0)";
  ctx.arc(ball.c[0], ball.c[1], ball.r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  ///

  //Render players
  for (i = 0; i < 2; i++) {
    for (j = 0; j < te[i].p.length; j++) {
      ctx.save();
      var grd = ctx.createRadialGradient(
        te[i].p[j].c[0],
        te[i].p[j].c[1],
        5,
        te[i].p[j].c[0],
        te[i].p[j].c[1],
        te[i].p[j].r + 5
      );
      switch (te[i].te) {
        case 0:
          grd.addColorStop(0, "#FE642E");
          grd.addColorStop(1, "#B40404");
          break;
        case 1:
          grd.addColorStop(0, "#0489B1");
          grd.addColorStop(1, "#084B8A");
          break;
        case 2:
          grd.addColorStop(0, "#F2F2F2");
          grd.addColorStop(1, "#A4A4A4");
          break;
        case 3:
          grd.addColorStop(0, "#886A08");
          grd.addColorStop(1, "#61380B");
          break;
      }
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(te[i].p[j].c[0], te[i].p[j].c[1], te[i].p[j].r, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(0,0,0,0)";

      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }
  //

  // Show active player

  if (turn == 0) {
    mov = true;
    for (i = 0; i < te[0].p.length; i++) {
      if (te[0].p[i].v != 0) {
        mov = false;
        break;
      }
    }
    for (i = 0; i < te[1].p.length; i++) {
      if (te[1].p[i].v != 0) {
        mov = false;
        break;
      }
    }
    if (ball.v != 0) mov = false;

    if (mov) {
      ctx.save();
      ctx.beginPath();
      actP = te[0].p[te[0].act];
      ctx.arc(actP.c[0], actP.c[1], actP.r + 5, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(0,0,0,0)";
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fill();
      ctx.stroke();

      //Arrow
      ctx.beginPath();
      arrowH = Math.min(100, 20 + actP.vload);
      ctx.moveTo(
        actP.c[0] + (actP.r + arrowH) * Math.cos(actP.t),
        actP.c[1] + (actP.r + arrowH) * Math.sin(actP.t)
      );
      ctx.lineTo(
        actP.c[0] + (actP.r + 5) * Math.cos(actP.t + 0.3),
        actP.c[1] + (actP.r + 5) * Math.sin(actP.t + 0.3)
      );
      ctx.lineTo(
        actP.c[0] + (actP.r + 5) * Math.cos(actP.t - 0.3),
        actP.c[1] + (actP.r + 5) * Math.sin(actP.t - 0.3)
      );

      ctx.fill();
      ctx.stroke();
      //
      ctx.restore();
    }
  }

  //Show buttons
  ctx.save();

  ctx.beginPath();
  ctx.fillStyle = "rgba(73,185,65,0.5)";
  ctx.arc(0.15 * H, 0.85 * H, 0.08 * H, 0, 2 * Math.PI);
  ctx.moveTo(0.17 * H, 0.81 * H);
  ctx.lineTo(0.11 * H, 0.85 * H);
  ctx.lineTo(0.17 * H, 0.89 * H);

  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.fillStyle = "rgba(73,185,65,0.5)";
  ctx.arc(W - 0.15 * H, 0.85 * H, 0.08 * H, 0, 2 * Math.PI);
  ctx.moveTo(W - 0.17 * H, 0.81 * H);
  ctx.lineTo(W - 0.17 * H, 0.89 * H);
  ctx.lineTo(W - 0.11 * H, 0.85 * H);

  ctx.fill();
  ctx.restore();
  //
};

function move(ctx) {
  STEP = (0.1 * W) / 600;
  ball.c[0] += ball.vd[0] * ball.v * STEP;
  ball.c[1] += ball.vd[1] * ball.v * STEP;

  te[0].p[te[0].act].t += 0.05 * dir;
  if (vload) {
    te[0].p[te[0].act].vload = Math.min(80, te[0].p[te[0].act].vload + 1);
  }

  for (i = 0; i < 2; i++) {
    te[i].p.forEach(function(pl) {
      if (pl.v != 0) {
        pl.c[0] += pl.vd[0] * pl.v * STEP;
        pl.c[1] += pl.vd[1] * pl.v * STEP;
        pl.vload = 0;
        pl.v = Math.max(pl.v - 0.3, 0);
        //Check collisions
        //Check if touching field's border
        if (pl.c[0] - pl.r <= 0 || pl.c[0] + pl.r >= W) {
          pl.c[0] -= pl.vd[0] * pl.v * STEP;
          pl.c[1] -= pl.vd[1] * pl.v * STEP;
          pl.vd[0] *= -1;
          pl.v *= 0.8;
        }
        if (pl.c[1] - pl.r <= 0 || pl.c[1] + pl.r >= H) {
          pl.c[0] -= pl.vd[0] * pl.v * STEP;
          pl.c[1] -= pl.vd[1] * pl.v * STEP;
          pl.vd[1] *= -1;
          pl.v *= 0.8;
        }
        //

        //Check if collided with another player
        for (j = 0; j < 2; j++) {
          te[j].p.forEach(function(pl2) {
            if (
              pl.c != pl2.c &&
              Math.sqrt(
                Math.pow(pl.c[0] - pl2.c[0], 2) +
                  Math.pow(pl.c[1] - pl2.c[1], 2)
              ) <
                pl.r + pl2.r
            ) {
              c1c2 = [pl.c[0] - pl2.c[0], pl.c[1] - pl2.c[1]];
              //TO DO: CALCULATE ANGLE BETWEEN c1c2 AND PLAYER'S V. MAKE (90º-ANGLE)*2 AND ROTATE.
              angle =
                Math.atan2(c1c2[0], c1c2[1]) - Math.atan2(pl.vd[0], pl.vd[1]);
              pl.vd = [
                pl.vd[0] * Math.cos(angle) + pl.vd[1] * Math.sin(angle),
                -pl.vd[0] * Math.sin(angle) + pl.vd[1] * Math.cos(angle)
              ];

              pl2.vd = [-pl.vd[0], -pl.vd[1]];
              pl.v *= 0.8;
              pl2.v = pl.v;

              pl.c[0] += 3 * pl.vd[0] * pl.v * STEP;
              pl.c[1] += 3 * pl.vd[1] * pl.v * STEP;
            }
          });
        }
        //

        //Check if collided with ball
        if (
          pl.c != ball.c &&
          Math.sqrt(
            Math.pow(pl.c[0] - ball.c[0], 2) + Math.pow(pl.c[1] - ball.c[1], 2)
          ) <
            pl.r + ball.r
        ) {
          c1c2 = [pl.c[0] - ball.c[0], pl.c[1] - ball.c[1]];
          //TO DO: CALCULATE ANGLE BETWEEN c1c2 AND PLAYER'S V. MAKE (90º-ANGLE)*2 AND ROTATE.
          angle = Math.atan2(c1c2[0], c1c2[1]) - Math.atan2(pl.vd[0], pl.vd[1]);
          pl.vd = [
            pl.vd[0] * Math.cos(angle) + pl.vd[1] * Math.sin(angle),
            -pl.vd[0] * Math.sin(angle) + pl.vd[1] * Math.cos(angle)
          ];

          ball.vd = [-pl.vd[0], -pl.vd[1]];
          pl.v *= 0.8;
          ball.v = pl.v * 1.2;

          pl.v *= 0.3;

          pl.c[0] += 3 * pl.vd[0] * pl.v * STEP;
          pl.c[1] += 3 * pl.vd[1] * pl.v * STEP;
        }
        //

        ////
      }
    });
  }

  //Check if ball collided with player
  for (j = 0; j < 2; j++) {
    te[j].p.forEach(function(pl2) {
      if (
        ball.c != pl2.c &&
        Math.sqrt(
          Math.pow(ball.c[0] - pl2.c[0], 2) + Math.pow(ball.c[1] - pl2.c[1], 2)
        ) <
          ball.r + pl2.r
      ) {
        c1c2 = [ball.c[0] - pl2.c[0], ball.c[1] - pl2.c[1]];
        //TO DO: CALCULATE ANGLE BETWEEN c1c2 AND PLAYER'S V. MAKE (90º-ANGLE)*2 AND ROTATE.
        angle =
          Math.atan2(c1c2[0], c1c2[1]) - Math.atan2(ball.vd[0], ball.vd[1]);
        ball.vd = [
          ball.vd[0] * Math.cos(angle) + ball.vd[1] * Math.sin(angle),
          -ball.vd[0] * Math.sin(angle) + ball.vd[1] * Math.cos(angle)
        ];

        pl2.vd = [-ball.vd[0], -ball.vd[1]];
        ball.v *= 0.8;
        pl2.v = ball.v * 0.8;

        ball.c[0] += 3 * ball.vd[0] * ball.v * STEP;
        ball.c[1] += 3 * ball.vd[1] * ball.v * STEP;
      }
    });
  }
  //

  //Check if ball touching field's border
  if (ball.c[0] - ball.r <= 0 || ball.c[0] + ball.r >= W) {
    if (ball.c[1] + ball.r >= 0.3 * H && ball.c[1] + ball.r <= 0.7 * H) {
      if (ball.c[0] - ball.r <= 0) {
        sc[1] += 1;
        initT = 0;
        if (sc[1] == 10) {
          win = 1;
        }
      } else {
        sc[0] += 1;
        initT = 1;
        if (sc[0] == 10) {
          win = 0;
        }
      }

      init();
    }
    ball.c[0] -= ball.vd[0] * ball.v * STEP;
    ball.c[1] -= ball.vd[1] * ball.v * STEP;
    ball.vd[0] *= -1;
    ball.v *= 0.8;
  }
  if (ball.c[1] - ball.r <= 0 || ball.c[1] + ball.r >= H) {
    ball.c[0] -= ball.vd[0] * ball.v * STEP;
    ball.c[1] -= ball.vd[1] * ball.v * STEP;
    ball.vd[1] *= -1;
    ball.v *= 0.8;
  }
  //

  //Slow down ball
  ball.v = Math.max(ball.v - 0.3, 0);
}

//Move the other team
function move2() {
  mov = true;
  for (i = 0; i < te[0].p.length; i++) {
    if (te[0].p[i].v != 0) {
      mov = false;
      break;
    }
  }
  for (i = 0; i < te[1].p.length; i++) {
    if (te[1].p[i].v != 0) {
      mov = false;
      break;
    }
  }
  if (ball.v != 0) mov = false;

  if (turn == 1 && mov) {
    //Move the other team
    turn = 2;
    setTimeout(function() {
      turn = 1;
      turntimes += 1;
      if (turntimes == 2) {
        turn = 0;
        turntimes = 0;
      }
      wp = Math.floor(Math.random() * te[1].p.length);

      if (Math.random() < 0.3) {
        te[1].p[wp].v = Math.random() * 20 + 60;
        te[1].p[wp].vd = [Math.random() - 0.5, Math.random() - 0.5];
        norm = Math.sqrt(
          Math.pow(te[1].p[wp].vd[0], 2) + Math.pow(te[1].p[wp].vd[1], 2)
        );

        te[1].p[wp].vd[0] /= norm;
        te[1].p[wp].vd[1] /= norm;
      } else {
        te[1].p[wp].v = Math.random() * 20 + 60;
        te[1].p[wp].vd = [
          ball.c[0] - te[1].p[wp].c[0],
          ball.c[1] - te[1].p[wp].c[1]
        ];

        norm = Math.sqrt(
          Math.pow(te[1].p[wp].vd[0], 2) + Math.pow(te[1].p[wp].vd[1], 2)
        );

        te[1].p[wp].vd[0] /= norm;
        te[1].p[wp].vd[1] /= norm;
      }
    }, 1000);
  }
}

// The main game loop
var main = function() {
  if (win == -1) {
    move(ctx);
    move2();
    render();
  } else if (win == 0) {
    tx("You won " + sc[0] + "-" + sc[1], ctx);
  } else {
    tx("You lost " + sc[0] + "-" + sc[1], ctx);
  }

  // Request to do this again ASAP
  requestAnimationFrame(main);
};

function tx(t, ctx) {
  ctx.clearRect(0, 0, W, H); // clear canvas
  ctx.fillStyle = "rgb(250, 250, 250)";
  font = 24;
  ctx.font = font + "px Helvetica";

  while (ctx.measureText(t).width > 0.9 * W) {
    font -= 1;
    ctx.font = font + "px Helvetica";
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "medium";
  ctx.fillText(t, 0.5 * W, 0.5 * H);
}

//Start everything
function init() {
  turn = initT;
  turntimes = 0;
  ctx.clearRect(0, 0, W, H); // clear canvas
  switch (st) {
    case 0:
      st += 1;
      tx("Button Football", ctx);
      setTimeout(init, 4000);
      break;
    case 1:
      st += 1;
      tx("Use LEFT or RIGHT arrows to select different players", ctx);
      setTimeout(init, 4000);
      break;
    case 2:
      st += 1;
      tx("Mantain SPACE pressed to choose kick's strength", ctx);
      setTimeout(init, 4000);
      break;
    case 3:
      st += 1;
      tx("and release it to kick", ctx);
      setTimeout(init, 4000);
      break;
    case 4:
      st += 1;
      tx("Press UP or DOWN to change of player", ctx);
      setTimeout(init, 4000);
      break;

    case 5:
      st += 1;
      tx("Each team represents an element. Beat the other elements!", ctx);
      setTimeout(init, 4000);
      break;

    default:
      if (firstRun) {
        eq1 = Math.floor(Math.random() * 4);
        eq2 = Math.floor(Math.random() * 4);
      }
      while (eq2 == eq1) {
        eq2 = Math.floor(Math.random() * 4);
      }
      te = [new T(eq1), new T(eq2)];

      //Add players
      te[0].p.push(new P(0.35 * W, 0.5 * H, 0.05 * H));
      te[0].p.push(new P(0.25 * W, 0.2 * H, 0.05 * H));
      te[0].p.push(new P(0.25 * W, 0.8 * H, 0.05 * H));
      te[0].p.push(new P(0.1 * W, 0.5 * H, 0.05 * H));

      te[1].p.push(new P(0.65 * W, 0.5 * H, 0.05 * H));
      te[1].p.push(new P(0.75 * W, 0.2 * H, 0.05 * H));
      te[1].p.push(new P(0.75 * W, 0.8 * H, 0.05 * H));
      te[1].p.push(new P(0.9 * W, 0.5 * H, 0.05 * H));

      ball = new B(0.02 * H);
      if (firstRun) {
        main();
        firstRun = false;
      }

      break;
  }
}

// Create the canvas
var c = document.createElement("canvas");
var ctx = c.getContext("2d");

W = document.body.clientWidth;
H = document.body.clientHeight;
W = Math.max(W, H);
H = Math.min(W, H);
//H = 400;
//W = 600;

c.height = H;
c.width = W;

c.addEventListener(
  "touchtart",
  function(e) {
    e.preventDefault();
    alert(1);
    //tos(e.touches[0].clientX, e.touches[0].clientY);
    tos(e.touches[0].clientX, e.touches[0].clientY);
  },
  false
);

c.addEventListener(
  "touchend",
  function(e) {
    e.preventDefault();
    //tos(e.touches[0].clientX, e.touches[0].clientY);
    toe(e.touches[0].clientX, e.touches[0].clientY);
  },
  false
);

//Some variables
st = 0;
te = [];
sc = [0, 0];
turn = 0;
eq1 = 0;
eq2 = 0;
turntimes = 0;
var ball;
dir = 0;
win = -1;
vload = false;
firstRun = true;
document.body.appendChild(c);

loading = 0;
var initT = 0;
window.onresize = function() {
  W = document.body.clientWidth;
  H = document.body.clientHeight;
  W = Math.max(W, H);
  H = Math.min(W, H);
  //H = 400;
  //W = 600;

  c.height = H;
  c.width = W;
  init();
};

init();
