  //Set up Pins
  int button = 7;
  int buttonValue;
  int buttonPressedCount = 0;
  int prevButtonValue;

  const int Led = 3; //PWM

void setup() {
    pinMode(Led,  OUTPUT); 
    pinMode(button, INPUT_PULLUP); 
    Serial.begin(9600);
    Serial.println("\Button Count:\t");

}

void loop() {
    buttonValue = digitalRead(button);

    if (buttonValue != prevButtonValue)  {
      
      if (buttonValue == HIGH){
        digitalWrite(Led, LOW);

    } 

    else {
      digitalWrite(Led, HIGH);
        buttonPressedCount++;
        Serial.println(buttonPressedCount);

      }
      delay(20);
    }
    prevButtonValue = buttonValue;
}
