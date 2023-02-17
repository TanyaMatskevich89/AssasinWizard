//Сделаем игроку авторегенерацию здоровья:
//При каждом вызове функции будем увеличивать значение здоровья на определенное число. Потом мы допишем влияние значения count.
function getHealth(count) {
    health += count;
    if (health > 100) {
        health = 100;
    }
    if (health <= 0) {
        health = 0;
        gameOver();
    }
}
//Регенирироваться здоровье будет каждый игровой цикл. Добавим вызов в функцию gameLoop(), а так же добавим вывод значения здоровья.


const heartImg = new Image();
heartImg.src = '../images/heart.png';

const arrowImg = new Image();
arrowImg.src = '../images/arrows.png';

function animationAttack() { //по наступлению 3 фрейма анимации мы создаем стрелу.

    if (player.frameIndex() >= 2) {
        makeBullet('arrow');
    }
}

//Код для создания стрелы указан в функции makeBullet


function makeObject(type, x, y) {// функцию для добавления аптечек и стрел.
    let heart;
    let amo // стрелы
    if (type == 'heart') {
        heart = new Konva.Image({
            x: x,
            y: y,
            image: heartImg,
            width: 35,
            height: 27
        });
        hearts.push(heart);
        layer.add(heart);
        stage.add(layer);
    }
    if (type == 'arrow') {
        amo = new Konva.Image({
            x: x,
            y: y,
            image: arrowImg,
            width: 30,
            height: 15
        });

        amos.push(amo);
        layer.add(amo);
        stage.add(layer);
    }
}
makeObject('heart', getRandomInt(20, 550), getRandomInt(20, 450));
makeObject('arrow', getRandomInt(20, 550), getRandomInt(20, 450));

function collides(x, y, r, b, x2, y2, r2, b2) {//взяла готовую функцию для столкновений двух 2D прямоугольников.
    return !(r <= x2 || x > r2 || b <= y2 || y > b2); //если один прямоугольник задевает второй любым краем/стороной, то у нас возникает столкновение.
}

function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0], pos[1],
        pos[0] + size[0], pos[1] + size[1],
        pos2[0], pos2[1],
        pos2[0] + size2[0], pos2[1] + size2[1]);
}

// ниже код для столкновения стрелы с врагом
//При любом попадании стрелы наш противник умирает. При этом его action переключается на die. 
function checkCollisions() {

let pos = [];
let posPlayer = [];
let size = [];
let sizePlayer = [];
let enemyPos = [];
let enemySize = [];

posPlayer[0] = player.attrs.x;
posPlayer[1] = player.attrs.y;
enemySize[0] = 50;
enemySize[1] = 50;
sizePlayer[0] = 50; // размер игрока
sizePlayer[1] = 50;


for (let i = 0; i < lights.length; i++) {
    enemyPos[0] = lights[i].attrs.x; //позиции по x и y
    enemyPos[1] = lights[i].attrs.y;
    if (lights[i].frameIndex() > 3) {
        if (boxCollides(enemyPos, enemySize, posPlayer, sizePlayer)) {
            getHealth(-0.4);
        }
    }
}
size[0] = 20; // размер стрелы
size[1] = 20;

if (arrows.length) {

    for (let i = 0; i < arrows.length; i++) {
        pos[0] = arrows[i].attrs.x; // позиция стрелы
        pos[1] = arrows[i].attrs.y;
        for (let j = 0; j < wizards.length; j++) {
            enemyPos[0] = wizards[j].attrs.x; // позиция мага
            enemyPos[1] = wizards[j].attrs.y;
            if (wizards[j].action != 'die') {
                if (boxCollides(enemyPos, enemySize, pos, size)) {
                    arrows[i].setX(-1000);
                    arrows.splice(i, 1);
                    wizards[j].action = 'die';
                    wizards[j].attrs.animation = 'die';
                    wizards[j].frameIndex(0);
                }
            }
        }
    }
}
size[0] = 35; // размер сердца
size[1] = 27;

if (hearts.length) {
    for (let i = 0; i < hearts.length; i++) {

        pos[0] = hearts[i].attrs.x; // позиция стрелы
        pos[1] = hearts[i].attrs.y;

        if (boxCollides(pos, size, posPlayer, sizePlayer)) {
            hearts[i].setX(-1000);
            hearts.splice(i, 1);
            getHealth(25);
            makeObject('heart', getRandomInt(70, 500), getRandomInt(70, 400));
        }
    }
}
size[0] = 30; // размер стрелы на поле
size[1] = 15;

if (amos.length) {
    for (let i = 0; i < amos.length; i++) {
        pos[0] = amos[i].attrs.x; // позиция стрелы
        pos[1] = amos[i].attrs.y;
        if (boxCollides(pos, size, posPlayer, sizePlayer)) {
            amos[i].setX(-1000);
            amos.splice(i, 1);
            player.arrows += 2;
            makeObject('arrow', getRandomInt(70, 500), getRandomInt(70, 400));
        }
    }
}
}

