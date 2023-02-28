import { Component, OnInit } from "@angular/core";
@Component({
  selector: "temperature-converter",
  templateUrl: "./temperatureConverter.component.html",
  styleUrls: ["./temperatureConverter.component.css"],
})
export class TemperatureConverter implements OnInit {
  c = "";
  f = "";
  k = "";
  constructor() {}

  ngOnInit() {}

  onChange(value: string | null, type: "c" | "f" | "k") {
    if (value === null) {
      this.c = "";
      this.f = "";
      this.k = "";
      return;
    }

    const temperature = Number(value);
    if (type === "c") {
      this.f = ((temperature * 9) / 5 + 32).toFixed(1);
      this.k = (temperature + 273.15).toFixed(1);
    } else {
      this.c = (((temperature - 32) * 5) / 9).toFixed(1);
      this.c = (temperature - 273.15).toFixed(1);
    }
    if (type == "k")
    {
      this.f = ((1.8 * (temperature - 273)) + 32).toFixed(1);
    }
    else{
      this.k = ((((temperature - 32) * 5) / 9) + 273.15).toFixed(1);
    }
  }
}