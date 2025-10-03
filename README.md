# Local Testing Environment

This directory contains a self-contained environment for local testing of problem data from the main `DATA` directory.

## Purpose

The goal of this setup is to provide a way to visualize and test the problem data stored in `../DATA` without needing to run the full backend application stack. It works by running a minimal local server that reads the files directly from the `DATA` directory and a simple React frontend that displays this data.

## Components

1.  **`app.py`**: A lightweight Flask server that reads files from the `../DATA/data` directory and serves them over a simple API.
2.  **`app/`**: A React application that fetches data from the local server and displays it.

## Features Implemented

*   **Theme Switching & Persistence:** The frontend now supports light and dark themes, with your preference saved in local storage.
*   **Welcome Page:** A new landing page provides an introduction to the local viewer and navigation options.
*   **Header Navigation:** The header includes links to the Problems, Contests, and Solutions pages, and the title links back to the Welcome Page.
*   **Problem List Redesign:** The problems are displayed in a sortable table format, showing ID, Title (clickable to view details), Difficulty, Tags, Authors, and a link to view the Solution.
*   **Problem Detail Page:** A dedicated page to view the full details of a problem, including description, input/output, constraints, notes, and sample cases. Supports KaTeX rendering and copy-to-clipboard for sample data.
*   **Solution Detail Page:** A dedicated page to view the solution for a problem, accessible from the Problem Detail page or the Problem List.
*   **Contest List Redesign:** The contests are displayed in a sortable table format, showing ID, Name, Description, Start Time, End Time, Authors, and a dynamic Status (Scheduled, Running, Finished).
*   **Footer:** A simple footer is included at the bottom of the page.
*   **Ubuntu Font:** The application uses the Ubuntu font family for a consistent look.

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

This will start the frontend application and should automatically open a new tab in your browser at `http://localhost:3001`. The page will display the problems and contests it reads from your local `DATA` folder.
