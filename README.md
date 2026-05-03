# 🚌 BusTrack Bharat

A smart bus tracking system designed to estimate real-time bus locations **without fully relying on GPS infrastructure**.

---

## 🚀 Problem

Current public transport tracking systems face several limitations:

- Many systems rely heavily on GPS devices, which can be inconsistent or unavailable  
- Existing solutions often **do not adapt to real commuter behavior**  
- In India, there is **no unified application covering large-scale bus tracking reliably**  
- Data gaps lead to poor user experience and unreliable predictions  

---

## 💡 Solution Idea

This project explores a **multi-layer validation system** to estimate bus locations more reliably.

Instead of relying on a single source, it combines:

- 🧑‍✈️ Driver input  
- 👥 Passenger/user reports  
- 📊 Historical route patterns  

These layers help improve accuracy through **cross-validation and fallback logic**.

---

## 🧠 System Architecture (Still improving)

This system estimates real-time bus location using a **multi-source, confidence-based validation engine**, designed to function even without reliable GPS infrastructure.

---

## 🎯 System Objective

Accurately determine bus position using:

- 🟢 Driver signal (highest priority, if available)  
- 🟡 User signals (from active trip sessions)  
- 🔵 Prediction fallback (when no live data exists)  

---

## 🏗️ Core Entities

### 🚌 Bus
Represents a tracked vehicle.
- `bus_id`
- `route_id`
- `current_position`
- `current_source` (driver / user / prediction)

---

### 📡 Signal (Driver / User)
Each signal represents a real-time moving data source.
- `signal_id`
- `type` → driver / user
- `lat`, `lng`
- `timestamp`
- `route_id`
- `is_active`

---

### 👤 User Session (Opt-in)
Tracks user participation during a trip.
- `user_id`
- `route_id`
- `start_time`
- `destination_stop`
- `is_active`

---

## ⚙️ Core Processing Loop

The system continuously processes signals in short intervals (every few seconds).

---

### 🔄 Step 1: Collect Active Signals

- Gather all driver + user signals  
- Filter:
  - Recent (last 10–15 seconds)
  - Active sessions only  

---

### ✅ Step 2: Signal Validation

Each signal is validated using:

- **Route Alignment** → Must lie close to route path  
- **Direction Match** → Moving along correct route direction  
- **Speed Check** →  
  - Not too slow (walking)  
  - Not unrealistically fast  
- **Stop Pattern** → Pauses near known bus stops  

---

### 🧮 Step 3: Signal Scoring

Each signal is assigned a confidence score based on:

- Route alignment  
- Direction consistency  
- Speed validity  
- Stop behavior  
- Recency  

---

### ➕ Step 4: Score Enhancements

- 🟢 **Driver Bonus** → Driver signals receive highest priority  
- 🟡 **Stability Bonus** → Longer continuous sessions increase reliability  
- 🔵 **Destination Alignment Bonus** → Slight boost if trip aligns with route end  

---

### 👥 Step 5: User Clustering (Multi-User Fusion)

Users are grouped into clusters based on:
- Physical proximity  
- Same route segment  

Each cluster:
- Computes average position  
- Aggregates scores  

👉 Each cluster is treated as a **single strong signal**

---

### 🧠 Step 6: Source Selection

Candidates:
- Driver signal  
- User clusters  
- Individual user signals  

Final selection:

best_signal = max(score)

#### 🔁 Switching Rule (Stability Control)

To prevent erratic jumps:

Switch only if:
new_score > current_score + threshold

---

### 🛑 Step 7: STOP MODE (Critical Logic)

Triggered when:
- Speed ≈ 0  
- Location near a known bus stop  

Behavior:
- Temporarily freeze bus position  
- Wait 5–15 seconds  
- Re-evaluate signals  

Priority after stop:
1. Driver signal  
2. Existing validated users  
3. New validated users  
4. Prediction fallback  

---

### 📍 Step 8: Position Update

- Driver → direct position  
- User cluster → averaged position  
- Single user → fallback estimate  
- No signal → predicted position  

---

### ❌ Step 9: Signal Termination

Signals are discarded if:
- Session becomes inactive  
- Route mismatch detected  
- Speed becomes invalid  
- No updates within timeout  

