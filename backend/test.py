import requests
from bs4 import BeautifulSoup

def extract_problem_info(html_content: str) -> dict:
    # Parse the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Extract the problem title
    title = soup.find('div', class_='title').text.strip()
    
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
        "id": None,  # To be filled via API
        "title": title,
        "tags": [],  # To be filled via API
        "rating": None,  # To be filled via API
        "statement": statement,
        "time_lim": time_limit,
        "mem_lim": memory_limit,
        "input": input_format,
        "output": output_format,
        "link": link,
    }
    
    return problem

def fetch_problem_info(problem_id: int) -> dict:
    # Fetch additional details from the Codeforces API
    url = f'https://codeforces.com/api/problemset.problemStatistics'
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        problem = data['result'].get(problem_id)
        if problem:
            return {
                "id": problem['contestId'],
                "tags": problem['tags'],
                "rating": problem.get('rating', None),
            }
    return {}

def merge_problem_info(problem: dict, additional_info: dict) -> dict:
    problem.update(additional_info)
    return problem

# Sample HTML content (from the provided layout)
html_content = """
<div class="problem-statement"><div class="header"><div class="title">A. Theatre Square</div><div class="time-limit"><div class="property-title">time limit per test</div>1 second</div><div class="memory-limit"><div class="property-title">memory limit per test</div>256 megabytes</div><div class="input-file input-standard"><div class="property-title">input</div>stdin</div><div class="output-file output-standard"><div class="property-title">output</div>stdout</div></div><div><p>Theatre Square in the capital city of Berland has a rectangular shape with the size <span class="tex-span"><i>n</i> × <i>m</i></span> meters. On the occasion of the city's anniversary, a decision was taken to pave the Square with square granite flagstones. Each flagstone is of the size <span class="tex-span"><i>a</i> × <i>a</i></span>.</p><p>What is the least number of flagstones needed to pave the Square? It's allowed to cover the surface larger than the Theatre Square, but the Square has to be covered. It's not allowed to break the flagstones. The sides of flagstones should be parallel to the sides of the Square.</p></div><div class="input-specification"><div class="section-title">Input</div><p>The input contains three positive integer numbers in the first line: <span class="tex-span"><i>n</i>,  <i>m</i></span> and <span class="tex-span"><i>a</i></span> (<span class="tex-span">1 ≤  <i>n</i>, <i>m</i>, <i>a</i> ≤ 10<sup class="upper-index">9</sup></span>).</p></div><div class="output-specification"><div class="section-title">Output</div><p>Write the needed number of flagstones.</p></div><div class="sample-tests"><div class="section-title">Examples</div><div class="sample-test"><div class="input"><div class="title">Input</div><pre>6 6 4<br/></pre></div><div class="output"><div class="title">Output</div><pre>4<br/></pre></div></div></div></div>
"""

# Extract problem info from HTML
problem_info = extract_problem_info(html_content)

# Fetch additional problem info using the Codeforces API
additional_info = fetch_problem_info(1)  # Replace with the actual problem ID

# Merge the extracted and fetched info
complete_problem_info = merge_problem_info(problem_info, additional_info)

# Print the final Problem dictionary
print(complete_problem_info)
