# Local Testing Environment

This directory contains a self-contained environment for local testing of problem data from the main `DATA` directory.

## Purpose

The goal of this setup is to provide a way to visualize and test the problem data stored in `../DATA` without needing to run the full backend application stack. It works by running a minimal local server that reads the files directly from the `DATA` directory and a simple React frontend that displays this data.

## Components

1.  **`server.py`**: A lightweight Flask server that reads files from the `../DATA/data` directory and serves them over a simple API.
2.  **`app/`**: A React application that fetches data from the local server and displays it.

## How to Run

You need to have two terminals open to run this environment.

### 1. Start the Local Data Server

In your first terminal, navigate to this directory and run the Python server:

```bash
# In E:\NEW\local-testing-for-annaforces
python app.py
```

This will start the data server on `http://localhost:5001`. Keep this terminal running.

### 2. Start the Local Frontend

In your second terminal, navigate to the `app` directory and run the React development server:

```bash
# In E:\NEW\local-testing-for-annaforces\app
npm start
```

This will start the frontend application and should automatically open a new tab in your browser at `http://localhost:3001`. The page will display the problems it reads from your local `DATA` folder.
