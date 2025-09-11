function formatTanggal(dateString) {
  const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  const months = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

  let date = new Date(dateString);
  let hari = days[date.getDay()];
  let tanggal = date.getDate();
  let bulan = months[date.getMonth()];
  let tahun = date.getFullYear();

  return `${hari}, ${tanggal} ${bulan} ${tahun}`;
}

function generate() {
  let tanggalInput = document.getElementById("tanggal").value;
  let tanggal = tanggalInput ? formatTanggal(tanggalInput) : "";

  document.getElementById("output").textContent = `Hari/Tanggal: ${tanggal}`;
}
