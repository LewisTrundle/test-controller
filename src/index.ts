import { indexPage, joyZone } from "./espruino-template";
import { Robot } from './robot';
import * as nipplejs from 'nipplejs';
import "./styles/app.scss";
var robot = new Robot();



// ----- BUTTONS -----
export function connect() {
  robot.connectRobot();
};
export function disconnect() {
  robot.disconnectRobot()
};



window.onload = function () {
  indexPage();

  var joystick;
    var joysticks = {
      static: {
        zone: joyZone,
        mode: 'static',
        size: 180,
        position: {
          left: '50%',
          top: '50%'
        },
        color: '#FF0000',
        restOpacity: 0.8,
      }
    };
    function bindNipple() {
      joystick.on('start', function(evt) {
        robot.start();
      }).on('end', function(evt) {
        robot.stop();
      }
      ).on('move', function(evt, data) {
        robot.moveRobot(data.angle.degree, data.force);
      });
    }
    function createNipple(evt) {
      if (joystick) {
        joystick.destroy();
      }
      joystick = nipplejs.create(joysticks[evt]);
      bindNipple();
    }
    createNipple('static');

};
