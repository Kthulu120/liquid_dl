# PLAYGROUND FOR WINDOWS COMMANDS
import subprocess

test = "/some/Home"
test2 = "avi"
hm = '%'
print (hm)
test3 = "webm"
selectiveEscape = r"cd {0} && for file in *.{1}; do ffmpeg -i \"$file\" \"${{file{3}.{1}}}\".{2}; done".format(test, test2, test3 , '%')
p = {}
s = {}
t = 2
# a = subprocess.check_output(['cmd', '/c', 'cd C:/tmp/toot && youtube-dl -F https://www.youtube.com/watch?v=F4hNX1oalL8'])
# a = (list(a.split('\n')))
# del a[0:6]
# print(a)

m = []
try:
    popp = subprocess.check_output(['cmd', '/c',
                                    'cd C:/tmp/toot && youtube-dl -f 139  https://www.youtube.com/watch?v=A2_pboioWf0 --write-info-json  --simulate '])
    popp = (list(popp.split('\n')))
    del popp[0:6]
    for x in popp:
        yum = (' '.join(x.split()))
        m.append(yum)

    print (m)
except Exception as e:
    print(e)
# print(popp)
