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
    return jsonify(json.loads(content))

@app.route('/problems/<string:problem_id>', methods=['GET'])
def get_problem_detail(problem_id):
    """Endpoint to get the details of a single problem."""
    problem_dir = os.path.join(DATA_DIR, 'problems', problem_id)
    if not os.path.isdir(problem_dir):
        return jsonify({"error": "Problem not found"}), 404

    # --- Read all the necessary files ---
    meta_path = os.path.join(problem_dir, 'meta.json')
    description_path = os.path.join(problem_dir, 'details', 'description.md')
    input_path = os.path.join(problem_dir, 'details', 'input.md')
    output_path = os.path.join(problem_dir, 'details', 'output.md')
    constraints_path = os.path.join(problem_dir, 'details', 'constraints.md')
    notes_path = os.path.join(problem_dir, 'details', 'notes.md')

    # --- Consolidate into a single response object ---
    problem_data = {}
    
    meta_content = read_file_content(meta_path)
    problem_data['meta'] = json.loads(meta_content) if meta_content else {}

    problem_data['description_content'] = read_file_content(description_path)
    problem_data['input_content'] = read_file_content(input_path)
    problem_data['output_content'] = read_file_content(output_path)
    problem_data['constraints_content'] = read_file_content(constraints_path)
    problem_data['notes_content'] = read_file_content(notes_path)
    
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

@app.route('/contests', methods=['GET'])
def get_contests():
    """Endpoint to get the list of all contests."""
    index_path = os.path.join(DATA_DIR, 'contests', 'index.json')
    content = read_file_content(index_path)
    if content is None:
        return jsonify({"error": "contests/index.json not found"}), 404
    return jsonify(json.loads(content))

@app.route('/contests/<string:contest_id>', methods=['GET'])
def get_contest_detail(contest_id):
    """Endpoint to get the details of a single contest."""
    contest_dir = os.path.join(DATA_DIR, 'contests', contest_id)
    if not os.path.isdir(contest_dir):
        return jsonify({"error": "Contest not found"}), 404

    # --- Read all the necessary files ---
    meta_path = os.path.join(contest_dir, 'meta.json')
    contest_path = os.path.join(contest_dir, 'contest.md')
    leaderboard_path = os.path.join(contest_dir, 'leaderboard.json')
    participants_path = os.path.join(contest_dir, 'participants.json')
    theory_path = os.path.join(contest_dir, 'theory.md')

    # --- Consolidate into a single response object ---
    contest_data = {}
    
    meta_content = read_file_content(meta_path)
    contest_data['meta'] = json.loads(meta_content) if meta_content else {}

    contest_data['contest_content'] = read_file_content(contest_path)
    
    leaderboard_content = read_file_content(leaderboard_path)
    contest_data['leaderboard'] = json.loads(leaderboard_content) if leaderboard_content else {}

    participants_content = read_file_content(participants_path)
    contest_data['participants'] = json.loads(participants_content) if participants_content else {}

    contest_data['theory_content'] = read_file_content(theory_path)

    return jsonify(contest_data)

if __name__ == '__main__':
    # Running on port 5001 to avoid conflict with the main backend
    app.run(debug=True, port=5001)
