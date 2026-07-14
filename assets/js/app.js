import CameraIntegration from './camera.js';
import ObjectDetector from './detection.js';

class App {
	constructor() {
		this.camera = null;
		this.detector = null;
		this.isRunning = false;
		this.ctx = null;
		this.predictionInterval = null;

		this.initializeElements();
		this.bindEvents();
		this.init();
	}

	/**
	 * TODO:
	 * Inisialisasi elemen:
	 * [x] Status Model
	 * [x] Video & Canvas
	 * [x] Hasil Prediksi
	*/
	initializeElements() {
		this.modelStatus = document.getElementById('modelStatus');
		this.video = document.getElementById('videoElement');
		this.canvas = document.getElementById('canvasElement');
		this.predictionLabel = document.getElementById('predictionLabel');
		this.predictionConfidence = document.getElementById('predictionConfidence');
	}

	/**
	 * TODO:
	 * [x] Bind event listener untuk memulai prediksi saat video siap
	*/
	bindEvents() {
		this.video.addEventListener('loadeddata', () => {
			this.ctx = this.canvas.getContext('2d');
			this.canvas.width = this.video.videoWidth;
			this.canvas.height = this.video.videoHeight;
			if (this.camera.isReady() && this.detector.isLoaded()) {
				this.startPrediction();
			}
		});
	}

	/**
	 * TODO:
	 * [x] Panggil konstruktor CameraIntegration
	 * [x] Panggil konstruktor ObjectDetector
	 * [x] Load model
	*/
	async init() {
		try {
			this.camera = new CameraIntegration();
			this.detector = new ObjectDetector();

			this.showStatus('Menunggu model...', 'loading');
			await this.detector.loadModel();
			this.showStatus('Model siap', 'ready');
		} catch (error) {
			this.showStatus('Gagal memuat model', 'error')
			console.error('Gagal menginisialisasi aplikasi:', error);
		}
	}

	/**
	 * TODO:
	 * [x] Implementasi metode untuk memulai dan menghentikan prediksi
	 * [x] Implementasi metode prediksi
	*/
	startPrediction() {
		if (this.isRunning) return;
		this.isRunning = true;
		this.predict();
	}

	stopPrediction() {
		this.isRunning = false;
		this.resetDisplay();
	}

	async predict() {
		if (!this.isRunning || !this.camera.isReady() || !this.detector.isLoaded()) {
			return;
		}

		try {
			this.ctx.drawImage(this.video, 0, 0);

			const result = await this.detector.predict(this.canvas);
			this.updateDisplay(result);
		} catch (error) {
			console.error('Prediksi error:', error);
		}

		if (this.isRunning) {
			requestAnimationFrame(() => this.predict());
		}
	}

	updateDisplay(result) {
		this.predictionLabel.textContent = result.className || 'Unknown';
		this.predictionConfidence.textContent = `${result.confidence || 0}%`;
	}

	resetDisplay() {
		this.predictionLabel.textContent = '-';
		this.predictionConfidence.textContent = '0%';
	}

	showStatus(message, status) {
		this.modelStatus.textContent = message;
		this.modelStatus.className = `status ${status}`;
	}

	/**
	 * TODO:
	 * [x] Menghentikan kamera
	 * [x] Implementasi metode untuk membersihkan sumber daya saat aplikasi dihentikan
	*/
	destroy() {
		this.stopPrediction();
		this.camera.destroy();
		this.detector.dispose();
	}
}

/**
 * TODO:
 * [x] Pastikan sumber daya dibersihkan saat jendela ditutup
*/
document.addEventListener('DOMContentLoaded', () => {
	const app = new App();
	window.addEventListener('beforeunload', () => app.destroy());
})