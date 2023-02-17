const canvasWidth = 700;//размеры сцены
const canvasHeight = 500;//wразмеры сцены
let direction = 'right'; //переменная понадобится, когда игрок/враг будет двигатся
let arrowDirection = ''; // направление полета стрелы
let arrowSpeed = 6; // скорость полета стрелы
const wizardSpeed = 0.5; // скорость передвидения врага
let wizards = []; // коллекция врагов, понадобится при их создании
let lights = []; // массив молний
let health = 100;// здоровье игрока
let arrows = [];// массив сирел игрока
let lastFire = Date.now(); // для расчета стрельбы,  понадобится для того, чтобы ограничить стрельбу игрока по времени.
let score = 0; // наш счет булет увеличиваться
let countEnemies = 2; // кол-во врагов на поле
let hearts = []; // сердце со здоровьем
let amos = []; // подбираемые стрелы



// Всё начинается со Stage, который объеденяет в себе пользовательские слои (Layer).
//Каждый слой(Layer) представляет из себя один canvas элемент на странице и может содержать в себе фигуры, группы фигур или группы групп
//Каждый элемент может быть стилизован и трансформирован.

const stage = new Konva.Stage({ //Конструктор сцены. Сцена используется для содержания нескольких слоев
    container: 'container',// идентификатор div контейнера
    width: canvasWidth,
    height: canvasHeight
});

const layer = new Konva.Layer();//создаем слой

// оформление игрока
animationsPlayer = { /* анимация каждого кадра игрока прописана в координатах по принципу x, y, width, height*/
    idleRight: [
        0, 20, 50, 51,
        53, 20, 50, 51,
        107, 20, 50, 51
    ],
    idleLeft: [
        0, 79, 50, 51,
        53, 79, 50, 51,
        107, 79, 50, 51
    ],
    walkLeft: [
        161, 79, 50, 51,
        214, 79, 50, 51,
        267, 79, 50, 51,
        319, 79, 50, 51
    ],
    walkRight: [
        161, 20, 50, 51,
        214, 20, 50, 51,
        267, 20, 50, 51,
        319, 20, 50, 51
    ],
    attackRight: [
        371, 20, 50, 51,
        435, 20, 50, 51,
        547, 20, 50, 51
    ],
    attackLeft: [
        378, 79, 50, 51,
        435, 79, 50, 51,
        488, 79, 50, 51
    ]
};


const playerImg = new Image();
playerImg.src = '../images/player.png';


const player = new Konva.Sprite({ // задаем параметры изображения спрайта игрока
    x: 200, // положение
    y: 350,
    image: playerImg, //картинка выше
    animation: 'idleRight', // ключ анимации, должен быть строкой
    animations: animationsPlayer, // изображение со всеми анимациями (мой массив созданный)
    frameRate: 7, // скорость смены кадров
    frameIndex: 0 // начальный кадр
});
player.speed = 2; // при движении игрока, координата меняется не на 1px, а на определенную скорость 
player.sizeX = 50;
player.sizeY = 50;
player.arrows = 5;// добавили игроку стрел
layer.add(player);// добавляем спрайт игрока на игровой слой
stage.add(layer); // добавляем слой на сцену
player.start();// запускаем анимацию игрока

//добавление динамики игрока, пока он просто стоит
const gameLoop = new Konva.Animation(function (frame) { // бесконечный цикл игры
    handleInput();
    moveEnemies();
    moveBullet();
    actEnemies();
    simpleText.setAttr('text', 'Молний: ' + lights.length + ", Магов на карте: " + wizards.length + ' Здоровье: ' + Math.floor(health) + ", Стрел: " + player.arrows +", Очки: " + score);
    getHealth(0,05);;
    checkCollisions();
}, layer);

gameLoop.start();


function handleInput() { // отлавливание событий нажатия на "игровые" клавиши
//первым ифом мы проверяем, если игрок уже атакует, то мы запрещаем ему двигаться и выходим из функции по return.
    if (player.attrs.animation == 'attackRight' || player.attrs.animation == 'attackLeft') {
        animationAttack();
        return;
    }
    if (direction == 'left') {
        player.attrs.animation = 'idleLeft';
    }
    if (direction == 'right') {
        player.attrs.animation = 'idleRight';
    }

    if (input.isDown('DOWN') || input.isDown('s')) {
        if (player.attrs.y + player.speed < canvasHeight - player.sizeY) {
            player.attrs.animation = 'walkRight';
            player.setY(player.attrs.y + player.speed);
            direction = 'right';
        }
    }

    if (input.isDown('UP') || input.isDown('w')) {
        if (player.attrs.y - player.speed > 0) {
            player.attrs.animation = 'walkLeft';
            player.setY(player.attrs.y - player.speed);
            direction = 'left';
        }
    }

    if (input.isDown('LEFT') || input.isDown('a')) {
        if (player.attrs.x - player.speed > 0) {
            player.attrs.animation = 'walkLeft';
            player.setX(player.attrs.x - player.speed);
            direction = 'left';
        }
    }

    if (input.isDown('RIGHT') || input.isDown('d')) {
        if (player.attrs.x + player.speed < canvasWidth - player.sizeX) {
            player.attrs.animation = 'walkRight';
            player.setX(player.attrs.x + player.speed);
            direction = 'right';
        }
    }

    if (input.isDown('SPACE') && Date.now() - lastFire > 500 && player.arrows > 0) {
        player.attrs.animation = 'attackLeft';
        if (direction == 'right') {
            player.attrs.animation = 'attackRight';
        }
        player.frameIndex(0);
    }
}

function gameOver() { // функция окончания игры, если проигрыш
    gameLoop.stop();
    document.getElementById('score').innerText = score;
    document.getElementById('dead').style.display = "block";
    document.getElementById('stage-parent').style.display = "none";
}