---

## 🔐 Privacy Design

- No personal identity required  
- Session-based participation only  
- Data used temporarily  
- Fully opt-in user tracking  

---

## 🎯 Key Design Principles

- Never rely on a single data source  
- Prefer validated and stable signals  
- Use clustering to improve accuracy  
- Handle stops intelligently (STOP MODE)  
- Ensure smooth transitions (anti-jump logic)  

---

## 🧠 Learning & Prediction System

In addition to real-time tracking, the system continuously learns from historical and live data to improve accuracy over time.

---

## 🎯 Core Idea

The system learns **transport behavior patterns based on time of day**, since bus movement and crowd conditions vary significantly:

- Morning → crowded, slower  
- Afternoon → moderate  
- Night → faster, less crowded  

---

## 🗂️ Time-Based Data Model

All learning is stored using time buckets:

(route_id, direction, day_type, time_bucket)

### Example:
Route 101, UP direction, weekday, 8–10 AM

Each bucket maintains its own learned behavior.

---

## 📦 Stored Metrics

For each time bucket, the system stores:

### ⏱️ Travel Time (Edge Time)
Average time taken between two route points.

---

### ⏳ Dwell Time
Average waiting time at stops.

---

### 🐢 Delay Factor
Represents real-world delay:

delay_factor = actual_time / expected_time

Example:
Expected = 10 min  
Actual = 15 min  
→ Delay = 1.5

---

### 👥 Crowd Level
Crowd intensity based on user sessions:

- 1 → Low  
- 2 → Medium  
- 3 → High  

---

### 📊 Confidence
Amount of data available:

- Based on number of observations  
- Higher confidence → more reliable predictions  

---

## 🔄 Learning Process

The system continuously updates its knowledge using live signals.

---

### 🟢 Step 1: Detect Behavior

- Movement → updates travel time  
- Stops → updates dwell time  

---

### 🟡 Step 2: Update Time Metrics (EMA)

The system uses smoothing:

new_value = (1 - α) × old_value + α × observed_value

Applied to:
- Travel time  
- Dwell time  
- Delay factor  

---

### 🔵 Step 3: Update Crowd

From user sessions:

- Low → 1  
- Medium → 2  
- High → 3  

Updated using smoothing:

crowd_score = (1 - α) × old + α × input  

---

### 🟣 Step 4: Confidence Weighting

Different sources have different reliability:

- Driver → high confidence  
- User cluster → medium  
- Single user → low  

effective_alpha = α × confidence  

---

### 🧹 Step 5: Data Filtering

The system ignores unreliable data:

- Unrealistic speeds  
- Irregular movement  
- Noisy or unstable signals  

---

## 🧠 Prediction Engine

The learned data is used for real-time predictions.

---

### ⏱️ ETA Calculation

ETA =
(base_travel_time × delay_factor)
+ dwell_time

---

### 👥 Crowd Estimation

final_crowd =
blend(historical_data + live user signals)

---

## 🔗 Key Insight

Crowd and time are interconnected:

- Higher crowd → longer dwell time  
- Higher crowd → increased delay factor  

---

## 🟡 Initial Defaults

Before enough data is learned, the system starts with assumptions:

- Morning → slow, crowded  
- Afternoon → moderate  
- Night → fast  

These values improve over time.

---

## 🔄 Continuous Learning Loop

The system continuously:

1. Observes movement and stops  
2. Collects user session data  
3. Updates time-based buckets  
4. Improves predictions  

---

## 💡 System Insight

This creates a **self-improving transport intelligence system** that adapts to real-world patterns instead of relying only on static schedules or GPS data.

---

## 🛠️ Current Status

✅ Frontend prototype completed using:
- HTML  
- CSS  
- JavaScript  

🔄 In progress:
- Signal validation logic  
- Scoring system  
- Real-time position estimation  

🚧 Planned:
- User session integration  
- Clustering mechanism  
- Learning & prediction implementation

  <img width="1895" height="982" alt="Screenshot 2026-05-03 173644" src="https://github.com/user-attachments/assets/a8fe42d8-7fa0-4e7c-a455-259ef3d14cc8" />

