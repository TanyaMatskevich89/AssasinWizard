const wizardImg = new Image(); 
wizardImg.src = '../images/wizard.png'; // загрузили изображение врага

const lightImg = new Image();
lightImg.src = '../images/wizard.png';// загрузили изображение молний врага

// анимация врагов
const animationsWizard = {
    idleRight: [ // маг стоит и смотрит вправо
        2, 10, 48, 49,
        52, 10, 48, 49,
        102, 10, 48, 49,
        152, 10, 48, 49,
        202, 10, 48, 49,
        252, 10, 48, 49,
        302, 10, 48, 49,
        352, 10, 48, 49
    ],
    walkRight: [
        2, 131, 48, 49,
        52, 131, 48, 49,
        102, 131, 48, 49,
        152, 131, 48, 49,
        202, 131, 48, 49,
        252, 131, 48, 49,
        302, 131, 48, 49,
        352, 131, 48, 49,
        402, 131, 48, 49,
        452, 131, 48, 49,
        502, 131, 48, 49,
        552, 131, 48, 49,
        602, 131, 48, 49,
        652, 131, 48, 49,
        702, 131, 48, 49,
        752, 131, 48, 49,
        802, 131, 48, 49,
        852, 131, 48, 49
    ],
    walkLeft: [
        2, 191, 48, 49,
        52, 191, 48, 49,
        102, 191, 48, 49,
        152, 191, 48, 49,
        202, 191, 48, 49,
        252, 191, 48, 49,
        302, 191, 48, 49,
        352, 191, 48, 49,
        402, 191, 48, 49,
        452, 191, 48, 49,
        502, 191, 48, 49,
        552, 191, 48, 49,
        602, 191, 48, 49,
        652, 191, 48, 49,
        702, 191, 48, 49,
        752, 191, 48, 49,
        802, 191, 48, 49,
        852, 191, 48, 49
    ],
    idleLeft: [
        2, 10, 48, 49,
        52, 10, 48, 49,
        102, 10, 48, 49,
        152, 10, 48, 49,
        202, 10, 48, 49,
        252, 10, 48, 49,
        302, 10, 48, 49,
        352, 10, 48, 49
    ],
    attackLeft: [
        25, 250, 48, 67,
        123, 250, 48, 67,
        221, 250, 48, 67,
        319, 250, 48, 67,
        417, 250, 48, 67,
        515, 250, 48, 67,
        613, 250, 48, 67,
        711, 250, 48, 67,
        809, 250, 48, 67,
        907, 250, 48, 67,
        1005, 250, 48, 67,
        1103, 250, 48, 67
    ],
    attackRight: [
        25, 250, 48, 67,
        123, 250, 48, 67,
        221, 250, 48, 67,
        319, 250, 48, 67,
        417, 250, 48, 67,
        515, 250, 48, 67,
        613, 250, 48, 67,
        711, 250, 48, 67,
        809, 250, 48, 67,
        907, 250, 48, 67,
        1005, 250, 48, 67,
        1103, 250, 48, 67
    ],
    die: [
        2, 460, 48, 50,
        54, 460, 48, 50,
        104, 460, 48, 50,
        154, 460, 48, 50,
        204, 460, 48, 50,
        254, 460, 48, 50
    ]
};

const animationsLight = {// оружие врагов (анимация молний)
    light: [
        2, 405, 40, 39,
        46, 405, 40, 39,
        90, 405, 40, 39,
        134, 405, 40, 39,
        178, 405, 40, 39,
        222, 405, 40, 39,
        266, 405, 40, 39,
        310, 405, 40, 39,
        354, 405, 40, 39,
        398, 405, 40, 39,
        442, 405, 40, 39,
        486, 405, 40, 39,
        530, 405, 40, 39
    ]
}

