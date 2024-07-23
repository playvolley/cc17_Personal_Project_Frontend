import QRCode from "qrcode.react";

export default function AdminGenerateQR() {
  const url = `http://${window.location.hostname}:5173`;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Scan this QR Code</h2>
      <QRCode value={url} size={256} className="mb-4" />
      <p className="text-gray-700">{url}</p>
    </div>
  );
}
