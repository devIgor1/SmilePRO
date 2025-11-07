/**
 * AWS S3 Configuration
 *
 * Best Practices:
 * - Centralized configuration
 * - Environment variable validation
 * - Type safety
 * - Error handling for missing credentials
 */

import { S3Client } from "@aws-sdk/client-s3";

// Validate required environment variables at startup
const requiredEnvVars = [
  "AWS_REGION",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_S3_BUCKET_NAME",
] as const;

// Check for missing environment variables
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required AWS environment variables: ${missingVars.join(", ")}\n` +
      "Please add them to your .env file"
  );
}

// Export validated config
export const s3Config = {
  region: process.env.AWS_REGION!,
  bucketName: process.env.AWS_S3_BUCKET_NAME!,
  // CloudFront distribution (optional, for faster delivery)
  cloudFrontUrl: process.env.AWS_CLOUDFRONT_URL || null,
} as const;

/**
 * S3 Client Instance
 *
 * Why singleton pattern?
 * - Reuses TCP connections
 * - Better performance
 * - Less memory usage
 */
export const s3Client = new S3Client({
  region: s3Config.region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
