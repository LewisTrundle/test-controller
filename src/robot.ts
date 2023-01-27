import { DeviceController } from "@espruino-tools/core";
import { mappings } from "./angleMotorMappings";

export class Robot extends DeviceController {
  sendCodeFunc: any;
  sendCodeSpeed: number;
  buffer: any[];
  left_dir: number;
  right_dir: number;
  angle_mapping_left: any;
  angle_mapping_right: any;
  maxForce: any;

  constructor() {
    super();
    this.connected = false;
    this.sendCodeFunc = null;
    this.sendCodeSpeed = 800;     // CHANGE SPEED CODE IS SENT
    this.buffer = [];
    this.angle_mapping_left = mappings["looseControl"].leftMotorMapping;    // CHANGE MAPPING OF ANGLES TO MOTOR SPEED
    this.angle_mapping_right = mappings["looseControl"].rightMotorMapping;
    this.maxForce = 1.5;
    this.left_dir = 0;
    this.right_dir = 0;
  };

  

  // ----- BUTTONS -----
  connectRobot() {
    this.connect(() => {
      this.connected = true;
      console.log("connected");
    });
  };

  disconnectRobot() {
    this.disconnect(() => {
      this.connected = false;
      console.log("disconnected");
    });
  };
  // ----- END BUTTONS -----




  // ----- MOVEMENT -----
  start() {
    console.log("Started moving joystick");
    if (!this.connected) {
      this.connect();
      return;
    }
    this.Call.switchMotor("D8", 0);
    this.Call.switchMotor("D7", 0);
    this.sendCodeFunc = window.setInterval(this.sendCode.bind(this), this.sendCodeSpeed);
  };


  stop() {
    console.log("Stopped moving joystick.\nChecking connection...");
    if (!this.connected) return;
    window.clearInterval(this.sendCodeFunc);
    this.Call.stop();
    this.buffer = [];
  };


  moveRobot(angle, force) {
    console.log("Moving robot");
    if (!this.connected) {
      return;
    }

    var l_speed = this.angle_mapping_left(angle);
    var r_speed = this.angle_mapping_right(angle);
    const forceRatio = force / this.maxForce;
    l_speed = l_speed*forceRatio;
    r_speed = r_speed*forceRatio;

    this.switchDirections(l_speed, r_speed);
    l_speed = Math.abs(l_speed);
    r_speed = Math.abs(r_speed);
      
    this.buffer.push([l_speed, r_speed]);
  };

  switchDirections(l_speed, r_speed) {
    if (l_speed > 0 && this.left_dir == 1) {
      this.Call.switchMotor("D8", 0);
      this.left_dir = 0;
    }
    else if (l_speed < 0 && this.left_dir == 0) {
      this.Call.switchMotor("D8", 1);
      this.left_dir = 1;
    }
    if (r_speed > 0 && this.right_dir == 1) {
      this.Call.switchMotor("D7", 0);
      this.right_dir = 0;
    }
    else if (r_speed < 0 && this.right_dir == 0) {
      this.Call.switchMotor("D7", 1);
      this.right_dir = 1;
    }
  };
  /* ----- END MOVEMENT ----- */




  /* ----- SEND CODE TO ROBOT ----- */
  sendCode() {
    console.log("sending code at speed of", String(this.sendCodeSpeed));
    const speed = this.buffer[(this.buffer).length-1];
    if (speed) {
      this.Call.turn(speed[0], speed[1]);
    }
  };
}