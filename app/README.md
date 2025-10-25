# Local Problem Viewer Frontend

This React application is a lightweight frontend designed for local testing.

## Data Source

This application fetches all its data from the minimal local server (`app.py`) located in the parent directory.

- When running **manually**, the server must be running on `http://localhost:5001`.
- When running with **Docker**, the frontend container automatically connects to the backend service at `http://backend:5001` thanks to the Docker network defined in `docker-compose.yml`.

## Docker

This project can be run easily using Docker. For detailed instructions, please see the `README.md` file in the parent directory (`local-testing-for-annaforces`).

## Features Implemented

*   **Theme Switching & Persistence:** Supports light and dark themes with local storage persistence.
*   **Welcome Page & Navigation:** A landing page and a full header with navigation links to Problems, Contests, Solutions, and a sample Test Cases page.
*   **Problem List & Detail:** A sortable table of problems, leading to a detail page with full problem information and collapsible sample cases.
*   **Contest List & Detail:** A sortable table of contests, leading to a detail page with full contest information and a collapsible problem list.
*   **Solutions List & Detail:** A styled table of all available solutions, leading to a detail page for each solution which also shows the problem authors.
*   **Test Cases Viewer:** A dedicated page to view all test cases for a problem, featuring a collapsible interface.
*   **Collapsible by Default:** All collapsible sections (sample cases, problem lists, test cases) are now collapsed by default for a cleaner initial view.
*   **Markdown and KaTeX Rendering:** Ensures correct display of mathematical and formatted text.
*   **Data Provenance:** The UI displays the absolute file path for the directory of the item being viewed (Problem, Contest, Test Case) and also shows the specific source file for each piece of data (e.g., `description.md`).
*   **Developer Experience:** Each major component displays its own file path in the top-right corner to aid in development and debugging.
*   **How to Use Page:** A dedicated page, accessible from the footer, that explains the features and purpose of the application.
*   **Credits Page:** A page with detailed credits, accessible from the footer.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

**Prerequisite:** Ensure the local data server is running first by executing `python app.py` from the parent `local-testing-for-annaforces` directory.

The page will reload if you make edits.
You will also see any lint errors in the console.