import os
import json
from flask import Flask, jsonify, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# The absolute path to the DATA directory
DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'DATA', 'data'))

def read_file_content(path):
    """Helper function to read file content."""
    if not os.path.exists(path):
        return None
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

@app.route('/problems', methods=['GET'])
def get_problems():
    """Endpoint to get the list of all problems."""
    index_path = os.path.join(DATA_DIR, 'problems', 'index.json')
    content = read_file_content(index_path)
    if content is None:
        return jsonify({"error": "problems/index.json not found"}), 404
    data = json.loads(content)
    # Transform the dictionary into a list of objects, adding the id to each object
    problem_list = []
    for problem_id, details in data.items():
        details['id'] = problem_id
        problem_list.append(details)

    # Sort problems by ID, newest first (e.g., P11 before P1)
    sorted_list = sorted(problem_list, key=lambda x: int(x['id'][1:]), reverse=True)
    return jsonify(sorted_list)

@app.route('/problems/<string:problem_id>', methods=['GET'])
def get_problem_detail(problem_id):
    """Endpoint to get the details of a single problem."""
    problem_dir = os.path.join(DATA_DIR, 'problems', problem_id)
    if not os.path.isdir(problem_dir):
        return jsonify({"error": "Problem not found"}), 404

    def get_content_with_path(file_path):
        content = read_file_content(file_path)
        return {"content": content, "file_path": file_path if content else None}

    # --- Define all paths ---
    meta_path = os.path.join(problem_dir, 'meta.json')
    description_path = os.path.join(problem_dir, 'details', 'description.md')
    input_path = os.path.join(problem_dir, 'details', 'input.md')
    output_path = os.path.join(problem_dir, 'details', 'output.md')
    constraints_path = os.path.join(problem_dir, 'details', 'constraints.md')
    notes_path = os.path.join(problem_dir, 'details', 'notes.md')

    # --- Consolidate into a single response object ---
    problem_data = {}
    
    meta_content = read_file_content(meta_path)
    problem_data['meta'] = {"content": json.loads(meta_content) if meta_content else {}, "file_path": meta_path}

    problem_data['description'] = get_content_with_path(description_path)
    problem_data['input'] = get_content_with_path(input_path)
    problem_data['output'] = get_content_with_path(output_path)
    problem_data['constraints'] = get_content_with_path(constraints_path)
    problem_data['notes'] = get_content_with_path(notes_path)
    problem_data['absolute_path'] = problem_dir
    
    # --- Read sample cases ---
    samples_dir = os.path.join(problem_dir, 'details', 'samples')
    samples_data = []
    if os.path.isdir(samples_dir):
        for sample_folder in sorted(os.listdir(samples_dir)):
            sample_path = os.path.join(samples_dir, sample_folder)
            if os.path.isdir(sample_path):
                sample_input = read_file_content(os.path.join(sample_path, 'input.md'))
                sample_output = read_file_content(os.path.join(sample_path, 'output.md'))
                sample_desc = read_file_content(os.path.join(sample_path, 'description.md'))
                samples_data.append({
                    "input": sample_input,
                    "output": sample_output,
                    "description": sample_desc
                })
    problem_data['samples_data'] = samples_data

    return jsonify(problem_data)

@app.route('/solutions/<string:problem_id>', methods=['GET'])
def get_solution(problem_id):
    """Endpoint to get the solution of a single problem."""
    solution_path = os.path.join(DATA_DIR, 'solutions', problem_id, 'solution.md')
    content = read_file_content(solution_path)
    if content is None:
        return jsonify({"error": "Solution not found"}), 404

    # Also load the problem's authors
    meta_path = os.path.join(DATA_DIR, 'problems', problem_id, 'meta.json')
    meta_content = read_file_content(meta_path)
    authors = []
    if meta_content:
        meta_data = json.loads(meta_content)
        authors = meta_data.get('authors', [])

    return jsonify({"solution": {"content": content, "file_path": solution_path, "authors": authors}})

@app.route('/solutions', methods=['GET'])
def get_solutions():
    """Endpoint to get the list of all available solutions."""
    solutions_dir = os.path.join(DATA_DIR, 'solutions')
    if not os.path.isdir(solutions_dir):
        return jsonify({"error": "solutions directory not found"}), 404
    
    available_solutions = [d for d in os.listdir(solutions_dir) if os.path.isdir(os.path.join(solutions_dir, d))]
    # Sort solutions by ID, newest first
    sorted_solutions = sorted(available_solutions, key=lambda x: int(x[1:]), reverse=True)
    return jsonify(sorted_solutions)

@app.route('/contests', methods=['GET'])
def get_contests():
    """Endpoint to get the list of all contests."""
    index_path = os.path.join(DATA_DIR, 'contests', 'index.json')
    content = read_file_content(index_path)
    if content is None:
        return jsonify({"error": "contests/index.json not found"}), 404
    data = json.loads(content)
    # Sort contests by ID, newest first
    sorted_data = sorted(data, key=lambda x: int(x['id'][1:]), reverse=True)
    return jsonify(sorted_data)

