  //Set up Pins
  int pres = A3;
  int pressureValue;
  int variable = 0;

  const int Led = 3; //PWM

void setup() {
    pinMode(Led,  OUTPUT);  
    Serial.begin(9600);
}

void loop() {
  //Set up PinMode
    pressureValue = analogRead(pres);
//    Serial.print("\tpressureValue:\t"); Serial.println(pressureValue);

    if (pressureValue > 1)  {
      digitalWrite(Led, HIGH);
      variable ++;
      Serial.println(variable);

    } 
    else {
      digitalWrite(Led, LOW);
    }

}
