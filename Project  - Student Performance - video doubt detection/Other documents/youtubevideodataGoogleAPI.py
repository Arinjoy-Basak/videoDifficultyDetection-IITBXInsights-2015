# -*- coding: utf-8 -*-
import os
os.environ['http_proxy']='http://arinjoy15:arinjoy15*@proxy.cse.iitb.ac.in:80'
os.environ['https_proxy']='http://arinjoy15:arinjoy15*@proxy.cse.iitb.ac.in:80'


import sys
from apiclient.discovery import build
from apiclient.errors import HttpError

# For this example, the API key is provided as a command-line argument.
api_key = "AIzaSyBcCNeaGSZR-FNyC5xl0028uFLVRJVcurE"

# The apiclient.discovery.build() function returns an instance of an API service
# object that can be used to make API calls. The object is constructed with
# methods specific to the books API. The arguments provided are:

youtube = build("youtube", "v3", developerKey=api_key)
#If error due to proxy of server  not found occurs, just remove proxy, log out, log bakc in and resume the program.... that's how the proxy gets set.

video_response = youtube.videos().list(id="ahz3kTiGo3s", part="contentDetails").execute()
#ahz3kTiGo3s is actually the video id for the trailer of Roy, starring Arjun Rampal, Ranbir Kapoor and Jacqueline Fernandez

video = video_response.get("items",[])

print str(video[0]["contentDetails"]["duration"])
