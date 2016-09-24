/*
 * Copyright (c) 2016 Intel Corporation.  All rights reserved.
 * See the bottom of this file for the license terms.
 */

/*
   This sketch example demonstrates how the BMI160 accelerometer on the
   Intel(R) Curie(TM) module can be used to detect shocks or sudden movements
*/

#include "CurieIMU.h"

boolean blinkState = false;          // state of the LED

void setup() {
  Serial.begin(9600); // initialize Serial communication
  while(!Serial) ;    // wait for serial port to connect..
  /* Initialise the IMU */
  CurieIMU.begin();
  CurieIMU.attachInterrupt(eventCallback);

  /* Enable Shock Detection */
  CurieIMU.setDetectionThreshold(CURIE_IMU_SHOCK, 1500); // 1.5g = 1500 mg
  CurieIMU.setDetectionDuration(CURIE_IMU_SHOCK, 50);   // 50ms
  CurieIMU.interrupts(CURIE_IMU_SHOCK);

  Serial.println("{\"message\": \"IMU initialisation complete, waiting for events...\", \"type\": \"info\"}");
}

void loop() {
  // blink the LED in the main loop:
  digitalWrite(13, blinkState);
  blinkState = !blinkState;
  delay(1000);
}


static void eventCallback(void)
{
  int ax, ay, az;   //scaled accelerometer values
  // read accelerometer measurements from device, scaled to the configured range
  CurieIMU.readAccelerometer(ax, ay, az);
  // display tab-separated accelerometer x/y/z values
  Serial.print("{ \"accx\": ");
  Serial.print(formatAcceleration(ax));
  Serial.print(", \"accy\": ");
  Serial.print(formatAcceleration(ay));
  Serial.print(", \"accz\":");
  Serial.print(formatAcceleration(az));
  Serial.println("}");
}
static float formatAcceleration(int readings)
{
  return (readings/32768.0)* CurieIMU.getAccelerometerRange();
   
}

