# Deploying to AWS

The production site is a static Next.js export hosted in the
`hcs-website-latest` S3 bucket and served through CloudFront.

## Required access

Use an HCS AWS SSO/IAM role that can:

- list the `hcs-website-latest` bucket;
- read, upload, and delete objects in that bucket; and
- view the website's CloudFront distribution and create invalidations.

GitHub access alone does not grant access to AWS. Do not share AWS passwords or
access keys; ask an HCS AWS administrator to assign the appropriate role.

## CloudFront prerequisites

The export uses directory indexes: `/about/` is stored as
`about/index.html`. The CloudFront distribution must therefore:

- use `index.html` as its default root object; and
- resolve a directory request such as `/about/` to `about/index.html`.

An S3 website endpoint performs the directory-index lookup. A private S3 REST
origin does not, so that setup needs a CloudFront viewer-request function that
appends `index.html` to paths ending in `/`. It should also map missing-origin
responses to `/404.html` if the distribution is expected to show the exported
404 page.

## Build and verify

Use Node.js 22.13 or newer and build from the repository root:

```sh
npm ci
npm run lint
npm run build
```

The build must finish successfully and create `out/index.html`. It also creates
one directory per route, such as `out/about/index.html`.

Preview the exported site before uploading it:

```sh
python3 -m http.server 4173 --directory out
```

Open <http://localhost:4173> and check the home page, `/about/`, `/board/`,
`/contact/`, and `/initiatives/`.

## Deploy with the AWS console

1. Sign in to the HCS AWS account and open the `hcs-website-latest` S3 bucket.
2. Confirm that the current deployment can be recovered. Check bucket versioning
   or make a backup before deleting production objects.
3. Delete the current objects and wait for the deletion to finish.
4. Choose **Upload** and upload everything _inside_ `out/` to the bucket root.
   Do not upload `out/` itself, or the site will be placed under an `out/` prefix.
5. Open the CloudFront distribution for `hcs.harvard.edu`, select
   **Invalidations**, choose **Create invalidation**, and enter `/*`.
6. Wait for the invalidation to complete, then verify all public routes.

## Deploy with the AWS CLI

First confirm the active AWS identity and preview the S3 changes:

```sh
aws sts get-caller-identity
aws s3 sync out/ s3://hcs-website-latest/ --delete --dryrun
```

Review the dry-run output carefully. When it contains only the intended changes,
run the real synchronization:

```sh
aws s3 sync out/ s3://hcs-website-latest/ --delete
```

Then invalidate the distribution, replacing `DISTRIBUTION_ID` with the actual
CloudFront distribution ID:

```sh
aws cloudfront create-invalidation \
  --distribution-id DISTRIBUTION_ID \
  --paths "/*"
```

The `--delete` synchronization removes remote files that are absent from the new
build. Never run it until the dry-run output and AWS account identity are correct.