@app.route('/contests/<string:contest_id>', methods=['GET'])
def get_contest_detail(contest_id):
    """Endpoint to get the details of a single contest."""
    contest_dir = os.path.join(DATA_DIR, 'contests', contest_id)
    if not os.path.isdir(contest_dir):
        return jsonify({"error": "Contest not found"}), 404

    def get_content_with_path(file_path, is_json=False):
        content = read_file_content(file_path)
        if content and is_json:
            content = json.loads(content)
        return {"content": content, "file_path": file_path if content else None}

    # --- Define all paths ---
    meta_path = os.path.join(contest_dir, 'meta.json')
    contest_path = os.path.join(contest_dir, 'contest.md')
    leaderboard_path = os.path.join(contest_dir, 'leaderboard.json')
    participants_path = os.path.join(contest_dir, 'participants.json')
    theory_path = os.path.join(contest_dir, 'theory.md')

    # --- Consolidate into a single response object ---
    contest_data = {}
    
    contest_data['meta'] = get_content_with_path(meta_path, is_json=True)
    contest_data['contest'] = get_content_with_path(contest_path)
    contest_data['leaderboard'] = get_content_with_path(leaderboard_path, is_json=True)
    contest_data['participants'] = get_content_with_path(participants_path, is_json=True)
    contest_data['theory'] = get_content_with_path(theory_path)
    contest_data['absolute_path'] = contest_dir

    return jsonify(contest_data)

@app.route('/problems/<string:problem_id>/testcases', methods=['GET'])
def get_testcases(problem_id):
    """Endpoint to get the testcases for a single problem."""
    problem_dir = os.path.join(DATA_DIR, 'problems', problem_id)
    if not os.path.isdir(problem_dir):
        return jsonify({"error": "Problem not found"}), 404

    def _read_cases_from_dir(directory, dir_type):
        """Helper to read all test cases from a directory."""
        cases = []
        if not os.path.isdir(directory):
            return cases

        dir_items = os.listdir(directory)
        has_subdirs = any(os.path.isdir(os.path.join(directory, item)) for item in dir_items)

        if has_subdirs:
            for case_folder in sorted(dir_items):
                case_path = os.path.join(directory, case_folder)
                if os.path.isdir(case_path):
                    input_content = read_file_content(os.path.join(case_path, 'input.md'))
                    output_content = read_file_content(os.path.join(case_path, 'output.md'))
                    cases.append({
                        "name": f"{dir_type}/{case_folder}",
                        "input": input_content,
                        "output": output_content,
                        "input_file": "input.md",
                        "output_file": "output.md",
                        "absolute_path": case_path
                    })
        else:
            # Handle flat file structure (e.g., 1.in, 1.out)
            in_files = sorted([f for f in dir_items if f.endswith('.in')])
            for in_file in in_files:
                name = os.path.splitext(in_file)[0]
                out_file = f"{name}.out"
                out_path = os.path.join(directory, out_file)
                if os.path.exists(out_path):
                    input_content = read_file_content(os.path.join(directory, in_file))
                    output_content = read_file_content(out_path)
                    cases.append({
                        "name": f"{dir_type}/{name}",
                        "input": input_content,
                        "output": output_content,
                        "input_file": in_file,
                        "output_file": out_file,
                        "absolute_path": directory
                    })
        return cases

    samples_dir = os.path.join(problem_dir, 'details', 'samples')
    testcases_dir = os.path.join(problem_dir, 'testcases')

    response_data = {
        "sample_cases": _read_cases_from_dir(samples_dir, 'samples'),
        "normal_cases": _read_cases_from_dir(testcases_dir, 'testcases')
    }

    return jsonify(response_data)


@app.route('/problems/<string:problem_id>/contests', methods=['GET'])
def get_problem_contests(problem_id):
    """Endpoint to find which contests a problem belongs to."""
    contests_index_path = os.path.join(DATA_DIR, 'contests', 'index.json')
    contests_content = read_file_content(contests_index_path)
    if contests_content is None:
        return jsonify([]) # Return empty list if no contests index

    all_contests = json.loads(contests_content)
    found_in_contests = []

    for contest_summary in all_contests:
        contest_id = contest_summary.get('id')
        if not contest_id:
            continue

        meta_path = os.path.join(DATA_DIR, 'contests', contest_id, 'meta.json')
        meta_content = read_file_content(meta_path)
        if meta_content:
            meta_data = json.loads(meta_content)
            if problem_id in meta_data.get('problems', []):
                found_in_contests.append(contest_summary)

    return jsonify(found_in_contests)


if __name__ == '__main__':
    # Running on port 5001 to avoid conflict with the main backend
    app.run(debug=True, port=5001)