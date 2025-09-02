async function loadCSV() {
  const response = await fetch("Daily_hours_spend_reading.csv");
  const text = await response.text();
  return parseCSV(text);
}

function parseCSV(data) {
  const rows = data.trim().split("\n").slice(1); // skip header
  return rows.map(row => {
    const [dateStr, hoursStr] = row.split(",");
    return {
      date: new Date(dateStr),
      hours: parseFloat(hoursStr)
    };
  });
}

function getWeekNumber(d) {
  // Copy date so don't modify original
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
  return Math.ceil((((date - yearStart) / 86400000) + 1)/7);
}

function normalizeValue(hours) {
  if (hours <= 0) return 0;
  if (hours < 1) return 1;
  if (hours < 2) return 2;
  if (hours < 3) return 3;
  return 4;
}

function buildHeatmap(data) {
  const heatmap = document.getElementById("heatmap");
  
  // Initialize 52 x 7 grid
  for (let week = 0; week < 52; week++) {
    for (let day = 0; day < 7; day++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.value = 0;
      heatmap.appendChild(cell);
    }
  }

  // Fill in with data
  data.forEach(d => {
    const week = getWeekNumber(d.date) - 1;
    const day = d.date.getDay(); // Sunday=0..Saturday=6
    const value = normalizeValue(d.hours);

    const index = week * 7 + day;
    const cell = heatmap.children[index];
    if (cell) {
      cell.dataset.value = value;
      cell.title = `${d.date.toDateString()}: ${d.hours}h`;
    }
  });
}

loadCSV().then(buildHeatmap);
