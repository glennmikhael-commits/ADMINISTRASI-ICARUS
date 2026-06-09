document.addEventListener("DOMContentLoaded", () => {
    
    
    function updateClock() {
        const clockEl = document.getElementById('realtimeClock');
        if (clockEl) {
            let timeString = new Date().toLocaleTimeString('id-ID', {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            timeString = timeString.replace(/\./g, ':');
            clockEl.innerText = `${timeString} WIB`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock(); 
    
    
    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1499607345662263426/ub8BLgxS1Vos7CLPxNebpMvYfDPvyud0OxieBmdoQc_3BRdxfCgAskEq1L0dzhBGQdM_";
    const REMOVE_BG_API_KEY = "917739b494cdf21de56a1043297ef3de4aea263d3cd7da319627f18dde7944b170470a92aa59cd32871620a115fef09a";

    const firebaseConfig = {
        apiKey: "AIzaSyDL_HQg1bW8YxCXfO0wXl_ml7F_NZ4aY4M",
        authDomain: "mdticarus.firebaseapp.com",
        databaseURL: "https://mdticarus-default-rtdb.asia-southeast1.firebasedatabase.app", 
        projectId: "mdticarus",
        storageBucket: "mdticarus.firebasestorage.app",
        messagingSenderId: "801443192872",
        appId: "1:801443192872:web:2625b29109402794e2551d",
        measurementId: "G-FS4JWZRR1F"
    };

    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
    const database = firebase.database();
    const auth = firebase.auth();

    const showAlert = (title, text, icon) => {
        return Swal.fire({ title: title, text: text, icon: icon, customClass: { popup: 'swal-dark-popup', title: 'swal-dark-title', confirmButton: 'swal-dark-confirm' } });
    };

    const showToast = (title, icon="success") => {
        return Swal.fire({ toast: true, position: 'top-end', icon: icon, title: title, showConfirmButton: false, timer: 3000, timerProgressBar: true, customClass: { popup: 'swal-dark-popup' } });
    };

    function insertAuditLog(action, detail) {
        const officerCallsign = document.getElementById('inputOfficer').value || "UNKNOWN";
        const timestamp = new Date().getTime(); 
        database.ref('audit_logs').push({ waktu: timestamp, petugas: officerCallsign, tindakan: action, keterangan: detail });
    }

    
    const officerDatabase = {
        "admin@icarus.com": { callsign: "Admin 01", nama: "Admin", status: "PIMPINAN ORDO ICARUS" },
        "francis@icarus.com": { callsign: "MAVERICK 01", nama: "Sir Francis Drake", status: "PIMPINAN ORDO ICARUS" },
        "nathan@icarus.com": { callsign: "ORION 01", nama: "Nathan G Kamek", status: "PIMPINAN ORDO ICARUS", signatureImg: "link_gambar_tanda_tangan_kamu2.png"},
        "leonard@icarus.com": { callsign: "ORION 02", nama: "Leonard Willy", status: "PIMPINAN ORDO ICARUS", signatureImg: "link_gambar_tanda_tangan_kamu3.png"},
        "grecia@icarus.com": { callsign: "ORION 03", nama: "Grecia F Nakagawa", status: "PIMPINAN ORDO ICARUS" },
        "natanael@icarus.com": { callsign: "VP - 01", nama: "Natanael Pardede", status: "ANGGOTA ORDO ICARUS" },
        "senna@icarus.com": { callsign: "ORION - 04", nama: "Senna Aduivat", status: "PIMPINAN ORDO ICARUS" , signatureImg: "link_gambar_tanda_tangan_kamu1.png" },
        "glenn@icarus.com": { callsign: "VP - 03", nama: "Glenn Jacob", status: "PIMPINAN ORDO ICARUS", signatureImg: "link_gambar_tanda_tangan_kamu1.png", profileImg: "glenn_foto.png"},
        "kael@icarus.com": { callsign: "VP - 05", nama: "Kael Kaizer", status: "PIMPINAN ORDO ICARUS" },
        "christopher@icarus.com": { callsign: "VP - 06", nama: "Christopher F Lee", status: "ANGGOTA ORDO ICARUS" },
        "chrystalea@icarus.com": { callsign: "VP - 07", nama: "Chrystalea F Lee", status: "ANGGOTA ORDO ICARUS" },
        "bayu@icarus.com": { callsign: "VP - 08", nama: "Bayu S Sidharta", status: "ANGGOTA ORDO ICARUS" },
        "abyan@icarus.com": { callsign: "VP - 09", nama: "Abyan Kurniawan", status: "ANGGOTA ORDO ICARUS" },
        "moody@icarus.com": { callsign: "VP - 10", nama: "Moody O Conner", status: "ANGGOTA ORDO ICARUS" },
        "voidx@icarus.com": { callsign: "VP - 11", nama: "L Voidx", status: "ANGGOTA ORDO ICARUS" },
        "tobi@icarus.com": { callsign: "VP - 12", nama: "Tobi Barber", status: "ANGGOTA ORDO ICARUS" },
        "karlo@icarus.com": { callsign: "VP - 13", nama: "Karlo A Lee", status: "ANGGOTA ORDO ICARUS" },
        "michael@icarus.com": { callsign: "VP - 14", nama: "Michael Larosso", status: "ANGGOTA ORDO ICARUS" },
        "natsu@icarus.com": { callsign: "VP - 15", nama: "Natsu Ky Sukemprot", status: "ANGGOTA ORDO ICARUS" },
        "dandy@icarus.com": { callsign: "VP - 16", nama: "Dandy C. Putra", status: "ANGGOTA ORDO ICARUS" },
        "calvin@icarus.com": { callsign: "VP - 16", nama: "Calvin R. Lewis", status: "ANGGOTA ORDO ICARUS" }
    };

    
function applyOfficerIdentity(email) {
        const officer = officerDatabase[email.toLowerCase()];
        if (officer) {
            
            document.getElementById('inputOfficer').value = officer.callsign;
            document.getElementById('displayOfficer').innerText = officer.callsign;
            document.getElementById('displayUnit').innerText = officer.status; 
            
            
            const sigElement = document.getElementById('autoSignature');
            if (officer.signatureImg) {
                sigElement.innerHTML = `<img src="${officer.signatureImg}" style="height: 60px; width: auto; object-fit: contain;">`;
                sigElement.style.fontFamily = "inherit"; 
            } else {
                sigElement.innerText = officer.nama || "UNKNOWN";
                sigElement.style.fontFamily = "'Great Vibes', cursive";
            }

            
            const dashNama = document.getElementById('dashNama');
            const dashCallsign = document.getElementById('dashCallsign');
            const dashUnitDetail = document.getElementById('dashUnitDetail');
            const dashFoto = document.getElementById('dashFoto');

            if (dashNama) dashNama.innerText = officer.nama || "UNKNOWN";
            if (dashCallsign) dashCallsign.innerText = officer.callsign;
            if (dashUnitDetail) dashUnitDetail.innerText = officer.status;

            
            if (dashFoto && officer) {
                if (officer.profileImg) {
                    
                    dashFoto.src = officer.profileImg;
                } else if (officer.nama) {
                    
                    const namaUrl = encodeURIComponent(officer.nama);
                    dashFoto.src = `https://ui-avatars.com/api/?name=${namaUrl}&background=0f172a&color=fbbf24&size=150&bold=true`;
                }
            }

           
            const dashPoin = document.getElementById('dashPoin');
            const dashStatus = document.getElementById('dashStatus');
            const safeCallsign = officer.callsign.replace(/\s+/g, ''); // Format "VP - 03" jadi "VP-03"

            database.ref('progress_anggota/' + safeCallsign).on('value', (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    if (dashPoin) dashPoin.innerText = data.total_poin || 0;
                    
                    if (dashStatus) {
                        if (data.status === "AKTIF") dashStatus.innerHTML = `<span style="color: #22c55e;"><i class="fas fa-check-circle"></i> AKTIF BERTUGAS</span>`;
                        else if (data.status === "MASA PERCOBAAN") dashStatus.innerHTML = `<span style="color: #eab308;"><i class="fas fa-user-clock"></i> MASA PERCOBAAN</span>`;
                        else if (data.status === "CUTI") dashStatus.innerHTML = `<span style="color: #3b82f6;"><i class="fas fa-plane"></i> CUTI (LOA)</span>`;
                        else dashStatus.innerHTML = `<span style="color: #ef4444;"><i class="fas fa-ban"></i> SUSPENDED</span>`;
                    }
                } else {
                    if (dashPoin) dashPoin.innerText = "0";
                    if (dashStatus) dashStatus.innerHTML = `<span style="color: #22c55e;"><i class="fas fa-check-circle"></i> AKTIF BERTUGAS</span>`;
                }
            });

            
            const isPimpinan = officer.status.includes("PIMPINAN");
            
            document.getElementById('menuStatistik').style.display = isPimpinan ? 'flex' : 'none';
            document.getElementById('menuAudit').style.display = isPimpinan ? 'flex' : 'none';
            const labelPim = document.getElementById('labelPimpinan');
            if (labelPim) labelPim.style.display = isPimpinan ? 'block' : 'none';
            const formProg = document.getElementById('formProgressPimpinan');
            if (formProg) formProg.style.display = isPimpinan ? 'block' : 'none';
        }
    }


    const landingWrapper = document.getElementById('landingWrapper'); // ID Wrapper baru
    const mainApp = document.getElementById('mainApp');
    const loginError = document.getElementById('loginError');
    const linkAbout = document.getElementById('linkAbout');
    const aboutSection = document.getElementById('aboutSection');

    
    if(linkAbout && aboutSection) {
        linkAbout.onclick = (e) => {
            e.preventDefault();
            aboutSection.scrollIntoView({ behavior: 'smooth' }); 
        };
    }

    

    auth.onAuthStateChanged((user) => {
        if (user) { 
            const emailUser = user.email.toLowerCase();
            if (officerDatabase[emailUser]) {
                applyOfficerIdentity(emailUser); 
                
                
                if(landingWrapper) landingWrapper.style.display = "none"; 
                if(mainApp) mainApp.style.display = "flex"; 
                triggerInitialValues();
            } else {
                auth.signOut();
                showAlert("Akses Ilegal", "Email Anda tidak terdaftar sebagai petugas resmi Icarus.", "error");
            }
        }
    });

    document.getElementById('btnLogin').onclick = () => {
       
        let email = document.getElementById('inputOfficer').value.trim();
        const pass = document.getElementById('inputPassword').value;
        const btn = document.getElementById('btnLogin');
        
        
        if (email !== "" && !email.includes('@')) {
            email += "@icarus.com";
        }

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> OTORISASI...';
        btn.disabled = true;

        auth.signInWithEmailAndPassword(email, pass)
            .then(() => { 
                showToast("Login Berhasil!"); 
                setTimeout(() => { location.reload(); }, 1500);
            })
            .catch(() => { 
                btn.innerHTML = '<span>OTORISASI AKSES</span><i class="fas fa-terminal"></i>'; 
                btn.disabled = false;
                if(loginError) {
                    loginError.innerText = "Akses Ditolak! Cek Kredensial Anda."; 
                    loginError.style.display = "block"; 
                } else {
                    showAlert("Akses Ditolak", "Email atau Password Salah.", "error");
                }
            });
    };

    auth.onAuthStateChanged((user) => {
        if (user) { 
            const emailUser = user.email.toLowerCase();
            
            if (officerDatabase[emailUser]) {
                applyOfficerIdentity(emailUser); 
                if(loginScreen) loginScreen.style.display = "none"; 
                if(mainApp) mainApp.style.display = "flex"; 
                triggerInitialValues();
            } else {
                
                auth.signOut();
                showAlert("Akses Ilegal", "Email Anda tidak terdaftar sebagai petugas resmi Icarus.", "error");
            }
        }
    });

    document.getElementById('btnLogout').onclick = () => { 
        insertAuditLog("LOGOUT", "Petugas keluar dari portal administrasi.");
        setTimeout(() => { auth.signOut().then(() => location.reload()); }, 500); 
    };

    
    let currentLastRegNum = 1000; 
    const inputReg = document.getElementById('inputRegistrasi');
    const displayReg = document.getElementById('displayRegistrasi');
    const inputMode = document.getElementById('inputMode');
    const btnCariData = document.getElementById('btnCariData');

    database.ref('last_pl_number').on('value', (snapshot) => {
        currentLastRegNum = snapshot.exists() ? snapshot.val() : 1000;
        if (inputMode && inputMode.value === "BARU") {
            const nextReg = `PL-${currentLastRegNum + 1}`;
            if(inputReg) inputReg.value = nextReg;
            if(displayReg) displayReg.innerText = nextReg;
        }
    });

    if(inputMode) {
        inputMode.addEventListener('change', () => {
            const kartuLicensi = document.getElementById('kartuLicensi');
            const kartuSheriff = document.getElementById('kartuSheriff');
            
            
            const lblPekerjaan = document.querySelector('label[for="inputPekerjaan"]');
            const inputPekerjaan = document.getElementById('inputPekerjaan');
            const lblNoKapal = document.querySelector('label[for="inputNoKapal"]');
            const inputNoKapal = document.getElementById('inputNoKapal');
            const lblJabatan = document.querySelector('label[for="inputJabatan"]');
            const inputJabatan = document.getElementById('inputJabatan');
            
            
            const inputImo = document.getElementById('inputImo');
            const inputNoTelp = document.getElementById('inputNoTelp');
            const formGroupImo = inputImo ? inputImo.closest('.form-group') : null;
            const formGroupTelp = inputNoTelp ? inputNoTelp.closest('.form-group') : null;

            if (inputMode.value === "BARU" || inputMode.value === "PERPANJANG") {
               
                if(lblPekerjaan) lblPekerjaan.innerText = "PEKERJAAN";
                if(inputPekerjaan) inputPekerjaan.placeholder = "Contoh: PELAUT";
                if(lblNoKapal) lblNoKapal.innerText = "NOMOR PLAT KAPAL";
                if(inputNoKapal) inputNoKapal.placeholder = "Nomor Lambung / Plat";
                if(lblJabatan) lblJabatan.innerText = "JABATAN";
                if(inputJabatan) inputJabatan.placeholder = "KAPTEN KAPAL";
                
                if(formGroupImo) formGroupImo.style.display = "flex";
                if(formGroupTelp) formGroupTelp.style.display = "flex";
                
            } else if (inputMode.value === "SHERIFF") {
                
                if(lblPekerjaan) lblPekerjaan.innerText = "INSTITUTION";
                if(inputPekerjaan) inputPekerjaan.placeholder = "Contoh: SHERIFF ROXWOOD";
                if(lblNoKapal) lblNoKapal.innerText = "CALL SIGN";
                if(inputNoKapal) inputNoKapal.placeholder = "Contoh: VP - 00";
                if(lblJabatan) lblJabatan.innerText = "RATING";
                if(inputJabatan) inputJabatan.placeholder = "Contoh: ALL TYPE";
                
                if(formGroupImo) formGroupImo.style.display = "none";
                if(formGroupTelp) formGroupTelp.style.display = "flex";
            }

           
            if (inputMode.value === "BARU") {
                const nextReg = `PL-${currentLastRegNum + 1}`;
                if(inputReg) inputReg.value = nextReg;
                if(displayReg) displayReg.innerText = nextReg;
                if(btnCariData) btnCariData.style.display = "none";
                if(kartuLicensi) kartuLicensi.style.display = "flex";
                if(kartuSheriff) kartuSheriff.style.display = "none";

            } else if (inputMode.value === "PERPANJANG") {
                if(inputReg) inputReg.value = ""; 
                if(displayReg) displayReg.innerText = "-";
                if(btnCariData) btnCariData.style.display = "block";
                if(kartuLicensi) kartuLicensi.style.display = "flex";
                if(kartuSheriff) kartuSheriff.style.display = "none";

            } else if (inputMode.value === "SHERIFF") {
                const nextReg = `SR/IC-${currentLastRegNum + 1}`; 
                if(inputReg) inputReg.value = nextReg;
                document.getElementById('dispRegSheriff').innerText = nextReg;
                if(btnCariData) btnCariData.style.display = "none";
                if(kartuLicensi) kartuLicensi.style.display = "none"; 
                if(kartuSheriff) kartuSheriff.style.display = "block"; 
            }
        });
    }

    if(btnCariData) {
        btnCariData.onclick = () => {
            const searchReg = inputReg.value.trim().toUpperCase();
            if(!searchReg) { showAlert("Perhatian", "Silakan masukkan Nomor Registrasi untuk dicari.", "info"); return; }
            
            btnCariData.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            database.ref('licenses/' + searchReg).once('value').then((snapshot) => {
                btnCariData.innerHTML = '<i class="fas fa-search"></i> CARI';
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    document.getElementById('inputNama').value = data.nama || "";
                    document.getElementById('inputGender').value = data.gender || "";
                    document.getElementById('inputPekerjaan').value = data.pekerjaan || "";
                    document.getElementById('inputDob').value = data.dob || "";
                    document.getElementById('inputImo').value = data.imo || "";
                    document.getElementById('inputJabatan').value = data.jabatan || "";
                    document.getElementById('inputNoKapal').value = data.noKapal || "";
                    document.getElementById('inputNoTelp').value = data.noTelp || "";
                    const triggers = ['inputNama', 'inputGender', 'inputPekerjaan', 'inputDob', 'inputImo', 'inputJabatan', 'inputNoKapal', 'inputNoTelp'];
                    triggers.forEach(id => document.getElementById(id).dispatchEvent(new Event('input')));
                    showToast("Data Ditemukan!");
                } else { showAlert("Gagal", "Data Lisensi tidak ditemukan di arsip.", "error"); }
            });
        };
    }

    
    let currentLastHeliNum = 0;
    database.ref('last_heli_number').on('value', (snapshot) => {
        currentLastHeliNum = snapshot.exists() ? snapshot.val() : 0;
        const nextRegHeli = `SR/IC-${String(currentLastHeliNum + 1).padStart(4, '0')}`;
        const inputRegHeli = document.getElementById('inputRegHeli');
        const dispRegHeli = document.getElementById('dispRegHeli');
        if (inputRegHeli) inputRegHeli.value = nextRegHeli;
        if (dispRegHeli) dispRegHeli.innerText = nextRegHeli;
    });

    
    function bindInput(inputId, displayId, prefix = "") {
        const input = document.getElementById(inputId);
        const display = document.getElementById(displayId);
        if (input && display) {
            const updateAction = () => { display.innerText = prefix + (input.value.toUpperCase() || "-"); };
            input.addEventListener('input', updateAction);
            input.addEventListener('change', updateAction);
        }
    }

    function triggerInitialValues() {
        ['inputGender', 'inputMode'].forEach(id => {
            const el = document.getElementById(id);
            if(el) el.dispatchEvent(new Event('change'));
        });
    }

    bindInput('inputRegistrasi', 'displayRegistrasi', '');
    bindInput('inputNama', 'displayNama', ': ');
    bindInput('inputGender', 'displayGender', ': ');
    bindInput('inputPekerjaan', 'displayPekerjaan', ': ');
    bindInput('inputJabatan', 'displayJabatan', ': ');
    bindInput('inputImo', 'displayImo', ': ');
    bindInput('inputNoKapal', 'displayNoKapal', ': ');
    bindInput('inputOfficer', 'displayOfficer', '');
    
    bindInput('inputNama', 'dispNamaSheriff', '');
    bindInput('inputGender', 'dispGenderSheriff', '');
    bindInput('inputPekerjaan', 'dispInstSheriff', '');
    bindInput('inputJabatan', 'dispRatingSheriff', '');
    bindInput('inputNoKapal', 'dispCallsignSheriff', '');
    bindInput('inputRegistrasi', 'dispRegSheriff', '');
    bindInput('inputExpired', 'dispExpiredSheriff', '');

    
    const inDob = document.getElementById('inputDob');
    if (inDob) {
        inDob.addEventListener('change', (e) => {
            const dVal = new Date(e.target.value);
            if (!isNaN(dVal)) {
                const mNames = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"];
                const dispDobS = document.getElementById('dispDobSheriff');
                if (dispDobS) {
                    dispDobS.innerText = `${String(dVal.getDate()).padStart(2, '0')} ${mNames[dVal.getMonth()]} ${dVal.getFullYear()}`;
                }
            }
        });
    }

    const inputPekerjaanDynamic = document.getElementById('inputPekerjaan');
    const displayPillsTitle = document.getElementById('displayPillsTitle');
    if(inputPekerjaanDynamic) {
        inputPekerjaanDynamic.addEventListener('input', () => {
            const val = inputPekerjaanDynamic.value.toUpperCase();
            const listPerairan = ["EMT", "KABINET", "POLISI", "CIVILIAN", "SHERIFF", "PEMKOT", "DOKTER", "EMS", "PETERNAK", "MEDIA", "PETANI","BUS", "TUKANG SAMPAH", "TAMBANG", "TUKANG KAYU","TAXI","ROXWOOD LINK", "PEDAGANG"];
            const isPerairan = listPerairan.some(k => val.includes(k));
            if (isPerairan) {
                displayPillsTitle.innerText = "LISENSI PERAIRAN SIPIL";
                displayPillsTitle.style.background = "linear-gradient(to right, #f7851a, #faa923)";
                displayPillsTitle.style.color = "#0f172a";
            } else {
                displayPillsTitle.innerText = "LISENSI PELAUT SIPIL";
                displayPillsTitle.style.background = "white";
                displayPillsTitle.style.color = "#0f172a";
            }
        });
    }

   
    bindInput('inputNamaHeli', 'dispNamaHeli', '');
    bindInput('inputInstHeli', 'dispInstHeli', '');
    bindInput('inputRatingHeli', 'dispRatingHeli', '');
    bindInput('inputGenderHeli', 'dispGenderHeli', '');
    bindInput('inputRegHeli', 'dispRegHeli', '');
    bindInput('inputExpiredHeli', 'dispExpiredHeli', '');

    const inputAuthHeli = document.getElementById('inputAuthHeli');
    const dispAuthHeli = document.getElementById('dispAuthHeli');
    if (inputAuthHeli && dispAuthHeli) {
        inputAuthHeli.addEventListener('change', () => { dispAuthHeli.innerText = inputAuthHeli.value; });
        dispAuthHeli.innerText = inputAuthHeli.value; 
    }

    const inputDobHeli = document.getElementById('inputDobHeli');
        const dispDobHeli = document.getElementById('dispDobHeli');
        if (inputDobHeli && dispDobHeli) {
            inputDobHeli.addEventListener('change', () => {
                const dateVal = new Date(inputDobHeli.value);
                if (!isNaN(dateVal)) {
                    
                    const shortMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                    
                    const day = String(dateVal.getDate()).padStart(2, '0');
                    const month = shortMonths[dateVal.getMonth()];
                    const year = dateVal.getFullYear();
                    
                    
                    dispDobHeli.innerText = `${day} ${month} ${year}`;
                } else {
                    dispDobHeli.innerText = '-';
                }
            });
        }

    const updateCallsignHeli = () => {
        const valA = document.getElementById('inputCallsignHeliA').value;
        const valB = document.getElementById('inputCallsignHeliB').value;
        const dispCallsign = document.getElementById('dispCallsignHeli');
        if(dispCallsign) dispCallsign.innerText = `${valA} - ${valB}`;
    };
    const inputCallA = document.getElementById('inputCallsignHeliA');
    const inputCallB = document.getElementById('inputCallsignHeliB');
    if (inputCallA && inputCallB) {
        inputCallA.addEventListener('change', updateCallsignHeli);
        inputCallB.addEventListener('change', updateCallsignHeli);
        updateCallsignHeli(); 
    }

    const inputExpHeli = document.getElementById('inputExpiredHeli');
    const dispExpHeliText = document.getElementById('dispExpiredHeli'); 
    function setExpirationHeli(months) {
        
        let d = new Date(); d.setMonth(d.getMonth() + months);
        const mNames = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"];
        let str = `${String(d.getDate()).padStart(2, '0')} ${mNames[d.getMonth()]} ${d.getFullYear()}`;
        
        
        if (inputExpHeli) inputExpHeli.value = str; 
        if (dispExpHeliText) dispExpHeliText.innerHTML = str.toUpperCase();
    }
    const btnPlus1Heli = document.getElementById('btnPlus1Heli');
    const btnPlus2Heli = document.getElementById('btnPlus2Heli');
    const btnPlus3Heli = document.getElementById('btnPlus3Heli');
    if(btnPlus1Heli) btnPlus1Heli.onclick = () => setExpirationHeli(1);
    if(btnPlus2Heli) btnPlus2Heli.onclick = () => setExpirationHeli(2);
    if(btnPlus3Heli) btnPlus3Heli.onclick = () => setExpirationHeli(3);

    
    const inputExp = document.getElementById('inputExpired');
    const displayExpText = document.getElementById('displayExpiredText'); 
    function setExpiration(months) {
     let d = new Date(); d.setMonth(d.getMonth() + months);
     const mNames = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"];
     let str = `${String(d.getDate()).padStart(2, '0')} ${mNames[d.getMonth()]} ${d.getFullYear()}`;

     if(inputExp) inputExp.value = str; 
     if(displayExpText) displayExpText.innerHTML = str.toUpperCase();

     
     const dispExpiredSheriff = document.getElementById('dispExpiredSheriff');
     if (dispExpiredSheriff) dispExpiredSheriff.innerHTML = str.toUpperCase();
 }
    const bPlus1 = document.getElementById('btnPlus1');
    const bPlus2 = document.getElementById('btnPlus2');
    const bPlus3 = document.getElementById('btnPlus3');
    if(bPlus1) bPlus1.onclick = () => setExpiration(1);
    if(bPlus2) bPlus2.onclick = () => setExpiration(2);
    if(bPlus3) bPlus3.onclick = () => setExpiration(3);

    let today = new Date();
    const mNamesIndo = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"];
    const dIssueDate = document.getElementById('displayIssueDate');
    if(dIssueDate) dIssueDate.innerText = `${String(today.getDate()).padStart(2, '0')} ${mNamesIndo[today.getMonth()]} ${today.getFullYear()}`;

    
    let cropper;
    let currentCropTarget = "PELAUT"; 
    const modal = document.getElementById('cropperModal');
    const imgCrop = document.getElementById('imageToCrop');

    const inputFotoElement = document.getElementById('inputFoto');
    if(inputFotoElement) {
        inputFotoElement.onchange = (e) => {
            if (!e.target.files.length) return;
            currentCropTarget = "PELAUT";
            const reader = new FileReader();
            reader.onload = (ev) => {
                imgCrop.src = ev.target.result;
                modal.style.display = 'flex';
                if (cropper) cropper.destroy();
                cropper = new Cropper(imgCrop, { aspectRatio: 165 / 210, viewMode: 1 });
            };
            reader.readAsDataURL(e.target.files[0]);
        };
    }

    const inputFotoHeliElement = document.getElementById('inputFotoHeli');
    if (inputFotoHeliElement) {
        inputFotoHeliElement.onchange = (e) => {
            if (!e.target.files.length) return;
            currentCropTarget = "PENERBANG";
            const reader = new FileReader();
            reader.onload = (ev) => {
                imgCrop.src = ev.target.result;
                modal.style.display = 'flex';
                if (cropper) cropper.destroy();
                cropper = new Cropper(imgCrop, { aspectRatio: 165 / 210, viewMode: 1 });
            };
            reader.readAsDataURL(e.target.files[0]);
        };
    }

    const btnApplyCrop = document.getElementById('btnApplyCrop');
    if(btnApplyCrop) {
        btnApplyCrop.onclick = async () => {
            if (!cropper) return;

            const originalBtnText = btnApplyCrop.innerHTML;
            btnApplyCrop.innerHTML = '<i class="fas fa-spinner fa-spin"></i> MENGHAPUS BG...'; 
            btnApplyCrop.disabled = true;
            
            const btnCancelCrop = document.getElementById('btnCancelCrop');
            if (btnCancelCrop) btnCancelCrop.disabled = true;

            try {
                
                const canvas = cropper.getCroppedCanvas({ width: 340, height: 440 });
                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
                
                const formData = new FormData();
                formData.append('foto', blob, 'cropped_image.png');

               
                const aiResponse = await fetch('https://afoot-strudel-quake.ngrok-free.dev/proses-pasfoto', {
                    method: 'POST',
                    headers: {
                        'x-api-key': 'lisensi-rahasia-123',
                        'ngrok-skip-browser-warning': 'true'
                    },
                    body: formData
                });

                if (!aiResponse.ok) throw new Error("Server AI Gagal Memproses");

                
                const finalBlob = await aiResponse.blob();
                const objectUrl = URL.createObjectURL(finalBlob);
                
                // 4. Tempelkan ke ID Card yang tepat (Pelaut / Penerbang)
                if (currentCropTarget === "PELAUT") {
    const modeAktif = document.getElementById('inputMode').value;
    if (modeAktif === "SHERIFF") {
        document.getElementById('dispFotoSheriff').src = objectUrl;
    } else {
        document.getElementById('displayFoto').src = objectUrl;
    }
}
                if (currentCropTarget === "PENERBANG") document.getElementById('dispFotoHeli').src = objectUrl;
                
                showToast("Foto berhasil dipotong dengan AI Lokal!");

            } catch (error) {
                console.error("AI Background Removal Error:", error);
                
                
                showAlert("Server AI Offline", "Koneksi ke AI terputus. Menggunakan foto hasil potong manual.", "warning");
                
                const dataUrl = cropper.getCroppedCanvas({ width: 340, height: 440 }).toDataURL('image/png', 1.0);
                if (currentCropTarget === "PELAUT") document.getElementById('displayFoto').src = dataUrl;
                if (currentCropTarget === "PENERBANG") document.getElementById('dispFotoHeli').src = dataUrl;
                
            } finally {
                
                const modal = document.getElementById('cropperModal');
                if(modal) modal.style.display = 'none'; 
                
                btnApplyCrop.innerHTML = originalBtnText;
                btnApplyCrop.disabled = false;
                if (btnCancelCrop) btnCancelCrop.disabled = false;
            }
        };
    }

    const btnCancelCrop = document.getElementById('btnCancelCrop');
    if(btnCancelCrop) {
        btnCancelCrop.onclick = () => { modal.style.display = 'none'; if (cropper) cropper.destroy(); };
    }

    
    let generatedBlob = null;
    let generatedRegNum = "";
    let generatedDiscordPayload = null;
    const btnGenerate = document.getElementById('btnGenerate');
    const btnDiscord = document.getElementById('btnDiscord');

   if(btnGenerate) {
        btnGenerate.onclick = async function() {
           
            const modeAktif = document.getElementById('inputMode').value;
            const inputNamaVal = document.getElementById('inputNama').value.trim();
            const inputDobVal = document.getElementById('inputDob').value.trim();
            const inputPekerjaanVal = document.getElementById('inputPekerjaan').value.trim();
            const inputJabatanVal = document.getElementById('inputJabatan').value.trim();
            const inputImoVal = document.getElementById('inputImo').value.trim();
            const inputNoKapalVal = document.getElementById('inputNoKapal').value.trim();
            const inputTelpVal = document.getElementById('inputNoTelp').value.trim();
            const inputExpiredVal = document.getElementById('inputExpired').value.trim(); 
            
            
            if (modeAktif === "SHERIFF") {
                
                if (!inputNamaVal || !inputDobVal || !inputPekerjaanVal || !inputJabatanVal || !inputNoKapalVal || !inputTelpVal || !inputExpiredVal) { 
                    showAlert("Data Kurang Lengkap", "Silakan lengkapi seluruh kolom formulir (Nama, Institusi, DOB, Rating, Callsign, No.Telp, & Masa Berlaku).", "warning"); 
                    return; 
                }
            } else {
                
                if (!inputNamaVal || !inputDobVal || !inputPekerjaanVal || !inputJabatanVal || !inputImoVal || !inputNoKapalVal || !inputTelpVal || !inputExpiredVal) { 
                    showAlert("Data Kurang Lengkap", "Silakan lengkapi seluruh kolom formulir data pelaut sipil.", "warning"); 
                    return; 
                }
            }

            btnGenerate.innerHTML = '<i class="fas fa-cog fa-spin"></i> MERENDER DOKUMEN...'; 
            btnGenerate.disabled = true;
            
            Swal.fire({
                title: 'Membangun Lisensi...',
                html: 'Sistem sedang memproses dokumen dan enkripsi data, mohon tunggu.',
                allowOutsideClick: false,
                didOpen: () => { Swal.showLoading(); },
                customClass: { popup: 'swal-dark-popup', title: 'swal-dark-title' }
            });

            try {
                
                let reg = "";
                let safeReg = ""; 
                if (modeAktif === "SHERIFF") {
                    reg = document.getElementById('dispRegSheriff').innerText;
                    safeReg = reg.replace(/\//g, '_'); 
                } else {
                    reg = document.getElementById('displayRegistrasi').innerText;
                    safeReg = reg;
                }
                const namaVal = document.getElementById('inputNama').value.toUpperCase();
                
                
                if (modeAktif !== "SHERIFF") {
                    const qrContainer = document.getElementById('qrCodeContainer');
                    if (qrContainer) {
                        qrContainer.innerHTML = ""; 
                        const domainWebsite = "https://administrasi-icarus.vercel.app/"; 
                        const qrText = `${domainWebsite}/verify.html?id=${reg}`;
                        new QRCode(qrContainer, {
                            text: qrText, width: 80, height: 80,
                            colorDark : "#000000", colorLight : "#ffffff",
                            correctLevel : QRCode.CorrectLevel.L
                        });
                    }
                }

                await document.fonts.ready;
                
               
                const elementTarget = (modeAktif === "SHERIFF") ? document.getElementById('kartuSheriff') : document.getElementById('kartuLicensi');

                const dataUrl = await htmlToImage.toPng(elementTarget, { 
                    pixelRatio: 2, 
                    backgroundColor: (modeAktif === "SHERIFF") ? '#ffffff' : '#000000',
                    useCORS: true
                });

                const link = document.createElement('a');
                link.download = `LISENSI_${safeReg}.png`; 
                link.href = dataUrl; 
                link.click();

               
                const telpVal = document.getElementById('inputNoTelp').value || "-";
                const dobVal = document.getElementById('inputDob').value || "-";
                const unitVal = document.getElementById('displayUnit').innerText;
                const issueVal = document.getElementById('displayIssueDate').innerText;
                const officerVal = document.getElementById('inputOfficer').value;

                const licenseData = {
                    nama: namaVal, gender: document.getElementById('inputGender').value,
                    pekerjaan: document.getElementById('inputPekerjaan').value,
                    dob: dobVal, imo: inputImoVal, jabatan: document.getElementById('inputJabatan').value,
                    noKapal: inputNoKapalVal, noTelp: telpVal, expired: inputExpiredVal,
                    issueDate: issueVal, petugas: officerVal, mode: modeAktif, status: "AKTIF" 
                };

                
                const updateFirebase = database.ref('licenses/' + safeReg).set(licenseData);
                
                let counterUpdate = Promise.resolve();
                if (reg.startsWith("PL-")) {
                    const num = parseInt(reg.replace("PL-", ""));
                    if (num > currentLastRegNum) { 
                        counterUpdate = database.ref('last_pl_number').set(num); 
                    }
                }
                
                const fetchBlob = fetch(dataUrl).then(res => res.blob());
                const [_, __, resultBlob] = await Promise.all([updateFirebase, counterUpdate, fetchBlob]);
                
                generatedBlob = resultBlob;
                generatedRegNum = reg;

                
                let discordDescription = "";
                let titleEmoji = "";
                let embedColor = 3066993; 

                if (modeAktif === "BARU") {
                    discordDescription = "✅ **Penerbitan Lisensi Baru**"; titleEmoji = "🚢"; embedColor = 3066993; 
                } else if (modeAktif === "PERPANJANG") {
                    discordDescription = "🔄 **Perpanjangan Lisensi**"; titleEmoji = "🔄"; embedColor = 15105570; 
                } else if (modeAktif === "SHERIFF") {
                    discordDescription = "⭐ **Penerbitan Lisensi Sheriff Roxwood**"; titleEmoji = "⭐"; embedColor = 15548997; 
                }

                generatedDiscordPayload = {
                    embeds: [{
                        title: `${titleEmoji} LISENSI ${modeAktif} - ${reg}`,
                        color: embedColor,
                        description: discordDescription + " telah berhasil diproses.",
                        fields: [
                            { name: "👤 Nama Lengkap", value: namaVal, inline: true },
                            { name: "📞 No. Telepon", value: telpVal, inline: true },
                            { name: "🏢 Afiliasi", value: unitVal, inline: false },
                            { name: "⏳ Berlaku Hingga", value: inputExpiredVal.toUpperCase(), inline: true },
                            { name: "👮 Petugas", value: officerVal, inline: true }
                        ],
                        footer: { text: "Icarus x Pegasus System" },
                        timestamp: new Date().toISOString()
                    }]
                };

                insertAuditLog(`GENERATE KARTU - ${modeAktif}`, `Menerbitkan dokumen fisik lisensi untuk [${reg}] a.n. ${namaVal}.`);

                Swal.close();
                showToast("Dokumen Tersimpan di Perangkat!");

                btnGenerate.innerHTML = "<i class='fas fa-check'></i> BERHASIL DISIMPAN";
                btnDiscord.disabled = false;
                btnDiscord.style.opacity = "1";

            } catch (e) { 
                console.error("Render Error:", e);
                Swal.close(); 
                showAlert("Kesalahan Render", "Sistem gagal membangun gambar kartu lisensi.\nDetail: " + e.message, "error"); 
                btnGenerate.innerHTML = "<i class='fas fa-cogs'></i> PROSES SISTEM"; 
                btnGenerate.disabled = false; 
            }
        };
    }

    if(btnDiscord) {
        btnDiscord.onclick = async function() {
            btnDiscord.innerHTML = '<i class="fas fa-spinner fa-spin"></i> MENGIRIM...';
            const formData = new FormData();
            formData.append("payload_json", JSON.stringify(generatedDiscordPayload));
            formData.append("file", generatedBlob, `${generatedRegNum}.png`);

            
            const modeAktif = document.getElementById('inputMode').value;
            let TARGET_WEBHOOK = DISCORD_WEBHOOK_URL;
            
            if (modeAktif === "SHERIFF") {
                
                TARGET_WEBHOOK = "https://discord.com/api/webhooks/1508744779440066580/uMy3F6GbDzM5nQoV1MM5uYc2cEw_M6xJSrrWVqZxJjFYaYniOSPB-rsCOSiCtjNnlmDJ"; 
            }
            

            try {
                
                const response = await fetch(TARGET_WEBHOOK, { method: "POST", body: formData });
                
                if (response.ok) { 
                    insertAuditLog("KIRIM DISCORD", `Mengirim rekapan penerbitan lisensi [${generatedRegNum}] ke Server Indopride.`);
                    await showAlert("Terkirim", "Data Lisensi Berhasil Masuk ke Discord Server!", "success");
                    location.reload();
                } else {
                    const errorText = await response.text();
                    console.error("Discord menolak payload:", errorText);
                    showAlert("Ditolak Server", "Format pesan tidak sesuai pedoman Discord.", "error");
                }
            } catch (error) { 
                showAlert("Gagal", "Kesalahan pengiriman jaringan ke Discord.", "error"); 
                btnDiscord.innerHTML = '<i class="fab fa-discord"></i> KIRIM DISCORD'; 
            }
        };
    }

  
    let generatedBlobHeli = null;
    let generatedRegNumHeli = "";
    let generatedDiscordPayloadHeli = null;

    const btnGenerateHeli = document.getElementById('btnGenerateHeli');
    const btnDiscordHeli = document.getElementById('btnDiscordHeli');

    if (btnGenerateHeli) {
        btnGenerateHeli.onclick = async () => {
           
            const regVal = document.getElementById('inputRegHeli').value.trim() || "SR/IC-0000";
            const namaVal = document.getElementById('inputNamaHeli').value.trim().toUpperCase();
            const instVal = document.getElementById('inputInstHeli').value.trim();
            const dobVal = document.getElementById('inputDobHeli').value.trim();
            const ratingVal = document.getElementById('inputRatingHeli').value.trim();
            const callsignBVal = document.getElementById('inputCallsignHeliB').value.trim();
            const expiredVal = document.getElementById('inputExpiredHeli').value.trim();
            
           
            if (!namaVal || !instVal || !dobVal || !ratingVal || !callsignBVal || !expiredVal) {
                showAlert("Data Kurang Lengkap", "Silakan lengkapi seluruh form (Nama, Institusi, DOB, Rating, Angka Callsign, & Masa Berlaku).", "warning"); 
                return;
            }

            btnGenerateHeli.innerHTML = '<i class="fas fa-spinner fa-spin"></i> MEMPROSES...';
            btnGenerateHeli.disabled = true;
            
            Swal.fire({
                title: 'Membangun Lisensi Penerbang...',
                html: 'Sistem sedang mencetak dokumen resmi, mohon tunggu.',
                allowOutsideClick: false,
                didOpen: () => { Swal.showLoading(); },
                customClass: { popup: 'swal-dark-popup', title: 'swal-dark-title' }
            });

            try {
                await document.fonts.ready;
                const dataUrl = await htmlToImage.toPng(document.getElementById('kartuPenerbang'), { 
                    pixelRatio: 2, backgroundColor: '#ffffff' 
                });
                
                const safeFileName = regVal.replace(/\//g, '_');

                const link = document.createElement('a');
                link.download = `LISENSI_PENERBANG_${safeFileName}.png`;
                link.href = dataUrl;
                link.click();

                const licenseDataHeli = {
                    nama: namaVal,
                    inst: document.getElementById('inputInstHeli').value || "-",
                    dob: document.getElementById('inputDobHeli').value || "-",
                    rating: document.getElementById('inputRatingHeli').value || "-",
                    callsign: document.getElementById('dispCallsignHeli').innerText || "-",
                    auth: document.getElementById('inputAuthHeli').value || "-",
                    gender: document.getElementById('inputGenderHeli').value || "-",
                    expired: expiredVal,
                    petugas: document.getElementById('inputOfficer').value || "-",
                    status: "AKTIF",
                    tipe: "PENERBANG"
                };

                const updateFirebase = database.ref('licenses_heli/' + safeFileName).set(licenseDataHeli);
                
                let counterUpdate = Promise.resolve();
                if (regVal.startsWith("SR/IC-")) {
                    const numStr = regVal.split("-")[1];
                    const num = parseInt(numStr);
                    if (!isNaN(num) && num > currentLastHeliNum) { 
                        counterUpdate = database.ref('last_heli_number').set(num); 
                    }
                }

                const fetchBlob = fetch(dataUrl).then(res => res.blob());
                const [_, __, resultBlob] = await Promise.all([updateFirebase, counterUpdate, fetchBlob]);
                
                generatedBlobHeli = resultBlob;
                generatedRegNumHeli = safeFileName;

                generatedDiscordPayloadHeli = {
                    embeds: [{
                        title: `🚁 LISENSI PENERBANG - ${regVal}`,
                        color: 15105570, 
                        description: "✅ **Penerbitan Lisensi Penerbang** telah berhasil diproses.",
                        fields: [
                            { name: "👤 Nama Lengkap", value: namaVal, inline: true },
                            { name: "🪪 Callsign", value: licenseDataHeli.callsign, inline: true },
                            { name: "🚁 Rating", value: licenseDataHeli.rating, inline: true },
                            { name: "⏳ Berlaku Hingga", value: expiredVal.toUpperCase(), inline: true },
                            { name: "👮 Petugas", value: licenseDataHeli.petugas, inline: true }
                        ],
                        footer: { text: "Icarus x Pegasus System" },
                        timestamp: new Date().toISOString()
                    }]
                };

                insertAuditLog("GENERATE KARTU", `Menerbitkan lisensi penerbang untuk [${regVal}] a.n. ${namaVal}.`);

                Swal.close();
                showToast("Kartu Penerbang Berhasil Diunduh!");
                btnGenerateHeli.innerHTML = '<i class="fas fa-check"></i> BERHASIL DISIMPAN';
                
                if (btnDiscordHeli) {
                    btnDiscordHeli.disabled = false;
                    btnDiscordHeli.style.opacity = "1";
                }

            } catch (e) {
                console.error(e);
                Swal.close();
                showAlert("Error", "Gagal merender gambar kartu penerbang.", "error");
                btnGenerateHeli.innerHTML = '<i class="fas fa-file-download"></i> CETAK & SIMPAN KARTU';
                btnGenerateHeli.disabled = false;
            }
        };
    }

    if (btnDiscordHeli) {
        btnDiscordHeli.onclick = async function() {
            btnDiscordHeli.innerHTML = '<i class="fas fa-spinner fa-spin"></i> MENGIRIM...';
            const formData = new FormData();
            formData.append("payload_json", JSON.stringify(generatedDiscordPayloadHeli));
            formData.append("file", generatedBlobHeli, `${generatedRegNumHeli}.png`);
            
            try {
                const response = await fetch(DISCORD_WEBHOOK_URL, { method: "POST", body: formData });
                if (response.ok) { 
                    insertAuditLog("KIRIM DISCORD", `Mengirim rekapan penerbitan lisensi penerbang [${generatedRegNumHeli}].`);
                    await showAlert("Terkirim", "Data Lisensi Penerbang Berhasil Masuk ke Discord Server!", "success");
                    location.reload();
                } else {
                    const errorText = await response.text();
                    console.error("Discord menolak payload:", errorText);
                    showAlert("Ditolak Server", "Format pesan tidak sesuai pedoman Discord.", "error");
                }
            } catch (error) { 
                showAlert("Gagal", "Kesalahan pengiriman jaringan ke Discord.", "error"); 
                btnDiscordHeli.innerHTML = '<i class="fab fa-discord"></i> KIRIM KE DISCORD'; 
            }
        };
    }

   
    const elTotal = document.getElementById('statTotal');
    const elAktif = document.getElementById('statAktif');
    const elCabut = document.getElementById('statCabut');

    let statsPelaut = { total: 0, aktif: 0, cabut: 0, baru: 0, perpanjang: 0, revoked: 0 };
    let statsHeli = { total: 0, aktif: 0, cabut: 0, baru: 0, perpanjang: 0, revoked: 0 };
    let statistikChartInstance = null;

    function renderChart(pelautData, heliData) {
        const chartCanvas = document.getElementById('statistikChart');
        if (!chartCanvas) return;
        const ctx = chartCanvas.getContext('2d');
        if (statistikChartInstance) { statistikChartInstance.destroy(); }
        
        statistikChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['LISENSI BARU', 'DIPERPANJANG', 'DICABUT (REVOKED)'],
                datasets: [
                    {
                        label: 'PELAUT SIPIL',
                        data: pelautData,
                        backgroundColor: 'rgba(59, 130, 246, 0.4)',
                        borderColor: '#3b82f6',
                        borderWidth: 1, borderRadius: 4
                    },
                    {
                        label: 'PENERBANG UDARA',
                        data: heliData,
                        backgroundColor: 'rgba(16, 185, 129, 0.4)',
                        borderColor: '#10b981',
                        borderWidth: 1, borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false, 
                plugins: { 
                    legend: { display: true, labels: { color: '#cbd5e1', font: {size: 10, weight: 'bold'} } } 
                },
                scales: {
                    y: { beginAtZero: true, ticks: { stepSize: 1, color: '#85998a' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    x: { ticks: { color: '#85998a', font: { size: 10, weight: 'bold' } }, grid: { display: false } }
                }
            }
        });
    }

    function updateGlobalStats() {
        if(elTotal) elTotal.innerText = statsPelaut.total + statsHeli.total;
        if(elAktif) elAktif.innerText = statsPelaut.aktif + statsHeli.aktif;
        if(elCabut) elCabut.innerText = statsPelaut.cabut + statsHeli.cabut;
        
        renderChart(
            [statsPelaut.baru, statsPelaut.perpanjang, statsPelaut.revoked],
            [statsHeli.baru, statsHeli.perpanjang, statsHeli.revoked]
        );
    }

    function checkExpired(dateStr) {
        if(!dateStr || dateStr === "-") return false;
        const indexBulan = {"JANUARI":0, "FEBRUARI":1, "MARET":2, "APRIL":3, "MEI":4, "JUNI":5, "JULI":6, "AGUSTUS":7, "SEPTEMBER":8, "OKTOBER":9, "NOVEMBER":10, "DESEMBER":11};
        const parts = dateStr.toUpperCase().split(" ");
        if(parts.length === 3) {
            const d = parseInt(parts[0]);
            const m = indexBulan[parts[1]];
            const y = parseInt(parts[2]);
            const expDate = new Date(y, m, d);
            
            const today = new Date();
            today.setHours(0,0,0,0);
            return expDate < today; 
        }
        return false;
    }

   
    let currentPage = 1;
    const itemsPerPage = 10;
    
    const tableBody = document.getElementById('dbTableBody');
    const paginationDiv = document.getElementById('dbPagination');
    const searchInput = document.getElementById('inputSearchDB');
    const btnExportCSV = document.getElementById('btnExportCSV');
    
    let allLicensesArray = [];
    let filteredArray = [];

    database.ref('licenses').on('value', (snapshot) => {
        if (!tableBody) return; 
        
        allLicensesArray = [];
        statsPelaut = { total: 0, aktif: 0, cabut: 0, baru: 0, perpanjang: 0, revoked: 0 };

        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                const regNum = childSnapshot.key;
                let currentStatus = data.status || "AKTIF";
                let modeTipe = data.mode || "BARU"; 
                
                allLicensesArray.push({ regNum, ...data, currentStatus });
                
                statsPelaut.total++;
                if (currentStatus === "AKTIF") { 
                    statsPelaut.aktif++; 
                    if(modeTipe === "BARU") statsPelaut.baru++; else statsPelaut.perpanjang++;
                } else { 
                    statsPelaut.cabut++; statsPelaut.revoked++; 
                }
            });
            
            allLicensesArray.sort((a, b) => {
                let numA = parseInt(a.regNum.replace('PL-', '')) || 0;
                let numB = parseInt(b.regNum.replace('PL-', '')) || 0;
                return numB - numA; 
            });
            filteredArray = [...allLicensesArray]; 
        } else {
            tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: #64748b;">Belum ada data lisensi tercatat di sistem.</td></tr>';
            if(paginationDiv) paginationDiv.innerHTML = "";
        }
        
        updateGlobalStats();
        currentPage = 1; 
        renderDatabaseTable();
        renderPaginationButtons();
    });

    function renderDatabaseTable() {
        tableBody.innerHTML = '';
        if (filteredArray.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: #ef4444;"><i class="fas fa-exclamation-triangle"></i> Data tidak ditemukan.</td></tr>';
            return;
        }

        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const paginatedItems = filteredArray.slice(startIdx, endIdx);

        paginatedItems.forEach(data => {
            const tr = document.createElement('tr');
            
            let isExp = checkExpired(data.expired); 
            let statusBadge = "";
            
            if (data.currentStatus !== "AKTIF") {
                statusBadge = `<span style="background: rgba(239, 68, 68, 0.2); color: #ef4444; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 9px;">REVOKED</span>`;
            } else if (isExp) {
                statusBadge = `<span style="background: rgba(245, 158, 11, 0.2); color: #f59e0b; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 9px;">EXPIRED</span>`;
            } else {
                statusBadge = `<span style="background: rgba(34, 197, 94, 0.2); color: #22c55e; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 9px;">AKTIF</span>`;
            }

            tr.innerHTML = `
                <td style="color: #fbbf24; font-weight: bold;">${data.regNum}</td>
                <td style="font-weight: bold; color: #fff;">${data.nama}</td>
                <td>${data.jabatan || "-"}</td>
                <td><strong style="color: #3b82f6;">${data.imo || "-"}</strong></td>
                <td>${data.expired || "-"}</td>
                <td>${statusBadge}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    function renderPaginationButtons() {
        if(!paginationDiv) return;
        paginationDiv.innerHTML = '';
        const totalPages = Math.ceil(filteredArray.length / itemsPerPage);
        
        if (totalPages <= 1) return; 

        const btnPrev = document.createElement('button');
        btnPrev.className = 'page-btn'; btnPrev.innerHTML = '<i class="fas fa-chevron-left"></i>';
        btnPrev.disabled = currentPage === 1;
        btnPrev.onclick = () => { currentPage--; renderDatabaseTable(); renderPaginationButtons(); };
        paginationDiv.appendChild(btnPrev);

        const spanInfo = document.createElement('span');
        spanInfo.style.color = "#94a3b8"; spanInfo.style.fontSize = "11px"; spanInfo.style.fontWeight = "bold"; spanInfo.style.margin = "0 10px";
        spanInfo.innerText = `${currentPage} / ${totalPages}`;
        paginationDiv.appendChild(spanInfo);

        const btnNext = document.createElement('button');
        btnNext.className = 'page-btn'; btnNext.innerHTML = '<i class="fas fa-chevron-right"></i>';
        btnNext.disabled = currentPage === totalPages;
        btnNext.onclick = () => { currentPage++; renderDatabaseTable(); renderPaginationButtons(); };
        paginationDiv.appendChild(btnNext);
    }

    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filteredArray = allLicensesArray.filter(lic => 
                (lic.nama && lic.nama.toLowerCase().includes(query)) || 
                (lic.regNum && lic.regNum.toLowerCase().includes(query))
            );
            currentPage = 1;
            renderDatabaseTable();
            renderPaginationButtons();
        });
    }

    if(btnExportCSV) {
        btnExportCSV.onclick = () => {
            if(allLicensesArray.length === 0) {
                showAlert("Kosong", "Tidak ada data untuk diekspor ke Excel.", "info"); return;
            }
            
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "NO. REG,NAMA LENGKAP,JENIS KELAMIN,PEKERJAAN,JABATAN,IMO RATING,NO KAPAL,NO TELP,MASA BERLAKU,STATUS,PETUGAS,MODE\n";
            
            allLicensesArray.forEach(lic => {
                let isExp = checkExpired(lic.expired);
                let finalStatus = lic.currentStatus;
                if(finalStatus === "AKTIF" && isExp) finalStatus = "EXPIRED";
                
                let row = [
                    lic.regNum, `"${lic.nama || "-"}"`, lic.gender || "-", `"${lic.pekerjaan || "-"}"`,
                    `"${lic.jabatan || "-"}"`, lic.imo || "-", `"${lic.noKapal || "-"}"`, `"${lic.noTelp || "-"}"`,
                    lic.expired || "-", finalStatus, `"${lic.petugas || "-"}"`, lic.mode || "-"
                ].join(",");
                
                csvContent += row + "\n";
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `Laporan_Lisensi_Icarus_${new Date().toISOString().slice(0,10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            insertAuditLog("EKSPOR DATA", "Pimpinan mengunduh rekapan database (.CSV)");
            showToast("Berhasil diunduh!");
        };
    }

    
    let currentPageHeli = 1;
    const tableBodyHeli = document.getElementById('dbTableBodyHeli');
    const paginationDivHeli = document.getElementById('dbPaginationHeli');
    const searchInputHeli = document.getElementById('inputSearchDBHeli');
    const btnExportCSVHeli = document.getElementById('btnExportCSVHeli');
    
    let allHeliLicensesArray = [];
    let filteredHeliArray = [];

    database.ref('licenses_heli').on('value', (snapshot) => {
        if (!tableBodyHeli) return; 
        allHeliLicensesArray = [];
        statsHeli = { total: 0, aktif: 0, cabut: 0, baru: 0, perpanjang: 0, revoked: 0 };

        if(snapshot.exists()) {
            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                const regNum = childSnapshot.key;
                let currentStatus = data.status || "AKTIF";
                
                allHeliLicensesArray.push({ regNum, ...data, currentStatus });
                
                statsHeli.total++;
                if (currentStatus === "AKTIF") { 
                    statsHeli.aktif++; 
                    statsHeli.baru++; 
                } else { 
                    statsHeli.cabut++; statsHeli.revoked++; 
                }
            });
            
            allHeliLicensesArray.sort((a, b) => {
                let numA = parseInt(a.regNum.replace('SR/IC-', '')) || 0;
                let numB = parseInt(b.regNum.replace('SR/IC-', '')) || 0;
                return numB - numA; 
            });
            filteredHeliArray = [...allHeliLicensesArray];
        } else {
            tableBodyHeli.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: #64748b;">Belum ada data lisensi penerbang tercatat di sistem.</td></tr>';
            if(paginationDivHeli) paginationDivHeli.innerHTML = "";
        }
        
        updateGlobalStats();
        currentPageHeli = 1;
        renderDatabaseTableHeli();
        renderPaginationButtonsHeli();
    });

    function renderDatabaseTableHeli() {
        if(!tableBodyHeli) return;
        tableBodyHeli.innerHTML = '';
        if (filteredHeliArray.length === 0) {
            tableBodyHeli.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: #ef4444;"><i class="fas fa-exclamation-triangle"></i> Data tidak ditemukan.</td></tr>';
            return;
        }

        const startIdx = (currentPageHeli - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const paginatedItems = filteredHeliArray.slice(startIdx, endIdx);

        paginatedItems.forEach(data => {
            const tr = document.createElement('tr');
            
            let isExp = checkExpired(data.expired); 
            let statusBadge = "";
            
            if (data.currentStatus !== "AKTIF") {
                statusBadge = `<span style="background: rgba(239, 68, 68, 0.2); color: #ef4444; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 9px;">REVOKED</span>`;
            } else if (isExp) {
                statusBadge = `<span style="background: rgba(245, 158, 11, 0.2); color: #f59e0b; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 9px;">EXPIRED</span>`;
            } else {
                statusBadge = `<span style="background: rgba(34, 197, 94, 0.2); color: #22c55e; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 9px;">AKTIF</span>`;
            }

            tr.innerHTML = `
                <td style="color: #fbbf24; font-weight: bold;">${data.regNum.replace('_', '/')}</td>
                <td style="font-weight: bold; color: #fff;">${data.nama}</td>
                <td><span style="color: #10b981; font-weight:bold;">${data.callsign}</span><br><span style="font-size:10px; color:#94a3b8;">${data.rating}</span></td>
                <td>${data.auth}</td>
                <td>${data.expired || "-"}</td>
                <td>${statusBadge}</td>
            `;
            tableBodyHeli.appendChild(tr);
        });
    }

    function renderPaginationButtonsHeli() {
        if(!paginationDivHeli) return;
        paginationDivHeli.innerHTML = '';
        const totalPages = Math.ceil(filteredHeliArray.length / itemsPerPage);
        
        if (totalPages <= 1) return; 

        const btnPrev = document.createElement('button');
        btnPrev.className = 'page-btn'; btnPrev.innerHTML = '<i class="fas fa-chevron-left"></i>';
        btnPrev.disabled = currentPageHeli === 1;
        btnPrev.onclick = () => { currentPageHeli--; renderDatabaseTableHeli(); renderPaginationButtonsHeli(); };
        paginationDivHeli.appendChild(btnPrev);

        const spanInfo = document.createElement('span');
        spanInfo.style.color = "#94a3b8"; spanInfo.style.fontSize = "11px"; spanInfo.style.fontWeight = "bold"; spanInfo.style.margin = "0 10px";
        spanInfo.innerText = `${currentPageHeli} / ${totalPages}`;
        paginationDivHeli.appendChild(spanInfo);

        const btnNext = document.createElement('button');
        btnNext.className = 'page-btn'; btnNext.innerHTML = '<i class="fas fa-chevron-right"></i>';
        btnNext.disabled = currentPageHeli === totalPages;
        btnNext.onclick = () => { currentPageHeli++; renderDatabaseTableHeli(); renderPaginationButtonsHeli(); };
        paginationDivHeli.appendChild(btnNext);
    }

    if(searchInputHeli) {
        searchInputHeli.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filteredHeliArray = allHeliLicensesArray.filter(lic => 
                (lic.nama && lic.nama.toLowerCase().includes(query)) || 
                (lic.regNum && lic.regNum.toLowerCase().includes(query)) ||
                (lic.callsign && lic.callsign.toLowerCase().includes(query))
            );
            currentPageHeli = 1;
            renderDatabaseTableHeli();
            renderPaginationButtonsHeli();
        });
    }

    if(btnExportCSVHeli) {
        btnExportCSVHeli.onclick = () => {
            if(allHeliLicensesArray.length === 0) {
                showAlert("Kosong", "Tidak ada data untuk diekspor ke Excel.", "info"); return;
            }
            
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "NO. LISENSI,NAMA LENGKAP,JENIS KELAMIN,INSTITUTION,DATE OF BIRTH,RATING,CALLSIGN,ISSUING AUTHORITY,MASA BERLAKU,STATUS,PETUGAS\n";
            
            allHeliLicensesArray.forEach(lic => {
                let isExp = checkExpired(lic.expired);
                let finalStatus = lic.currentStatus;
                if(finalStatus === "AKTIF" && isExp) finalStatus = "EXPIRED";
                
                let row = [
                    lic.regNum.replace('_', '/'), `"${lic.nama || "-"}"`, lic.gender || "-", `"${lic.inst || "-"}"`,
                    `"${lic.dob || "-"}"`, `"${lic.rating || "-"}"`, `"${lic.callsign || "-"}"`, `"${lic.auth || "-"}"`,
                    lic.expired || "-", finalStatus, `"${lic.petugas || "-"}"`
                ].join(",");
                
                csvContent += row + "\n";
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `Laporan_Penerbang_Icarus_${new Date().toISOString().slice(0,10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            insertAuditLog("EKSPOR DATA", "Pimpinan mengunduh rekapan database Penerbang (.CSV)");
            showToast("Berhasil diunduh!");
        };
    }

    
    const auditTableBody = document.getElementById('auditTableBody');
    database.ref('audit_logs').orderByChild('waktu').limitToLast(50).on('value', (snapshot) => {
        if (!auditTableBody) return;
        
        auditTableBody.innerHTML = '';
        const logsArray = [];

        if (snapshot.exists()) {
            snapshot.forEach((child) => { logsArray.push({ key: child.key, ...child.val() }); });
            logsArray.reverse();

            logsArray.forEach(log => {
                const tr = document.createElement('tr');
                const dt = new Date(log.waktu);
                const strDate = `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()} | ${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`;
                
                let colorTag = "#3b82f6"; 
                if(log.tindakan.includes("GENERATE")) colorTag = "#22c55e"; 
                if(log.tindakan.includes("LOGOUT") || log.tindakan.includes("CABUT")) colorTag = "#ef4444"; 
                if(log.tindakan.includes("EKSPOR")) colorTag = "#eab308";
                
                tr.innerHTML = `
                    <td style="color: #94a3b8; font-size: 11px;">${strDate}</td>
                    <td style="color: #fbbf24; font-weight: bold;">${log.petugas}</td>
                    <td><span style="background: ${colorTag}20; color: ${colorTag}; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 10px;">${log.tindakan}</span></td>
                    <td style="color: #cbd5e1; font-size: 11px;">${log.keterangan}</td>
                `;
                auditTableBody.appendChild(tr);
            });
        } else {
            auditTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #64748b;">Belum ada rekam jejak aktivitas dalam sistem.</td></tr>';
        }
    });

    
    document.getElementById('btnUpdatePass').onclick = () => {
        const newPassword = document.getElementById('inputNewPassword').value;
        const user = auth.currentUser;
        if (newPassword.length < 6) { showAlert("Peringatan", "Password minimal harus 6 karakter!", "warning"); return; }
        if (user) {
            user.updatePassword(newPassword).then(() => {
                showAlert("Berhasil", "Password Berhasil Diperbarui!", "success");
                document.getElementById('inputNewPassword').value = "";
                insertAuditLog("PENGATURAN AKUN", "Melakukan update password akun portal.");
            }).catch((error) => {
                showAlert("Kesalahan", error.message + "\nHarap Logout dan Login kembali untuk alasan keamanan.", "error");
            });
        }
    };

   
    window.togglePelanggar = function(radio) {
        const field = document.getElementById('fieldPelanggar');
        if(radio.value === 'Penilangan') {
            field.style.display = 'block';
        } else {
            field.style.display = 'none';
            document.getElementById('giatNamaPelanggar').value = ''; 
        }
    };


    const btnKirimGiat = document.getElementById('btnKirimGiat');
    if(btnKirimGiat) {
        btnKirimGiat.onclick = async () => {
            const jenis = document.querySelector('input[name="jenis_giat"]:checked').value;
            const namaPetugas = document.getElementById('giatNamaPetugas').value.trim();
            
            // Mengambil input dari form dropdown baru
            const pangkat1 = document.getElementById('giatPangkat1').value;
            const pangkat2 = document.getElementById('giatPangkat2').value;
            const callsign1 = document.getElementById('giatCallsign1').value;
            const callsign2 = document.getElementById('giatCallsign2').value;
            
            const ket = document.getElementById('giatKeterangan').value.trim();
            const lokasi = document.getElementById('giatLokasi').value.trim();
            const namaPelanggar = document.getElementById('giatNamaPelanggar').value.trim();
            
            
            const fotoInput = document.getElementById('giatFoto');
            const fotoFile = fotoInput ? fotoInput.files[0] : null;

            
            if (!namaPetugas || !ket || !lokasi || !fotoFile) {
                showAlert("Data Tidak Lengkap!", "PENGIRIMAN DITOLAK: Harap isi seluruh kolom teks dan lampirkan Bukti Dokumentasi (Foto)!", "warning");
                return; 
            }
            if (jenis === 'Penilangan' && !namaPelanggar) {
                showAlert("Data Tidak Lengkap!", "PENGIRIMAN DITOLAK: Untuk kategori Penilangan, Nama Pelanggar WAJIB diisi!", "warning");
                return; 
            }

            btnKirimGiat.innerHTML = '<i class="fas fa-spinner fa-spin"></i> MENGIRIM...';
            btnKirimGiat.disabled = true;

            
            const fullPangkat = pangkat2 === "-" ? pangkat1 : `${pangkat1} [${pangkat2}]`;
            const fullCallsign = `${callsign1}-${callsign2}`;

            const payload = {
                waktu: new Date().getTime(),
                jenis: jenis,
                petugas: namaPetugas,
                pangkat: fullPangkat,
                callsign: fullCallsign,
                keterangan: ket,
                lokasi: lokasi,
                pelanggar: jenis === 'Penilangan' ? namaPelanggar.toUpperCase() : "-"
            };

            try {
                
                await database.ref('laporan_giat').push(payload);
                
                
                let WEBHOOK_GIAT_URL = "";
                if (jenis === "Udara") WEBHOOK_GIAT_URL = "https://discord.com/api/webhooks/1509408139710042132/GyD7dMeYIv1SECDias_B_zkR6_NQGJtcUHuu6ZXkioD-Lc9wNfMCK3R_3MPxVN8LeoSe";
                else if (jenis === "Laut") WEBHOOK_GIAT_URL = "https://discord.com/api/webhooks/1509407215423852625/iq3RH3KcE1XwVbDkWVEzvkDgo0gpIhhDe6DH9KJQHNFf3KdupyKZ4uxggOuTcW2jyDdl";
                else if (jenis === "Darat") WEBHOOK_GIAT_URL = "https://discord.com/api/webhooks/1509408136463778003/q3y1vecp-FeZT954yXB5dOCiae4X62_pcivEo93oPG2GjbPevCikNwi9WDtOOa7vLKxC";
                else if (jenis === "Lisensi") WEBHOOK_GIAT_URL = "https://discord.com/api/webhooks/1499607345662263426/ub8BLgxS1Vos7CLPxNebpMvYfDPvyud0OxieBmdoQc_3BRdxfCgAskEq1L0dzhBGQdM_";
                else if (jenis === "Penilangan") WEBHOOK_GIAT_URL = "https://discord.com/api/webhooks/1508744779440066580/uMy3F6GbDzM5nQoV1MM5uYc2cEw_M6xJSrrWVqZxJjFYaYniOSPB-rsCOSiCtjNnlmDJ"; 

        
                if (WEBHOOK_GIAT_URL.includes("MASUKKAN_LINK") || WEBHOOK_GIAT_URL === "") {
                    console.log("Webhook belum diisi untuk kategori: " + jenis);
                    showToast("Laporan Tersimpan di Database MDT!");
                    
                    document.getElementById('giatNamaPetugas').value = "";
                    document.getElementById('giatKeterangan').value = "";
                    document.getElementById('giatLokasi').value = "";
                    document.getElementById('giatNamaPelanggar').value = "";
                    if (fotoInput) fotoInput.value = "";
                    
                    insertAuditLog("LAPOR GIAT", `Petugas merekam giat [${jenis}] (Tersimpan Lokal).`);
                    
                    btnKirimGiat.innerHTML = "Kirim Laporan";
                    btnKirimGiat.disabled = false;
                    return; 
                }

                
          
                let discordEmbed = {};

                
                const now = new Date();
                const wibTime = now.toLocaleString('en-GB', {
                    timeZone: 'Asia/Jakarta',
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit', second: '2-digit'
                }).replace(',', ''); 

                if (jenis === 'Penilangan') {
                    discordEmbed = {
                        title: "🚨 LOG PENILANGAN WARGA",
                        color: 15548997, 
                        fields: [
                            { name: "👮 Nama Lengkap", value: namaPetugas.toUpperCase(), inline: true },
                            { name: "🎖️ Pangkat", value: fullPangkat, inline: true },
                            { name: "🪪 Callsign", value: fullCallsign, inline: true },
                            { name: "📍 Lokasi Kejadian", value: lokasi.toUpperCase(), inline: true },
                            { name: "👤 Nama Pelanggar", value: `**${namaPelanggar.toUpperCase()}**`, inline: false },
                            { name: "📋 Detail Keterangan", value: ket.toUpperCase(), inline: false },
                            { name: "⏰ Waktu (WIB)", value: wibTime, inline: false }
                        ],
                        footer: { text: "Vercel Log System" }
                    };
                } else {
                    
                    let emojiJenis = "🚁";
                    let embedColor = 3447003; 

                    if (jenis === "Laut") {
                        emojiJenis = "🚤";
                        embedColor = 15548997;
                    } else if (jenis === "Darat") {
                        emojiJenis = "🚓";
                        embedColor = 9807270; 
                    } else if (jenis === "Lisensi") {
                        emojiJenis = "🪪";
                        embedColor = 15105570; 
                    }

                    discordEmbed = {
                        title: "📢 LAPORAN KEAKTIFAN BARU",
                        color: embedColor,
                        fields: [
                            { name: "👤 Nama", value: namaPetugas.toUpperCase(), inline: true },
                            { name: "🎖️ Pangkat", value: fullPangkat, inline: true },
                            { name: "📡 Callsign", value: fullCallsign, inline: true },
                            { name: `${emojiJenis} Jenis`, value: jenis, inline: true },
                            { name: "📍 Lokasi", value: lokasi.toUpperCase(), inline: true },
                            { name: "📝 Keterangan", value: ket.toUpperCase(), inline: false },
                            { name: "⏰ Waktu (WIB)", value: wibTime, inline: false }
                        ],
                        footer: { text: "Vercel Log System" }
                    };
                }

               
                const formData = new FormData();
                formData.append("payload_json", JSON.stringify({ embeds: [discordEmbed] }));
                
               
                if (fotoFile) {
                    if (fotoFile.size > 8 * 1024 * 1024) {
                        showAlert("Ukuran Foto Terlalu Besar", "Limit maksimal pengiriman Discord adalah 8MB. Silakan kompres (kecilkan) foto bukti Anda terlebih dahulu.", "warning");
                        btnKirimGiat.innerHTML = "Kirim Laporan";
                        btnKirimGiat.disabled = false;
                        return;
                    }
                    
                    formData.append("file", fotoFile, "bukti_dokumentasi.png");
                }

                
                const response = await fetch(WEBHOOK_GIAT_URL, {
                    method: "POST",
                    body: formData
                });

                if (!response.ok) {
                    throw new Error("Discord menolak payload (Gagal Webhook).");
                }

                showToast("Laporan Tersimpan & Terkirim ke Discord!");
                
                
                document.getElementById('giatNamaPetugas').value = "";
                document.getElementById('giatKeterangan').value = "";
                document.getElementById('giatLokasi').value = "";
                document.getElementById('giatNamaPelanggar').value = "";
                if (fotoInput) fotoInput.value = "";
                
                insertAuditLog("LAPOR GIAT", `Petugas mengirim log keaktifan: ${jenis}`);
            } catch (err) {
                console.error("Giat Error:", err);
                showAlert("Kesalahan Jaringan", "Sistem gagal mengirim data ke Webhook. Cek koneksi Anda.", "error");
            } finally {
                btnKirimGiat.innerHTML = "Kirim Laporan";
                btnKirimGiat.disabled = false;
            }
        };
    }

    const tilangTableBody = document.getElementById('tilangTableBody');
    database.ref('laporan_giat').orderByChild('jenis').equalTo('Penilangan').on('value', (snapshot) => {
        if(!tilangTableBody) return;
        tilangTableBody.innerHTML = '';
        
        if(snapshot.exists()) {
            const tilangArr = [];
            snapshot.forEach(child => { tilangArr.push(child.val()); });
            
            tilangArr.sort((a,b) => b.waktu - a.waktu);

            tilangArr.forEach(data => {
                const tr = document.createElement('tr');
                const dt = new Date(data.waktu);
                const tgl = `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()}`;

              
                const cekLisensiPelaut = allLicensesArray.find(lic => lic.nama && lic.nama.toUpperCase() === data.pelanggar.toUpperCase());
                const cekLisensiPenerbang = allHeliLicensesArray.find(lic => lic.nama && lic.nama.toUpperCase() === data.pelanggar.toUpperCase());
                const cekLisensi = cekLisensiPelaut || cekLisensiPenerbang;
                
                let statusHtml = "";
                if(cekLisensi) {
                    let isExp = checkExpired(cekLisensi.expired); 
                    if(cekLisensi.currentStatus !== 'AKTIF') {
                        statusHtml = `<span style="background: #ef444420; color: #ef4444; padding: 6px 10px; border-radius: 4px; font-weight:bold; font-size:10px;"><i class="fas fa-ban"></i> LISENSI DICABUT (REVOKED)</span>`;
                    } else if (isExp) {
                        statusHtml = `<span style="background: #f59e0b20; color: #f59e0b; padding: 6px 10px; border-radius: 4px; font-weight:bold; font-size:10px;"><i class="fas fa-exclamation-triangle"></i> LISENSI SUDAH EXPIRED</span>`;
                    } else {
                        statusHtml = `<span style="background: #3b82f620; color: #3b82f6; padding: 6px 10px; border-radius: 4px; font-weight:bold; font-size:10px;"><i class="fas fa-check"></i> ADA LISENSI (BOHONG/LUPA BAWA)</span>`;
                    }
                } else {
                    statusHtml = `<span style="background: #ef444420; color: #ef4444; padding: 6px 10px; border-radius: 4px; font-weight:bold; font-size:10px;"><i class="fas fa-times"></i> TIDAK TERDAFTAR DI SISTEM</span>`;
                }

                tr.innerHTML = `
                    <td style="color: #94a3b8; font-size: 11px;">${tgl}</td>
                    <td style="font-weight: 900; color: #fca5a5; font-size: 13px;">${data.pelanggar}</td>
                    <td style="color: #cbd5e1; font-size: 11px;"><b>${data.lokasi}</b><br><span style="color:#94a3b8">${data.keterangan}</span></td>
                    <td style="color: #fbbf24; font-size: 12px; font-weight:bold;">${data.petugas}</td>
                    <td>${statusHtml}</td>
                `;
                tilangTableBody.appendChild(tr);
            });
        } else {
            tilangTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#64748b; padding: 30px;">Belum ada laporan penilangan yang masuk.</td></tr>';
        }
    });

    
    const btnSimpanPlat = document.getElementById('btnSimpanPlat');
    const platTableBody = document.getElementById('platTableBody');

    if (btnSimpanPlat) {
        btnSimpanPlat.onclick = async () => {
            const tailNum = document.getElementById('inputPlatHeli').value.trim().toUpperCase();
            const modelHeli = document.getElementById('inputModelHeli').value;
            const unitHeli = document.getElementById('inputUnitHeli').value;
            const statusHeli = document.getElementById('inputStatusHeli').value;
            const pemilikHeli = document.getElementById('inputPemilikHeli').value.trim() || "-"; 

            if (!tailNum) {
                showAlert("Peringatan", "Nomor Plat / Tail Number wajib diisi!", "warning");
                return;
            }

            btnSimpanPlat.innerHTML = '<i class="fas fa-spinner fa-spin"></i> MENYIMPAN...';
            btnSimpanPlat.disabled = true;

            const payload = {
                model: modelHeli,
                unit: unitHeli,
                status: statusHeli,
                pemilik: pemilikHeli, 
                waktu_update: new Date().getTime(),
                petugas: document.getElementById('inputOfficer').value || "UNKNOWN"
            };

            try {
                await database.ref('armada_heli/' + tailNum).set(payload);
                insertAuditLog("UPDATE ARMADA", `Mendaftarkan/Update Helikopter [${tailNum}] - Pemilik: ${pemilikHeli}`);
                showToast("Data Armada Berhasil Disimpan!");
                
                document.getElementById('inputPlatHeli').value = ""; 
                document.getElementById('inputPemilikHeli').value = ""; 
            } catch (error) {
                showAlert("Error", "Gagal menyimpan data ke server.", "error");
            } finally {
                btnSimpanPlat.innerHTML = '<i class="fas fa-save"></i> SIMPAN DATA ARMADA';
                btnSimpanPlat.disabled = false;
            }
        };
    }

    
    let allArmadaArray = [];
    let filteredArmadaArray = [];
    const inputSearchArmada = document.getElementById('inputSearchArmada');

    function renderArmadaTable() {
        if (!platTableBody) return;
        platTableBody.innerHTML = '';
        
        if (filteredArmadaArray.length === 0) {
            platTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 30px; color: #ef4444;"><i class="fas fa-exclamation-triangle"></i> Data armada tidak ditemukan.</td></tr>';
            return;
        }

        const currentOfficerStatus = document.getElementById('displayUnit').innerText;
        const isPimpinanOtorisasi = currentOfficerStatus.includes("PIMPINAN");

        filteredArmadaArray.forEach(data => {
            const tr = document.createElement('tr');
            
            let statusBadge = "";
            if (data.status === "AKTIF") {
                statusBadge = `<span style="background: #22c55e20; color: #22c55e; padding: 4px 8px; border-radius: 4px; font-weight:bold; font-size:10px;"><i class="fas fa-check"></i> AKTIF</span>`;
            } else if (data.status === "MAINTENANCE") {
                statusBadge = `<span style="background: #eab30820; color: #eab308; padding: 4px 8px; border-radius: 4px; font-weight:bold; font-size:10px;"><i class="fas fa-tools"></i> MAINTENANCE</span>`;
            } else {
                statusBadge = `<span style="background: #ef444420; color: #ef4444; padding: 4px 8px; border-radius: 4px; font-weight:bold; font-size:10px;"><i class="fas fa-ban"></i> GROUNDED</span>`;
            }

            let aksiHtml = isPimpinanOtorisasi ? 
                `<button onclick="hapusArmada('${data.tailNum}')" style="background: transparent; border: 1px solid #ef4444; color: #ef4444; padding: 4px 8px; border-radius: 4px; cursor: pointer; transition: 0.3s; font-size: 10px;">
                    <i class="fas fa-trash"></i> Hapus
                </button>` : 
                `<span style="font-size: 9px; color: #64748b; background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px;"><i class="fas fa-lock"></i> RESTRICTED</span>`;

            tr.innerHTML = `
                <td style="color: #fbbf24; font-weight: 900; font-size: 14px;">${data.tailNum}</td>
                <td style="font-weight: bold; color: #cbd5e1;">${data.model}</td>
                <td style="font-weight: bold; color: #fff;">${data.pemilik || "-"}</td>
                <td style="font-size: 11px; color: #94a3b8;">${data.unit}</td>
                <td>${statusBadge}</td>
                <td>${aksiHtml}</td>
            `;
            platTableBody.appendChild(tr);
        });
    }

    if (platTableBody) {
        database.ref('armada_heli').on('value', (snapshot) => {
            allArmadaArray = [];
            
            if (snapshot.exists()) {
                snapshot.forEach(child => {
                    allArmadaArray.push({ tailNum: child.key, ...child.val() });
                });

                allArmadaArray.sort((a, b) => b.waktu_update - a.waktu_update);
            }
            
            const query = inputSearchArmada ? inputSearchArmada.value.toLowerCase() : '';
            filteredArmadaArray = allArmadaArray.filter(armada => 
                (armada.tailNum && armada.tailNum.toLowerCase().includes(query)) ||
                (armada.pemilik && armada.pemilik.toLowerCase().includes(query)) ||
                (armada.model && armada.model.toLowerCase().includes(query))
            );

            renderArmadaTable();
        });
    }

    if (inputSearchArmada) {
        inputSearchArmada.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filteredArmadaArray = allArmadaArray.filter(armada => 
                (armada.tailNum && armada.tailNum.toLowerCase().includes(query)) ||
                (armada.pemilik && armada.pemilik.toLowerCase().includes(query)) ||
                (armada.model && armada.model.toLowerCase().includes(query))
            );
            renderArmadaTable();
        });
    }

    
    window.hapusArmada = function(tailNum) {
        const currentOfficerStatus = document.getElementById('displayUnit').innerText;
        if (!currentOfficerStatus.includes("PIMPINAN")) {
            showAlert("Akses Ditolak", "Hanya Admin dan Pimpinan yang memiliki otorisasi untuk menghapus data armada udara.", "error");
            return;
        }

        Swal.fire({
            title: 'Hapus Armada?',
            text: `Anda yakin ingin menghapus data helikopter ${tailNum} dari sistem?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#334155',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            customClass: { popup: 'swal-dark-popup', title: 'swal-dark-title' }
        }).then((result) => {
            if (result.isConfirmed) {
                database.ref('armada_heli/' + tailNum).remove()
                    .then(() => {
                        insertAuditLog("HAPUS ARMADA", `Pimpinan menghapus data helikopter [${tailNum}] dari sistem.`);
                        showToast("Armada dihapus!");
                    })
                    .catch(() => showAlert("Error", "Gagal menghapus data dari server.", "error"));
            }
        });
    };
    
    let currentGiatPage = 1;
    const giatItemsPerPage = 10;
    
    const giatTableBody = document.getElementById('giatTableBody');
    const giatPaginationDiv = document.getElementById('giatPagination');
    const inputSearchGiat = document.getElementById('inputSearchGiat');
    const btnExportCSVGiat = document.getElementById('btnExportCSVGiat');
    
    let allGiatArray = [];
    let filteredGiatArray = [];

    if (giatTableBody) {
        
        database.ref('laporan_giat').on('value', (snapshot) => {
            allGiatArray = [];
            
            if (snapshot.exists()) {
                snapshot.forEach(child => {
                    allGiatArray.push({ key: child.key, ...child.val() });
                });
                
                allGiatArray.sort((a, b) => b.waktu - a.waktu);
            }
            
           
            const query = inputSearchGiat ? inputSearchGiat.value.toLowerCase() : '';
            filteredGiatArray = allGiatArray.filter(giat => 
                (giat.petugas && giat.petugas.toLowerCase().includes(query)) || 
                (giat.jenis && giat.jenis.toLowerCase().includes(query)) ||
                (giat.keterangan && giat.keterangan.toLowerCase().includes(query)) ||
                (giat.lokasi && giat.lokasi.toLowerCase().includes(query)) ||
                (giat.callsign && giat.callsign.toLowerCase().includes(query))
            );

            currentGiatPage = 1;
            renderGiatTable();
            renderGiatPagination();
        });
    }

    function renderGiatTable() {
        if (!giatTableBody) return;
        giatTableBody.innerHTML = '';
        
        if (filteredGiatArray.length === 0) {
            giatTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:30px; color:#ef4444;"><i class="fas fa-exclamation-triangle"></i> Belum ada data laporan giat di sistem.</td></tr>';
            return;
        }

        const startIdx = (currentGiatPage - 1) * giatItemsPerPage;
        const endIdx = startIdx + giatItemsPerPage;
        const paginatedItems = filteredGiatArray.slice(startIdx, endIdx);

        paginatedItems.forEach(data => {
            const tr = document.createElement('tr');
            
            
            const dt = new Date(data.waktu);
            const tgl = `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()} ${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`;
            
            
            let badgeColor = "#3b82f6"; 
            if (data.jenis === "Penilangan") badgeColor = "#ef4444"; 
            else if (data.jenis === "Udara") badgeColor = "#0ea5e9"; 
            else if (data.jenis === "Darat") badgeColor = "#8b5cf6"; 
            else if (data.jenis === "Lisensi") badgeColor = "#f59e0b"; 

            const jenisBadge = `<span style="background: ${badgeColor}20; color: ${badgeColor}; padding: 4px 8px; border-radius: 4px; font-weight:bold; font-size:10px; border: 1px solid ${badgeColor}40;">${data.jenis.toUpperCase()}</span>`;

            
            tr.innerHTML = `
                <td style="color: #94a3b8; font-size: 11px;">${tgl}</td>
                <td><strong style="color: #fbbf24; font-size:12px;">${data.petugas}</strong><br><span style="font-size:10px; color:#94a3b8;"><i class="fas fa-id-badge"></i> ${data.callsign || "-"}</span></td>
                <td>${jenisBadge}</td>
                <td style="color: #cbd5e1; font-size: 11px;"><b>${data.lokasi}</b></td>
                <td style="color: #cbd5e1; font-size: 11px; line-height: 1.4;">${data.keterangan}</td>
            `;
            giatTableBody.appendChild(tr);
        });
    }

    function renderGiatPagination() {
        if (!giatPaginationDiv) return;
        giatPaginationDiv.innerHTML = '';
        const totalPages = Math.ceil(filteredGiatArray.length / giatItemsPerPage);
        
        if (totalPages <= 1) return;

        const btnPrev = document.createElement('button');
        btnPrev.className = 'page-btn'; btnPrev.innerHTML = '<i class="fas fa-chevron-left"></i>';
        btnPrev.disabled = currentGiatPage === 1;
        btnPrev.onclick = () => { currentGiatPage--; renderGiatTable(); renderGiatPagination(); };
        giatPaginationDiv.appendChild(btnPrev);

        const spanInfo = document.createElement('span');
        spanInfo.style.color = "#94a3b8"; spanInfo.style.fontSize = "11px"; spanInfo.style.fontWeight = "bold"; spanInfo.style.margin = "0 10px";
        spanInfo.innerText = `${currentGiatPage} / ${totalPages}`;
        giatPaginationDiv.appendChild(spanInfo);

        const btnNext = document.createElement('button');
        btnNext.className = 'page-btn'; btnNext.innerHTML = '<i class="fas fa-chevron-right"></i>';
        btnNext.disabled = currentGiatPage === totalPages;
        btnNext.onclick = () => { currentGiatPage++; renderGiatTable(); renderGiatPagination(); };
        giatPaginationDiv.appendChild(btnNext);
    }

    
    if(inputSearchGiat) {
        inputSearchGiat.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filteredGiatArray = allGiatArray.filter(giat => 
                (giat.petugas && giat.petugas.toLowerCase().includes(query)) || 
                (giat.jenis && giat.jenis.toLowerCase().includes(query)) ||
                (giat.keterangan && giat.keterangan.toLowerCase().includes(query)) ||
                (giat.lokasi && giat.lokasi.toLowerCase().includes(query)) ||
                (giat.callsign && giat.callsign.toLowerCase().includes(query))
            );
            currentGiatPage = 1;
            renderGiatTable();
            renderGiatPagination();
        });
    }

    
    if(btnExportCSVGiat) {
        btnExportCSVGiat.onclick = () => {
            if(allGiatArray.length === 0) {
                showAlert("Kosong", "Tidak ada data laporan untuk diekspor ke Excel.", "info"); return;
            }
            
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "WAKTU,NAMA PETUGAS,PANGKAT,CALLSIGN,JENIS GIAT,LOKASI,KETERANGAN,NAMA PELANGGAR (JIKA ADA)\n";
            
            allGiatArray.forEach(g => {
                const dt = new Date(g.waktu);
                const tgl = `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()} ${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`;
                
                let row = [
                    `"${tgl}"`,
                    `"${g.petugas || "-"}"`,
                    `"${g.pangkat || "-"}"`,
                    `"${g.callsign || "-"}"`,
                    `"${g.jenis || "-"}"`,
                    `"${g.lokasi || "-"}"`,
                    `"${g.keterangan || "-"}"`,
                    `"${g.pelanggar || "-"}"`
                ].join(",");
                csvContent += row + "\n";
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `Rekapan_Master_Giat_Icarus_${new Date().toISOString().slice(0,10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            insertAuditLog("EKSPOR DATA", "Pimpinan mengunduh rekapan Master Laporan Giat (.CSV)");
            showToast("Berhasil diunduh!");
        };
    }
    
    const btnSimpanSitaan = document.getElementById('btnSimpanSitaan');
    const sitaanTableBody = document.getElementById('sitaanTableBody');
    const sitaanPaginationDiv = document.getElementById('sitaanPagination');
    const inputSearchSitaan = document.getElementById('inputSearchSitaan');

    let allSitaanArray = [];
    let filteredSitaanArray = [];
    let currentSitaanPage = 1;
    const sitaanItemsPerPage = 10;

    if (btnSimpanSitaan) {
        btnSimpanSitaan.onclick = async () => {
            const tersangka = document.getElementById('inputTersangkaSita').value.trim() || "TIDAK DIKETAHUI";
            const kategori = document.getElementById('inputKategoriSita').value;
            const detail = document.getElementById('inputDetailSita').value.trim();
            const statusSita = document.getElementById('inputStatusSita').value;
            const lokasi = document.getElementById('inputLokasiSita').value.trim();
            const petugas = document.getElementById('inputOfficer').value || "UNKNOWN";

            if (!detail || !lokasi) {
                showAlert("Peringatan", "Detail Barang dan Lokasi Penyitaan wajib diisi!", "warning");
                return;
            }

            btnSimpanSitaan.innerHTML = '<i class="fas fa-spinner fa-spin"></i> MENYIMPAN...';
            btnSimpanSitaan.disabled = true;

            const payload = {
                tersangka: tersangka.toUpperCase(),
                kategori: kategori,
                detail: detail,
                status: statusSita,
                lokasi: lokasi,
                petugas: petugas,
                waktu: new Date().getTime()
            };

            try {
                await database.ref('penyitaan_barang').push(payload);
                insertAuditLog("SITA BARANG", `Mencatat penyitaan: ${detail} dari ${tersangka}`);
                showToast("Barang Bukti Berhasil Dicatat!");
                
                
                document.getElementById('inputTersangkaSita').value = ""; 
                document.getElementById('inputDetailSita').value = ""; 
                document.getElementById('inputLokasiSita').value = ""; 
            } catch (error) {
                showAlert("Error", "Gagal menyimpan data barang bukti ke server.", "error");
            } finally {
                btnSimpanSitaan.innerHTML = '<i class="fas fa-save"></i> CATAT BARANG BUKTI';
                btnSimpanSitaan.disabled = false;
            }
        };
    }

   
    if (sitaanTableBody) {
        database.ref('penyitaan_barang').on('value', (snapshot) => {
            allSitaanArray = [];
            
            if (snapshot.exists()) {
                snapshot.forEach(child => {
                    allSitaanArray.push({ key: child.key, ...child.val() });
                });
             
                allSitaanArray.sort((a, b) => b.waktu - a.waktu);
            }
            
            const query = inputSearchSitaan ? inputSearchSitaan.value.toLowerCase() : '';
            filteredSitaanArray = allSitaanArray.filter(item => 
                (item.tersangka && item.tersangka.toLowerCase().includes(query)) ||
                (item.detail && item.detail.toLowerCase().includes(query)) ||
                (item.lokasi && item.lokasi.toLowerCase().includes(query))
            );

            currentSitaanPage = 1;
            renderSitaanTable();
            renderSitaanPagination();
        });
    }

    function renderSitaanTable() {
        if (!sitaanTableBody) return;
        sitaanTableBody.innerHTML = '';
        
        if (filteredSitaanArray.length === 0) {
            sitaanTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 30px; color: #ef4444;"><i class="fas fa-box-open"></i> Gudang barang bukti kosong atau data tidak ditemukan.</td></tr>';
            return;
        }

        const currentOfficerStatus = document.getElementById('displayUnit').innerText;
        const isPimpinanOtorisasi = currentOfficerStatus.includes("PIMPINAN");

        const startIdx = (currentSitaanPage - 1) * sitaanItemsPerPage;
        const endIdx = startIdx + sitaanItemsPerPage;
        const paginatedItems = filteredSitaanArray.slice(startIdx, endIdx);

        paginatedItems.forEach(data => {
            const tr = document.createElement('tr');
            const dt = new Date(data.waktu);
            const tgl = `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()}`;
            
            let statusBadge = "";
            if (data.status === "DISIMPAN") {
                statusBadge = `<span style="background: #eab30820; color: #eab308; padding: 4px 8px; border-radius: 4px; font-weight:bold; font-size:10px;"><i class="fas fa-box"></i> DISIMPAN</span>`;
            } else if (data.status === "DISERAHKAN") {
                statusBadge = `<span style="background: #3b82f620; color: #3b82f6; padding: 4px 8px; border-radius: 4px; font-weight:bold; font-size:10px;"><i class="fas fa-handshake"></i> DISERAHKAN KEPOLISIAN</span>`;
            } else {
                statusBadge = `<span style="background: #ef444420; color: #ef4444; padding: 4px 8px; border-radius: 4px; font-weight:bold; font-size:10px;"><i class="fas fa-fire"></i> DIMUSNAHKAN</span>`;
            }

            let aksiHtml = isPimpinanOtorisasi ? 
                `<button onclick="hapusSitaan('${data.key}')" style="background: transparent; border: 1px solid #ef4444; color: #ef4444; padding: 4px 8px; border-radius: 4px; cursor: pointer; transition: 0.3s; font-size: 10px;">
                    <i class="fas fa-trash"></i> Hapus
                </button>` : 
                `<span style="font-size: 9px; color: #64748b; background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px;"><i class="fas fa-lock"></i> RESTRICTED</span>`;

            tr.innerHTML = `
                <td style="color: #94a3b8; font-size: 11px;">${tgl}</td>
                <td style="font-weight: 900; color: #fca5a5; font-size: 13px;">${data.tersangka}</td>
                <td style="color: #cbd5e1; font-size: 11px;"><b>${data.kategori}</b><br><span style="color:#fbbf24">${data.detail}</span><br><span style="color:#64748b">Lok: ${data.lokasi}</span></td>
                <td>${statusBadge}</td>
                <td style="color: #cbd5e1; font-weight:bold; font-size: 11px;">${data.petugas}</td>
                <td>${aksiHtml}</td>
            `;
            sitaanTableBody.appendChild(tr);
        });
    }

    function renderSitaanPagination() {
        if (!sitaanPaginationDiv) return;
        sitaanPaginationDiv.innerHTML = '';
        const totalPages = Math.ceil(filteredSitaanArray.length / sitaanItemsPerPage);
        
        if (totalPages <= 1) return; 

        const btnPrev = document.createElement('button');
        btnPrev.className = 'page-btn'; btnPrev.innerHTML = '<i class="fas fa-chevron-left"></i>';
        btnPrev.disabled = currentSitaanPage === 1;
        btnPrev.onclick = () => { currentSitaanPage--; renderSitaanTable(); renderSitaanPagination(); };
        sitaanPaginationDiv.appendChild(btnPrev);

        const spanInfo = document.createElement('span');
        spanInfo.style.color = "#94a3b8"; spanInfo.style.fontSize = "11px"; spanInfo.style.fontWeight = "bold"; spanInfo.style.margin = "0 10px";
        spanInfo.innerText = `${currentSitaanPage} / ${totalPages}`;
        sitaanPaginationDiv.appendChild(spanInfo);

        const btnNext = document.createElement('button');
        btnNext.className = 'page-btn'; btnNext.innerHTML = '<i class="fas fa-chevron-right"></i>';
        btnNext.disabled = currentSitaanPage === totalPages;
        btnNext.onclick = () => { currentSitaanPage++; renderSitaanTable(); renderSitaanPagination(); };
        sitaanPaginationDiv.appendChild(btnNext);
    }

    if (inputSearchSitaan) {
        inputSearchSitaan.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filteredSitaanArray = allSitaanArray.filter(item => 
                (item.tersangka && item.tersangka.toLowerCase().includes(query)) ||
                (item.detail && item.detail.toLowerCase().includes(query)) ||
                (item.lokasi && item.lokasi.toLowerCase().includes(query))
            );
            currentSitaanPage = 1;
            renderSitaanTable();
            renderSitaanPagination();
        });
    }

    window.hapusSitaan = function(key) {
        const currentOfficerStatus = document.getElementById('displayUnit').innerText;
        if (!currentOfficerStatus.includes("PIMPINAN")) {
            showAlert("Akses Ditolak", "Hanya Pimpinan yang dapat menghapus barang bukti dari gudang.", "error");
            return;
        }

        Swal.fire({
            title: 'Hapus Barang Bukti?',
            text: `Anda yakin ingin menghapus data sitaan ini secara permanen dari logbook?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#334155',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            customClass: { popup: 'swal-dark-popup', title: 'swal-dark-title' }
        }).then((result) => {
            if (result.isConfirmed) {
                database.ref('penyitaan_barang/' + key).remove()
                    .then(() => {
                        insertAuditLog("HAPUS SITAAN", `Pimpinan menghapus data barang bukti dari sistem.`);
                        showToast("Barang bukti dihapus!");
                    })
                    .catch(() => showAlert("Error", "Gagal menghapus data dari server.", "error"));
            }
        });
    };
    
    const btnSimpanProgress = document.getElementById('btnSimpanProgress');
    const progressTableBody = document.getElementById('progressTableBody');
    const inputSearchProg = document.getElementById('inputSearchProg');

    let allProgressArray = [];

    if (btnSimpanProgress) {
        btnSimpanProgress.onclick = async () => {
            const nama = document.getElementById('inputNamaProg').value.trim().toUpperCase();
            const callsignInput = document.getElementById('inputCallsignProg').value.trim().toUpperCase();
            const poinTambah = parseInt(document.getElementById('inputPoinProg').value) || 0;
            const status = document.getElementById('inputStatusProg').value;
            const catatan = document.getElementById('inputCatatanProg').value.trim() || "-";

            if (!nama || !callsignInput) {
                showAlert("Peringatan", "Nama dan Callsign wajib diisi!", "warning"); return;
            }

            btnSimpanProgress.innerHTML = '<i class="fas fa-spinner fa-spin"></i> MEMPROSES...';
            btnSimpanProgress.disabled = true;

          
            const safeCallsign = callsignInput.replace(/\s+/g, '');

            try {
                
                const snapshot = await database.ref('progress_anggota/' + safeCallsign).once('value');
                let poinSekarang = 0;
                
                if (snapshot.exists()) {
                    poinSekarang = snapshot.val().total_poin || 0;
                }
                
                const poinBaru = poinSekarang + poinTambah;

                const payload = {
                    nama: nama,
                    callsign: safeCallsign,
                    total_poin: poinBaru,
                    status: status,
                    catatan_terakhir: catatan,
                    waktu_update: new Date().getTime(),
                    dievaluasi_oleh: document.getElementById('inputOfficer').value
                };

                await database.ref('progress_anggota/' + safeCallsign).set(payload);
                insertAuditLog("UPDATE PROGRESS", `Pimpinan mengevaluasi [${safeCallsign}] ${nama}. Total Poin: ${poinBaru}`);
                showToast("Data Anggota Berhasil Diperbarui!");
                
                // Bersihkan form (Kecuali tanggal/dropdown biar cepat kalau mau input banyak)
                document.getElementById('inputNamaProg').value = ""; 
                document.getElementById('inputCallsignProg').value = ""; 
                document.getElementById('inputPoinProg').value = ""; 
                document.getElementById('inputCatatanProg').value = ""; 

            } catch (error) {
                showAlert("Error", "Gagal menyimpan data ke server.", "error");
            } finally {
                btnSimpanProgress.innerHTML = '<i class="fas fa-save"></i> UPDATE DATA ANGGOTA';
                btnSimpanProgress.disabled = false;
            }
        };
    }

    function renderProgressTable() {
        if (!progressTableBody) return;
        progressTableBody.innerHTML = '';
        
        const query = inputSearchProg ? inputSearchProg.value.toLowerCase() : '';
        const filteredArray = allProgressArray.filter(item => 
            (item.nama && item.nama.toLowerCase().includes(query)) ||
            (item.callsign && item.callsign.toLowerCase().includes(query))
        );

        if (filteredArray.length === 0) {
            progressTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 30px; color: #64748b;">Belum ada riwayat progress anggota tercatat.</td></tr>';
            return;
        }

        const currentOfficerStatus = document.getElementById('displayUnit').innerText;
        const isPimpinanOtorisasi = currentOfficerStatus.includes("PIMPINAN");

        filteredArray.forEach(data => {
            const tr = document.createElement('tr');
            
           
            let statusBadge = "";
            if (data.status === "AKTIF") statusBadge = `<span style="color: #22c55e; font-weight:bold; font-size:10px;"><i class="fas fa-check-circle"></i> AKTIF</span>`;
            else if (data.status === "MASA PERCOBAAN") statusBadge = `<span style="color: #eab308; font-weight:bold; font-size:10px;"><i class="fas fa-user-clock"></i> PROBATION</span>`;
            else if (data.status === "CUTI") statusBadge = `<span style="color: #3b82f6; font-weight:bold; font-size:10px;"><i class="fas fa-plane"></i> CUTI (LOA)</span>`;
            else statusBadge = `<span style="color: #ef4444; font-weight:bold; font-size:10px;"><i class="fas fa-ban"></i> SUSPENDED</span>`;

          
            const persentasePoin = Math.min(Math.max(data.total_poin, 0), 100); 
            const progressBarHtml = `
                <div style="font-weight:900; font-size: 14px; color: #fbbf24; text-shadow: 1px 1px 2px #000;">${data.total_poin} PTS</div>
                <div style="width: 100%; height: 6px; background: rgba(0,0,0,0.5); border-radius: 4px; margin-top: 4px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="width: ${persentasePoin}%; height: 100%; background: linear-gradient(90deg, #3b82f6, #60a5fa); border-radius: 4px;"></div>
                </div>
            `;

            let aksiHtml = isPimpinanOtorisasi ? 
                `<button onclick="hapusProgress('${data.callsign}')" style="background: transparent; border: 1px solid #ef4444; color: #ef4444; padding: 4px 8px; border-radius: 4px; cursor: pointer; transition: 0.3s; font-size: 10px;"><i class="fas fa-trash"></i> Reset</button>` : 
                `<span style="font-size: 9px; color: #64748b; padding: 4px 8px;"><i class="fas fa-lock"></i> Restricted</span>`;

            tr.innerHTML = `
                <td style="color: #fbbf24; font-weight: 900; font-size: 14px;">${data.callsign}</td>
                <td style="font-weight: bold; color: #fff;">${data.nama}</td>
                <td>${progressBarHtml}</td>
                <td>${statusBadge}</td>
                <td style="color: #cbd5e1; font-size: 11px;"><b>${data.catatan_terakhir}</b><br><span style="font-size:9px; color:#64748b;">(Oleh: ${data.dievaluasi_oleh || "-"})</span></td>
                <td>${aksiHtml}</td>
            `;
            progressTableBody.appendChild(tr);
        });
    }

    if (progressTableBody) {
        database.ref('progress_anggota').on('value', (snapshot) => {
            allProgressArray = [];
            if (snapshot.exists()) {
                snapshot.forEach(child => {
                    allProgressArray.push({ key: child.key, ...child.val() });
                });
               
                allProgressArray.sort((a, b) => b.total_poin - a.total_poin);
            }
            renderProgressTable();
        });
    }

    if (inputSearchProg) {
        inputSearchProg.addEventListener('input', renderProgressTable);
    }

    window.hapusProgress = function(callsign) {
        const currentOfficerStatus = document.getElementById('displayUnit').innerText;
        if (!currentOfficerStatus.includes("PIMPINAN")) return;

        Swal.fire({
            title: 'Reset Progress?',
            text: `Anda yakin ingin mereset/menghapus seluruh poin dan data progress ${callsign}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Ya, Reset!',
            customClass: { popup: 'swal-dark-popup', title: 'swal-dark-title' }
        }).then((result) => {
            if (result.isConfirmed) {
                database.ref('progress_anggota/' + callsign).remove()
                    .then(() => showToast("Data Progress Direset!"));
            }
        });
    };
   
    function calculateOfficerMilestones() {
        const currentOfficerCallsign = document.getElementById('inputOfficer').value || "UNKNOWN";
        
        
        const targetUdara = 80;
        const targetLaut = 100;
        const targetLisensi = 150;

      
        let countUdara = 36;
        let countLaut = 49;
        let countLisensi = 40;

        
        database.ref('laporan_giat').once('value', (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach(child => {
                    const data = child.val();
                    
                    if (data.callsign && data.callsign.toUpperCase().includes(currentOfficerCallsign.toUpperCase())) {
                        if (data.jenis === "Udara") countUdara++;
                        else if (data.jenis === "Laut") countLaut++;
                        else if (data.jenis === "Lisensi") countLisensi++;
                    }
                });
            }

            
            const kurangUdara = Math.max(targetUdara - countUdara, 0);
            const kurangLaut = Math.max(targetLaut - countLaut, 0);
            const kurangLisensi = Math.max(targetLisensi - countLisensi, 0);

           
            const pctUdara = Math.min((countUdara / targetUdara) * 100, 100);
            const pctLaut = Math.min((countLaut / targetLaut) * 100, 100);
            const pctLisensi = Math.min((countLisensi / targetLisensi) * 100, 100);

            
            if(document.getElementById('msUdaraPoin')) {
                document.getElementById('msUdaraPoin').innerText = `${countUdara} / ${targetUdara} Giat`;
                document.getElementById('msLautPoin').innerText = `${countLaut} / ${targetLaut} Giat`;
                document.getElementById('msLisensiPoin').innerText = `${countLisensi} / ${targetLisensi} Giat`;

                document.getElementById('msUdaraKurang').innerHTML = kurangUdara === 0 ? `<i class="fas fa-check-circle" style="color:#22c55e"></i> TERPENUHI` : `<i class="fas fa-exclamation-circle"></i> MASI KURANG ${kurangUdara} P`;
                document.getElementById('msLautKurang').innerHTML = kurangLaut === 0 ? `<i class="fas fa-check-circle" style="color:#22c55e"></i> TERPENUHI` : `<i class="fas fa-exclamation-circle"></i> MASI KURANG ${kurangLaut} P`;
                document.getElementById('msLisensiKurang').innerHTML = kurangLisensi === 0 ? `<i class="fas fa-check-circle" style="color:#22c55e"></i> TERPENUHI` : `<i class="fas fa-exclamation-circle"></i> MASI KURANG ${kurangLisensi} P`;

                document.getElementById('barMsUdara').style.width = `${pctUdara}%`;
                document.getElementById('barMsLaut').style.width = `${pctLaut}%`;
                document.getElementById('barMsLisensi').style.width = `${pctLisensi}%`;

                const rewardPhoto = document.getElementById('msRewardItemPhoto');
                const lockOverlay = document.getElementById('msLockOverlay');
                const rewardBadge = document.getElementById('msRewardBadge');
                const glowingRing = document.querySelector('.glowing-ring');

                if (rewardPhoto && countUdara >= targetUdara && countLaut >= targetLaut && countLisensi >= targetLisensi) {
                    
                    rewardPhoto.style.filter = "grayscale(0%) brightness(1.1)";
                    rewardPhoto.style.opacity = "1";
                    rewardPhoto.style.transform = "scale(1.05)";
                    
                    
                    glowingRing.style.borderColor = "rgba(34, 197, 94, 0.8)";
                    glowingRing.style.boxShadow = "0 0 30px rgba(34, 197, 94, 0.6)";

                    
                    lockOverlay.innerHTML = `<i class="fas fa-check"></i>`;
                    lockOverlay.style.background = "#22c55e";

                    
                    rewardBadge.style.background = "rgba(34, 197, 94, 0.2)";
                    rewardBadge.style.color = "#22c55e";
                    rewardBadge.style.borderColor = "rgba(34, 197, 94, 0.4)";
                    rewardBadge.innerText = "STATUS: UNLOCKED - KLAIM DI ATASAN";
                
                } else if (rewardPhoto) {
                    
                    rewardPhoto.style.filter = "grayscale(100%) brightness(0.7)";
                    rewardPhoto.style.opacity = "0.8";
                    rewardPhoto.style.transform = "scale(1)";
                    glowingRing.style.borderColor = "rgba(251, 191, 36, 0.3)";
                    glowingRing.style.boxShadow = "0 0 20px rgba(251, 191, 36, 0.2)";
                    lockOverlay.innerHTML = `<i class="fas fa-lock"></i>`;
                    lockOverlay.style.background = "#ef4444";
                    rewardBadge.style.background = "rgba(239, 68, 68, 0.15)";
                    rewardBadge.style.color = "#ef4444";
                    rewardBadge.style.borderColor = "rgba(239, 68, 68, 0.3)";
                    rewardBadge.innerText = "STATUS: LOCKED - BELUM MEMENUHI SYARAT";
                }
            }
        });
    }

   
    database.ref('laporan_giat').on('value', () => {
        calculateOfficerMilestones();
    });
   
    auth.onAuthStateChanged((user) => {
        if (user) { setTimeout(calculateOfficerMilestones, 1000); }
    });
});

document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 123) {
        event.preventDefault();
    }

    if (event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74 || event.keyCode === 67)) {
        event.preventDefault();
    }
   
    if (event.ctrlKey && event.keyCode === 85) {
        event.preventDefault();
    }
});