function makeEnemy(type, x, y) { // В функцию мы передаем 3 параметра. Тип врага и его координаты, на которых он появится.
    if (type == 'wizard') {
        wizard = new Konva.Sprite({ // так же, как и для игрока
            x: x,
            y: y,
            image: wizardImg,
            animation: 'idleRight',
            animations: animationsWizard,
            frameRate: 7,
            frameIndex: 0
        });
        wizard.action = '';
        wizard.mana = 0; // понадобится при атаке
        wizards.push(wizard); // добавляем врага в массив врагов
    }
    layer.add(wizard);//повтояряем действия, как с юзером
    stage.add(layer);
    wizard.start();
}
makeEnemy('wizard', -10, 400);// создали врага


// функция движения врагов
function moveEnemies() { //А сам вызов этой функции поместим в цикл игры, чтобы с каждым вызовом функции враги сдвигались на определенную позицию.
    wizards.forEach(function (wizard) { // перебираем всех врагов
        if (wizard.action != 'makeLight' && wizard.action != 'die') { // если маг не делает молнии и не умер
            if (wizard.direction == 'right') {
                wizard.attrs.animation = 'idleRight';
            }
            else {
                wizard.attrs.animation = 'idleLeft';
            }

            if (wizard.attrs.x < 40) {
                wizard.setX(wizard.attrs.x + wizardSpeed);
                wizard.attrs.animation = 'walkRight';
                wizard.direction = 'right';
                wizard.action = 'go';
            }
            if (wizard.attrs.x > canvasWidth - 100) { // враги доходят до линии (ширина-150) и останавляваются
                wizard.setX(wizard.attrs.x - wizardSpeed);
                wizard.attrs.animation = 'walkLeft';
                wizard.direction = 'left';
                wizard.action = 'go';
            }
        }
    });
}


function makeBullet(type, x, y) { // создаем функцию атаки
    if (type == 'light') { // если тип молния
        light = new Konva.Sprite({
            x: x,
            y: y,
            image: lightImg,
            animation: 'light',
            animations: animationsLight,
            frameRate: 7,
            frameIndex: 0
        });
        lights.push(light);
        layer.add(light);
        stage.add(layer);
        light.start();
    }
//Только, чтобы получить статическое изображение стрелы, мы обрезали изображение игрока и оставили только область со стрелой. Причем в зависимости от направления стрелы меняется область для вырезания.
//И чтобы игрок не стрелял, как из пулемета мы обновляем переменную lastFire, которую объявляли ранее.
    if (type == 'arrow') { // если тип стрела
        let x = player.attrs.x;
        let y = player.attrs.y;

        let arrow = new Konva.Image({
            x: player.attrs.x + 25,
            y: player.attrs.y + 20,
            image: playerImg,
            width: 30,
            height: 10
        });
        arrow.crop({  // вырезаем стрелу из изображения игрока
            x: 7,
            y: 150,
            width: 30,
            height: 10
        });
        arrow.direction = 'left'; //По направлению игрока мы определяем направление полета стрелы.
        player.attrs.animation = 'idleLeft';
        if (direction == 'right') {
            arrow.direction = 'right';
            player.attrs.animation = 'idleRight';

            arrow.crop({
                x: 7,
                y: 137,
                width: 30,
                height: 10
            });
        }
        player.arrows--; //Далее уменьшаем количество стрел у игрока и добавляем стрелы в массив стрел.
        player.frameIndex(0);
        arrows.push(arrow);
        layer.add(arrow);
        stage.add(layer);
        // lastFire = Date.now();
    }

}

