import os
import json
import re
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
    """Endpoint to get the list of all problems from all contests."""
    all_problems = []
    contests_dir = os.path.join(DATA_DIR, 'contests')
    if not os.path.isdir(contests_dir):
        return jsonify({"error": "contests directory not found"}), 404

    for contest_id in os.listdir(contests_dir):
        contest_path = os.path.join(contests_dir, contest_id)
        if os.path.isdir(contest_path):
            problems_dir = os.path.join(contest_path, 'problems')
            if os.path.isdir(problems_dir):
                for problem_folder in os.listdir(problems_dir):
                    problem_path = os.path.join(problems_dir, problem_folder)
                    if os.path.isdir(problem_path):
                        meta_path = os.path.join(problem_path, 'meta.json')
                        meta_content = read_file_content(meta_path)
                        if meta_content:
                            try:
                                problem_details = json.loads(meta_content)
                                all_problems.append(problem_details)
                            except json.JSONDecodeError:
                                continue

    sorted_list = sorted(all_problems, key=lambda x: x.get('id', ''), reverse=True)
    return jsonify(sorted_list)

@app.route('/problems/<string:problem_id>', methods=['GET'])
def get_problem_detail(problem_id):
    """Endpoint to get the details of a single problem."""
    match = re.match(r"C(\d+)([A-Z]+)", problem_id)
    if not match:
        return jsonify({"error": "Invalid problem_id format"}), 400
    
    contest_id_num = match.group(1)
    problem_letter = match.group(2)
    contest_id = f"C{contest_id_num}"

    problem_dir = os.path.join(DATA_DIR, 'contests', contest_id, 'problems', problem_letter)
    if not os.path.isdir(problem_dir):
        return jsonify({"error": "Problem not found"}), 404

    def get_content_with_path(file_path):
        content = read_file_content(file_path)
        return {"content": content, "file_path": file_path if content else None}

    def parse_problem_md(problem_md_content):
        sections = {
            'description': '',
            'input': '',
            'output': '',
            'constraints': '',
            'notes': ''
        }
        if not problem_md_content:
            return sections

        lines = problem_md_content.split('\n')
        current_section = None
        for line in lines:
            if line.startswith('## '):
                section_name = line[3:].strip().lower().replace(' ', '_')
                if section_name in sections:
                    current_section = section_name
                else:
                    current_section = None
            elif current_section:
                sections[current_section] += line + '\n'
        
        for section in sections:
            sections[section] = sections[section].strip()

        return sections

    meta_path = os.path.join(problem_dir, 'meta.json')
    problem_md_path = os.path.join(problem_dir, 'problem.md')

    problem_data = {}
    
    meta_content = read_file_content(meta_path)
    problem_data['meta'] = {"content": json.loads(meta_content) if meta_content else {}, "file_path": meta_path}
    
    problem_md_content = read_file_content(problem_md_path)
    parsed_md = parse_problem_md(problem_md_content)

    problem_data['description'] = {"content": parsed_md.get('description'), "file_path": problem_md_path}
    problem_data['input'] = {"content": parsed_md.get('input'), "file_path": problem_md_path}
    problem_data['output'] = {"content": parsed_md.get('output'), "file_path": problem_md_path}
    problem_data['constraints'] = {"content": parsed_md.get('constraints'), "file_path": problem_md_path}
    problem_data['notes'] = {"content": parsed_md.get('notes'), "file_path": problem_md_path}

    problem_data['absolute_path'] = problem_dir
    
    samples_dir = os.path.join(problem_dir, 'samples')
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

    match = re.match(r"C(\d+)([A-Z]+)", problem_id)
    if not match:
        return jsonify({"error": "Invalid problem_id format"}), 400
    
    contest_id_num = match.group(1)
    problem_letter = match.group(2)
    contest_id = f"C{contest_id_num}"

    meta_path = os.path.join(DATA_DIR, 'contests', contest_id, 'problems', problem_letter, 'meta.json')
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
    sorted_solutions = sorted(available_solutions, key=lambda x: x, reverse=True)
    return jsonify(sorted_solutions)

@app.route('/contests', methods=['GET'])
def get_contests():
    """Endpoint to get the list of all contests."""
    contests_dir = os.path.join(DATA_DIR, 'contests')
    if not os.path.isdir(contests_dir):
        return jsonify({"error": "contests directory not found"}), 404
    
    all_contests = []
    for contest_id in os.listdir(contests_dir):
        contest_path = os.path.join(contests_dir, contest_id)
        if os.path.isdir(contest_path):
            meta_path = os.path.join(contest_path, 'meta.json')
            meta_content = read_file_content(meta_path)
            if meta_content:
                try:
                    contest_details = json.loads(meta_content)
                    all_contests.append(contest_details)
                except json.JSONDecodeError:
                    continue

    sorted_data = sorted(all_contests, key=lambda x: x.get('id', ''), reverse=True)
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

    meta_path = os.path.join(contest_dir, 'meta.json')
    contest_path = os.path.join(contest_dir, 'contest.md')
    rules_path = os.path.join(contest_dir, 'rules.md')
    theory_path = os.path.join(contest_dir, 'theory.md')

    contest_data = {}
    
    contest_data['meta'] = get_content_with_path(meta_path, is_json=True)
    contest_data['contest'] = get_content_with_path(contest_path)
    contest_data['rules'] = get_content_with_path(rules_path)
    contest_data['theory'] = get_content_with_path(theory_path)
    contest_data['absolute_path'] = contest_dir

    return jsonify(contest_data)

@app.route('/problems/<string:problem_id>/testcases', methods=['GET'])
def get_testcases(problem_id):
    """Endpoint to get the testcases for a single problem."""
    match = re.match(r"C(\d+)([A-Z]+)", problem_id)
    if not match:
        return jsonify({"error": "Invalid problem_id format"}), 400
    
    contest_id_num = match.group(1)
    problem_letter = match.group(2)
    contest_id = f"C{contest_id_num}"

    problem_dir = os.path.join(DATA_DIR, 'contests', contest_id, 'problems', problem_letter)
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

    samples_dir = os.path.join(problem_dir, 'samples')
    testcases_dir = os.path.join(problem_dir, 'testcases')

    response_data = {
        "sample_cases": _read_cases_from_dir(samples_dir, 'samples'),
        "normal_cases": _read_cases_from_dir(testcases_dir, 'testcases')
    }

    return jsonify(response_data)


@app.route('/problems/<string:problem_id>/contests', methods=['GET'])
def get_problem_contests(problem_id):
    """Endpoint to find which contests a problem belongs to."""
    match = re.match(r"C(\d+)([A-Z]+)", problem_id)
    if not match:
        return jsonify({"error": "Invalid problem_id format"}), 400
    
    contest_id_num = match.group(1)
    contest_id = f"C{contest_id_num}"

    contest_dir = os.path.join(DATA_DIR, 'contests', contest_id)
    if not os.path.isdir(contest_dir):
        return jsonify({"error": "Contest not found"}), 404

    meta_path = os.path.join(contest_dir, 'meta.json')
    meta_content = read_file_content(meta_path)
    if meta_content:
        try:
            contest_details = json.loads(meta_content)
            return jsonify([contest_details])
        except json.JSONDecodeError:
            return jsonify({"error": "Invalid contest meta.json"}), 500
    
    return jsonify([])


if __name__ == '__main__':
    app.run(debug=True, port=5001)
