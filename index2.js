import uploadAzure from './uploadAzure';

app.post('/', uploadAzure.single('file'), (req, res) => {
    if (!req.file) {
        res.send('Erro ao fazer upload do arquivo!');
    } else {
        res.send('Arquivo enviado com sucesso!');
    }
})