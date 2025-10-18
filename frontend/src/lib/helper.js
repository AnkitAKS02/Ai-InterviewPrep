import moment from "moment";

export const getLightColorFromImage = (imgUrl) => {
    return new Promise((resolve, reject) => {

        if (!imgUrl || typeof imgUrl != 'string') {
            return reject(new Error('Invalid image URL'));
        }
        const img = new Image();
        if (!imgUrl.startsWith('data:')) {
            img.crossOrigin = "anonymous"; // allow CORS images
        }
        img.src = imgUrl;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            let r = 0, g = 0, b = 0, count = 0;

            // sample pixels
            for (let i = 0; i < data.length; i += 4) {
                const red = data[i];
                const green = data[i + 1];
                const blue = data[i + 2];
                const brightness = (red + green + blue) / 3;
                if (brightness > 100) {
                    r += red;
                    g += green;
                    b += blue;
                    count++;
                }
            }

            // average color
            if (count === 0) {
                resolve('#ffffff')
            } else {
                r = Math.round(r / count);
                g = Math.round(g / count);
                b = Math.round(b / count);

                // lighten the color a bit
                r = Math.min(255, r + 40);
                g = Math.min(255, g + 40);
                b = Math.min(255, b + 40);
                resolve(`rgb(${r}, ${g}, ${b})`);
            }
        };

        img.onerror = (err) => {
            console.log('Failed to load image', err);
            reject(new Error('Image could not be loaded or is blocked by CORS.'));
        };
    });
}

export function formatYearMonth(yearMonth) {
    return yearMonth ? moment(yearMonth, "YYYY-MM").format("MMM YYYY") : "";
}


export function formatSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const size = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + size[i];
}
