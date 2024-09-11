
# AI Interviewer - Real-Time Interviews for Smarter Recruitment

This project is an AI-driven application designed to automate real-time interviews, allowing recruiters to evaluate candidates more efficiently.

## First Steps

Ensure you have **Node.js** installed to run `npm`. You can download Node.js from [here](https://nodejs.org/).

Run `npm install` to install all the dependencies.

Run `cp .env.example .env` and add your API keys for OpenAI and 11Labs:

```
REACT_APP_OPENAI_API_KEY='your_openai_key'
REACT_APP_LABS_API_KEY='your_elevenlabs_key'
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder. It bundles React in production mode and optimizes the build for the best performance.

### `serve -s build`

You may serve `build` folder with a static server

## Features

- **AI-Driven Interviews**: Automatically generates interview questions based on job descriptions.
- **Voice Input**: Real-time speech recognition using the Web Speech API for a seamless experience.
- **Real-Time Feedback**: Get immediate analysis of candidate responses.
- **PDF Export**: Export interview data as PDFs.
- **Multilingual Support**: Conduct interviews in multiple languages by adjusting the settings.

## Folder Structure

The project structure is as follows:

```
├── public                   # Public directory (static assets)
├── src                      # Source files
│   ├── api                  # API requests (OpenAI, 11Labs)
│   ├── components           # Reusable UI components
│   ├── hooks                # Custom React hooks
│   ├── pages                # Main pages (HomePage, InterviewPage)
│   ├── styles               # Global CSS and Tailwind configuration
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point for React app
├── .env.example             # Example environment configuration file
├── package.json             # Project dependencies and scripts
└── README.md                # Project description and instructions
```

## Tech Stack

- **React**: Frontend framework
- **Tailwind CSS**: Utility-first CSS for styling
- **React Speech Recognition**: Voice recognition with the Web Speech API
- **Axios**: HTTP requests to OpenAI and 11Labs
- **OpenAI API**: AI-generated questions and responses
- **11Labs API**: Voice synthesis
- **React Router**: Navigation and routing between pages
- **UUID**: Unique identifiers for interviews
- **dotenv**: Managing environment variables
- **React-to-PDF**: Exporting data to PDF format
- **PostCSS & Autoprefixer**: CSS processing and optimization

## Deployment

Build the app using `npm run build` and deploy the contents of the `build` folder to any hosting service, or use platforms like Vercel, Netlify, or Heroku for quick deployment.


## Author

Created by Oleksandr Dashko. For inquiries, contact leksdashko@gmail.com
