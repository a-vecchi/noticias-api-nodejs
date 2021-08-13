import * as multer from 'multer';
import { MulterAzureStorage } from 'multer-azure-blob-storage';


const azureStorage: MulterAzureStorage = new MulterAzureStorage({
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=apitsnoticiasblob;AccountKey=z9BGlQGu6ZWCAQQyhJaa4UH9oFdAkgFyrcyYZ9C4kLxZW66fOM0rJZp1LcarE12LxEABg3wzk3zkQkUQuM5O2Q==;EndpointSuffix=core.windows.net',
    accessKey: 'z9BGlQGu6ZWCAQQyhJaa4UH9oFdAkgFyrcyYZ9C4kLxZW66fOM0rJZp1LcarE12LxEABg3wzk3zkQkUQuM5O2Q==',
    accountName: 'apitsnoticiasblob',
    containerName: 'apitsnoticiasblobupload',
    containerAccessLevel: 'blob',
    urlExpirationTime: 60
});

const uploadAzure = multer({ storage: azureStorage });

export default uploadAzure;