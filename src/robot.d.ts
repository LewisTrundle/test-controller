import { DeviceController } from "@espruino-tools/core";
export declare class Robot extends DeviceController {
    sendCodeFunc: any;
    sendCodeSpeed: number;
    buffer: any[];
    left_dir: number;
    right_dir: number;
    angle_mapping_left: any;
    angle_mapping_right: any;
    maxForce: any;
    constructor();
    connectRobot(): void;
    disconnectRobot(): void;
    start(): void;
    stop(): void;
    moveRobot(angle: any, force: any): void;
    switchDirections(l_speed: any, r_speed: any): void;
    sendCode(): void;
}
