import json
import os
import logging
import pandas as pd
from time import time

from flask import Blueprint, current_app, request, jsonify

LOG = logging.getLogger(__name__)
api = Blueprint('api', __name__)


@api.route('/')
def index():
    print('main url!')
    return json.dumps('/')


@api.route('/initialization/<test_str>')
def initialization(test_str):
    return jsonify(test_str)
    

if __name__ == '__main__':
    pass
