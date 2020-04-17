# Cloudflare Workers

## What is it?

A Cloudflare Workers application, that will randomly send users to one of two webpages in A/B testing style, where the redirection URL is obtained using the Fetch API. 

## Get Started

### 1. Install the workers command-line tool wrangler.

The Workers Quick Start in the documentation shows how to get started with Wrangler, creating a project, and configuring and deploying it. We highly recommend that you spend time reading and following along with this guide!

To begin, install the [Wrangler](https://github.com/cloudflare/wrangler) command-line tool.

### 2. Deploy your application

Using wrangler's `publish` command, you can deploy your application and make it available under your workers.dev subdomain.

## Reference

- [Workers Quick Start documentation](https://developers.cloudflare.com/workers/quickstart/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [HTMLRewriter](https://developers.cloudflare.com/workers/reference/apis/html-rewriter/)
- [Cookie documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
