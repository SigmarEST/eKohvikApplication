import json

vibs = []

for x in range(0, 500000):
    vibs.append("121314411, 0.141414141, 0.03414412, 1.123456\n")

print(json.dumps(vibs))
