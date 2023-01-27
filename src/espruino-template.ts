import { DeviceController } from "@espruino-tools/core";
var elements = [];

export var joyZone;

/* CREATE COMPONENT */
const createComponent = (component: string, properties: Object, text: string, parent?: any) => {
  let el = document.createElement(component);
  Object.keys(properties).forEach(prop => el.setAttribute(prop, properties[prop]));
  el.innerText = text;
  if (parent) {
    parent.appendChild(el);
  }
  return el;
};


function joystickButtons(root) {
  let buttonsdiv = createComponent("div", {class: "buttons"}, null, root);
    createComponent("button", {onclick: "robot.connect()"}, "Connect", buttonsdiv);
    createComponent("button", {onclick:"robot.disconnect()"}, "Disconnect", buttonsdiv);
  root.appendChild(buttonsdiv);
};


function insertJoystick(root) {
  let joystickdiv = createComponent("div", {class: "joystick"}, null, root);
    createComponent("div", {class: "static highlight highlight-javascript active"}, null, joystickdiv);
    let zonejoystick = createComponent("div", {id: "zone_joystick"}, null, joystickdiv);
      let joyZone = createComponent("div", {id: "joyzone", class: "zone static active"}, null, zonejoystick);
  root.append(joystickdiv);
  return joyZone;
};


export const indexPage = () => {
  let root = document.getElementById("page-root");

  let contentdiv = createComponent("div", {class: "content"}, null);
    joystickButtons(contentdiv);
    joyZone = insertJoystick(contentdiv);
  
  root.appendChild(contentdiv);
};

