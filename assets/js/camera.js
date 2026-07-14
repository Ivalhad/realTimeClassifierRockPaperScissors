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
	initializeElements() { }

	/**
	 * TODO:
	 * Daftarkan event listener untuk elemen:
	 * [] Start & Stop Button 
	 * [] Pilih kamera
	 * [] Pilih FPS 
	*/
	bindEvents() { }

	/**
	 * TODO:
	 * [] Muat daftar kamera yang tersedia
	*/
	async init() { }

	/**
	 * TODO:
	 * [] Implementasi metode untuk memuat daftar kamera yang tersedia
	*/
	async loadCamera() {
		try { } catch (error) {
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

		try {
			this.startBtn.disabled = true;
			this.startBtn.textContent = 'Starting...';

			this.stream = null;

			this.video.srcObject = this.stream;
			this.updateUI();
		} catch (error) {
			alert(error.name === 'NotAllowedError'
				? 'Camera permission denied. Please allow camera access.'
				: 'Failed to start camera.');
			this.updateUI();
		}
	}

	/**
	* TODO:
	* [] Hentikan semua track pada stream kamera
 */
	stopCamera() {
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