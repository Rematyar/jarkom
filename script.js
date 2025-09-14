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

const catatanContainer = document.getElementById('catatan-container');
    let catatanCount = 0; // To keep track of the number of notes

    // Function to add a new note field
    function tambahCatatan(defaultValue = '') {
        catatanCount++;
        
        const newCatatanDiv = document.createElement('div');
        newCatatanDiv.id = `catatan-group-${catatanCount}`;
        newCatatanDiv.style.marginTop = '10px';

        const newLabel = document.createElement('label');
        newLabel.textContent = `Catatan ${catatanCount}`;

        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.className = 'catatan';
        newInput.value = defaultValue; // Set the default value if provided

        newCatatanDiv.appendChild(newLabel);
        newCatatanDiv.appendChild(newInput);
        catatanContainer.appendChild(newCatatanDiv);
    }
    
    // Function to handle the logic when the dropdown selection changes
    function cekKegiatan() {
        const kegiatanSelect = document.getElementById('kegiatan');
        const customInput = document.getElementById('kegiatanCustom');
        const selectedValue = kegiatanSelect.value;
        
        // Handle the visibility of the custom input field
        if (selectedValue === 'custom') {
            customInput.style.display = 'block';
        } else {
            customInput.style.display = 'none';
        }
        
        // Reset the notes for a clean slate on every change
        catatanContainer.innerHTML = '';
        catatanCount = 0;
        
        // --- CORE LOGIC ---
        if (selectedValue === 'Mentoring Ikhwan bersama Kak Arya') {
            // Add the first note with a predefined value
            tambahCatatan("Jangan lupa bawa catatan dan alat tulis");
            
            // Add a second, blank note
            tambahCatatan();
        } 
        // Example for another option
        else if (selectedValue === 'Mentoring Akhwat bersama Teh Astrid') {
            // Add a predefined note for this option
            tambahCatatan("Diharapkan datang tepat waktu");
        }
        else {
            // For any other option (like Ngabar or Custom), just add one blank note
            tambahCatatan();
        }
    }

    // Initialize the form with one blank note when the page loads
    document.addEventListener('DOMContentLoaded', () => {
        cekKegiatan();
    });
