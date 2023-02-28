import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TemperatureConverter } from "./temperatureConverter.component";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

fdescribe("TemperatureConverter", () => {
  let component: TemperatureConverter;
  let fixture: ComponentFixture<TemperatureConverter>;
  let compiled: { querySelector: (arg0: string) => any; };
  let celsiusInput: { value: any; dispatchEvent: (arg0: Event) => void; };
  let fahrenheitInput: { value: any; dispatchEvent: (arg0: Event) => void; };
  let kelvinInput: { value: any; dispatchEvent: (arg0: Event) => void; };

  const pushCelsiusValue = async (value: number) => {
    celsiusInput.value = value;
    celsiusInput.dispatchEvent(new Event("change"));
    celsiusInput.dispatchEvent(new Event("input"));
    await fixture.whenStable();
    await fixture.detectChanges();
  };

  const pushFahrenheitValue = async (value: number) => {
    fahrenheitInput.value = value;
    fahrenheitInput.dispatchEvent(new Event("change"));
    fahrenheitInput.dispatchEvent(new Event("input"));
    await fixture.whenStable();
    await fixture.detectChanges();
  };

  const pushKelvinValue = async (value: number) => {
    kelvinInput.value = value;
    kelvinInput.dispatchEvent(new Event("change"));
    kelvinInput.dispatchEvent(new Event("input"));
    await fixture.whenStable();
    await fixture.detectChanges();
  }

  const getByTestId = (testId: string) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [TemperatureConverter],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureConverter);
    fixture.autoDetectChanges(true);
    compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    celsiusInput = getByTestId("celsius-input");
    fahrenheitInput = getByTestId("fahrenheit-input");
    kelvinInput = getByTestId("kelvin-input");
    fixture.detectChanges();
  });

  it("Typing value in Celsius field gets correct Fahrenheit value", async () => {
    await pushCelsiusValue(500);
    fahrenheitInput = getByTestId("fahrenheit-input");
    kelvinInput = getByTestId("kelvin-input");
    expect(Number(fahrenheitInput.value)).toEqual(932);
    expect(Number(kelvinInput.value)).toEqual(773.15);
  });

  it("Typing value in Celsius field gets correct Kelvin value", async () => {
    await pushCelsiusValue(500);
    kelvinInput = getByTestId("kelvin-input");
    expect(Number(kelvinInput.value)).toEqual(773.15);
  });

  it("Typing value in Celsius field gets correct Fahrenheit value upto 1 decimal values", async () => {
    await pushCelsiusValue(32);
    fahrenheitInput = getByTestId("fahrenheit-input");
    expect(Number(fahrenheitInput.value)).toEqual(89.6);
  });

  it("Typing value in Celsius field gets correct Kelvin value upto 1 decimal value", async () => {
    await pushCelsiusValue(32);
    kelvinInput = getByTestId("kelvin-input");
    expect(Number(kelvinInput.value)).toEqual(305.15);
  });


  it("Typing value in Fahrenheit field gets correct Celsius value", async () => {
    await pushFahrenheitValue(932);
    celsiusInput = getByTestId("celsius-input");
    expect(Number(celsiusInput.value)).toEqual(500);
  });

  it("Typing value in Fahrenheit field gets correct Kelvin value", async () => {
    await pushFahrenheitValue(932);
    kelvinInput = getByTestId("kelvin-input");
    expect(Number(kelvinInput.value)).toEqual(773.15);
  });

  it("Typing value in Fahrenheit field gets correct Celsius value upto 1 decimal values", async () => {
    await pushFahrenheitValue(100);
    celsiusInput = getByTestId("celsius-input");
    expect(Number(celsiusInput.value)).toEqual(37.8);
  });

  it("Typing value in Fahrenheit field gets correct Kelvin value upto 1 decimal values", async () => {
    await pushFahrenheitValue(100);
    kelvinInput = getByTestId("kelvin-input");
    expect(Number(kelvinInput.value)).toEqual(310.928);
  });

  it("Typing value in Kelvin field gets correct Celsius value", async () => {
    await pushKelvinValue(500);
    celsiusInput = getByTestId("celsius-input");
    expect(Number(celsiusInput.value)).toEqual(226.85);
  });

  it("Typing value in Kelvin field gets correct Celsius value upto 1 decimal value", async () => {
    await pushKelvinValue(500);
    celsiusInput = getByTestId("celsius-input");
    expect(Number(celsiusInput.value)).toEqual(226.85);
  });

  it("Typing value in Kelvin field gets correct Fahrenheit value", async () => {
    await pushKelvinValue(500);
    fahrenheitInput = getByTestId("fahrenheit-input");
    expect(Number(fahrenheitInput.value)).toEqual(440.33);
  });

  it("Typing value in Kelvin field gets correct Fahrenheit value upto 1 decimal value", async () => {
    await pushKelvinValue(500);
    fahrenheitInput = getByTestId("fahrenheit-input");
    expect(Number(fahrenheitInput.value)).toEqual(440.33);
  });

  it("Perform series of actions", async () => {
    await pushFahrenheitValue(10);
    celsiusInput = getByTestId("celsius-input");
    expect(Number(celsiusInput.value)).toEqual(-12.2);
    
    await pushFahrenheitValue(10);
    kelvinInput = getByTestId("kelvin-input");
    expect(Number(kelvinInput.value)).toEqual(260.928);

    await pushCelsiusValue(10);
    fahrenheitInput = getByTestId("fahrenheit-input");
    expect(Number(fahrenheitInput.value)).toEqual(50);

    await pushCelsiusValue(10);
    kelvinInput = getByTestId("kelvin-input");
    expect(Number(kelvinInput.value)).toEqual(283.1);

    await pushKelvinValue(200);
    celsiusInput = getByTestId("celsius-input");
    expect(Number(celsiusInput.value)).toEqual(-73.15);

    await pushKelvinValue(200);
    fahrenheitInput = getByTestId("fahrenheit-input");
    expect(Number(fahrenheitInput.value)).toEqual(-99.67);
  });
});