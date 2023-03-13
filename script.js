function calculateSha256() {
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];
  if(!file){return;}

  if (file) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const data = event.target.result;
      sha256(data).then(hash => {
        document.getElementById('output').value = hash;
document.getElementById('output2').value = hash.substr(0,32);
      });
    }

    reader.readAsArrayBuffer(file);
  }
}

function sha256(data) {
  const buffer = new Uint8Array(data);
  return crypto.subtle.digest('SHA-256', buffer).then(hash => {
    return hex(hash);
  });
}

function hex(buffer) {
  const hexCodes = [];
  const view = new DataView(buffer);
  for (let i = 0; i < view.byteLength; i += 4) {
    const value = view.getUint32(i)
    const stringValue = value.toString(16)
    const padding = '00000000'
    const paddedValue = (padding + stringValue).slice(-padding.length)
    hexCodes.push(paddedValue);
  }
  return hexCodes.join("");
}
