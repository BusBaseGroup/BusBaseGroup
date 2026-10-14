export const features={
  "live": {
    "title": "Live duty board",
    "heading": "Your services, at a glance.",
    "description": "Published duties, assigned drivers and vehicles, with current service status.",
    "collection": "teamDuties",
    "view": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller",
      "junior_controller",
      "scheduler",
      "lead_driver",
      "driver"
    ],
    "write": [],
    "columns": [
      "duty",
      "route",
      "driverUid",
      "vehicleId",
      "startAt",
      "status"
    ],
    "fields": [],
    "actions": [
      {
        "id": "allocate",
        "label": "Allocate vehicle",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller",
          "controller"
        ],
        "note": true,
        "extra": "vehicle"
      },
      {
        "id": "start",
        "label": "Start duty",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller",
          "controller",
          "junior_controller",
          "scheduler",
          "lead_driver",
          "driver"
        ],
        "ownDriver": true
      },
      {
        "id": "finish",
        "label": "Finish duty",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller",
          "controller",
          "junior_controller",
          "scheduler",
          "lead_driver",
          "driver"
        ],
        "ownDriver": true
      }
    ],
    "statuses": [
      "planned",
      "in_service",
      "finished",
      "cancelled"
    ]
  },
  "controller-log": {
    "title": "Controller log",
    "heading": "Keep the control desk informed.",
    "description": "Record delays, breakdowns and driver messages, then record the action taken.",
    "collection": "teamControllerLog",
    "view": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller",
      "junior_controller",
      "scheduler"
    ],
    "write": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller",
      "junior_controller"
    ],
    "columns": [
      "title",
      "route",
      "category",
      "priority",
      "status"
    ],
    "fields": [
      {
        "key": "title",
        "label": "Incident / message",
        "type": "text",
        "required": true
      },
      {
        "key": "route",
        "label": "Route",
        "type": "text",
        "required": false
      },
      {
        "key": "duty",
        "label": "Duty",
        "type": "text",
        "required": false
      },
      {
        "key": "category",
        "label": "Type",
        "type": "select",
        "required": true,
        "options": [
          "Delay",
          "Breakdown",
          "Driver message",
          "Service issue",
          "Other"
        ]
      },
      {
        "key": "priority",
        "label": "Priority",
        "type": "select",
        "required": true,
        "options": [
          "Routine",
          "Urgent"
        ]
      },
      {
        "key": "details",
        "label": "What happened / action taken",
        "type": "textarea",
        "required": true
      }
    ],
    "actions": [
      {
        "id": "close",
        "label": "Close incident",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller",
          "controller"
        ],
        "note": true
      }
    ],
    "statuses": [
      "open",
      "closed"
    ]
  },
  "vehicle-status": {
    "title": "Vehicle status board",
    "heading": "Know which buses can go out.",
    "description": "Availability, inspections and off-road vehicles. Unresolved defect holds block allocation.",
    "collection": "teamVehicles",
    "view": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller",
      "junior_controller",
      "scheduler",
      "lead_driver",
      "driver"
    ],
    "write": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller"
    ],
    "columns": [
      "fleetNumber",
      "registration",
      "vehicleType",
      "depot",
      "status",
      "statusReason"
    ],
    "fields": [
      {
        "key": "fleetNumber",
        "label": "Fleet number",
        "type": "text",
        "required": true
      },
      {
        "key": "registration",
        "label": "Registration",
        "type": "text",
        "required": true
      },
      {
        "key": "vehicleType",
        "label": "Vehicle type",
        "type": "catalogue",
        "required": true
      },
      {
        "key": "depot",
        "label": "Depot",
        "type": "text",
        "required": true
      },
      {
        "key": "statusReason",
        "label": "Inspection / status notes",
        "type": "textarea",
        "required": true
      }
    ],
    "actions": [
      {
        "id": "available",
        "label": "Mark available",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller",
          "controller"
        ],
        "note": true
      },
      {
        "id": "awaiting_check",
        "label": "Awaiting inspection",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller",
          "controller"
        ],
        "note": true
      },
      {
        "id": "off_road",
        "label": "Take off road",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller",
          "controller"
        ],
        "note": true
      }
    ],
    "statuses": [
      "available",
      "allocated",
      "awaiting_check",
      "off_road"
    ]
  },
  "driver-reports": {
    "title": "Driver reports",
    "heading": "A clear record for every driver.",
    "description": "Record incidents, feedback, assessments and formal warnings. Drivers can see their own records.",
    "collection": "teamDriverReports",
    "view": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller",
      "junior_controller",
      "scheduler",
      "lead_driver",
      "driver"
    ],
    "write": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller",
      "lead_driver"
    ],
    "readAll": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller",
      "lead_driver"
    ],
    "columns": [
      "userId",
      "category",
      "title",
      "status",
      "date"
    ],
    "fields": [
      {
        "key": "userId",
        "label": "Driver",
        "type": "staff",
        "required": true
      },
      {
        "key": "category",
        "label": "Report type",
        "type": "select",
        "required": true,
        "options": [
          "Incident",
          "Feedback",
          "Assessment",
          "Warning"
        ]
      },
      {
        "key": "title",
        "label": "Subject",
        "type": "text",
        "required": true
      },
      {
        "key": "details",
        "label": "Facts / assessment",
        "type": "textarea",
        "required": true
      },
      {
        "key": "improvement",
        "label": "Improvement expected / next steps",
        "type": "textarea",
        "required": false
      }
    ],
    "actions": [
      {
        "id": "acknowledge",
        "label": "Acknowledge my report",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller",
          "controller",
          "junior_controller",
          "scheduler",
          "lead_driver",
          "driver"
        ],
        "own": true
      }
    ],
    "statuses": [
      "issued",
      "acknowledged"
    ]
  },
  "approval-requests": {
    "title": "Controller approval requests",
    "heading": "Request a decision. Keep a record.",
    "description": "Junior Controllers can request restricted actions. A senior controller records the decision.",
    "collection": "teamApprovalRequests",
    "view": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller",
      "junior_controller"
    ],
    "write": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller",
      "junior_controller"
    ],
    "readAll": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller"
    ],
    "columns": [
      "discordUsername",
      "category",
      "route",
      "title",
      "status"
    ],
    "fields": [
      {
        "key": "category",
        "label": "Action requested",
        "type": "select",
        "required": true,
        "options": [
          "Emergency diversion",
          "Service diversion",
          "Curtailment",
          "Vehicle change",
          "Other"
        ]
      },
      {
        "key": "route",
        "label": "Route",
        "type": "text",
        "required": true
      },
      {
        "key": "title",
        "label": "Request summary",
        "type": "text",
        "required": true
      },
      {
        "key": "details",
        "label": "Reason and proposed action",
        "type": "textarea",
        "required": true
      }
    ],
    "actions": [
      {
        "id": "approve",
        "label": "Approve request",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller",
          "controller"
        ],
        "note": true
      },
      {
        "id": "deny",
        "label": "Decline request",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller",
          "controller"
        ],
        "note": true
      }
    ],
    "statuses": [
      "pending",
      "approved",
      "denied"
    ]
  },
  "scheduling": {
    "title": "Duty scheduling",
    "heading": "Plan the next shift.",
    "description": "Schedulers prepare duties. General Managers, Supervisors and Lead Controllers publish them to the live board.",
    "collection": "teamDuties",
    "view": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "scheduler"
    ],
    "write": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "scheduler"
    ],
    "columns": [
      "duty",
      "route",
      "driverUid",
      "vehicleId",
      "startAt",
      "status"
    ],
    "fields": [
      {
        "key": "duty",
        "label": "Duty number",
        "type": "text",
        "required": true
      },
      {
        "key": "route",
        "label": "Route",
        "type": "text",
        "required": true
      },
      {
        "key": "depot",
        "label": "Depot",
        "type": "text",
        "required": true
      },
      {
        "key": "driverUid",
        "label": "Assigned driver",
        "type": "staff",
        "required": true
      },
      {
        "key": "vehicleId",
        "label": "Allocated vehicle",
        "type": "vehicle",
        "required": true
      },
      {
        "key": "startAt",
        "label": "Start date and time",
        "type": "datetime-local",
        "required": true
      },
      {
        "key": "endAt",
        "label": "Finish date and time",
        "type": "datetime-local",
        "required": true
      },
      {
        "key": "notes",
        "label": "Duty notes",
        "type": "textarea",
        "required": false
      }
    ],
    "actions": [
      {
        "id": "publish",
        "label": "Publish duty",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller"
        ],
        "note": true
      },
      {
        "id": "cancel",
        "label": "Cancel duty",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller",
          "scheduler"
        ],
        "note": true
      }
    ],
    "statuses": [
      "draft",
      "planned",
      "in_service",
      "finished",
      "cancelled"
    ]
  },
  "handover": {
    "title": "Shift handover",
    "heading": "Leave the next desk ready.",
    "description": "Record outstanding service issues and defects, then acknowledge the handover on taking control.",
    "collection": "teamHandovers",
    "view": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller",
      "junior_controller",
      "scheduler"
    ],
    "write": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller",
      "junior_controller"
    ],
    "columns": [
      "title",
      "shift",
      "discordUsername",
      "status",
      "date"
    ],
    "fields": [
      {
        "key": "title",
        "label": "Handover subject",
        "type": "text",
        "required": true
      },
      {
        "key": "shift",
        "label": "Shift / duty period",
        "type": "text",
        "required": true
      },
      {
        "key": "details",
        "label": "Outstanding service issues",
        "type": "textarea",
        "required": true
      },
      {
        "key": "defects",
        "label": "Outstanding defects and vehicle references",
        "type": "textarea",
        "required": false
      },
      {
        "key": "nextSteps",
        "label": "Actions for the next controller",
        "type": "textarea",
        "required": true
      }
    ],
    "actions": [
      {
        "id": "acknowledge",
        "label": "Take over / acknowledge",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller",
          "controller",
          "junior_controller"
        ],
        "note": true
      }
    ],
    "statuses": [
      "open",
      "acknowledged"
    ]
  },
  "availability": {
    "title": "Staff availability",
    "heading": "Let the team know when you are free.",
    "description": "Submit your availability. Scheduling and control staff can view the planning list.",
    "collection": "teamAvailability",
    "view": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller",
      "junior_controller",
      "scheduler",
      "lead_driver",
      "driver"
    ],
    "write": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller",
      "junior_controller",
      "scheduler",
      "lead_driver",
      "driver"
    ],
    "readAll": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller",
      "junior_controller",
      "scheduler"
    ],
    "columns": [
      "discordUsername",
      "startAt",
      "endAt",
      "activity",
      "status"
    ],
    "fields": [
      {
        "key": "startAt",
        "label": "Available from",
        "type": "datetime-local",
        "required": true
      },
      {
        "key": "endAt",
        "label": "Available until",
        "type": "datetime-local",
        "required": true
      },
      {
        "key": "activity",
        "label": "Available for",
        "type": "select",
        "required": true,
        "options": [
          "Driving",
          "Controlling",
          "Either"
        ]
      },
      {
        "key": "notes",
        "label": "Notes",
        "type": "textarea",
        "required": false
      }
    ],
    "actions": [
      {
        "id": "withdraw",
        "label": "Withdraw my availability",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller",
          "controller",
          "junior_controller",
          "scheduler",
          "lead_driver",
          "driver"
        ],
        "own": true
      }
    ],
    "statuses": [
      "available",
      "withdrawn"
    ]
  },
  "training": {
    "title": "Training records",
    "heading": "Build skills. Record progress.",
    "description": "Track route knowledge, bus-type assessments and controller training. Senior staff approve assessment outcomes.",
    "collection": "teamTraining",
    "view": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller",
      "junior_controller",
      "scheduler",
      "lead_driver",
      "driver"
    ],
    "write": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "lead_driver"
    ],
    "readAll": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "lead_driver"
    ],
    "columns": [
      "userId",
      "category",
      "subject",
      "assessor",
      "status"
    ],
    "fields": [
      {
        "key": "userId",
        "label": "Staff member",
        "type": "staff",
        "required": true
      },
      {
        "key": "category",
        "label": "Training type",
        "type": "select",
        "required": true,
        "options": [
          "Bus type",
          "Route knowledge",
          "Controller assessment",
          "Other"
        ]
      },
      {
        "key": "subject",
        "label": "Bus type / route / skill",
        "type": "text",
        "required": true
      },
      {
        "key": "details",
        "label": "Assessment and evidence",
        "type": "textarea",
        "required": true
      }
    ],
    "actions": [
      {
        "id": "pass",
        "label": "Approve / passed",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller"
        ],
        "note": true
      },
      {
        "id": "needs_training",
        "label": "Further training required",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller"
        ],
        "note": true
      }
    ],
    "statuses": [
      "awaiting_approval",
      "passed",
      "needs_training"
    ]
  },
  "notices": {
    "title": "Staff notices",
    "heading": "Keep everyone up to date.",
    "description": "Publish operational notices and record which staff have acknowledged them.",
    "collection": "teamNotices",
    "view": [
      "general_manager",
      "supervisor",
      "lead_controller",
      "controller",
      "junior_controller",
      "scheduler",
      "lead_driver",
      "driver"
    ],
    "write": [
      "general_manager",
      "supervisor",
      "lead_controller"
    ],
    "columns": [
      "title",
      "audience",
      "discordUsername",
      "status",
      "ackCount"
    ],
    "fields": [
      {
        "key": "title",
        "label": "Notice title",
        "type": "text",
        "required": true
      },
      {
        "key": "audience",
        "label": "Audience",
        "type": "select",
        "required": true,
        "options": [
          "all",
          "general_manager",
          "supervisor",
          "lead_controller",
          "controller",
          "junior_controller",
          "scheduler",
          "lead_driver",
          "driver"
        ]
      },
      {
        "key": "details",
        "label": "Notice text",
        "type": "textarea",
        "required": true
      }
    ],
    "actions": [
      {
        "id": "publish",
        "label": "Publish notice",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller"
        ],
        "note": true
      },
      {
        "id": "acknowledge",
        "label": "Acknowledge notice",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller",
          "controller",
          "junior_controller",
          "scheduler",
          "lead_driver",
          "driver"
        ]
      },
      {
        "id": "archive",
        "label": "Archive notice",
        "roles": [
          "general_manager",
          "supervisor",
          "lead_controller"
        ],
        "note": true
      }
    ],
    "statuses": [
      "draft",
      "published",
      "archived"
    ]
  }
};
