 //% color=190 weight=100 icon="\uf1e6"
 namespace OC01
 {
     export enum state
     {
         //% block=ON
         ON = 0,
         //% block=OFF
         OFF = 1
     }

    export enum oc01_pins
     {
         //% block=OUT0
         OUT0 = 0,
         //% block=OUT1
         OUT1 = 1,
         //% block=OUT2
         OUT2 = 2,
         //% block=OUT3
         OUT3 = 3
     }

     let PCA9536_I2C_ADDRESS:number = 0x41
     let PCA9536_REG_OUTPUT_PORT:number = 0x01
     let PCA9536_ALL_OUTPUTS_OFF: number = 0x00
     let PCA9536_REG_CONFIG: number = 0x03
     let PCA9536_CONF_OUTPUT: number = 0x00

     pins.i2cWriteNumber(PCA9536_I2C_ADDRESS, PCA9536_REG_OUTPUT_PORT, NumberFormat.UInt8BE) //reg
     pins.i2cWriteNumber(PCA9536_I2C_ADDRESS, PCA9536_ALL_OUTPUTS_OFF, NumberFormat.UInt8BE) //value

     pins.i2cWriteNumber(PCA9536_I2C_ADDRESS, PCA9536_REG_CONFIG, NumberFormat.UInt8BE) //reg
     pins.i2cWriteNumber(PCA9536_I2C_ADDRESS, PCA9536_ALL_OUTPUTS_OFF, NumberFormat.UInt8BE) //value

     //% block="OC01 turn pin %pin| and %pin_state|"
     export function toggleOutput(pin: oc01_pins, pin_state: state)
     {
         let current_pin_state: number
         current_pin_state = pins.i2cReadNumber(PCA9536_I2C_ADDRESS, NumberFormat.UInt8BE);
         if(pin_state == state.ON)
         {
             current_pin_state |= (current_pin_state | pin)
             pins.i2cWriteNumber(PCA9536_I2C_ADDRESS, PCA9536_REG_OUTPUT_PORT,NumberFormat.UInt8BE) //reg
             pins.i2cWriteNumber(PCA9536_I2C_ADDRESS, current_pin_state, NumberFormat.UInt8BE) //value
         }else if(pin_state == state.OFF)
         {
             current_pin_state &= ~(1 << current_pin_state | pin);
             pins.i2cWriteNumber(PCA9536_I2C_ADDRESS, PCA9536_REG_OUTPUT_PORT, NumberFormat.UInt8BE) //reg
             pins.i2cWriteNumber(PCA9536_I2C_ADDRESS, current_pin_state, NumberFormat.UInt8BE) //value
         }
     }



 }