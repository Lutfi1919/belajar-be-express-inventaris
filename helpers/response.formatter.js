module.exports = {
    // response : key object atau yg akan dipanggil pas export/require di file lain

    // sebelum titik dua = method/functionnya
    // setelah titik dua = parameter-nya
    response: (status, message, data) => {
        if (data) {
            // kalau responsenya ada data
            return {
                status: status,
                message: message,
                data: data,
            }
        } else {
            // kalau response gaada data (misal error) hasil di postmannya jgn kirim key di jsonnya
            return {
                status: status,
                message: message,
            }
        }
    }
}

// pas di file lain kalo mau pakai kodingan diatas =
// const { response } = require('response.formatter.js')