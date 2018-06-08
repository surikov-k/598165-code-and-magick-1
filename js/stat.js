'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 90;
var SHADOW_OFFSET = 10;
var PADDING_BOTTOM = 12;
var PADDING_LEFT = 54;
var LINE_HEIGHT = 18;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var TITLE_Y_ORIGIN = 40;

var textXOrigin = CLOUD_X + PADDING_LEFT + BAR_WIDTH / 2;
var textYOrigin = CLOUD_Y + CLOUD_HEIGHT - PADDING_BOTTOM;

var barInitXOrigin = CLOUD_X + PADDING_LEFT;
var barInitYOrigin = CLOUD_Y + CLOUD_HEIGHT - PADDING_BOTTOM - LINE_HEIGHT;

var renderCloud = function (ctx, xOrigin, yOrigin, color) {

  var xScale = CLOUD_WIDTH / 420;
  var yScale = CLOUD_HEIGHT / 270;

  var x = function (abscissa) {
    return (abscissa + xOrigin) * xScale;
  };

  var y = function (ordinate) {
    return (ordinate + yOrigin) * yScale;
  };

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x(0), y(150));

  ctx.bezierCurveTo(x(0), y(137), x(8), y(130), x(17), y(128));
  ctx.bezierCurveTo(x(19), y(113), x(30), y(100), x(45), y(98));
  ctx.bezierCurveTo(x(35), y(55), x(81), y(46), x(97), y(61));
  ctx.bezierCurveTo(x(101), y(50), x(110), y(43), x(121), y(40));
  ctx.bezierCurveTo(x(122), y(17), x(143), y(8), x(161), y(17));
  ctx.bezierCurveTo(x(185), y(0), x(222), y(-12), x(263), y(21));
  ctx.bezierCurveTo(x(283), y(14), x(299), y(22), x(306), y(36));
  ctx.bezierCurveTo(x(312), y(36), x(318), y(38), x(323), y(42));
  ctx.bezierCurveTo(x(349), y(28), x(388), y(49), x(377), y(89));
  ctx.bezierCurveTo(x(391), y(92), x(405), y(106), x(401), y(128));
  ctx.bezierCurveTo(x(411), y(130), x(420), y(138), x(420), y(150));
  ctx.lineTo(x(420), y(250));
  ctx.bezierCurveTo(x(420), y(260), x(410), y(270), x(400), y(270));
  ctx.lineTo(x(21), y(270));
  ctx.bezierCurveTo(x(10), y(270), x(0), y(260), x(0), y(250));
  ctx.lineTo(x(0), y(147));

  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
  ctx.stroke();
};

var getMaxElement = function (array) {
  var maxElement = array.length ? 0 : array[0];

  for (var i = 0; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255, 1)');

  ctx.fillStyle = '#000';
  ctx.font = '16px "PT Mono"';
  ctx.textAlign = 'center';

  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + TITLE_Y_ORIGIN);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + TITLE_Y_ORIGIN + LINE_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var time = Math.round(times[i]);
    var barHeight = MAX_BAR_HEIGHT * time / maxTime;
    var barXOrigin = barInitXOrigin + GAP * i;
    var barYOrigin = barInitYOrigin - barHeight;

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], textXOrigin + GAP * i, textYOrigin);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var shadeOfBlue = Math.floor(Math.random() * 100);
      ctx.fillStyle = 'hsl(234, ' + shadeOfBlue + '%, 40%)';
    }

    ctx.fillRect(barXOrigin, barYOrigin, BAR_WIDTH, barHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(time, textXOrigin + GAP * i, textYOrigin - barHeight - LINE_HEIGHT * 1.5);
  }
};
