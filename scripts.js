function formatRupiah(angka) {
    return "Rp " + new Intl.NumberFormat('id-ID').format(angka);
}

function formatDate(date) {
    if (!date || isNaN(date.getTime())) return "-";
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function hitung() {
    const tanggalPinjamanInput = document.getElementById('tanggal-pinjaman').value;
    const namaInput = document.getElementById('nama').value;
    const jaminanInput = document.getElementById('jaminan').value;
    const nilaiJualJaminanInput = document.getElementById('nilai').value;
    const pokokInput = document.getElementById('pokok').value;
    const hariInput = document.getElementById('hari').value;

    let nilaiJualJaminan = parseFloat(nilaiJualJaminanInput) || 0;
    let taksiran = nilaiJualJaminan * 0.92;
    let pokok = parseFloat(pokokInput) || 0;
    let hari = parseInt(hariInput) || 0;

    let tanggalPinjaman = tanggalPinjamanInput ? new Date(tanggalPinjamanInput) : null;
    let tanggalJatuhTempo = null;

    if (tanggalPinjaman && !isNaN(tanggalPinjaman.getTime())) {
        tanggalJatuhTempo = new Date(tanggalPinjaman);
        tanggalJatuhTempo.setDate(tanggalJatuhTempo.getDate() + hari);
    }

    let tanggalPinjamanFormatted = formatDate(tanggalPinjaman);
    let tanggalJatuhTempoFormatted = formatDate(tanggalJatuhTempo);

    const admin = 20000;
    let periode = 0;
    let bunga = 0;
    let total = 0;

    // Hanya hitung jika ada input hari
    if (hari > 0) {
        // Logika Periode: Pembulatan ke atas per 15 hari
        periode = Math.ceil(hari / 15);
        // Logika Bunga: 1.2% dari pokok per periode
        bunga = pokok * 0.012 * periode;
        total = pokok + bunga + admin;
    } else if (pokok > 0) {
        total = pokok + admin;
    }

    // Update UI
    document.getElementById('taksiran').value = formatRupiah(taksiran);
    document.getElementById('tanggal-jatuh-tempo').value = tanggalJatuhTempoFormatted;
    
    document.getElementById('res-tanggal-pinjaman').innerText = tanggalPinjamanFormatted || "-";
    document.getElementById('res-nama').innerText = namaInput || "-";
    document.getElementById('res-jaminan').innerText = jaminanInput || "-";
    document.getElementById('res-nilai').innerText = formatRupiah(nilaiJualJaminan);
    document.getElementById('res-taksiran').innerText = formatRupiah(taksiran);
    document.getElementById('res-pokok').innerText = formatRupiah(pokok);
    document.getElementById('res-hari').innerText = hari + " Hari";
    document.getElementById('res-tanggal-jatuh-tempo').innerText = tanggalJatuhTempoFormatted || "-";
    document.getElementById('res-admin').innerText = formatRupiah(admin);
    document.getElementById('res-periode').innerText = periode + " Periode";
    document.getElementById('res-bunga').innerText = formatRupiah(bunga);
    document.getElementById('res-total').innerText = formatRupiah(total);
}

// Inisialisasi tampilan awal
hitung();
