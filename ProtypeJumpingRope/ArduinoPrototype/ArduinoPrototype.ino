  //Set up Pins
  int pres = A3;
  int pressureValue;

  const int Led = 3; //PWM


void setup() {
    pinMode(Led,  OUTPUT);  
    Serial.begin(9600);
}

void loop() {
  //Set up PinMode
    pressureValue = analogRead(pres);
    Serial.print("\tpressureValue:\t"); Serial.println(pressureValue);
}
