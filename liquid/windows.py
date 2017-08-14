

test = "/TJ/Home"
test2 = "avi"
hm = '%'
print (hm)
test3 = "webm"
selectiveEscape = r"cd {0} && for file in *.{1}; do ffmpeg -i \"$file\" \"${{file{3}.{1}}}\".{2}; done".format(test, test2, test3 , '%')

print(selectiveEscape)