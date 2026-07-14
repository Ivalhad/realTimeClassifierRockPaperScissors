class CameraIntegration {
	constructor() {
		this.stream = null;
		this.targetFPS = 30;

		this.initializeElements();
		this.bindEvents();
		this.init();
	}

	/**
	 * TODO:
	 * Inisialisasi elemen:
	 * [] Video
	 * [] Select Camera
	 * [] Start & Stop Button 
	 * [] Pilih FPS 
	*/
	initializeElements() {
		this.video = document.getElementById('videoElement');
		this.cameraSelect = document.getElementById('cameraSelect');
		this.startBtn = document.getElementById('startBtn');
		this.stopBtn = document.getElementById('stopBtn');
		this.fpsSelect = document.getElementById('fpsSelect');
	}

	/**
	 * TODO:
	 * Daftarkan event listener untuk elemen:
	 * [] Start & Stop Button 
	 * [] Pilih kamera
	 * [] Pilih FPS 
	*/
	bindEvents() {
		this.startBtn.onclick = () => this.startCamera();
		this.stopBtn.onclick = () => this.stopCamera();
		this.fpsSelect.onchange = () => this.targetFPS = parseInt(this.fpsSelect.value);
	}

	/**
	 * TODO:
	 * [] Muat daftar kamera yang tersedia
	*/
	async init() {
		await this.loadCamera();
	}

	/**
	 * TODO:
	 * [] Implementasi metode untuk memuat daftar kamera yang tersedia
	*/
	async loadCamera() {
		try {
			await navigator.mediaDevices.getUserMedia({ video: true });
			const devices = await navigator.mediaDevices.enumerateDevices();

			const cameras = devices.filter((device) => device.kind === 'videoinput');

			if (cameras.length === 0) {
				this.cameraSelect.innerHTML = '<option>Kamera tidak ditemukan</option>';
				this.startBtn.disabled = true;
				return;
			}

			cameras.forEach((camera, index) => {
				const option = document.createElement('option');
				option.value = camera.deviceId;
				option.textContent = camera.label || `Kamera ${index + 1}`;
				this.cameraSelect.appendChild(option);
			});

			this.cameraSelect.disabled = false
			this.startBtn.disabled = cameras.length === 0
		} catch (error) {
			console.error('Akses kamera ditolak:', error);
			this.startBtn.disabled = true;
		}
	}

	/**
	 * TODO:
	 * [] Cek apakah perangkat adalah mobile
	 * [] Pengaturan constraints kamera
	 * [] Optimasi frame rate
	*/
	async startCamera() {
		const isMobile = navigator.userAgentData?.mobile ?? /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

		try {
			this.startBtn.disabled = true;
			this.startBtn.textContent = 'Memulai...';

			const deviceList = this.cameraSelect.value ? { exact: this.cameraSelect.value } : undefined;
			const facingMode = isMobile ? 'environment' : 'user';
			this.stream = await navigator.mediaDevices.getUserMedia({
				video: {
					deviceId: deviceList,
					width: { ideal: isMobile ? 480 : 640 },
					height: { ideal: isMobile ? 640 : 480 },
					facingMode,
					frameRate: { ideal: this.targetFPS }
				}
			});

			this.video.srcObject = this.stream;
			await this.video.play();
			this.updateUI();
		} catch (error) {
			alert(error.name === 'NotAllowedError'
				? 'Akses kamera ditolak. Silakan izinkan akses kamera.'
				: 'Gagal memulai kamera.');
			this.updateUI();
		}
	}

	/**
	* TODO:
	* [] Hentikan semua track pada stream kamera
 */
	stopCamera() {
		if (this.stream) {
			this.stream.getTracks().forEach(track => track.stop());
			this.stream = null;
			this.video.srcObject = null;
		}
		this.updateUI();
	}

	updateUI() {
		const active = this.isActive();
		this.startBtn.disabled = active;
		this.startBtn.textContent = 'Mulai Kamera';
		this.stopBtn.disabled = !active;
		this.cameraSelect.disabled = active;
	}

	isActive() {
		return this.stream && this.stream.active;
	}

	isReady() {
		return this.isActive() && this.video.readyState >= 2 && !this.video.paused;
	}

	destroy() {
		this.stopCamera();
	}
}

export default CameraIntegration;