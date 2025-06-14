export const createFileFromUrl = async (url: string, fileName: string) => {
    // Заменяем http на https в URL
    const secureUrl = url.replace(/^http:\/\//i, 'https://');
    console.log(secureUrl);

    const response = await fetch(secureUrl);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
};
