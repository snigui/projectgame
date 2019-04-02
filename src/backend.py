def getName(playerNames):
    return playerNames

def Scores(playerNames):
    playerScores = {}
    for name in getName(playerNames):
        name.split(" ")
        playerScores[name] = "score" #score will be from checkForFive
    return playerScores

def checkForFive():
    print()



playerNames = ["Justin", "Justin", "Melinda", "Sighnda"]
print(Scores(playerNames))