const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "eu-north-1";
// Credentials are automatically resolved using the AWS SDK credential provider chain.
// For more information, see https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html
// Create SES service object.
console.log("ACCESS KEY:", process.env.AWS_ACCESS_KEY);
console.log("SECRET KEY:", process.env.AWS_SECRET_ACCESS_KEY);

const sesClient = new SESClient({ region: REGION ,credentials:{
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
}});

module.exports= { sesClient };
// snippet-end:[ses.JavaScript.createclientv3]