if("serviceWorker" in navigator){
    navigator.serviceWorker.register('./sw.js')
        .then(registrado => console.log('Se registró correctamente...', registrado))
        .catch(error => console.log('Error al registrar', error))
} else{
    console.log('Service worker no soportado')
}