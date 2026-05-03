document.addEventListener("DOMContentLoaded", function () {
  var pageButtons = Array.prototype.slice.call(
    document.querySelectorAll("[data-page]")
  );
  var pages = Array.prototype.slice.call(document.querySelectorAll(".page"));
  var navButtons = Array.prototype.slice.call(
    document.querySelectorAll(".top-nav .nav-link[data-page]")
  );

  var wizardPanels = Array.prototype.slice.call(
    document.querySelectorAll(".wizard-step")
  );
  var stepItems = Array.prototype.slice.call(
    document.querySelectorAll(".step-item")
  );
  var stateChoices = document.getElementById("stateChoices");
  var cityChoices = document.getElementById("cityChoices");
  var stateSupportHint = document.getElementById("stateSupportHint");
  var backButtons = Array.prototype.slice.call(
    document.querySelectorAll(".back-btn")
  );

  var stateSelect = document.getElementById("stateSelect");
  var citySelect = document.getElementById("citySelect");
  var startStop = document.getElementById("startStop");
  var startLocationInput = document.getElementById("startLocationInput");
  var toStep4Btn = document.getElementById("toStep4Btn");
  var useLocationBtn = document.getElementById("useLocationBtn");
  var endLocation = document.getElementById("endLocation");
  var findBusBtn = document.getElementById("findBusBtn");
  var lbModeCo2 = document.getElementById("lbModeCo2");
  var lbModeTop = document.getElementById("lbModeTop");
  var podiumCards = document.getElementById("podiumCards");
  var lbTableBody = document.getElementById("lbTableBody");
  var rankMetricHead = document.getElementById("rankMetricHead");
  var segmented = document.querySelector(".segmented");

  var guessInput = document.getElementById("guessInput");
  var guessBtn = document.getElementById("guessBtn");
  var guessMsg = document.getElementById("guessMsg");
  var pollOptions = Array.prototype.slice.call(
    document.querySelectorAll(".poll-option")
  );
  var pollResult = document.getElementById("pollResult");

  var supportedStates = {};
  var currentStep = 1;
  var guessSecret = Math.floor(Math.random() * 20) + 1;
  var lbMode = "co2";

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function ensureIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  function markSupportedStates() {
    var i;
    for (i = 0; i < stateSelect.options.length; i++) {
      if (stateSelect.options[i].value) {
        supportedStates[stateSelect.options[i].value] = true;
      }
    }
  }

  function showPage(pageId) {
    var activeNavPage =
      pageId === "onBusPage" || pageId === "onBusSuccessPage"
        ? "busPage"
        : pageId;

    pages.forEach(function (page) {
      page.classList.toggle("active", page.id === pageId);
    });

    navButtons.forEach(function (button) {
      button.classList.toggle("active", button.getAttribute("data-page") === activeNavPage);
    });

    if (pageId === "busPage" && endLocation) {
      endLocation.focus();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  pageButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      if (button.tagName === "A") {
        event.preventDefault();
      }
      showPage(button.getAttribute("data-page"));
    });
  });

  function setStep(stepNo) {
    currentStep = stepNo;

    wizardPanels.forEach(function (panel) {
      panel.classList.toggle("active", Number(panel.getAttribute("data-panel")) === stepNo);
    });

    stepItems.forEach(function (item) {
      var stepValue = Number(item.getAttribute("data-step"));
      item.classList.remove("active");
      item.classList.remove("complete");

      if (stepValue < stepNo) {
        item.classList.add("complete");
      } else if (stepValue === stepNo) {
        item.classList.add("active");
      }
    });
  }

  function renderCityChoices() {
    var options = Array.prototype.slice
      .call(citySelect.options)
      .filter(function (option) {
        return option.value;
      });

    if (!options.length) {
      cityChoices.innerHTML =
        "<p class='small-muted'>No demo city data for this state yet. Try Gujarat, Maharashtra, or Delhi.</p>";
      ensureIcons();
      return;
    }

    cityChoices.innerHTML = options
      .map(function (option) {
        return (
          "<button data-city='" +
          option.value +
          "'>" +
          option.text +
          " <i data-lucide='chevron-right'></i></button>"
        );
      })
      .join("");
    ensureIcons();
  }

  function setSelectedStartStop(locationText) {
    var text = String(locationText || "").trim();
    var matchingOption = null;

    if (!text) {
      startStop.value = "";
      return;
    }

    Array.prototype.slice.call(startStop.options).forEach(function (option) {
      if (normalize(option.value) === normalize(text)) {
        matchingOption = option;
      }
    });

    if (!matchingOption) {
      matchingOption = document.createElement("option");
      matchingOption.value = text;
      matchingOption.text = text;
      startStop.appendChild(matchingOption);
    }

    startStop.value = matchingOption.value;
    startStop.dispatchEvent(new Event("change", { bubbles: true }));
  }

  stateChoices.addEventListener("click", function (event) {
    var target = event.target.closest("[data-state]");
    var stateValue;

    if (!target) {
      return;
    }

    stateValue = target.getAttribute("data-state");
    if (!supportedStates[stateValue]) {
      stateSupportHint.textContent =
        "Live bus demo data is currently available for Gujarat, Maharashtra, and Delhi.";
      return;
    }

    stateSupportHint.textContent = "";
    stateSelect.value = stateValue;
    stateSelect.dispatchEvent(new Event("change", { bubbles: true }));
    renderCityChoices();
    setStep(2);
  });

  cityChoices.addEventListener("click", function (event) {
    var target = event.target.closest("[data-city]");
    var cityValue;

    if (!target) {
      return;
    }

    cityValue = target.getAttribute("data-city");
    citySelect.value = cityValue;
    citySelect.dispatchEvent(new Event("change", { bubbles: true }));
    setStep(3);
  });

  backButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setStep(Number(button.getAttribute("data-back")));
    });
  });

  toStep4Btn.addEventListener("click", function () {
    var value = startLocationInput.value.trim();
    if (value) {
      if (useLocationBtn.classList.contains("selected")) {
        useLocationBtn.classList.remove("selected");
      }
      setSelectedStartStop(value);
    }
    setStep(4);
    endLocation.focus();
  });

  useLocationBtn.addEventListener("click", function () {
    startLocationInput.value = "";
  });

  startLocationInput.addEventListener("blur", function () {
    if (startLocationInput.value.trim()) {
      setSelectedStartStop(startLocationInput.value.trim());
    }
  });

  findBusBtn.addEventListener("click", function () {
    showPage("busPage");
  });

  function markUnsupportedStateCards() {
    Array.prototype.slice.call(stateChoices.querySelectorAll("[data-state]")).forEach(function (button) {
      if (!supportedStates[button.getAttribute("data-state")]) {
        button.classList.add("unsupported");
      }
    });
  }

  var leaderboardData = {
    co2: [
      { name: "Priya S.", city: "Bengaluru", value: 184.2, short: "PS" },
      { name: "Arjun M.", city: "Pune", value: 167.5, short: "AM" },
      { name: "Neha R.", city: "Mumbai", value: 152.8, short: "NR" },
      { name: "Megha T.", city: "Bengaluru", value: 148.4, short: "MT" },
      { name: "Karthik V.", city: "Chennai", value: 140.2, short: "KV" },
      { name: "Rohan B.", city: "Mumbai", value: 133.6, short: "RB" }
    ],
    top: [
      { name: "Karthik V.", city: "Chennai", value: 1284, short: "KV" },
      { name: "Megha T.", city: "Bengaluru", value: 1102, short: "MT" },
      { name: "Rohan B.", city: "Mumbai", value: 988, short: "RB" },
      { name: "Priya S.", city: "Bengaluru", value: 954, short: "PS" },
      { name: "Arjun M.", city: "Pune", value: 903, short: "AM" },
      { name: "Neha R.", city: "Mumbai", value: 846, short: "NR" }
    ]
  };

  function renderLeaderboard() {
    var data = leaderboardData[lbMode].slice();
    var podiumOrder = [1, 0, 2];
    var metricLabel = lbMode === "co2" ? "KG CO₂" : "Actions";

    lbModeCo2.classList.toggle("active", lbMode === "co2");
    lbModeTop.classList.toggle("active", lbMode === "top");
    segmented.classList.toggle("top-mode", lbMode === "top");
    rankMetricHead.textContent = metricLabel;

    podiumCards.innerHTML = podiumOrder
      .map(function (indexInData, indexOnPodium) {
        var person = data[indexInData];
        var rank = indexInData + 1;
        var scoreText = lbMode === "co2" ? person.value.toFixed(1) : person.value;
        var firstClass = indexOnPodium === 1 ? " is-first" : "";
        return (
          "<article class='podium-card" +
          firstClass +
          "'>" +
          "<div class='podium-avatar'>" +
          person.short +
          "</div>" +
          "<h4>" +
          person.name +
          "</h4>" +
          "<p>" +
          person.city +
          "</p>" +
          "<div class='podium-score'>" +
          "<h5>" +
          scoreText +
          "</h5>" +
          "<span>" +
          metricLabel +
          "</span>" +
          "<h5>" +
          rank +
          "</h5>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    lbTableBody.innerHTML = data
      .map(function (person, index) {
        return (
          "<tr>" +
          "<td>" +
          (index + 1) +
          "</td>" +
          "<td>" +
          person.name +
          "</td>" +
          "<td>" +
          person.city +
          "</td>" +
          "<td>" +
          (lbMode === "co2" ? person.value.toFixed(1) : person.value) +
          "</td>" +
          "</tr>"
        );
      })
      .join("");
  }

  lbModeCo2.addEventListener("click", function () {
    lbMode = "co2";
    renderLeaderboard();
  });

  lbModeTop.addEventListener("click", function () {
    lbMode = "top";
    renderLeaderboard();
  });

  guessBtn.addEventListener("click", function () {
    var userGuess = Number(guessInput.value);
    if (!userGuess || userGuess < 1 || userGuess > 20) {
      guessMsg.textContent = "Enter a number from 1 to 20.";
      return;
    }

    if (userGuess === guessSecret) {
      guessMsg.textContent = "Correct! New number generated.";
      guessSecret = Math.floor(Math.random() * 20) + 1;
      return;
    }

    guessMsg.textContent = userGuess < guessSecret ? "Too low. Try again." : "Too high. Try again.";
  });

  pollOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      pollOptions.forEach(function (item) {
        item.classList.remove("active");
      });
      option.classList.add("active");
      pollResult.textContent = option.getAttribute("data-poll") + " selected. Thanks for voting.";
    });
  });

  markSupportedStates();
  markUnsupportedStateCards();
  renderCityChoices();
  setStep(1);
  renderLeaderboard();
  window.busTrackNavigate = showPage;
  ensureIcons();
});
