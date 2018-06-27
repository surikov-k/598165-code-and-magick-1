'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var firstNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var secondNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateName = function () {
  var firstName = getRandomElement(firstNames);
  var secondName = getRandomElement(secondNames);
  if (Math.round(Math.random())) {
    return firstName + ' ' + secondName;
  } else {
    return secondName + ' ' + firstName;
  }
};

var generateCharacter = function () {
  var character = {};
  character.name = generateName();
  character.coatColor = getRandomElement(coatColors);
  character.eyesColor = getRandomElement(eyesColors);

  return character;
};

var wizardsData = [];
for (var i = 0; i < 4; i++) {
  wizardsData[i] = generateCharacter();
}

var template = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var similarList = document.querySelector('.setup-similar-list');

var generateWizards = function () {
  var generatedWizards = [];
  for (i = 0; i < wizardsData.length; i++) {
    generatedWizards[i] = template.cloneNode(true);
    generatedWizards[i].querySelector('.setup-similar-label').textContent = wizardsData[i].name;
    generatedWizards[i].querySelector('.wizard-coat').style.fill = wizardsData[i].coatColor;
    generatedWizards[i].querySelector('.wizard-eyes').style.fill = wizardsData[i].eyesColor;
  }
  return generatedWizards;
};

var generateFragment = function () {

  var generatedWizards = generateWizards();
  var fragment = document.createDocumentFragment();

  for (i = 0; i < generatedWizards.length; i++) {
    fragment.appendChild(generatedWizards[i]);
  }
  return fragment;
};

similarList.appendChild(generateFragment());
document.querySelector('.setup-similar').classList.remove('hidden');

var setupDialog = document.querySelector('.setup');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = setupDialog.querySelector('.setup-close');

var escPressHandler = function (evt) {
  if (document.activeElement.name !== 'username') {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSetupDialog();
    }
  }
};

var openSetupDialog = function () {
  setupDialog.classList.remove('hidden');
  document.addEventListener('keydown', escPressHandler);
};

var closeSetupDialog = function () {
  setupDialog.classList.add('hidden');
  document.removeEventListener('keydown', escPressHandler);
};

setupOpenButton.addEventListener('click', function () {
  openSetupDialog();
});

setupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetupDialog();
  }
});
setupCloseButton.addEventListener('click', function () {
  closeSetupDialog();
});

setupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupDialog();
  }
});


var setupWizardForm = document.querySelector('.setup-wizard-form');
var wizardCoat = setupWizardForm.querySelector('.wizard-coat');
var wizardCoatColorField = setupWizardForm.querySelector('input[name=coat-color]');
var wizardEyes = setupWizardForm.querySelector('.wizard-eyes');
var wizardEyesColorField = setupWizardForm.querySelector('input[name=eyes-color]');
var wizardFireball = setupWizardForm.querySelector('.setup-fireball-wrap');
var wizardFireballField = setupWizardForm.querySelector('input[name=fireball-color]');

var changeFillColor = function (object, field, colorArray) {
  object.style.fill = getRandomElement(colorArray);
  field.value = object.style.fill;
};

wizardCoat.addEventListener('click', function () {
  changeFillColor(wizardCoat, wizardCoatColorField, coatColors);
});

wizardEyes.addEventListener('click', function () {
  changeFillColor(wizardEyes, wizardEyesColorField, eyesColors);
});

var convertRGBtoHex = function (rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? '#' +
    ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
};

wizardFireball.addEventListener('click', function () {
  wizardFireball.style.background = getRandomElement(fireballColors);
  wizardFireballField.value = convertRGBtoHex(wizardFireball.style.background);
});