// По задумке молния должна бить 1 раз и пропадать в поля игры. 
// добавляем в бесконечный цикл
function moveBullet() { //Функция, которая будет пробегаться по списку молний и удалять ту, у которой анимация подошла к конечному кадру.
    for (let i = 0; i < lights.length; i++) {
        if (lights[i].frameIndex() > (animationsLight.light.length) / 4-2) {
            lights[i].setX(-10000); // сдвигаем за край экрана
            lights.splice(i, 1); //удаляем 1 эл. с индексом i
        }
    }
    for (let i = 0; i < arrows.length; i++) { //Каждый игровой цикл функция  перебирает все стрелы и обновляет их координаты в зависимости от направления полета стрелы.
        let arrow = arrows[i];
        switch (arrow.direction) {
            case 'right': arrow.setX(arrow.attrs.x + arrowSpeed);
                break;
            default:
                arrow.setX(arrow.attrs.x - arrowSpeed);
        }
        // удаляем стрелы за экраном
        if (arrow.attrs.x < 0 || arrow.attrs.x > canvasWidth) { //Если стрелы вышла за пределы экрана, то мы ее удаляем из массива стрел
            arrows.splice(i, 1);
            arrow.setX(-1000);
            
        }
    }
}

// Теперь заставим врагов создавать молнию около игрока.
//Действие противника меняется на makeLight и начинается процесс создания молнии. После того, как проходит 10-ый кадр анимации кастования молнии, появляется сама молния.
//Здесь мы добавили атакую магом влево и проверку анимации смерти. 

function actEnemies() {

    for (let i = 0; i < wizards.length; i++) {
        wizards[i].mana++; //Здесь так же используется свойства mana. описано в фукции makeEnemy
        //Каждый вызов функции у мага увеличивается количество магической энергии. Когда ее переваливает за 200, то маг атакует игрока.
        if(wizards[i].mana > 200 && wizards[i].attrs.animation == 'idleLeft') {
            wizards[i].action = 'makeLight';
            wizards[i].attrs.animation = 'attackLeft';
            wizards[i].setY(wizards[i].attrs.y - 18);// чтобы картинка не скакала вверх-вниз , когда маг меняется с поднятия рук на статику
            wizards[i].mana -= 200;
            wizards[i].frameIndex(0);
        }
        if (wizards[i].mana > 200 && wizards[i].attrs.animation == 'idleRight') {
            wizards[i].action = 'makeLight';
            wizards[i].attrs.animation = 'attackRight';
            wizards[i].setY(wizards[i].attrs.y - 18);
            wizards[i].mana -= 200;
            wizards[i].frameIndex(0);
        }
        // кастование молнии
        if (wizards[i].action == 'makeLight' && wizards[i].frameIndex() > 10) {
            wizards[i].setY(wizards[i].attrs.y + 18);
            makeBullet('light', Math.floor((Math.random() * 200) + player.attrs.x - 100), Math.floor((Math.random() * 200) + player.attrs.y - 100));
            wizards[i].action = 'stay';
            wizards[i].frameIndex(0);
        }
        if (wizards[i].action == 'die' && wizards[i].frameIndex() > 4) { //Если идет 4 кадр анимации, то мы убираем противника с поля и удаляем его из массива врагов.
            wizards[i].setX(-1000);
            wizards.splice(i, 1);
            score += 100;
            updateDifficult();
        }       
    }
 }

const simpleText = new Konva.Text({ // выведем на экран кол-во магови кол-во молний на экран
    x: 15,
    y: 15,
    text: 'text',
    fontSize: 18,
    fill: 'black',
    fontFamily: 'Times New Roman',
    fontStyle: 'bold'
});
layer.add(simpleText);


function updateDifficult() { //Функция в зависимости того, сколько мы заработали очков, изменяет определенное возможное количество магов на карте.
    if (score > 300) {
        countEnemies = 2;
    }
    if (score > 600) {
        countEnemies = 3;
    }
    if (score > 1000) {
        countEnemies = 5;
    }

    while (wizards.length < countEnemies) {
        if (getRandomInt(0, 1)) {
            makeEnemy('wizard', -50, getRandomInt(30, 450)); // задала точные координаты по x, чтобы маги выходили, а не просто появлялись в люом порядке
        }
        else {
            makeEnemy('wizard', 700, getRandomInt(30, 450));
        }
    }
}

function getRandomInt(min, max) { // функция из нашей книжки, где min, max - границы диапазона
    return Math.floor(Math.random() * (max - min + 1)) + min;
}