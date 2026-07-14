class ObjectDetector {
    constructor() {
        this.model = null;
        this.labels = [];
        this.imageSize = 224;
    }

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

    async predict(imageElement) {
        if (!this.model) throw new Error('Model tidak dapat dimuat');

        const tensor = tf.tidy(() =>
            tf.browser.fromPixels(imageElement)
                .resizeBilinear([224, 224])
                .div(255.0)
                .expandDims(0)
        );
        const predictions = this.model.predict(tensor);

        try {
            const values = await predictions.data();

            const maxIndex = values.indexOf(Math.max(...values));
            const result = {
                className: this.labels[maxIndex],
                confidence: Math.round(values[maxIndex] * 100)
            };
            return result;
        } catch (error) {
            console.error('Error during prediction:', error);
            return { className: 'Error', confidence: 0 };
        } finally {
            tensor.dispose();
            predictions.dispose();
        }
    }

    isLoaded() {
        return !!this.model;
    }

    dispose() {
        if (this.model) {
            this.model.dispose();
            this.model = null;
        }
    }
}

export default ObjectDetector;