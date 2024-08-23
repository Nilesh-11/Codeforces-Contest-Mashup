import re
import pypandoc

def replace_dollars_with_strong(text):
    # Replace each pair of $$$ with <strong> and </strong>
    parts = text.split("$$$")
    result = []
    for i, part in enumerate(parts):
        if i % 2 == 0:
            result.append(part)
        else:
            result.append(f"<bold>{part}</bold>")
    return "".join(result)

def replace_pairs(text, pairs):
    # Replace specific words in the text based on the pairs dictionary
    for old, new in pairs.items():
        text = text.replace(old, new)
    return text


def replace_sub_sup(text):
    # Function to replace underscores and carets
    def replace_underscore(match):
        content = match.group(1)
        # If there is curly brace content, replace that as well
        if content.startswith('{') and content.endswith('}'):
            return f"<sub>{content[1:-1]}</sub>"
        else:
            return f"<sub>{content}</sub>"

    def replace_caret(match):
        content = match.group(1)
        # If there is curly brace content, replace that as well
        if content.startswith('{') and content.endswith('}'):
            return f"<sup>{content[1:-1]}</sup>"
        else:
            return f"<sup>{content}</sup>"

    # Replace underscores
    text = re.sub(r'_(\w+|\{[^}]*\})', replace_underscore, text)
    # Replace carets
    text = re.sub(r'\^(\w+|\{[^}]*\})', replace_caret, text)
    
    return text

def filter_text(text):
    # Example usage
    # text = """You have an array of non-negative integers $$$a_1, a_2, \ldots, a_n$$$. The value of a sub-array of length $$$\ge 2$$$, $$$a[l, r] = [a_l, a_{l+1}, \ldots, a_r]$$$ is the minimum value of $$$a_i \oplus a_j$$$ such that $$$l \le i < j \le r$$$, where $$$\oplus$$$ is the xor (exclusive-or) operator. You have to find the $$$k$$$-th smallest value over all sub-arrays of length $$$\ge 2$$$."""

    pairs = {
        "\\ldots": "...",
        "\\oplus": "xor",
        "\\ge": ">=",
        "\\le": "<=",
        "\\cdot": "*"
    }

    # First replace the words based on pairs
    text = replace_pairs(text, pairs)

    # Then replace the $$$ with <strong> tags
    result = replace_dollars_with_strong(text)
    result = replace_sub_sup(result)
    return result

def convert_markdown_to_html(markdown_str):
    """
    Convert a CommonMark markdown string to HTML using pypandoc.
    
    Args:
        markdown_str (str): The input markdown string.
        
    Returns:
        str: The converted HTML string.
    """
    # Convert the markdown string to HTML
    html_str = pypandoc.convert_text(markdown_str, 'html5', format='commonmark_x', extra_args=['--no-highlight'])
    
    return html_str

def remove_dollar_signs(text):
    """
    Remove all dollar signs from the given text.
    
    Args:
        text (str): The input string from which dollar signs will be removed.
        
    Returns:
        str: The modified string with all dollar signs removed.
    """
    # Replace all occurrences of '$' with an empty string
    return text.replace('$', '')

def filter_text2(text):
    text = convert_markdown_to_html(text)
    # print(text)
    text = remove_dollar_signs(text)
    if '$' in text:
        print("exist")
    # print(text)
    return text
