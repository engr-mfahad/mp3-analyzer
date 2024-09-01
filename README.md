# MP3 File Analysis App

## Overview

Mp3 file anaylsis app which looks for and parses the MPEG Version 1 Layer 3 file then responds back with the total number of audio frames in it.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Usage](#usage)
5. [Testing](#testing)

## Prerequisites

- **Node.js** (v18 or later)
- **npm** or **Yarn**
- **cURL** (for testing)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/engr-mfahad/mp3-analyzer.git
   cd mp3-analyzer
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

## Configuration

1. **Create a `.env` file:**

   ```sh
   cp .env.example .env
   ```

2. **Edit `.env` file:**

   ```dotenv
   # Setting any or all of them is totally optional.

   PORT=port-on-which-you-want-to-serve
   UPLOAD_DIR=directory-to-put-the-uploaded-mp3-file
   SAVE_UPLOADS=true-if-you-don't-want-the-app-to-remove-the-uploaded-mp3-file-after-processing
   ```

## Usage

1. **Build the project:**

   ```sh
   npm run build
   ```

2. **Run the application:**

   ```sh
   npm start
   ```

3. **Access the API:**

   Simply use the following URL to access and test it:
   `http://localhost:7000/file-upload`.

## Testing

Though any GUI application could be used for this purpose but I prefer CLI option and **`cURL`** is the simplest, versatile and the best.

To make it ease, there are also some sample media files included under the *`samples`* directory.

Here, I will try to cover the different possibilites so if you want to proceed with **`cURL`** just follow the steps below:

   ```sh
   cd samples/

   # requesting without attaching any file will cause the API to respond back with an error json having code attribute set to 'NO_FILE_UPLOADED'
   curl -X POST http://localhost:7000/file-upload

   # similar response as above but this time the issue is we're not setting the right form-field name that is, `audio`
   curl -F file=@sample.mp3 http://localhost:7000/file-upload

   # here the issue is there's no relevant MimeType set hence this too yields the same response
   curl -F audio=@sample.mp3 http://localhost:7000/file-upload

   # everything's as it should be therefore it will produce the required outcome that is, the frame count
   curl -F "audio=@sample.mp3; type=audio/mpeg" http://localhost:7000/file-upload
   ```
