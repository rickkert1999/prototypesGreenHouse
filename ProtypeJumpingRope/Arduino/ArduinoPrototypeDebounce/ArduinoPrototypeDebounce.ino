const int buttonPin = 7; // the number of the pushbutton pin
const int ledPin = 3;    // the number of the LED pin

int ledState = HIGH;       // the current state of the output pin
int buttonState;           // the current reading from the input pin
int lastButtonState = LOW; // the previous reading from the input pin

unsigned long lastDebounceTime = 0; // the last time the output pin was toggled
unsigned long debounceDelay = 50;   // the debounce time; increase if the output flickers

int buttonPressedCount = 0; // amount of button presses

void setup()
{
  pinMode(buttonPin, INPUT);
  pinMode(ledPin, OUTPUT);

  // set initial LED state
  digitalWrite(ledPin, ledState);

  // start serial port
  Serial.begin(9600);
}

void loop()
{
  // read the state of the switch into a local variable:
  int reading = digitalRead(buttonPin);

  // If the switch changed, due to noise or pressing:
  if (reading != lastButtonState)
  {
    // reset the debouncing timer
    lastDebounceTime = millis();
  }

  // delay, so take it as the actual current state:
  if ((millis() - lastDebounceTime) > debounceDelay)
  {

    // if the button state has changed:
    if (reading != buttonState)
    {
      buttonState = reading;

      // only toggle the LED if the new button state is HIGH
      // and +1 on buttonPressedCount
      if (buttonState == HIGH)
      {
        ledState = !ledState;

        buttonPressedCount++;
        Serial.println(buttonPressedCount);
      }
    }
  }

  // set the LED:
  digitalWrite(ledPin, ledState);

  // save the reading. Next time through the loop, it'll be the lastButtonState:
  lastButtonState = reading;
}