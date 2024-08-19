from flask import Flask, jsonify, request
from flask_cors import CORS
from dataclasses import dataclass
from typing import List, Optional
from bs4 import BeautifulSoup
import requests
from problems import *
import random

app = Flask(__name__)
CORS(app)

@dataclass
class Problem:
    contestId: Optional[int]
    name: Optional[str]
    tags: List[str]
    rating: Optional[int]
    statement: Optional[str]
    time_lim: Optional[int]
    mem_lim: Optional[int]
    input: Optional[str]
    output: Optional[str]
    link: Optional[str]

@app.route('/url', methods=['GET'])
def get_data_from_url():
    url = request.args.get('problemLink')
    if not url:
        return jsonify({'error': 'Missing problemLink parameter'}), 400

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract the <div class="problem-statement"> as raw HTML
        problem_statement_div = soup.find('div', class_='problem-statement')
        if problem_statement_div:
            rawHtml = '<div class="problem-statement">' + problem_statement_div.decode_contents() + '<div>'
            # Return the raw HTML content of the problem statement div
            data = extract_problem_info(rawHtml)
            dataInfo = fetch_problem_info(url)
            if 'rating' in dataInfo['problem']:
                data['rating'] = dataInfo['problem']['rating']
            data['input'] = data['input'][5:]
            data['output'] = data['output'][6:]
            data['contestId'] = dataInfo['problem']['contestId']
            data['name'] = dataInfo['problem']['name']
            data['tags'] = dataInfo['problem']['tags']
            data['link'] = url
            return data
        else:
            return jsonify({'error': 'Problem statement not found'}), 404
    else:
        return jsonify({'error': 'Failed to fetch problems from Codeforces'}), response.status_code

@app.route('/tags', methods=['GET'])
def fetch_problem_tags():
    codeforces_api_url = 'https://codeforces.com/api/problemset.problems'
    response = requests.get(codeforces_api_url)
    if response.status_code == 200:
        data = response.json()
        # Extracting tags from all problems
        tags = set()
        for problem in data['result']['problems']:
            for tag in problem['tags']:
                tags.add(tag)
        return list(tags), 200
    else:
        return {'error': 'Failed to fetch problems from Codeforces'}, response.status_code

def fetch_all_problems() -> dict:
    url = 'https://codeforces.com/api/problemset.problems'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    return {"error": "Failed to fetch problems"}, response.status_code

@app.route('/random', methods=['GET'])
def getRandomProblem():
    # Create a sample Problem instance with default values
    badProblem = {
        "contestId":0,
        "name":None,
        "tags":[],
        "rating":0,
        "statement":None,
        "time_lim":0,
        "mem_lim":0,
        "input":None,
        "output":None,
        "link":None
    }
    
    initProblem = badProblem.copy()
    
    # Update problem_dict with request arguments
    for key in request.args.keys():
        initProblem[key] = request.args.get(key)

    all_problems_response = fetch_all_problems()
    if 'error' in all_problems_response:
        return jsonify({'error': all_problems_response['error']}), 500
    
    problems = all_problems_response.get('result', {}).get('problems', [])
    
    filtered_problems = []
    for problem in problems:
        match = True
        for key in initProblem.keys():
            if initProblem[key] != badProblem[key]:
                if key in problem and str(problem[key]) == str(initProblem[key]):
                    pass
                else:
                    match = False
        if match:
            filtered_problems.append(problem)
    
    if not filtered_problems:
        return jsonify({'error': 'No problems found matching criteria'}), 404
    
    selected_problem = random.choice(filtered_problems)
    
    contest_id = selected_problem['contestId']
    problem_index = selected_problem['index']
    
    if not contest_id or not problem_index:
        return jsonify({'error': 'Selected problem is missing contestId or index'}), 400
    problemUrl = f"https://codeforces.com/problemset/problem/{contest_id}/{problem_index}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    finalProblem = requests.get(f"http://127.0.0.1:{port}/url?problemLink=" + problemUrl, headers=headers)
    return finalProblem.text

port = 5000
if __name__ == '__main__':
    app.run(debug=True, port=port)