async function traducirTexto() {
    const textoOriginal = document.getElementById('textoOriginal').value;

    if (!textoOriginal) {
        alert('Por favor, ingresa un texto para traducir.');
        return;
    }

    try {
        // Usamos AllOrigins como proxy para evitar el problema de CORS
        const proxy = 'https://api.allorigins.win/raw?url=';
        const apiURL = 'https://api.lecto.ai/v1/translate/text';
        
        const respuesta = await fetch(proxy + encodeURIComponent(apiURL), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: textoOriginal,
                source_lang: 'en',
                target_lang: 'es'
            })
        });

        if (!respuesta.ok) {
            throw new Error('Error en la solicitud de traducción.');
        }

        const datos = await respuesta.json();
        document.getElementById('textoTraducido').value = datos.translated_text;
    } catch (error) {
        console.error('Error al traducir:', error);
        alert('Ocurrió un error al traducir el texto. Revisa la consola para más detalles.');
    }
}
