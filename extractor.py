import time
import struct
import numpy as np
from sensor import ICM42688P

# Constants
IDLE_THRESHOLD_PERCENTAGE = 300
IDLE_TIME_TO_SEARCH_SECONDS = 5
IDLE_SECONDS_TO_KEEP_CHECKING = 2

icm42688p = ICM42688P()
is_idle = True
start_time = time.perf_counter()
x_over_time = []
idle_point = 0

not_idle_timer = 0

while is_idle:
    x = icm42688p.get_x_axis()
    time_passed = time.perf_counter() - start_time
    x_over_time.append([time_passed, x])

    if (time_passed > IDLE_TIME_TO_SEARCH_SECONDS):
        first_element = x_over_time[0]
        percentage_increase = (x - first_element[1]) / first_element[1] * 100

        if (abs(percentage_increase) > IDLE_THRESHOLD_PERCENTAGE):
            if (not_idle_timer == 0):
                not_idle_timer = time.perf_counter()
            elif ((time.perf_counter - not_idle_timer) > IDLE_SECONDS_TO_KEEP_CHECKING)
                not_idle_timer = 0
                is_idle = False
                idle_point = x_over_time[0][1]
        else:
            not_idle_timer = 0
            start_time += first_element[0]
            del x_over_time[0]

while not is_idle:
    x = icm42688p.get_x_axis()
    time_passed = time.perf_counter() - start_time
    x_over_time.append([time_passed, x])

    percentage_increase = (x - idle_point) / idle_point * 100

    if (abs(percentage_increase) < IDLE_THRESHOLD_PERCENTAGE):
        if (not_idle_timer == 0):
            not_idle_timer = time.perf_counter()
        elif ((time.perf_counter - not_idle_timer) > IDLE_TIME_TO_SEARCH_SECONDS)
            not_idle_timer = 0
            is_idle = True
    else:
        not_idle_timer = 0

f = open("vibration.csv", "a")

for val in x_over_time:
    data_file.write(str(val[0]) + "," + str(val[1]) + "\n")

data_file.close()
print("done")