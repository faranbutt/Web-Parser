import argparse
import os

import numpy as np
np.bool = bool
import pandas as pd

from flask import Flask
from flask_cors import CORS
from flask_restful import Resource
from flask_restful import Api
from flask import jsonify, make_response, send_file

cwd = os.getcwd()

import requests
from bs4 import BeautifulSoup, Comment

import base64


def remove_text_from_html(url):
    # Get the content from the URL
    response = requests.get(url)
    html_content = response.content
    
    # Parse the content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Remove all text and comments between tags
    for element in soup(text=True):
        if isinstance(element, Comment):  # Check if the element is a comment
            element.extract()  # Remove comment
        # else:
        #     element.replace_with('')  # Remove text between tags
            
    # Retain only 'id' and 'class' attributes
    for tag in soup.find_all(True):  # Find all tags in the soup
        attrs = dict(tag.attrs)  # Copy attributes
        for attr in attrs:
            if attr not in ['id', 'class']:
                del tag.attrs[attr]

    banned_elements = [
        "script",
        "style",
        "head",
        "svg",
    ]

    for element in banned_elements:
        for tag in soup.find_all(element):
            tag.decompose()
    
    return soup.prettify()


class GetHTML(Resource):

    def get(self, 
            url, 
            ):


        # Decoding the base64 string
        decoded_bytes = base64.b64decode(url)
        decoded_string = decoded_bytes.decode('utf-8')

        html = remove_text_from_html(decoded_string)


        return jsonify({
            'html': html,
        })
    

def get_ai_response(prompt):
    # response = openai.Completion.create(
    #     engine="text-davinci-003",
    #     prompt=prompt,
    #     temperature=0.7,
    #     max_tokens=256,
    #     top_p=1,
    #     frequency_penalty=0,
    #     presence_penalty=0,
    # )
    # return response.choices[0].text

    #sample code
    code = """function extractDataAndConvertToCSV() {
    // Get all elements with the specified classes
    const elements = document.querySelectorAll('.ml-auto.font-mono.text-xs');

    // Extract text content from each element
    const data = [];
    elements.forEach(element => {
        data.push(`"${element.textContent.trim()}"`);
    });

    // Convert array to CSV
    const csvString = data.join(',');
    return csvString;
}

const csv = extractDataAndConvertToCSV();
console.log(csv);
window.csv = csv;
"""

    return code
    


class GetCode(Resource):

    def get(self, 
            element, 
            ):



        # Decoding the base64 string
        decoded_bytes = base64.b64decode(element)
        decoded_string = decoded_bytes.decode('utf-8')

        print("element:", decoded_string)

        prompt = f"""Write javascript code that accesses the data inside of all elements like this: {decoded_string}

The data should then be arranged into a string that is a valid csv."""

        code = get_ai_response(prompt)

        



        return jsonify({
            'code': code,
        })


def create_app():
    app = Flask(__name__)  # static_url_path, static_folder, template_folder...
    CORS(app, resources={r"/*": {"origins": "*", "allow_headers": "*"}})


    api = Api(app)

    api.add_resource(GetHTML, "/api/url/<string:url>")
    api.add_resource(GetCode, "/api/element/<string:element>")

    @app.route('/version')
    def version():
        return f"Job ID: {os.environ['JOB_ID']}\nCommit ID: {os.environ['COMMIT_ID']}"

    return app


def start_server():
    print("Starting server...")
    parser = argparse.ArgumentParser()

    # API flag
    parser.add_argument(
        "--host",
        default="127.0.0.1",
        help="The host to run the server",
    )
    parser.add_argument(
        "--port",
        default=8000,
        help="The port to run the server",
    )
    parser.add_argument(
        "--debug",
        action="store_true",
        help="Run Flask in debug mode",
    )

    args = parser.parse_args()

    server_app = create_app()

    server_app.run(debug=args.debug, host=args.host, port=args.port)


if __name__ == "__main__":
    start_server()
