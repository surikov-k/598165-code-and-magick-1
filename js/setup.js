'use strict';
var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');

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

var randomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateName = function () {
  var firstName = randomArrayElement(firstNames);
  var secondName = randomArrayElement(secondNames);
  if (Math.round(Math.random())) {
    return firstName + ' ' + secondName;
  } else {
    return secondName + ' ' + firstName;
  }
};

var generateCharacter = function () {
  var character = {};
  character.name = generateName();
  character.coatColor = randomArrayElement(coatColors);
  character.eyesColor = randomArrayElement(eyesColors);

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
