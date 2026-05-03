document.addEventListener("DOMContentLoaded", function () {
  var stateSelect = document.getElementById("stateSelect");
  var citySelect = document.getElementById("citySelect");
  var findBusBtn = document.getElementById("findBusBtn");
  var resultsBox = document.getElementById("resultsBox");
  var locationBtn = document.getElementById("useLocationBtn");
  var locationStatus = document.getElementById("locationStatus");
  var endLocation = document.getElementById("endLocation");
  var startStop = document.getElementById("startStop");
  var mapSection = document.getElementById("mapSection");

  var hasBusTrackingUi =
    !!stateSelect &&
    !!citySelect &&
    !!findBusBtn &&
    !!resultsBox &&
    !!locationBtn &&
    !!locationStatus &&
    !!endLocation &&
    !!startStop &&
    !!mapSection;

  var cities = {
    Gujarat: ["Surat", "Bardoli", "Navsari", "Valsad"],
    Maharashtra: ["Mumbai", "Pune"],
    Delhi: ["New Delhi", "Noida"]
  };

  var stops = {
    Bardoli: ["Bardoli Bus Station", "Bardoli Linir", "RNGPIT College"],
    Navsari: ["Navsari Central Bus Station", "Grid Road"],
    Valsad: ["Valsad Bus Station"],
    Surat: ["Surat Central Bus Station", "Delhi Gate", "Udhna Darwaja"],
    Mumbai: ["Dadar Asiad", "Maitri Park", "Vashi Highway"],
    Pune: ["Swargate", "Shivajinagar", "Wakadewadi"],
    "New Delhi": ["ISBT Kashmere Gate", "Akshardham", "Mayur Vihar Phase-1"],
    Noida: ["Noida Sector 15", "Noida Sector 16", "Noida Sector 18", "Botanical Garden"]
  };

  var busData = [
    {
      busNo: "GJ-1",
      state: "Gujarat",
      city: "Bardoli",
      to: "Surat",
      via: ["Kadodara"]
    },
    {
      busNo: "GJ-4",
      state: "Gujarat",
      city: "Bardoli",
      to: "Surat",
      via: ["Kadodara"]
    },
    {
      busNo: "GJ-5",
      state: "Gujarat",
      city: "Bardoli",
      to: "Surat",
      via: ["Kadodara"]
    },
    {
      busNo: "GJ-2",
      state: "Gujarat",
      city: "Bardoli",
      to: "Navsari",
      via: ["Maroli"]
    },
    {
      busNo: "GJ-6",
      state: "Gujarat",
      city: "Bardoli",
      to: "Navsari",
      via: ["Maroli"]
    },
    {
      busNo: "GJ-7",
      state: "Gujarat",
      city: "Bardoli",
      to: "Navsari",
      via: ["Maroli"]
    },
    {
      busNo: "GJ-3",
      state: "Gujarat",
      city: "Navsari",
      to: "Surat",
      via: ["Palsana", "Sachin", "Udhna"]
    },
    {
      busNo: "GJ-8",
      state: "Gujarat",
      city: "Navsari",
      to: "Surat",
      via: ["Palsana", "Sachin", "Udhna"]
    },
    {
      busNo: "GJ-9",
      state: "Gujarat",
      city: "Navsari",
      to: "Surat",
      via: ["Palsana", "Udhna"]
    },
    {
      busNo: "GJ-10",
      state: "Gujarat",
      city: "Navsari",
      to: "Akkalkuva",
      via: ["RNGPIT College", "Bardoli Bus Station", "Bardoli Linir", "Valod", "Vyara", "Songadh", "Nizar"]
    },
    {
      busNo: "GJ-11",
      state: "Gujarat",
      city: "Valsad",
      to: "Nizar",
      via: ["Navsari Central Bus Station", "RNGPIT College", "Bardoli Bus Station", "Bardoli Linir", "Vyara", "Songadh"]
    },
    {
      busNo: "GJ-12",
      state: "Gujarat",
      city: "Valsad",
      to: "Dhuliya",
      via: ["Navsari Central Bus Station", "RNGPIT College", "Bardoli Bus Station", "Bardoli Linir", "Vyara", "Songadh", "Selamba"]
    },
    {
      busNo: "GJ-13",
      state: "Gujarat",
      city: "Valsad",
      to: "Dhuliya",
      via: ["Navsari Central Bus Station", "RNGPIT College", "Bardoli Bus Station", "Bardoli Linir", "Vyara", "Songadh", "Selamba"]
    },
    {
      busNo: "MH-1",
      state: "Maharashtra",
      city: "Mumbai",
      to: "Pune",
      via: ["Maitri Park", "Vashi Highway", "Panvel", "Lonavala"]
    },
    {
      busNo: "MH-2",
      state: "Maharashtra",
      city: "Mumbai",
      to: "Pune",
      via: ["Dadar", "Sion", "Kurla Nehru Nagar", "Panvel", "Lonavala"]
    },
    {
      busNo: "MH-3",
      state: "Maharashtra",
      city: "Mumbai",
      to: "Pune",
      via: ["Maitri Park", "Vashi Highway", "Panvel", "Lonavala", "Shivajinagar"]
    },
    {
      busNo: "MH-4",
      state: "Maharashtra",
      city: "Mumbai",
      to: "Pune",
      via: ["Dadar", "Kurla Nehru Nagar", "Vashi Highway", "Panvel", "Lonavala"]
    },
    {
      busNo: "MH-5",
      state: "Maharashtra",
      city: "Mumbai",
      to: "Pune",
      via: ["Maitri Park", "Panvel", "Lonavala", "Shivajinagar"]
    },
    {
      busNo: "DL-1",
      state: "Delhi",
      city: "New Delhi",
      to: "Noida",
      via: ["Akshardham", "Mayur Vihar Phase-1", "New Ashok Nagar", "Noida Sector 15", "Noida Sector 18"]
    },
    {
      busNo: "DL-2",
      state: "Delhi",
      city: "New Delhi",
      to: "Noida",
      via: ["Akshardham", "Mayur Vihar Extension", "Noida Sector 16"]
    },
    {
      busNo: "DL-3",
      state: "Delhi",
      city: "New Delhi",
      to: "Noida",
      via: ["Akshardham", "Mayur Vihar Phase-1", "Noida Sector 15", "Noida Sector 16", "Noida Sector 18"]
    },
    {
      busNo: "DL-4",
      state: "Delhi",
      city: "New Delhi",
      to: "Noida",
      via: ["Akshardham", "Mayur Vihar Extension", "New Ashok Nagar", "Noida Sector 16"]
    },
    {
      busNo: "DL-5",
      state: "Delhi",
      city: "New Delhi",
      to: "Noida",
      via: ["Akshardham", "Mayur Vihar Phase-1", "New Ashok Nagar", "Noida Sector 16", "Botanical Garden"]
    }
  ];

  var busRoutes = {
    "GJ-1": [
      [21.1240, 73.1110],
      [21.2060, 72.9620],
      [21.1702, 72.8311]
    ],
    "GJ-4": [
      [21.1240, 73.1110],
      [21.2060, 72.9620],
      [21.1702, 72.8311]
    ],
    "GJ-5": [
      [21.1240, 73.1110],
      [21.2060, 72.9620],
      [21.1702, 72.8311]
    ],
    "GJ-2": [
      [21.1240, 73.1110],
      [20.9360, 72.9260],
      [20.9467, 72.9520]
    ],
    "GJ-6": [
      [21.1240, 73.1110],
      [20.9360, 72.9260],
      [20.9467, 72.9520]
    ],
    "GJ-7": [
      [21.1240, 73.1110],
      [20.9360, 72.9260],
      [20.9467, 72.9520]
    ],
    "GJ-3": [
      [20.9467, 72.9520],
      [21.2260, 72.9750],
      [21.1100, 72.8890],
      [21.1550, 72.8420],
      [21.1702, 72.8311]
    ],
    "GJ-8": [
      [20.9467, 72.9520],
      [21.2260, 72.9750],
      [21.1100, 72.8890],
      [21.1550, 72.8420],
      [21.1702, 72.8311]
    ],
    "GJ-9": [
      [20.9467, 72.9520],
      [21.2260, 72.9750],
      [21.1550, 72.8420],
      [21.1702, 72.8311]
    ],
    "GJ-10": [
      [20.9467, 72.9520],
      [21.0913, 73.1044],
      [21.1265, 73.1112],
      [21.1322, 73.0996],
      [21.0489, 73.2615],
      [21.1177, 73.3858],
      [21.1702, 73.5623],
      [21.4770, 74.1958],
      [21.5550, 74.0162]
    ],
    "GJ-11": [
      [20.5992, 72.9342],
      [20.9467, 72.9520],
      [21.0913, 73.1044],
      [21.1265, 73.1112],
      [21.1322, 73.0996],
      [21.1177, 73.3858],
      [21.1702, 73.5623],
      [21.4770, 74.1958]
    ],
    "GJ-12": [
      [20.5992, 72.9342],
      [20.9467, 72.9520],
      [21.0913, 73.1044],
      [21.1265, 73.1112],
      [21.1322, 73.0996],
      [21.1177, 73.3858],
      [21.1702, 73.5623],
      [21.5199, 73.8179],
      [21.1305, 74.4901]
    ],
    "GJ-13": [
      [20.5992, 72.9342],
      [20.9467, 72.9520],
      [21.0913, 73.1044],
      [21.1265, 73.1112],
      [21.1322, 73.0996],
      [21.1177, 73.3858],
      [21.1702, 73.5623],
      [21.5199, 73.8179],
      [21.1305, 74.4901]
    ],
    "MH-1": [
      [19.0760, 72.8777],
      [19.0520, 72.8990],
      [19.0330, 73.0297],
      [18.9894, 73.1175],
      [18.7500, 73.4070],
      [18.5204, 73.8567]
    ],
    "MH-2": [
      [19.0760, 72.8777],
      [19.0178, 72.8478],
      [19.0430, 72.8610],
      [19.0870, 72.8910],
      [19.0330, 73.0297],
      [18.9100, 73.3200],
      [18.5204, 73.8567]
    ],
    "MH-3": [
      [19.0760, 72.8777],
      [19.0520, 72.8990],
      [19.0330, 73.0297],
      [18.9894, 73.1175],
      [18.7500, 73.4070],
      [18.5300, 73.8470],
      [18.5204, 73.8567]
    ],
    "MH-4": [
      [19.0760, 72.8777],
      [19.0178, 72.8478],
      [19.0870, 72.8910],
      [19.0330, 73.0297],
      [18.9894, 73.1175],
      [18.7500, 73.4070],
      [18.5204, 73.8567]
    ],
    "MH-5": [
      [19.0760, 72.8777],
      [19.0520, 72.8990],
      [18.9894, 73.1175],
      [18.7500, 73.4070],
      [18.5300, 73.8470],
      [18.5204, 73.8567]
    ],
    "DL-1": [
      [28.6139, 77.2090],
      [28.6175, 77.2795],
      [28.6066, 77.2960],
      [28.5894, 77.3159],
      [28.5781, 77.3178],
      [28.5732, 77.3230],
      [28.5355, 77.3910]
    ],
    "DL-2": [
      [28.6139, 77.2090],
      [28.6077, 77.2942],
      [28.5894, 77.3159],
      [28.5732, 77.3230],
      [28.5355, 77.3910]
    ],
    "DL-3": [
      [28.6139, 77.2090],
      [28.6175, 77.2795],
      [28.6066, 77.2960],
      [28.5781, 77.3178],
      [28.5732, 77.3230],
      [28.5707, 77.3260],
      [28.5355, 77.3910]
    ],
    "DL-4": [
      [28.6139, 77.2090],
      [28.6130, 77.2400],
      [28.6077, 77.2942],
      [28.5894, 77.3159],
      [28.5732, 77.3230],
      [28.5355, 77.3910]
    ],
    "DL-5": [
      [28.6139, 77.2090],
      [28.6280, 77.2410],
      [28.6066, 77.2960],
      [28.5894, 77.3159],
      [28.5670, 77.3210],
      [28.5542, 77.3348],
      [28.5355, 77.3910]
    ]
  };

  var currentLiveTrips = {};
  var map;
  var routeLine;
  var busMarker;
  var destMarker;
  var detailMap;
  var detailMapLayers = [];
  var currentBusResultStates = {};
  var isTracking = false;

  function normalizeText(value) {
    return String(value || "").toLowerCase().trim();
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getInitialResultsMarkup() {
    return (
      "<h2 class='card-title'>Results</h2>" +
      "<p class='card-sub'>No buses searched yet.</p>" +
      "<p class='hint'>Tip: Search by city and destination to see direct buses, connecting routes, ETA, and live bus position.</p>"
    );
  }

  function resetResults() {
    currentLiveTrips = {};
    setResultsHtml(getInitialResultsMarkup());
  }

  function setResultsHtml(html) {
    resultsBox.innerHTML = html;
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  function hideMap() {
    mapSection.style.display = "none";
  }

  function resetLocationChoice() {
    locationBtn.classList.remove("selected");
    locationStatus.innerText = "";
    startStop.value = "";
  }

  function populateCities(selectedState) {
    citySelect.innerHTML = "<option value=''>Select City</option>";
    citySelect.disabled = true;

    if (!selectedState || !cities[selectedState]) {
      return;
    }

    for (var i = 0; i < cities[selectedState].length; i++) {
      var option = document.createElement("option");
      option.value = cities[selectedState][i];
      option.text = cities[selectedState][i];
      citySelect.add(option);
    }

    citySelect.disabled = false;
  }

  function populateStops(selectedCity) {
    startStop.innerHTML = "<option value=''>Select Nearby Stop (Optional)</option>";

    if (!selectedCity || !stops[selectedCity]) {
      return;
    }

    for (var i = 0; i < stops[selectedCity].length; i++) {
      var option = document.createElement("option");
      option.value = stops[selectedCity][i];
      option.text = stops[selectedCity][i];
      startStop.add(option);
    }
  }

  function createSeed(text) {
    var seed = 0;
    var i;

    for (i = 0; i < text.length; i++) {
      seed = (seed * 31 + text.charCodeAt(i)) % 2147483647;
    }

    return seed || 13579;
  }

  function seededRandom(seed) {
    var next = (seed * 48271) % 2147483647;
    return {
      seed: next,
      value: next / 2147483647
    };
  }

  function getBusStops(bus) {
    return [bus.city].concat(bus.via, [bus.to]);
  }

  function getBoardingTarget(selectedCity, selectedStop) {
    return {
      label: selectedStop || selectedCity + " pickup point",
      stopIndex: 0
    };
  }

  function getTargetMatch(bus, normalizedDestination) {
    var stopsList = getBusStops(bus);
    var i;
    var stopName;
    var normalizedStop;

    if (!normalizedDestination) {
      return null;
    }

    for (i = 1; i < stopsList.length; i++) {
      stopName = stopsList[i];
      normalizedStop = normalizeText(stopName);

      if (
        normalizedStop.indexOf(normalizedDestination) !== -1 ||
        normalizedDestination.indexOf(normalizedStop) !== -1
      ) {
        return {
          label: stopName,
          stopIndex: i
        };
      }
    }

    return null;
  }

  function matchesDestination(bus, normalizedDestination) {
    return !!getTargetMatch(bus, normalizedDestination);
  }

  function getBusesFromCity(selectedState, selectedCity) {
    var matches = [];
    var i;

    for (i = 0; i < busData.length; i++) {
      if (
        busData[i].state === selectedState &&
        busData[i].city === selectedCity
      ) {
        matches.push(busData[i]);
      }
    }

    return matches;
  }

  function findConnectingRoute(selectedState, selectedCity, normalizedDestination) {
    var firstLegOptions = getBusesFromCity(selectedState, selectedCity);
    var i;
    var j;
    var firstBus;
    var secondBus;

    for (i = 0; i < firstLegOptions.length; i++) {
      firstBus = firstLegOptions[i];

      for (j = 0; j < busData.length; j++) {
        secondBus = busData[j];

        if (secondBus.state !== selectedState) {
          continue;
        }

        if (normalizeText(secondBus.city) !== normalizeText(firstBus.to)) {
          continue;
        }

        if (matchesDestination(secondBus, normalizedDestination)) {
          return {
            firstBus: firstBus,
            secondBus: secondBus
          };
        }
      }
    }

    return null;
  }

  function getDistanceKm(pointA, pointB) {
    var lat1 = pointA[0] * Math.PI / 180;
    var lat2 = pointB[0] * Math.PI / 180;
    var deltaLat = (pointB[0] - pointA[0]) * Math.PI / 180;
    var deltaLng = (pointB[1] - pointA[1]) * Math.PI / 180;
    var a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return 6371 * c;
  }

  function interpolatePoint(pointA, pointB, ratio) {
    return [
      pointA[0] + (pointB[0] - pointA[0]) * ratio,
      pointA[1] + (pointB[1] - pointA[1]) * ratio
    ];
  }

  function getDistanceAlongRoute(routePoints, endIndex) {
    var distance = 0;
    var i;

    for (i = 0; i < endIndex; i++) {
      distance += getDistanceKm(routePoints[i], routePoints[i + 1]);
    }

    return distance;
  }

  function getPreRoutePoint(firstPoint, distanceKm) {
    return [
      firstPoint[0] + distanceKm / 111,
      firstPoint[1] - distanceKm / 111
    ];
  }

  function getPointAtDistance(routePoints, distanceFromStart) {
    var remaining = distanceFromStart;
    var segmentDistance;
    var i;

    if (distanceFromStart <= 0) {
      return routePoints[0];
    }

    for (i = 0; i < routePoints.length - 1; i++) {
      segmentDistance = getDistanceKm(routePoints[i], routePoints[i + 1]);

      if (remaining <= segmentDistance) {
        return interpolatePoint(
          routePoints[i],
          routePoints[i + 1],
          remaining / segmentDistance
        );
      }

      remaining -= segmentDistance;
    }

    return routePoints[routePoints.length - 1];
  }

  function getSegmentLabel(bus, targetIndex, currentDistanceFromStart, targetDistanceFromStart) {
    var routeStops = getBusStops(bus);
    var totalBeforeTarget = targetDistanceFromStart - currentDistanceFromStart;
    var previousLabel = routeStops[Math.max(0, targetIndex - 1)];

    if (totalBeforeTarget < 1.5) {
      return "almost at " + routeStops[targetIndex];
    }

    return "between " + previousLabel + " and " + routeStops[targetIndex];
  }

  function buildLiveSnapshot(bus, targetMatch) {
    var routePoints = busRoutes[bus.busNo];
    var routeStops = getBusStops(bus);
    var seedState = seededRandom(createSeed(bus.busNo + "|" + targetMatch.label));
    var averageSpeedKmPerMin = 0.5 + seedState.value * 0.22;
    var targetDistanceFromStart;
    var progressRatioState;
    var progressRatio;
    var remainingDistanceKm;
    var currentDistanceFromStart;
    var currentPoint;
    var etaMinutes;
    var preRouteDistanceKm;

    if (!routePoints || routePoints.length !== routeStops.length) {
      return null;
    }

    if (targetMatch.stopIndex === 0) {
      progressRatioState = seededRandom(seedState.seed);
      preRouteDistanceKm = 1.2 + progressRatioState.value * 4.8;
      currentPoint = getPreRoutePoint(routePoints[0], preRouteDistanceKm);
      etaMinutes = Math.max(
        2,
        Math.round(preRouteDistanceKm / (0.45 + seedState.value * 0.18))
      );

      return {
        busNo: bus.busNo,
        routePoints: routePoints,
        targetPoint: routePoints[0],
        targetStop: targetMatch.label,
        etaMinutes: etaMinutes,
        remainingDistanceKm: preRouteDistanceKm,
        currentPoint: currentPoint,
        currentStatus: "approaching " + targetMatch.label
      };
    }

    targetDistanceFromStart = getDistanceAlongRoute(routePoints, targetMatch.stopIndex);
    progressRatioState = seededRandom(seedState.seed);
    progressRatio = 0.68 + progressRatioState.value * 0.22;

    if (targetDistanceFromStart < 1) {
      progressRatio = 0.85;
    }

    currentDistanceFromStart = targetDistanceFromStart * progressRatio;
    remainingDistanceKm = Math.max(
      0.35,
      targetDistanceFromStart - currentDistanceFromStart
    );
    currentPoint = getPointAtDistance(routePoints, currentDistanceFromStart);
    etaMinutes = Math.max(
      2,
      Math.round(remainingDistanceKm / averageSpeedKmPerMin)
    );

    return {
      busNo: bus.busNo,
      routePoints: routePoints,
      targetPoint: routePoints[targetMatch.stopIndex],
      targetStop: targetMatch.label,
      etaMinutes: etaMinutes,
      remainingDistanceKm: remainingDistanceKm,
      currentPoint: currentPoint,
      currentStatus: getSegmentLabel(
        bus,
        targetMatch.stopIndex,
        currentDistanceFromStart,
        targetDistanceFromStart
      )
    };
  }

  function registerLiveSnapshot(snapshot) {
    if (snapshot) {
      currentLiveTrips[snapshot.busNo] = snapshot;
    }
  }

  function formatDistance(distanceKm) {
    if (distanceKm < 1) {
      return Math.round(distanceKm * 1000) + " m";
    }

    return distanceKm.toFixed(1) + " km";
  }

  function getEtaMarkup(snapshot) {
    return (
      "<div class='bus-line'><b>ETA:</b> " +
      snapshot.etaMinutes +
      " min to your pickup point: " +
      escapeHtml(snapshot.targetStop) +
      "</div>" +
      "<div class='bus-line'><b>Live now:</b> " +
      escapeHtml(snapshot.currentStatus) +
      " (" +
      formatDistance(snapshot.remainingDistanceKm) +
      " away)</div>"
    );
  }

  function getBusCardMeta(busNo, index) {
    var occupancyOptions = [
      { label: "Medium occupancy", className: "medium" },
      { label: "Low occupancy", className: "low" },
      { label: "High occupancy", className: "high" }
    ];
    var hasDelay = index === 0;

    return {
      occupancy: occupancyOptions[index % occupancyOptions.length],
      statusText: hasDelay ? "DELAY" : "ON TIME",
      statusClass: hasDelay ? "delay" : "ok",
      hasDelay: hasDelay
    };
  }

  function buildBusResultCard(busNo, routeText, snapshot, index) {
    var meta = getBusCardMeta(busNo, index);
    var etaText = snapshot ? snapshot.etaMinutes : Math.max(5, 5 + index * 6);
    var distanceText = snapshot ? formatDistance(snapshot.remainingDistanceKm) : (1.2 + index * 1.4).toFixed(1) + " km";
    var displayStatus = meta.statusText === "DELAY" ? "Delay" : "On Time";

    currentBusResultStates[busNo] = {
      eta: etaText,
      distance: distanceText,
      occupancy: meta.occupancy.label,
      occupancyClass: meta.occupancy.className,
      status: displayStatus,
      statusText: meta.statusText,
      statusClass: meta.statusClass,
      hasDelay: meta.hasDelay,
      incidentDelay: meta.hasDelay,
      routeText: routeText
    };

    return (
      "<div class='bus-card" +
      (meta.hasDelay ? " has-delay" : "") +
      "' data-bus-route='" +
      escapeHtml(busNo) +
      "'>" +
      "<div class='bus-card-left'><div class='bus-card-icon'><i data-lucide='bus-front'></i></div></div>" +
      "<div class='bus-card-center'>" +
      "<div class='bus-card-title-row'><h3>" +
      escapeHtml(busNo) +
      "</h3><span class='tag " +
      meta.statusClass +
      "'>" +
      escapeHtml(meta.statusText) +
      "</span><span class='bus-live'><span></span> LIVE</span></div>" +
      "<p class='bus-card-route'>" +
      escapeHtml(routeText) +
      "</p>" +
      "<p class='bus-occupancy " +
      meta.occupancy.className +
      "'>" +
      escapeHtml(meta.occupancy.label) +
      "</p>" +
      (meta.hasDelay
        ? "<button class='bus-delay-note js-incident-delay' type='button'>⚠ Delay expected due to incident</button>"
        : "") +
      "</div>" +
      "<div class='bus-card-right'><p><i data-lucide='clock-3'></i> ETA</p><strong>" +
      etaText +
      " min</strong></div>" +
      "</div>"
    );
  }

  function buildDirectResultsHtml(buses, selectedCity, destination, selectedStop) {
    var html =
      "<h2 class='card-title'>Results</h2>" +
      "<p class='card-sub'>From <b>" +
      escapeHtml(selectedCity) +
      "</b> to destination: <b>" +
      escapeHtml(destination) +
      "</b></p>";
    var i;
    var bus;
    var targetMatch;
    var snapshot;
    var viaText;

    for (i = 0; i < buses.length; i++) {
      bus = buses[i];
      targetMatch = getBoardingTarget(selectedCity, selectedStop);
      snapshot = buildLiveSnapshot(bus, targetMatch);

      registerLiveSnapshot(snapshot);

      html += buildBusResultCard(
        bus.busNo,
        bus.city + " → " + bus.to,
        snapshot,
        i
      );
    }

    return html;
  }

  function buildConnectingRouteHtml(connection, destination, selectedCity, selectedStop) {
    var firstTarget = getBoardingTarget(selectedCity, selectedStop);
    var secondTarget = getTargetMatch(
      connection.secondBus,
      normalizeText(destination)
    );
    var firstSnapshot = buildLiveSnapshot(connection.firstBus, firstTarget);
    var secondSnapshot = buildLiveSnapshot(connection.secondBus, secondTarget);
    var secondViaText = connection.secondBus.via.length
      ? connection.secondBus.via.join(", ")
      : "Direct route";

    registerLiveSnapshot(firstSnapshot);
    registerLiveSnapshot(secondSnapshot);

    return (
      "<h2 class='card-title'>Results</h2>" +
      "<p class='card-sub'>No direct bus found. Suggested two-step route for <b>" +
      escapeHtml(destination) +
      "</b>:</p>" +
      buildBusResultCard(
        connection.firstBus.busNo,
        connection.firstBus.city + " → " + connection.firstBus.to,
        firstSnapshot,
        0
      ) +
      "<div class='bus-line'><b>Transfer at:</b> " +
      escapeHtml(connection.firstBus.to) +
      "</div>" +
      buildBusResultCard(
        connection.secondBus.busNo,
        connection.secondBus.city + " → " + connection.secondBus.to,
        secondSnapshot,
        1
      )
    );
  }

  function buildNoResultHtml(selectedCity, destination) {
    return (
      "<h2 class='card-title'>Results</h2>" +
      "<p class='card-sub'>We could not find a direct or connected route from <b>" +
      escapeHtml(selectedCity) +
      "</b> to <b>" +
      escapeHtml(destination) +
      "</b>.</p>" +
      "<p class='hint'>Try another city, a nearby stop, or a broader landmark name.</p>"
    );
  }

  function showRouteForBus(busNo) {
    var snapshot = currentLiveTrips[busNo];
    var routePoints;

    if (!snapshot) {
      alert("Live route preview is not available for this search result.");
      return;
    }

    routePoints = snapshot.routePoints;
    mapSection.style.display = "block";

    setTimeout(function () {
      if (!map) {
        map = L.map("map").setView(snapshot.currentPoint, 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "Â© OpenStreetMap"
        }).addTo(map);
      } else {
        map.invalidateSize();
      }

      if (routeLine) {
        map.removeLayer(routeLine);
      }

      if (busMarker) {
        map.removeLayer(busMarker);
      }

      if (destMarker) {
        map.removeLayer(destMarker);
      }

      routeLine = L.polyline(routePoints, {
        color: "#1177d9",
        weight: 5
      }).addTo(map);

      busMarker = L.marker(snapshot.currentPoint)
        .addTo(map)
        .bindPopup(
          "Bus " +
            busNo +
            "<br>ETA: " +
            snapshot.etaMinutes +
            " min<br>Now " +
            snapshot.currentStatus
        )
        .openPopup();

      destMarker = L.marker(snapshot.targetPoint)
        .addTo(map)
        .bindPopup("Destination point: " + snapshot.targetStop);

      map.fitBounds(
        L.latLngBounds([snapshot.currentPoint, snapshot.targetPoint]).pad(0.65)
      );
    }, 100);

    if (
      window.busTrackEmergencyAlert &&
      typeof window.busTrackEmergencyAlert.maybeShowRouteAlert === "function"
    ) {
      window.busTrackEmergencyAlert.maybeShowRouteAlert(busNo);
    }
  }

  function clearDetailMapLayers() {
    if (!detailMap) {
      return;
    }

    detailMapLayers.forEach(function (layer) {
      detailMap.removeLayer(layer);
    });
    detailMapLayers = [];
  }

  function renderDetailLiveMap(busNo) {
    var snapshot = currentLiveTrips[busNo];
    var routePoints = snapshot ? snapshot.routePoints : busRoutes[busNo];
    var currentPoint;
    var targetPoint;
    var mapEl = document.getElementById("detailLiveMap");

    if (!mapEl || !window.L || !routePoints || !routePoints.length) {
      return;
    }

    currentPoint = snapshot ? snapshot.currentPoint : routePoints[Math.min(1, routePoints.length - 1)];
    targetPoint = snapshot ? snapshot.targetPoint : routePoints[routePoints.length - 1];

    setTimeout(function () {
      if (!detailMap) {
        detailMap = L.map("detailLiveMap").setView(currentPoint, 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "Â© OpenStreetMap"
        }).addTo(detailMap);
      } else {
        detailMap.invalidateSize();
      }

      clearDetailMapLayers();

      detailMapLayers.push(
        L.polyline(routePoints, {
          color: "#1177d9",
          weight: 5
        }).addTo(detailMap)
      );

      detailMapLayers.push(
        L.marker(currentPoint)
          .addTo(detailMap)
          .bindPopup("Bus " + busNo + (snapshot ? "<br>ETA: " + snapshot.etaMinutes + " min" : ""))
      );

      detailMapLayers.push(
        L.marker(targetPoint)
          .addTo(detailMap)
          .bindPopup("Destination point")
      );

      detailMap.fitBounds(L.latLngBounds(routePoints).pad(0.18));
      detailMap.invalidateSize();
    }, 120);
  }

  function getBusDetailData(busNo) {
    var bus = null;
    var snapshot = currentLiveTrips[busNo];
    var resultState = currentBusResultStates[busNo] || {};
    var stopsList;
    var i;

    for (i = 0; i < busData.length; i++) {
      if (busData[i].busNo === busNo) {
        bus = busData[i];
        break;
      }
    }

    if (!bus) {
      bus = {
        busNo: busNo || "GJ-2",
        state: "Gujarat",
        city: "Bardoli",
        to: "Navsari",
        via: ["Maroli"]
      };
    }

    stopsList = [bus.city].concat(bus.via || [], [bus.to]);

    return {
      id: bus.busNo,
      number: bus.busNo,
      from: bus.city,
      to: bus.to,
      state: bus.state || "Gujarat",
      eta: resultState.eta || (snapshot ? snapshot.etaMinutes : 8),
      distance: resultState.distance || (snapshot ? formatDistance(snapshot.remainingDistanceKm) : "5.2 km"),
      occupancy: resultState.occupancy || "Medium occupancy",
      occupancyClass: resultState.occupancyClass || "medium",
      status: resultState.status || "On Time",
      statusText: resultState.statusText || "ON TIME",
      statusClass: resultState.statusClass || "ok",
      hasDelay: !!resultState.hasDelay,
      incidentDelay: !!resultState.incidentDelay,
      stops: stopsList.slice(0, 5)
    };
  }

  function renderBusDetail(busNo) {
    var bus = getBusDetailData(busNo);
    var detailBusNumber = document.getElementById("detailBusNumber");
    var detailBusRoute = document.getElementById("detailBusRoute");
    var detailStatusBadge = document.getElementById("detailStatusBadge");
    var detailEta = document.getElementById("detailEta");
    var detailDistance = document.getElementById("detailDistance");
    var detailOccupancy = document.getElementById("detailOccupancy");
    var detailStatus = document.getElementById("detailStatus");
    var detailEtaInline = document.getElementById("detailEtaInline");
    var detailStopCount = document.getElementById("detailStopCount");
    var detailRouteSummary = document.getElementById("detailRouteSummary");
    var detailStopsList = document.getElementById("detailStopsList");
    var detailInfoNumber = document.getElementById("detailInfoNumber");
    var detailInfoFrom = document.getElementById("detailInfoFrom");
    var detailInfoTo = document.getElementById("detailInfoTo");
    var detailInfoState = document.getElementById("detailInfoState");
    var detailDelayNote = document.getElementById("detailDelayNote");
    var routeText = bus.from + " → " + bus.to;

    if (!detailBusNumber || !detailStopsList) {
      return;
    }

    detailBusNumber.innerText = bus.number;
    detailBusRoute.innerText = routeText;
    detailStatusBadge.innerText = bus.statusText || bus.status.toUpperCase();
    detailStatusBadge.className = "tag " + (bus.statusClass || "ok");
    detailEta.innerText = bus.eta + " min";
    detailDistance.innerText = String(bus.distance).indexOf("km") === -1 && String(bus.distance).indexOf("m") === -1 ? bus.distance + " km" : bus.distance;
    detailOccupancy.innerText = bus.occupancy;
    detailStatus.innerText = bus.status;
    detailEtaInline.innerText = bus.eta + " minutes";
    detailStopCount.innerText = bus.stops.length + " stops";
    detailRouteSummary.innerText = bus.stops.join(" → ");
    detailInfoNumber.innerText = bus.number;
    detailInfoFrom.innerText = bus.from;
    detailInfoTo.innerText = bus.to;
    detailInfoState.innerText = bus.state;

    if (detailDelayNote) {
      detailDelayNote.hidden = !bus.incidentDelay;
    }

    detailStopsList.innerHTML = bus.stops
      .map(function (stop, index) {
        var isCurrent = index === 0;
        var isLast = index === bus.stops.length - 1;

        return (
          "<article class='" +
          (isCurrent ? "current" : isLast ? "final" : "") +
          "'>" +
          "<span></span><div><h4>" +
          escapeHtml(stop) +
          "</h4><p>" +
          (isCurrent ? "Bus is here now" : isLast ? "Final destination" : "Stop " + (index + 1)) +
          "</p></div>" +
          (isCurrent ? "<strong>CURRENT</strong>" : "") +
          "</article>"
        );
      })
      .join("");

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  function setJourneyTracking(active) {
    var actions = document.getElementById("journeyActions");
    var trackingBadge = document.getElementById("detailTrackingBadge");

    isTracking = !!active;

    if (actions) {
      actions.classList.toggle("tracking", isTracking);
    }

    if (trackingBadge) {
      trackingBadge.classList.toggle("show", isTracking);
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  function openBusDetail(busNo) {
    renderBusDetail(busNo);
    setJourneyTracking(false);
    renderDetailLiveMap(busNo);
    if (window.busTrackNavigate) {
      window.busTrackNavigate("busDetailPage");
    }
  }

  function getSearchCandidates(value) {
    var normalizedValue = normalizeText(value);
    var candidates = [];
    var cityKey;
    var i;

    if (!value) {
      return candidates;
    }

    candidates.push(value);

    for (cityKey in stops) {
      if (!Object.prototype.hasOwnProperty.call(stops, cityKey)) {
        continue;
      }

      if (normalizeText(cityKey) === normalizedValue) {
        for (i = 0; i < stops[cityKey].length; i++) {
          if (candidates.indexOf(stops[cityKey][i]) === -1) {
            candidates.push(stops[cityKey][i]);
          }
        }
      }
    }

    return candidates;
  }

  function routeContainsAnyStop(routeStops, searchCandidates) {
    var i;
    var j;

    for (i = 0; i < routeStops.length; i++) {
      for (j = 0; j < searchCandidates.length; j++) {
        if (
          normalizeText(routeStops[i]) === normalizeText(searchCandidates[j]) ||
          normalizeText(routeStops[i]).indexOf(normalizeText(searchCandidates[j])) !== -1 ||
          normalizeText(searchCandidates[j]).indexOf(normalizeText(routeStops[i])) !== -1
        ) {
          return true;
        }
      }
    }

    return false;
  }

  function findBusesPassingThrough(startPoint, destination) {
    var matchingBuses = [];
    var startCandidates = getSearchCandidates(startPoint);
    var destinationCandidates = getSearchCandidates(destination);
    var i;
    var bus;
    var fullRoute;

    for (i = 0; i < busData.length; i++) {
      bus = busData[i];
      fullRoute = [bus.city].concat(bus.via, [bus.to]);

      if (
        routeContainsAnyStop(fullRoute, startCandidates) &&
        routeContainsAnyStop(fullRoute, destinationCandidates)
      ) {
        matchingBuses.push(bus);
      }
    }

    return matchingBuses;
  }

  if (hasBusTrackingUi) {
    stateSelect.onchange = function () {
      populateCities(stateSelect.value);
      populateStops("");
      resetLocationChoice();
      endLocation.value = "";
      resetResults();
      hideMap();
    };

    citySelect.onchange = function () {
      populateStops(citySelect.value);
      resetLocationChoice();
      resetResults();
      hideMap();
    };

    startStop.onchange = function () {
      if (startStop.value) {
        locationBtn.classList.remove("selected");
        locationStatus.innerText = "Using selected stop: " + startStop.value;
      } else {
        locationStatus.innerText = "";
      }
    };

    locationBtn.onclick = function () {
      if (!citySelect.value) {
        locationStatus.innerText = "Please select your city first.";
        return;
      }

      startStop.value = "";
      locationBtn.classList.add("selected");
      locationStatus.innerText =
        "Current location detected near " + citySelect.value + " (demo)";
    };

    findBusBtn.onclick = function () {
      var selectedState = stateSelect.value;
      var selectedCity = citySelect.value;
      var selectedStop = startStop.value;
      var destination = endLocation.value.trim();
      var normalizedDestination = normalizeText(destination);
      var matchedBuses;
      var directBuses = [];
      var connection;
      var i;

      if (!selectedState || !selectedCity) {
        alert("Please select both State and City.");
        return;
      }

      if (!destination) {
        alert("Please enter destination location.");
        return;
      }

      if (!selectedStop && !locationBtn.classList.contains("selected")) {
        locationStatus.innerText =
          "Please select a nearby stop or use current location.";
        return;
      }

      matchedBuses = getBusesFromCity(selectedState, selectedCity);

      if (!matchedBuses.length) {
        setResultsHtml(buildNoResultHtml(selectedCity, destination));
        hideMap();
        return;
      }

      currentLiveTrips = {};

      for (i = 0; i < matchedBuses.length; i++) {
        if (matchesDestination(matchedBuses[i], normalizedDestination)) {
          directBuses.push(matchedBuses[i]);
        }
      }

      if (directBuses.length) {
        setResultsHtml(
          buildDirectResultsHtml(directBuses, selectedCity, destination, selectedStop)
        );
        hideMap();
        return;
      }

      connection = findConnectingRoute(
        selectedState,
        selectedCity,
        normalizedDestination
      );

      if (connection) {
        setResultsHtml(
          buildConnectingRouteHtml(connection, destination, selectedCity, selectedStop)
        );
        hideMap();
        return;
      }

      setResultsHtml(buildNoResultHtml(selectedCity, destination));
      hideMap();
    };

    resultsBox.addEventListener("click", function (event) {
      if (event.target.closest(".js-incident-delay")) {
        return;
      }

      var routeButton = event.target.closest("[data-bus-route]");

      if (!routeButton) {
        return;
      }

      openBusDetail(routeButton.getAttribute("data-bus-route"));
    });

    document.addEventListener("click", function (event) {
      var delayNote = event.target.closest(".js-incident-delay");

      if (!delayNote) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (
        window.busTrackEmergencyAlert &&
        typeof window.busTrackEmergencyAlert.openRouteAlert === "function"
      ) {
        window.busTrackEmergencyAlert.openRouteAlert();
      }
    });

    if (document.getElementById("journeyStartBtn")) {
      document.getElementById("journeyStartBtn").addEventListener("click", function () {
        setJourneyTracking(true);
      });
    }

    if (document.getElementById("journeyEndBtn")) {
      document.getElementById("journeyEndBtn").addEventListener("click", function () {
        setJourneyTracking(false);
      });
    }

    resetResults();
    hideMap();

    var originalFindBusClick = findBusBtn.onclick;
    findBusBtn.onclick = function () {
      var selectedState = stateSelect.value;
      var selectedCity = citySelect.value;
      var selectedStop = startStop.value;
      var destination = endLocation.value.trim();
      var passThroughBuses;

      if (selectedStop) {
        passThroughBuses = findBusesPassingThrough(selectedStop, destination);
        passThroughBuses = passThroughBuses.filter(function (bus) {
          return bus.state === selectedState;
        });

        if (passThroughBuses.length) {
          currentLiveTrips = {};
          setResultsHtml(
            buildDirectResultsHtml(
              passThroughBuses,
              selectedCity,
              destination,
              selectedStop
            )
          );
          hideMap();
          return;
        }
      }

      originalFindBusClick();
    };
  }

  function formatBusLabel(busNo) {
    var parts = String(busNo || "").split("-");
    var numberPart;

    if (parts.length !== 2) {
      return String(busNo || "");
    }

    numberPart = parseInt(parts[1], 10);

    if (isNaN(numberPart)) {
      return String(busNo || "");
    }

    if (numberPart < 10) {
      return parts[0] + "-0" + numberPart;
    }

    return parts[0] + "-" + numberPart;
  }

  function initializeOnBusFeature() {
    var onBusFlow = document.getElementById("onBusFlow");
    var scanQrBtn = document.getElementById("scanQrBtn");
    var selectBusBtn = document.getElementById("selectBusBtn");
    var bannerOnBusBtn = document.getElementById("bannerOnBusBtn");
    var checkInAnotherBtn = document.getElementById("checkInAnotherBtn");
    var suggestedBusList = document.getElementById("suggestedBusList");
    var onBusResult = document.getElementById("onBusResult");
    var pointsFeedback = document.getElementById("pointsFeedback");
    var confirmBusBtn = document.getElementById("confirmBusBtn");
    var nearbyBusItems = Array.prototype.slice.call(
      document.querySelectorAll(".onbus-v3-bus-choice")
    );
    var onBusPanels = Array.prototype.slice.call(
      document.querySelectorAll("[data-onbus-step]")
    );
    var onBusDots = Array.prototype.slice.call(
      document.querySelectorAll("[data-flow-dot]")
    );
    var onBusLines = Array.prototype.slice.call(
      document.querySelectorAll("[data-flow-line]")
    );
    var onBusStepLabel = document.getElementById("onBusStepLabel");
    var crowdOptions = Array.prototype.slice.call(
      document.querySelectorAll(".onbus-v3-crowd-option")
    );
    var onBusSelectedTitle = document.getElementById("onBusSelectedTitle");
    var onBusSelectedRoute = document.getElementById("onBusSelectedRoute");
    var onBusSuccessBus = document.getElementById("onBusSuccessBus");
    var onBusBackToPick = document.getElementById("onBusBackToPick");
    var onBusViewProfileBtn = document.getElementById("onBusViewProfileBtn");
    var crowdConfidenceBox = document.getElementById("crowdConfidenceBox");
    var crowdConfidenceCopy = document.getElementById("crowdConfidenceCopy");
    var crowdConfidenceFill = crowdConfidenceBox
      ? crowdConfidenceBox.querySelector(".crowd-confidence-track span")
      : null;
    var crowdConfidenceLabel = crowdConfidenceBox
      ? crowdConfidenceBox.querySelector(".crowd-confidence-head p")
      : null;
    var profileUserId = document.getElementById("profileUserId");
    var profilePoints = document.getElementById("profilePoints");
    var profileVotes = document.getElementById("profileVotes");
    var profileScans = document.getElementById("profileScans");
    var profileConfirms = document.getElementById("profileConfirms");
    var leaderboardList = document.getElementById("leaderboardList");
    var USER_STORAGE_KEY = "busTrackBharatUserV1";
    var activeBusId = "";
    var selectedBusTitle = "MH 12 AB 1234";
    var selectedBusRoute = "Shivajinagar → Kothrud";
    var selectedCrowd = "";
    var currentOnBusStep = 1;
    var user;
    var mockUsers = [
      { id: "ANON-AX17", points: 42 },
      { id: "ANON-BR88", points: 31 },
      { id: "ANON-CZ29", points: 27 },
      { id: "ANON-DM45", points: 20 }
    ];

    if (
      !onBusFlow ||
      !scanQrBtn ||
      !suggestedBusList ||
      !onBusResult ||
      !pointsFeedback ||
      !confirmBusBtn ||
      !nearbyBusItems.length ||
      !onBusPanels.length ||
      !onBusDots.length ||
      !onBusStepLabel ||
      !crowdOptions.length ||
      !onBusSelectedTitle ||
      !onBusSelectedRoute ||
      !onBusSuccessBus ||
      !onBusBackToPick ||
      !onBusViewProfileBtn ||
      !profileUserId ||
      !profilePoints ||
      !profileVotes ||
      !profileScans ||
      !profileConfirms ||
      !leaderboardList
    ) {
      return;
    }

    function setOnBusStep(step) {
      var labels = {
        1: "Pick bus",
        2: "Crowd level",
        3: "Done"
      };

      currentOnBusStep = step;
      onBusPanels.forEach(function (panel) {
        panel.classList.toggle(
          "active",
          Number(panel.getAttribute("data-onbus-step")) === currentOnBusStep
        );
      });
      onBusDots.forEach(function (dot) {
        var dotStep = Number(dot.getAttribute("data-flow-dot"));
        dot.classList.remove("active");
        dot.classList.remove("complete");
        dot.innerText = String(dotStep);

        if (dotStep < currentOnBusStep) {
          dot.classList.add("complete");
          dot.innerText = "✓";
        } else if (dotStep === currentOnBusStep) {
          dot.classList.add("active");
        }
      });
      onBusLines.forEach(function (line) {
        line.classList.toggle(
          "complete",
          Number(line.getAttribute("data-flow-line")) < currentOnBusStep
        );
      });
      onBusStepLabel.innerText = labels[currentOnBusStep];
    }

    function updateCrowdSubmitState() {
      confirmBusBtn.disabled = !selectedCrowd;
      confirmBusBtn.classList.toggle("enabled", !!selectedCrowd);
      confirmBusBtn.classList.remove("crowd-green");
      confirmBusBtn.classList.remove("crowd-yellow");
      confirmBusBtn.classList.remove("crowd-red");

      if (selectedCrowd === "Not Crowded") {
        confirmBusBtn.classList.add("crowd-green");
      } else if (selectedCrowd === "Moderate") {
        confirmBusBtn.classList.add("crowd-yellow");
      } else if (selectedCrowd === "Very Crowded") {
        confirmBusBtn.classList.add("crowd-red");
      }
    }

    function readUser() {
      var saved = localStorage.getItem(USER_STORAGE_KEY);
      var parsed;

      if (saved) {
        try {
          parsed = JSON.parse(saved);
        } catch (error) {
          parsed = null;
        }
      }

      if (!parsed || !parsed.id) {
        parsed = {
          id: "ANON-" + Math.floor(Math.random() * 90000 + 10000),
          displayName: "",
          authProvider: "anonymous",
          googleSub: "",
          points: 0,
          votes: 0,
          scans: 0,
          confirms: 0
        };
      }

      return parsed;
    }

    function saveUser() {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }

    function awardPoints(amount, activityKey) {
      user.points += amount;

      if (activityKey === "votes") {
        user.votes += 1;
      }

      if (activityKey === "scans") {
        user.scans += 1;
      }

      if (activityKey === "confirms") {
        user.confirms += 1;
      }

      pointsFeedback.innerText = "+" + amount + " points earned";
      saveUser();
      renderProfile();
      renderLeaderboard();
    }

    function renderProfile() {
      profileUserId.innerText = user.id + " (" + user.authProvider + ")";
      profilePoints.innerText = String(user.points);
      profileVotes.innerText = String(user.votes);
      profileScans.innerText = String(user.scans);
      profileConfirms.innerText = String(user.confirms);
    }

    function renderLeaderboard() {
      var allUsers = mockUsers
        .concat([{ id: user.id, points: user.points, isCurrent: true }])
        .sort(function (a, b) {
          return b.points - a.points;
        });
      var html = "<ol>";
      var i;
      var row;

      for (i = 0; i < allUsers.length; i++) {
        row = allUsers[i];
        html +=
          "<li><b>" +
          escapeHtml(row.id) +
          "</b> - " +
          row.points +
          " pts" +
          (row.isCurrent ? " (You)" : "") +
          "</li>";
      }

      html += "</ol>";
      leaderboardList.innerHTML = html;
    }

    function resetOnBusSelection() {
      var defaultCopy = "Choose a nearby bus to continue.";

      activeBusId = "";
      selectedBusTitle = "MH 12 AB 1234";
      selectedBusRoute = "Shivajinagar → Kothrud";
      selectedCrowd = "";
      nearbyBusItems.forEach(function (item) {
        item.classList.remove("selected");
      });
      crowdOptions.forEach(function (item) {
        item.classList.remove("selected");
      });
      if (crowdConfidenceBox) {
        crowdConfidenceBox.classList.add("hidden");
      }
      if (crowdConfidenceFill) {
        crowdConfidenceFill.style.width = "0%";
      }
      if (crowdConfidenceLabel) {
        crowdConfidenceLabel.innerText = "Low";
      }
      if (crowdConfidenceCopy) {
        crowdConfidenceCopy.innerText = "";
      }

      onBusResult.innerText = defaultCopy;
      onBusResult.classList.add("hidden");
      suggestedBusList.innerHTML = "";
      confirmBusBtn.disabled = true;
      confirmBusBtn.classList.remove("enabled");
      pointsFeedback.innerText = "";
      onBusSelectedTitle.innerText = selectedBusTitle;
      onBusSelectedRoute.innerText = selectedBusRoute;
      onBusSuccessBus.innerText = selectedBusTitle;
      updateCrowdSubmitState();
      setOnBusStep(1);
    }

    function updateCrowdConfidence(confidence) {
      var ridersConfirmed = Math.max(4, Math.round(confidence / 11));

      if (crowdConfidenceFill) {
        crowdConfidenceFill.style.width = confidence + "%";
      }
      if (crowdConfidenceLabel) {
        crowdConfidenceLabel.innerText = confidence >= 75 ? "High" : "Medium";
      }
      if (crowdConfidenceCopy) {
        crowdConfidenceCopy.innerText =
          ridersConfirmed + " other riders confirmed this bus in the last 5 min.";
      }
    }

    function selectNearbyBus(item, source) {
      var busId = item.getAttribute("data-nearby-bus") || "";
      var confidence = parseInt(item.getAttribute("data-confidence"), 10);

      if (isNaN(confidence)) {
        confidence = 70;
      }

      nearbyBusItems.forEach(function (row) {
        row.classList.remove("selected");
      });
      item.classList.add("selected");

      activeBusId = busId;
      selectedBusTitle = item.getAttribute("data-bus-title") || selectedBusTitle;
      selectedBusRoute = item.getAttribute("data-bus-route") || selectedBusRoute;
      selectedCrowd = "";
      crowdOptions.forEach(function (option) {
        option.classList.remove("selected");
      });
      updateCrowdConfidence(confidence);
      if (crowdConfidenceBox) {
        crowdConfidenceBox.classList.remove("hidden");
      }

      onBusResult.classList.add("hidden");
      onBusResult.innerText =
        source === "scan"
          ? "QR detected: Bus " + busId + " (" + confidence + "% confidence)"
          : "Bus " + busId + " (" + confidence + "% confidence)";

      onBusSelectedTitle.innerText = selectedBusTitle;
      onBusSelectedRoute.innerText = selectedBusRoute;
      onBusSuccessBus.innerText = selectedBusTitle;
      updateCrowdSubmitState();
      setOnBusStep(2);
    }

    function pickBestNearbyBus() {
      if (!nearbyBusItems.length) {
        return null;
      }

      return nearbyBusItems[0];
    }

    user = readUser();
    saveUser();
    renderProfile();
    renderLeaderboard();
    resetOnBusSelection();

    if (selectBusBtn) {
      selectBusBtn.addEventListener("click", function () {
        resetOnBusSelection();
      });
    }

    if (bannerOnBusBtn) {
      bannerOnBusBtn.addEventListener("click", function () {
        resetOnBusSelection();
      });
    }

    if (checkInAnotherBtn) {
      checkInAnotherBtn.addEventListener("click", function () {
        resetOnBusSelection();
      });
    }

    onBusBackToPick.addEventListener("click", function () {
      setOnBusStep(1);
    });

    nearbyBusItems.forEach(function (item) {
      item.addEventListener("click", function () {
        selectNearbyBus(item, "tap");
      });
    });

    crowdOptions.forEach(function (option) {
      option.addEventListener("click", function () {
        crowdOptions.forEach(function (item) {
          item.classList.remove("selected");
        });
        option.classList.add("selected");
        selectedCrowd = option.getAttribute("data-crowd-level") || "";
        updateCrowdSubmitState();
      });
    });

    scanQrBtn.addEventListener("click", function () {
      var scannedBus = pickBestNearbyBus();
      if (!scannedBus) {
        return;
      }

      selectNearbyBus(scannedBus, "scan");
    });

    confirmBusBtn.addEventListener("click", function () {
      if (!activeBusId || !selectedCrowd) {
        return;
      }

      awardPoints(10, "confirms");
      setOnBusStep(3);
    });

    onBusViewProfileBtn.addEventListener("click", function () {
      if (window.busTrackNavigate) {
        window.busTrackNavigate("profilePage");
      }
    });

    // Future-ready auth hook for Phase 2 (Google login integration).
    window.busTrackAuth = {
      loginWithGoogle: function () {
        return Promise.resolve({
          provider: "google",
          status: "not_implemented"
        });
      }
    };
  }

  function initializeProfileTrackingDemo() {
    var modal = document.getElementById("profileTrackModal");
    var closeBtn = document.getElementById("profileTrackClose");
    var mapEl = document.getElementById("profileTrackMap");
    var busLabel = document.getElementById("profileTrackBus");
    var etaLabel = document.getElementById("profileTrackEta");
    var trackButtons = Array.prototype.slice.call(
      document.querySelectorAll(".profile-v2-track-btn")
    );
    var profileMap = null;
    var mapLayers = [];
    var demoBuses = {
      "MH12 AB 1234": {
        eta: "6 min",
        route: [
          [18.5074, 73.8077],
          [18.5018, 73.8216],
          [18.4992, 73.8427],
          [18.5018, 73.8636]
        ],
        busIndex: 1
      },
      "MH12 PQ 0091": {
        eta: "3 min",
        route: [
          [18.5308, 73.8475],
          [18.5362, 73.8368],
          [18.5485, 73.8046],
          [18.5913, 73.7389]
        ],
        busIndex: 1
      },
      "MH12 RS 5512": {
        eta: "12 min",
        route: [
          [18.5913, 73.7389],
          [18.5672, 73.7779],
          [18.5465, 73.8164],
          [18.5308, 73.8475]
        ],
        busIndex: 2
      },
      "MH12 CD 4490": {
        eta: "18 min",
        route: [
          [18.5601, 73.8077],
          [18.5439, 73.8321],
          [18.5204, 73.8688],
          [18.5142, 73.9327]
        ],
        busIndex: 2
      }
    };

    if (!modal || !closeBtn || !mapEl || !busLabel || !etaLabel || !trackButtons.length) {
      return;
    }

    function clearDemoLayers() {
      if (!profileMap) {
        return;
      }

      mapLayers.forEach(function (layer) {
        profileMap.removeLayer(layer);
      });
      mapLayers = [];
    }

    function ensureMap() {
      if (profileMap || !window.L) {
        return;
      }

      profileMap = window.L.map(mapEl, {
        zoomControl: true,
        attributionControl: false
      });
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19
      }).addTo(profileMap);
    }

    function drawRoute(bus) {
      var data = demoBuses[bus];
      var route;
      var busPoint;
      var busIcon;

      if (!data || !window.L) {
        return;
      }

      ensureMap();
      if (!profileMap) {
        return;
      }

      clearDemoLayers();
      route = data.route;
      busPoint = route[data.busIndex];
      busIcon = window.L.divIcon({
        className: "profile-v2-map-bus-icon",
        html: "BUS",
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      mapLayers.push(
        window.L.polyline(route, {
          color: "#3369e8",
          weight: 5,
          opacity: 0.85
        }).addTo(profileMap)
      );
      mapLayers.push(window.L.marker(route[0]).addTo(profileMap).bindPopup("Start point"));
      mapLayers.push(window.L.marker(route[route.length - 1]).addTo(profileMap).bindPopup("End point"));
      mapLayers.push(
        window.L.marker(busPoint, { icon: busIcon })
          .addTo(profileMap)
          .bindPopup(bus + " is live")
      );

      profileMap.fitBounds(window.L.latLngBounds(route), { padding: [36, 36] });
      setTimeout(function () {
        profileMap.invalidateSize();
      }, 80);
    }

    function openModal(bus) {
      var data = demoBuses[bus];

      if (!data) {
        return;
      }

      busLabel.innerText = bus;
      etaLabel.innerText = data.eta;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      drawRoute(bus);

      if (
        window.busTrackEmergencyAlert &&
        typeof window.busTrackEmergencyAlert.maybeShowRouteAlert === "function"
      ) {
        window.busTrackEmergencyAlert.maybeShowRouteAlert(bus);
      }
    }

    function closeModal() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }

    trackButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        openModal(button.getAttribute("data-demo-bus"));
      });
    });

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("open")) {
        closeModal();
      }
    });
  }

  function initializeEmergencyAlertSystem() {
    var navBtn = document.getElementById("emergencyNavBtn");
    var floatBtn = document.getElementById("emergencyFloatBtn");
    var modal = document.getElementById("emergencyModal");
    var confirmModal = document.getElementById("emergencyConfirmModal");
    var routeAlert = document.getElementById("emergencyRouteAlert");
    var closeBtn = document.getElementById("emergencyCloseBtn");
    var locationBtn = document.getElementById("emergencyLocationBtn");
    var detectedLocation = document.getElementById("emergencyDetectedLocation");
    var continueBtn = document.getElementById("emergencyContinueBtn");
    var backBtn = document.getElementById("emergencyBackBtn");
    var cancelSendBtn = document.getElementById("emergencyCancelSendBtn");
    var confirmSendBtn = document.getElementById("emergencySendConfirmBtn");
    var routeCloseBtn = document.getElementById("emergencyRouteCloseBtn");
    var routeGotItBtn = document.getElementById("emergencyRouteGotItBtn");
    var detailsInput = document.getElementById("emergencyDetails");
    var steps = Array.prototype.slice.call(
      document.querySelectorAll(".emergency-step")
    );
    var progressBars = Array.prototype.slice.call(
      document.querySelectorAll(".emergency-progress span")
    );
    var typeCards = Array.prototype.slice.call(
      document.querySelectorAll(".emergency-type-card")
    );
    var currentStep = 1;
    var emergencyState = {
      active: false,
      location: "",
      type: "",
      details: "",
      affectedBus: "MH12 AB 1234"
    };

    if (
      !navBtn ||
      !floatBtn ||
      !modal ||
      !confirmModal ||
      !routeAlert ||
      !closeBtn ||
      !locationBtn ||
      !detectedLocation ||
      !continueBtn ||
      !backBtn ||
      !cancelSendBtn ||
      !confirmSendBtn ||
      !routeCloseBtn ||
      !routeGotItBtn ||
      !detailsInput ||
      !steps.length ||
      !progressBars.length
    ) {
      return;
    }

    function normalizeBus(value) {
      return String(value || "").replace(/[^a-z0-9]/gi, "").toUpperCase();
    }

    function setStep(step) {
      currentStep = step;
      steps.forEach(function (stepEl) {
        stepEl.classList.toggle(
          "active",
          Number(stepEl.getAttribute("data-emergency-step")) === currentStep
        );
      });
      progressBars.forEach(function (bar, index) {
        bar.classList.toggle("active", index < currentStep);
      });
      backBtn.disabled = currentStep === 1;
      continueBtn.innerText =
        currentStep === 3 ? "Send Emergency Alert" : "Continue";
      updateContinueState();
    }

    function updateContinueState() {
      if (currentStep === 1) {
        continueBtn.disabled = !emergencyState.location;
      } else if (currentStep === 2) {
        continueBtn.disabled = !emergencyState.type;
      } else {
        continueBtn.disabled = false;
      }
    }

    function resetFlow() {
      currentStep = 1;
      emergencyState.location = "";
      emergencyState.type = "";
      emergencyState.details = "";
      detailsInput.value = "";
      detectedLocation.classList.add("hidden");
      locationBtn.classList.remove("hidden");
      typeCards.forEach(function (card) {
        card.classList.remove("active");
      });
      setStep(1);
    }

    function openFlow() {
      resetFlow();
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    }

    function closeFlow() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }

    function openConfirm() {
      emergencyState.details = detailsInput.value.trim();
      confirmModal.classList.add("open");
      confirmModal.setAttribute("aria-hidden", "false");
    }

    function closeConfirm() {
      confirmModal.classList.remove("open");
      confirmModal.setAttribute("aria-hidden", "true");
    }

    function openRouteAlert() {
      routeAlert.classList.add("open");
      routeAlert.setAttribute("aria-hidden", "false");
    }

    function closeRouteAlert() {
      routeAlert.classList.remove("open");
      routeAlert.setAttribute("aria-hidden", "true");
    }

    function addWarningLabel(card) {
      var label;
      var existingLabel = card ? card.querySelector(".emergency-warning-label") : null;

      if (!card) {
        return;
      }

      if (existingLabel) {
        bindWarningLabel(existingLabel);
        return;
      }

      card.classList.add("emergency-card-affected");
      label = document.createElement("span");
      label.className = "emergency-warning-label";
      label.innerText = "⚠ Delay expected";
      label.setAttribute("role", "button");
      label.setAttribute("tabindex", "0");
      bindWarningLabel(label);
      card.appendChild(label);
    }

    function bindWarningLabel(label) {
      if (!label || label.getAttribute("data-emergency-bound") === "true") {
        return;
      }

      label.setAttribute("data-emergency-bound", "true");
      label.addEventListener("click", openRouteAlert);
      label.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openRouteAlert();
        }
      });
    }

    function highlightAffectedCards() {
      var frequentCard = document.querySelector(
        ".profile-v2-bus-card[data-demo-bus='MH12 AB 1234']"
      );

      addWarningLabel(frequentCard);
    }

    function sendAlert() {
      emergencyState.active = true;
      emergencyState.location = emergencyState.location || "Near MG Road, Bengaluru";
      emergencyState.type = emergencyState.type || "Accident";
      closeConfirm();
      closeFlow();
      highlightAffectedCards();
    }

    function maybeShowRouteAlert(busNo) {
      return;
    }

    navBtn.addEventListener("click", openFlow);
    floatBtn.addEventListener("click", openFlow);
    closeBtn.addEventListener("click", closeFlow);
    routeCloseBtn.addEventListener("click", closeRouteAlert);
    routeGotItBtn.addEventListener("click", closeRouteAlert);
    Array.prototype.slice
      .call(document.querySelectorAll(".emergency-warning-label"))
      .forEach(bindWarningLabel);

    locationBtn.addEventListener("click", function () {
      emergencyState.location = "Near MG Road, Bengaluru";
      locationBtn.classList.add("hidden");
      detectedLocation.classList.remove("hidden");
      updateContinueState();
    });

    typeCards.forEach(function (card) {
      card.addEventListener("click", function () {
        typeCards.forEach(function (item) {
          item.classList.remove("active");
        });
        card.classList.add("active");
        emergencyState.type = card.getAttribute("data-emergency-type") || "";
        updateContinueState();
      });
    });

    continueBtn.addEventListener("click", function () {
      if (continueBtn.disabled) {
        return;
      }

      if (currentStep < 3) {
        setStep(currentStep + 1);
        return;
      }

      openConfirm();
    });

    backBtn.addEventListener("click", function () {
      if (currentStep > 1) {
        setStep(currentStep - 1);
      }
    });

    cancelSendBtn.addEventListener("click", closeConfirm);
    confirmSendBtn.addEventListener("click", sendAlert);

    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeFlow();
      }
    });
    confirmModal.addEventListener("click", function (event) {
      if (event.target === confirmModal) {
        closeConfirm();
      }
    });
    routeAlert.addEventListener("click", function (event) {
      if (event.target === routeAlert) {
        closeRouteAlert();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") {
        return;
      }
      closeConfirm();
      closeRouteAlert();
      closeFlow();
    });

    window.busTrackEmergencyAlert = {
      maybeShowRouteAlert: maybeShowRouteAlert,
      openRouteAlert: openRouteAlert,
      highlightAffectedCards: highlightAffectedCards
    };
  }

  initializeOnBusFeature();
  initializeProfileTrackingDemo();
  initializeEmergencyAlertSystem();
});

