import { Injectable } from '@angular/core';
// import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  uploadFile(file: { type: any; name: any; }, fileName: any) {
    const contentType = file.type;
    const bucket = new S3(
          {
              accessKeyId: environment.accessKeyId,
              secretAccessKey: environment.secretAccessKey,
              region: environment.region
          }
      );
      const params = {
          Bucket: environment.bucketName,
          Key: fileName,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType
      };
      bucket.upload(params, function (err: any, data: any) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }
          console.log('Successfully uploaded file.', data);
          return true;
      });
  }

}
