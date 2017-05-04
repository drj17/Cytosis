const registerEventListeners = () => {
  let pressedKeys = {};

  const setKey = (event, status) => {
    let code = event.keyCode;
    let key;

    switch(code){
      case 65, 37:
        key = 'LEFT';
        break;
      case 87, 38:
        key = 'UP';
        break;
      case 68, 39:
        key = 'RIGHT';
        break;
      case 83, 40:
        key = 'DOWN';
        break;
      default:
        break;
    }

    pressedKeys[key] = status;
  };

  document.addEventListener('keydown', (e) => {
    setKey(e, true);
  });
  document.addEventListener('keyup', (e) => {
    setKey(e, false);
  });
  window.addEventListener('blur', () => {
    pressedKeys = {};
  });
  window.input = {
    isDown: (key) => { return pressedKeys[key];}
  };
};

export default registerEventListeners;
