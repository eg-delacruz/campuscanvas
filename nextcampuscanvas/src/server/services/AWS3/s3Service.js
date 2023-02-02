//https://www.youtube.com/watch?v=jwp4U6v-3h4
//Guide of how to upload filest to AWS3

import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

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

//TODO: implement this function when uploading any files to avoid empty space problems if images has to be displayed in html tags
const replaceAllWhiteSpacesBy_ = (string) => {
  return string.replaceAll(/\s/g, '_');
};

//Create service client object
const s3client = new S3Client({
  region: process.env.CC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.CC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.CC_AWS_SECRET_ACCESS_KEY,
  },
});

//Files must be an array. The "v" comes from version
export async function s3Uploadv3_stu_id_files(files) {
  try {
    //Will return the URLs to store in DB
    let uploaded_files = [];
    //Needed for URL generation
    //TODO: use the CC_AWS_BUCKET_BASE_URL var instead of this one only for students, and erase the students one in .env and in vercel
    const AWS_STUDENT_IDS_BASE_URL = process.env.AWS_STUDENT_IDS_BASE_URL;

    //This object will be maped to send each file
    const params = files.map((file) => {
      const unique_file_name = generateUniqueFileName(file);
      //Saving storage reference
      uploaded_files.push({
        name: unique_file_name,
        URL: `${AWS_STUDENT_IDS_BASE_URL}${unique_file_name}`,
      });

      return {
        Bucket: process.env.CC_AWS_BUCKET_NAME,
        //Base storage folder/name of the file
        Key: `student_ids/${unique_file_name}`,
        ContentDisposition: 'inline',
        ContentType: file.mimetype,
        Body: file.buffer,
      };
    });

    //Returns the results
    await Promise.all(
      params.map((param) => s3client.send(new PutObjectCommand(param)))
    );
    return uploaded_files;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

//Files must be an array. The "v" comes from version
export async function s3Deletev3_stu_id_files(files) {
  try {
    //This object will be maped to delete each file
    const params = files.map((file) => {
      return {
        Bucket: process.env.CC_AWS_BUCKET_NAME,
        //Base storage folder/name of the file
        Key: `student_ids/${file.name}`,
      };
    });

    await Promise.all(
      params.map((param) => s3client.send(new DeleteObjectCommand(param)))
    );
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function s3Uploadv3_brand_logos(files) {
  try {
    let uploaded_files = [];

    const AWS_BRAND_LOGOS_BASE_URL =
      process.env.CC_AWS_BUCKET_BASE_URL + 'brand_logos/';

    const params = files.map((file) => {
      const unique_file_name = generateUniqueFileName(file);

      //Saving storage reference
      uploaded_files.push({
        name: unique_file_name,
        URL: `${AWS_BRAND_LOGOS_BASE_URL}${unique_file_name}`,
      });

      return {
        Bucket: process.env.CC_AWS_BUCKET_NAME,
        //Base storage folder/name of the file
        Key: `brand_logos/${unique_file_name}`,
        ContentDisposition: 'inline',
        ContentType: file.mimetype,
        Body: file.buffer,
      };
    });

    //Returns the results
    await Promise.all(
      params.map((param) => s3client.send(new PutObjectCommand(param)))
    );
    return uploaded_files;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function s3Uploadv3_discount_banners(files) {
  try {
    let uploaded_files = [];

    const AWS_DISCOUNT_BANNERS_BASE_URL =
      process.env.CC_AWS_BUCKET_BASE_URL + 'discount_banners/';

    const params = files.map((file) => {
      const unique_file_name = generateUniqueFileName(file);

      //Saving storage reference
      uploaded_files.push({
        name: unique_file_name,
        URL: `${AWS_DISCOUNT_BANNERS_BASE_URL}${unique_file_name}`,
      });

      return {
        Bucket: process.env.CC_AWS_BUCKET_NAME,
        //Base storage folder/name of the file
        Key: `discount_banners/${unique_file_name}`,
        ContentDisposition: 'inline',
        ContentType: file.mimetype,
        Body: file.buffer,
      };
    });

    //Returns the results
    await Promise.all(
      params.map((param) => s3client.send(new PutObjectCommand(param)))
    );
    return uploaded_files;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function s3Uploadv3_big_home_slider_images(files) {
  try {
    let uploaded_files = [];

    const AWS_BIG_HOME_SLIDER_IMAGES_BASE_URL =
      process.env.CC_AWS_BUCKET_BASE_URL + 'big_home_slider_images/';

    const params = files.map((file) => {
      const unique_file_name = generateUniqueFileName(file);

      //Saving storage reference
      uploaded_files.push({
        name: unique_file_name,
        URL: `${AWS_BIG_HOME_SLIDER_IMAGES_BASE_URL}${unique_file_name}`,
      });

      return {
        Bucket: process.env.CC_AWS_BUCKET_NAME,
        //Base storage folder/name of the file
        Key: `big_home_slider_images/${unique_file_name}`,
        ContentDisposition: 'inline',
        ContentType: file.mimetype,
        Body: file.buffer,
      };
    });

    //Returns the results
    await Promise.all(
      params.map((param) => s3client.send(new PutObjectCommand(param)))
    );
    return uploaded_files;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function s3Uploadv3_small_home_slider_images(files) {
  try {
    let uploaded_files = [];

    const AWS_SMALL_HOME_SLIDER_IMAGES_BASE_URL =
      process.env.CC_AWS_BUCKET_BASE_URL + 'small_home_slider_images/';

    const params = files.map((file) => {
      const unique_file_name = generateUniqueFileName(file);

      //Saving storage reference
      uploaded_files.push({
        name: unique_file_name,
        URL: `${AWS_SMALL_HOME_SLIDER_IMAGES_BASE_URL}${unique_file_name}`,
      });

      return {
        Bucket: process.env.CC_AWS_BUCKET_NAME,
        //Base storage folder/name of the file
        Key: `small_home_slider_images/${unique_file_name}`,
        ContentDisposition: 'inline',
        ContentType: file.mimetype,
        Body: file.buffer,
      };
    });

    //Returns the results
    await Promise.all(
      params.map((param) => s3client.send(new PutObjectCommand(param)))
    );
    return uploaded_files;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

//Files must be an array. The "v" comes from version
export async function s3Deletev3_discount_banners(files) {
  try {
    //This object will be maped to delete each file
    const params = files.map((file) => {
      return {
        Bucket: process.env.CC_AWS_BUCKET_NAME,
        //Base storage folder/name of the file
        Key: `discount_banners/${file}`,
      };
    });

    await Promise.all(
      params.map((param) => s3client.send(new DeleteObjectCommand(param)))
    );
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

//Files must be an array. The "v" comes from version
export async function s3Deletev3_big_home_slider_images(files) {
  try {
    //This object will be maped to delete each file
    const params = files.map((file) => {
      return {
        Bucket: process.env.CC_AWS_BUCKET_NAME,
        //Base storage folder/name of the file
        Key: `big_home_slider_images/${file}`,
      };
    });

    await Promise.all(
      params.map((param) => s3client.send(new DeleteObjectCommand(param)))
    );
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
//Files must be an array. The "v" comes from version
export async function s3Deletev3_small_home_slider_images(files) {
  try {
    //This object will be maped to delete each file
    const params = files.map((file) => {
      return {
        Bucket: process.env.CC_AWS_BUCKET_NAME,
        //Base storage folder/name of the file
        Key: `small_home_slider_images/${file}`,
      };
    });

    await Promise.all(
      params.map((param) => s3client.send(new DeleteObjectCommand(param)))
    );
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

//OBSERVATION:
//Consider that the uploaded files to this bucket are all available for public
//access. It shouldn't be like this in case we need to store contracts in AWS,
//since sensitive data.
