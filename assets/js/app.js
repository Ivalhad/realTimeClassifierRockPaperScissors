import CameraIntegration from './camera.js';

class App {
	constructor() {
		this.camera = null;
		this.detector = null;
		this.isRunning = false;
		this.ctx = null;

		this.initializeElements();
		this.bindEvents();
		this.init();
	}

	/**
	 * TODO:
	 * Inisialisasi elemen:
	 * [] Status Model
	 * [] Video & Canvas
	 * [] Hasil Prediksi
	*/
	initializeElements() { }

	/**
	 * TODO:
	 * [] Bind event listener untuk memulai prediksi saat video siap
	*/
	bindEvents() { }

	/**
	 * TODO:
	 * [] Panggil konstruktor CameraIntegration
	 * [] Panggil konstruktor ObjectDetector
	 * [] Load model
	*/
	async init() {
		try {
			this.camera = new CameraIntegration();
		} catch (error) {
			console.error('Gagal menginisialisasi aplikasi:', error);
		}
	}

	/**
	 * TODO:
	 * [] Implementasi metode untuk memulai dan menghentikan prediksi
	 * [] Implementasi metode prediksi
	*/
	startPrediction() { }

	stopPrediction() { }

	async predict() { }

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
	 * [] Menghentikan kamera
	 * [] Implementasi metode untuk membersihkan sumber daya saat aplikasi dihentikan
	*/
	destroy() { }
}

/**
 * TODO:
 * [] Pastikan sumber daya dibersihkan saat jendela ditutup
*/
document.addEventListener('DOMContentLoaded', () => {
	const app = new App();
});