document.addEventListener('DOMContentLoaded', () => {
    // Data untuk mengisi dropdown
    const options = {
        waktu: [
            "Pagi hari (Golden hour)", "Siang hari (Terik)", "Sore hari (Magic hour)", "Senja", "Malam hari", "Subuh"
        ],
        pencahayaan: [
            "Pencahayaan sinematik", "Cahaya alami", "Rembrandt lighting", "Cahaya lembut (Soft light)", "Cahaya keras (Hard light)", "Lampu neon", "Cahaya dari bawah (Uplighting)", "Siluet (Backlight)"
        ],
        gayaVideo: [
            "Realistis (Photorealistic)", "Gaya film (Cinematic)", "Animasi 3D", "Gaya Anime", "Video dokumenter", "Hitam putih (Black and white)", "Gaya retro (Vintage)", "Fantasi"
        ],
        suasanaVideo: [
            "Misterius", "Menegangkan", "Bahagia dan ceria", "Dramatis", "Tenang dan damai", "Nostalgia", "Epic dan megah", "Futuristik", "Romantis"
        ],
        gerakanKamera: {
            "Umum": {
                "Static Shot (Tanpa Gerakan)": "Static Shot",
                "Pan (Geser Horizontal)": "Pan",
                "Tilt (Geser Vertikal)": "Tilt",
                "Dolly (Maju/Mundur)": "Dolly",
                "Truck (Geser Kiri/Kanan)": "Truck",
                "Pedestal (Naik/Turun)": "Pedestal",
                "Zoom (Perbesar/Perkecil)": "Zoom"
            },
            "Higgsfield.ai": {
                "3D Rotation (Rotasi 3D)": "3D Rotation",
                "Action Run (Lari Aksi)": "Action Run",
                "Arc Left (Melingkar Kiri)": "Arc Left",
                "Arc Right (Melingkar Kanan)": "Arc Right",
                "Bullet Time (Waktu Peluru)": "Bullet Time",
                "Car Chasing (Kejar-kejaran Mobil)": "Car Chasing",
                "Car Grip (Kamera di Mobil)": "Car Grip",
                "Crash Zoom In (Zoom Cepat Masuk)": "Crash Zoom In",
                "Crash Zoom Out (Zoom Cepat Keluar)": "Crash Zoom Out",
                "Crane Down (Derek Turun)": "Crane Down",
                "Crane Up (Derek Naik)": "Crane Up",
                "Dolly In (Dolly Masuk)": "Dolly In",
                "Dolly Out (Dolly Keluar)": "Dolly Out",
                "Dolly Zoom In (Dolly Zoom Masuk)": "Dolly Zoom In",
                "Dolly Zoom Out (Dolly Zoom Keluar)": "Dolly Zoom Out",
                "Dutch Angle (Sudut Miring)": "Dutch Angle",
                "FPV Drone (Drone FPV)": "FPV Drone",
                "Focus Change (Perubahan Fokus)": "Focus Change",
                "Handheld (Genggam)": "Handheld",
                "Hyperlapse": "Hyperlapse",
                "Jib Down (Jib Turun)": "Jib Down",
                "Jib Up (Jib Naik)": "Jib Up",
                "Lazy Susan": "Lazy Susan",
                "Low Shutter (Rana Lambat)": "Low Shutter",
                "Robo Arm (Lengan Robot)": "Robo Arm",
                "Snorricam": "Snorricam",
                "Super Dolly In (Super Dolly Masuk)": "Super Dolly In",
                "Super Dolly Out (Super Dolly Keluar)": "Super Dolly Out",
                "Timelapse Human (Timelapse Manusia)": "Timelapse Human",
                "Timelapse Landscape (Timelapse Pemandangan)": "Timelapse Landscape",
                "Whip Pan (Pan Cepat)": "Whip Pan",
                "YoYo Zoom": "YoYo Zoom",
                "360 Orbit (Orbit 360)": "360 Orbit"
            }
        }
    };

    // Fungsi untuk mengisi select/dropdown
    function populateSelect(elementId, data) {
        const select = document.getElementById(elementId);
        if (!select) return;

        if (Array.isArray(data)) {
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item;
                option.textContent = item;
                select.appendChild(option);
            });
        } else { // Untuk gerakan kamera yang dikelompokkan
            for (const group in data) {
                const optgroup = document.createElement('optgroup');
                optgroup.label = group;
                for (const key in data[group]) {
                    const option = document.createElement('option');
                    option.value = data[group][key];
                    option.textContent = key;
                    optgroup.appendChild(option);
                }
                select.appendChild(optgroup);
            }
        }
    }

    // Mengisi semua dropdown saat halaman dimuat
    populateSelect('waktu', options.waktu);
    populateSelect('pencahayaan', options.pencahayaan);
    populateSelect('gaya-video', options.gayaVideo);
    populateSelect('suasana-video', options.suasanaVideo);
    populateSelect('gerakan-kamera', options.gerakanKamera);

    const generateBtn = document.getElementById('generate-btn');
    const promptIndonesiaEl = document.getElementById('prompt-indonesia');
    const promptInggrisEl = document.getElementById('prompt-inggris');

    generateBtn.addEventListener('click', async () => {
        // Mengumpulkan nilai dari form
        const inputs = {
            subjek: document.getElementById('subjek').value,
            aksi: document.getElementById('aksi').value,
            ekspresi: document.getElementById('ekspresi').value,
            tempat: document.getElementById('tempat').value,
            waktu: document.getElementById('waktu').value,
            gerakanKamera: document.getElementById('gerakan-kamera').value,
            pencahayaan: document.getElementById('pencahayaan').value,
            gayaVideo: document.getElementById('gaya-video').value,
            suasanaVideo: document.getElementById('suasana-video').value,
            suara: document.getElementById('suara').value,
            kalimat: document.getElementById('kalimat').value,
            detail: document.getElementById('detail').value
        };

        // Membuat prompt dalam Bahasa Indonesia
        const promptID = createIndonesianPrompt(inputs);
        promptIndonesiaEl.value = promptID;

        // Menerjemahkan prompt ke Bahasa Inggris
        const promptEN = await createEnglishPrompt(inputs);
        promptInggrisEl.innerHTML = promptEN;
    });

    function createIndonesianPrompt(data) {
        let prompt = `Sebuah video ${data.gayaVideo.toLowerCase()} dengan suasana ${data.suasanaVideo.toLowerCase()}. `;
        prompt += `Menampilkan ${data.subjek} yang sedang ${data.aksi} ${data.tempat}. `;
        if (data.ekspresi) {
            prompt += `Ekspresi wajahnya menunjukkan ${data.ekspresi}. `;
        }
        prompt += `Adegan berlangsung pada ${data.waktu.toLowerCase()}, diterangi oleh ${data.pencahayaan.toLowerCase()}. `;
        prompt += `Gerakan kamera yang digunakan adalah ${data.gerakanKamera}. `;
        if (data.suara) {
            prompt += `Terdengar suara ${data.suara}. `;
        }
        if (data.kalimat) {
            prompt += `Terdengar narasi atau dialog: "${data.kalimat}". `;
        }
        if (data.detail) {
            prompt += `Detail tambahan: ${data.detail}`;
        }
        return prompt.trim();
    }

    async function createEnglishPrompt(data) {
        // Simulasi terjemahan, idealnya menggunakan API, tapi untuk demo kita buat manual
        // Di aplikasi nyata, ini bisa diganti dengan panggilan ke Google Translate API, dll.
        const translations = {
            'Sebuah video': 'A video in the style of',
            'dengan suasana': 'with a',
            'Menampilkan': 'Featuring',
            'yang sedang': 'who is',
            'Ekspresi wajahnya menunjukkan': 'Their facial expression shows',
            'Adegan berlangsung pada': 'The scene takes place in the',
            'diterangi oleh': 'illuminated by',
            'Gerakan kamera yang digunakan adalah': 'The camera movement used is',
            'Terdengar suara': 'The sound of',
            'terdengar.': 'is heard.',
            'Detail tambahan:': 'Additional details:',
            'Pagi hari (Golden hour)': 'golden hour morning',
            'Siang hari (Terik)': 'bright midday',
            'Sore hari (Magic hour)': 'magic hour evening',
            'Senja': 'dusk',
            'Malam hari': 'night',
            'Subuh': 'dawn',
            'Pencahayaan sinematik': 'cinematic lighting',
            'Cahaya alami': 'natural light',
            'Rembrandt lighting': 'Rembrandt lighting',
            'Cahaya lembut (Soft light)': 'soft light',
            'Cahaya keras (Hard light)': 'hard light',
            'Lampu neon': 'neon lights',
            'Cahaya dari bawah (Uplighting)': 'uplighting',
            'Siluet (Backlight)': 'backlighting',
            'Realistis (Photorealistic)': 'photorealistic style',
            'Gaya film (Cinematic)': 'cinematic style',
            'Animasi 3D': '3D animation style',
            'Gaya Anime': 'anime style',
            'Video dokumenter': 'documentary style',
            'Hitam putih (Black and white)': 'black and white style',
            'Gaya retro (Vintage)': 'vintage style',
            'Fantasi': 'fantasy style',
            'Misterius': 'mysterious atmosphere',
            'Menegangkan': 'tense atmosphere',
            'Bahagia dan ceria': 'happy and cheerful atmosphere',
            'Dramatis': 'dramatic atmosphere',
            'Tenang dan damai': 'calm and peaceful atmosphere',
            'Nostalgia': 'nostalgic atmosphere',
            'Epic dan megah': 'epic and grand atmosphere',
            'Futuristik': 'futuristic atmosphere',
            'Romantis': 'romantic atmosphere',
        };

        function translate(text, context) {
            // Fungsi sederhana untuk mengganti frasa yang diketahui
             for (const [key, value] of Object.entries(context)) {
                text = text.replace(new RegExp(key, 'gi'), value);
            }
            return text;
        }

        let prompt = `A ${translate(data.gayaVideo, translations)} video with a ${translate(data.suasanaVideo, translations)}. `;
        prompt += `Featuring ${data.subjek} ${data.aksi} ${data.tempat}. `;
         if (data.ekspresi) {
            prompt += `Their expression is ${data.ekspresi}. `;
        }
        prompt += `The scene is set during the ${translate(data.waktu, translations)}, illuminated by ${translate(data.pencahayaan, translations)}. `;
        prompt += `The camera performs a ${data.gerakanKamera}. `;
        if (data.suara) {
            prompt += `The audio consists of ${data.suara}. `;
        }
        if (data.kalimat) {
             // Bagian ini tidak diterjemahkan sesuai permintaan
            prompt += `The following is spoken: "${data.kalimat}". `;
        }
        if (data.detail) {
            prompt += `Additional details: ${data.detail}`;
        }
        
        return prompt.trim();
    }
}); 