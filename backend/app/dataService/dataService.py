# -*- coding: utf-8 -*-
import time
import json
import os,sys
import warnings
import pandas as pd

try:
    import globalVariable as GV
except ImportError:
    import app.dataService.globalVariable as GV


class DataService(object):
    def __init__(self):
        self.name = "dataService"


if __name__ == '__main__':
    print('=== dataService ===')
    dataService = DataService()

