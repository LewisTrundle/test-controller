declare class Mapping {
    name: string;
    angles: any;
    leftMotorMapping: any;
    rightMotorMapping: any;
    constructor(name: string, angles: any, leftMotorMapping: any, rightMotorMapping: any);
}
export declare const mappings: {
    tightControl: Mapping;
    middleControl: Mapping;
    looseControl: Mapping;
};
export {};
