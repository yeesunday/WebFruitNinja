window.onload = function() {
  if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
  }
  var width = window.innerWidth;
  var height = window.innerHeight;
  var aspect = 16 / 9;
  if (width / aspect > height) {
    width = height * aspect;
  } else {
    height = width / aspect;
  }
  var opts = {
    width: width,
    height: height,
    container: document.getElementById('container'),
  };
  var game = new Game(opts);
  game.initScene();
  game.renderLoop();
};
