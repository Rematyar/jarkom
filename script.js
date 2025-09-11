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
