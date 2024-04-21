lst = input().split()
arr=[]
for i in lst:
    arr.append(int(i))
arr.sort()
print(arr[-1])