# Local Testing Environment

This directory contains a self-contained environment for local testing of problem data from the main `DATA` directory.

## Purpose

The goal of this setup is to provide a way to visualize and test the problem data stored in `../DATA` without needing to run the full backend application stack. It works by running a minimal local server that reads the files directly from the `DATA` directory and a simple React frontend that displays this data.

## Components

1.  **`app.py`**: A lightweight Flask server that reads files from the `../DATA/data` directory and serves them over a simple API.
2.  **`app/`**: A React application that fetches data from the local server and displays it.

## Features Implemented

*   **Theme Switching & Persistence:** The frontend now supports light and dark themes, with your preference saved in local storage.
*   **Welcome Page:** A new landing page provides an introduction to the local viewer and navigation options, including links to Problems, Contests, Solutions, and a sample Test Case page.
*   **Header Navigation:** The header includes links to the Problems, Contests, Solutions, and a sample Test Cases page.
*   **Problem List Redesign:** The problems are displayed in a sortable table format.
*   **Contest List Redesign:** The contests are displayed in a sortable table format.
*   **Solutions List Page:** A new page at `/solutions` that lists all available solutions in a styled table.
*   **Collapsible Sections:** The Problem Detail (sample cases), Contest Detail (problem list), and Test Case Viewer pages now feature collapsible sections, which are collapsed by default to improve initial readability.
*   **Problem Detail Page:** A dedicated page to view the full details of a problem. Supports KaTeX rendering and copy-to-clipboard for sample data.
*   **Test Cases Viewer:** A dedicated page to view all sample and normal test cases for a problem, with a collapsible interface for easier navigation.
*   **Solution Detail Page:** A dedicated page to view the solution for a problem, which also displays the original authors of the problem.
*   **Contest Detail Page:** A new dedicated page to view the full details of a contest.
*   **Markdown and KaTeX Rendering:** Implemented robust Markdown and KaTeX rendering.
*   **Error Handling and Loading States:** Enhanced error handling and visual loading indicators.
*   **Dynamic Page Titles:** The browser tab title now dynamically updates to reflect the content of the current page.
*   **Data Provenance:** For enhanced clarity, the UI now displays the absolute file path for the directory of the currently viewed item (Problem, Contest, Test Case) and also shows the specific source file for each piece of data (e.g., `description.md`, `meta.json`).
*   **Developer Experience:** Each major component now displays its own component file path in the top-right corner, aiding in debugging and development.

## API Endpoints

All list endpoints return items sorted with the newest appearing first.

### Problems

*   `GET /problems`: Retrieves a list of all problems.
*   `GET /problems/<problem_id>`: Fetches detailed information for a specific problem. The response is a JSON object where each field (e.g., `description`, `input`, `meta`) is an object containing the `content` and its source `file_path`.
*   `GET /problems/<problem_id>/testcases`: Retrieves the sample and normal test cases. Each test case object in the response now includes its `name` (prefixed with `samples/` or `testcases/`), `input_file`, `output_file`, and the `absolute_path` of its directory.
*   `GET /problems/<problem_id>/contests`: Retrieves a list of contests that include the specified problem.

### Contests

*   `GET /contests`: Gets a list of all contests.
*   `GET /contests/<contest_id>`: Retrieves details for a single contest. The response is a JSON object where each field (e.g., `contest`, `theory`, `meta`) is an object containing the `content` and its source `file_path`.

### Solutions

*   `GET /solutions`: Retrieves a list of all available solution IDs.
*   `GET /solutions/<problem_id>`: Returns the solution for a specific problem. The response is a JSON object containing a `solution` object, which in turn holds the `content`, `file_path`, and the problem `authors`.

## Development Conventions

### CSS and Styling

To maintain a clean and scalable structure, the project follows these styling conventions:

*   **Component-Based CSS:** Every React component in `src/components` has its own dedicated folder.
*   **Theme Files:** Each component folder contains three CSS files:
    *   `index.css`: For common, theme-independent styles.
    *   `light.css`: For styles specific to the light theme.
    *   `dark.css`: For styles specific to the dark theme.
*   **Class Naming:** CSS classes follow a `component-name-classname` convention.

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

This will start the frontend application and should automatically open a new tab in your browser at `http://localhost:3001`.
