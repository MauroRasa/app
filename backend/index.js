const express = require('express')


app = express();

const port = process.env.PORT || 3000;






// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor Express en ejecución en el puerto ${port}`);
  });