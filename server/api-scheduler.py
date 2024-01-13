import schedule
import time
import subprocess

def run_script():
    print("Running your script...")
    subprocess.run(["python", "seed.py"])

schedule.every().friday.at("17:05").do(run_script)

while True:
    schedule.run_pending()
    time.sleep(1)