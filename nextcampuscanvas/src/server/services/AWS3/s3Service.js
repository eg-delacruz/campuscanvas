import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const generateUniqueFileName = (file) => {
  const generate_random_8_digits_id = () => {
    return Math.floor(10000000 + Math.random() * 90000000);
  };
  const date_ISO8601 = new Date().toISOString().split('T')[0];

  const unique_name = `${date_ISO8601}-${generate_random_8_digits_id()}-${
    file.originalname
  }`;
  return unique_name;
};

export async function s3Uploadv3_stu_id_files(files) {
  try {
    let uploaded_files = [];
    const AWS_STUDENT_IDS_BASE_URL = process.env.AWS_STUDENT_IDS_BASE_URL;
    const s3client = new S3Client({
      region: process.env.CC_AWS_REGION,
      credentials: {
        accessKeyId: process.env.CC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.CC_AWS_SECRET_ACCESS_KEY,
      },
    });

    const params = files.map((file) => {
      const unique_file_name = generateUniqueFileName(file);
      uploaded_files.push({
        name: unique_file_name,
        URL: `${AWS_STUDENT_IDS_BASE_URL}${unique_file_name}`,
      });
      return {
        Bucket: process.env.CC_AWS_BUCKET_NAME,
        //Base strage folder/name of the file
        Key: `student_ids/${unique_file_name}`,
        Body: file.buffer,
      };
    });

    //Returns the results
    await Promise.all(
      params.map((param) => s3client.send(new PutObjectCommand(param)))
    );
    //Also check what other info is required to erase a file and return it here
    return uploaded_files;
  } catch (error) {
    throw new Error(error.message);
  }
}

//OBSERVATION:
//Consider that the uploaded files to this bucket are all available for public
//access. It shouldn't be like this in case we need to store contracts in AWS,
//since sensitive data
