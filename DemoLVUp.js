let CV = document.getElementById("myCanvas");
let ctx = CV.getContext("2d");
let vx = [];
let vy = [];
let sohinh = 5;
let mangtoadoX = [];
let mangtoadoY = [];
let mangtoadoChieudai = [];
let mangtoadoChieurong = [];
let color = [];
let LV = 1;
let Hinhvuong = new hinhvuong();

// thêm thành phần cho mảng hvuong
function themhinh() {
    sohinh++;
    let x = Math.floor(Math.random() * 800);
    let y = Math.floor(Math.random() * 400);
    let chieudaii = 30;
    let chieurongg = 30;
    let colorr = getrandomcolor();
    let vxx = Math.floor(Math.random() * 15 + 2);
    let vyy = Math.floor(Math.random() * 10 + 2);
    mangtoadoX.push(x);
    mangtoadoY.push(y);
    mangtoadoChieurong.push(chieurongg);
    mangtoadoChieudai.push(chieudaii);
    color.push(colorr);
    vx.push(vxx);
    vy.push(vyy);
}

for (let i = 0; i < sohinh; i++) {
    mangtoadoX[i] = Math.floor(Math.random() * 800);
    mangtoadoY[i] = Math.floor(Math.random() * 400);
    mangtoadoChieudai[i] = 30;
    mangtoadoChieurong[i] = 30;
    color[i] = getrandomcolor();
    vy[i] = Math.floor(Math.random() * 15 + 2);
    vx[i] = Math.floor(Math.random() * 10 + 2);
}

// vẽ đỗi tượng hình vuông
function hinhvuong(x, y, chieudai, chieurong, color) {
    this.toadoX = x;
    this.toadoY = y;
    this.chieudai = chieudai;
    this.chieurong = chieurong;
    this.color = color;
    this.taohinh = function (x, y, chieudai, chieurong, color) {
        ctx.beginPath();
        ctx.rect(x, y, chieudai, chieurong, color);
        ctx.fillStyle = color;
        ctx.fill();
    }
}

// vẽ đối tượng
function Pikalong(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.vePikalong = function (x, y) {
        let image = new Image();
        image.onload = function () {
            ctx.drawImage(image, x, y, 50, 50);
        };
        image.src = 'Pikalong2.png';
    };
    // di chuyển đối tượng
    this.upImage = function () {
        if (this.y >= 10) {
            this.y -= speed;
        } else {
            return;
        }
    };
    this.downImage = function () {
        if (this.y <= CV.height - 60) {
            this.y += speed;
        } else {
            return;
        }
    };
    this.leftImage = function () {
        if (this.x >= 10) {
            this.x -= speed;
        } else {
            return;
        }
    };
    this.rightImage = function () {
        if (this.x <= CV.width - 60) {
            this.x += speed;
        } else {
            return;
        }
    }
}

// hàm thay đổi màu sắc
function getrandomhex() {
    return Math.floor(Math.random() * 200);
}

function getrandomcolor() {
    let red = getrandomhex();
    let green = getrandomhex();
    let blue = getrandomhex();
    return "rgb(" + red + "," + blue + "," + green + ")";
}

let pikalong = new Pikalong(0, 0, 20);

// hàm di chuyển đối tượng bằng các phím mũi tên
function moveSelection(evt) {
    switch (evt.keyCode) {
        case 37:
            console.log(3);
            pikalong.leftImage();
            console.log(pikalong.x + "/" + pikalong.y);
            break;
        case 39:
            console.log(2);

            pikalong.rightImage();
            console.log(pikalong.x + "/" + pikalong.y);
            break;
        case 38:
            console.log(7);
            pikalong.upImage();
            console.log(pikalong.x + "/" + pikalong.y);
            break;
        case 40:
            console.log(1);
            pikalong.downImage();
            console.log(pikalong.x + "/" + pikalong.y);
            break;
    }

}

window.addEventListener('keydown', moveSelection);

// hàm va đập di chuyển đối tượng
function dichuyen() {
    ctx.clearRect(0, 0, CV.width, CV.height);
    for (let i = 0; i < sohinh; i++) {
        mangtoadoX[i] += vx[i];
        mangtoadoY[i] += vy[i];
        if (mangtoadoX[i] > 800 || mangtoadoX[i] < 0) {
            vx[i] = -vx[i];
        }
        if (mangtoadoX[i] < 70 && mangtoadoY[i] < 70) {
            vx[i] = -vx[i];
            vy[i] = -vy[i];
        }
        if (mangtoadoY[i] < 0 || mangtoadoY[i] > 550) {
            vy[i] = -vy[i];
        }
        Hinhvuong.taohinh(mangtoadoX[i], mangtoadoY[i], mangtoadoChieurong[i], mangtoadoChieurong[i], color[i]);
    }
    pikalong.vePikalong(pikalong.x, pikalong.y);
    if (pikalong.x + 50 >= 830 && pikalong.y + 50 >= 570) {
        alert("Qua màn");
        // Hinhvuong.vebackground();
        return;
    } else {
        for (let j = 0; j < sohinh; j++) {
            if (pikalong.x + 50 >= mangtoadoX[j]
                && pikalong.x <= mangtoadoX[j] + 30
                && pikalong.y <= mangtoadoY[j] + 30
                && pikalong.y + 50 >= mangtoadoY[j]) {
                alert("GAME OVER!!! Bạn đang ở màn: " + LV);
                location.reload();
            }
        }
    }
    Start();
}

function nextLv() {
    LV++;
    pikalong = new Pikalong(0, 0, 20);
    themhinh();
    Start();
    document.getElementById("result").innerHTML = LV;

}


function Start() {
    setTimeout(dichuyen, 50);
}

function StartGame() {
    Start();
}

function ResetGame() {
    location.reload();
}
