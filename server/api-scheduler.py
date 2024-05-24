import schedule
import time
import subprocess

# every friday at a specific time
# def run_script():
#     print("Running your script...")
#     subprocess.run(["python", "seed.py"])

# # Schedule the script to run every Friday at 4 pm using schedule
# schedule.every().friday.at("02:05").do(run_script)

# while True:
#     schedule.run_pending()
#     time.sleep(1)

def run_script():
    print("Running your script...")
    subprocess.run(["python", "seed.py"])

schedule.every(1).minutes.do(run_script)

while True:
    schedule.run_pending()
    time.sleep(10)


