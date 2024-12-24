const QRCode = require('qrcode');

// Generate QR Code as a data URL (image)
QRCode.toDataURL('Hello, QR Code!', function (err, url) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(url);  // Data URL representing the QR code image
});
