class ObjectDetector {
    constructor() {
        this.model = null;
        this.labels = [];
        this.imageSize = 224;
    }

    /**
     * TODO:
     * Lengkapi metode untuk memuat model:
     * [x] Muat model dari './model/model.json'
     * [x] Muat metadata dari './model/metadata.json'
    */
    async loadModel() {
        try {
            const [metadata, model] = await Promise.all([
                fetch('./model/metadata.json').then(r => r.json()),
                tf.loadLayersModel('./model/model.json')
            ]);
            this.labels = metadata.labels;
            this.imageSize = metadata.imageSize || 224;
            this.model = model;
            return { success: true, labels: this.labels };
        } catch (error) {
            throw new Error('Gagal memuat model. Periksa file model.');
        }
    }

    /**
     * TODO:
     * Lengkapi metode untuk prediksi:
     * [x] Logika preprosesing gambar
     * [x] Lakukan prediksi menggunakan model yang dimuat
     * [x] Kembalikan hasil prediksi dengan className dan confidence
    */
    async predict(imageElement) {
        if (!this.model) {
            throw new Error('Model belum dimuat.');
        }

        const tensor = tf.tidy(() => {
            const img = tf.browser.fromPixels(imageElement);
            const resized = tf.image.resizeBilinear(img, [this.imageSize, this.imageSize]);
            const normalized = resized.div(255.0);
            return normalized.expandDims(0);
        });

        const predictions = await this.model.predict(tensor);
        const probabilities = await predictions.data();

        tensor.dispose();
        predictions.dispose();

        let maxIndex = 0;
        let maxProb = probabilities[0];
        for (let i = 1; i < probabilities.length; i++) {
            if (probabilities[i] > maxProb) {
                maxProb = probabilities[i];
                maxIndex = i;
            }
        }

        return {
            className: this.labels[maxIndex] || 'Unknown',
            confidence: (maxProb * 100).toFixed(1)
        };
    }

    isLoaded() {
        return !!this.model;
    }

    /**
     * TODO:
     * [x] Lengkapi metode untuk menonaktifkan model menggunakan dispose
    */
    dispose() {
        if (this.model) {
            this.model.dispose();
            this.model = null;
        }
    }
}

export default ObjectDetector;