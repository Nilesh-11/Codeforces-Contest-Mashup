from flask import Flask, jsonify, request
from dataclasses import dataclass
from typing import List
from bs4 import BeautifulSoup
import requests
import re
from scrapper import Problem

def extract_problem_info(html_content: str) -> dict:
    # Parse the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Extract the time limit and memory limit
    time_limit = int(soup.find('div', class_='time-limit').find('div', class_='property-title').next_sibling.strip().split()[0])
    memory_limit = int(soup.find('div', class_='memory-limit').find('div', class_='property-title').next_sibling.strip().split()[0])
    
    # Extract the input and output format
    input_format = soup.find('div', class_='input-specification').text.strip()
    output_format = soup.find('div', class_='output-specification').text.strip()
    
    # Extract the problem statement
    statement = ' '.join([p.text for p in soup.find_all('p')])
    
    # Sample link, replace with actual link if available
    link = "https://codeforces.com/problemset/problem/1/A" # Example link
    
    # Extract sample test cases if available
    samples = []
    for sample in soup.find_all('div', class_='sample-test'):
        input_sample = sample.find('pre').text.strip()
        output_sample = sample.find_all('pre')[1].text.strip()
        samples.append((input_sample, output_sample))
    
    # Initialize the Problem dictionary
    problem = {
        "statement": statement,
        "time_lim": time_limit,
        "mem_lim": memory_limit,
        "input": input_format,
        "output": output_format,
    }
    
    return problem

def extract_parameters(problem_link: str):
    # Regular expression to extract contest ID and problem index
    match = re.match(r'https://codeforces.com/problemset/problem/(\d+)/([A-Z])', problem_link)
    if match:
        contest_id = match.group(1)
        problem_index = match.group(2)
        return contest_id, problem_index
    return None, None

def fetch_problem_info(problemLink: str) -> dict:
    contest_id, problem_index = extract_parameters(problemLink)
    
    if not contest_id or not problem_index:
        return {'error': 'Invalid problemLink format'}, 400

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    url = 'https://codeforces.com/api/problemset.problems'
    
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        problems = data.get('result', {}).get('problems', [])

        # Find the specific problem
        for problem in problems:
            if (problem['contestId'] == int(contest_id) and 
                problem['index'] == problem_index):
                return {'problem': problem}

        return {'error': 'Problem not found in the problemset'}, 404
    else:
        return {'error': 'Failed to fetch problems from Codeforces'}, response.status_code
