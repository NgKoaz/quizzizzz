export const base64ToBlobUrl = (base64String) => {
    // Decode the base64 string to a binary string
    const binaryString = atob(base64String);

    // Convert the binary string to an array of bytes
    const byteNumbers = new Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        byteNumbers[i] = binaryString.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob from the byte array
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Generate a Blob URL
    const blobUrl = URL.createObjectURL(blob);

    return blobUrl;
}