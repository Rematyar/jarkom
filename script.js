let catatanCount = 1;

function tambahCatatan() {
  catatanCount++;
  const container = document.getElementById("catatan-container");
  const label = document.createElement("label");
  label.textContent = "Catatan " + catatanCount;
  const input = document.createElement("input");
  input.type = "text";
  input.className = "catatan";
  container.appendChild(label);
  container.appendChild(input);
}

function cekKegiatan() {
  const select = document.getElementById("kegiatan");
  const custom = document.getElementById("kegiatanCustom");
  if (select.value === "custom") {
    custom.style.display = "block";
  } else {
    custom.style.display = "none";
  }
}

function getKegiatan() {
  const select = document.getElementById("kegiatan");
  const custom = document.getElementById("kegiatanCustom");
  return select.value === "custom" ? custom.value : select.value;
}

// 🔹 Fungsi untuk format tanggal Indonesia
function formatTanggal(dateString) {
  const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  const months = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

  let date = new Date(dateString);
  if (isNaN(date)) return ""; // kalau input kosong / invalid

  let hari = days[date.getDay()];
  let tanggal = date.getDate();
  let bulan = months[date.getMonth()];
  let tahun = date.getFullYear();

  return `${hari}, ${tanggal} ${bulan} ${tahun}`;
}

function generate() {
  let salam = document.getElementById("salam").value;
  let keterangan = document.getElementById("keterangan").value;
  let tanggalInput = document.getElementById("tanggal").value;
  let tanggal = tanggalInput ? formatTanggal(tanggalInput) : "";
  let waktu = document.getElementById("waktu").value;
  let tempat = document.getElementById("tempat").value;
  let kegiatan = getKegiatan();
  let catInputs = document.getElementsByClassName("catatan");

  let catatanList = "";
  for (let i = 0; i < catInputs.length; i++) {
    if (catInputs[i].value.trim() !== "") {
      catatanList += `- ${catInputs[i].value}\n`;
    }
  }

  let template = `📢 *JARKOM* 📢

_Assalamu'alaikum Warahmatullahi Wabarakatuh._
Selamat ${salam} semuanya.

Diberitahukan untuk seluruh anggota ROHIS/IRMA Miftahul Jannah, bahwa *${keterangan}*, yakni:

📆 Hari/tanggal : ${tanggal}
⏰ Waktu : ${waktu}
📍 Tempat : ${tempat}

akan diadakan *${kegiatan}.*

🗒 Notes :
${catatanList}

Terima kasih atas perhatiannya 👋🏻

_Wassalamualaikum Warahmatullahi Wabarakatuh._`;

  document.getElementById("output").textContent = template;
  document.getElementById("copyBtn").style.display = "inline-block";
}

function copyText() {
  const text = document.getElementById("output").textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("Teks berhasil dicopy ke clipboard!");
  });
}

const toggleBtn = document.getElementById("mode-toggle");
    const body = document.body;

    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      if (body.classList.contains("dark-mode")) {
        toggleBtn.textContent = "☀️ Light";
      } else {
        toggleBtn.textContent = "🌙 Dark";
      }
    });

// Get the main container for note fields
    const catatanContainer = document.getElementById('catatan-container');
    // A counter to keep track of the number of notes for labeling
    let catatanCount = 0;

    /**
     * Function to add a new note field.
     * @param {string} defaultValue - The default text to put in the input field.
     */
    function tambahCatatan(defaultValue = '') {
        catatanCount++; // Increment the counter

        // Create a new div to hold the label and input
        const newCatatanGroup = document.createElement('div');
        
        // Create the label for the new note
        const newLabel = document.createElement('label');
        newLabel.textContent = `Catatan ${catatanCount}`;

        // Create the new text input field
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.className = 'catatan';
        newInput.value = defaultValue; // Set the default value if provided

        // Append the label and input to the new div
        newCatatanGroup.appendChild(newLabel);
        newCatatanGroup.appendChild(newInput);

        // Append the new group to the main container
        catatanContainer.appendChild(newCatatanGroup);
    }
    
    /**
     * This function runs whenever the dropdown selection changes.
     * It handles the core logic for showing/hiding fields and adding notes.
     */
    function cekKegiatan() {
        const kegiatanSelect = document.getElementById('kegiatan');
        const customInput = document.getElementById('kegiatanCustom');
        const selectedValue = kegiatanSelect.value;
        
        // Show or hide the custom input field based on selection
        customInput.style.display = (selectedValue === 'custom') ? 'block' : 'none';
        
        // --- CORE LOGIC ---
        // Clear all existing note fields to start fresh
        catatanContainer.innerHTML = '';
        catatanCount = 0;
        
        if (selectedValue === 'Mentoring Ikhwan bersama Kak Arya') {
            // Add the first note with predefined text
            tambahCatatan("Jangan lupa bawa catatan dan alat tulis.");
            // Add a second, blank note field
            tambahCatatan();
        } else if (selectedValue === 'Mentoring Akhwat bersama Teh Astrid') {
            // Example for another option
            tambahCatatan("Diharapkan hadir tepat waktu.");
            tambahCatatan();
        } else {
            // For any other option (like Ngabar or Custom), just add one blank note
            tambahCatatan();
        }
    }

    // Run the cekKegiatan function once when the page loads
    // to set up the initial state for the default selected option.
    document.addEventListener('DOMContentLoaded', cekKegiatan);
