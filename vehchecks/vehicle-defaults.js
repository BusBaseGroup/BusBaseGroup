export const defaultVehicleTypes = {
  "e400mmc": {
    name: "ADL Enviro400 MMC",
    manufacturer: "Alexander Dennis",
    power: "Diesel",
    groups: [
      {
        title: "Exterior",
        description: "Walk-around checks before entering service.",
        checks: [
          ["Bodywork condition", "Check panels, mirrors, windows and obvious damage."],
          ["Tyres and wheels", "Check tyre condition, wheel nuts and visible damage."],
          ["Headlights and marker lights", "Check front lighting and side marker lights."],
          ["Rear lights and brake lights", "Confirm all rear lamps illuminate correctly."],
          ["Destination displays", "Front, side and rear displays working and legible."],
          ["Doors", "Check front and centre doors open and close correctly."],
          ["Emergency exits", "Check emergency doors/windows are secure and accessible."]
        ]
      },
      {
        title: "Cab",
        description: "Driver controls and warning systems.",
        checks: [
          ["Master switch and ignition", "Vehicle powers up normally."],
          ["Dashboard warning lights", "No unexpected EML, ABS, brake, air or DPF warnings."],
          ["Air pressure", "Air builds correctly and remains in the safe range."],
          ["Parking brake", "Applies and releases correctly."],
          ["Service brake", "Brake pedal feels normal and braking response is correct."],
          ["Steering", "No excessive play or abnormal resistance."],
          ["Horn", "Horn operates correctly."],
          ["Wipers and washers", "Front wipers and screenwash operate."],
          ["Cab mirrors", "Interior and exterior mirrors correctly positioned."],
          ["CCTV monitor", "CCTV system powers on and cameras display."]
        ]
      },
      {
        title: "Saloon",
        description: "Passenger area and upper deck.",
        checks: [
          ["Interior lighting", "Saloon and stairwell lights operate."],
          ["Lower deck condition", "No loose objects, damage or hazards."],
          ["Upper deck condition", "Walk upper deck and check seats/floor."],
          ["Staircase", "Handrails, step edges and lighting secure."],
          ["Bell pushes", "Stop request bells operate."],
          ["Wheelchair ramp", "Ramp deploys and stows correctly."],
          ["Wheelchair bay", "Area clear and restraint equipment present if fitted."],
          ["Heating / ventilation", "System responds to controls."]
        ]
      }
    ]
  },

  "e200mmc": {
    name: "ADL Enviro200 MMC",
    manufacturer: "Alexander Dennis",
    power: "Diesel",
    groups: [
      {
        title: "Exterior",
        description: "Single-deck walk-around checks.",
        checks: [
          ["Bodywork and glass", "Check for fresh damage, cracked glass or loose panels."],
          ["Tyres and wheels", "Inspect tyre condition and wheels."],
          ["Exterior lights", "Headlights, indicators, brake and marker lights."],
          ["Destination equipment", "Front, side and rear displays if fitted."],
          ["Entrance door", "Door opens and closes correctly."],
          ["Emergency exits", "Emergency exits are accessible and secure."]
        ]
      },
      {
        title: "Cab",
        description: "Driver controls.",
        checks: [
          ["Dashboard self-test", "Dash completes startup normally."],
          ["Warning lights", "No unexpected warning lamps remain illuminated."],
          ["Brakes", "Parking and service brakes operate correctly."],
          ["Steering", "Steering operates without excessive play."],
          ["Horn", "Horn operates."],
          ["Wipers / washers", "Wipers and washers operate."],
          ["Mirrors", "Mirrors adjusted and undamaged."],
          ["Ticket machine / cab equipment", "Equipment powers up if being simulated."]
        ]
      },
      {
        title: "Passenger area",
        description: "Interior safety checks.",
        checks: [
          ["Saloon lighting", "Interior lighting operates."],
          ["Floor and seats", "No hazards, loose seats or obstructions."],
          ["Bell pushes", "Stop buttons operate."],
          ["Wheelchair ramp", "Ramp operates correctly."],
          ["Wheelchair area", "Area is clear and ready for use."]
        ]
      }
    ]
  },

  "citaro": {
    name: "Mercedes-Benz Citaro O530",
    manufacturer: "Mercedes-Benz",
    power: "Diesel",
    groups: [
      {
        title: "Exterior",
        description: "Citaro-specific external inspection.",
        checks: [
          ["Body panels and glazing", "Check for visible damage and cracked glass."],
          ["Tyres and wheels", "Check all visible tyres and wheel condition."],
          ["Exterior lighting", "Headlights, indicators, brake and marker lights."],
          ["Destination displays", "Check destination displays are powered and readable."],
          ["Front door", "Front door cycles correctly."],
          ["Centre / rear door", "Additional passenger door operates correctly."],
          ["Kneeling function", "Check kneeling system lowers and raises correctly."]
        ]
      },
      {
        title: "Cab",
        description: "Driver controls and pneumatic systems.",
        checks: [
          ["Instrument cluster", "Startup sequence completes correctly."],
          ["Warning messages", "No unexpected STOP or warning messages."],
          ["Air pressure", "System builds and holds sufficient air pressure."],
          ["Parking brake", "Parking brake applies and releases."],
          ["Retarder", "Retarder operates when selected."],
          ["Service brakes", "Braking response normal."],
          ["Steering", "Steering free from abnormal play."],
          ["Wipers and washers", "Front screen equipment works."],
          ["Horn", "Horn operates correctly."]
        ]
      },
      {
        title: "Passenger area",
        description: "Interior and accessibility.",
        checks: [
          ["Interior lights", "Saloon lighting works."],
          ["Passenger seating", "Seats and grab poles secure."],
          ["Bell pushes", "Stop request system works."],
          ["Ramp", "Manual/electric ramp usable depending on model."],
          ["Heating / ventilation", "Saloon HVAC responds correctly."]
        ]
      }
    ]
  },

  "b9tl": {
    name: "Volvo B9TL / Wright Gemini",
    manufacturer: "Volvo / Wrightbus",
    power: "Diesel",
    groups: [
      {
        title: "Exterior",
        description: "Double-deck external checks.",
        checks: [
          ["Bodywork", "Check body panels, glass and mirrors."],
          ["Tyres and wheels", "Inspect all visible wheel positions."],
          ["Exterior lighting", "Front, rear, indicator and marker lights."],
          ["Destination displays", "Check front, side and rear displays."],
          ["Front door", "Door cycles correctly."],
          ["Emergency exits", "Emergency exit points accessible and secure."]
        ]
      },
      {
        title: "Cab",
        description: "Volvo chassis controls.",
        checks: [
          ["Dashboard startup", "Dashboard powers up normally."],
          ["Warning lamps", "No unexpected engine, brake or ABS warnings."],
          ["Air pressure", "Air system reaches operating pressure."],
          ["Parking brake", "Check operation and warning lamp."],
          ["Service brake", "Normal pedal response."],
          ["Gear selector", "D/N/R selector responds correctly."],
          ["Steering", "No excessive movement or abnormal feel."],
          ["Wipers and washers", "Check both functions."],
          ["Horn", "Horn sounds correctly."]
        ]
      },
      {
        title: "Saloon",
        description: "Passenger compartment.",
        checks: [
          ["Lower deck", "Seats, floor and handrails safe."],
          ["Upper deck", "Seats, floor and handrails safe."],
          ["Stairs", "Steps and rails unobstructed."],
          ["Interior lighting", "Lighting works throughout."],
          ["Bell pushes", "Stop request system operates."],
          ["Wheelchair space", "Area clear and accessible."]
        ]
      }
    ]
  },

  "streetdeck": {
    name: "Wright StreetDeck",
    manufacturer: "Wrightbus",
    power: "Diesel / Micro-hybrid",
    groups: [
      {
        title: "Exterior",
        description: "StreetDeck external walk-round.",
        checks: [
          ["Bodywork and glazing", "Check for visible defects."],
          ["Tyres and wheels", "Inspect tyre condition and wheel security."],
          ["Exterior lights", "All legally required lights operating."],
          ["Destination displays", "Front, side and rear displays working."],
          ["Doors", "Front and centre doors operate."],
          ["Emergency exits", "Emergency exit systems accessible."]
        ]
      },
      {
        title: "Driver area",
        description: "StreetDeck cab checks.",
        checks: [
          ["Instrument display", "Display starts correctly."],
          ["Warning messages", "No unplanned warning messages."],
          ["Air pressure", "Air system builds normally."],
          ["Parking brake", "Applies and releases correctly."],
          ["Service brakes", "Normal response."],
          ["Steering", "Normal movement and assistance."],
          ["Wipers / screenwash", "Operate correctly."],
          ["Horn", "Operates correctly."],
          ["Cameras / mirrors", "Camera monitor and mirrors usable."]
        ]
      },
      {
        title: "Interior",
        description: "Passenger safety checks.",
        checks: [
          ["Lower saloon", "Check seats and floor."],
          ["Upper saloon", "Check seats and floor."],
          ["Staircase", "Check steps and rails."],
          ["Lighting", "Interior and stair lighting."],
          ["Stop bells", "Bell pushes sound and display."],
          ["Wheelchair ramp", "Ramp operates."],
          ["USB ports", "Optional check for passenger USB power."]
        ]
      }
    ]
  }
};
